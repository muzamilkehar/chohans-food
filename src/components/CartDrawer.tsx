import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  Bike, 
  Store, 
  MapPin, 
  Phone, 
  MessageCircle, 
  ShieldCheck,
  Clock,
  CheckCircle2,
  Printer
} from 'lucide-react';
import { CartItem, OrderRecord } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useMenu } from '../context/MenuContext';
import { InvoiceModal } from './InvoiceModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onOpenOrderHistory?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenOrderHistory,
}) => {
  const { addOrder, orders } = useMenu();
  const [orderType, setOrderType] = useState<'delivery' | 'takeaway'>('delivery');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  const [lastPlacedOrderNumber, setLastPlacedOrderNumber] = useState<string | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderRecord | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.itemTotal, 0);
  const deliveryFee = orderType === 'delivery' ? 100 : 0;
  const grandTotal = subtotal + (subtotal > 0 ? deliveryFee : 0);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNum = `CF-${randomSuffix}`;

    const lines: string[] = [];

    lines.push("CHOHAN'S FASTFOOD - ORDER RECEIPT");
    lines.push(`Order ID: #${orderNum}`);
    lines.push("Allah Wala Chowk, Shikarpur");
    lines.push("");
    lines.push(`Order Type: ${orderType === 'delivery' ? 'Home Delivery' : 'Takeaway / Pickup'}`);
    
    if (customerName.trim()) {
      lines.push(`Customer Name: ${customerName.trim()}`);
    }
    if (customerPhone.trim()) {
      lines.push(`Contact Phone: ${customerPhone.trim()}`);
    }
    if (orderType === 'delivery' && deliveryAddress.trim()) {
      lines.push(`Delivery Address: ${deliveryAddress.trim()}, Shikarpur`);
    }

    lines.push("");
    lines.push("----------------------------------------");
    lines.push("ORDERED ITEMS");
    lines.push("----------------------------------------");
    lines.push("");

    cartItems.forEach((cItem, idx) => {
      lines.push(`${idx + 1}. ${cItem.item.name}`);
      if (cItem.selectedSize) {
        lines.push(`   Size: ${cItem.selectedSize.name}`);
      }
      lines.push(`   Quantity: ${cItem.quantity}`);
      lines.push(`   Price: Rs ${cItem.itemTotal.toLocaleString()}`);

      if (cItem.selectedAddOns.length > 0) {
        lines.push(`   Add-ons: ${cItem.selectedAddOns.map(a => a.name).join(', ')}`);
      }
      if (cItem.specialInstructions && cItem.specialInstructions.trim()) {
        lines.push(`   Item Note: ${cItem.specialInstructions.trim()}`);
      }
      lines.push("");
    });

    lines.push("----------------------------------------");
    lines.push("PAYMENT SUMMARY");
    lines.push("----------------------------------------");
    lines.push("");
    lines.push(`Subtotal: Rs ${subtotal.toLocaleString()}`);
    if (orderType === 'delivery') {
      lines.push(`Delivery Fee: Rs ${deliveryFee}`);
    }
    lines.push(`Total Amount: Rs ${grandTotal.toLocaleString()}`);
    lines.push(`Payment Method: ${orderType === 'delivery' ? 'Cash on Delivery' : 'Cash on Pickup / Counter'}`);

    if (orderNotes.trim()) {
      lines.push("");
      lines.push(`Special Instructions: ${orderNotes.trim()}`);
    }

    lines.push("");
    lines.push("----------------------------------------");
    lines.push("Thank you for ordering with Chohan's Fastfood!");
    lines.push("Please confirm my order preparation.");

    const message = lines.join("\n");

    // Save order to persistent Order History
    addOrder({
      orderNumber: orderNum,
      orderType,
      customerName: customerName.trim() || 'Valued Customer',
      customerPhone: customerPhone.trim(),
      deliveryAddress: orderType === 'delivery' ? deliveryAddress.trim() : undefined,
      orderNotes: orderNotes.trim() || undefined,
      items: [...cartItems],
      subtotal,
      deliveryFee,
      grandTotal,
      status: 'pending',
      receiptText: message,
    });

    setLastPlacedOrderNumber(orderNum);

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-gray-200 shadow-2xl flex flex-col justify-between text-left relative animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 bg-white border-b border-gray-200 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-red-100 text-[#B91C1C] flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-black text-gray-900 text-base">Your Food Cart</h3>
                <p className="text-[11px] text-gray-500 font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {orders.length > 0 && onOpenOrderHistory && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenOrderHistory();
                  }}
                  className="inline-flex items-center gap-1 text-xs text-gray-700 hover:text-[#B91C1C] transition-colors px-2 py-1 bg-gray-100 hover:bg-red-50 rounded-lg font-bold"
                  title="View Previous Orders"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Orders ({orders.length})</span>
                </button>
              )}

              {cartItems.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-gray-400 hover:text-red-600 transition-colors p-1 font-bold uppercase tracking-wider"
                  title="Clear Cart"
                >
                  Clear
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-black flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-5 scrollbar-thin scrollbar-thumb-gray-300 bg-[#f9fafb]">
            
            {/* Last Placed Order Notice */}
            {lastPlacedOrderNumber && (
              <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs font-black">Order #{lastPlacedOrderNumber} Recorded!</span>
                </div>
                <p className="text-[11px] text-emerald-700 leading-relaxed">
                  Your WhatsApp message was generated and saved to your local Order History.
                </p>
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <button
                    onClick={() => {
                      const matched = orders.find(o => o.orderNumber === lastPlacedOrderNumber);
                      if (matched) setInvoiceOrder(matched);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice / Bill</span>
                  </button>

                  {onOpenOrderHistory && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenOrderHistory();
                      }}
                      className="text-xs font-bold text-emerald-800 underline hover:text-emerald-950 flex items-center gap-1 cursor-pointer px-1 py-1"
                    >
                      <Clock className="w-3 h-3" />
                      <span>View History</span>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Order Type Toggle */}
            <div className="grid grid-cols-2 gap-2 bg-gray-200/80 p-1.5 rounded-2xl">
              <button
                onClick={() => setOrderType('delivery')}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === 'delivery'
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Delivery</span>
              </button>
              <button
                onClick={() => setOrderType('takeaway')}
                className={`py-2 px-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  orderType === 'takeaway'
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Takeaway</span>
              </button>
            </div>

            {/* Empty State */}
            {cartItems.length === 0 ? (
              <div className="text-center py-12 space-y-3 bg-white p-6 rounded-3xl border border-gray-200 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-black text-gray-900">Your Cart is Empty</h4>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Add crispy broast, cheesy tikka pizza, or special deals from our menu to start your order!
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-full bg-[#111827] text-white font-bold text-xs uppercase tracking-wider hover:bg-[#B91C1C] cursor-pointer"
                  >
                    Browse Menu
                  </button>
                  {orders.length > 0 && onOpenOrderHistory && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenOrderHistory();
                      }}
                      className="px-4 py-2.5 rounded-full bg-red-50 text-[#B91C1C] border border-red-200 font-bold text-xs uppercase tracking-wider hover:bg-red-100 cursor-pointer flex items-center gap-1.5"
                    >
                      <Clock className="w-3.5 h-3.5" />
                      <span>Past Orders ({orders.length})</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              /* Item List */
              <div className="space-y-3">
                {cartItems.map((cItem) => (
                  <div
                    key={cItem.cartItemId}
                    className="p-3.5 rounded-2xl bg-white border border-gray-200 space-y-2.5 shadow-sm"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <img
                          src={cItem.item.image}
                          alt={cItem.item.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-gray-200"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-gray-900 text-xs sm:text-sm leading-snug">
                            {cItem.item.name}
                          </h4>
                          {cItem.selectedSize && (
                            <span className="text-[10px] text-[#B91C1C] font-bold block">
                              Size: {cItem.selectedSize.name}
                            </span>
                          )}
                          {cItem.selectedAddOns.length > 0 && (
                            <span className="text-[10px] text-gray-500 block line-clamp-1">
                              +{cItem.selectedAddOns.map(a => a.name).join(', ')}
                            </span>
                          )}
                          {cItem.specialInstructions && (
                            <span className="text-[10px] text-orange-600 italic block">
                              "{cItem.specialInstructions}"
                            </span>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => onRemoveItem(cItem.cartItemId)}
                        className="text-gray-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quantity controls & price */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div className="flex items-center gap-2 bg-gray-50 px-2 py-1 rounded-full border border-gray-200">
                        <button
                          onClick={() => onUpdateQuantity(cItem.cartItemId, cItem.quantity - 1)}
                          className="p-0.5 text-gray-500 hover:text-black cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-900 w-4 text-center">
                          {cItem.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(cItem.cartItemId, cItem.quantity + 1)}
                          className="p-0.5 text-gray-500 hover:text-black cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-black text-gray-900 text-xs sm:text-sm">
                        Rs {cItem.itemTotal.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Customer Checkout Details Form */}
                <div className="pt-4 border-t border-gray-200 space-y-3 bg-white p-4 rounded-2xl border">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                    Contact & Delivery Info:
                  </span>

                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Your Full Name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:border-[#B91C1C] focus:outline-none"
                    />

                    <input
                      type="tel"
                      placeholder="Phone Number (e.g. 0331 1234567)"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:border-[#B91C1C] focus:outline-none"
                    />

                    {orderType === 'delivery' && (
                      <textarea
                        rows={2}
                        placeholder="Street Address & Landmark in Shikarpur (e.g. Near Station Road)"
                        value={deliveryAddress}
                        onChange={(e) => setDeliveryAddress(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:border-[#B91C1C] focus:outline-none"
                      />
                    )}

                    <input
                      type="text"
                      placeholder="Special Instructions (e.g. extra ketchup, less spicy) [optional]"
                      value={orderNotes}
                      onChange={(e) => setOrderNotes(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 text-xs placeholder-gray-400 focus:border-[#B91C1C] focus:outline-none"
                    />
                  </div>
                </div>

              </div>
            )}

          </div>

          {/* Footer Checkout Panel */}
          {cartItems.length > 0 && (
            <div className="p-5 bg-white border-t border-gray-200 space-y-3 shrink-0">
              {/* Bill Details */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-500 font-medium">
                  <span>Subtotal</span>
                  <span>Rs {subtotal.toLocaleString()}</span>
                </div>
                {orderType === 'delivery' && (
                  <div className="flex justify-between text-gray-500 font-medium">
                    <span>Local Delivery Fee</span>
                    <span>Rs {deliveryFee}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-900 font-black text-sm pt-1.5 border-t border-gray-200">
                  <span>Grand Total</span>
                  <span className="text-[#B91C1C]">Rs {grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Payment note */}
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-emerald-600" />
                <span>Pay with Cash on Delivery / Counter</span>
              </div>

              {/* WhatsApp Checkout Button */}
              <button
                id="cart-whatsapp-order-btn"
                onClick={handleWhatsAppOrder}
                className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer group active:scale-98"
              >
                <MessageCircle className="w-4 h-4 text-white group-hover:scale-110 transition-transform" />
                <span>Order via WhatsApp (Rs {grandTotal.toLocaleString()})</span>
              </button>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="w-full py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#B91C1C]" />
                <span>Call Kitchen: {RESTAURANT_INFO.phone}</span>
              </a>
            </div>
          )}

        </div>
      </div>

      {/* Invoice Print Modal */}
      <InvoiceModal
        order={invoiceOrder}
        isOpen={Boolean(invoiceOrder)}
        onClose={() => setInvoiceOrder(null)}
      />
    </div>
  );
};
