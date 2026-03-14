import { RECIPES } from "./recipes.js";
import { GAME_CONFIG } from "./config/gameConfig.js";

const rand = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;

export class OrderManager {
  constructor(onExpire, config = GAME_CONFIG, modifiers = {}) {
    this.config = config;
    this.activeOrders = [];
    this.maxOrders = modifiers.maxOrders || config.orders.maxActive;
    this.orderTimeMultiplier = modifiers.orderTimeMultiplier || 1;
    this.nextId = 1;
    this.spawnTimer = 0;
    this.spawnCooldown = 0;
    this.onExpire = onExpire;

    this.spawnMin = 15000;
    this.spawnMax = 20000;
    this.phaseTipMultiplier = 2.0;
    this.currentPhase = config.cycle.initialPhase;
    this.diningTableIds = modifiers.diningTableIds || [];

    this.setCyclePhase(this.currentPhase);
    this.spawnOrder();
    this.resetSpawnCooldown();
  }

  setDiningTables(tableIds) {
    this.diningTableIds = tableIds;
  }

  getAvailableTableId() {
    const usedIds = new Set(this.activeOrders.map((order) => order.tableId).filter(Boolean));
    return this.diningTableIds.find((id) => !usedIds.has(id)) || null;
  }

  resetSpawnCooldown() {
    this.spawnCooldown = rand(this.spawnMin, this.spawnMax);
    this.spawnTimer = 0;
  }

  setCyclePhase(phase) {
    this.currentPhase = phase;
    const phaseConfig = this.config.cycle.phases[phase] || this.config.cycle.phases[this.config.cycle.initialPhase];
    this.spawnMin = phaseConfig.orders.spawnMinMs;
    this.spawnMax = phaseConfig.orders.spawnMaxMs;
    this.phaseTipMultiplier = phaseConfig.orders.tipMultiplier;
  }

  update(delta) {
    this.spawnTimer += delta;
    if (this.activeOrders.length < this.maxOrders && this.spawnTimer >= this.spawnCooldown) {
      this.spawnOrder();
      this.resetSpawnCooldown();
    }

    const expired = [];
    for (const order of this.activeOrders) {
      order.elapsed += delta;
      if (order.elapsed >= order.timeLimit) {
        expired.push(order.id);
      }
    }

    if (expired.length > 0) {
      this.activeOrders = this.activeOrders.filter((o) => !expired.includes(o.id));
      if (this.onExpire) {
        for (let i = 0; i < expired.length; i += 1) {
          this.onExpire(this.config.orders.expirePenalty, this.config.orders.expireMessage);
        }
      }
    }
  }

  spawnOrder() {
    if (this.activeOrders.length >= this.maxOrders) return null;
    const tableId = this.getAvailableTableId();
    if (!tableId) return null;

    const recipeKeys = Object.keys(RECIPES);
    const key = recipeKeys[Math.floor(Math.random() * recipeKeys.length)];
    const recipe = RECIPES[key];
    const order = {
      id: this.nextId++,
      recipe,
      tableId,
      timeLimit: Math.round(this.config.orders.timeLimitMs * this.orderTimeMultiplier),
      elapsed: 0,
      tipMultiplier: this.phaseTipMultiplier
    };

    this.activeOrders.push(order);
    return order;
  }

  completeOrder(recipeKey, tableId = null) {
    const idx = this.activeOrders.findIndex((o) => {
      const foundKey = Object.keys(RECIPES).find((k) => RECIPES[k] === o.recipe);
      if (tableId && o.tableId !== tableId) return false;
      return foundKey === recipeKey;
    });

    if (idx === -1) {
      return { success: false, points: 0, tip: 0, total: 0, order: null };
    }

    const order = this.activeOrders[idx];
    this.activeOrders.splice(idx, 1);

    const base = order.recipe.points;
    const leftRatio = Math.max(0, 1 - order.elapsed / order.timeLimit);
    const tipFactor = 1 + (order.tipMultiplier - 1) * leftRatio;
    const tip = Math.round(base * (tipFactor - 1));
    const total = base + tip;

    return { success: true, points: base, tip, total, order };
  }

  getUrgencyColor(order) {
    const ratio = Math.max(0, 1 - order.elapsed / order.timeLimit);
    if (ratio > 0.6) return "#47c263";
    if (ratio > 0.3) return "#d7b933";
    return "#d9442f";
  }
}
