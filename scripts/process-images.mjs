import sharp from 'sharp';
import { readdirSync, existsSync, mkdirSync } from 'fs';
import { join, extname, basename } from 'path';

const SOURCE = 'C:\\Users\\gutie\\OneDrive\\Desktop\\mi obra';
const PAINT_OUT = 'public/images/paintings';
const ILLUS_OUT = 'public/images/illustrations';

// Normalise a filename stem to a clean slug
function toSlug(stem) {
  return stem
    // remove illustration suffixes (including typos)
    .replace(/_(iilustracion|ilustraacion|ilustracion)$/i, '')
    // lowercase
    .toLowerCase()
    // transliterate common Spanish chars
    .replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i')
    .replace(/ó/g, 'o').replace(/ú/g, 'u').replace(/ü/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/à/g, 'a').replace(/è/g, 'e').replace(/ì/g, 'i')
    .replace(/ò/g, 'o').replace(/ù/g, 'u')
    // remove dots (e.g. "dr.sthalberg")
    .replace(/\./g, '')
    // replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // remove any char that isn't alphanumeric or hyphen
    .replace(/[^a-z0-9-]/g, '')
    // collapse multiple hyphens
    .replace(/-{2,}/g, '-')
    // trim leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

// Convert slug to display title
function toTitle(slug) {
  return slug
    .split('-')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}

// Process a single image: trim white/transparent borders, resize, compress
async function processImage(srcPath, destPath) {
  try {
    await sharp(srcPath)
      .trim({ background: '#ffffff', threshold: 20 })
      .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(destPath);
  } catch (err) {
    // If trim fails (e.g. CMYK or unusual profile), fall back without trim
    try {
      await sharp(srcPath)
        .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
        .jpeg({ quality: 88, mozjpeg: true })
        .toFile(destPath);
    } catch (err2) {
      console.error(`  ERROR processing ${basename(srcPath)}: ${err2.message}`);
    }
  }
}

async function main() {
  const files = readdirSync(SOURCE).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

  const illustrations = files.filter(f => /_ilustracion|_iilustracion|_ilustraacion/i.test(f));
  const paintings = files.filter(f => !/_ilustracion|_iilustracion|_ilustraacion/i.test(f));

  console.log(`Found ${paintings.length} paintings, ${illustrations.length} illustrations`);

  const paintingData = [];
  const illustrationData = [];

  // Track slugs to handle duplicates
  const usedSlugs = new Set();
  function uniqueSlug(base) {
    let slug = base;
    let i = 2;
    while (usedSlugs.has(slug)) { slug = `${base}-${i}`; i++; }
    usedSlugs.add(slug);
    return slug;
  }

  // --- Paintings ---
  console.log('\n=== PAINTINGS ===');
  for (const file of paintings) {
    const stem = basename(file, extname(file));
    const slug = uniqueSlug(toSlug(stem));
    const title = toTitle(slug);
    const destFile = slug + '.jpg';
    const destPath = join(PAINT_OUT, destFile);
    const srcPath = join(SOURCE, file);

    process.stdout.write(`  ${file} → ${destFile} `);
    await processImage(srcPath, destPath);
    console.log('✓');

    paintingData.push({ slug, title, coverImage: `/images/paintings/${destFile}`, status: 'exhibited' });
  }

  // Reset slug tracking for illustrations (separate namespace)
  usedSlugs.clear();

  // --- Illustrations ---
  console.log('\n=== ILLUSTRATIONS ===');
  for (const file of illustrations) {
    const stem = basename(file, extname(file));
    const slug = uniqueSlug(toSlug(stem));
    const title = toTitle(slug);
    const destFile = slug + '.jpg';
    const destPath = join(ILLUS_OUT, destFile);
    const srcPath = join(SOURCE, file);

    process.stdout.write(`  ${file} → ${destFile} `);
    await processImage(srcPath, destPath);
    console.log('✓');

    illustrationData.push({ slug, title, previewImage: `/images/illustrations/${destFile}` });
  }

  // --- Output data for copy-paste ---
  console.log('\n\n=== PAINTING DATA (paste into paintings.ts) ===');
  console.log(JSON.stringify(paintingData, null, 2));

  console.log('\n\n=== ILLUSTRATION DATA (paste into illustrations.ts) ===');
  console.log(JSON.stringify(illustrationData, null, 2));
}

main().catch(console.error);
