import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Flame, 
  Sparkles, 
  Drumstick, 
  Pizza, 
  Sandwich, 
  Utensils, 
  Coffee, 
  Plus, 
  Clock, 
  X,
  Filter
} from 'lucide-react';
import { CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ onSelectItem }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'spicy' | 'budget'>('all');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        item.name.toLowerCase().includes(q) ||
        (item.urduName && item.urduName.includes(q)) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q);

      let matchesFilter = true;
      if (activeFilter === 'popular') matchesFilter = !!item.isPopular;
      if (activeFilter === 'spicy') matchesFilter = !!item.isSpicy;
      if (activeFilter === 'budget') matchesFilter = item.price <= 500;

      return matchesCategory && matchesSearch && matchesFilter;
    });
  }, [activeCategory, searchQuery, activeFilter]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Drumstick': return <Drumstick className="w-4 h-4" />;
      case 'Pizza': return <Pizza className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu" className="py-16 bg-[#f9fafb] border-b border-gray-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>Full Digital Menu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Explore Our Authentic Fastfood Menu
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl">
              Freshly prepared to order. Select any item to customize size portions, toppings, and sauces.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="menu-search-input"
              type="text"
              placeholder="Search broast, pizza, zinger..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-gray-200 text-gray-900 placeholder-gray-400 text-xs font-semibold focus:outline-none focus:border-[#B91C1C] focus:ring-1 focus:ring-[#B91C1C] shadow-sm transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border ${
                  isActive
                    ? 'bg-[#B91C1C] text-white border-[#B91C1C] shadow-md scale-[1.02]'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:text-gray-900 shadow-sm'
                }`}
              >
                <span className={isActive ? 'text-white' : 'text-[#B91C1C]'}>
                  {getCategoryIcon(cat.icon)}
                </span>
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* Quick Filter Tags (Popular, Spicy, Budget) */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8 bg-white p-3 rounded-2xl border border-gray-200 shadow-sm">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1 pl-1">
              <Filter className="w-3.5 h-3.5" /> Filters:
            </span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'all' ? 'bg-[#111827] text-white' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveFilter('popular')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'popular' ? 'bg-orange-100 text-orange-800 border border-orange-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              ⭐ Bestsellers
            </button>
            <button
              onClick={() => setActiveFilter('spicy')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'spicy' ? 'bg-red-100 text-red-800 border border-red-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              🔥 Spicy
            </button>
            <button
              onClick={() => setActiveFilter('budget')}
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider transition-colors ${
                activeFilter === 'budget' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              💵 Under Rs 500
            </button>
          </div>

          <div className="text-xs text-gray-400 font-bold uppercase tracking-wider">
            Showing <strong className="text-gray-900">{filteredItems.length}</strong> items
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 space-y-3 shadow-sm">
            <Sparkles className="w-8 h-8 text-orange-500 mx-auto" />
            <h3 className="text-lg font-bold text-gray-900">No dishes found matching your filter</h3>
            <p className="text-xs text-gray-500">Try clearing the search query or selecting a different category.</p>
            <button
              onClick={() => { setActiveCategory('all'); setSearchQuery(''); setActiveFilter('all'); }}
              className="px-5 py-2.5 bg-[#111827] text-white font-bold text-xs uppercase tracking-wider rounded-full hover:bg-[#B91C1C]"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#B91C1C]/40 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Image */}
                <div 
                  className="relative h-44 overflow-hidden bg-gray-100 cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                    {item.isPopular && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B91C1C] text-white shadow-sm">
                        Popular
                      </span>
                    )}
                    {item.isSpicy && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-orange-600 text-white shadow-sm">
                        Spicy 🔥
                      </span>
                    )}
                    {item.isNew && (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-sm">
                        Special
                      </span>
                    )}
                  </div>

                  {item.prepTime && (
                    <div className="absolute bottom-2 right-2.5 flex items-center gap-1 text-[10px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
                      <Clock className="w-3 h-3 text-orange-400" />
                      <span>{item.prepTime}</span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 
                      onClick={() => onSelectItem(item)}
                      className="font-black text-gray-900 text-base group-hover:text-[#B91C1C] transition-colors cursor-pointer leading-snug line-clamp-1"
                    >
                      {item.name}
                    </h3>
                    {item.urduName && (
                      <p className="text-xs text-[#B91C1C] font-arabic font-semibold">
                        {item.urduName}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Size badge preview */}
                    {item.sizes && (
                      <div className="flex items-center gap-1.5 pt-1">
                        <span className="text-[10px] uppercase font-bold text-gray-400">Sizes:</span>
                        <div className="flex flex-wrap gap-1">
                          {item.sizes.map((s, idx) => (
                            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-700 font-bold">
                              {s.name.split(' ')[0]}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Pricing & Add Button */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      {item.sizes && <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">From</span>}
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

                    <button
                      onClick={() => onSelectItem(item)}
                      className="flex items-center gap-1 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-[#B91C1C] hover:text-white text-gray-900 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer group-hover:scale-105 active:scale-95"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{item.sizes || item.addOns ? 'Customize' : 'Add'}</span>
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
