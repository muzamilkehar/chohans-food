import React from 'react';
import { Flame, Plus, Clock } from 'lucide-react';
import { MenuItem } from '../types';
import { useMenu } from '../context/MenuContext';

interface FeaturedSpecialsProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const FeaturedSpecials: React.FC<FeaturedSpecialsProps> = ({ onSelectItem }) => {
  const { menuItems } = useMenu();

  // Find signature items or fallback to first 4 popular items
  const featuredIds = ['broast-quarter', 'pizza-tikka-special', 'burger-crispy-zinger', 'fries-loaded-pizza'];
  let featuredItems = menuItems.filter(item => featuredIds.includes(item.id));
  
  if (featuredItems.length === 0) {
    featuredItems = menuItems.slice(0, 4);
  }

  return (
    <section id="broast-special" className="py-16 bg-white border-b border-gray-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>Signature Highlights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              What Made Chohan's Famous in Shikarpur
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl font-normal">
              Authentic secret spice blends, ultra-crispy pressure frying, and molten mozzarella pizzas crafted fresh upon every order.
            </p>
          </div>
          <div className="shrink-0">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
              ⭐ 4.0 Rated on Google Maps
            </span>
          </div>
        </div>

        {/* Grid of Special Items */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredItems.map((item) => {
            const isAvailable = item.isAvailable !== false;
            return (
              <div 
                key={item.id}
                className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col group ${
                  isAvailable 
                    ? 'border-gray-200 hover:border-[#B91C1C]/40 shadow-sm hover:shadow-xl' 
                    : 'border-red-200 opacity-75'
                }`}
              >
                {/* Image Container */}
                <div 
                  className="relative h-48 overflow-hidden bg-gray-100 cursor-pointer" 
                  onClick={() => isAvailable && onSelectItem(item)}
                >
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {!isAvailable ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-sm">
                        Sold Out
                      </span>
                    ) : (
                      <>
                        {item.isPopular && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B91C1C] text-white shadow-sm">
                            Bestseller
                          </span>
                        )}
                        {item.isSpicy && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white shadow-sm">
                            Spicy 🔥
                          </span>
                        )}
                      </>
                    )}
                  </div>

                  {item.prepTime && isAvailable && (
                    <div className="absolute bottom-2.5 right-3 flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{item.prepTime}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 
                      onClick={() => isAvailable && onSelectItem(item)}
                      className="font-black text-gray-900 text-base group-hover:text-[#B91C1C] transition-colors cursor-pointer line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    {item.urduName && (
                      <p className="text-xs text-[#B91C1C] font-semibold font-arabic">
                        {item.urduName}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Price</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-gray-900">
                          Rs {item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-xs text-gray-400 line-through">
                            Rs {item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>

                    {isAvailable ? (
                      <button
                        onClick={() => onSelectItem(item)}
                        className="flex items-center gap-1 px-3.5 py-2 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer group-hover:scale-105 active:scale-95"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Customize</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full">
                        Sold Out
                      </span>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
