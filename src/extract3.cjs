const fs = require('fs');
const data = fs.readFileSync('home.html', 'utf8');
const urls = data.match(/\/\/[^"'\s]+_480x480\.(?:jpg|jpeg|png)/gi);
if (urls) {
  console.log([...new Set(urls)].slice(0, 30).join('\n'));
} else {
  console.log("No URLs found");
}
