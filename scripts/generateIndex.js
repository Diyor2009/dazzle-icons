import { existsSync, readdir, readdirSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const indexPath = join(__dirname, "../src/index.ts");
const iconsDir = join(__dirname, "../src");

if (!existsSync(iconsDir)) {
  console.error("Icons directory does not exist:", iconsDir);
  process.exit(1);
}

readdir(iconsDir, (err) => {
  if (err) {
    console.error("Error reading icons directory:", err);
    return;
  }
});

const iconFiles = readdirSync(iconsDir).filter((file) => file.endsWith(".tsx"));

const exports = iconFiles
  .map((file) => {
    const iconName = file.replace(".tsx", "");
    return `export { default as ${iconName} } from './${iconName}.js';`;
  })
  .join("\n");

writeFileSync(indexPath, exports);

console.log("index.ts has been generated successfully.");
