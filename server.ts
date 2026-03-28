import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock data (in a real app, this would be in a database)
  const menuItems = [
    { id: 1, title: "Dry Fruit Pootharekulu", price: "Rs. 600", qty: "10 pieces", url: "https://www.godavarivantillu.com/cdn/shop/products/dry-fruit-pootharekulu-839_480x480.jpg?v=1760552286", description: "The legendary paper-thin sweet from Atreyapuram, stuffed with a rich mix of dry fruits and pure ghee.", category: "Sweets" },
    { id: 2, title: "Tapeswaram Madatha Kaja", price: "Rs. 450", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/tapeswaram-madatha-kaja-125_480x480.jpg?v=1637866867", description: "Authentic Tapeswaram Madatha Kaja, a traditional Andhra sweet known for its layered texture and juicy sweetness.", category: "Sweets" },
    { id: 3, title: "Bellam Sunnundalu", price: "Rs. 380", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/bellam-sunnundalu-sunnivundalu-jaggery-urad-dal-ladoo-537_480x480.png?v=1638886136", description: "Nutritious and delicious Urad Dal Ladoo made with jaggery, a classic Godavari delicacy.", category: "Sweets" },
    { id: 4, title: "Nuvvula Ariselu", price: "Rs. 350", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/nuvvula-arisalu-godavari-style-692_480x480.png?v=1638884991", description: "Traditional sesame-coated rice flour sweet, deep-fried to perfection.", category: "Sweets" },
    { id: 5, title: "Bellam Gavvalu", price: "Rs. 280", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/bellam-gavvalu-original-godavari-recipe-445_480x480.png?v=1638882730", description: "Shell-shaped crunchy sweets coated in jaggery syrup, a childhood favorite.", category: "Sweets" },
    { id: 6, title: "Bandar Laddu", price: "Rs. 420", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/bandar-laddu-tokkudu-854_480x480.png?v=1638885756", description: "Famous Machilipatnam Bandar Laddu, smooth and melt-in-the-mouth texture.", category: "Sweets" },
    { id: 7, title: "Nethi Ariselu", price: "Rs. 400", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/nethi-ariselu-294_480x480.jpg?v=1638884969", description: "Rich and soft Ariselu made with pure ghee, a festive essential.", category: "Sweets" },
    { id: 8, title: "Kajjikayalu", price: "Rs. 320", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/kajjikayalu-crispy-coconut-gujiyakaranji-221_480x480.png?v=1638885020", description: "Crispy fried dumplings stuffed with sweet coconut and semolina mixture.", category: "Sweets" },
    { id: 9, title: "Nuvvula Laddu", price: "Rs. 300", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/bellam-nuvvula-undalu-laddu-sesame-ladoo-til-194_480x480.png?v=1638886007", description: "Healthy sesame and jaggery balls, rich in iron and calcium.", category: "Sweets" },
    { id: 10, title: "Badhusha", price: "Rs. 350", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/badhusha-andhra-home-made-special-sweet-301_480x480.jpg?v=1638886530", description: "Soft and flaky Badhusha, a classic Indian sweet glazed with sugar syrup.", category: "Sweets" },
    { id: 11, title: "Boondhi Achu", price: "Rs. 280", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/boondhi-achu-or-mithai-karakajjam-242_480x480.jpg?v=1638886107", description: "Sweet boondhi pressed into cakes, a traditional crunchy treat.", category: "Sweets" },
    { id: 12, title: "Kobbari Kova Laddu", price: "Rs. 450", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/kobbari-kova-laddu-kajjikayalu-763_480x480.jpg?v=1638885041", description: "Coconut and milk solid (kova) balls, rich and creamy.", category: "Sweets" },
    { id: 13, title: "Chalividi", price: "Rs. 250", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/chalividi-or-chalimidi-bellam-757_480x480.jpg?v=1638886386", description: "Traditional rice flour and jaggery sweet, often served at weddings.", category: "Sweets" },
    { id: 14, title: "Pakundalu", price: "Rs. 320", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/pakundalu-910_480x480.png?v=1638886434", description: "Deep-fried rice flour and jaggery dumplings, a rural Andhra specialty.", category: "Sweets" },
    { id: 15, title: "Kova Billalu / Pala Kova", price: "Rs. 480", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/kova-billalu-pala-made-with-100-pure-organic-milk-949_480x480.jpg?v=1638883601", description: "Pure milk kova discs, made with 100% organic milk.", category: "Sweets" },
    { id: 16, title: "Kakinada Gottam Kaja", price: "Rs. 420", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/kakinada-gottam-kaja-152_480x480.jpg?v=1638885869", description: "The iconic Kakinada Gottam Kaja, cylindrical and syrup-filled.", category: "Sweets" },
    { id: 17, title: "Bellam Jeedilu", price: "Rs. 200", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/bellam-jeedilu-149_480x480.jpg?v=1638886880", description: "Traditional jaggery and nut candies, a nostalgic treat.", category: "Sweets" },
    { id: 18, title: "Bellam Pootharekulu", price: "Rs. 500", qty: "10 pieces", url: "https://www.godavarivantillu.com/cdn/shop/products/shutterstock_1665681847_low_res-removebg-preview_e8846803-9323-4ec8-aa10-571767a14f6b_480x480.jpg?v=1660039215", description: "The famous 'Paper Sweet' from Atreyapuram, made with thin rice sheets and jaggery.", category: "Sweets" },
    { id: 19, title: "Avakaya (Mango Pickle)", price: "Rs. 350", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/avakaya-authentic-andhra-mango-pickle-577_480x480.png?v=1638984524", description: "Spicy and tangy authentic Andhra mango pickle, a staple in every home.", category: "Pickles" },
    { id: 20, title: "Gongura Pickle", price: "Rs. 280", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/gongura-pickle-nilva-pachadi-979_480x480.png?v=1638984591", description: "The pride of Andhra, spicy Gongura (Sorrel leaves) pickle.", category: "Pickles" },
    { id: 21, title: "Andhra Tomato Pickle", price: "Rs. 300", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/andhra-tomato-pickle-pachadi-169_480x480.jpg?v=1638984639", description: "Zesty tomato pickle made with sun-dried tomatoes and spices.", category: "Pickles" },
    { id: 22, title: "Boneless Chicken Pickle", price: "Rs. 650", qty: "500 g", url: "https://www.godavarivantillu.com/cdn/shop/products/BonelessChickenPickle_480x480.jpg?v=1627596545", description: "Spicy and savory boneless chicken pickle, a non-veg delight.", category: "Pickles" },
    { id: 23, title: "Hot Samosa", price: "Rs. 100", qty: "5 pieces", url: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&q=80", description: "Crispy and hot samosas with a savory potato filling.", category: "Bakery" },
    { id: 24, title: "Veg Puffs", price: "Rs. 120", qty: "4 pieces", url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", description: "Light and flaky puff pastry with savory vegetable filling.", category: "Bakery" },
    { id: 25, title: "Chocolate Cake", price: "Rs. 650", qty: "1 kg", url: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80", description: "Rich and moist chocolate cake for all occasions.", category: "Bakery" },
    { id: 26, title: "Black Forest Pastry", price: "Rs. 60", qty: "1 piece", url: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80", description: "Individual black forest pastry slice with cherries and cream.", category: "Bakery" },
    { id: 27, title: "Butter Cookies", price: "Rs. 180", qty: "250 g", url: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=800&q=80", description: "Crunchy and buttery cookies, perfect with tea.", category: "Bakery" },
    { id: 28, title: "Milk Biscuits", price: "Rs. 150", qty: "250 g", url: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80", description: "Assorted milk biscuits for your daily snack needs.", category: "Bakery" },
    { id: 29, title: "Assorted Chocolates", price: "Rs. 450", qty: "1 box", url: "https://images.unsplash.com/photo-1614088685112-0a760b71a3c8?w=800&q=80", description: "Premium assorted chocolates in a gift box.", category: "Bakery" },
    { id: 30, title: "Milk Bread", price: "Rs. 45", qty: "1 loaf", url: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80", description: "Soft and fresh milk bread baked daily.", category: "Bakery" },
    { id: 31, title: "Fruit Buns", price: "Rs. 40", qty: "1 pack", url: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?w=800&q=80", description: "Soft sweet buns with dried fruits.", category: "Bakery" },
    { id: 32, title: "Milk Rusk", price: "Rs. 80", qty: "1 pack", url: "https://images.unsplash.com/photo-1621236378699-8597faf6a176?w=800&q=80", description: "Twice-baked crispy milk rusk.", category: "Bakery" },
    { id: 33, title: "Khari Biscuit", price: "Rs. 120", qty: "250 g", url: "https://images.unsplash.com/photo-1601000938259-9e92002320b2?w=800&q=80", description: "Salty and flaky Khari biscuits.", category: "Bakery" },
    { id: 34, title: "Cream Rolls", price: "Rs. 25", qty: "1 piece", url: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80", description: "Crispy rolls filled with sweet cream.", category: "Bakery" },
    { id: 35, title: "Vanilla Muffins", price: "Rs. 40", qty: "1 piece", url: "https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&q=80", description: "Soft and moist vanilla muffins.", category: "Bakery" },
    { id: 36, title: "Choco Brownies", price: "Rs. 80", qty: "1 piece", url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&q=80", description: "Rich and fudgy chocolate brownies.", category: "Bakery" },
    { id: 37, title: "Glazed Donuts", price: "Rs. 50", qty: "1 piece", url: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&q=80", description: "Glazed and topped donuts, a sweet treat.", category: "Bakery" },
    { id: 38, title: "Red Velvet Cupcakes", price: "Rs. 70", qty: "1 piece", url: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?w=800&q=80", description: "Beautifully decorated red velvet cupcakes.", category: "Bakery" }
  ];

  // API Routes
  app.get("/api/menu", (req, res) => {
    res.json(menuItems);
  });

  app.get("/api/menu/:id", (req, res) => {
    const item = menuItems.find(i => i.id === parseInt(req.params.id));
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  });

  app.get("/api/related/:id", (req, res) => {
    const currentItem = menuItems.find(i => i.id === parseInt(req.params.id));
    if (!currentItem) return res.status(404).json({ message: "Item not found" });
    
    // Simple logic: same category, different ID
    const related = menuItems
      .filter(i => i.category === currentItem.category && i.id !== currentItem.id)
      .slice(0, 5);
    res.json(related);
  });

  app.post("/api/orders", (req, res) => {
    const { customer, item, timestamp } = req.body;
    console.log(`New Order Received: ${JSON.stringify({ customer, item, timestamp }, null, 2)}`);
    res.status(201).json({ success: true, message: "Order placed successfully", orderId: Math.floor(Math.random() * 1000000) });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
