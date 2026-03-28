const https = require('https');

const sweets = [
  "Pootharekulu",
  "Kakinada_Kaja",
  "Sunnundalu",
  "Ariselu",
  "Gavvalu",
  "Bandar_Laddu",
  "Puran_Poli",
  "Karanji",
  "Til_Laddu",
  "Jalebi",
  "Mysore_Pak",
  "Kaju_Katli",
  "Gulab_jamun",
  "Rasgulla",
  "Kalakand",
  "Motichoor_Laddu",
  "Karachi_Halwa"
];

async function getImageUrl(title) {
  return new Promise((resolve) => {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${title}&prop=pageimages&format=json&pithumbsize=800`;
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', () => resolve(null));
  });
}

async function main() {
  for (const sweet of sweets) {
    const url = await getImageUrl(sweet);
    console.log(`${sweet}: ${url}`);
  }
}

main();
