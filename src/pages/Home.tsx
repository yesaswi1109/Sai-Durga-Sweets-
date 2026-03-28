import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Phone, ShoppingCart, Star, Utensils, CheckCircle2, CakeSlice, Gift, ChevronLeft, ChevronRight, Loader2, Quote, MessageCircle, Mail, Clock } from 'lucide-react';

interface HomeProps {
  addToCart: (item: any) => void;
}

export default function Home({ addToCart }: HomeProps) {
  const phoneNumber = "8985042381";
  const whatsappNumber = "918985042381";
  const email = "lokeshsinha746@gmail.com";
  const mapsLink = "https://maps.app.goo.gl/quwm2JWfEuv2ZxXq5";

  const [allMenuItems, setAllMenuItems] = useState<any[]>([]);
  const [isLoadingMenu, setIsLoadingMenu] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        setAllMenuItems(data);
      } catch (error) {
        console.error('Failed to fetch menu:', error);
      } finally {
        setIsLoadingMenu(false);
      }
    };
    fetchMenu();
  }, []);

  const totalPages = Math.ceil(allMenuItems.length / itemsPerPage);
  const currentItems = allMenuItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-40 overflow-hidden bg-primary-50">
        <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#14532d 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-primary-100 text-primary-900 text-sm font-medium mb-8 shadow-sm"
              >
                <MapPin className="w-4 h-4" />
                <span>Ravulapalem, Andhra Pradesh</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-950 tracking-tight leading-tight mb-6"
              >
                Authentic Sweets &<br />
                <span className="text-primary-800 italic font-light">Fresh Bakery Delights.</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto lg:mx-0 font-light leading-relaxed"
              >
                Experience the finest selection of traditional sweets and freshly baked goods. Crafted with premium ingredients, packaged with care, and made to celebrate your special moments.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
              >
                <a 
                  href="#menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-white bg-primary-900 hover:bg-primary-800 transition-all shadow-lg shadow-primary-900/20 hover:shadow-xl hover:-translate-y-0.5"
                >
                  Order Now
                  <ShoppingCart className="ml-2 w-5 h-5" />
                </a>
                <a 
                  href={`tel:${phoneNumber}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-full text-primary-900 bg-white border border-primary-200 hover:bg-primary-50 transition-all"
                >
                  <Phone className="mr-2 w-5 h-5" />
                  Contact Us
                </a>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="absolute inset-0 bg-primary-200 rounded-[2rem] transform rotate-3 scale-105 opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1615486171448-4af438128527?w=1280&q=80" 
                alt="Delicious Indian Sweets" 
                className="relative z-10 rounded-[2rem] shadow-2xl object-cover h-[600px] w-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -left-6 z-20 bg-white p-6 rounded-2xl shadow-xl border border-primary-50 flex items-center gap-4">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-primary-700 fill-primary-700" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Premium Quality</p>
                  <p className="text-lg font-bold text-primary-950">Freshly Made</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary-800 uppercase mb-3">Our Offerings</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary-950">Crafted for Your Delight</h3>
            <div className="w-24 h-1 bg-primary-200 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Utensils, title: "Fresh Preparation", desc: "Made daily with the finest ingredients to ensure premium taste and quality." },
              { icon: CheckCircle2, title: "Hygienic Packaging", desc: "Strict hygiene standards maintained from preparation to final packaging." },
              { icon: CakeSlice, title: "Seasonal Sweets", desc: "Special traditional delicacies prepared exclusively for festivals and seasons." },
              { icon: Gift, title: "Gift Hampers & Custom Orders", desc: "Personalized sweet boxes and hampers perfect for weddings and corporate gifting." }
            ].map((service, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group p-8 rounded-2xl bg-primary-50/50 border border-primary-100 hover:bg-primary-900 transition-colors duration-300"
              >
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm group-hover:bg-primary-800 transition-colors duration-300">
                  <service.icon className="w-6 h-6 text-primary-900 group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="text-xl font-serif font-bold text-primary-950 mb-3 group-hover:text-white transition-colors duration-300">{service.title}</h4>
                <p className="text-gray-600 leading-relaxed group-hover:text-primary-100 transition-colors duration-300">
                  {service.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-24 bg-primary-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary-800 uppercase mb-3">Our Menu</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary-950">Explore Our Delicacies</h3>
            <div className="w-24 h-1 bg-primary-200 mx-auto mt-6 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {isLoadingMenu ? (
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <Loader2 className="w-12 h-12 text-primary-600 animate-spin mb-4" />
                <p className="text-gray-500 font-medium">Loading our delicious menu...</p>
              </div>
            ) : (
              currentItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 4) * 0.1 }}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 flex flex-col group"
                >
                  <Link to={`/product/${item.id}`} className="relative aspect-square overflow-hidden bg-gray-100 block">
                    <img 
                      src={item.url} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    {item.url.includes('godavarivantillu') && (
                      <div className="absolute inset-0 z-10">
                        <div className="absolute inset-0 bg-white/10 backdrop-blur-[0.5px]"></div>
                        <div className="absolute inset-0 opacity-20 flex flex-wrap gap-6 p-4 rotate-12 scale-150 overflow-hidden">
                          {Array.from({ length: 40 }).map((_, i) => (
                            <span key={i} className="text-primary-900 font-black text-[12px] whitespace-nowrap select-none">SAIDURGA SWEETS</span>
                          ))}
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-2xl transform -rotate-12 border-2 border-primary-200 flex flex-col items-center">
                            <span className="text-primary-800 font-black text-2xl tracking-[0.1em] uppercase leading-none">SAIDURGA</span>
                            <span className="text-primary-600 text-[9px] font-bold tracking-[0.3em] uppercase mt-1.5">Sweets & Bakery</span>
                          </div>
                        </div>
                        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-white/60 to-transparent"></div>
                        <div className="absolute bottom-0 right-0 w-28 h-14 bg-white/95 backdrop-blur-md flex items-center justify-center border-tl-2xl shadow-2xl border-l border-t border-primary-100">
                          <span className="text-primary-900 text-[11px] font-black tracking-[0.2em] uppercase">SAIDURGA</span>
                        </div>
                      </div>
                    )}
                  </Link>
                  <div className="p-5 flex flex-col flex-grow text-center border-t border-gray-50 bg-gray-50/30">
                    <Link to={`/product/${item.id}`} className="font-sans font-medium text-gray-800 mb-1 line-clamp-2 min-h-[3rem] flex items-center justify-center hover:text-primary-900 transition-colors">
                      {item.title}
                    </Link>
                    <div className="flex justify-center items-center gap-2 mb-4">
                      <span className="text-lg font-bold text-primary-800">{item.price}</span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">{item.qty}</span>
                    </div>
                    <div className="mt-auto">
                      <button 
                        onClick={() => addToCart(item)}
                        className="w-full flex items-center justify-center gap-2 bg-primary-900 hover:bg-primary-800 text-white py-2.5 rounded-lg font-medium transition-colors cursor-pointer"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {totalPages > 1 && (
            <div className="mt-16 flex justify-center items-center gap-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 hover:text-primary-900 disabled:opacity-50 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-10 h-10 rounded-full font-medium transition-colors ${
                      currentPage === i + 1 
                        ? 'bg-primary-900 text-white' 
                        : 'bg-white border border-gray-200 text-gray-600 hover:bg-primary-50'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-gray-200 text-gray-600 hover:bg-primary-50 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* About & Trust Section */}
      <section id="about" className="py-24 bg-primary-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-primary-300 uppercase mb-3">About Us</h2>
              <h3 className="text-3xl md:text-5xl font-serif font-bold mb-6 leading-tight">A Local Tradition of Excellence</h3>
              <p className="text-primary-100 text-lg font-light leading-relaxed mb-8">
                Located in the heart of Ravulapalem, SaiDurga Sweets & Bakery is dedicated to bringing you the authentic taste of premium sweets and baked goods. We believe that every celebration deserves the finest quality, which is why we focus on fresh preparation and impeccable hygiene.
              </p>
              <div className="space-y-4">
                {["Premium quality ingredients", "Strict hygiene protocols", "Authentic local recipes", "Dedicated customer service"].map((point, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary-800 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary-200" />
                    </div>
                    <span className="text-primary-50 font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-primary-800 rounded-3xl transform -rotate-3 scale-105 opacity-50"></div>
              <img 
                src="https://images.unsplash.com/photo-1601050690117-94f5f6af8bd3?w=1280&q=80" 
                alt="Traditional Sweets" 
                className="relative z-10 rounded-3xl shadow-2xl object-cover h-[500px] w-full"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-widest text-primary-800 uppercase mb-3">Testimonials</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-primary-950">What Our Customers Say</h3>
            <div className="w-24 h-1 bg-primary-200 mx-auto mt-6 rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Ramesh K.", text: "The best Laddu I've ever had! Perfectly sweet and melts in your mouth. Highly recommend for any festival.", rating: 5 },
              { name: "Priya S.", text: "Their fresh cakes and puffs are our family's favorite evening snack. Great quality and hygiene.", rating: 5 },
              { name: "Venkat R.", text: "Ordered custom gift hampers for my daughter's wedding. The packaging and taste were absolutely premium!", rating: 5 }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-primary-50/50 p-8 rounded-3xl border border-primary-100 relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-200 opacity-50" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-6 relative z-10 leading-relaxed">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-900 text-white rounded-full flex items-center justify-center font-bold font-serif">{testimonial.name.charAt(0)}</div>
                  <span className="font-bold text-primary-950">{testimonial.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="location" className="py-24 bg-primary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-primary-100">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-16">
                <h2 className="text-3xl font-serif font-bold text-primary-950 mb-8">Visit Us</h2>
                <div className="space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><MapPin className="w-6 h-6 text-primary-900" /></div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">Location</h4>
                      <p className="text-gray-600 leading-relaxed">FIRST FLOOR, MARUTHI RAMAKRISHNA REDDY COMPLEX,<br />Victory Bazar, Ring Rd, Ravulapalem, AP 533238</p>
                      <a href={mapsLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-primary-700 font-medium mt-2 hover:text-primary-900">Get Directions <ChevronRight className="w-4 h-4 ml-1" /></a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center shrink-0"><Clock className="w-6 h-6 text-primary-900" /></div>
                    <div className="w-full">
                      <h4 className="font-bold text-gray-900 mb-3">Opening Hours</h4>
                      <ul className="text-gray-600 space-y-3 w-full max-w-xs">
                        <li className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="font-medium">Mon - Fri</span> <span>10:00 AM - 11:00 PM</span></li>
                        <li className="flex justify-between items-center border-b border-gray-200 pb-2"><span className="font-medium">Saturday</span> <span>10:30 AM - 11:30 PM</span></li>
                        <li className="flex justify-between items-center pb-2"><span className="font-medium">Sunday</span> <span>10:00 AM - 10:00 PM</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-primary-900 p-8 md:p-16 text-white flex flex-col justify-center">
                <h2 className="text-3xl font-serif font-bold mb-8 text-center">Get in Touch</h2>
                <div className="space-y-4">
                  <a href={`https://wa.me/${whatsappNumber}`} className="flex items-center justify-center w-full px-8 py-4 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-xl font-medium transition-colors shadow-lg"><MessageCircle className="w-5 h-5 mr-3" />WhatsApp</a>
                  <a href={`tel:${phoneNumber}`} className="flex items-center justify-center w-full px-8 py-4 bg-white text-primary-900 hover:bg-primary-50 rounded-xl font-medium transition-colors"><Phone className="w-5 h-5 mr-3" />Call {phoneNumber}</a>
                  <a href={`mailto:${email}`} className="flex items-center justify-center w-full px-8 py-4 bg-transparent border border-primary-700 text-white hover:bg-primary-800 rounded-xl font-medium transition-colors"><Mail className="w-5 h-5 mr-3" />Email Us</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
