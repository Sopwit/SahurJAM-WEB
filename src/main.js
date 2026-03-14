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
  orders: document.getElementById("orders"),
  notifications: document.getElementById("notifications")
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

const beginGame = () => {
  if (!startScreen.classList.contains("hidden")) {
    startScreen.classList.add("hidden");
  }
  game.startRun();
};

startButton.addEventListener("click", beginGame);
