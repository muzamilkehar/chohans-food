import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { MenuItem, DealItem } from '../types';
import { MENU_ITEMS, DEALS_DATA } from '../data/restaurantData';

interface MenuContextType {
  menuItems: MenuItem[];
  deals: DealItem[];
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
  resetToDefaultMenu: () => void;
  exportMenuData: () => string;
  importMenuData: (jsonStr: string) => { success: boolean; message: string };
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MENU_STORAGE_KEY = 'chohan_fastfood_custom_menu_v1';
const DEALS_STORAGE_KEY = 'chohan_fastfood_custom_deals_v1';
const OWNER_PIN_STORAGE_KEY = 'chohan_owner_pin';
const OWNER_SESSION_KEY = 'chohan_owner_logged_in';

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

  // Owner state
  const [ownerPin, setOwnerPin] = useState<string>(() => {
    try {
      return localStorage.getItem(OWNER_PIN_STORAGE_KEY) || '1234';
    } catch {
      return '1234';
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

  const loginOwner = (enteredPin: string) => {
    const trimmed = enteredPin.trim();
    // Accept custom pin or fallback '1234' or 'chohan123'
    if (trimmed === ownerPin || trimmed === '1234' || trimmed === 'chohan123') {
      setIsOwnerMode(true);
      try {
        sessionStorage.setItem(OWNER_SESSION_KEY, 'true');
      } catch (e) {
        console.error(e);
      }
      return { success: true, message: 'Welcome back, Owner! Menu Management Portal unlocked.' };
    }
    return { success: false, message: 'Incorrect PIN. Please check your passcode or use default PIN 1234.' };
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
    if (oldPin !== ownerPin && oldPin !== '1234' && oldPin !== 'chohan123') {
      return { success: false, message: 'Current PIN is incorrect.' };
    }
    if (!newPin || newPin.length < 4) {
      return { success: false, message: 'New PIN must be at least 4 characters.' };
    }
    setOwnerPin(newPin);
    try {
      localStorage.setItem(OWNER_PIN_STORAGE_KEY, newPin);
    } catch (e) {
      console.error(e);
    }
    return { success: true, message: 'Owner PIN successfully updated!' };
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

  // Reset to Factory Menu
  const resetToDefaultMenu = () => {
    setMenuItems(MENU_ITEMS);
    setDeals(DEALS_DATA);
    try {
      localStorage.removeItem(MENU_STORAGE_KEY);
      localStorage.removeItem(DEALS_STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  // Export JSON
  const exportMenuData = () => {
    return JSON.stringify({
      version: 1,
      exportedAt: new Date().toISOString(),
      menuItems,
      deals,
    }, null, 2);
  };

  // Import JSON
  const importMenuData = (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.menuItems && Array.isArray(parsed.menuItems)) {
        setMenuItems(parsed.menuItems);
      }
      if (parsed.deals && Array.isArray(parsed.deals)) {
        setDeals(parsed.deals);
      }
      return { success: true, message: 'Menu data successfully imported!' };
    } catch (e) {
      return { success: false, message: 'Invalid JSON format. Please verify file.' };
    }
  };

  return (
    <MenuContext.Provider
      value={{
        menuItems,
        deals,
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
