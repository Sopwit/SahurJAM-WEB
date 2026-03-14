const COLORS = {
  ingredient: { top: "#8B6914", side: "#5c4510" },
  fridge: { top: "#5c8ab0", side: "#35536f" },
  stove: { top: "#c87020", side: "#8a4a10" },
  oven: { top: "#c83020", side: "#8a1010" },
  chopping: { top: "#6aaa40", side: "#3d7020" },
  plating: { top: "#4060c0", side: "#203080" },
  prepTable: { top: "#8f6b44", side: "#5a4128" },
  diningTable: { top: "#7a5637", side: "#50331f" },
  service: { top: "#e8c030", side: "#a08010" },
  trash: { top: "#505050", side: "#282828" }
};

export class Station {
  constructor(x, y, w, h, type, options = {}) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.type = type;

    this.state = "idle";
    this.item = null;
    this.progress = 0;
    this.timer = 0;
    this.duration = 0;

    this.ingredientItems = options.ingredientItems || [];
    this.label = options.label || "";
    this.color = COLORS[type] || COLORS.trash;
    this.burnAt = options.burnAt || null;
    this.tableId = options.tableId || null;
    this.seatedOrder = null;
  }

  setRect(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }

  update(delta, holdActive = true, speedMultiplier = 1) {
    if (this.state !== "processing") {
      return;
    }

    if (this.type === "chopping" && !holdActive) {
      return;
    }

    this.timer += delta * speedMultiplier;
    if (this.duration > 0) {
      this.progress = Math.min(this.timer / this.duration, 1);
    }

    if (this.type === "oven" && this.burnAt && this.timer >= this.burnAt) {
      this.state = "burnt";
      this.progress = 1;
      return;
    }

    if (this.timer >= this.duration) {
      this.state = "done";
      this.progress = 1;
    }
  }

  startProcessing() {
    if (!this.item) {
      return false;
    }
    if (!["stove", "oven", "chopping"].includes(this.type)) {
      return false;
    }
    if (this.state === "processing") {
      return false;
    }

    const step = this.item.recipe.steps[this.item.stepIndex + 1];
    if (!step) {
      return false;
    }
    if (
      (this.type === "stove" && step.action !== "cook") ||
      (this.type === "oven" && step.action !== "bake") ||
      (this.type === "chopping" && step.action !== "chop")
    ) {
      return false;
    }

    this.duration = step.duration || 0;
    this.burnAt = step.burnAt || null;
    this.timer = 0;
    this.progress = 0;
    this.state = "processing";
    return true;
  }

  isBurnt() {
    return this.state === "burnt";
  }

  getInteractBox() {
    const pad = 10;
    return {
      x: this.x - pad,
      y: this.y - pad,
      w: this.w + pad * 2,
      h: this.h + pad * 2
    };
  }

  clear() {
    this.item = null;
    this.state = "idle";
    this.progress = 0;
    this.timer = 0;
    this.duration = 0;
    this.burnAt = null;
  }
}
