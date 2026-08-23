import React, { useState } from 'react';
import { 
  Clock, 
  Bike, 
  Store, 
  Check, 
  Trash2, 
  Search, 
  MessageCircle, 
  Phone, 
  MapPin, 
  Copy, 
  DollarSign, 
  Calendar, 
  FileText,
  AlertCircle,
  TrendingUp,
  Printer,
  X
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { OrderRecord } from '../../types';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { InvoiceModal } from '../InvoiceModal';

export const OwnerOrdersTab: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, clearAllOrders } = useMenu();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderRecord | null>(null);

  // Analytics Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'cancelled' ? o.grandTotal : 0), 0);
  const activeOrdersCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing' || o.status === 'on_the_way').length;
  const deliveredCount = orders.filter(o => o.status === 'delivered').length;

  const filteredOrders = orders.filter((ord) => {
    const matchesStatus = statusFilter === 'all' || ord.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus;

    const matchesQuery = 
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.customerPhone.toLowerCase().includes(q) ||
      (ord.deliveryAddress && ord.deliveryAddress.toLowerCase().includes(q)) ||
      ord.items.some(i => i.item.name.toLowerCase().includes(q));

    return matchesStatus && matchesQuery;
  });

  const getStatusBadge = (status: OrderRecord['status']) => {
    switch (status) {
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            Kitchen Preparing
          </span>
        );
      case 'on_the_way':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-blue-100 text-blue-900 border border-blue-300">
            <Bike className="w-3.5 h-3.5" />
            Out for Delivery
          </span>
        );
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-900 border border-emerald-300">
            <Check className="w-3.5 h-3.5" />
            Delivered
          </span>
        );
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold bg-rose-100 text-rose-900 border border-rose-300">
            Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-extrabold bg-purple-100 text-purple-900 border border-purple-300">
            <Clock className="w-3.5 h-3.5" />
            New Order Received
          </span>
        );
    }
  };

  const copyReceipt = (order: OrderRecord) => {
    navigator.clipboard.writeText(order.receiptText || `Order #${order.orderNumber}`);
    setCopiedOrderId(order.id);
    setTimeout(() => setCopiedOrderId(null), 2500);
  };

  const openCustomerWhatsApp = (order: OrderRecord) => {
    const rawPhone = order.customerPhone.replace(/[^0-9]/g, '');
    const cleanPhone = rawPhone.startsWith('0') ? '92' + rawPhone.slice(1) : rawPhone.startsWith('92') ? rawPhone : `92${rawPhone}`;
    const text = encodeURIComponent(`Salam ${order.customerName}! Regarding your Chohan's Fastfood Order #${order.orderNumber}: `);
    window.open(`https://wa.me/${cleanPhone || RESTAURANT_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-PK', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="flex-1 flex flex-col p-4 sm:p-6 overflow-y-auto space-y-6">
      
      {/* Sales Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">Total Recorded Sales</p>
            <h3 className="text-xl font-black text-gray-900 font-mono mt-1">
              Rs {totalRevenue.toLocaleString()}
            </h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5">
              Across {orders.length} total orders
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">Active Kitchen Orders</p>
            <h3 className="text-xl font-black text-amber-600 font-mono mt-1">
              {activeOrdersCount}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              Pending / Preparing / Out
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-wider text-gray-400">Completed Orders</p>
            <h3 className="text-xl font-black text-blue-600 font-mono mt-1">
              {deliveredCount}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              Successfully delivered
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Check className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Toolbar & Filters */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order #, customer, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-900 focus:border-[#B91C1C] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto justify-between sm:justify-end">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-gray-700 focus:outline-none"
          >
            <option value="all">All Statuses ({orders.length})</option>
            <option value="pending">Pending ({orders.filter(o => o.status === 'pending').length})</option>
            <option value="preparing">Preparing ({orders.filter(o => o.status === 'preparing').length})</option>
            <option value="on_the_way">On The Way ({orders.filter(o => o.status === 'on_the_way').length})</option>
            <option value="delivered">Delivered ({orders.filter(o => o.status === 'delivered').length})</option>
            <option value="cancelled">Cancelled ({orders.filter(o => o.status === 'cancelled').length})</option>
          </select>

          {orders.length > 0 && (
            <div>
              {showClearConfirm ? (
                <div className="flex items-center gap-1.5 bg-red-50 p-1 rounded-xl border border-red-200">
                  <span className="text-[11px] font-bold text-red-700 pl-1">Confirm clear all?</span>
                  <button
                    onClick={() => {
                      clearAllOrders();
                      setShowClearConfirm(false);
                    }}
                    className="px-2.5 py-1 bg-red-600 text-white rounded-lg text-xs font-bold"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowClearConfirm(false)}
                    className="px-2 py-1 bg-gray-200 text-gray-800 rounded-lg text-xs font-bold"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="px-3 py-2 text-xs font-bold text-gray-500 hover:text-red-600 flex items-center gap-1.5 rounded-xl hover:bg-red-50 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Log</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="bg-white p-12 text-center rounded-3xl border border-gray-200 space-y-3">
          <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <h4 className="text-base font-black text-gray-900">No Orders Placed Yet</h4>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            When customers place orders via WhatsApp or online checkout, they will immediately appear here with customer contact details and order status controls.
          </p>
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="bg-white p-8 text-center rounded-2xl border border-gray-200">
          <p className="text-xs font-bold text-gray-500">No orders match your filter criteria.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm space-y-4 hover:border-gray-300 transition-all"
            >
              {/* Header row: Order ID, Type, Date, Status Selector */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center font-black">
                    {ord.orderType === 'delivery' ? <Bike className="w-5 h-5 text-[#B91C1C]" /> : <Store className="w-5 h-5 text-emerald-600" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-gray-900 text-sm font-mono">
                        #{ord.orderNumber}
                      </span>
                      <span className="text-xs font-bold text-gray-500 capitalize">
                        · {ord.orderType === 'delivery' ? 'Home Delivery' : 'Takeaway'}
                      </span>
                    </div>
                    <p className="text-[11px] text-gray-400 flex items-center gap-1 font-medium">
                      <Calendar className="w-3 h-3" />
                      {formatDate(ord.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-gray-400">Status:</span>
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderRecord['status'])}
                      className="px-3 py-1.5 rounded-xl border border-gray-300 bg-gray-50 text-xs font-black text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                    >
                      <option value="pending">🟡 Pending (New)</option>
                      <option value="preparing">🟠 In Kitchen (Preparing)</option>
                      <option value="on_the_way">🔵 Out for Delivery</option>
                      <option value="delivered">🟢 Delivered (Done)</option>
                      <option value="cancelled">🔴 Cancelled</option>
                    </select>
                  </div>

                  <button
                    onClick={() => deleteOrder(ord.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Delete order record"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Customer Info Bar */}
              <div className="p-3 bg-gray-50 rounded-xl flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-bold text-gray-900 flex items-center gap-1.5">
                    👤 {ord.customerName}
                  </span>
                  {ord.customerPhone && (
                    <span className="text-gray-700 font-medium flex items-center gap-1">
                      <Phone className="w-3.5 h-3.5 text-gray-400" />
                      {ord.customerPhone}
                    </span>
                  )}
                  {ord.deliveryAddress && (
                    <span className="text-gray-700 font-medium flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
                      {ord.deliveryAddress}
                    </span>
                  )}
                </div>

                {/* Customer Contact CTAs */}
                <div className="flex items-center gap-2">
                  {ord.customerPhone && (
                    <>
                      <a
                        href={`tel:${ord.customerPhone}`}
                        className="px-2.5 py-1 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 text-[11px] font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-[#B91C1C]" />
                        <span>Call</span>
                      </a>
                      <button
                        onClick={() => openCustomerWhatsApp(ord)}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>WhatsApp Customer</span>
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Order Items Table */}
              <div className="space-y-1.5">
                {ord.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-gray-100 text-gray-900 font-black text-[11px] flex items-center justify-center">
                        {item.quantity}x
                      </span>
                      <span className="font-bold text-gray-900">{item.item.name}</span>
                      {item.selectedSize && (
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-medium">
                          {item.selectedSize.name}
                        </span>
                      )}
                      {item.selectedAddOns.length > 0 && (
                        <span className="text-[10px] text-gray-500 font-medium">
                          (+{item.selectedAddOns.map(a => a.name).join(', ')})
                        </span>
                      )}
                    </div>
                    <span className="font-mono font-bold text-gray-900">
                      Rs {item.itemTotal.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals & Quick Receipt Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-t border-gray-100">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-bold text-gray-400 uppercase">Grand Total:</span>
                  <span className="text-base font-black text-[#B91C1C] font-mono">
                    Rs {ord.grandTotal.toLocaleString()}
                  </span>
                  {ord.deliveryFee > 0 && (
                    <span className="text-[11px] text-gray-400 font-medium">
                      (Includes Rs {ord.deliveryFee} delivery fee)
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setInvoiceOrder(ord)}
                    className="px-3 py-1.5 rounded-xl bg-[#111827] hover:bg-[#B91C1C] text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
                    title="Print customer invoice or kitchen slip"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Invoice</span>
                  </button>

                  <button
                    onClick={() => copyReceipt(ord)}
                    className="px-3 py-1.5 rounded-xl border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    {copiedOrderId === ord.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-gray-400" />
                        <span>Copy Receipt</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Printable Invoice Modal */}
      <InvoiceModal
        order={invoiceOrder}
        isOpen={Boolean(invoiceOrder)}
        onClose={() => setInvoiceOrder(null)}
      />

    </div>
  );
};
