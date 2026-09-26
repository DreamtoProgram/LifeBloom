import http from 'http';

const BASE = 'http://127.0.0.1:3008';

const routes = [
  '/',
  '/about',
  '/services',
  '/services/life-coaching',
  '/services/career-professional-coaching',
  '/services/mindfulness-stress-management',
  '/services/emotional-intelligence',
  '/services/nlp-transformation',
  '/services/corporate-workshops',
  '/who-we-help',
  '/workshops',
  '/insights',
  '/insights/human-resources-to-human-potential',
  '/insights/building-confidence-from-within',
  '/insights/emotional-intelligence-in-leadership',
  '/contact',
  '/personal-discovery',
  '/privacy-policy',
  '/terms',
  '/coaching-disclaimer',
  '/refund-policy',
  '/cookie-policy',
  '/sitemap.xml',
  '/robots.txt',
  '/manifest.webmanifest',
  '/non-existent-test-page-404'
];

async function fetchRoute(route) {
  const url = `${BASE}${route}`;
  const res = await fetch(url, { redirect: 'manual' });
  const text = await res.text();
  const headers = Object.fromEntries(res.headers.entries());

  return {
    route,
    status: res.status,
    contentType: headers['content-type'] || '',
    length: text.length,
    body: text
  };
}

async function run() {
  console.log('Testing HTTP responses from live Next.js production server...\n');
  let passCount = 0;
  let failCount = 0;

  for (const r of routes) {
    try {
      const data = await fetchRoute(r);
      const isExpected404 = r === '/non-existent-test-page-404';

      if (isExpected404) {
        if (data.status === 404) {
          console.log(`[PASS] ${r} -> HTTP ${data.status} (Correct 404)`);
          passCount++;
        } else {
          console.error(`[FAIL] ${r} -> Expected 404, got HTTP ${data.status}`);
          failCount++;
        }
      } else {
        if (data.status === 200) {
          console.log(`[PASS] ${r} -> HTTP 200 (${data.contentType.split(';')[0]}, ${data.length} bytes)`);
          passCount++;
        } else {
          console.error(`[FAIL] ${r} -> Expected 200, got HTTP ${data.status}`);
          failCount++;
        }
      }

      // Check sitemap specific requirements
      if (r === '/sitemap.xml') {
        if (!data.body.includes('<urlset') && !data.body.includes('<sitemapindex')) {
          console.error('  [FAIL] sitemap.xml does not contain valid XML urlset');
          failCount++;
        } else if (data.body.includes('localhost') || data.body.includes('127.0.0.1')) {
          console.error('  [FAIL] sitemap.xml contains localhost URLs');
          failCount++;
        } else if (!data.body.includes('https://www.shivi.sbs')) {
          console.error('  [FAIL] sitemap.xml does not contain https://www.shivi.sbs');
          failCount++;
        } else {
          console.log('  [PASS] sitemap.xml is valid XML using https://www.shivi.sbs');
        }
      }

      // Check robots.txt specific requirements
      if (r === '/robots.txt') {
        if (!/user-agent:/i.test(data.body) || !data.body.includes('Sitemap: https://www.shivi.sbs/sitemap.xml')) {
          console.error('  [FAIL] robots.txt missing standard directives or sitemap reference');
          failCount++;
        } else {
          console.log('  [PASS] robots.txt correctly references https://www.shivi.sbs/sitemap.xml');
        }
      }

    } catch (err) {
      console.error(`[ERROR] Failed to fetch ${r}: ${err.message}`);
      failCount++;
    }
  }

  console.log(`\nHTTP CRAWL SUMMARY: ${passCount} PASSED, ${failCount} FAILED.`);
  process.exit(failCount > 0 ? 1 : 0);
}

run();
