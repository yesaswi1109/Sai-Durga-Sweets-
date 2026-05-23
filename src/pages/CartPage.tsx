/// <reference types="vite/client" />
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Trash2, ShoppingBag, ChevronLeft, CreditCard, ShieldCheck, X, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CartPageProps {
  cart: any[];
  updateQuantity: (id: number, delta: number) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
}

export default function CartPage({ cart, updateQuantity, removeFromCart, clearCart }: CartPageProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerDetails, setCustomerDetails] = useState({ name: '', phone: '', email: '' });
  const whatsappNumber = "917305886680";

  const parsePrice = (priceStr: string) => {
    return parseInt(priceStr.replace(/[^0-9]/g, '')) || 0;
  };

  const subtotal = cart.reduce((acc, item) => acc + (parsePrice(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  React.useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setRecommendedProducts(data.slice(0, 6));
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };
    fetchRecommendations();
  }, []);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      // Save order to Supabase if configured
      if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
        const { error } = await supabase
          .from('orders')
          .insert([
            { 
              customer_name: customerDetails.name, 
              customer_phone: customerDetails.phone,
              items: cart,
              total_amount: subtotal,
              status: 'pending'
            }
          ]);
        
        if (error) console.error('Error saving order to Supabase:', error);
      }

      // Also call our backend API
      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: customerDetails,
          items: cart,
          total: subtotal,
          timestamp: new Date().toISOString()
        })
      });

      setIsProcessing(false);
      setIsModalOpen(false);
      
      const orderSummary = cart.map(item => `${item.title} x ${item.quantity}`).join(', ');
      const text = `Hi, I am ${customerDetails.name}. I would like to order: ${orderSummary}. Total Amount: Rs. ${subtotal}. My phone number is ${customerDetails.phone}.`;
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
      
      clearCart();
    } catch (error) {
      console.error('Checkout error:', error);
      setIsProcessing(false);
      alert('Something went wrong. Please try again or contact us directly.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-primary-50/30 flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-primary-100">
          <ShoppingBag className="w-10 h-10 text-primary-200" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-primary-950 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 text-center max-w-xs">Looks like you haven't added any delicious sweets or bakery items yet.</p>
        <Link to="/" className="bg-primary-900 text-white px-8 py-4 rounded-full font-bold hover:bg-primary-800 transition-all shadow-lg shadow-primary-900/20">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-32 pb-20 bg-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-10">
          <Link to="/" className="p-2 bg-white rounded-full border border-gray-200 text-gray-600 hover:text-primary-900 transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-serif font-bold text-primary-950">Your Shopping Cart</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-6"
              >
                <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-bold text-primary-950 mb-1 truncate">{item.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{item.qty}</p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button 
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors border-r border-gray-200"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-bold text-gray-900">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center hover:bg-gray-50 transition-colors border-l border-gray-200"
                      >
                        +
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-lg font-bold text-primary-900">{item.price}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 sticky top-32">
              <h2 className="text-xl font-serif font-bold text-primary-950 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({totalItems})</span>
                  <span>Rs. {subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-primary-950">Total</span>
                  <span className="text-2xl font-bold text-primary-900">Rs. {subtotal}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-primary-900 text-white py-4 rounded-xl font-bold hover:bg-primary-800 transition-all shadow-lg shadow-primary-900/20 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Checkout
              </button>
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-600" />
                <span>Secure checkout via WhatsApp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <h2 className="text-2xl font-serif font-bold text-primary-950 mb-8">You may also like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {recommendedProducts.map((item) => (
            <Link key={item.id} to={`/product/${item.id}`} className="group">
              <div className="aspect-square rounded-xl overflow-hidden bg-gray-100 mb-3 border border-gray-100 relative">
                <img 
                  src={item.url} 
                  alt={item.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {item.url.includes('godavarivantillu') && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded shadow-sm transform -rotate-12 border border-primary-100">
                      <span className="text-primary-800 font-black text-[8px] uppercase tracking-wider">SAIDURGA</span>
                    </div>
                  </div>
                )}
              </div>
              <h4 className="text-xs font-bold text-gray-800 line-clamp-1 group-hover:text-primary-900 transition-colors">
                {item.title}
              </h4>
            </Link>
          ))}
        </div>
      </div>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="bg-[#02042b] p-6 text-white relative">
                <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-white rounded flex items-center justify-center"><div className="w-4 h-4 bg-[#02042b] rounded-sm"></div></div>
                  <span className="font-semibold tracking-wide">Razorpay Secure</span>
                </div>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-white/70 text-sm mb-1">Paying to SaiDurga Sweets</p>
                    <p className="text-sm font-medium opacity-90">{totalItems} Items in Cart</p>
                  </div>
                  <div className="text-right"><p className="text-2xl font-bold">₹ {subtotal.toFixed(2)}</p></div>
                </div>
              </div>
              <div className="p-6">
                <form onSubmit={handleCheckout} className="space-y-5">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Contact Details</h3>
                    <p className="text-sm text-gray-500 mb-4">We need this to send your order confirmation</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <input type="text" required value={customerDetails.name} onChange={(e) => setCustomerDetails({...customerDetails, name: e.target.value})} className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3395ff] outline-none" placeholder="John Doe" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-4 rounded-l-lg border border-r-0 border-gray-300 bg-gray-50 text-gray-500">+91</span>
                      <input type="tel" required pattern="[0-9]{10}" value={customerDetails.phone} onChange={(e) => setCustomerDetails({...customerDetails, phone: e.target.value})} className="flex-1 px-4 py-3 rounded-r-lg border border-gray-300 focus:ring-2 focus:ring-[#3395ff] outline-none" placeholder="9876543210" />
                    </div>
                  </div>
                  <div className="pt-4 mt-6 border-t border-gray-100">
                    <button type="submit" disabled={isProcessing} className="w-full bg-[#3395ff] hover:bg-[#2b80db] text-white py-4 rounded-lg font-bold text-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70">
                      {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <><CreditCard className="w-5 h-5" />Proceed to Pay ₹{subtotal.toFixed(2)}</>}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
