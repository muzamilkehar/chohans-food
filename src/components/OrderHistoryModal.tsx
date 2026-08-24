import React, { useState, useMemo } from 'react';
import { 
  X, 
  Clock, 
  Receipt, 
  ShoppingBag, 
  Bike, 
  Store, 
  RotateCcw, 
  MessageCircle, 
  Copy, 
  Check, 
  ChevronRight, 
  Trash2, 
  Search, 
  Calendar,
  Phone,
  MapPin,
  FileText,
  Printer,
  Filter,
  CalendarDays
} from 'lucide-react';
import { OrderRecord, CartItem } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { useMenu } from '../context/MenuContext';
import { InvoiceModal } from './InvoiceModal';

interface OrderHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReorder: (items: CartItem[]) => void;
}

type TimeframeOption = 'all' | 'today' | 'this_week' | 'this_month' | 'specific_date';

export const OrderHistoryModal: React.FC<OrderHistoryModalProps> = ({
  isOpen,
  onClose,
  onReorder,
}) => {
  const { orders, deleteOrder, clearAllOrders } = useMenu();
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderRecord | null>(null);
  const [timeframe, setTimeframe] = useState<TimeframeOption>('all');

  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);
  const [selectedDate, setSelectedDate] = useState<string>(todayStr);

  // Helper date functions
  const isSameDay = (d1: Date, d2: Date) => {
    return d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate();
  };

  const getLocalDateKey = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  };

  // Filtered by Timeframe + Search
  const filteredOrders = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return orders.filter((ord) => {
      const orderDate = new Date(ord.createdAt);
      const isDateValid = !isNaN(orderDate.getTime());

      // Timeframe check
      if (isDateValid) {
        if (timeframe === 'today' && !isSameDay(orderDate, today)) return false;
        if (timeframe === 'this_week' && orderDate < sevenDaysAgo) return false;
        if (timeframe === 'this_month' && orderDate < firstDayOfMonth) return false;
        if (timeframe === 'specific_date' && selectedDate) {
          const ordKey = getLocalDateKey(orderDate);
          if (ordKey !== selectedDate) return false;
        }
      }

      // Search Query check
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        ord.orderNumber.toLowerCase().includes(q) ||
        ord.customerName.toLowerCase().includes(q) ||
        ord.customerPhone.toLowerCase().includes(q) ||
        ord.items.some(i => i.item.name.toLowerCase().includes(q))
      );
    });
  }, [orders, timeframe, selectedDate, searchQuery]);

  if (!isOpen) return null;

  const totalSpentInPeriod = filteredOrders
    .filter(o => o.status !== 'cancelled')
    .reduce((sum, o) => sum + o.grandTotal, 0);

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-amber-100 text-amber-800 border border-amber-200">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Kitchen Preparing
          </span>
        );
      case 'on_the_way':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-blue-100 text-blue-800 border border-blue-200">
            <Bike className="w-3 h-3" />
            Out for Delivery
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Check className="w-3 h-3" />
            Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-rose-100 text-rose-800 border border-rose-200">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-purple-100 text-purple-800 border border-purple-200">
            <Clock className="w-3 h-3" />
            Order Received
          </span>
        );
    }
  };

  const copyReceipt = (order: OrderRecord) => {
    navigator.clipboard.writeText(order.receiptText || `Receipt #${order.orderNumber}`);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2500);
  };

  const sendWhatsAppAgain = (order: OrderRecord) => {
    const encoded = encodeURIComponent(order.receiptText);
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encoded}`;
    window.open(url, '_blank');
  };

  const handleReorderClick = (order: OrderRecord) => {
    onReorder(order.items);
    onClose();
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 text-left animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-200 flex flex-col max-h-[90vh] overflow-hidden">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-[#111827] text-white flex items-center justify-between border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#B91C1C] flex items-center justify-center text-white shadow-md">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                <span>Order History & Receipts</span>
                <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                  {orders.length} Total
                </span>
              </h3>
              <p className="text-xs text-gray-400">
                Track past food orders, filter by day/week/month, view digital receipts, or re-order.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 bg-gray-50">
          
          {/* Filter Bar: Day / Week / Month / Date Picker */}
          {orders.length > 0 && (
            <div className="bg-white p-3.5 rounded-2xl border border-gray-200 shadow-sm space-y-3">
              
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap items-center gap-1.5">
                  <button
                    onClick={() => setTimeframe('all')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      timeframe === 'all'
                        ? 'bg-[#111827] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    All History
                  </button>

                  <button
                    onClick={() => setTimeframe('today')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      timeframe === 'today'
                        ? 'bg-[#B91C1C] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    Today
                  </button>

                  <button
                    onClick={() => setTimeframe('this_week')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      timeframe === 'this_week'
                        ? 'bg-[#111827] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    This Week
                  </button>

                  <button
                    onClick={() => setTimeframe('this_month')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      timeframe === 'this_month'
                        ? 'bg-[#111827] text-white shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    This Month
                  </button>
                </div>

                {/* Specific Date input */}
                <div className="flex items-center gap-1.5 bg-gray-50 p-1 px-2.5 rounded-xl border border-gray-200">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-[11px] font-bold text-gray-700">Date:</span>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setTimeframe('specific_date');
                    }}
                    className="bg-white border border-gray-300 rounded-lg px-2 py-0.5 text-xs font-semibold text-gray-900 focus:outline-none"
                  />
                </div>
              </div>

              {/* Search & Period Total Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2 border-t border-gray-100">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by order #, customer, or dish..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                  />
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-bold text-gray-600">
                    Total: <strong className="text-[#B91C1C] font-mono">Rs {totalSpentInPeriod.toLocaleString()}</strong> ({filteredOrders.length} {filteredOrders.length === 1 ? 'order' : 'orders'})
                  </span>

                  {orders.length > 0 && (
                    <div>
                      {showClearConfirm ? (
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-red-600">Clear all?</span>
                          <button
                            onClick={() => {
                              clearAllOrders();
                              setShowClearConfirm(false);
                            }}
                            className="px-2.5 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-xs font-bold"
                          >
                            Yes
                          </button>
                          <button
                            onClick={() => setShowClearConfirm(false)}
                            className="px-2 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg text-xs font-bold"
                          >
                            No
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => setShowClearConfirm(true)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                          title="Clear all order history"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

            </div>
          )}

          {orders.length === 0 ? (
            /* Empty State */
            <div className="py-16 text-center space-y-4 bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#B91C1C] mx-auto flex items-center justify-center shadow-inner">
                <Receipt className="w-8 h-8 opacity-70" />
              </div>
              <div className="space-y-1">
                <h4 className="font-black text-gray-900 text-base">No Previous Orders Yet</h4>
                <p className="text-xs text-gray-500 max-w-sm mx-auto">
                  When you place an order via WhatsApp or checkout, your detailed receipt and tracking log will automatically appear here.
                </p>
              </div>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-full bg-[#B91C1C] hover:bg-red-700 text-white font-extrabold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Browse Delicious Menu</span>
              </button>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="py-12 text-center bg-white rounded-3xl border border-gray-200 p-6 space-y-2">
              <p className="text-xs font-bold text-gray-500">No orders matching selected date or filters.</p>
              <button
                onClick={() => {
                  setTimeframe('all');
                  setSearchQuery('');
                }}
                className="text-xs text-[#B91C1C] font-black hover:underline"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            /* Order List */
            <div className="space-y-3.5">
              {filteredOrders.map((ord) => {
                const totalItemsCount = ord.items.reduce((sum, i) => sum + i.quantity, 0);

                return (
                  <div
                    key={ord.id}
                    className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all space-y-3.5"
                  >
                    {/* Top Row: Order ID, Type, Date, Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-gray-100">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-gray-800 font-black text-xs">
                          {ord.orderType === 'delivery' ? <Bike className="w-4 h-4 text-[#B91C1C]" /> : <Store className="w-4 h-4 text-emerald-600" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-gray-900 text-sm tracking-wide font-mono">
                              #{ord.orderNumber}
                            </span>
                            <span className="text-[11px] font-bold text-gray-500 capitalize">
                              · {ord.orderType === 'delivery' ? 'Home Delivery' : 'Takeaway'}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                            <Calendar className="w-3 h-3" />
                            {formatDate(ord.createdAt)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {getStatusBadge(ord.status)}
                        <button
                          onClick={() => deleteOrder(ord.id)}
                          className="p-1.5 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Remove from history"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Customer & Address Details */}
                    {(ord.customerName || ord.customerPhone || ord.deliveryAddress) && (
                      <div className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl flex flex-wrap items-center gap-x-4 gap-y-1">
                        {ord.customerName && (
                          <span className="font-bold text-gray-900">
                            👤 {ord.customerName}
                          </span>
                        )}
                        {ord.customerPhone && (
                          <span className="text-gray-600 flex items-center gap-1 font-medium">
                            <Phone className="w-3.5 h-3.5 text-gray-400" />
                            {ord.customerPhone}
                          </span>
                        )}
                        {ord.deliveryAddress && (
                          <span className="text-gray-600 flex items-center gap-1 font-medium">
                            <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
                            {ord.deliveryAddress}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Items Summary */}
                    <div className="space-y-1.5">
                      {ord.items.map((cItem, iIdx) => (
                        <div key={iIdx} className="flex items-center justify-between text-xs text-gray-700">
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-md bg-gray-100 text-gray-800 font-extrabold text-[11px] flex items-center justify-center shrink-0">
                              {cItem.quantity}x
                            </span>
                            <span className="font-bold text-gray-900">
                              {cItem.item.name}
                            </span>
                            {cItem.selectedSize && (
                              <span className="text-[10px] text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded font-medium">
                                {cItem.selectedSize.name}
                              </span>
                            )}
                          </div>
                          <span className="font-bold text-gray-900 font-mono">
                            Rs {cItem.itemTotal.toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price & Action Buttons */}
                    <div className="pt-3 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="flex items-baseline gap-2">
                        <span className="text-xs text-gray-400 uppercase font-black">Grand Total:</span>
                        <span className="text-base font-black text-[#B91C1C] font-mono">
                          Rs {ord.grandTotal.toLocaleString()}
                        </span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          ({totalItemsCount} {totalItemsCount === 1 ? 'item' : 'items'})
                        </span>
                      </div>

                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        {/* Print Invoice */}
                        <button
                          onClick={() => setInvoiceOrder(ord)}
                          className="px-3 py-1.5 rounded-xl bg-gray-900 hover:bg-[#B91C1C] text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                          title="Print customer bill or receipt"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Bill</span>
                        </button>

                        {/* Copy Receipt */}
                        <button
                          onClick={() => copyReceipt(ord)}
                          className="px-3 py-1.5 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Copy text receipt"
                        >
                          {copiedOrderId === ord.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                              <span className="text-emerald-600">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5 text-gray-500" />
                              <span>Receipt</span>
                            </>
                          )}
                        </button>

                        {/* WhatsApp Again */}
                        <button
                          onClick={() => sendWhatsAppAgain(ord)}
                          className="px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
                          title="Send to WhatsApp kitchen"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>WhatsApp</span>
                        </button>

                        {/* Re-order CTA */}
                        <button
                          onClick={() => handleReorderClick(ord)}
                          className="px-4 py-1.5 rounded-xl bg-[#111827] hover:bg-[#B91C1C] text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                          <span>Re-order</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center justify-between text-xs text-gray-500 shrink-0">
          <span>Chohan's Fastfood · Allah Wala Chowk, Shikarpur</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>

      {/* Invoice Printing Modal */}
      <InvoiceModal
        order={invoiceOrder}
        isOpen={Boolean(invoiceOrder)}
        onClose={() => setInvoiceOrder(null)}
      />
    </div>
  );
};
