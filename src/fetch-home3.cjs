const https = require('https');

https.get('https://www.godavarivantillu.com/', {
  headers: {
    'User-Agent': 'Mozilla/5.0'
  }
}, (res) => {
  console.log("Status:", res.statusCode);
  console.log("Headers:", res.headers);
});
