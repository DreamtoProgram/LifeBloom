import fs from 'fs';
import path from 'path';

const appDir = path.resolve('.next/server/app');
const publicDir = path.resolve('public');

function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(fullPath));
    } else if (file.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(appDir);

const pages = [];
const allInternalHrefs = new Set();
const allImgSrcs = new Set();

for (const file of htmlFiles) {
  const relPath = path.relative(appDir, file).replace(/\\/g, '/');
  // Skip _global-error.html as it is Next.js error fallback
  if (relPath.includes('_global-error')) continue;

  const content = fs.readFileSync(file, 'utf-8');

  // Title
  const titleMatch = content.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : null;

  // Description
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                    content.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
  const description = descMatch ? descMatch[1] : null;

  // Canonical
  const canMatch = content.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i) ||
                   content.match(/<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["']/i);
  const canonical = canMatch ? canMatch[1] : null;

  // Robots
  const robotsMatch = content.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["']/i);
  const robots = robotsMatch ? robotsMatch[1] : null;

  // H1s
  const h1s = [...content.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim().replace(/\s+/g, ' '));

  // JSON-LD
  const jsonLdScripts = [...content.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  const jsonLdErrors = [];
  const schemas = [];
  for (const s of jsonLdScripts) {
    try {
      const parsed = JSON.parse(s[1]);
      schemas.push(parsed);
    } catch (e) {
      jsonLdErrors.push(e.message);
    }
  }

  // Links
  const hrefs = [...content.matchAll(/<a[^>]*href=["']([^"']*)["']/gi)].map(m => m[1]);
  for (const h of hrefs) {
    if (h.startsWith('/') && !h.startsWith('//')) {
      allInternalHrefs.add(h.split('#')[0].split('?')[0]);
    }
  }

  // Images
  const imgs = [...content.matchAll(/<img[^>]*src=["']([^"']*)["']/gi)].map(m => m[1]);
  for (const src of imgs) {
    allImgSrcs.add(src);
  }

  pages.push({
    file: relPath,
    title,
    description,
    canonical,
    robots,
    h1s,
    jsonLdCount: schemas.length,
    jsonLdErrors,
    schemas
  });
}

console.log('=== SUMMARY OF VALIDATED PAGES ===');
console.log(`Total Pages Analyzed: ${pages.length}\n`);

// 1. Check Titles
console.log('--- 1. TITLE AUDIT ---');
const titlesMap = new Map();
pages.forEach(p => {
  if (p.file.includes('_not-found')) return;
  console.log(`[${p.file}] => "${p.title}"`);
  if (!p.title) console.error(`  FAIL: Missing title in ${p.file}`);
  if (p.title && p.title.includes('Shivi | Shivi')) {
    console.error(`  FAIL: Duplicate brand suffix in title: "${p.title}"`);
  }
  const count = titlesMap.get(p.title) || [];
  count.push(p.file);
  titlesMap.set(p.title, count);
});
for (const [t, files] of titlesMap.entries()) {
  if (files.length > 1) {
    console.error(`  FAIL: Duplicate title "${t}" used in: ${files.join(', ')}`);
  }
}

// 2. Check Descriptions
console.log('\n--- 2. META DESCRIPTION AUDIT ---');
const descMap = new Map();
pages.forEach(p => {
  if (p.file.includes('_not-found')) return;
  if (!p.description) {
    console.error(`  FAIL: Missing description in ${p.file}`);
  } else {
    const count = descMap.get(p.description) || [];
    count.push(p.file);
    descMap.set(p.description, count);
  }
});
for (const [d, files] of descMap.entries()) {
  if (files.length > 1) {
    console.error(`  FAIL: Duplicate description used in: ${files.join(', ')}`);
  }
}

// 3. Check Canonical URLs
console.log('\n--- 3. CANONICAL URL AUDIT ---');
const canonicalMap = new Map();
pages.forEach(p => {
  if (p.file.includes('_not-found')) return;
  console.log(`[${p.file}] => ${p.canonical}`);
  if (!p.canonical) {
    console.error(`  FAIL: Missing canonical URL in ${p.file}`);
  } else if (!p.canonical.startsWith('https://www.shivi.sbs')) {
    console.error(`  FAIL: Canonical does not use production domain https://www.shivi.sbs: ${p.canonical}`);
  }
  const count = canonicalMap.get(p.canonical) || [];
  count.push(p.file);
  canonicalMap.set(p.canonical, count);
});
for (const [c, files] of canonicalMap.entries()) {
  if (files.length > 1) {
    console.error(`  FAIL: Duplicate canonical "${c}" in: ${files.join(', ')}`);
  }
}

// 4. Check H1s
console.log('\n--- 4. H1 HEADING AUDIT ---');
pages.forEach(p => {
  if (p.file.includes('_not-found')) return;
  if (p.h1s.length === 0) {
    console.error(`  FAIL: No <h1> found in ${p.file}`);
  } else if (p.h1s.length > 1) {
    console.error(`  FAIL: Multiple <h1> tags (${p.h1s.length}) found in ${p.file}: ${JSON.stringify(p.h1s)}`);
  } else {
    console.log(`[${p.file}] => <h1>: "${p.h1s[0]}"`);
  }
});

// 5. JSON-LD Audit
console.log('\n--- 5. JSON-LD STRUCTURED DATA AUDIT ---');
pages.forEach(p => {
  if (p.jsonLdErrors.length > 0) {
    console.error(`  FAIL: JSON syntax error in ${p.file}:`, p.jsonLdErrors);
  }
});

// 6. Internal link resolution check
console.log('\n--- 6. INTERNAL LINK AUDIT ---');
const knownRoutes = new Set(pages.map(p => {
  let r = '/' + p.file.replace('.html', '').replace('index', '');
  if (r.endsWith('/') && r.length > 1) r = r.slice(0, -1);
  return r || '/';
}));
knownRoutes.add('/api/chat');
knownRoutes.add('/sitemap.xml');
knownRoutes.add('/robots.txt');
knownRoutes.add('/manifest.webmanifest');
knownRoutes.add('/icon.png');
knownRoutes.add('/icon.svg');
knownRoutes.add('/favicon.ico');

for (const h of allInternalHrefs) {
  if (!h || h === '' || h === '#') continue;
  let normalized = h;
  if (normalized.endsWith('/') && normalized.length > 1) normalized = normalized.slice(0, -1);
  if (!knownRoutes.has(normalized)) {
    console.error(`  FAIL: Broken internal link target found in HTML: "${h}" (normalized: "${normalized}")`);
  } else {
    console.log(`  PASS: Link target valid: "${h}"`);
  }
}

// 7. Check images in public
console.log('\n--- 7. IMAGE ASSET AUDIT ---');
for (const src of allImgSrcs) {
  if (src.startsWith('/_next/image')) {
    const urlParam = src.match(/url=([^&]+)/);
    if (urlParam) {
      const decoded = decodeURIComponent(urlParam[1]);
      if (decoded.startsWith('/')) {
        const filePath = path.join(publicDir, decoded.slice(1));
        if (!fs.existsSync(filePath)) {
          console.error(`  FAIL: Broken image asset referenced: "${decoded}"`);
        } else {
          console.log(`  PASS: Image asset exists: "${decoded}"`);
        }
      }
    }
  } else if (src.startsWith('/')) {
    const filePath = path.join(publicDir, src.slice(1));
    if (!fs.existsSync(filePath)) {
      console.error(`  FAIL: Direct image asset missing: "${src}"`);
    } else {
      console.log(`  PASS: Direct image asset exists: "${src}"`);
    }
  }
}
