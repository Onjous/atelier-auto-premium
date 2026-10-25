// Image pipeline: fetches licensed sources (Unsplash License) into .cache/, writes
// optimised JPEGs to public/images/, and records dimensions + blur placeholders in
// src/data/media.generated.json. Also renders the simulated "before" image and the
// default Open Graph card.
//
// Usage: npm run images            (uses cached sources when present)
//        npm run images -- --force (re-encode everything)

import fs from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(import.meta.dirname, '..');
const manifest = JSON.parse(await fs.readFile(path.join(root, 'src/data/media-manifest.json'), 'utf8'));
const cacheDir = path.join(root, '.cache/images-src');
const outDir = path.join(root, 'public/images');
const generatedPath = path.join(root, 'src/data/media.generated.json');
const force = process.argv.includes('--force');

const MAX_EDGE = 2400;
const JPEG = { quality: 80, mozjpeg: true, progressive: true };

await fs.mkdir(cacheDir, { recursive: true });
await fs.mkdir(outDir, { recursive: true });

async function ensureSource(entry) {
  const file = path.join(cacheDir, `${entry.id}.jpg`);
  if (existsSync(file)) return file;
  const url = `https://images.unsplash.com/photo-${entry.unsplashId}?w=${MAX_EDGE}&q=85&fm=jpg`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Download failed for ${entry.id}: ${res.status}`);
  await fs.writeFile(file, Buffer.from(await res.arrayBuffer()));
  return file;
}

async function blurPlaceholder(input) {
  const buf = await sharp(input).resize(16, 16, { fit: 'inside' }).jpeg({ quality: 40 }).toBuffer();
  return `data:image/jpeg;base64,${buf.toString('base64')}`;
}

async function writeOptimised(input, id) {
  const out = path.join(outDir, `${id}.jpg`);
  if (force || !existsSync(out)) {
    await sharp(input)
      .rotate()
      .resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true })
      .jpeg(JPEG)
      .toFile(out);
  }
  const meta = await sharp(out).metadata();
  return { width: meta.width, height: meta.height, blurDataURL: await blurPlaceholder(out) };
}

// Deterministic PRNG so the simulated defects are identical on every run.
function mulberry32(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

async function findHighlights(input, count) {
  const probeWidth = 160;
  const { data, info } = await sharp(input).resize(probeWidth).greyscale().raw().toBuffer({ resolveWithObject: true });
  const values = Array.from(data);
  const points = [];
  for (let n = 0; n < count; n++) {
    let best = -1;
    let bestIndex = 0;
    values.forEach((v, i) => {
      if (v > best) {
        best = v;
        bestIndex = i;
      }
    });
    if (best < 150) break;
    const x = bestIndex % info.width;
    const y = Math.floor(bestIndex / info.width);
    points.push({ x: x / info.width, y: y / info.height });
    // suppress the neighbourhood so the next pick is a different reflection
    const r = Math.round(info.width * 0.12);
    for (let yy = Math.max(0, y - r); yy < Math.min(info.height, y + r); yy++) {
      for (let xx = Math.max(0, x - r); xx < Math.min(info.width, x + r); xx++) values[yy * info.width + xx] = 0;
    }
  }
  return points;
}

// Renders a hazed, swirled version of the source: the honest way to show what
// paint correction removes without passing off an unrelated photo as a "before".
async function simulateBefore(input, id) {
  const out = path.join(outDir, `${id}.jpg`);
  const resized = await sharp(input).rotate().resize(MAX_EDGE, MAX_EDGE, { fit: 'inside', withoutEnlargement: true }).toBuffer();
  const { width, height } = await sharp(resized).metadata();
  const random = mulberry32(1906);
  const highlights = await findHighlights(input, 5);
  const arcs = [];
  for (const h of highlights) {
    const cx = h.x * width;
    const cy = h.y * height;
    for (let i = 0; i < 420; i++) {
      const r = 8 + random() ** 1.5 * width * 0.15;
      const start = random() * Math.PI * 2;
      const sweep = 0.12 + random() * 0.6;
      const x1 = cx + r * Math.cos(start);
      const y1 = cy + r * Math.sin(start);
      const x2 = cx + r * Math.cos(start + sweep);
      const y2 = cy + r * Math.sin(start + sweep);
      const opacity = (0.05 + random() * 0.17).toFixed(3);
      const stroke = (0.5 + random() * 0.8).toFixed(2);
      arcs.push(`<path d="M${x1.toFixed(1)} ${y1.toFixed(1)} A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}" stroke="rgb(255,248,236)" stroke-opacity="${opacity}" stroke-width="${stroke}" fill="none"/>`);
    }
  }
  for (let i = 0; i < 90; i++) {
    const x = random() * width;
    const y = random() * height;
    const len = 30 + random() * 220;
    const angle = random() * Math.PI;
    const opacity = (0.03 + random() * 0.1).toFixed(3);
    arcs.push(`<line x1="${x.toFixed(1)}" y1="${y.toFixed(1)}" x2="${(x + len * Math.cos(angle)).toFixed(1)}" y2="${(y + len * Math.sin(angle)).toFixed(1)}" stroke="white" stroke-opacity="${opacity}" stroke-width="0.8"/>`);
  }
  const overlaySvg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <rect width="100%" height="100%" fill="rgb(214,206,196)" fill-opacity="0.13"/>
      ${arcs.join('')}
    </svg>`,
  );
  const overlay = await sharp(overlaySvg).blur(0.6).png().toBuffer();
  if (force || !existsSync(out)) {
    await sharp(resized)
      .modulate({ saturation: 0.72, brightness: 0.96 })
      .linear(0.82, 14)
      .blur(0.9)
      .composite([{ input: overlay, blend: 'over' }])
      .jpeg(JPEG)
      .toFile(out);
  }
  const meta = await sharp(out).metadata();
  return { width: meta.width, height: meta.height, blurDataURL: await blurPlaceholder(out) };
}

async function renderOpenGraph(input) {
  const out = path.join(root, 'public/og-default.jpg');
  const text = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
    <defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#101113" stop-opacity="0.15"/><stop offset="1" stop-color="#101113" stop-opacity="0.9"/></linearGradient></defs>
    <rect width="1200" height="630" fill="url(#g)"/>
    <line x1="72" y1="470" x2="1128" y2="470" stroke="#C5A779" stroke-opacity="0.6" stroke-width="1"/>
    <text x="72" y="540" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="64" font-weight="300" letter-spacing="10" fill="#F0EDE7">ATELIER AUTO</text>
    <text x="72" y="584" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="22" letter-spacing="5" fill="#A5A6A8">PRECISION DETAILING · PAINT PROTECTION</text>
  </svg>`);
  await sharp(input)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .modulate({ brightness: 1.15 })
    .composite([{ input: text }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(out);
}

const generated = {};
for (const entry of manifest.images) {
  const source = await ensureSource(entry);
  generated[entry.id] = await writeOptimised(source, entry.id);
  process.stdout.write('.');
}
for (const entry of manifest.derived) {
  generated[entry.id] = await simulateBefore(path.join(cacheDir, `${entry.from}.jpg`), entry.id);
}
await renderOpenGraph(path.join(cacheDir, 'hero-studio.jpg'));
await fs.writeFile(generatedPath, `${JSON.stringify(generated, null, 2)}\n`);
console.log(`\nProcessed ${Object.keys(generated).length} images → public/images`);
