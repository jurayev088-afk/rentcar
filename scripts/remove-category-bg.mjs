/**
 * Kategoriya rasmlari fonini olib tashlash (oq/qora/kulrang).
 * Gibrid kabi murakkab fon uchun ham chetlar bo‘yicha flood-fill.
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const dir = path.resolve("public/categories");
const files = [
  "sedan.png",
  "krossover.png",
  "kupe.png",
  "miniven.png",
  "elektromobil.png",
  "gibrid.png",
  "byudjetli.png",
  "premium.png",
];

function isBg(r, g, b, mode) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const sat = max - min;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (mode === "black") {
    return lum < 28 && sat < 25;
  }
  if (mode === "photo") {
    // och kulrang / oq / past saturatsiya fon
    return (lum > 205 && sat < 55) || (lum > 185 && sat < 28);
  }
  // white / light gray studio
  return (lum > 238 && sat < 40) || (lum > 250 && sat < 60);
}

function softAlpha(r, g, b, mode) {
  if (!isBg(r, g, b, mode)) return 255;
  const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  if (mode === "black") {
    if (lum < 12) return 0;
    return Math.round(Math.min(255, ((lum - 12) / 20) * 255));
  }
  if (lum > 250) return 0;
  if (lum > 235) return Math.round(((250 - lum) / 15) * 255);
  return 40;
}

async function processFile(file) {
  const src = path.join(dir, file);
  const { data, info } = await sharp(src)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  const out = Buffer.from(data);

  const mode =
    file === "byudjetli.png"
      ? "black"
      : file === "gibrid.png"
        ? "photo"
        : "white";

  // 1) per-pixel chroma
  for (let i = 0; i < out.length; i += channels) {
    const r = out[i];
    const g = out[i + 1];
    const b = out[i + 2];
    out[i + 3] = softAlpha(r, g, b, mode);
  }

  // 2) flood-fill from edges for leftover bg blobs
  const visited = new Uint8Array(width * height);
  const stack = [];
  const push = (x, y) => {
    if (x < 0 || y < 0 || x >= width || y >= height) return;
    const idx = y * width + x;
    if (visited[idx]) return;
    visited[idx] = 1;
    stack.push(idx);
  };

  for (let x = 0; x < width; x++) {
    push(x, 0);
    push(x, height - 1);
  }
  for (let y = 0; y < height; y++) {
    push(0, y);
    push(width - 1, y);
  }

  while (stack.length) {
    const idx = stack.pop();
    const o = idx * channels;
    const r = out[o];
    const g = out[o + 1];
    const b = out[o + 2];
    const a = out[o + 3];

    // faqat och/qora fonni yutish
    const bgish =
      a < 220 ||
      isBg(r, g, b, mode) ||
      (mode === "photo" &&
        0.2126 * r + 0.7152 * g + 0.0722 * b > 160 &&
        Math.max(r, g, b) - Math.min(r, g, b) < 45);

    if (!bgish) continue;

    out[o + 3] = 0;
    const x = idx % width;
    const y = (idx / width) | 0;
    push(x + 1, y);
    push(x - 1, y);
    push(x, y + 1);
    push(x, y - 1);
  }

  // 3) trim + normalize size
  const png = await sharp(out, {
    raw: { width, height, channels },
  })
    .trim({ threshold: 8 })
    .resize({
      width: 720,
      height: 400,
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  fs.writeFileSync(src, png);
  const m = await sharp(src).metadata();
  console.log(file, m.width + "x" + m.height, "hasAlpha=" + m.hasAlpha, png.length);
}

for (const f of files) {
  await processFile(f);
}
console.log("done");
