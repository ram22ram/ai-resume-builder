/**
 * Next.js Image Optimizer + Code Refactor
 * JPG / PNG → WEBP
 * Safe for Next.js (public/, next/image, imports)
 */

const nodePath = require('path');
const fs = require('fs-extra');
const glob = require('glob');
const sharp = require('sharp');

const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;

const PROJECT_ROOT = process.cwd();

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png'];
const CODE_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx', '.css', '.html'];

const OPTIONS = {
  quality: 80,
  backupOriginals: true,
  dryRun: false,
};

const imageMap = new Map();

/* -------------------------------------------------- */
/* Utils */
/* -------------------------------------------------- */
const isExternal = (src) =>
  src.startsWith('http://') || src.startsWith('https://');

/* -------------------------------------------------- */
/* 1. Find images (Next.js public folder only) */
/* -------------------------------------------------- */
function findImages() {
  return glob.sync('public/**/*.{jpg,jpeg,png}', {
    cwd: PROJECT_ROOT,
    nodir: true,
  });
}

/* -------------------------------------------------- */
/* 2. Convert images to WEBP */
/* -------------------------------------------------- */
async function convertImages(images) {
  for (const relativePath of images) {
    const absPath = nodePath.join(PROJECT_ROOT, relativePath);
    const dir = nodePath.dirname(absPath);
    const baseName = nodePath.basename(
      relativePath,
      nodePath.extname(relativePath)
    );

    const webpAbsPath = nodePath.join(dir, `${baseName}.webp`);

    if (fs.existsSync(webpAbsPath)) {
      console.log(`⏭️  Skipped (exists): ${relativePath}`);
      continue;
    }

    console.log(`🖼️  Converting: ${relativePath}`);

    if (!OPTIONS.dryRun) {
      await sharp(absPath)
        .webp({ quality: OPTIONS.quality })
        .toFile(webpAbsPath);

      if (OPTIONS.backupOriginals) {
        await fs.move(absPath, `${absPath}.backup`, { overwrite: true });
      } else {
        await fs.remove(absPath);
      }
    }

    const publicPath =
      '/' +
      relativePath
        .replace(/^public/, '')
        .replace(nodePath.extname(relativePath), '.webp');

    imageMap.set(publicPath, publicPath);
  }
}

/* -------------------------------------------------- */
/* 3. Find code files */
/* -------------------------------------------------- */
function findCodeFiles() {
  return glob.sync(`**/*.{${CODE_EXTENSIONS.map(e => e.slice(1)).join(',')}}`, {
    cwd: PROJECT_ROOT,
    nodir: true,
    ignore: ['node_modules/**', '.next/**'],
  });
}

/* -------------------------------------------------- */
/* 4. Update JSX / TSX (next/image + imports) */
/* -------------------------------------------------- */
async function updateJSX(filePath) {
  const fullPath = nodePath.join(PROJECT_ROOT, filePath);
  const code = await fs.readFile(fullPath, 'utf8');

  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['jsx', 'typescript'],
  });

  let changed = false;

  traverse(ast, {
    JSXAttribute(babelPath) {
      if (babelPath.node.name.name !== 'src') return;
      const valueNode = babelPath.node.value;
      if (!valueNode || valueNode.type !== 'StringLiteral') return;

      const src = valueNode.value;
      if (isExternal(src)) return;

      if (imageMap.has(src)) {
        valueNode.value = imageMap.get(src);
        changed = true;
      }
    },

    ImportDeclaration(babelPath) {
      const src = babelPath.node.source.value;
      if (!src || isExternal(src)) return;

      const ext = nodePath.extname(src);
      if (IMAGE_EXTENSIONS.includes(ext)) {
        babelPath.node.source.value = src.replace(ext, '.webp');
        changed = true;
      }
    },
  });

  if (changed && !OPTIONS.dryRun) {
    const output = generator(ast, {}, code);
    await fs.writeFile(fullPath, output.code, 'utf8');
    console.log(`✏️  Updated JSX: ${filePath}`);
  }
}

/* -------------------------------------------------- */
/* 5. Update CSS / HTML */
/* -------------------------------------------------- */
async function updateStaticFile(filePath) {
  const fullPath = nodePath.join(PROJECT_ROOT, filePath);
  let content = await fs.readFile(fullPath, 'utf8');
  let updated = false;

  for (const [oldPath, newPath] of imageMap.entries()) {
    const escaped = oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(escaped, 'g');

    if (regex.test(content)) {
      content = content.replace(regex, newPath);
      updated = true;
    }
  }

  if (updated && !OPTIONS.dryRun) {
    await fs.writeFile(fullPath, content, 'utf8');
    console.log(`🎨 Updated file: ${filePath}`);
  }
}

/* -------------------------------------------------- */
/* 6. Run */
/* -------------------------------------------------- */
(async function run() {
  console.log('\n🚀 Next.js Image Optimization Started\n');

  const images = findImages();
  await convertImages(images);

  const codeFiles = findCodeFiles();

  for (const file of codeFiles) {
    if (file.match(/\.(js|jsx|ts|tsx)$/)) {
      await updateJSX(file);
    } else {
      await updateStaticFile(file);
    }
  }

  console.log('\n✅ Next.js Image Migration Complete');
  console.log(`🧾 Total images converted: ${imageMap.size}`);
})();
