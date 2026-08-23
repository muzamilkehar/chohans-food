import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, DealItem, MenuCategory, OrderRecord } from '../types';
import { MENU_ITEMS, DEALS_DATA, INITIAL_CATEGORIES } from '../data/restaurantData';

interface MenuContextType {
  menuItems: MenuItem[];
  deals: DealItem[];
  categories: MenuCategory[];
  orders: OrderRecord[];
  isOwnerMode: boolean;
  ownerPin: string;
  loginOwner: (pin: string) => { success: boolean; message: string };
  logoutOwner: () => void;
  changeOwnerPin: (oldPin: string, newPin: string) => { success: boolean; message: string };
  addMenuItem: (item: Omit<MenuItem, 'id'> & { id?: string }) => void;
  updateMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (id: string) => void;
  toggleItemAvailability: (id: string) => void;
  addDeal: (deal: Omit<DealItem, 'id'> & { id?: string }) => void;
  updateDeal: (deal: DealItem) => void;
  deleteDeal: (id: string) => void;
  toggleDealAvailability: (id: string) => void;
  addCategory: (category: Omit<MenuCategory, 'id'> & { id?: string }) => { success: boolean; message: string; category?: MenuCategory };
  updateCategory: (category: MenuCategory) => void;
  deleteCategory: (id: string) => { success: boolean; message: string };
  addOrder: (order: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt' | 'status'> & { id?: string; orderNumber?: string; createdAt?: string; status?: OrderRecord['status'] }) => OrderRecord;
  updateOrderStatus: (orderId: string, status: OrderRecord['status']) => void;
  deleteOrder: (orderId: string) => void;
  clearAllOrders: () => void;
  resetToDefaultMenu: () => void;
  exportMenuData: () => string;
  importMenuData: (jsonStr: string) => { success: boolean; message: string };
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MENU_STORAGE_KEY = 'chohan_fastfood_custom_menu_v2';
const DEALS_STORAGE_KEY = 'chohan_fastfood_custom_deals_v2';
const CATEGORIES_STORAGE_KEY = 'chohan_fastfood_custom_categories_v2';
const ORDERS_STORAGE_KEY = 'chohan_fastfood_order_history_v1';
const OWNER_PIN_STORAGE_KEY = 'chohan_owner_pin_v2';
const OWNER_SESSION_KEY = 'chohan_owner_logged_in';
const DEFAULT_OWNER_PIN = '0078';

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Menu items state
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const saved = localStorage.getItem(MENU_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load stored menu', e);
    }
    return MENU_ITEMS;
  });

  // Deals state
  const [deals, setDeals] = useState<DealItem[]>(() => {
    try {
      const saved = localStorage.getItem(DEALS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load stored deals', e);
    }
    return DEALS_DATA;
  });

  // Categories state (built-in + user added custom categories)
  const [categories, setCategories] = useState<MenuCategory[]>(() => {
    try {
      const saved = localStorage.getItem(CATEGORIES_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Failed to load stored categories', e);
    }
    return INITIAL_CATEGORIES;
  });

  // Order history state
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(ORDERS_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Failed to load order history', e);
    }
    return [];
  });

  // Owner state with 0078 default and storage migration
  const [ownerPin, setOwnerPin] = useState<string>(() => {
    try {
      const v2 = localStorage.getItem(OWNER_PIN_STORAGE_KEY);
      if (v2 && v2.trim()) return v2.trim();

      const old = localStorage.getItem('chohan_owner_pin');
      if (old && old.trim() && old !== '1234' && old !== 'chohan123') {
        localStorage.setItem(OWNER_PIN_STORAGE_KEY, old.trim());
        return old.trim();
      }
      localStorage.setItem(OWNER_PIN_STORAGE_KEY, DEFAULT_OWNER_PIN);
      return DEFAULT_OWNER_PIN;
    } catch {
      return DEFAULT_OWNER_PIN;
    }
  });

  const [isOwnerMode, setIsOwnerMode] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem(OWNER_SESSION_KEY) === 'true';
    } catch {
      return false;
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Failed to save menu', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
    } catch (e) {
      console.error('Failed to save deals', e);
    }
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to save categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to save orders', e);
    }
  }, [orders]);

  const loginOwner = (enteredPin: string) => {
    const trimmed = enteredPin.trim();
    if (trimmed === ownerPin) {
      setIsOwnerMode(true);
      try {
        sessionStorage.setItem(OWNER_SESSION_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return { success: true, message: 'Welcome back! Owner portal unlocked.' };
    }
    return { success: false, message: 'Incorrect passcode. Please try again.' };
  };

  const logoutOwner = () => {
    setIsOwnerMode(false);
    try {
      sessionStorage.removeItem(OWNER_SESSION_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const changeOwnerPin = (oldPin: string, newPin: string) => {
    const trimmedOld = oldPin.trim();
    const trimmedNew = newPin.trim();

    if (trimmedOld !== ownerPin) {
      return { success: false, message: 'Current passcode is incorrect.' };
    }
    if (!trimmedNew || trimmedNew.length < 4) {
      return { success: false, message: 'New passcode must be at least 4 characters.' };
    }
    setOwnerPin(trimmedNew);
    try {
      localStorage.setItem(OWNER_PIN_STORAGE_KEY, trimmedNew);
    } catch (e) {
      console.error(e);
    }
    return { success: true, message: 'Passcode successfully updated!' };
  };

  // Add Item
  const addMenuItem = (item: Omit<MenuItem, 'id'> & { id?: string }) => {
    const newId = item.id || `item-${Date.now()}`;
    const newItem: MenuItem = {
      ...item,
      id: newId,
      isAvailable: item.isAvailable !== false,
    };
    setMenuItems(prev => [newItem, ...prev]);
  };

  // Update Item
  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  // Delete Item
  const deleteMenuItem = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  // Toggle Item Availability
  const toggleItemAvailability = (id: string) => {
    setMenuItems(prev => prev.map(item => {
      if (item.id === id) {
        const currentVal = item.isAvailable !== false;
        return { ...item, isAvailable: !currentVal };
      }
      return item;
    }));
  };

  // Add Deal
  const addDeal = (deal: Omit<DealItem, 'id'> & { id?: string }) => {
    const newId = deal.id || `deal-${Date.now()}`;
    const newDeal: DealItem = {
      ...deal,
      id: newId,
      isAvailable: deal.isAvailable !== false,
    };
    setDeals(prev => [newDeal, ...prev]);
  };

  // Update Deal
  const updateDeal = (updatedDeal: DealItem) => {
    setDeals(prev => prev.map(d => d.id === updatedDeal.id ? updatedDeal : d));
  };

  // Delete Deal
  const deleteDeal = (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
  };

  // Toggle Deal Availability
  const toggleDealAvailability = (id: string) => {
    setDeals(prev => prev.map(d => {
      if (d.id === id) {
        const currentVal = d.isAvailable !== false;
        return { ...d, isAvailable: !currentVal };
      }
      return d;
    }));
  };

  // Add Custom Category
  const addCategory = (cat: Omit<MenuCategory, 'id'> & { id?: string }) => {
    const trimmedName = cat.name.trim();
    if (!trimmedName) {
      return { success: false, message: 'Category name is required.' };
    }

    const slug = cat.id?.trim() || trimmedName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || `cat-${Date.now()}`;
    
    // Check duplicate
    if (categories.some(c => c.id.toLowerCase() === slug.toLowerCase() || c.name.toLowerCase() === trimmedName.toLowerCase())) {
      return { success: false, message: `Category "${trimmedName}" already exists.` };
    }

    const newCategory: MenuCategory = {
      id: slug,
      name: trimmedName,
      urduName: cat.urduName?.trim() || undefined,
      icon: cat.icon || 'UtensilsCrossed',
      description: cat.description?.trim() || undefined,
      isCustom: true,
    };

    setCategories(prev => [...prev, newCategory]);
    return { success: true, message: `Category "${trimmedName}" created successfully!`, category: newCategory };
  };

  // Update Category
  const updateCategory = (updatedCategory: MenuCategory) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
  };

  // Delete Category
  const deleteCategory = (id: string) => {
    // Check if category is built-in
    const isBuiltIn = INITIAL_CATEGORIES.some(c => c.id === id);
    if (isBuiltIn) {
      return { success: false, message: 'Default restaurant categories cannot be removed, but can be customized.' };
    }

    setCategories(prev => prev.filter(c => c.id !== id));
    // Optional: Keep items or reassign them to general category
    return { success: true, message: 'Category deleted successfully.' };
  };

  // Order Management
  const addOrder = (orderData: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt' | 'status'> & { id?: string; orderNumber?: string; createdAt?: string; status?: OrderRecord['status'] }): OrderRecord => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = orderData.orderNumber || `CF-${randomSuffix}`;
    const newOrder: OrderRecord = {
      ...orderData,
      id: orderData.id || `order-${Date.now()}-${randomSuffix}`,
      orderNumber,
      createdAt: orderData.createdAt || new Date().toISOString(),
      status: orderData.status || 'pending',
    };

    setOrders(prev => [newOrder, ...prev]);
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: OrderRecord['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
  };

  const deleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const clearAllOrders = () => {
    setOrders([]);
    try {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Reset to Factory Menu
  const resetToDefaultMenu = () => {
    setMenuItems(MENU_ITEMS);
    setDeals(DEALS_DATA);
    setCategories(INITIAL_CATEGORIES);
    try {
      localStorage.removeItem(MENU_STORAGE_KEY);
      localStorage.removeItem(DEALS_STORAGE_KEY);
      localStorage.removeItem(CATEGORIES_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Export JSON
  const exportMenuData = () => {
    return JSON.stringify({
      version: 2,
      exportedAt: new Date().toISOString(),
      categories,
      menuItems,
      deals,
      orders,
    }, null, 2);
  };

  // Import JSON
  const importMenuData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.categories && Array.isArray(parsed.categories)) {
        setCategories(parsed.categories);
      }
      if (parsed.menuItems && Array.isArray(parsed.menuItems)) {
        setMenuItems(parsed.menuItems);
      }
      if (parsed.deals && Array.isArray(parsed.deals)) {
        setDeals(parsed.deals);
      }
      if (parsed.orders && Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
      }
      return { success: true, message: 'Data successfully imported!' };
    } catch (e) {
      return { success: false, message: 'Invalid JSON format. Please verify file.' };
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        deals,
        categories,
        orders,
        isOwnerMode,
        ownerPin,
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
        toggleDealAvailability,
        addCategory,
        updateCategory,
        deleteCategory,
        addOrder,
        updateOrderStatus,
        deleteOrder,
        clearAllOrders,
        resetToDefaultMenu,
        exportMenuData,
        importMenuData,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
};
