import { Game } from "./game.js";
import { GAME_CONFIG } from "./config/gameConfig.js";
import { AssetManager } from "./assetManager.js";

const canvas = document.getElementById("gameCanvas");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
const panelToggle = document.getElementById("panelToggle");
const panelClose = document.getElementById("panelClose");
const panelBackdrop = document.getElementById("panelBackdrop");
const metaPanel = document.getElementById("metaPanel");
const panelTabs = Array.from(document.querySelectorAll("[data-panel-tab]"));
const panelViews = Array.from(document.querySelectorAll("[data-panel-view]"));
const hudRefs = {
  score: document.getElementById("score"),
  combo: document.getElementById("combo"),
  timer: document.getElementById("timer"),
  cycle: document.getElementById("cycle"),
  runStats: document.getElementById("runStats"),
  orders: document.getElementById("orders"),
  notifications: document.getElementById("notifications"),
  status: document.getElementById("statusOverlay"),
  controls: document.getElementById("controls"),
  hurma: document.getElementById("hurmaCount"),
  highScore: document.getElementById("highScore"),
  bestCombo: document.getElementById("bestCombo"),
  upgrades: document.getElementById("upgradeList"),
  pauseButton: document.getElementById("pauseButton"),
  soundButton: document.getElementById("soundButton"),
  animationsButton: document.getElementById("animationsButton"),
  hintsButton: document.getElementById("hintsButton")
};

const assets = new AssetManager();
await assets.loadAll();

const game = new Game(canvas, hudRefs, GAME_CONFIG, assets);
let panelOpen = false;

const setActivePanelTab = (tabName) => {
  panelTabs.forEach((tab) => {
    const active = tab.getAttribute("data-panel-tab") === tabName;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
  });
  panelViews.forEach((view) => {
    const active = view.getAttribute("data-panel-view") === tabName;
    view.classList.toggle("is-active", active);
  });
};

const setPanelOpen = (open) => {
  panelOpen = open;
  metaPanel.classList.toggle("is-open", open);
  metaPanel.setAttribute("aria-hidden", String(!open));
  panelToggle.setAttribute("aria-expanded", String(open));
  panelBackdrop.hidden = !open;
};

const resizeCanvas = () => {
  game.resize(window.innerWidth, window.innerHeight);
};

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
game.start();

const syncUi = () => {
  if (game.state !== "menu") {
    startScreen.classList.add("hidden");
  }
  if (game.state === "playing" && panelOpen) {
    panelToggle.textContent = "MENÜ";
  }
  requestAnimationFrame(syncUi);
};

requestAnimationFrame(syncUi);

const beginGame = () => {
  if (!startScreen.classList.contains("hidden")) {
    startScreen.classList.add("hidden");
  }
  game.startRun();
};

startButton.addEventListener("click", beginGame);

panelToggle.addEventListener("click", () => {
  setPanelOpen(!panelOpen);
});

panelClose.addEventListener("click", () => {
  setPanelOpen(false);
});

panelBackdrop.addEventListener("click", () => {
  setPanelOpen(false);
});

panelTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const tabName = tab.getAttribute("data-panel-tab");
    if (!tabName) return;
    setActivePanelTab(tabName);
  });
});

document.getElementById("pauseButton").addEventListener("click", () => {
  const result = game.togglePause();
  if (!result.success) {
    game.notify(result.message);
  }
});

document.getElementById("soundButton").addEventListener("click", () => {
  game.toggleSound();
});

document.getElementById("animationsButton").addEventListener("click", () => {
  game.toggleAnimations();
});

document.getElementById("hintsButton").addEventListener("click", () => {
  game.toggleHints();
});

document.getElementById("resetProgressButton").addEventListener("click", () => {
  const approved = window.confirm("Kayıtlı hurma, skor ve yükseltmeler sıfırlansın mı?");
  if (!approved) return;
  game.resetProgress();
});

document.getElementById("upgradeList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-upgrade-id]");
  if (!button) return;
  const upgradeId = button.getAttribute("data-upgrade-id");
  if (!upgradeId) return;
  const result = game.purchaseUpgrade(upgradeId);
  if (!result.success) {
    game.notify(result.message);
  }
});

window.addEventListener("keydown", (event) => {
  if (event.code === "Tab" && !event.repeat) {
    event.preventDefault();
    setPanelOpen(!panelOpen);
  }

  if (event.code === "Escape" && panelOpen) {
    event.preventDefault();
    event.stopImmediatePropagation();
    setPanelOpen(false);
  }
}, true);
