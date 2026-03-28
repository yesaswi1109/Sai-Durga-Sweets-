const https = require('https');

const urls = [
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Pootharekulu.jpg/800px-Pootharekulu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Kakinada_Kaja.JPG/800px-Kakinada_Kaja.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Sunnundalu.JPG/800px-Sunnundalu.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Ariselu_in_a_plate.JPG/800px-Ariselu_in_a_plate.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Gavvalu.JPG/800px-Gavvalu.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Bandar_Laddu.JPG/800px-Bandar_Laddu.JPG",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Puran_Poli.jpg/800px-Puran_Poli.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Karanji.jpg/800px-Karanji.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Til_Laddu.jpg/800px-Til_Laddu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Jalebi_2.jpg/800px-Jalebi_2.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Mysore_Pak_3.jpg/800px-Mysore_Pak_3.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Kaju_Katli.jpg/800px-Kaju_Katli.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Gulab_jamun_%281%29.jpg/800px-Gulab_jamun_%281%29.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e2/Rasgulla_1.jpg/800px-Rasgulla_1.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Kalakand.jpg/800px-Kalakand.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Motichoor_Laddu.jpg/800px-Motichoor_Laddu.jpg",
  "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Karachi_Halwa.jpg/800px-Karachi_Halwa.jpg"
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
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
