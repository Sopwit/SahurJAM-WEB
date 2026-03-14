import { Game } from "./game.js";
import { GAME_CONFIG } from "./config/gameConfig.js";
import { AssetManager } from "./assetManager.js";

const canvas = document.getElementById("gameCanvas");
const startScreen = document.getElementById("startScreen");
const startButton = document.getElementById("startButton");
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
  soundButton: document.getElementById("soundButton")
};

const assets = new AssetManager();
await assets.loadAll();

const game = new Game(canvas, hudRefs, GAME_CONFIG, assets);

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

document.getElementById("pauseButton").addEventListener("click", () => {
  game.togglePause();
});

document.getElementById("soundButton").addEventListener("click", () => {
  game.toggleSound();
});

document.getElementById("resetProgressButton").addEventListener("click", () => {
  game.resetProgress();
});

document.getElementById("upgradeList").addEventListener("click", (event) => {
  const button = event.target.closest("[data-upgrade-id]");
  if (!button) return;
  const upgradeId = button.getAttribute("data-upgrade-id");
  if (!upgradeId) return;
  game.purchaseUpgrade(upgradeId);
});
