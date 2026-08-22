import React from 'react';
import { 
  Star, 
  MapPin, 
  ArrowRight, 
  Bike, 
  UtensilsCrossed, 
  Car, 
  Clock, 
  Phone,
  Flame,
  ShieldCheck,
  Award
} from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroProps {
  onExploreMenu: () => void;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onOpenCart }) => {
  return (
    <section id="overview" className="relative overflow-hidden bg-gradient-to-br from-white via-[#fff7ed]/40 to-gray-50 pt-8 pb-16 lg:py-20 border-b border-gray-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Information & Messaging */}
          <div className="lg:col-span-6 space-y-6 text-left">
            
            {/* Trust Pill */}
            <div className="inline-flex items-center space-x-2 bg-orange-100 text-orange-800 px-3.5 py-1.5 rounded-full w-fit border border-orange-200 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-wider">
                Shikarpur's Finest Broast & Pizza Since 2000s
              </span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.0] tracking-tight">
                CRAVING <br />
                THE BEST <br />
                <span className="text-[#B91C1C] underline decoration-4 underline-offset-8">
                  BROAST & PIZZA?
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed font-normal">
              Welcome to <strong>Chohan's Fastfood</strong> (formerly Chohan's Food Club). 
              Famous across Shikarpur for pressure-fried golden crispy chicken broast, 
              loaded cheesy tikka pizzas, and fast service at Allah Wala Chowk.
            </p>

            {/* Google Rating & Metric Strip */}
            <div className="flex flex-wrap items-center gap-6 pt-2 pb-2">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-black text-gray-900">4.0</span>
                  <div className="flex text-yellow-400 text-sm">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
                  </div>
                </div>
                <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">
                  294 Google Reviews
                </span>
              </div>

              <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

              <div className="flex flex-col">
                <span className="text-xl font-black text-gray-900">Rs 1k – 2k</span>
                <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">
                  Average Per Person
                </span>
              </div>

              <div className="h-10 w-px bg-gray-200 hidden sm:block"></div>

              <div className="flex flex-col">
                <span className="text-xl font-black text-[#B91C1C]">100% Halal</span>
                <span className="text-[10px] text-gray-400 uppercase font-extrabold tracking-wider">
                  Fresh Chicken Daily
                </span>
              </div>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-order-now-btn"
                onClick={onExploreMenu}
                className="px-7 py-3.5 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-widest shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Flame className="w-4 h-4 text-orange-400" />
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>

              <a
                id="hero-call-kitchen-btn"
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="px-6 py-3.5 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase tracking-widest border border-gray-300 shadow-sm transition-all flex items-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#B91C1C]" />
                <span>Call Kitchen: {RESTAURANT_INFO.phone}</span>
              </a>
            </div>

            {/* Testimonial Quote & Avatar Stack */}
            <div className="flex items-center space-x-4 pt-4 border-t border-gray-200/80">
              <div className="flex -space-x-2">
                <div className="w-9 h-9 rounded-full border-2 border-white bg-red-700 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                  AZ
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white bg-neutral-800 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                  MS
                </div>
                <div className="w-9 h-9 rounded-full border-2 border-white bg-amber-600 text-white flex items-center justify-center text-[10px] font-black shadow-sm">
                  AS
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium leading-tight">
                "Must visit if you are in town. <br />
                <strong className="text-gray-800">Famous for Broast and Shikarpur Tikka Pizza.</strong>"
              </p>
            </div>

          </div>

          {/* Right Column: Visual Grid Showcase */}
          <div className="lg:col-span-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Bestseller Crimson Card */}
              <div className="sm:col-span-2 bg-[#B91C1C] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-xl group text-left">
                <div className="relative z-10 max-w-sm">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] mb-2 backdrop-blur-sm">
                    <Flame className="w-3 h-3 text-orange-300" />
                    <span>Best Seller</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black mt-1 tracking-tight leading-none">
                    CHICKEN BROAST
                  </h3>
                  <p className="text-sm text-red-100 mt-2 leading-relaxed">
                    Perfectly pressure-fried, golden crispy outside and succulent inside. Served with signature garlic mayonnaise dip & crinkle fries.
                  </p>
                  <div className="mt-5 flex items-center gap-3">
                    <button 
                      onClick={onExploreMenu}
                      className="bg-white text-[#B91C1C] hover:bg-gray-100 px-5 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-md hover:scale-105 transition-all cursor-pointer"
                    >
                      View Menu & Order
                    </button>
                    <span className="text-xs font-bold text-red-200">
                      From Rs 480
                    </span>
                  </div>
                </div>

                {/* Background Image / Decoration */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 overflow-hidden opacity-30 sm:opacity-40 group-hover:opacity-50 transition-opacity">
                  <img
                    src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
                    alt="Golden Broast"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#B91C1C] via-[#B91C1C]/60 to-transparent" />
                </div>
              </div>

              {/* Location Mini Card */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm text-left flex flex-col justify-between space-y-3">
                <div>
                  <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" /> Location
                  </h4>
                  <p className="text-sm font-black text-gray-900 mb-0.5">Allah Wala Chowk</p>
                  <p className="text-xs text-gray-500">XJ3Q+4H2, Shikarpur, Sindh</p>
                </div>
                <a 
                  href="#location" 
                  className="text-[11px] font-extrabold text-[#B91C1C] uppercase tracking-wider hover:underline"
                >
                  Get Directions & Hours →
                </a>
              </div>

              {/* Operating Hours Mini Card */}
              <div className="bg-[#111827] rounded-3xl p-6 text-white shadow-sm text-left flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" /> Kitchen Hours
                    </h4>
                    <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
                      Open Today
                    </span>
                  </div>
                  <p className="text-2xl font-black tracking-tight">UNTIL 1:00 AM</p>
                  <p className="text-[10px] text-gray-400 mt-1 uppercase font-medium">
                    Late night fast food & delivery
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-300 font-semibold pt-1 border-t border-gray-800">
                  <Phone className="w-3.5 h-3.5 text-red-400" />
                  <span>+92 331 7300074</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
