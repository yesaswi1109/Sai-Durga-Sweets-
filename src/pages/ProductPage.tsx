import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ShoppingCart, ChevronLeft, Star, Loader2, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductPageProps {
  addToCart: (item: any, quantity: number) => void;
}

export default function ProductPage({ addToCart }: ProductPageProps) {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      try {
        const [prodRes, relatedRes] = await Promise.all([
          fetch(`/api/menu/${id}`),
          fetch(`/api/related/${id}`)
        ]);
        const prodData = await prodRes.json();
        const relatedData = await relatedRes.json();
        setProduct(prodData);
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductData();
    window.scrollTo(0, 0);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-12 h-12 text-primary-600 animate-spin" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4">
        <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Product not found</h2>
        <Link to="/" className="text-primary-900 font-medium hover:underline flex items-center gap-2">
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="flex mb-8 text-sm text-gray-500">
          <Link to="/" className="hover:text-primary-900">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Product Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-100 border border-gray-100">
            <img 
              src={product.url} 
              alt={product.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {product.url.includes('godavarivantillu') && (
              <div className="absolute inset-0 z-10">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
                <div className="absolute inset-0 opacity-20 flex flex-wrap gap-6 p-4 rotate-12 scale-150 overflow-hidden">
                  {Array.from({ length: 40 }).map((_, i) => (
                    <span key={i} className="text-primary-900 font-black text-[12px] whitespace-nowrap select-none">SAIDURGA SWEETS</span>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/95 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl transform -rotate-12 border-2 border-primary-200 flex flex-col items-center">
                    <span className="text-primary-800 font-black text-3xl tracking-[0.1em] uppercase leading-none">SAIDURGA</span>
                    <span className="text-primary-600 text-xs font-bold tracking-[0.3em] uppercase mt-2">Sweets & Bakery</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary-950 mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current" />)}
              </div>
              <span className="text-sm text-gray-500 font-medium">(4.9/5 based on 120+ reviews)</span>
            </div>

            <div className="text-3xl font-bold text-primary-900 mb-6">
              {product.price}
              <span className="text-sm text-gray-500 font-normal ml-2">/ {product.qty}</span>
            </div>

            <div className="prose prose-sm text-gray-600 mb-8 leading-relaxed">
              <p>{product.description}</p>
            </div>

            <div className="space-y-6 mb-10">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-900 uppercase tracking-wider">Quantity</label>
                <div className="flex items-center w-32 border border-gray-200 rounded-lg overflow-hidden">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-r border-gray-200"
                  >
                    -
                  </button>
                  <span className="flex-1 text-center font-bold text-gray-900">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors border-l border-gray-200"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-white border-2 border-primary-900 text-primary-900 py-4 rounded-xl font-bold hover:bg-primary-50 transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="flex-1 bg-primary-900 text-white py-4 rounded-xl font-bold hover:bg-primary-800 transition-all shadow-lg shadow-primary-900/20">
                  Buy It Now
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary-700" />
                <span className="text-xs font-medium text-gray-600">Fast Local Delivery</span>
              </div>
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary-700" />
                <span className="text-xs font-medium text-gray-600">100% Secure Payment</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-primary-700" />
                <span className="text-xs font-medium text-gray-600">Freshness Guaranteed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <section className="pt-20 border-t border-gray-100">
          <h2 className="text-3xl font-serif font-bold text-primary-950 mb-10">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {relatedProducts.map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all group"
              >
                <Link to={`/product/${item.id}`} className="block relative aspect-square overflow-hidden bg-gray-50">
                  <img 
                    src={item.url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  {item.url.includes('godavarivantillu') && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg transform -rotate-12 border border-primary-100">
                        <span className="text-primary-800 font-black text-[10px] uppercase tracking-wider">SAIDURGA</span>
                      </div>
                    </div>
                  )}
                </Link>
                <div className="p-4 text-center">
                  <Link to={`/product/${item.id}`} className="text-sm font-medium text-gray-800 hover:text-primary-900 line-clamp-1 mb-2">
                    {item.title}
                  </Link>
                  <div className="text-primary-800 font-bold text-sm">{item.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
