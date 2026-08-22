import React from 'react';
import { Award, ShieldCheck, HeartHandshake, UtensilsCrossed, Sparkles } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutStory: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white border-b border-gray-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Authentic Story */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>Heritage & Quality</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
              Crafting Shikarpur's Favorite Fastfood Flavors
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-gray-600 leading-relaxed font-normal">
              <p>
                Founded at the bustling landmark of <strong>Allah Wala Chowk</strong>, 
                <strong> Chohan's Fastfood</strong> (originally embraced as Chohan's Food Club) 
                pioneered pressure-fried chicken broast in Shikarpur.
              </p>
              <p>
                Our philosophy is simple: we never cut corners on food quality. 
                We use <strong>100% fresh poultry sourced daily</strong>, marinated in our secret 
                herb & spice blend, and fried in commercial pressure fryers that seal in moisture 
                while creating an unforgettable crunch.
              </p>
            </div>

            {/* Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-[#f9fafb] p-4 rounded-2xl border border-gray-200">
                <ShieldCheck className="w-5 h-5 text-[#B91C1C] mb-2" />
                <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">100% Halal</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Fresh poultry delivered and prepped daily.</p>
              </div>

              <div className="bg-[#f9fafb] p-4 rounded-2xl border border-gray-200">
                <UtensilsCrossed className="w-5 h-5 text-[#B91C1C] mb-2" />
                <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">Secret Recipe</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Authentic garlic mayo dips & marinade.</p>
              </div>

              <div className="bg-[#f9fafb] p-4 rounded-2xl border border-gray-200">
                <HeartHandshake className="w-5 h-5 text-[#B91C1C] mb-2" />
                <h4 className="font-extrabold text-gray-900 text-xs uppercase tracking-wider">Family Friendly</h4>
                <p className="text-[11px] text-gray-500 mt-0.5">Dine-in, takeaway, and rapid home delivery.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Collage with High Contrast Accent */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-56 rounded-3xl overflow-hidden shadow-md border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80"
                    alt="Chohan's Burger Crafting"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="h-44 rounded-3xl overflow-hidden shadow-md border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
                    alt="Fresh Pizza Baking"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>

              <div className="space-y-4 pt-6">
                <div className="h-44 rounded-3xl overflow-hidden shadow-md border border-gray-200">
                  <img
                    src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=600&q=80"
                    alt="Crispy Chicken Broast"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="bg-[#111827] text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between h-56 border border-gray-800">
                  <div>
                    <span className="text-3xl font-black text-[#B91C1C]">20+</span>
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mt-1">Years Serving Shikarpur</p>
                  </div>
                  <p className="text-xs text-gray-300 italic leading-relaxed">
                    "From our first fryer at Allah Wala Chowk to thousands of satisfied foodies today."
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
