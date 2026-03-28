const https = require('https');
const fs = require('fs');

https.get('https://www.godavarivantillu.com/', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    fs.writeFileSync('home.html', data);
    console.log("Saved to home.html");
  });
});
