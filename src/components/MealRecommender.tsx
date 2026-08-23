import React, { useState } from 'react';
import { Sparkles, Check, Plus } from 'lucide-react';
import { MenuItem, DealItem } from '../types';
import { useMenu } from '../context/MenuContext';

interface MealRecommenderProps {
  onAddDealToCart: (deal: DealItem) => void;
  onSelectItem: (item: MenuItem) => void;
}

export const MealRecommender: React.FC<MealRecommenderProps> = ({ onAddDealToCart, onSelectItem }) => {
  const { menuItems, deals } = useMenu();
  const [groupSize, setGroupSize] = useState<'solo' | 'duo' | 'family' | 'party'>('duo');
  const [craving, setCraving] = useState<'broast' | 'pizza' | 'zinger' | 'budget'>('broast');

  const getRecommendation = () => {
    if (groupSize === 'party') {
      const deal = deals.find(d => d.id === 'deal-11') || deals.find(d => d.id === 'pizza-deal-4') || deals[0];
      return {
        title: deal?.title || "Deal 11: 4 Zingers Family Party Box",
        description: "4 Crispy Zinger Burgers + 2 Regular Fries + 1.5 Liter Chilled Soft Drink.",
        price: deal ? deal.price : 1450,
        deal: deal,
        highlights: ["Serves 4", "4x Zinger Burgers", "2x Fries Included", "1.5L Cold Drink"]
      };
    }

    if (groupSize === 'family') {
      if (craving === 'pizza' || craving === 'broast') {
        const deal = deals.find(d => d.id === 'pizza-deal-2') || deals.find(d => d.id === 'super-deal-1') || deals[0];
        return {
          title: deal?.title || "Pizza Deal 2: 2 Medium Pizzas Feast",
          description: "2 Fresh Medium Pizzas of your choice with 1.5 Liter cold drink.",
          price: deal ? deal.price : 2100,
          deal: deal,
          highlights: ["Serves 3-4", "2x Medium Pizzas", "1.5L Family Drink", "Save Rs 200"]
        };
      }
      const deal = deals.find(d => d.id === 'super-deal-2') || deals[0];
      return {
        title: deal?.title || "Super Deal 2: Large Pizza, Wings & Drink",
        description: "1 Large Pizza + 4 Crispy Wings + 1.5 Liter Chilled Soft Drink.",
        price: deal ? deal.price : 1700,
        deal: deal,
        highlights: ["Serves 3-4", "1x Large Pizza", "4x Crispy Wings", "1.5L Drink"]
      };
    }

    if (groupSize === 'duo') {
      if (craving === 'zinger') {
        const deal = deals.find(d => d.id === 'deal-4') || deals[0];
        return {
          title: deal?.title || "Deal 4: 2 Zinger Burgers Deal",
          description: "2 Crispy fried Zinger burgers + 1 Regular portion of French fries.",
          price: deal ? deal.price : 650,
          deal: deal,
          highlights: ["Serves 2", "2x Zinger Burgers", "Regular Fries Included"]
        };
      }
      const deal = deals.find(d => d.id === 'super-deal-1') || deals.find(d => d.id === 'deal-10') || deals[0];
      return {
        title: deal?.title || "Super Deal 1: Medium Pizza, Wings & Drink",
        description: "1 Fresh Medium Pizza + 4 Crispy Wings + 1 Liter Cold Drink.",
        price: deal ? deal.price : 1300,
        deal: deal,
        highlights: ["Serves 2-3", "1x Medium Pizza", "4x Crispy Wings", "1L Soft Drink"]
      };
    }

    // Solo
    if (craving === 'pizza') {
      const item = menuItems.find(m => m.id === 'pizza-chicken-tikka') || menuItems.find(m => m.category === 'pizza') || menuItems[0];
      return {
        title: item?.name || "Chicken Tikka Pizza",
        description: item?.description || "Traditional taste of spicy chicken with Onion, covered with cheese.",
        price: item ? (item.sizes ? item.sizes[0].price : item.price) : 500,
        item: item,
        highlights: ["Small Size (Rs 500)", "Freshly Baked", "Authentic Tikka Flavors"]
      };
    }
    if (craving === 'zinger') {
      const item = menuItems.find(m => m.id === 'burger-zinger') || menuItems.find(m => m.category === 'burgers') || menuItems[0];
      return {
        title: item?.name || "Zinger Burger",
        description: item?.description || "Crispy fried whole chicken fillet with spicy garlic mayo in toasted bun.",
        price: item ? item.price : 300,
        item: item,
        highlights: ["Rs 300 Only", "Extra Crunchy Fillet", "Spicy Garlic Dressing"]
      };
    }
    const item = menuItems.find(m => m.id === 'broast-chest-piece') || menuItems.find(m => m.category === 'broast') || menuItems[0];
    return {
      title: item?.name || "Chohan's Chicken Broast (Chest)",
      description: item?.description || "Pressure-fried crispy chest piece broast with garlic mayo dip.",
      price: item ? item.price : 450,
      item: item,
      highlights: ["Chest Broast", "Ultra Crispy Skin", "Signature Garlic Dip"]
    };
  };

  const rec = getRecommendation();

  return (
    <section className="py-16 bg-[#f9fafb] border-b border-gray-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#B91C1C]" />
            <span>Smart Meal Recommender</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Can't Decide What to Order?
          </h2>
          <p className="text-gray-500 text-sm">
            Select who you're eating with and what you're craving. We'll match you with the best value feast instantly.
          </p>
        </div>

        {/* Step Selector Card */}
        <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-4xl mx-auto shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Controls */}
            <div className="space-y-6">
              {/* Group Size */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  1. Who are you ordering for?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'solo', label: 'Just Me', sub: '1 Person', icon: '👤' },
                    { id: 'duo', label: 'Couple / Duo', sub: '2 Persons', icon: '👥' },
                    { id: 'family', label: 'Small Family', sub: '3-4 Persons', icon: '👨‍👩‍👧' },
                    { id: 'party', label: 'Party / Friends', sub: '5+ Persons', icon: '🎉' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setGroupSize(btn.id as any)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        groupSize === btn.id
                          ? 'bg-[#B91C1C] text-white border-[#B91C1C] font-bold shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-lg block mb-1">{btn.icon}</span>
                      <p className="text-xs font-bold leading-tight">{btn.label}</p>
                      <span className={`text-[10px] ${groupSize === btn.id ? 'text-red-100' : 'text-gray-400'}`}>
                        {btn.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Craving */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  2. What's your primary craving?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'broast', label: 'Golden Broast', icon: '🍗' },
                    { id: 'pizza', label: 'Cheesy Pizza', icon: '🍕' },
                    { id: 'zinger', label: 'Crispy Zinger', icon: '🍔' },
                    { id: 'budget', label: 'Best Value', icon: '💰' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setCraving(btn.id as any)}
                      className={`p-2.5 rounded-2xl text-center border transition-all cursor-pointer ${
                        craving === btn.id
                          ? 'bg-[#111827] text-white border-[#111827] font-bold shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-base block mb-0.5">{btn.icon}</span>
                      <p className="text-[11px] font-bold">{btn.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="bg-gradient-to-br from-red-50 to-orange-50/50 rounded-3xl p-6 border border-red-100 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-[#B91C1C] text-white text-[10px] font-black uppercase tracking-wider">
                    Recommended Match
                  </span>
                  <span className="text-lg font-black text-[#B91C1C]">
                    Rs {rec.price.toLocaleString()}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-black text-gray-900 leading-tight">
                    {rec.title}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    {rec.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="space-y-1.5 pt-2">
                  {rec.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <Check className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="pt-3 border-t border-red-200/60">
                {rec.deal ? (
                  <button
                    onClick={() => onAddDealToCart(rec.deal!)}
                    className="w-full py-3 rounded-full bg-[#B91C1C] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Deal to Order (Rs {rec.price.toLocaleString()})</span>
                  </button>
                ) : rec.item ? (
                  <button
                    onClick={() => onSelectItem(rec.item!)}
                    className="w-full py-3 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg active:scale-95"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Customize & Order (Rs {rec.price.toLocaleString()})</span>
                  </button>
                ) : null}
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
