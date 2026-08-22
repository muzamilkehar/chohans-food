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
      const deal = deals.find(d => d.id === 'deal-4-family-mega') || deals[deals.length - 1];
      return {
        title: deal?.title || "Chohan's Mega Party Platter",
        description: "The ultimate Shikarpur feast with 13\" Large Pizza, 4 Pcs Crispy Broast, Loaded Pizza Fries and 1.5L soft drink.",
        price: deal ? deal.price : 3450,
        deal: deal,
        highlights: ["Serves 4-6", "Save Rs 500", "Large Tikka Pizza", "4x Golden Broast Pieces"]
      };
    }

    if (groupSize === 'family') {
      if (craving === 'pizza' || craving === 'broast') {
        const deal = deals.find(d => d.id === 'deal-2-pizza-feast') || deals[1] || deals[0];
        return {
          title: deal?.title || "Deal 2: Shikarpur Pizza & Broast Feast",
          description: "Perfect harmony of a 10\" Medium Tikka Pizza + 2 Pcs Golden Broast + Hot Crinkle Fries + 1L Beverage.",
          price: deal ? deal.price : 1750,
          deal: deal,
          highlights: ["Serves 2-3", "10\" Tikka Pizza", "2x Broasted Chicken", "Hot Fries"]
        };
      }
      const item = menuItems.find(m => m.id === 'broast-family-platter') || menuItems.find(m => m.category === 'broast') || menuItems[0];
      return {
        title: item?.name || "Grand Broast Platter (8 Pcs)",
        description: item?.description || "8 pieces of signature golden crispy pressure-fried chicken, jumbo fries, 4 buns, garlic dips & 1.5L drink.",
        price: item ? item.price : 3200,
        item: item,
        highlights: ["Serves 4-5", "Full Family Size", "Crispy Chicken Pieces", "Free Dips & Buns"]
      };
    }

    if (groupSize === 'duo') {
      if (craving === 'zinger') {
        const deal = deals.find(d => d.id === 'deal-3-zinger-duo') || deals[0];
        return {
          title: deal?.title || "Deal 3: Double Zinger Crunch Box",
          description: "2 Crispy fried Zinger burgers, seasoned French fries & 2 cold drinks.",
          price: deal ? deal.price : 1100,
          deal: deal,
          highlights: ["Serves 2", "2x Zinger Burgers", "Crispy Fries + Drinks"]
        };
      }
      const deal = deals.find(d => d.id === 'deal-1-broast-duo') || deals[0];
      return {
        title: deal?.title || "Deal 1: Broast Lover's Combo",
        description: "2 pieces golden chicken broast, large masala crinkle fries, 2 dinner buns, garlic sauces & 2 drinks.",
        price: deal ? deal.price : 1150,
        deal: deal,
        highlights: ["Serves 1-2", "2 Pcs Broast", "Garlic Dips & Buns"]
      };
    }

    // Solo
    if (craving === 'pizza') {
      const item = menuItems.find(m => m.id === 'pizza-tikka-special') || menuItems.find(m => m.category === 'pizza') || menuItems[0];
      return {
        title: item?.name || "Shikarpur Special Tikka Pizza",
        description: item?.description || "Personal 7-inch pan pizza loaded with smoky tandoori chicken chunks and gooey mozzarella.",
        price: item ? item.price : 550,
        item: item,
        highlights: ["Personal Size", "Freshly Baked", "Smoky Tandoori Chicken"]
      };
    }
    if (craving === 'zinger') {
      const item = menuItems.find(m => m.id === 'burger-crispy-zinger') || menuItems.find(m => m.category === 'burgers') || menuItems[0];
      return {
        title: item?.name || "Chohan's Signature Zinger Burger",
        description: item?.description || "Crispy fried whole chicken thigh fillet with chili garlic mayo and toasted brioche bun.",
        price: item ? item.price : 450,
        item: item,
        highlights: ["100% Real Chicken Thigh", "Extra Crunchy", "Spicy Garlic Sauce"]
      };
    }
    const item = menuItems.find(m => m.id === 'broast-quarter') || menuItems.find(m => m.category === 'broast') || menuItems[0];
    return {
      title: item?.name || "Chohan's Golden Chicken Broast (Quarter)",
      description: item?.description || "Quarter pressure-fried crispy chicken with seasoned crinkle fries, garlic mayo and dip.",
      price: item ? item.price : 480,
      item: item,
      highlights: ["Quarter Chicken", "Crinkle Fries Included", "Garlic Mayo Dip"]
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
