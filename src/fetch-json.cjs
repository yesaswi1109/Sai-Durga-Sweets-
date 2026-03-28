const https = require('https');

https.get('https://www.godavarivantillu.com/products.json?limit=10', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const json = JSON.parse(data);
      json.products.forEach(p => {
        console.log(p.title);
        if (p.images && p.images.length > 0) {
          console.log(p.images[0].src);
        }
      });
    } catch (e) {
      console.log(e);
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
