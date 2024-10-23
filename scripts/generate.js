import { existsSync, readdirSync, writeFileSync, readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexPath = join(__dirname, "../src/index.ts");

const iconsDir = join(__dirname, "../src/icons");

if (!existsSync(iconsDir)) {
  console.error("Icons directory does not exist:", iconsDir);
  process.exit(1);
}

const iconFiles = readdirSync(iconsDir).filter((file) => file.endsWith(".tsx"));

iconFiles.forEach((file) => {
  const filePath = join(iconsDir, file);

  let content = readFileSync(filePath, "utf-8");

  content = content.replace(/stroke="[^"]*"/g, 'stroke="currentColor"');

  writeFileSync(filePath, content, "utf-8");
});

const exports = iconFiles
  .map((file) => {
    const iconName = file.replace(".tsx", "");
    return `export { default as ${iconName} } from './icons/${iconName}.js';`;
  })
  .join("\n");

writeFileSync(indexPath, exports);

console.log(
  "Icons have been processed and index.ts has been generated successfully."
);
