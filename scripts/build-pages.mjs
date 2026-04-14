import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const distDir = path.join(rootDir, "dist");

const filesToCopy = [
  "index.html",
  "style.css"
];

const directoriesToCopy = [
  "assets",
  "audio",
  "src"
];

async function copyEntry(relativePath) {
  const source = path.join(rootDir, relativePath);
  const destination = path.join(distDir, relativePath);
  await cp(source, destination, { recursive: true });
}

async function buildPagesBundle() {
  await rm(distDir, { recursive: true, force: true });
  await mkdir(distDir, { recursive: true });

  for (const file of filesToCopy) {
    await copyEntry(file);
  }

  for (const directory of directoriesToCopy) {
    await copyEntry(directory);
  }

  await writeFile(path.join(distDir, ".nojekyll"), "");
}

try {
  await buildPagesBundle();
} catch (error) {
  console.error(error);
  process.exitCode = 1;
}
