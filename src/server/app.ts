import express from "express";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client for the backend
// Note: We use process.env here for the backend/serverless function
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const app = express();
app.use(express.json());

// API Routes
app.get("/api/menu", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true });

    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching menu:', error);
    res.status(500).json({ message: "Error fetching menu items" });
  }
});

app.get("/api/menu/:id", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) throw error;
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ message: "Error fetching item details" });
  }
});

app.get("/api/related/:id", async (req, res) => {
  try {
    // 1. Get the category of the current item
    const { data: currentItem, error: fetchError } = await supabase
      .from('products')
      .select('category')
      .eq('id', req.params.id)
      .single();

    if (fetchError || !currentItem) throw fetchError || new Error("Item not found");

    // 2. Get related items in the same category
    const { data: related, error: relatedError } = await supabase
      .from('products')
      .select('*')
      .eq('category', currentItem.category)
      .neq('id', req.params.id)
      .limit(5);

    if (relatedError) throw relatedError;
    res.json(related);
  } catch (error) {
    console.error('Error fetching related items:', error);
    res.status(500).json({ message: "Error fetching related items" });
  }
});

app.post("/api/orders", async (req, res) => {
  const { customer, items, total, timestamp } = req.body;
  
  try {
    const { data, error } = await supabase
      .from('orders')
      .insert([
        { 
          customer_name: customer.name, 
          customer_phone: customer.phone,
          items: items,
          total_amount: total,
          status: 'pending'
        }
      ]);

    if (error) throw error;
    res.status(201).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ message: "Error processing order" });
  }
});

export default app;
