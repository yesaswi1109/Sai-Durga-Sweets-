const https = require('https');

https.get('https://www.godavarivantillu.com/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
}, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const urls = data.match(/https:\/\/[^"'\s]+\.(?:jpg|jpeg|png)/gi);
    if (urls) {
      console.log([...new Set(urls)].slice(0, 30).join('\n'));
    } else {
      console.log("No URLs found");
    }
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
