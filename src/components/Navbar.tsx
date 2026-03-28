import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Phone, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

export default function Navbar({ cartCount }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const phoneNumber = "8985042381";

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-3">
            <div className="w-12 h-12 bg-primary-900 border-2 border-green-500 text-white rounded-full flex items-center justify-center font-serif text-2xl font-bold shadow-md">
              SD
            </div>
            <span className="font-serif font-bold text-2xl tracking-tight text-primary-950 leading-none">
              SAIDURGA<br/><span className="text-xs font-sans font-medium tracking-[0.2em] text-green-600 uppercase mt-1 block">Sweets & Bakery</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-600 hover:text-primary-900 transition-colors">Home</Link>
            <a href="/#services" className="text-sm font-medium text-gray-600 hover:text-primary-900 transition-colors">Services</a>
            <a href="/#menu" className="text-sm font-medium text-gray-600 hover:text-primary-900 transition-colors">Menu</a>
            <a href="/#about" className="text-sm font-medium text-gray-600 hover:text-primary-900 transition-colors">About</a>
            <Link to="/cart" className="relative p-2 text-primary-900 hover:bg-primary-50 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <a 
              href={`https://wa.me/91${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-primary-900 hover:bg-primary-800 transition-all shadow-sm hover:shadow-md"
            >
              Book Now
            </a>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/cart" className="relative p-2 text-primary-900 bg-primary-50 rounded-full">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[8px] font-bold rounded-full flex items-center justify-center border-2 border-white">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-primary-900 bg-primary-50 rounded-full"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4">
          <Link to="/" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-600 px-4 py-2">Home</Link>
          <a href="/#services" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-600 px-4 py-2">Services</a>
          <a href="/#menu" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-600 px-4 py-2">Menu</a>
          <a href="/#about" onClick={() => setIsMenuOpen(false)} className="block text-sm font-medium text-gray-600 px-4 py-2">About</a>
          <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 text-sm font-medium text-primary-900 px-4 py-2 bg-primary-50 rounded-lg">
            <Phone className="w-4 h-4" />
            Call {phoneNumber}
          </a>
        </div>
      )}
    </nav>
  );
}
