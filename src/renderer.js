import { ITEM_ICONS } from "./recipes.js";
import { GAME_CONFIG } from "./config/gameConfig.js";

const STATION_ASSET = {
  ingredient: "stationIngredient",
  fridge: "stationIngredient",
  stove: "stationStove",
  oven: "stationOven",
  chopping: "stationChopping",
  plating: "stationPlating",
  prepTable: "stationPlating",
  service: "stationService",
  trash: "stationTrash"
};

const ITEM_ASSET = {
  lentils: "itemLentils",
  dough: "itemDough",
  vegetables: "itemVegetables",
  mercimekCorbasi: "itemMercimekCorbasi",
  pide: "itemPide",
  salata: "itemSalata"
};

export class Renderer {
  constructor(canvas, hudRefs, config = GAME_CONFIG, assets = null) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.hud = hudRefs;
    this.config = config;
    this.assets = assets;
  }

  getAsset(key) {
    return this.assets?.get(key) || null;
  }

  drawImageSafe(ctx, img, x, y, w, h) {
    if (!img) return false;
    ctx.drawImage(img, x, y, w, h);
    return true;
  }

  drawBackground(ctx, phase = "iftar") {
    ctx.imageSmoothingEnabled = false;
    const tile = 36;
    const { width, height } = this.canvas;

    const wallTopH = Math.floor(height * 0.34);
    const wallMidH = Math.floor(height * 0.18);
    const floorY = wallTopH + wallMidH;

    const warmPhase = phase === "iftar";
    const wallGrad = ctx.createLinearGradient(0, 0, 0, wallTopH);
    wallGrad.addColorStop(0, warmPhase ? "#5a3722" : "#243049");
    wallGrad.addColorStop(1, warmPhase ? "#2b1f17" : "#1b2538");
    ctx.fillStyle = wallGrad;
    ctx.fillRect(0, 0, width, wallTopH);

    ctx.fillStyle = warmPhase ? "#5a3c2a" : "#394866";
    ctx.fillRect(0, wallTopH, width, wallMidH);

    ctx.fillStyle = "#7b5539";
    ctx.fillRect(0, wallTopH + wallMidH - 8, width, 8);

    ctx.fillStyle = "#2a1a12";
    ctx.fillRect(0, floorY, width, height - floorY);

    const floorTile = this.getAsset("floorTile");
    for (let y = floorY; y < height; y += tile) {
      for (let x = 0; x < width; x += tile) {
        if (!this.drawImageSafe(ctx, floorTile, x, y, tile, tile)) {
          ctx.fillStyle = (Math.floor(x / tile) + Math.floor(y / tile)) % 2 === 0 ? "#2f2016" : "#26180f";
          ctx.fillRect(x, y, tile, tile);
          ctx.strokeStyle = "#1f130d";
          ctx.lineWidth = 1;
          ctx.strokeRect(x, y, tile, tile);
        }
      }
    }

    const windowY = 34;
    const windowW = 110;
    const windowH = 68;
    const windowGap = (width - windowW * 3) / 4;
    for (let i = 0; i < 3; i += 1) {
      const x = windowGap + i * (windowW + windowGap);
      ctx.fillStyle = "#2a1a12";
      ctx.fillRect(x - 4, windowY - 4, windowW + 8, windowH + 8);
      ctx.fillStyle = "#15202a";
      ctx.fillRect(x, windowY, windowW, windowH);
      ctx.strokeStyle = "#8d6545";
      ctx.lineWidth = 4;
      ctx.strokeRect(x, windowY, windowW, windowH);
      ctx.strokeStyle = "#6f4d34";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + windowW / 2, windowY);
      ctx.lineTo(x + windowW / 2, windowY + windowH);
      ctx.moveTo(x, windowY + windowH / 2);
      ctx.lineTo(x + windowW, windowY + windowH / 2);
      ctx.stroke();
    }

    const lampY = wallTopH + 8;
    const lampXs = [width * 0.2, width * 0.5, width * 0.8];
    for (const lx of lampXs) {
      ctx.strokeStyle = "#a9835f";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(lx, 0);
      ctx.lineTo(lx, lampY);
      ctx.stroke();

      ctx.fillStyle = "#d6b889";
      ctx.beginPath();
      ctx.moveTo(lx - 18, lampY);
      ctx.lineTo(lx + 18, lampY);
      ctx.lineTo(lx + 12, lampY + 14);
      ctx.lineTo(lx - 12, lampY + 14);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = warmPhase ? "rgba(255, 223, 154, 0.2)" : "rgba(170, 214, 255, 0.18)";
      ctx.beginPath();
      ctx.arc(lx, lampY + 28, 34, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = "#4a3223";
    ctx.fillRect(0, floorY - 6, width, 6);

    ctx.fillStyle = warmPhase ? "rgba(245, 185, 83, 0.08)" : "rgba(132, 184, 255, 0.08)";
    ctx.fillRect(0, 0, width, height);
  }

  drawStation(ctx, station) {
    ctx.save();

    const stationAssetKey = STATION_ASSET[station.type];
    const stationAsset = stationAssetKey ? this.getAsset(stationAssetKey) : null;

    if (!this.drawImageSafe(ctx, stationAsset, station.x, station.y, station.w, station.h)) {
      ctx.fillStyle = station.color.top;
      ctx.fillRect(station.x, station.y, station.w, station.h);
      ctx.fillStyle = station.color.side;
      ctx.fillRect(station.x, station.y + station.h - 5, station.w, 5);
    }

    if (station.state === "processing") {
      ctx.fillStyle = "rgba(0,0,0,0.45)";
      ctx.fillRect(station.x + 6, station.y + 4, station.w - 12, 8);
      const p = Math.min(1, station.progress);
      const r = Math.round(220 - p * 70);
      const g = Math.round(160 - p * 120);
      ctx.fillStyle = `rgb(${r},${g},30)`;
      ctx.fillRect(station.x + 6, station.y + 4, (station.w - 12) * p, 8);
    }

    if (station.state === "burnt") {
      ctx.fillStyle = "rgba(20,0,0,0.45)";
      ctx.fillRect(station.x, station.y, station.w, station.h);
      ctx.strokeStyle = "#ef3a22";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(station.x + 8, station.y + 8);
      ctx.lineTo(station.x + station.w - 8, station.y + station.h - 8);
      ctx.moveTo(station.x + station.w - 8, station.y + 8);
      ctx.lineTo(station.x + 8, station.y + station.h - 8);
      ctx.stroke();
    }

    if (station.state === "done") {
      ctx.shadowBlur = 12;
      ctx.shadowColor = "#5bd36b";
      ctx.fillStyle = "#7fed90";
      ctx.font = "bold 18px Georgia";
      ctx.textAlign = "center";
      ctx.fillText("✓", station.x + station.w - 10, station.y + 16);
      ctx.shadowBlur = 0;
    }

    if (station.item) {
      const itemAsset = this.getAsset(ITEM_ASSET[station.item.key]);
      const size = Math.min(station.w, station.h) * 0.48;
      if (!this.drawImageSafe(ctx, itemAsset, station.x + station.w / 2 - size / 2, station.y + station.h / 2 - size / 2, size, size)) {
        const icon = station.item.icon || ITEM_ICONS[station.item.key] || "🍽";
        ctx.font = `${Math.max(17, station.h * 0.32)}px serif`;
        ctx.textAlign = "center";
        ctx.fillStyle = "#f5f0de";
        ctx.fillText(icon, station.x + station.w / 2, station.y + station.h / 2 + 8);
      }
    }

    if (station.type === "diningTable" && station.seatedOrder) {
      ctx.fillStyle = "#f5ede0";
      ctx.font = "18px serif";
      ctx.textAlign = "center";
      ctx.fillText("🧍", station.x + station.w / 2 - 18, station.y + station.h / 2 + 8);
      ctx.fillText(station.seatedOrder.recipe.icon, station.x + station.w / 2 + 18, station.y + station.h / 2 + 8);
    }

    if (["prepTable", "diningTable", "fridge"].includes(station.type)) {
      ctx.fillStyle = "#eadcc0";
      ctx.font = "11px Georgia";
      ctx.textAlign = "center";
      ctx.fillText(station.label, station.x + station.w / 2, station.y + station.h - 8);
    }

    ctx.restore();
  }

  drawPlayer(ctx, player) {
    const chef = this.getAsset(Math.cos(player.facing) >= 0 ? "chefRight" : "chefLeft");
    const size = player.radius * 2.4;

    if (!this.drawImageSafe(ctx, chef, player.x - size / 2, player.y - size / 2, size, size)) {
      player.draw(ctx);
      return;
    }

    ctx.save();

    if (player.heldItem) {
      const heldAsset = this.getAsset(ITEM_ASSET[player.heldItem.key]);
      const heldSize = player.radius * 1.2;
      if (!this.drawImageSafe(ctx, heldAsset, player.x - heldSize / 2, player.y - player.radius - heldSize - 2, heldSize, heldSize)) {
        ctx.font = "20px serif";
        ctx.textAlign = "center";
        ctx.fillText(player.heldItem.icon || "🍽", player.x, player.y - 26);
      }
    }

    ctx.restore();
  }

  drawHUD(game) {
    this.hud.score.innerHTML = `<span class="hud-icon">🏆</span><span class="hud-label">Skor</span><strong>${game.score}</strong>`;
    this.hud.combo.textContent =
      game.comboCount > 1 ? `KOMBO x${game.comboMultiplier.toFixed(2)} (${game.comboCount})` : "";

    const sec = Math.max(0, Math.ceil(game.mainTimer / 1000));
    const mm = String(Math.floor(sec / 60)).padStart(2, "0");
    const ss = String(sec % 60).padStart(2, "0");
    this.hud.timer.innerHTML = `<span class="timer-label">Kalan Süre</span><strong>${mm}:${ss}</strong>`;
    this.hud.timer.style.color = sec < 30 ? "#ff5a3f" : "#e8c030";

    const phaseLeft = Math.max(0, Math.ceil((game.phaseDuration - game.phaseTimer) / 1000));
    const phaseCfg = this.config.cycle.phases[game.dayPhase] || this.config.cycle.phases.iftar;
    this.hud.cycle.textContent = `DÖNGÜ: ${phaseCfg.label} (${phaseLeft}s)`;
    this.hud.cycle.style.color = phaseCfg.hudColor;
    if (this.hud.runStats) {
      this.hud.runStats.textContent = `Teslimat ${game.completedOrders}/${this.config.match.levelCompleteOrders} • Hurma ${game.hurma}`;
    }

    const ordersHtml = game.orderManager.activeOrders
      .map((order) => {
        const leftRatio = Math.max(0, 1 - order.elapsed / order.timeLimit);
        const width = Math.round(leftRatio * 100);
        const color = game.orderManager.getUrgencyColor(order);
        return `
          <div class="order-card">
            <div class="order-head">
              <div class="order-title">${order.recipe.icon} ${order.recipe.name}</div>
              <div class="order-meta">${order.tableId?.replace("table-", "Masa ")} • +${order.recipe.points}</div>
            </div>
            <div class="order-bar-wrap">
              <div class="order-bar" style="width:${width}%;background:${color};"></div>
            </div>
          </div>
        `;
      })
      .join("");

    this.hud.orders.innerHTML = ordersHtml;

    if (this.hud.controls) {
      this.hud.controls.textContent =
        game.state === "playing"
          ? "WASD / yön tuşları ile hareket et • E veya Boşluk ile etkileşime geç • Escape ile duraklat"
          : "Enter veya buton ile başlat • R ile yeniden başlat • Tab ile menüyü aç";
    }

    if (this.hud.hurma) this.hud.hurma.textContent = String(game.progress.totalHurma);
    if (this.hud.highScore) this.hud.highScore.textContent = String(game.progress.highScore);
    if (this.hud.bestCombo) this.hud.bestCombo.textContent = `x${game.progress.bestCombo}`;
    if (this.hud.soundButton) {
      this.hud.soundButton.textContent = game.progress.settings.soundEnabled ? "SES: AÇIK" : "SES: KAPALI";
    }
    if (this.hud.animationsButton) {
      this.hud.animationsButton.textContent = game.progress.settings.animationsEnabled ? "ANİMASYON: AÇIK" : "ANİMASYON: KAPALI";
    }
    if (this.hud.hintsButton) {
      this.hud.hintsButton.textContent = game.progress.settings.showHints ? "YARDIM METİNLERİ: AÇIK" : "YARDIM METİNLERİ: KAPALI";
    }
    if (this.hud.pauseButton) {
      const canPause = game.state === "playing" || game.state === "paused";
      this.hud.pauseButton.disabled = !canPause;
      this.hud.pauseButton.textContent = canPause ? (game.state === "paused" ? "DEVAM ET" : "DURAKLAT") : "OYUNU BAŞLAT";
    }
    if (this.hud.upgrades) {
      this.hud.upgrades.innerHTML = game
        .getUpgradeCatalog()
        .map((upgrade) => {
          const current = upgrade.level;
          const disabled = upgrade.isMaxed || !["menu", "paused", "gameOver", "levelComplete"].includes(game.state);
          return `
            <article class="upgrade-card ${upgrade.isMaxed ? "maxed" : ""}">
              <div class="upgrade-head">
                <h3>${upgrade.name}</h3>
                <span>Sv.${current}/${upgrade.maxLevel}</span>
              </div>
              <p>${upgrade.description}</p>
              <button type="button" data-upgrade-id="${upgrade.id}" ${disabled ? "disabled" : ""}>
                ${upgrade.isMaxed ? "Tamamlandı" : `${upgrade.nextCost} hurma ile geliştir`}
              </button>
            </article>
          `;
        })
        .join("");
    }

    if (this.hud.status) {
      const status = game.getStatusText();
      if (status) {
        this.hud.status.innerHTML = `
          <div class="status-card">
            <div class="status-kicker">İftar Vakti</div>
            <h2>${status.title}</h2>
            <p>${status.subtitle}</p>
            <span>${status.action}</span>
          </div>
        `;
        this.hud.status.classList.add("visible");
      } else {
        this.hud.status.innerHTML = "";
        this.hud.status.classList.remove("visible");
      }
    }
  }

  draw(game) {
    const { ctx } = this;
    ctx.save();
    if (game.cameraShakeTime > 0) {
      const mag = game.cameraShakeStrength * (game.cameraShakeTime / 140);
      const ox = (Math.random() * 2 - 1) * mag;
      const oy = (Math.random() * 2 - 1) * mag;
      ctx.translate(ox, oy);
    }

    this.drawBackground(ctx, game.dayPhase);

    if (game.state === "menu") {
      this.drawMenu(ctx);
      this.drawHUD(game);
      ctx.restore();
      return;
    }

    for (const station of game.stations) {
      this.drawStation(ctx, station);
    }

    this.drawPlayer(ctx, game.player);
    game.particles.draw(ctx);

    if (game.state === "levelComplete") {
      this.drawOverlay(ctx, "Seviye Tamamlandı", "Yeni tur için Enter'a bas");
    }

    if (game.state === "gameOver") {
      this.drawOverlay(ctx, "Süre Doldu", `Skor: ${game.score} | R ile yeniden başla`);
    }

    ctx.restore();
    this.drawHUD(game);
  }

  drawMenu(ctx) {
    this.drawOverlay(ctx, "İftar Vakti", "Başlamak için Enter | Hareket: WASD | Etkileşim: E / Boşluk");
  }

  drawOverlay(ctx, title, subtitle) {
    ctx.save();
    ctx.fillStyle = "rgba(0,0,0,0.58)";
    ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.fillStyle = "#f0d392";
    ctx.textAlign = "center";
    ctx.font = "bold 56px Georgia";
    ctx.fillText(title, this.canvas.width / 2, this.canvas.height / 2 - 24);
    ctx.font = "28px Georgia";
    ctx.fillStyle = "#ffe8bf";
    ctx.fillText(subtitle, this.canvas.width / 2, this.canvas.height / 2 + 26);
    ctx.restore();
  }
}
