import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, ChevronRight } from 'lucide-react';

export default function Footer() {
  const phoneNumber = "7305886680";
  const email = "yesaswi1109@gmail.com";

  return (
    <footer className="bg-primary-950 text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white text-primary-900 rounded-full flex items-center justify-center font-serif font-bold text-xl">
                SD
              </div>
              <span className="font-serif font-bold text-xl tracking-tight leading-none">
                SAIDURGA<br/><span className="text-[10px] font-sans font-medium tracking-[0.2em] text-primary-300 uppercase mt-1 block">Sweets & Bakery</span>
              </span>
            </div>
            <p className="text-primary-100/70 text-sm leading-relaxed max-w-xs">
              Bringing the authentic taste of traditional Andhra sweets and fresh bakery delights to your doorstep. Quality and tradition in every bite.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-primary-900 flex items-center justify-center hover:bg-primary-800 transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Policies Column */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Policies</h4>
            <ul className="space-y-4">
              {['Privacy Policy', 'Terms of Service', 'Shipping Policy', 'Refund Policy'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-100/70 hover:text-white text-sm flex items-center gap-2 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">About Us</h4>
            <ul className="space-y-4">
              {['Our Story', 'Our Ingredients', 'Quality Standards', 'Testimonials'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-primary-100/70 hover:text-white text-sm flex items-center gap-2 transition-colors">
                    <ChevronRight className="w-3 h-3" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-primary-100/70">
                <MapPin className="w-5 h-5 text-primary-400 shrink-0" />
                <span>Ravulapalem, Victory Bazar, Ring Rd, Andhra Pradesh 533238</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-100/70">
                <Phone className="w-5 h-5 text-primary-400 shrink-0" />
                <a href={`tel:${phoneNumber}`} className="hover:text-white transition-colors">
                  +91 {phoneNumber}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-100/70">
                <Mail className="w-5 h-5 text-primary-400 shrink-0" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-primary-100/50">
          <p>&copy; {new Date().getFullYear()} SaiDurga Sweets & Bakery. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
