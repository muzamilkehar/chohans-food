import React, { useState, useEffect } from 'react';
import { MenuProvider } from './context/MenuContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedSpecials } from './components/FeaturedSpecials';
import { MenuSection } from './components/MenuSection';
import { DealsSection } from './components/DealsSection';
import { MealRecommender } from './components/MealRecommender';
import { PopularTimes } from './components/PopularTimes';
import { ReviewsSection } from './components/ReviewsSection';
import { AboutStory } from './components/AboutStory';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { ItemDetailModal } from './components/ItemDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { OwnerMenuManager } from './components/OwnerMenuManager';
import { MenuItem, DealItem, CartItem } from './types';
import { RESTAURANT_INFO } from './data/restaurantData';
import { ShoppingBag, MessageCircle, Check } from 'lucide-react';
import { OwnerTabType } from './components/OwnerMenuManager';

function MainAppContent() {
  // Cart state stored in localStorage
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('chohan_fastfood_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedItemForModal, setSelectedItemForModal] = useState<MenuItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Owner Portal modal state
  const [isOwnerManagerOpen, setIsOwnerManagerOpen] = useState(false);
  const [ownerItemToEdit, setOwnerItemToEdit] = useState<MenuItem | null>(null);
  const [ownerTargetTab, setOwnerTargetTab] = useState<OwnerTabType>('items');

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('chohan_fastfood_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error(e);
    }
  }, [cartItems]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleOpenOwnerManager = (itemToEdit?: MenuItem, targetTab: OwnerTabType = 'items') => {
    setOwnerItemToEdit(itemToEdit || null);
    setOwnerTargetTab(targetTab);
    setIsOwnerManagerOpen(true);
  };

  const handleAddToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      // Check if exact same item with same size & addons already exists
      const existingIdx = prev.findIndex(item => 
        item.item.id === newItem.item.id &&
        item.selectedSize?.name === newItem.selectedSize?.name &&
        JSON.stringify(item.selectedAddOns.map(a => a.id).sort()) === JSON.stringify(newItem.selectedAddOns.map(a => a.id).sort()) &&
        (item.specialInstructions || '') === (newItem.specialInstructions || '')
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        const existing = updated[existingIdx];
        const newQty = existing.quantity + newItem.quantity;
        const unitPrice = existing.itemTotal / existing.quantity;
        updated[existingIdx] = {
          ...existing,
          quantity: newQty,
          itemTotal: unitPrice * newQty
        };
        return updated;
      } else {
        return [...prev, newItem];
      }
    });

    showToast(`Added ${newItem.quantity}x ${newItem.item.name} to Cart!`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    if (item.sizes && item.sizes.length > 0) {
      // Open modal so user can pick size
      setSelectedItemForModal(item);
    } else {
      // Direct add
      const newCartItem: CartItem = {
        cartItemId: `${item.id}-${Date.now()}`,
        item,
        selectedAddOns: [],
        quantity: 1,
        itemTotal: item.price,
      };
      handleAddToCart(newCartItem);
    }
  };

  const handleAddDealToCart = (deal: DealItem) => {
    // Treat deal as custom menu item
    const dealAsMenuItem: MenuItem = {
      id: deal.id,
      name: deal.title,
      urduName: deal.urduTitle,
      category: 'deals',
      price: deal.price,
      originalPrice: deal.originalPrice,
      description: deal.items.join(', '),
      image: deal.image,
      serves: deal.serves,
      isPopular: true
    };

    const newCartItem: CartItem = {
      cartItemId: `${deal.id}-${Date.now()}`,
      item: dealAsMenuItem,
      selectedAddOns: [],
      quantity: 1,
      itemTotal: deal.price
    };

    handleAddToCart(newCartItem);
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems(prev => prev.map(item => {
      if (item.cartItemId === cartItemId) {
        const unitPrice = item.itemTotal / item.quantity;
        return {
          ...item,
          quantity: newQuantity,
          itemTotal: unitPrice * newQuantity
        };
      }
      return item;
    }));
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);

  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#111827] font-sans antialiased selection:bg-[#B91C1C] selection:text-white">
      
      {/* Navigation Header */}
      <Header
        cartItems={cartItems}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOwnerManager={() => handleOpenOwnerManager()}
      />

      {/* Main Content Sections */}
      <main>
        <Hero
          onExploreMenu={scrollToMenu}
          onOpenCart={() => setIsCartOpen(true)}
        />

        <FeaturedSpecials
          onSelectItem={(item) => setSelectedItemForModal(item)}
          onAddToCart={handleQuickAdd}
        />

        <MenuSection
          onSelectItem={(item) => setSelectedItemForModal(item)}
          onAddToCart={handleQuickAdd}
          onOpenOwnerManager={handleOpenOwnerManager}
        />

        <DealsSection
          onAddDealToCart={handleAddDealToCart}
          onOpenOwnerManager={() => handleOpenOwnerManager()}
        />

        <MealRecommender
          onAddDealToCart={handleAddDealToCart}
          onSelectItem={(item) => setSelectedItemForModal(item)}
        />

        <PopularTimes />

        <ReviewsSection />

        <AboutStory />

        <LocationSection />
      </main>

      {/* Footer */}
      <Footer onOpenOwnerManager={() => handleOpenOwnerManager()} />

      {/* Item Detail / Customization Modal */}
      {selectedItemForModal && (
        <ItemDetailModal
          item={selectedItemForModal}
          onClose={() => setSelectedItemForModal(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearCart={handleClearCart}
        />
      )}

      {/* Owner Menu Management & CRUD Modal */}
      {isOwnerManagerOpen && (
        <OwnerMenuManager
          isOpen={isOwnerManagerOpen}
          onClose={() => {
            setIsOwnerManagerOpen(false);
            setOwnerItemToEdit(null);
          }}
          initialEditItem={ownerItemToEdit}
          initialTab={ownerTargetTab}
        />
      )}

      {/* Floating Quick Action Bar */}
      <aside aria-label="Quick Action Bar" className="fixed bottom-5 right-5 z-30 flex items-center gap-3">
        {/* Floating WhatsApp Quick Order Button */}
        <a
          href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodeURIComponent("Salam Chohan's Fastfood! I want to order food for delivery in Shikarpur.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all border border-emerald-400/40 cursor-pointer"
          title="Direct WhatsApp Order"
        >
          <MessageCircle className="w-6 h-6 fill-current text-white" />
        </a>

        {/* Floating Cart Button */}
        {totalCartCount > 0 && (
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 px-5 py-3 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-extrabold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-orange-400" />
            <span>{totalCartCount} Items · Rs {totalCartPrice.toLocaleString()}</span>
          </button>
        )}
      </aside>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#111827] text-white px-5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-bold border border-gray-800 animate-in slide-in-from-bottom-4 duration-200">
          <div className="w-4 h-4 rounded-full bg-[#B91C1C] text-white flex items-center justify-center">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <MenuProvider>
      <MainAppContent />
    </MenuProvider>
  );
}
