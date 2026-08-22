import React, { useState, useEffect } from 'react';
import { X, Plus, Minus, Check, Clock } from 'lucide-react';
import { MenuItem, CartItem } from '../types';

interface ItemDetailModalProps {
  item: MenuItem | null;
  onClose: () => void;
  onAddToCart: (cartItem: CartItem) => void;
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({ item, onClose, onAddToCart }) => {
  if (!item) return null;

  const [selectedSize, setSelectedSize] = useState<{ name: string; price: number } | undefined>(
    item.sizes && item.sizes.length > 0 ? item.sizes[0] : undefined
  );
  const [selectedAddOns, setSelectedAddOns] = useState<{ id: string; name: string; price: number }[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  useEffect(() => {
    if (item.sizes && item.sizes.length > 0) {
      setSelectedSize(item.sizes[0]);
    } else {
      setSelectedSize(undefined);
    }
    setSelectedAddOns([]);
    setQuantity(1);
    setSpecialInstructions('');
  }, [item]);

  const toggleAddOn = (addon: { id: string; name: string; price: number }) => {
    if (selectedAddOns.some(a => a.id === addon.id)) {
      setSelectedAddOns(selectedAddOns.filter(a => a.id !== addon.id));
    } else {
      setSelectedAddOns([...selectedAddOns, addon]);
    }
  };

  const basePrice = selectedSize ? selectedSize.price : item.price;
  const addOnsTotal = selectedAddOns.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + addOnsTotal;
  const itemTotal = unitPrice * quantity;

  const handleAdd = () => {
    const newCartItem: CartItem = {
      cartItemId: `${item.id}-${selectedSize?.name || 'std'}-${Date.now()}`,
      item,
      selectedSize,
      selectedAddOns,
      quantity,
      itemTotal,
      specialInstructions: specialInstructions.trim() || undefined,
    };
    onAddToCart(newCartItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl flex flex-col max-h-[90vh] text-left relative animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-sm transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Item Image Banner */}
        <div className="relative h-48 sm:h-52 bg-gray-100 shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
            <div className="flex gap-1.5">
              {item.isSpicy && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#B91C1C] text-white">
                  Spicy 🔥
                </span>
              )}
              {item.isPopular && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-neutral-950">
                  Popular
                </span>
              )}
            </div>
            {item.prepTime && (
              <span className="text-xs font-bold text-white bg-black/60 px-2.5 py-0.5 rounded-full backdrop-blur-md">
                🕒 {item.prepTime}
              </span>
            )}
          </div>
        </div>

        {/* Scrollable Customization Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1 scrollbar-thin scrollbar-thumb-gray-300">
          
          {/* Title & Description */}
          <div className="space-y-1">
            <h3 className="text-xl font-black text-gray-900">{item.name}</h3>
            {item.urduName && (
              <p className="text-xs text-[#B91C1C] font-arabic font-semibold">{item.urduName}</p>
            )}
            <p className="text-xs text-gray-600 leading-relaxed pt-1">
              {item.description}
            </p>
          </div>

          {/* Size Options */}
          {item.sizes && item.sizes.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Select Portion / Size:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {item.sizes.map((s, idx) => {
                  const isSelected = selectedSize?.name === s.name;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedSize(s)}
                      className={`p-3 rounded-2xl text-left border flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-red-50/70 border-[#B91C1C] text-gray-900 font-bold'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#B91C1C] bg-[#B91C1C] text-white' : 'border-gray-400'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold">{s.name}</span>
                      </div>
                      <span className="text-xs font-black text-[#B91C1C]">
                        Rs {s.price.toLocaleString()}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Add-Ons / Sauces */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
                Recommended Add-ons & Extra Dips:
              </label>
              <div className="space-y-2">
                {item.addOns.map((addon) => {
                  const isChecked = selectedAddOns.some(a => a.id === addon.id);
                  return (
                    <div
                      key={addon.id}
                      onClick={() => toggleAddOn(addon)}
                      className={`p-2.5 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-red-50/70 border-[#B91C1C] text-gray-900 font-bold'
                          : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked ? 'bg-[#B91C1C] border-[#B91C1C] text-white' : 'border-gray-400'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-semibold">{addon.name}</span>
                      </div>
                      <span className="text-xs font-black text-[#B91C1C]">
                        +Rs {addon.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500">
              Kitchen Instructions (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Extra spicy, separate garlic dip, well done fries"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:border-[#B91C1C] focus:outline-none"
            />
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 bg-gray-50 border-t border-gray-200 flex items-center justify-between gap-4 shrink-0">
          {/* Quantity Controls */}
          <div className="flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-full border border-gray-300">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 text-gray-500 hover:text-gray-900 disabled:opacity-30 cursor-pointer"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center font-black text-gray-900 text-sm">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 text-gray-500 hover:text-gray-900 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAdd}
            className="flex-1 py-3.5 px-6 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-widest shadow-md transition-all flex items-center justify-between cursor-pointer active:scale-98"
          >
            <span>Add to Order</span>
            <span>Rs {itemTotal.toLocaleString()}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
