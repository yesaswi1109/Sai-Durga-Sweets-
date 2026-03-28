const https = require('https');

const urls = [
  "https://www.godavarivantillu.com/cdn/shop/products/pootharekulu-dry-fruit-10-pieces-297_720x.jpg",
  "https://www.godavarivantillu.com/cdn/shop/products/tapeswaram-kaja-madatha-kaja-295_720x.jpg"
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      resolve({ url, status: res.statusCode });
    }).on('error', () => resolve({ url, status: 'error' }));
  });
}

async function main() {
  for (const url of urls) {
    const res = await checkUrl(url);
    console.log(`${res.status} - ${res.url}`);
  }
}

main();
