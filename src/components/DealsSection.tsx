import React from 'react';
import { Flame, Users, Plus, Check, Edit3, Trash2 } from 'lucide-react';
import { DealItem } from '../types';
import { useMenu } from '../context/MenuContext';

interface DealsSectionProps {
  onAddDealToCart: (deal: DealItem) => void;
  onOpenOwnerManager?: () => void;
}

export const DealsSection: React.FC<DealsSectionProps> = ({ 
  onAddDealToCart,
  onOpenOwnerManager 
}) => {
  const { deals, isOwnerMode, deleteDeal } = useMenu();

  return (
    <section id="deals" className="py-16 bg-white border-b border-gray-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 border border-red-200 text-[#B91C1C] text-xs font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5" />
            <span>Value Combos & Family Feasts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Special Value Deals & Party Platters
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Satisfy your hunger with complete meal combos. Perfect for solo treats, duo dates, and family gatherings in Shikarpur.
          </p>

          {isOwnerMode && (
            <div className="pt-2">
              <button
                onClick={() => onOpenOwnerManager && onOpenOwnerManager()}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gray-900 text-white hover:bg-[#B91C1C] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Manage Deals & Bundles</span>
              </button>
            </div>
          )}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {deals.map((deal) => (
            <div 
              key={deal.id}
              className="bg-white rounded-3xl overflow-hidden border border-gray-200 hover:border-[#B91C1C]/50 shadow-sm hover:shadow-xl flex flex-col justify-between group transition-all duration-300 relative"
            >
              {/* Owner Quick Toolbar if active */}
              {isOwnerMode && (
                <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-full border border-gray-700 shadow-xl">
                  <button
                    onClick={() => onOpenOwnerManager && onOpenOwnerManager()}
                    className="p-1.5 rounded-full text-white hover:bg-white/20 transition-colors"
                    title="Edit Deal"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm(`Delete deal "${deal.title}"?`)) {
                        deleteDeal(deal.id);
                      }
                    }}
                    className="p-1.5 rounded-full text-red-400 hover:bg-red-950 transition-colors"
                    title="Delete Deal"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* Top Tag & Savings Badge */}
              <div className="relative h-44 overflow-hidden bg-gray-100">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#111827] text-white shadow-sm">
                    {deal.tag}
                  </span>
                </div>

                {deal.badge && !isOwnerMode && (
                  <div className="absolute top-3 right-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black tracking-wider uppercase bg-[#B91C1C] text-white shadow-sm">
                      {deal.badge}
                    </span>
                  </div>
                )}

                <div className="absolute bottom-2 left-3 flex items-center gap-1 text-[11px] font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                  <Users className="w-3.5 h-3.5 text-orange-400" />
                  <span>Serves {deal.serves}</span>
                </div>
              </div>

              {/* Deal Body */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="font-black text-gray-900 text-lg group-hover:text-[#B91C1C] transition-colors leading-snug">
                    {deal.title}
                  </h3>
                  {deal.urduTitle && (
                    <p className="text-xs text-[#B91C1C] font-arabic font-semibold">
                      {deal.urduTitle}
                    </p>
                  )}

                  {/* Included Items Checklist */}
                  <ul className="space-y-1.5 pt-2 text-xs text-gray-600">
                    {deal.items.map((it, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#B91C1C] shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Add to Cart Button */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-xl font-black text-gray-900">
                        Rs {deal.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        Rs {deal.originalPrice.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => onAddDealToCart(deal)}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer group-hover:scale-105 active:scale-95"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Deal</span>
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
