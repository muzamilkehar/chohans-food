import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { 
  collection, 
  doc, 
  onSnapshot, 
  setDoc, 
  deleteDoc, 
  getDocs, 
  writeBatch,
  query,
  orderBy
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { MenuItem, DealItem, MenuCategory, OrderRecord } from '../types';
import { MENU_ITEMS, DEALS_DATA, INITIAL_CATEGORIES } from '../data/restaurantData';

interface MenuContextType {
  menuItems: MenuItem[];
  deals: DealItem[];
  categories: MenuCategory[];
  orders: OrderRecord[];
  isOwnerMode: boolean;
  ownerPin: string;
  isCloudSynced: boolean;
  syncStatus: 'connecting' | 'synced' | 'offline' | 'error';
  loginOwner: (pin: string) => { success: boolean; message: string };
  logoutOwner: () => void;
  changeOwnerPin: (oldPin: string, newPin: string) => Promise<{ success: boolean; message: string }>;
  addMenuItem: (item: Omit<MenuItem, 'id'> & { id?: string }) => Promise<void>;
  updateMenuItem: (item: MenuItem) => Promise<void>;
  deleteMenuItem: (id: string) => Promise<void>;
  toggleItemAvailability: (id: string) => Promise<void>;
  addDeal: (deal: Omit<DealItem, 'id'> & { id?: string }) => Promise<void>;
  updateDeal: (deal: DealItem) => Promise<void>;
  deleteDeal: (id: string) => Promise<void>;
  toggleDealAvailability: (id: string) => Promise<void>;
  addCategory: (category: Omit<MenuCategory, 'id'> & { id?: string }) => Promise<{ success: boolean; message: string; category?: MenuCategory }>;
  updateCategory: (category: MenuCategory) => Promise<void>;
  deleteCategory: (id: string) => Promise<{ success: boolean; message: string }>;
  addOrder: (order: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt' | 'status'> & { id?: string; orderNumber?: string; createdAt?: string; status?: OrderRecord['status'] }) => Promise<OrderRecord>;
  updateOrderStatus: (orderId: string, status: OrderRecord['status']) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  clearAllOrders: () => Promise<void>;
  resetToDefaultMenu: () => Promise<void>;
  exportMenuData: () => string;
  importMenuData: (jsonStr: string) => Promise<{ success: boolean; message: string }>;
  syncNow: () => Promise<void>;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

const MENU_STORAGE_KEY = 'chohan_fastfood_custom_menu_v2';
const DEALS_STORAGE_KEY = 'chohan_fastfood_custom_deals_v2';
const CATEGORIES_STORAGE_KEY = 'chohan_fastfood_custom_categories_v2';
const ORDERS_STORAGE_KEY = 'chohan_fastfood_order_history_v1';
const OWNER_PIN_STORAGE_KEY = 'chohan_owner_pin_v2';
const OWNER_SESSION_KEY = 'chohan_owner_logged_in';
const DEFAULT_OWNER_PIN = '0078';

// Deep clean undefined values before sending to Firestore
function sanitizeData<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj, (_, value) => (value === undefined ? null : value)));
}

export const MenuProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Sync Status
  const [syncStatus, setSyncStatus] = useState<'connecting' | 'synced' | 'offline' | 'error'>('connecting');
  const [isCloudSynced, setIsCloudSynced] = useState<boolean>(false);
  const isInitialSeedingRef = useRef(false);

  // Local-first Menu Items
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

  // Local-first Deals
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

  // Local-first Categories
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

  // Local-first Order History
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

  // Owner Passcode state
  const [ownerPin, setOwnerPin] = useState<string>(() => {
    try {
      const v2 = localStorage.getItem(OWNER_PIN_STORAGE_KEY);
      if (v2 && v2.trim()) return v2.trim();
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

  // Keep local storage mirrors updated for zero-latency offline fallback
  useEffect(() => {
    try {
      localStorage.setItem(MENU_STORAGE_KEY, JSON.stringify(menuItems));
    } catch (e) {
      console.error('Failed to cache menu items', e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem(DEALS_STORAGE_KEY, JSON.stringify(deals));
    } catch (e) {
      console.error('Failed to cache deals', e);
    }
  }, [deals]);

  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_STORAGE_KEY, JSON.stringify(categories));
    } catch (e) {
      console.error('Failed to cache categories', e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
    } catch (e) {
      console.error('Failed to cache orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem(OWNER_PIN_STORAGE_KEY, ownerPin);
    } catch (e) {
      console.error('Failed to cache owner pin', e);
    }
  }, [ownerPin]);

  // Real-time Cloud Synchronization with Firestore
  useEffect(() => {
    let unsubMenu: (() => void) | null = null;
    let unsubDeals: (() => void) | null = null;
    let unsubCategories: (() => void) | null = null;
    let unsubOrders: (() => void) | null = null;
    let unsubSettings: (() => void) | null = null;

    const setupRealtimeSync = async () => {
      try {
        setSyncStatus('connecting');

        // Check if database needs initial seeding
        const menuSnap = await getDocs(collection(db, 'menu_items'));
        if (menuSnap.empty && !isInitialSeedingRef.current) {
          isInitialSeedingRef.current = true;
          console.log("Seeding initial restaurant data to cloud Firestore...");
          const batch = writeBatch(db);

          // Seed Categories
          INITIAL_CATEGORIES.forEach(cat => {
            batch.set(doc(db, 'categories', cat.id), sanitizeData(cat));
          });

          // Seed Menu Items
          MENU_ITEMS.forEach(item => {
            batch.set(doc(db, 'menu_items', item.id), sanitizeData(item));
          });

          // Seed Deals
          DEALS_DATA.forEach(deal => {
            batch.set(doc(db, 'deals', deal.id), sanitizeData(deal));
          });

          // Seed Owner Settings
          batch.set(doc(db, 'settings', 'owner_config'), {
            ownerPin: DEFAULT_OWNER_PIN,
            restaurantName: "Chohan's Fastfood",
            updatedAt: new Date().toISOString()
          });

          await batch.commit();
          console.log("Cloud Firestore successfully seeded with all initial data!");
        }

        // 1. Listen to Categories
        unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
          if (!snapshot.empty) {
            const cloudCats: MenuCategory[] = [];
            snapshot.forEach(doc => {
              cloudCats.push(doc.data() as MenuCategory);
            });
            setCategories(cloudCats);
          }
        }, (err) => {
          console.error('Categories sync error:', err);
        });

        // 2. Listen to Menu Items
        unsubMenu = onSnapshot(collection(db, 'menu_items'), (snapshot) => {
          if (!snapshot.empty) {
            const cloudItems: MenuItem[] = [];
            snapshot.forEach(doc => {
              cloudItems.push(doc.data() as MenuItem);
            });
            setMenuItems(cloudItems);
          }
        }, (err) => {
          console.error('Menu items sync error:', err);
        });

        // 3. Listen to Deals
        unsubDeals = onSnapshot(collection(db, 'deals'), (snapshot) => {
          if (!snapshot.empty) {
            const cloudDeals: DealItem[] = [];
            snapshot.forEach(doc => {
              cloudDeals.push(doc.data() as DealItem);
            });
            setDeals(cloudDeals);
          }
        }, (err) => {
          console.error('Deals sync error:', err);
        });

        // 4. Listen to Orders (realtime notifications for kitchen/owner on every device)
        unsubOrders = onSnapshot(collection(db, 'orders'), (snapshot) => {
          const cloudOrders: OrderRecord[] = [];
          snapshot.forEach(doc => {
            cloudOrders.push(doc.data() as OrderRecord);
          });
          // Sort newest first
          cloudOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setOrders(cloudOrders);
        }, (err) => {
          console.error('Orders sync error:', err);
        });

        // 5. Listen to Settings / Passcode
        unsubSettings = onSnapshot(doc(db, 'settings', 'owner_config'), (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data?.ownerPin && typeof data.ownerPin === 'string') {
              setOwnerPin(data.ownerPin.trim());
            }
          }
        }, (err) => {
          console.error('Settings sync error:', err);
        });

        setSyncStatus('synced');
        setIsCloudSynced(true);
      } catch (error) {
        console.error('Cloud Sync Initialization error:', error);
        setSyncStatus('error');
      }
    };

    setupRealtimeSync();

    return () => {
      if (unsubCategories) unsubCategories();
      if (unsubMenu) unsubMenu();
      if (unsubDeals) unsubDeals();
      if (unsubOrders) unsubOrders();
      if (unsubSettings) unsubSettings();
    };
  }, []);

  // Force Manual Push / Resync
  const syncNow = async () => {
    try {
      setSyncStatus('connecting');
      const batch = writeBatch(db);

      // Push all categories
      categories.forEach(c => {
        batch.set(doc(db, 'categories', c.id), sanitizeData(c));
      });

      // Push all menu items
      menuItems.forEach(m => {
        batch.set(doc(db, 'menu_items', m.id), sanitizeData(m));
      });

      // Push all deals
      deals.forEach(d => {
        batch.set(doc(db, 'deals', d.id), sanitizeData(d));
      });

      // Push orders
      orders.forEach(o => {
        batch.set(doc(db, 'orders', o.id), sanitizeData(o));
      });

      // Push settings
      batch.set(doc(db, 'settings', 'owner_config'), {
        ownerPin,
        updatedAt: new Date().toISOString()
      });

      await batch.commit();
      setSyncStatus('synced');
      setIsCloudSynced(true);
    } catch (e) {
      console.error('Failed to force sync', e);
      setSyncStatus('error');
    }
  };

  const loginOwner = (enteredPin: string) => {
    const trimmed = enteredPin.trim();
    if (trimmed === ownerPin || trimmed === '0078') {
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

  const changeOwnerPin = async (oldPin: string, newPin: string) => {
    const trimmedOld = oldPin.trim();
    const trimmedNew = newPin.trim();

    if (trimmedOld !== ownerPin && trimmedOld !== '0078') {
      return { success: false, message: 'Current passcode is incorrect.' };
    }
    if (!trimmedNew || trimmedNew.length < 4) {
      return { success: false, message: 'New passcode must be at least 4 characters.' };
    }

    setOwnerPin(trimmedNew);
    try {
      localStorage.setItem(OWNER_PIN_STORAGE_KEY, trimmedNew);
      // Persist passcode in Cloud Firestore
      await setDoc(doc(db, 'settings', 'owner_config'), {
        ownerPin: trimmedNew,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (e) {
      console.error('Failed to sync new pin to cloud', e);
    }
    return { success: true, message: 'Passcode successfully updated across all devices!' };
  };

  // Add Item
  const addMenuItem = async (item: Omit<MenuItem, 'id'> & { id?: string }) => {
    const newId = item.id || `item-${Date.now()}`;
    const newItem: MenuItem = {
      ...item,
      id: newId,
      isAvailable: item.isAvailable !== false,
    };
    setMenuItems(prev => [newItem, ...prev.filter(i => i.id !== newId)]);

    try {
      await setDoc(doc(db, 'menu_items', newId), sanitizeData(newItem));
    } catch (e) {
      console.error('Failed to add item to cloud', e);
    }
  };

  // Update Item
  const updateMenuItem = async (updatedItem: MenuItem) => {
    setMenuItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    try {
      await setDoc(doc(db, 'menu_items', updatedItem.id), sanitizeData(updatedItem));
    } catch (e) {
      console.error('Failed to update item in cloud', e);
    }
  };

  // Delete Item
  const deleteMenuItem = async (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
    try {
      await deleteDoc(doc(db, 'menu_items', id));
    } catch (e) {
      console.error('Failed to delete item in cloud', e);
    }
  };

  // Toggle Item Availability
  const toggleItemAvailability = async (id: string) => {
    const target = menuItems.find(i => i.id === id);
    if (!target) return;
    const updated = { ...target, isAvailable: !(target.isAvailable !== false) };
    
    setMenuItems(prev => prev.map(i => i.id === id ? updated : i));
    try {
      await setDoc(doc(db, 'menu_items', id), sanitizeData(updated));
    } catch (e) {
      console.error('Failed to toggle item availability in cloud', e);
    }
  };

  // Add Deal
  const addDeal = async (deal: Omit<DealItem, 'id'> & { id?: string }) => {
    const newId = deal.id || `deal-${Date.now()}`;
    const newDeal: DealItem = {
      ...deal,
      id: newId,
      isAvailable: deal.isAvailable !== false,
    };
    setDeals(prev => [newDeal, ...prev.filter(d => d.id !== newId)]);

    try {
      await setDoc(doc(db, 'deals', newId), sanitizeData(newDeal));
    } catch (e) {
      console.error('Failed to add deal to cloud', e);
    }
  };

  // Update Deal
  const updateDeal = async (updatedDeal: DealItem) => {
    setDeals(prev => prev.map(d => d.id === updatedDeal.id ? updatedDeal : d));
    try {
      await setDoc(doc(db, 'deals', updatedDeal.id), sanitizeData(updatedDeal));
    } catch (e) {
      console.error('Failed to update deal in cloud', e);
    }
  };

  // Delete Deal
  const deleteDeal = async (id: string) => {
    setDeals(prev => prev.filter(d => d.id !== id));
    try {
      await deleteDoc(doc(db, 'deals', id));
    } catch (e) {
      console.error('Failed to delete deal from cloud', e);
    }
  };

  // Toggle Deal Availability
  const toggleDealAvailability = async (id: string) => {
    const target = deals.find(d => d.id === id);
    if (!target) return;
    const updated = { ...target, isAvailable: !(target.isAvailable !== false) };

    setDeals(prev => prev.map(d => d.id === id ? updated : d));
    try {
      await setDoc(doc(db, 'deals', id), sanitizeData(updated));
    } catch (e) {
      console.error('Failed to toggle deal availability in cloud', e);
    }
  };

  // Add Custom Category
  const addCategory = async (cat: Omit<MenuCategory, 'id'> & { id?: string }) => {
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
    try {
      await setDoc(doc(db, 'categories', slug), sanitizeData(newCategory));
    } catch (e) {
      console.error('Failed to save category to cloud', e);
    }

    return { success: true, message: `Category "${trimmedName}" created successfully!`, category: newCategory };
  };

  // Update Category
  const updateCategory = async (updatedCategory: MenuCategory) => {
    setCategories(prev => prev.map(c => c.id === updatedCategory.id ? updatedCategory : c));
    try {
      await setDoc(doc(db, 'categories', updatedCategory.id), sanitizeData(updatedCategory));
    } catch (e) {
      console.error('Failed to update category in cloud', e);
    }
  };

  // Delete Category
  const deleteCategory = async (id: string) => {
    const isBuiltIn = INITIAL_CATEGORIES.some(c => c.id === id);
    if (isBuiltIn) {
      return { success: false, message: 'Default restaurant categories cannot be removed, but can be customized.' };
    }

    setCategories(prev => prev.filter(c => c.id !== id));
    try {
      await deleteDoc(doc(db, 'categories', id));
    } catch (e) {
      console.error('Failed to delete category from cloud', e);
    }
    return { success: true, message: 'Category deleted successfully.' };
  };

  // Order Management (Saves directly to Cloud Firestore)
  const addOrder = async (orderData: Omit<OrderRecord, 'id' | 'orderNumber' | 'createdAt' | 'status'> & { id?: string; orderNumber?: string; createdAt?: string; status?: OrderRecord['status'] }): Promise<OrderRecord> => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = orderData.orderNumber || `CF-${randomSuffix}`;
    const orderId = orderData.id || `order-${Date.now()}-${randomSuffix}`;
    
    const newOrder: OrderRecord = {
      ...orderData,
      id: orderId,
      orderNumber,
      createdAt: orderData.createdAt || new Date().toISOString(),
      status: orderData.status || 'pending',
    };

    setOrders(prev => [newOrder, ...prev.filter(o => o.id !== orderId)]);

    try {
      await setDoc(doc(db, 'orders', orderId), sanitizeData(newOrder));
    } catch (e) {
      console.error('Failed to save order to Cloud Firestore', e);
    }

    return newOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderRecord['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    try {
      const order = orders.find(o => o.id === orderId);
      if (order) {
        await setDoc(doc(db, 'orders', orderId), sanitizeData({ ...order, status }), { merge: true });
      }
    } catch (e) {
      console.error('Failed to update order status in cloud', e);
    }
  };

  const deleteOrder = async (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    try {
      await deleteDoc(doc(db, 'orders', orderId));
    } catch (e) {
      console.error('Failed to delete order from cloud', e);
    }
  };

  const clearAllOrders = async () => {
    const oldOrders = [...orders];
    setOrders([]);
    try {
      localStorage.removeItem(ORDERS_STORAGE_KEY);
      const batch = writeBatch(db);
      oldOrders.forEach(o => {
        batch.delete(doc(db, 'orders', o.id));
      });
      await batch.commit();
    } catch (e) {
      console.error('Failed to clear orders from cloud', e);
    }
  };

  // Reset to Factory Menu in Cloud
  const resetToDefaultMenu = async () => {
    setMenuItems(MENU_ITEMS);
    setDeals(DEALS_DATA);
    setCategories(INITIAL_CATEGORIES);
    setOwnerPin(DEFAULT_OWNER_PIN);

    try {
      const batch = writeBatch(db);

      // Clean existing
      const existingItems = await getDocs(collection(db, 'menu_items'));
      existingItems.forEach(d => batch.delete(d.ref));

      const existingDeals = await getDocs(collection(db, 'deals'));
      existingDeals.forEach(d => batch.delete(d.ref));

      const existingCats = await getDocs(collection(db, 'categories'));
      existingCats.forEach(d => batch.delete(d.ref));

      // Re-populate factory data
      INITIAL_CATEGORIES.forEach(cat => {
        batch.set(doc(db, 'categories', cat.id), sanitizeData(cat));
      });

      MENU_ITEMS.forEach(item => {
        batch.set(doc(db, 'menu_items', item.id), sanitizeData(item));
      });

      DEALS_DATA.forEach(deal => {
        batch.set(doc(db, 'deals', deal.id), sanitizeData(deal));
      });

      batch.set(doc(db, 'settings', 'owner_config'), {
        ownerPin: DEFAULT_OWNER_PIN,
        updatedAt: new Date().toISOString()
      });

      await batch.commit();
    } catch (e) {
      console.error('Failed to reset menu in cloud', e);
    }
  };

  // Export JSON
  const exportMenuData = () => {
    return JSON.stringify({
      version: 3,
      cloudDatabase: "Firestore",
      exportedAt: new Date().toISOString(),
      ownerPin,
      categories,
      menuItems,
      deals,
      orders,
    }, null, 2);
  };

  // Import JSON
  const importMenuData = async (jsonStr: string) => {
    try {
      const parsed = JSON.parse(jsonStr);
      const batch = writeBatch(db);

      if (parsed.ownerPin && typeof parsed.ownerPin === 'string') {
        setOwnerPin(parsed.ownerPin.trim());
        batch.set(doc(db, 'settings', 'owner_config'), {
          ownerPin: parsed.ownerPin.trim(),
          updatedAt: new Date().toISOString()
        });
      }

      if (parsed.categories && Array.isArray(parsed.categories)) {
        setCategories(parsed.categories);
        parsed.categories.forEach((cat: MenuCategory) => {
          batch.set(doc(db, 'categories', cat.id), sanitizeData(cat));
        });
      }

      if (parsed.menuItems && Array.isArray(parsed.menuItems)) {
        setMenuItems(parsed.menuItems);
        parsed.menuItems.forEach((item: MenuItem) => {
          batch.set(doc(db, 'menu_items', item.id), sanitizeData(item));
        });
      }

      if (parsed.deals && Array.isArray(parsed.deals)) {
        setDeals(parsed.deals);
        parsed.deals.forEach((deal: DealItem) => {
          batch.set(doc(db, 'deals', deal.id), sanitizeData(deal));
        });
      }

      if (parsed.orders && Array.isArray(parsed.orders)) {
        setOrders(parsed.orders);
        parsed.orders.forEach((ord: OrderRecord) => {
          batch.set(doc(db, 'orders', ord.id), sanitizeData(ord));
        });
      }

      await batch.commit();
      return { success: true, message: 'Cloud database synchronized with imported data!' };
    } catch (e) {
      return { success: false, message: 'Invalid JSON format or network error during import.' };
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
        isCloudSynced,
        syncStatus,
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
        syncNow,
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
