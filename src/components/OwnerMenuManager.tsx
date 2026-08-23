import React, { useState } from 'react';
import { 
  X, 
  Plus, 
  Edit3, 
  Trash2, 
  Lock, 
  Unlock, 
  Sparkles, 
  Check, 
  AlertCircle, 
  Image as ImageIcon, 
  RotateCcw, 
  Download, 
  Upload, 
  Key, 
  DollarSign, 
  Search, 
  Flame, 
  Eye, 
  EyeOff,
  Copy,
  Sliders,
  Utensils,
  Layers,
  Clock,
  Receipt,
  FolderPlus
} from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { MenuItem, DealItem } from '../types';
import { OwnerCategoriesTab } from './owner/OwnerCategoriesTab';
import { OwnerOrdersTab } from './owner/OwnerOrdersTab';

// Curated high quality food image presets for quick owner selection
const FOOD_IMAGE_PRESETS = [
  { label: 'Golden Broast (Quarter/Half)', url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=800&q=80' },
  { label: 'Crispy Wings & Drumsticks', url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=800&q=80' },
  { label: 'Grand Broast Platter / Bucket', url: 'https://images.unsplash.com/photo-1527477321055-43615b6294a5?auto=format&fit=crop&w=800&q=80' },
  { label: 'Chicken Tikka Pizza', url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80' },
  { label: 'Chicken Fajita Sicilian Pizza', url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80' },
  { label: 'Supreme Cheesy Pizza', url: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=800&q=80' },
  { label: 'Crispy Zinger Burger', url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80' },
  { label: 'Grilled Chicken Burger', url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80' },
  { label: 'Loaded Pizza Cheese Fries', url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80' },
  { label: 'Classic Crispy Fries', url: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=80' },
  { label: 'Cold Drink / Soft Beverage', url: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=800&q=80' },
  { label: 'Fresh Milkshake / Chiller', url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
];

export type OwnerTabType = 'items' | 'deals' | 'categories' | 'orders' | 'editor' | 'settings';

interface OwnerMenuManagerProps {
  isOpen: boolean;
  onClose: () => void;
  initialEditItem?: MenuItem | null;
  initialTab?: OwnerTabType;
}

export const OwnerMenuManager: React.FC<OwnerMenuManagerProps> = ({ 
  isOpen, 
  onClose,
  initialEditItem = null,
  initialTab = 'items'
}) => {
  const {
    menuItems,
    deals,
    categories,
    orders,
    isOwnerMode,
    loginOwner,
    logoutOwner,
    changeOwnerPin,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    toggleItemAvailability,
    addDeal,
    updateDeal,
    deleteDeal,
    resetToDefaultMenu,
    exportMenuData,
    importMenuData,
  } = useMenu();

  // Navigation tab inside manager
  const [activeTab, setActiveTab] = useState<OwnerTabType>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');

  // Sync tab when initialTab changes
  React.useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // PIN login states
  const [enteredPin, setEnteredPin] = useState('');
  const [loginError, setLoginError] = useState('');

  // Item Editor Form state
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [formName, setFormName] = useState('');
  const [formUrduName, setFormUrduName] = useState('');
  const [formCategory, setFormCategory] = useState('broast');
  const [formPrice, setFormPrice] = useState<number>(500);
  const [formOriginalPrice, setFormOriginalPrice] = useState<string>('');
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState(FOOD_IMAGE_PRESETS[0].url);
  const [formIsPopular, setFormIsPopular] = useState(false);
  const [formIsSpicy, setFormIsSpicy] = useState(false);
  const [formIsNew, setFormIsNew] = useState(false);
  const [formServes, setFormServes] = useState('1 Person');
  const [formPrepTime, setFormPrepTime] = useState('10-15 mins');
  const [formSizes, setFormSizes] = useState<{ name: string; price: number }[]>([]);
  const [formAddOns, setFormAddOns] = useState<{ id: string; name: string; price: number }[]>([]);

  // Deals Form state
  const [editingDealId, setEditingDealId] = useState<string | null>(null);
  const [dealTitle, setDealTitle] = useState('');
  const [dealUrduTitle, setDealUrduTitle] = useState('');
  const [dealTag, setDealTag] = useState('Combo Deal');
  const [dealPrice, setDealPrice] = useState<number>(999);
  const [dealOriginalPrice, setDealOriginalPrice] = useState<number>(1200);
  const [dealItemsText, setDealItemsText] = useState('');
  const [dealServes, setDealServes] = useState('2 Persons');
  const [dealImage, setDealImage] = useState(FOOD_IMAGE_PRESETS[2].url);
  const [dealBadge, setDealBadge] = useState('Special Value');

  // PIN change state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [showPinFields, setShowPinFields] = useState(false);
  const [pinChangeMsg, setPinChangeMsg] = useState<{ success: boolean; text: string } | null>(null);

  // Status toasts & delete confirm
  const [feedbackToast, setFeedbackToast] = useState<string | null>(null);
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null);
  const [dealToDelete, setDealToDelete] = useState<DealItem | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importJsonText, setImportJsonText] = useState('');

  // Handle initial edit item passed in props
  React.useEffect(() => {
    if (initialEditItem && isOwnerMode) {
      handleStartEditItem(initialEditItem);
    }
  }, [initialEditItem, isOwnerMode]);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setFeedbackToast(msg);
    setTimeout(() => setFeedbackToast(null), 3500);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    const res = loginOwner(enteredPin);
    if (res.success) {
      setEnteredPin('');
      showToast('Logged in as Owner. You now have full control of the menu!');
    } else {
      setLoginError(res.message);
    }
  };

  const handleStartNewItem = () => {
    setEditingItemId(null);
    setFormName('');
    setFormUrduName('');
    setFormCategory('broast');
    setFormPrice(500);
    setFormOriginalPrice('');
    setFormDescription('');
    setFormImage(FOOD_IMAGE_PRESETS[0].url);
    setFormIsPopular(false);
    setFormIsSpicy(false);
    setFormIsNew(true);
    setFormServes('1-2 Persons');
    setFormPrepTime('12-15 mins');
    setFormSizes([]);
    setFormAddOns([
      { id: 'extra-garlic-dip', name: 'Extra Garlic Mayo Dip', price: 60 },
      { id: 'extra-spicy-sauce', name: 'Extra Peri-Chili Hot Sauce', price: 60 }
    ]);
    setActiveTab('editor');
  };

  const handleStartEditItem = (item: MenuItem) => {
    setEditingItemId(item.id);
    setFormName(item.name);
    setFormUrduName(item.urduName || '');
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormOriginalPrice(item.originalPrice ? item.originalPrice.toString() : '');
    setFormDescription(item.description);
    setFormImage(item.image);
    setFormIsPopular(!!item.isPopular);
    setFormIsSpicy(!!item.isSpicy);
    setFormIsNew(!!item.isNew);
    setFormServes(item.serves || '1 Person');
    setFormPrepTime(item.prepTime || '10-15 mins');
    setFormSizes(item.sizes ? [...item.sizes] : []);
    setFormAddOns(item.addOns ? [...item.addOns] : []);
    setActiveTab('editor');
  };

  const handleDuplicateItem = (item: MenuItem) => {
    const duplicated: MenuItem = {
      ...item,
      id: `item-${Date.now()}`,
      name: `${item.name} (Copy)`,
      isAvailable: true,
    };
    addMenuItem(duplicated);
    showToast(`Created duplicate of "${item.name}"`);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) {
      alert('Please enter an item name');
      return;
    }

    const origPriceNum = formOriginalPrice ? parseFloat(formOriginalPrice) : undefined;

    if (editingItemId) {
      // Update
      const existing = menuItems.find(i => i.id === editingItemId);
      const updated: MenuItem = {
        id: editingItemId,
        name: formName.trim(),
        urduName: formUrduName.trim() || undefined,
        category: formCategory,
        price: Number(formPrice) || 0,
        originalPrice: origPriceNum && origPriceNum > formPrice ? origPriceNum : undefined,
        description: formDescription.trim(),
        image: formImage.trim() || FOOD_IMAGE_PRESETS[0].url,
        isPopular: formIsPopular,
        isSpicy: formIsSpicy,
        isNew: formIsNew,
        isAvailable: existing ? existing.isAvailable !== false : true,
        serves: formServes.trim() || undefined,
        prepTime: formPrepTime.trim() || undefined,
        sizes: formSizes.length > 0 ? formSizes : undefined,
        addOns: formAddOns.length > 0 ? formAddOns : undefined,
      };
      updateMenuItem(updated);
      showToast(`Updated "${formName}" successfully!`);
    } else {
      // Create new
      addMenuItem({
        name: formName.trim(),
        urduName: formUrduName.trim() || undefined,
        category: formCategory,
        price: Number(formPrice) || 0,
        originalPrice: origPriceNum && origPriceNum > formPrice ? origPriceNum : undefined,
        description: formDescription.trim(),
        image: formImage.trim() || FOOD_IMAGE_PRESETS[0].url,
        isPopular: formIsPopular,
        isSpicy: formIsSpicy,
        isNew: formIsNew,
        isAvailable: true,
        serves: formServes.trim() || undefined,
        prepTime: formPrepTime.trim() || undefined,
        sizes: formSizes.length > 0 ? formSizes : undefined,
        addOns: formAddOns.length > 0 ? formAddOns : undefined,
      });
      showToast(`Added new item "${formName}" to menu!`);
    }

    setActiveTab('items');
  };

  // Add Size Row
  const handleAddSizeRow = () => {
    setFormSizes([...formSizes, { name: 'Large', price: formPrice + 300 }]);
  };

  const handleUpdateSizeRow = (index: number, field: 'name' | 'price', value: string | number) => {
    const updated = [...formSizes];
    if (field === 'name') {
      updated[index].name = String(value);
    } else {
      updated[index].price = Number(value);
    }
    setFormSizes(updated);
  };

  const handleRemoveSizeRow = (index: number) => {
    setFormSizes(formSizes.filter((_, i) => i !== index));
  };

  // Add AddOn Row
  const handleAddAddOnRow = () => {
    const newId = `addon-${Date.now()}`;
    setFormAddOns([...formAddOns, { id: newId, name: 'Extra Cheese Slice', price: 80 }]);
  };

  const handleUpdateAddOnRow = (index: number, field: 'name' | 'price', value: string | number) => {
    const updated = [...formAddOns];
    if (field === 'name') {
      updated[index].name = String(value);
    } else {
      updated[index].price = Number(value);
    }
    setFormAddOns(updated);
  };

  const handleRemoveAddOnRow = (index: number) => {
    setFormAddOns(formAddOns.filter((_, i) => i !== index));
  };

  // Deals CRUD
  const handleStartNewDeal = () => {
    setEditingDealId(null);
    setDealTitle('');
    setDealUrduTitle('');
    setDealTag('Family Feast');
    setDealPrice(1500);
    setDealOriginalPrice(1800);
    setDealItemsText('2x Zinger Burgers, 2x Regular Fries, 1x 1L Soft Drink');
    setDealServes('2-3 Persons');
    setDealImage(FOOD_IMAGE_PRESETS[2].url);
    setDealBadge('Save Rs 300');
  };

  const handleStartEditDeal = (deal: DealItem) => {
    setEditingDealId(deal.id);
    setDealTitle(deal.title);
    setDealUrduTitle(deal.urduTitle || '');
    setDealTag(deal.tag);
    setDealPrice(deal.price);
    setDealOriginalPrice(deal.originalPrice);
    setDealItemsText(deal.items.join(', '));
    setDealServes(deal.serves);
    setDealImage(deal.image);
    setDealBadge(deal.badge || '');
  };

  const handleSaveDeal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dealTitle.trim()) return;

    const itemsArray = dealItemsText.split(',').map(s => s.trim()).filter(Boolean);

    if (editingDealId) {
      updateDeal({
        id: editingDealId,
        title: dealTitle.trim(),
        urduTitle: dealUrduTitle.trim() || undefined,
        tag: dealTag.trim() || 'Super Combo',
        price: Number(dealPrice),
        originalPrice: Number(dealOriginalPrice),
        items: itemsArray.length > 0 ? itemsArray : ['Special food assortment'],
        serves: dealServes.trim() || '2 Persons',
        image: dealImage.trim() || FOOD_IMAGE_PRESETS[2].url,
        badge: dealBadge.trim() || undefined,
      });
      showToast(`Updated deal "${dealTitle}"!`);
    } else {
      addDeal({
        title: dealTitle.trim(),
        urduTitle: dealUrduTitle.trim() || undefined,
        tag: dealTag.trim() || 'Super Combo',
        price: Number(dealPrice),
        originalPrice: Number(dealOriginalPrice),
        items: itemsArray.length > 0 ? itemsArray : ['Special food assortment'],
        serves: dealServes.trim() || '2 Persons',
        image: dealImage.trim() || FOOD_IMAGE_PRESETS[2].url,
        badge: dealBadge.trim() || undefined,
      });
      showToast(`Created new deal "${dealTitle}"!`);
    }
    setEditingDealId(null);
  };

  // Change PIN handler
  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeMsg(null);
    const trimmedCurrent = currentPinInput.trim();
    const trimmedNew = newPinInput.trim();
    const trimmedConfirm = confirmPinInput.trim();

    if (!trimmedCurrent) {
      setPinChangeMsg({ success: false, text: 'Please enter your current passcode.' });
      return;
    }
    if (!trimmedNew || trimmedNew.length < 4) {
      setPinChangeMsg({ success: false, text: 'New passcode must be at least 4 characters or digits.' });
      return;
    }
    if (trimmedNew !== trimmedConfirm) {
      setPinChangeMsg({ success: false, text: 'New passcode and confirmation do not match.' });
      return;
    }

    const res = changeOwnerPin(trimmedCurrent, trimmedNew);
    setPinChangeMsg({ success: res.success, text: res.message });
    if (res.success) {
      setCurrentPinInput('');
      setNewPinInput('');
      setConfirmPinInput('');
      showToast('Owner passcode successfully updated!');
    }
  };

  // Filtered menu items for owner list
  const filteredOwnerItems = menuItems.filter(item => {
    const matchesCat = selectedCategoryFilter === 'all' || item.category === selectedCategoryFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q || 
      item.name.toLowerCase().includes(q) || 
      (item.urduName && item.urduName.includes(q)) ||
      item.category.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white border border-gray-200 rounded-3xl max-w-5xl w-full h-[92vh] max-h-[850px] shadow-2xl flex flex-col overflow-hidden text-left relative">
        
        {/* Top App Bar Header */}
        <div className="p-4 sm:p-5 bg-[#111827] text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B91C1C] flex items-center justify-center text-white shadow-md">
              <Utensils className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white">
                  Chohan's Restaurant Owner Portal
                </h3>
                {isOwnerMode && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2 py-0.5 rounded-full">
                    <Unlock className="w-3 h-3" /> Unlocked
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Add, edit, price, and customize live menu items and combo deals in real-time
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOwnerMode && (
              <button
                onClick={() => {
                  logoutOwner();
                  showToast('Logged out of Owner Mode.');
                }}
                className="text-xs text-gray-300 hover:text-white px-3 py-1.5 rounded-xl border border-gray-700 hover:border-gray-500 transition-colors font-bold cursor-pointer"
                title="Lock Owner Portal"
              >
                Lock Portal
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Locked View if not in owner mode */}
        {!isOwnerMode ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-[#f9fafb]">
            <div className="max-w-md w-full bg-white p-8 rounded-3xl border border-gray-200 shadow-xl text-center space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-red-50 border border-red-100 flex items-center justify-center mx-auto text-[#B91C1C]">
                <Lock className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h4 className="text-xl font-black text-gray-900">Owner Passcode Required</h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Enter your restaurant management PIN to access the item creator, price updater, and stock controller.
                </p>
              </div>

              <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1.5">
                    Security PIN / Passcode
                  </label>
                  <input
                    type="password"
                    autoFocus
                    placeholder="Enter passcode"
                    value={enteredPin}
                    onChange={(e) => setEnteredPin(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-gray-900 text-sm font-bold tracking-widest text-center focus:border-[#B91C1C] focus:outline-none focus:bg-white"
                  />
                  {loginError && (
                    <p className="text-xs text-red-600 font-bold mt-1.5 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      {loginError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#B91C1C] hover:bg-red-700 text-white font-black text-xs uppercase tracking-widest shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Unlock className="w-4 h-4" />
                  <span>Unlock Menu Portal</span>
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Main Logged-in Portal Body */
          <div className="flex-1 flex flex-col overflow-hidden bg-[#f9fafb]">
            
            {/* Top Navigation Tabs */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2 overflow-x-auto shrink-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => setActiveTab('items')}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'items'
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>Menu Items</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-bold">
                    {menuItems.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('deals')}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'deals'
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>Deals</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-bold">
                    {deals.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('categories')}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'categories'
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Categories</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-bold">
                    {categories.length}
                  </span>
                </button>

                <button
                  onClick={() => setActiveTab('orders')}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'orders'
                      ? 'bg-[#111827] text-white shadow-sm'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Order Log</span>
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-white/20 font-bold">
                    {orders.length}
                  </span>
                </button>

                <button
                  onClick={handleStartNewItem}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                    activeTab === 'editor' && !editingItemId
                      ? 'bg-[#B91C1C] text-white shadow-sm'
                      : 'bg-red-50 text-[#B91C1C] hover:bg-red-100 border border-red-200'
                  }`}
                >
                  <Plus className="w-3.5 h-3.5 stroke-[3]" />
                  <span className="hidden sm:inline">Add Dish</span>
                </button>
              </div>

              <button
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shrink-0 ${
                  activeTab === 'settings'
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <Sliders className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Settings & Passcode</span>
              </button>
            </div>

            {/* TAB 1: MENU ITEMS LIST */}
            {activeTab === 'items' && (
              <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
                {/* Search & Category Filter Toolbar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 shrink-0">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search items by name or category..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 rounded-2xl bg-white border border-gray-200 text-xs font-medium text-gray-900 focus:border-[#B91C1C] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1">
                    <select
                      value={selectedCategoryFilter}
                      onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                      className="px-3 py-2 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none"
                    >
                      <option value="all">All Categories ({menuItems.length})</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>

                    <button
                      onClick={handleStartNewItem}
                      className="px-4 py-2 rounded-xl bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-1.5 shadow-sm whitespace-nowrap cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Create Item</span>
                    </button>
                  </div>
                </div>

                {/* Items Grid / Table */}
                <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                  {filteredOwnerItems.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl border border-gray-200 space-y-3">
                      <p className="text-sm font-bold text-gray-500">No menu items found matching search</p>
                      <button
                        onClick={handleStartNewItem}
                        className="px-4 py-2 rounded-full bg-[#111827] text-white text-xs font-bold uppercase tracking-wider"
                      >
                        Add your first item
                      </button>
                    </div>
                  ) : (
                    filteredOwnerItems.map((item) => {
                      const isAvailable = item.isAvailable !== false;
                      return (
                        <div
                          key={item.id}
                          className={`p-3.5 rounded-2xl bg-white border transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm ${
                            isAvailable ? 'border-gray-200 hover:border-gray-300' : 'border-red-200 bg-red-50/40 opacity-75'
                          }`}
                        >
                          {/* Item Preview */}
                          <div className="flex items-center gap-3.5 min-w-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-14 h-14 rounded-2xl object-cover border border-gray-200 shrink-0 bg-gray-100"
                              referrerPolicy="no-referrer"
                            />
                            <div className="min-w-0 space-y-0.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <h4 className="font-black text-gray-900 text-sm truncate">
                                  {item.name}
                                </h4>
                                {item.urduName && (
                                  <span className="text-[11px] text-[#B91C1C] font-semibold font-arabic">
                                    {item.urduName}
                                  </span>
                                )}
                                {!isAvailable && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 border border-red-200">
                                    Sold Out
                                  </span>
                                )}
                                {item.isPopular && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900">
                                    Popular ⭐
                                  </span>
                                )}
                                {item.isSpicy && (
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-900">
                                    Spicy 🔥
                                  </span>
                                )}
                              </div>

                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="font-bold text-[#B91C1C]">
                                  Rs {item.price.toLocaleString()}
                                </span>
                                {item.originalPrice && (
                                  <span className="line-through text-gray-400">
                                    Rs {item.originalPrice.toLocaleString()}
                                  </span>
                                )}
                                <span className="text-gray-300">•</span>
                                <span className="uppercase text-[10px] font-bold tracking-wider text-gray-500">
                                  {item.category}
                                </span>
                                {item.sizes && item.sizes.length > 0 && (
                                  <>
                                    <span className="text-gray-300">•</span>
                                    <span className="text-[10px] font-semibold text-gray-600">
                                      {item.sizes.length} sizes
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Quick Action Buttons */}
                          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0">
                            {/* Stock availability toggle */}
                            <button
                              onClick={() => {
                                toggleItemAvailability(item.id);
                                showToast(`${item.name} marked as ${isAvailable ? 'Sold Out' : 'Available'}`);
                              }}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer ${
                                isAvailable
                                  ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200'
                                  : 'bg-red-100 text-red-800 hover:bg-red-200 border border-red-300'
                              }`}
                              title="Toggle Stock Availability"
                            >
                              {isAvailable ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                              <span>{isAvailable ? 'In Stock' : 'Sold Out'}</span>
                            </button>

                            {/* Duplicate Item button */}
                            <button
                              onClick={() => handleDuplicateItem(item)}
                              className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors cursor-pointer"
                              title="Duplicate Item"
                            >
                              <Copy className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit Item button */}
                            <button
                              onClick={() => handleStartEditItem(item)}
                              className="px-3 py-1.5 rounded-xl bg-[#111827] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>

                            {/* Delete Item button */}
                            <button
                              onClick={() => setItemToDelete(item)}
                              className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                              title="Delete Item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: DEALS & COMBOS LIST */}
            {activeTab === 'deals' && (
              <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-hidden">
                <div className="flex items-center justify-between mb-4 shrink-0">
                  <div>
                    <h4 className="font-black text-gray-900 text-base">Special Deals & Combos</h4>
                    <p className="text-xs text-gray-500">Configure value bundles, party boxes, and discounts</p>
                  </div>
                  <button
                    onClick={handleStartNewDeal}
                    className="px-4 py-2 rounded-xl bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Deal</span>
                  </button>
                </div>

                {/* Deal Editor Form if creating/editing a deal */}
                {(editingDealId !== null || dealTitle !== '') && (
                  <form onSubmit={handleSaveDeal} className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm mb-4 space-y-4">
                    <div className="flex items-center justify-between border-b border-gray-100 pb-2">
                      <h5 className="font-black text-gray-900 text-xs uppercase tracking-wider">
                        {editingDealId ? 'Edit Deal Details' : 'Create New Combo Deal'}
                      </h5>
                      <button
                        type="button"
                        onClick={() => { setEditingDealId(null); setDealTitle(''); }}
                        className="text-xs text-gray-400 hover:text-gray-700 font-bold"
                      >
                        Cancel
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Deal Title</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Broast & Pizza Duo"
                          value={dealTitle}
                          onChange={(e) => setDealTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Urdu Title</label>
                        <input
                          type="text"
                          placeholder="e.g. بروسٹ اینڈ پیزا ڈبل ڈیل"
                          value={dealUrduTitle}
                          onChange={(e) => setDealUrduTitle(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Tag / Category</label>
                        <input
                          type="text"
                          placeholder="e.g. Family Feast, Duo Deal"
                          value={dealTag}
                          onChange={(e) => setDealTag(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Deal Price (Rs)</label>
                        <input
                          type="number"
                          required
                          value={dealPrice}
                          onChange={(e) => setDealPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Original Price (Rs)</label>
                        <input
                          type="number"
                          value={dealOriginalPrice}
                          onChange={(e) => setDealOriginalPrice(Number(e.target.value))}
                          className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Serves</label>
                        <input
                          type="text"
                          value={dealServes}
                          onChange={(e) => setDealServes(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-700 mb-1">Badge Tag</label>
                        <input
                          type="text"
                          placeholder="e.g. Save Rs 350"
                          value={dealBadge}
                          onChange={(e) => setDealBadge(e.target.value)}
                          className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 mb-1">
                        Included Items (separate with commas)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 1x Half Broast, 1x Small Pizza, 2x Garlic Dips, 2x Cold Drinks"
                        value={dealItemsText}
                        onChange={(e) => setDealItemsText(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                      />
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => { setEditingDealId(null); setDealTitle(''); }}
                        className="px-4 py-2 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-full bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider"
                      >
                        Save Deal
                      </button>
                    </div>
                  </form>
                )}

                {/* Deals List */}
                <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-gray-300">
                  {deals.map((deal) => (
                    <div
                      key={deal.id}
                      className="p-4 rounded-2xl bg-white border border-gray-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={deal.image}
                          alt={deal.title}
                          className="w-16 h-16 rounded-2xl object-cover border border-gray-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-black text-gray-900 text-sm">{deal.title}</h4>
                            {deal.urduTitle && (
                              <span className="text-xs text-[#B91C1C] font-arabic font-semibold">{deal.urduTitle}</span>
                            )}
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-gray-100 text-gray-800">
                              {deal.tag}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500">{deal.items.join(' • ')}</p>
                          <div className="flex items-center gap-3 text-xs font-bold">
                            <span className="text-[#B91C1C]">Rs {deal.price.toLocaleString()}</span>
                            <span className="line-through text-gray-400">Rs {deal.originalPrice.toLocaleString()}</span>
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md text-[10px]">
                              {deal.serves}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                        <button
                          onClick={() => handleStartEditDeal(deal)}
                          className="px-3 py-1.5 rounded-xl bg-[#111827] hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit Deal</span>
                        </button>
                        <button
                          onClick={() => setDealToDelete(deal)}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 cursor-pointer"
                          title="Delete Deal"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CUSTOM CATEGORIES MANAGEMENT */}
            {activeTab === 'categories' && (
              <OwnerCategoriesTab />
            )}

            {/* TAB: ORDERS HISTORY & KITCHEN SALES LOG */}
            {activeTab === 'orders' && (
              <OwnerOrdersTab />
            )}

            {/* TAB 3: FULL ITEM CREATOR & SURGICAL EDITOR */}
            {activeTab === 'editor' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 scrollbar-thin scrollbar-thumb-gray-300">
                <form onSubmit={handleSaveItem} className="max-w-4xl mx-auto space-y-6">
                  
                  {/* Header */}
                  <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-black text-gray-900">
                        {editingItemId ? `Editing: ${formName || 'Menu Item'}` : 'Create Brand New Menu Item'}
                      </h4>
                      <p className="text-xs text-gray-500">
                        Changes are saved instantly to the live customer-facing store
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTab('items')}
                        className="px-4 py-2 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-full bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-4 h-4" />
                        <span>Save to Menu</span>
                      </button>
                    </div>
                  </div>

                  {/* Basic Info Section */}
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-wider text-gray-400">
                      1. Basic Information & Names
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Item Name (English) *
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Chohan's Cheesy Zinger Melt"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:border-[#B91C1C] focus:bg-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Urdu Name (Optional)
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. چوہان چیزی زنگر میلٹ"
                          value={formUrduName}
                          onChange={(e) => setFormUrduName(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:border-[#B91C1C] focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-gray-700">
                            Menu Category *
                          </label>
                          <button
                            type="button"
                            onClick={() => setActiveTab('categories')}
                            className="text-[11px] font-bold text-[#B91C1C] hover:underline flex items-center gap-0.5 cursor-pointer"
                          >
                            <FolderPlus className="w-3 h-3" />
                            <span>+ New</span>
                          </button>
                        </div>
                        <select
                          value={formCategory}
                          onChange={(e) => setFormCategory(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:border-[#B91C1C] focus:bg-white focus:outline-none"
                        >
                          {categories.map((c) => (
                            <option key={c.id} value={c.id}>
                              {c.name} {c.urduName ? `(${c.urduName})` : ''}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Base Price (PKR) *
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rs</span>
                          <input
                            type="number"
                            required
                            min="0"
                            step="10"
                            value={formPrice}
                            onChange={(e) => setFormPrice(Number(e.target.value))}
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-black text-gray-900 focus:border-[#B91C1C] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          Original Price (Optional Strike-through)
                        </label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rs</span>
                          <input
                            type="number"
                            min="0"
                            placeholder="e.g. 580"
                            value={formOriginalPrice}
                            onChange={(e) => setFormOriginalPrice(e.target.value)}
                            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:border-[#B91C1C] focus:bg-white focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Description & Secret Ingredients *
                      </label>
                      <textarea
                        rows={2}
                        required
                        placeholder="Detailed taste notes, marinade, sauces, and garnishes included..."
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:border-[#B91C1C] focus:bg-white focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Serves Count</label>
                        <input
                          type="text"
                          placeholder="e.g. 1 Person, 2-3 Persons"
                          value={formServes}
                          onChange={(e) => setFormServes(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Prep & Cooking Time</label>
                        <input
                          type="text"
                          placeholder="e.g. 12-15 mins"
                          value={formPrepTime}
                          onChange={(e) => setFormPrepTime(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Image Picker Section */}
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-wider text-gray-400">
                      2. Food Image Selection
                    </h5>

                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <div className="w-28 h-28 rounded-2xl overflow-hidden border border-gray-300 bg-gray-100 shrink-0 shadow-inner">
                        <img
                          src={formImage || FOOD_IMAGE_PRESETS[0].url}
                          alt="Preview"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 space-y-3 w-full">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 mb-1">
                            Custom Image URL
                          </label>
                          <input
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            value={formImage}
                            onChange={(e) => setFormImage(e.target.value)}
                            className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs text-gray-900 focus:border-[#B91C1C] focus:outline-none font-mono"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-bold text-gray-500 mb-1">
                            Or pick a high-res fastfood preset:
                          </label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                            {FOOD_IMAGE_PRESETS.map((preset, idx) => (
                              <button
                                key={idx}
                                type="button"
                                onClick={() => setFormImage(preset.url)}
                                className={`p-1.5 rounded-lg text-left text-[11px] font-semibold border flex items-center gap-1.5 transition-all cursor-pointer truncate ${
                                  formImage === preset.url
                                    ? 'bg-red-50 border-[#B91C1C] text-[#B91C1C] font-bold'
                                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                <span className="w-2 h-2 rounded-full bg-[#B91C1C]" />
                                <span className="truncate">{preset.label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Portion Sizes & Pricing */}
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-gray-400">
                          3. Portion & Size Variations (Optional)
                        </h5>
                        <p className="text-xs text-gray-500">
                          Add multiple portions with custom prices (e.g. Small / Medium / Large / Jumbo)
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddSizeRow}
                        className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Size</span>
                      </button>
                    </div>

                    {formSizes.length === 0 ? (
                      <div className="p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center text-xs text-gray-500">
                        No size variations. Item will sell at base price of Rs {formPrice}.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {formSizes.map((sz, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Size Label (e.g. Quarter, Large 13 Inch)"
                              value={sz.name}
                              onChange={(e) => handleUpdateSizeRow(idx, 'name', e.target.value)}
                              className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none"
                            />
                            <div className="relative w-32">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">Rs</span>
                              <input
                                type="number"
                                value={sz.price}
                                onChange={(e) => handleUpdateSizeRow(idx, 'price', e.target.value)}
                                className="w-full pl-8 pr-2.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-black text-gray-900 focus:outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSizeRow(idx)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Add-ons & Extra Dips */}
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="text-xs font-black uppercase tracking-wider text-gray-400">
                          4. Add-ons, Extra Dips & Toppings
                        </h5>
                        <p className="text-xs text-gray-500">
                          Customer can add these extra items to their order in the modal
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleAddAddOnRow}
                        className="px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add Dip / Topping</span>
                      </button>
                    </div>

                    {formAddOns.length === 0 ? (
                      <div className="p-3 bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-center text-xs text-gray-500">
                        No add-ons configured for this item.
                      </div>
                    ) : (
                      <div className="space-y-2">
                        {formAddOns.map((addon, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <input
                              type="text"
                              placeholder="Add-on Name (e.g. Garlic Dip, Extra Cheese)"
                              value={addon.name}
                              onChange={(e) => handleUpdateAddOnRow(idx, 'name', e.target.value)}
                              className="flex-1 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none"
                            />
                            <div className="relative w-32">
                              <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400">+Rs</span>
                              <input
                                type="number"
                                value={addon.price}
                                onChange={(e) => handleUpdateAddOnRow(idx, 'price', e.target.value)}
                                className="w-full pl-10 pr-2.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-black text-[#B91C1C] focus:outline-none"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveAddOnRow(idx)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Highlights & Badges */}
                  <div className="bg-white p-5 sm:p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
                    <h5 className="text-xs font-black uppercase tracking-wider text-gray-400">
                      5. Display Badges & Status
                    </h5>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                        formIsPopular ? 'bg-amber-50 border-amber-300 text-amber-950 font-bold' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formIsPopular}
                          onChange={(e) => setFormIsPopular(e.target.checked)}
                          className="w-4 h-4 text-amber-500 rounded"
                        />
                        <span className="text-xs">⭐ Bestseller / Popular</span>
                      </label>

                      <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                        formIsSpicy ? 'bg-red-50 border-red-300 text-red-950 font-bold' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formIsSpicy}
                          onChange={(e) => setFormIsSpicy(e.target.checked)}
                          className="w-4 h-4 text-red-600 rounded"
                        />
                        <span className="text-xs">🔥 Spicy Recipe</span>
                      </label>

                      <label className={`p-3.5 rounded-2xl border flex items-center gap-3 cursor-pointer transition-all ${
                        formIsNew ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-bold' : 'bg-gray-50 border-gray-200 text-gray-700'
                      }`}>
                        <input
                          type="checkbox"
                          checked={formIsNew}
                          onChange={(e) => setFormIsNew(e.target.checked)}
                          className="w-4 h-4 text-emerald-600 rounded"
                        />
                        <span className="text-xs">🆕 New Arrival</span>
                      </label>
                    </div>
                  </div>

                  {/* Form Submit Footer */}
                  <div className="flex justify-end gap-3 pt-2 pb-6">
                    <button
                      type="button"
                      onClick={() => setActiveTab('items')}
                      className="px-6 py-3 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      Discard
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 rounded-full bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-black uppercase tracking-widest shadow-lg transition-all cursor-pointer flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      <span>{editingItemId ? 'Update Menu Item' : 'Publish to Live Menu'}</span>
                    </button>
                  </div>

                </form>
              </div>
            )}

            {/* TAB 4: SETTINGS & BACKUP */}
            {activeTab === 'settings' && (
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 space-y-6 scrollbar-thin scrollbar-thumb-gray-300">
                
                {/* Change PIN Card */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 max-w-xl">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Key className="w-4 h-4 text-[#B91C1C]" />
                      <h4 className="font-black text-gray-900 text-sm uppercase tracking-wider">Change Owner Passcode / PIN</h4>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowPinFields(!showPinFields)}
                      className="text-xs text-gray-500 hover:text-gray-900 font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      {showPinFields ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showPinFields ? 'Hide Passcode' : 'Show Passcode'}</span>
                    </button>
                  </div>

                  <form onSubmit={handleChangePin} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">Current Passcode</label>
                      <input
                        type={showPinFields ? 'text' : 'password'}
                        required
                        placeholder="Enter your current passcode"
                        value={currentPinInput}
                        onChange={(e) => setCurrentPinInput(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-[#B91C1C]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">New Passcode</label>
                        <input
                          type={showPinFields ? 'text' : 'password'}
                          required
                          placeholder="New passcode (min 4 digits)"
                          value={newPinInput}
                          onChange={(e) => setNewPinInput(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-[#B91C1C]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Confirm New Passcode</label>
                        <input
                          type={showPinFields ? 'text' : 'password'}
                          required
                          placeholder="Re-enter new passcode"
                          value={confirmPinInput}
                          onChange={(e) => setConfirmPinInput(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-900 focus:outline-none focus:bg-white focus:border-[#B91C1C]"
                        />
                      </div>
                    </div>

                    {pinChangeMsg && (
                      <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
                        pinChangeMsg.success ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-600 border border-red-200'
                      }`}>
                        {pinChangeMsg.success ? <Check className="w-4 h-4 text-emerald-600 shrink-0" /> : <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />}
                        <span>{pinChangeMsg.text}</span>
                      </div>
                    )}

                    <div className="pt-1">
                      <button
                        type="submit"
                        className="px-6 py-2.5 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-sm"
                      >
                        Update Passcode
                      </button>
                    </div>
                  </form>
                </div>

                {/* Backup & Restore Card */}
                <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 max-w-xl">
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4 text-emerald-600" />
                    <h4 className="font-black text-gray-900 text-sm uppercase tracking-wider">Export & Backup Menu Data</h4>
                  </div>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Download a JSON copy of all your custom menu items and deals for safekeeping or sharing across devices.
                  </p>
                  <button
                    onClick={() => {
                      const data = exportMenuData();
                      const blob = new Blob([data], { type: 'application/json' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `chohan-menu-backup-${new Date().toISOString().slice(0, 10)}.json`;
                      a.click();
                      showToast('Menu backup downloaded!');
                    }}
                    className="px-5 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download JSON Backup</span>
                  </button>
                </div>

                {/* Factory Reset Card */}
                <div className="bg-white p-6 rounded-3xl border border-red-200 shadow-sm space-y-4 max-w-xl">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4 text-red-600" />
                    <h4 className="font-black text-red-900 text-sm uppercase tracking-wider">Reset to Original Chohan's Menu</h4>
                  </div>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Restore the authentic default dishes (Signature Broast, Tikka Pizza, Zinger, Loaded Fries) and default prices.
                  </p>
                  <button
                    onClick={() => setShowResetConfirm(true)}
                    className="px-5 py-2.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Restore Factory Menu</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

        {/* Delete Confirmation Modal for Menu Item */}
        {itemToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-200 shadow-2xl space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900">Delete Menu Item?</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Are you sure you want to permanently remove <strong>"{itemToDelete.name}"</strong> from Chohan's Fastfood menu?
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setItemToDelete(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteMenuItem(itemToDelete.id);
                    setItemToDelete(null);
                    showToast(`Deleted "${itemToDelete.name}" from menu.`);
                  }}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider"
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal for Deal */}
        {dealToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-200 shadow-2xl space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
                <Trash2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900">Delete Combo Deal?</h4>
                <p className="text-xs text-gray-600 mt-1">
                  Are you sure you want to permanently remove <strong>"{dealToDelete.title}"</strong>?
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setDealToDelete(null)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    deleteDeal(dealToDelete.id);
                    setDealToDelete(null);
                    showToast(`Deleted "${dealToDelete.title}".`);
                  }}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider"
                >
                  Delete Deal
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reset Confirmation Modal */}
        {showResetConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 max-w-md w-full border border-gray-200 shadow-2xl space-y-4 text-left">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                <RotateCcw className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-black text-gray-900">Reset to Factory Menu?</h4>
                <p className="text-xs text-gray-600 mt-1">
                  This will reload all original default dishes, prices, and combo deals. Any custom added items will be replaced.
                </p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-4 py-2 rounded-full text-xs font-bold text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    resetToDefaultMenu();
                    setShowResetConfirm(false);
                    showToast('Menu successfully restored to factory defaults!');
                  }}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Live Feedback Toast inside modal */}
        {feedbackToast && (
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-50 bg-[#111827] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold border border-gray-800 animate-in slide-in-from-bottom duration-150">
            <div className="w-4 h-4 rounded-full bg-[#B91C1C] flex items-center justify-center text-white">
              <Check className="w-3 h-3 stroke-[3]" />
            </div>
            <span>{feedbackToast}</span>
          </div>
        )}

      </div>
    </div>
  );
};
