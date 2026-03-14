import { ITEM_ICONS, RECIPES } from "./recipes.js";

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

function circleAabbResolve(player, rect) {
  const closestX = clamp(player.x, rect.x, rect.x + rect.w);
  const closestY = clamp(player.y, rect.y, rect.y + rect.h);
  const dx = player.x - closestX;
  const dy = player.y - closestY;
  const distSq = dx * dx + dy * dy;
  const r = player.radius;

  if (distSq >= r * r) return;

  const dist = Math.sqrt(distSq) || 0.0001;
  const overlap = r - dist;
  const nx = dx / dist;
  const ny = dy / dist;

  player.x += nx * overlap;
  player.y += ny * overlap;
}

function distanceSq(ax, ay, bx, by) {
  const dx = ax - bx;
  const dy = ay - by;
  return dx * dx + dy * dy;
}

function pointToRectDistanceSq(px, py, rect) {
  const dx = px < rect.x ? rect.x - px : px > rect.x + rect.w ? px - (rect.x + rect.w) : 0;
  const dy = py < rect.y ? rect.y - py : py > rect.y + rect.h ? py - (rect.y + rect.h) : 0;
  return dx * dx + dy * dy;
}

function recipeKeyFromRecipe(recipe) {
  return Object.keys(RECIPES).find((k) => RECIPES[k] === recipe) || null;
}

function getStationCenter(station) {
  const box = station.getInteractBox();
  return {
    x: box.x + box.w * 0.5,
    y: box.y + box.h * 0.5
  };
}

export class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 14;
    this.speed = 130;
    this.interactRange = 40;
    this.facing = 0;
    this.heldItem = null;
    this.dx = 0;
    this.dy = 0;
  }

  update(delta, keys, stations, bounds) {
    let ix = 0;
    let iy = 0;

    if (keys.KeyW || keys.ArrowUp) iy -= 1;
    if (keys.KeyS || keys.ArrowDown) iy += 1;
    if (keys.KeyA || keys.ArrowLeft) ix -= 1;
    if (keys.KeyD || keys.ArrowRight) ix += 1;

    const len = Math.hypot(ix, iy) || 1;
    this.dx = (ix / len) * this.speed;
    this.dy = (iy / len) * this.speed;

    this.x += this.dx * (delta / 1000);
    for (const station of stations) circleAabbResolve(this, station);

    this.y += this.dy * (delta / 1000);
    for (const station of stations) circleAabbResolve(this, station);

    this.x = clamp(this.x, this.radius + 2, bounds.w - this.radius - 2);
    this.y = clamp(this.y, this.radius + 2, bounds.h - this.radius - 2);

    if (Math.hypot(this.dx, this.dy) > 5) {
      this.facing = Math.atan2(this.dy, this.dx);
    }
  }

  isNearStation(station, customRange = this.interactRange) {
    const box = station.getInteractBox();
    return pointToRectDistanceSq(this.x, this.y, box) <= customRange * customRange;
  }

  getNearestStation(stations, customRange = this.interactRange) {
    let nearest = null;
    let nearestD = Infinity;

    for (const station of stations) {
      const d = pointToRectDistanceSq(this.x, this.y, station.getInteractBox());
      if (d < nearestD) {
        nearestD = d;
        nearest = station;
      }
    }

    if (!nearest || nearestD > customRange * customRange) return null;
    return nearest;
  }

  getInteractionPriority(station) {
    if (!this.heldItem) {
      if (station.item && ["has_item", "done", "burnt"].includes(station.state)) return 100;
      if (["ingredient", "fridge"].includes(station.type)) return 80;
      if (station.type === "diningTable" && station.seatedOrder) return 40;
      return 0;
    }

    if (station.type === "diningTable" && station.seatedOrder) return 120;
    if (station.type === "prepTable" && !station.item && this.heldItem.recipeKey) return 100;
    if (station.type === "trash") return 20;
    if (station.item) return 0;

    const nextStep = this.heldItem.recipe?.steps[this.heldItem.stepIndex + 1];
    if (!nextStep) return 0;

    if (nextStep.station === station.type) return 110;
    if (["stove", "oven", "chopping", "plating"].includes(station.type)) return 30;
    return 10;
  }

  pickBestStation(stations) {
    let best = null;
    let bestScore = -Infinity;

    for (const station of stations) {
      if (!this.isNearStation(station)) continue;
      const d = Math.sqrt(pointToRectDistanceSq(this.x, this.y, station.getInteractBox()));
      const priority = this.getInteractionPriority(station);
      const score = priority - d * 0.1;
      if (score > bestScore) {
        best = station;
        bestScore = score;
      }
    }

    return best;
  }

  interact(stations, orderManager) {
    const station = this.pickBestStation(stations);
    if (!station) return { message: "", didInteract: false };

    if (!this.heldItem) {
      if (["ingredient", "fridge"].includes(station.type)) {
        const possibleItems = station.ingredientItems;
        const urgent = orderManager.activeOrders
          .map((o) => o.recipe.steps[0].item)
          .find((item) => possibleItems.includes(item));
        const key = urgent || possibleItems[Math.floor(Math.random() * possibleItems.length)];

        const matchOrder = orderManager.activeOrders.find((o) => o.recipe.steps[0].item === key);
        const fallbackRecipe = Object.values(RECIPES).find((r) => r.steps[0].item === key) || null;
        const recipe = matchOrder?.recipe || fallbackRecipe;
        const recipeKey = recipe ? recipeKeyFromRecipe(recipe) : null;

        this.heldItem = {
          key,
          icon: ITEM_ICONS[key] || "🍽",
          recipe,
          recipeKey,
          stepIndex: 0,
          state: "raw"
        };
        return { message: `${this.heldItem.icon} malzeme alindi`, didInteract: true };
      }

      if (station.item && ["has_item", "done", "burnt"].includes(station.state)) {
        if (["stove", "oven", "chopping"].includes(station.type) && station.state === "has_item") {
          const started = station.startProcessing();
          if (started) return { message: "Islem basladi", didInteract: true, startedProcessing: true };
        }

        this.heldItem = station.item;
        station.clear();
        return { message: `${this.heldItem.icon || "🍽"} alindi`, didInteract: true };
      }

      if (station.type === "diningTable" && station.seatedOrder) {
        return { message: `${station.label} siparis bekliyor`, didInteract: true };
      }

      return { message: "", didInteract: false };
    }

    if (station.type === "trash") {
      this.heldItem = null;
      return { message: "Cop kutusuna atildi", didInteract: true };
    }

    if (station.type === "diningTable") {
      if (!station.seatedOrder) return { message: "Bu masada bekleyen kimse yok", didInteract: true };
      if (!this.heldItem.recipeKey) return { message: "Bu siparisle eslesmiyor", didInteract: true, fail: true };

      const result = orderManager.completeOrder(this.heldItem.recipeKey, station.tableId);
      if (!result.success) return { message: "Yanlis servis", didInteract: true, fail: true };

      this.heldItem = null;
      station.seatedOrder = null;
      return { message: `${station.label} servis edildi +${result.total}`, served: result, didInteract: true };
    }

    if (station.type === "prepTable") {
      if (!this.heldItem.recipeKey) {
        return { message: "Stok masalarina sadece hazir yemek koyabilirsin", didInteract: true, fail: true };
      }
      if (station.item) return { message: "Bu stok masasi dolu", didInteract: true };
      station.item = this.heldItem;
      station.state = "done";
      this.heldItem = null;
      return { message: `${station.label} uzerine stoklandi`, didInteract: true };
    }

    if (station.item) return { message: "Bu istasyon dolu", didInteract: true };

    station.item = this.heldItem;
    station.state = "has_item";

    const nextStep = this.heldItem.recipe?.steps[this.heldItem.stepIndex + 1];

    if (station.type === "plating" && nextStep && nextStep.action === "plate") {
      this.heldItem.stepIndex += 1;
      station.state = "done";
    }

    if (
      ["stove", "oven", "chopping"].includes(station.type) &&
      nextStep &&
      ((station.type === "stove" && nextStep.action === "cook") ||
        (station.type === "oven" && nextStep.action === "bake") ||
        (station.type === "chopping" && nextStep.action === "chop"))
    ) {
      station.duration = nextStep.duration;
      station.burnAt = nextStep.burnAt || null;
      station.startProcessing();
    }

    this.heldItem = null;
    return { message: "Istasyona birakildi", didInteract: true };
  }

  draw(ctx) {
    ctx.save();

    ctx.fillStyle = "#f0f0ee";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#d4a070";
    ctx.beginPath();
    ctx.arc(this.x, this.y - 4, this.radius * 0.42, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#f7f7f5";
    ctx.fillRect(this.x - 6, this.y - this.radius - 7, 12, 6);

    if (this.heldItem) {
      ctx.font = "20px serif";
      ctx.textAlign = "center";
      ctx.fillText(this.heldItem.icon || "🍽", this.x, this.y - 26);
    }

    ctx.restore();
  }
}
