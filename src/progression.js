function canUseStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

export function createDefaultProgress(config) {
  const upgrades = {};
  for (const upgrade of config.upgrades.catalog) {
    upgrades[upgrade.id] = 0;
  }

  return {
    highScore: 0,
    bestCombo: 0,
    totalHurma: 0,
    lifetimeHurma: 0,
    settings: {
      soundEnabled: true
    },
    upgrades
  };
}

export function loadProgress(config) {
  const defaults = createDefaultProgress(config);
  if (!canUseStorage()) return defaults;

  try {
    const raw = window.localStorage.getItem(config.progress.storageKey);
    if (!raw) return defaults;
    const parsed = JSON.parse(raw);
    return {
      ...defaults,
      ...parsed,
      settings: {
        ...defaults.settings,
        ...(parsed.settings || {})
      },
      upgrades: {
        ...defaults.upgrades,
        ...(parsed.upgrades || {})
      }
    };
  } catch {
    return defaults;
  }
}

export function saveProgress(config, progress) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(config.progress.storageKey, JSON.stringify(progress));
}

export function calculateUpgradeEffects(config, levels) {
  const totals = {
    playerSpeedMultiplier: 1,
    processSpeedMultiplier: 1,
    orderTimeMultiplier: 1,
    scoreMultiplier: 1,
    hurmaMultiplier: 1
  };

  for (const upgrade of config.upgrades.catalog) {
    const level = Math.max(0, levels[upgrade.id] || 0);
    for (let i = 0; i < level; i += 1) {
      const bonus = upgrade.levels[i]?.bonus || {};
      if (bonus.playerSpeedMultiplier) totals.playerSpeedMultiplier *= bonus.playerSpeedMultiplier;
      if (bonus.processSpeedMultiplier) totals.processSpeedMultiplier *= bonus.processSpeedMultiplier;
      if (bonus.orderTimeMultiplier) totals.orderTimeMultiplier *= bonus.orderTimeMultiplier;
      if (bonus.scoreMultiplier) totals.scoreMultiplier *= bonus.scoreMultiplier;
      if (bonus.hurmaMultiplier) totals.hurmaMultiplier *= bonus.hurmaMultiplier;
    }
  }

  return totals;
}
