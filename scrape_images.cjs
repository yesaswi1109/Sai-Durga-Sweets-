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
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  let match;
  const urls = [];
  while ((match = imgRegex.exec(html)) !== null) {
    if (match[1].includes('products')) {
      urls.push(match[1]);
    }
  }
  console.log(urls.slice(0, 20).join('\n'));
}

main();
