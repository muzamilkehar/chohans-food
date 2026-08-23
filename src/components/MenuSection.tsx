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
  Filter,
  Edit3,
  Trash2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Sliders,
  FolderPlus,
  UtensilsCrossed
} from 'lucide-react';
import { MenuItem } from '../types';
import { useMenu } from '../context/MenuContext';

interface MenuSectionProps {
  onSelectItem: (item: MenuItem) => void;
  onAddToCart: (item: MenuItem) => void;
  onOpenOwnerManager?: (itemToEdit?: MenuItem, targetTab?: 'items' | 'deals' | 'categories' | 'orders' | 'editor' | 'settings') => void;
}

export const MenuSection: React.FC<MenuSectionProps> = ({ 
  onSelectItem,
  onOpenOwnerManager 
}) => {
  const { 
    menuItems, 
    categories,
    isOwnerMode, 
    toggleItemAvailability, 
    deleteMenuItem 
  } = useMenu();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'popular' | 'spicy' | 'budget'>('all');

  const allDisplayCategories = useMemo(() => {
    return [
      { id: 'all', name: 'All Items', icon: 'Sparkles', urduName: 'تمام ڈشز' },
      ...categories
    ];
  }, [categories]);

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory = activeCategory === 'all' || item.category.toLowerCase() === activeCategory.toLowerCase();
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
  }, [menuItems, activeCategory, searchQuery, activeFilter]);

  const getCategoryIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Flame': return <Flame className="w-4 h-4" />;
      case 'Drumstick': return <Drumstick className="w-4 h-4" />;
      case 'Pizza': return <Pizza className="w-4 h-4" />;
      case 'Sandwich': return <Sandwich className="w-4 h-4" />;
      case 'Utensils': return <Utensils className="w-4 h-4" />;
      case 'Coffee': return <Coffee className="w-4 h-4" />;
      case 'UtensilsCrossed': return <UtensilsCrossed className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="menu" className="py-16 bg-[#f9fafb] border-b border-gray-200 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Owner Management Notification Bar (If Owner Mode Active) */}
        {isOwnerMode && (
          <div className="mb-8 p-4 rounded-3xl bg-gradient-to-r from-[#111827] via-gray-900 to-[#1e293b] text-white flex flex-col sm:flex-row items-center justify-between gap-4 border border-gray-700 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300 font-bold">
                👑
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-black text-white flex items-center gap-2">
                  <span>Owner Mode Active</span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-400/30 font-bold">
                    Live Editing Enabled
                  </span>
                </h4>
                <p className="text-[11px] text-gray-300">
                  You can edit, price, toggle stock, or delete any dish directly on the cards below.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={() => onOpenOwnerManager && onOpenOwnerManager()}
                className="px-4 py-2 rounded-full bg-[#B91C1C] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md transition-all cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>Add Item</span>
              </button>
              <button
                onClick={() => onOpenOwnerManager && onOpenOwnerManager()}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Full Menu Portal</span>
              </button>
            </div>
          </div>
        )}

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
              <Utensils className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>Full Digital Menu ({menuItems.length} Dishes)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Explore Our Authentic Fastfood Menu
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-xl">
              Freshly prepared to order. Select any item to customize size portions, toppings, and sauces.
            </p>
          </div>

          {/* Search Bar & Owner Access Link */}
          <div className="flex items-center gap-2 w-full md:w-auto">
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

            {/* Quick Owner Portal Button */}
            <button
              onClick={() => onOpenOwnerManager && onOpenOwnerManager()}
              className="p-2.5 rounded-full bg-white border border-gray-200 hover:border-[#B91C1C] text-gray-600 hover:text-[#B91C1C] shadow-sm transition-colors cursor-pointer shrink-0"
              title="Owner Menu Management"
            >
              {isOwnerMode ? <Unlock className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {allDisplayCategories.map((cat) => {
            const isActive = activeCategory.toLowerCase() === cat.id.toLowerCase();
            const categoryCount = cat.id === 'all' 
              ? menuItems.length 
              : menuItems.filter(i => i.category.toLowerCase() === cat.id.toLowerCase()).length;

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
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
                }`}>
                  {categoryCount}
                </span>
              </button>
            );
          })}

          {/* If Owner Mode, allow direct + Add Category button */}
          {isOwnerMode && onOpenOwnerManager && (
            <button
              onClick={() => onOpenOwnerManager(undefined, 'categories')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer border border-dashed border-red-300 bg-red-50/50 hover:bg-red-100 text-[#B91C1C]"
              title="Add or Manage Categories"
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span>+ Category</span>
            </button>
          )}
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
              All ({menuItems.length})
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

          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">
              Showing <strong className="text-gray-900">{filteredItems.length}</strong> items
            </span>
            {isOwnerMode && (
              <button
                onClick={() => onOpenOwnerManager && onOpenOwnerManager()}
                className="text-xs text-[#B91C1C] hover:underline font-extrabold uppercase tracking-wider flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item</span>
              </button>
            )}
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
            {filteredItems.map((item) => {
              const isAvailable = item.isAvailable !== false;
              return (
                <div
                  key={item.id}
                  className={`bg-white rounded-3xl overflow-hidden border transition-all duration-300 flex flex-col justify-between group relative ${
                    isAvailable 
                      ? 'border-gray-200 hover:border-[#B91C1C]/40 shadow-sm hover:shadow-lg' 
                      : 'border-red-200 bg-red-50/20 opacity-80'
                  }`}
                >
                  {/* Owner Live Edit Toolbar on Card (If Owner Mode Active) */}
                  {isOwnerMode && (
                    <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5 bg-black/80 backdrop-blur-md p-1 rounded-full border border-gray-700 shadow-xl">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleItemAvailability(item.id);
                        }}
                        className={`p-1.5 rounded-full transition-colors ${
                          isAvailable ? 'text-emerald-400 hover:bg-emerald-950' : 'text-red-400 hover:bg-red-950'
                        }`}
                        title={isAvailable ? 'Mark as Sold Out' : 'Mark as Available'}
                      >
                        {isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onOpenOwnerManager) onOpenOwnerManager(item);
                        }}
                        className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors"
                        title="Edit Item Details & Prices"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm(`Delete "${item.name}" from menu?`)) {
                            deleteMenuItem(item.id);
                          }
                        }}
                        className="p-1.5 rounded-full text-red-400 hover:bg-red-950 transition-colors"
                        title="Delete Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Image */}
                  <div 
                    className="relative h-44 overflow-hidden bg-gray-100 cursor-pointer"
                    onClick={() => isAvailable && onSelectItem(item)}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isAvailable ? 'group-hover:scale-105' : 'grayscale'
                      }`}
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1">
                      {!isAvailable ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white shadow-md">
                          Sold Out
                        </span>
                      ) : (
                        <>
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
                        </>
                      )}
                    </div>

                    {item.prepTime && isAvailable && (
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
                        onClick={() => isAvailable && onSelectItem(item)}
                        className={`font-black text-gray-900 text-base leading-snug line-clamp-1 ${
                          isAvailable ? 'group-hover:text-[#B91C1C] cursor-pointer' : 'text-gray-500'
                        }`}
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

                      {isAvailable ? (
                        <button
                          onClick={() => onSelectItem(item)}
                          className="flex items-center gap-1 px-3.5 py-2 rounded-full bg-gray-100 hover:bg-[#B91C1C] hover:text-white text-gray-900 font-extrabold text-xs uppercase tracking-wider transition-all cursor-pointer group-hover:scale-105 active:scale-95"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{item.sizes || item.addOns ? 'Customize' : 'Add'}</span>
                        </button>
                      ) : (
                        <span className="text-[11px] font-bold text-red-600 bg-red-100 px-3 py-1.5 rounded-full">
                          Sold Out
                        </span>
                      )}
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
