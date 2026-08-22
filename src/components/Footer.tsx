import React from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ChevronRight,
  Heart,
  ArrowUp
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111827] text-white pt-16 pb-12 border-t border-gray-800 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          
          {/* Brand & Story Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#B91C1C] rounded-xl flex items-center justify-center shadow-md">
                <span className="text-white font-extrabold text-xl">C</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-extrabold tracking-tighter text-white uppercase">
                  Chohan's
                </span>
                <span className="text-[10px] tracking-[0.2em] font-bold text-gray-400 uppercase">
                  Fastfood Club
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-relaxed font-normal">
              Shikarpur's iconic fast food destination famous for authentic Chicken Broast, 
              crispy zinger burgers, and loaded cheesy tikka pizzas. Serving happiness fresh daily.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800/60">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Kitchen Open Daily 12 PM – 1 AM
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-300">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
              {['Overview', 'Broast Special', 'Menu', 'Deals', 'Popular Times', 'Reviews', 'Location'].map((link) => {
                const href = `#${link.toLowerCase().replace(' ', '-')}`;
                return (
                  <li key={link}>
                    <a href={href} className="hover:text-[#B91C1C] transition-colors flex items-center gap-1">
                      <ChevronRight className="w-3 h-3 text-gray-500" />
                      <span>{link}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Menu Highlights */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-300">
              Customer Favorites
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li className="flex justify-between border-b border-gray-800/60 pb-1.5">
                <span>Golden Chicken Broast (Quarter)</span>
                <span className="text-[#B91C1C] font-bold">Rs 480</span>
              </li>
              <li className="flex justify-between border-b border-gray-800/60 pb-1.5">
                <span>Shikarpur Tikka Pizza (Medium 10")</span>
                <span className="text-[#B91C1C] font-bold">Rs 950</span>
              </li>
              <li className="flex justify-between border-b border-gray-800/60 pb-1.5">
                <span>Chohan's Crunchy Zinger</span>
                <span className="text-[#B91C1C] font-bold">Rs 450</span>
              </li>
              <li className="flex justify-between border-b border-gray-800/60 pb-1.5">
                <span>Loaded Cheesy Pizza Fries</span>
                <span className="text-[#B91C1C] font-bold">Rs 450</span>
              </li>
              <li className="flex justify-between">
                <span>Broast Lover's Combo Deal</span>
                <span className="text-[#B91C1C] font-bold">Rs 1,150</span>
              </li>
            </ul>
          </div>

          {/* Contact & Direct Order CTA */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-gray-300">
              Contact & Delivery
            </h4>

            <div className="space-y-2.5 text-xs text-gray-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
                <span>Allah Wala Chowk, Shikarpur, Sindh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#B91C1C] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-white hover:text-[#B91C1C] font-bold">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>12:00 PM – 1:00 AM (Daily)</span>
              </div>
            </div>

            {/* Direct WhatsApp Order Button */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Salam Chohan's Fastfood, I would like to order food.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Bar & Copyright */}
        <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Chohan's Fastfood (Chohan's Food Club). All rights reserved.</p>
          
          <div className="flex items-center gap-4">
            <span>Prices inclusive of local preparation. Cash on Delivery available.</span>
            <button
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#B91C1C] text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
