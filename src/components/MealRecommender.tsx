import React, { useState } from 'react';
import { Sparkles, Check, Plus } from 'lucide-react';
import { MENU_ITEMS, DEALS_DATA } from '../data/restaurantData';
import { MenuItem, DealItem } from '../types';

interface MealRecommenderProps {
  onAddDealToCart: (deal: DealItem) => void;
  onSelectItem: (item: MenuItem) => void;
}

export const MealRecommender: React.FC<MealRecommenderProps> = ({ onAddDealToCart, onSelectItem }) => {
  const [groupSize, setGroupSize] = useState<'solo' | 'duo' | 'family' | 'party'>('duo');
  const [craving, setCraving] = useState<'broast' | 'pizza' | 'zinger' | 'budget'>('broast');

  const getRecommendation = () => {
    if (groupSize === 'party') {
      return {
        title: "Chohan's Mega Party Platter",
        description: "The ultimate Shikarpur feast with 13\" Large Pizza, 4 Pcs Crispy Broast, Loaded Pizza Fries and 1.5L soft drink.",
        price: 3450,
        deal: DEALS_DATA.find(d => d.id === 'deal-4-family-mega'),
        highlights: ["Serves 4-6", "Save Rs 500", "Large Tikka Pizza", "4x Golden Broast Pieces"]
      };
    }

    if (groupSize === 'family') {
      if (craving === 'pizza' || craving === 'broast') {
        return {
          title: "Deal 2: Shikarpur Pizza & Broast Feast",
          description: "Perfect harmony of a 10\" Medium Tikka Pizza + 2 Pcs Golden Broast + Hot Crinkle Fries + 1L Beverage.",
          price: 1750,
          deal: DEALS_DATA.find(d => d.id === 'deal-2-pizza-feast'),
          highlights: ["Serves 2-3", "Save Rs 300", "10\" Tikka Pizza", "2x Broasted Chicken"]
        };
      }
      return {
        title: "Grand Broast Platter (8 Pcs)",
        description: "8 pieces of signature golden crispy pressure-fried chicken, jumbo fries, 4 buns, garlic dips & 1.5L drink.",
        price: 3200,
        item: MENU_ITEMS.find(m => m.id === 'broast-family-platter'),
        highlights: ["Serves 4-5", "Full Family Size", "8 Crispy Chicken Pieces", "Free Dips & Buns"]
      };
    }

    if (groupSize === 'duo') {
      if (craving === 'zinger') {
        return {
          title: "Deal 3: Double Zinger Crunch Box",
          description: "2 Crispy fried Zinger burgers, seasoned French fries & 2 cold drinks.",
          price: 1100,
          deal: DEALS_DATA.find(d => d.id === 'deal-3-zinger-duo'),
          highlights: ["Serves 2", "Save Rs 180", "2x Zinger Burgers", "Crispy Fries + Drinks"]
        };
      }
      return {
        title: "Deal 1: Broast Lover's Combo",
        description: "2 pieces golden chicken broast, large masala crinkle fries, 2 dinner buns, garlic sauces & 2 drinks.",
        price: 1150,
        deal: DEALS_DATA.find(d => d.id === 'deal-1-broast-duo'),
        highlights: ["Serves 1-2", "Save Rs 200", "2 Pcs Broast", "Garlic Dips & Buns"]
      };
    }

    // Solo
    if (craving === 'pizza') {
      return {
        title: "Shikarpur Special Tikka Pizza (Small 7\")",
        description: "Personal 7-inch pan pizza loaded with smoky tandoori chicken chunks and gooey mozzarella.",
        price: 550,
        item: MENU_ITEMS.find(m => m.id === 'pizza-tikka-special'),
        highlights: ["Personal 7\" Size", "4 Slices", "Smoky Tandoori Chicken"]
      };
    }
    if (craving === 'zinger') {
      return {
        title: "Chohan's Signature Zinger Burger",
        description: "Crispy fried whole chicken thigh fillet with chili garlic mayo and toasted brioche bun.",
        price: 450,
        item: MENU_ITEMS.find(m => m.id === 'burger-crispy-zinger'),
        highlights: ["100% Real Chicken Thigh", "Extra Crunchy", "Spicy Garlic Sauce"]
      };
    }
    return {
      title: "Chohan's Golden Chicken Broast (Quarter)",
      description: "Quarter pressure-fried crispy chicken with seasoned crinkle fries, garlic mayo and dip.",
      price: 480,
      item: MENU_ITEMS.find(m => m.id === 'broast-quarter'),
      highlights: ["Quarter Chicken (1 Pc)", "Crinkle Fries Included", "Garlic Mayo Dip"]
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
                      <p className={`text-[10px] ${groupSize === btn.id ? 'text-red-100 font-medium' : 'text-gray-400'}`}>
                        {btn.sub}
                      </p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Craving Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                  2. What's the main craving?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {[
                    { id: 'broast', label: 'Crispy Broast', icon: '🍗' },
                    { id: 'pizza', label: 'Cheesy Pizza', icon: '🍕' },
                    { id: 'zinger', label: 'Crunchy Zinger', icon: '🍔' },
                    { id: 'budget', label: 'Best Value Deal', icon: '💰' },
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      onClick={() => setCraving(btn.id as any)}
                      className={`p-3 rounded-2xl text-left border transition-all cursor-pointer ${
                        craving === btn.id
                          ? 'bg-[#111827] text-white border-[#111827] font-bold shadow-sm'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <span className="text-base block mb-0.5">{btn.icon}</span>
                      <p className="text-xs font-bold leading-tight">{btn.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommendation Result Card */}
            <div className="bg-gradient-to-br from-white to-orange-50/50 rounded-3xl border border-orange-200 p-6 flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B91C1C] text-white shadow-sm">
                    Recommended Match
                  </span>
                  <span className="text-xl font-black text-gray-900">
                    Rs {rec.price.toLocaleString()}
                  </span>
                </div>

                <h3 className="text-xl font-black text-gray-900 leading-snug">
                  {rec.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {rec.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-orange-100">
                  {rec.highlights.map((h, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                      <Check className="w-3.5 h-3.5 text-[#B91C1C] shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-orange-100">
                {rec.deal ? (
                  <button
                    onClick={() => onAddDealToCart(rec.deal!)}
                    className="w-full py-3 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Recommended Deal (Rs {rec.price})</span>
                  </button>
                ) : rec.item ? (
                  <button
                    onClick={() => onSelectItem(rec.item!)}
                    className="w-full py-3 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Customize & Order (Rs {rec.price})</span>
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
