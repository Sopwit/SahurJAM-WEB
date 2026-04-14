import { access, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const requiredPaths = [
  "index.html",
  "style.css",
  "server.js",
  "src/main.js",
  "src/game.js",
  "src/assetManager.js",
  "src/audioManager.js",
  "assets/room_pixel.jpg",
  "audio/ramazan.mp3",
  "audio/sahur.wav",
  "audio/siparis-ok.wav",
  "audio/yemek-pisme.wav"
];

const placeholderChecks = [
  {
    file: "main/app/components/MainScreen.tsx",
    pattern: "https://your-game-url.com",
    label: "placeholder play URL"
  },
  {
    file: "main/app/components/TechStack.tsx",
    pattern: "github.com/yourusername/",
    label: "placeholder GitHub URL"
  }
];

function resolveFromRoot(relativePath) {
  return path.join(rootDir, relativePath);
}

async function assertExists(relativePath) {
  await access(resolveFromRoot(relativePath));
}

async function assertNoPlaceholder({ file, pattern, label }) {
  const content = await readFile(resolveFromRoot(file), "utf8");
  if (content.includes(pattern)) {
    throw new Error(`Found ${label} in ${file}`);
  }
}

async function validateRuntimeAssets() {
  const assetManagerSource = await readFile(resolveFromRoot("src/assetManager.js"), "utf8");
  const audioManagerSource = await readFile(resolveFromRoot("src/audioManager.js"), "utf8");

  const assetMatches = [...assetManagerSource.matchAll(/"(assets\/[^"]+)"/g)].map((match) => match[1]);
  const audioMatches = [...audioManagerSource.matchAll(/"\.\/(audio\/[^"]+)"/g)].map((match) => match[1]);

  const referencedPaths = [...new Set([...assetMatches, ...audioMatches])];
  for (const referencedPath of referencedPaths) {
    await assertExists(referencedPath);
  }
}

async function main() {
  for (const requiredPath of requiredPaths) {
    await assertExists(requiredPath);
  }

  for (const check of placeholderChecks) {
    await assertNoPlaceholder(check);
  }

  await validateRuntimeAssets();
}

try {
  await main();
} catch (error) {
  console.error(error.message || error);
  process.exitCode = 1;
}
