const https = require('https');

async function fetchHtml() {
  return new Promise((resolve) => {
    https.get('https://www.godavarivantillu.com/collections/sweets', { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', () => resolve(''));
  });
}

async function main() {
  const html = await fetchHtml();
  const imgRegex = /<img[^>]+src="([^">]+)"[^>]*alt="([^">]+)"/g;
  let match;
  const items = [];
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1].includes('products') && match[1].includes('480x480')) {
      items.push({ url: 'https:' + match[1], title: match[2] });
    }
  }
  console.log(JSON.stringify(items, null, 2));
}

main();
