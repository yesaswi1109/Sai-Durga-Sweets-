const https = require('https');

https.get('https://www.godavarivantillu.com/', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const imgRegex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const urls = [];
    while ((match = imgRegex.exec(data)) !== null) {
      if (match[1].includes('cdn/shop/products') || match[1].includes('cdn/shop/files')) {
        urls.push(match[1]);
      }
    }
    console.log(urls.slice(0, 20).join('\n'));
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
