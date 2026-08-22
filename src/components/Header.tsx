import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  ShoppingBag, 
  Menu as MenuIcon, 
  X, 
  ChevronRight,
  MessageCircle,
  Clock
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { CartItem } from '../types';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
  onOpenOrderModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItems, onOpenCart }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpenNow, setIsOpenNow] = useState(true);

  const totalItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    if (hours >= 12 || hours < 1) {
      setIsOpenNow(true);
    } else {
      setIsOpenNow(false);
    }
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Famous Broast', href: '#broast-special' },
    { name: 'Menu', href: '#menu' },
    { name: 'Deals', href: '#deals' },
    { name: 'Popular Times', href: '#popular-times' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Contact', href: '#location' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#111827] text-gray-300 text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-300 font-semibold text-[11px] border border-emerald-800/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              {isOpenNow ? 'Open Now · Closes 1:00 AM' : 'Opens at 12:00 PM'}
            </span>
            <span className="hidden sm:inline-flex items-center gap-1 text-gray-300">
              <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
              Allah Wala Chowk, Shikarpur
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden md:inline text-gray-400 font-medium">
              💵 {RESTAURANT_INFO.paymentMethod}
            </span>
            <a 
              href={`tel:${RESTAURANT_INFO.phone}`} 
              className="flex items-center gap-1 font-bold text-white hover:text-red-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-400" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Salam Chohan's Fastfood, I would like to place an order.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp Order</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`w-full transition-all duration-200 bg-white ${
        isScrolled 
          ? 'shadow-md py-3.5 border-b border-gray-200' 
          : 'py-4 border-b border-gray-100'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <a 
            href="#overview" 
            className="flex items-center space-x-3 group text-left"
            id="brand-logo-link"
          >
            <div className="w-10 h-10 bg-[#B91C1C] rounded-xl flex items-center justify-center shadow-md shadow-red-900/20 group-hover:scale-105 transition-transform">
              <span className="text-white font-extrabold text-xl tracking-tight">C</span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-extrabold tracking-tighter text-[#B91C1C] uppercase">
                Chohan's
              </span>
              <span className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase">
                Fastfood Club
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center space-x-6 text-xs font-bold text-gray-500 uppercase tracking-widest">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-[#B91C1C] transition-colors py-1 cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Quick WhatsApp Link */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Salam Chohan's Fastfood! I want to order food.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 transition-colors"
              title="Chat on WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111827] text-white hover:bg-[#B91C1C] text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-sm group"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
              <span>Cart</span>
              {totalItemCount > 0 && (
                <span className="px-2 py-0.5 text-[10px] bg-[#B91C1C] text-white font-extrabold rounded-full ml-1">
                  {totalItemCount} · Rs {totalPrice.toLocaleString()}
                </span>
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-gray-100 text-gray-700 hover:text-black hover:bg-gray-200 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-4 mt-2 space-y-2 shadow-xl animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-1 gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="w-full text-left px-3.5 py-2.5 rounded-xl text-gray-700 hover:text-[#B91C1C] hover:bg-gray-50 text-xs font-bold uppercase tracking-wider flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </button>
              ))}
            </div>

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gray-100 text-gray-900 font-bold text-xs uppercase tracking-wider hover:bg-gray-200"
              >
                <Phone className="w-4 h-4 text-[#B91C1C]" />
                <span>Call Kitchen: {RESTAURANT_INFO.phone}</span>
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Salam Chohan's Fastfood, I would like to place an order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs uppercase tracking-wider hover:bg-emerald-500"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat & Order on WhatsApp</span>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
