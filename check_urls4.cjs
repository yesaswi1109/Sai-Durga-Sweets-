const https = require('https');

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/1/11/Pootharekulu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/70/Kakinada_Kaja.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/8/87/Sunnundalu.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/0/07/Ariselu_in_a_plate.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/c/c2/Gavvalu.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/6/6b/Bandar_Laddu.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/e/e0/Puran_Poli.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/7/77/Karanji.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/6/6e/Til_Laddu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/1/1c/Jalebi_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a1/Mysore_Pak_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/4/4b/Kaju_Katli.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/c/c4/Gulab_jamun_%281%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/e/e2/Rasgulla_1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d7/Kalakand.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a2/Motichoor_Laddu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/3/30/Karachi_Halwa.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/5/5e/Dry_Fruits_Sweets.jpg"
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
  process.exit(0);
}

main();
