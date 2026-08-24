import React, { useState, useMemo } from 'react';
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
  X,
  Filter,
  CalendarDays,
  ChevronRight,
  BarChart3,
  ListOrdered
} from 'lucide-react';
import { useMenu } from '../../context/MenuContext';
import { OrderRecord } from '../../types';
import { RESTAURANT_INFO } from '../../data/restaurantData';
import { InvoiceModal } from '../InvoiceModal';
import { DailySalesReportModal } from '../DailySalesReportModal';

type TimeframeOption = 'all' | 'today' | 'yesterday' | 'this_week' | 'this_month' | 'specific_date';
type ViewMode = 'detailed_orders' | 'daily_breakdown';

export const OwnerOrdersTab: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, clearAllOrders } = useMenu();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [timeframe, setTimeframe] = useState<TimeframeOption>('all');
  
  // Specific Date input (format: YYYY-MM-DD)
  const todayStr = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }, []);

  const [selectedDate, setSelectedDate] = useState<string>(todayStr);
  const [viewMode, setViewMode] = useState<ViewMode>('detailed_orders');
  
  const [copiedOrderId, setCopiedOrderId] = useState<string | null>(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [invoiceOrder, setInvoiceOrder] = useState<OrderRecord | null>(null);
  const [showDailyReportModal, setShowDailyReportModal] = useState(false);

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

  // Filter orders by Timeframe + Status + Search Query
  const timeframeOrders = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    return orders.filter(ord => {
      const orderDate = new Date(ord.createdAt);
      if (isNaN(orderDate.getTime())) return true;

      if (timeframe === 'today') {
        return isSameDay(orderDate, today);
      }
      if (timeframe === 'yesterday') {
        return isSameDay(orderDate, yesterday);
      }
      if (timeframe === 'this_week') {
        return orderDate >= sevenDaysAgo;
      }
      if (timeframe === 'this_month') {
        return orderDate >= firstDayOfMonth;
      }
      if (timeframe === 'specific_date') {
        if (!selectedDate) return true;
        const ordKey = getLocalDateKey(orderDate);
        return ordKey === selectedDate;
      }
      return true; // 'all'
    });
  }, [orders, timeframe, selectedDate]);

  // Apply Status and Text Search
  const filteredOrders = useMemo(() => {
    return timeframeOrders.filter(ord => {
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
  }, [timeframeOrders, statusFilter, searchQuery]);

  // Aggregated Daily Sales Breakdown (Day by Day)
  const dailyBreakdown = useMemo(() => {
    const map: { 
      [dateKey: string]: { 
        dateKey: string; 
        dateObj: Date; 
        orders: OrderRecord[]; 
        totalSales: number; 
        validCount: number; 
        cancelledCount: number;
        deliveryCount: number;
        takeawayCount: number;
      } 
    } = {};

    orders.forEach(ord => {
      const d = new Date(ord.createdAt);
      const key = !isNaN(d.getTime()) ? getLocalDateKey(d) : 'Unknown';
      
      if (!map[key]) {
        map[key] = {
          dateKey: key,
          dateObj: !isNaN(d.getTime()) ? d : new Date(),
          orders: [],
          totalSales: 0,
          validCount: 0,
          cancelledCount: 0,
          deliveryCount: 0,
          takeawayCount: 0,
        };
      }

      map[key].orders.push(ord);
      if (ord.status !== 'cancelled') {
        map[key].totalSales += ord.grandTotal;
        map[key].validCount += 1;
        if (ord.orderType === 'delivery') map[key].deliveryCount += 1;
        else map[key].takeawayCount += 1;
      } else {
        map[key].cancelledCount += 1;
      }
    });

    // Sort newest date first
    return Object.values(map).sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  }, [orders]);

  // Current Timeframe Analytics Metrics
  const timeframeValidOrders = timeframeOrders.filter(o => o.status !== 'cancelled');
  const timeframeRevenue = timeframeValidOrders.reduce((sum, o) => sum + o.grandTotal, 0);
  const activeOrdersCount = timeframeOrders.filter(o => o.status === 'pending' || o.status === 'preparing' || o.status === 'on_the_way').length;
  const deliveredCount = timeframeOrders.filter(o => o.status === 'delivered').length;
  const avgOrderValue = timeframeValidOrders.length > 0 ? Math.round(timeframeRevenue / timeframeValidOrders.length) : 0;

  // Label for current timeframe
  const timeframeLabel = useMemo(() => {
    switch (timeframe) {
      case 'today':
        return 'Today (' + new Date().toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' }) + ')';
      case 'yesterday': {
        const y = new Date();
        y.setDate(y.getDate() - 1);
        return 'Yesterday (' + y.toLocaleDateString('en-PK', { month: 'short', day: 'numeric', year: 'numeric' }) + ')';
      }
      case 'this_week':
        return 'Last 7 Days (This Week)';
      case 'this_month': {
        const m = new Date();
        return 'This Month (' + m.toLocaleDateString('en-PK', { month: 'long', year: 'numeric' }) + ')';
      }
      case 'specific_date': {
        if (!selectedDate) return 'Specific Date';
        try {
          const parts = selectedDate.split('-');
          const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
          return d.toLocaleDateString('en-PK', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
        } catch {
          return selectedDate;
        }
      }
      default:
        return 'All Time History';
    }
  }, [timeframe, selectedDate]);

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
      
      {/* Top Banner & Quick Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 bg-white p-5 rounded-3xl border border-gray-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <CalendarDays className="w-5 h-5 text-[#B91C1C]" />
            <h3 className="text-base font-black text-gray-900 uppercase tracking-wide">
              Sales History & Daily Audit
            </h3>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Track daily revenue, analyze weekly/monthly orders, and check records for any specific date.
          </p>
        </div>

        {/* View Mode Switcher + Print Daily Summary */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="bg-gray-100 p-1 rounded-2xl flex items-center gap-1 border border-gray-200">
            <button
              onClick={() => setViewMode('detailed_orders')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'detailed_orders'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Orders List ({timeframeOrders.length})</span>
            </button>

            <button
              onClick={() => setViewMode('daily_breakdown')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'daily_breakdown'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>Daily Sales Breakdown ({dailyBreakdown.length} days)</span>
            </button>
          </div>

          <button
            onClick={() => setShowDailyReportModal(true)}
            className="px-3.5 py-2 rounded-xl bg-[#111827] hover:bg-[#B91C1C] text-white text-xs font-black flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Sales Summary</span>
          </button>
        </div>
      </div>

      {/* Date & Timeframe Filter Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-gray-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-[#B91C1C]" />
            Select Sales Timeframe:
          </span>

          <span className="text-xs font-bold text-gray-700 bg-gray-100 px-3 py-1 rounded-full">
            Active: <strong className="text-[#B91C1C]">{timeframeLabel}</strong>
          </span>
        </div>

        {/* Quick Timeframe Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setTimeframe('all')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              timeframe === 'all'
                ? 'bg-[#111827] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Time ({orders.length})
          </button>

          <button
            onClick={() => setTimeframe('today')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              timeframe === 'today'
                ? 'bg-[#B91C1C] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <span>Today's Sales</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-black/20 font-bold">
              {orders.filter(o => isSameDay(new Date(o.createdAt), new Date())).length}
            </span>
          </button>

          <button
            onClick={() => setTimeframe('yesterday')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              timeframe === 'yesterday'
                ? 'bg-[#111827] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Yesterday
          </button>

          <button
            onClick={() => setTimeframe('this_week')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              timeframe === 'this_week'
                ? 'bg-[#111827] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Week (7 Days)
          </button>

          <button
            onClick={() => setTimeframe('this_month')}
            className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
              timeframe === 'this_month'
                ? 'bg-[#111827] text-white shadow-sm'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            This Month
          </button>

          {/* Specific Date Picker Selector */}
          <div className="flex items-center gap-2 bg-amber-50 p-1.5 px-3 rounded-2xl border border-amber-200">
            <span className="text-xs font-bold text-amber-900 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-amber-700" />
              Check Specific Date:
            </span>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => {
                setSelectedDate(e.target.value);
                setTimeframe('specific_date');
              }}
              className="bg-white border border-amber-300 rounded-xl px-2.5 py-1 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#B91C1C]"
            />
            {timeframe === 'specific_date' && (
              <span className="text-[11px] font-black text-amber-900 bg-amber-200 px-2 py-0.5 rounded-full">
                Active Filter
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic KPI Sales Overview Cards for the Selected Timeframe */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">
              Sales for {timeframe === 'today' ? 'Today' : timeframe === 'yesterday' ? 'Yesterday' : timeframe === 'this_week' ? 'This Week' : timeframe === 'this_month' ? 'This Month' : timeframe === 'specific_date' ? 'Selected Date' : 'All Time'}
            </p>
            <h3 className="text-2xl font-black text-[#B91C1C] font-mono mt-1">
              Rs {timeframeRevenue.toLocaleString()}
            </h3>
            <p className="text-[11px] text-emerald-600 font-bold mt-0.5">
              {timeframeValidOrders.length} valid orders
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#B91C1C] flex items-center justify-center font-bold">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">Total Orders</p>
            <h3 className="text-2xl font-black text-gray-900 font-mono mt-1">
              {timeframeOrders.length}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              {deliveredCount} delivered · {activeOrdersCount} in progress
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Check className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">Avg. Order Value</p>
            <h3 className="text-2xl font-black text-gray-900 font-mono mt-1">
              Rs {avgOrderValue.toLocaleString()}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium mt-0.5">
              Per customer order
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-[11px] font-black uppercase tracking-wider text-gray-400">Delivery vs Takeaway</p>
            <div className="flex items-center gap-3 mt-1.5 text-xs font-bold text-gray-800">
              <span className="flex items-center gap-1 text-[#B91C1C]">
                <Bike className="w-4 h-4" /> {timeframeOrders.filter(o => o.orderType === 'delivery').length}
              </span>
              <span className="flex items-center gap-1 text-emerald-700">
                <Store className="w-4 h-4" /> {timeframeOrders.filter(o => o.orderType !== 'delivery').length}
              </span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium mt-0.5">
              In selected period
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
            <Clock className="w-6 h-6" />
          </div>
        </div>

      </div>

      {/* VIEW MODE 1: DAILY SALES BREAKDOWN TABLE (Day by Day) */}
      {viewMode === 'daily_breakdown' ? (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 flex-wrap gap-2">
            <div>
              <h4 className="font-black text-gray-900 text-sm uppercase tracking-wide">
                Day-by-Day Sales Calendar & Audit Table
              </h4>
              <p className="text-xs text-gray-500">
                Summary of daily sales, orders count, and takeaway vs delivery for every business day.
              </p>
            </div>
            <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              {dailyBreakdown.length} Total Recorded Days
            </span>
          </div>

          {dailyBreakdown.length === 0 ? (
            <div className="p-8 text-center text-gray-400 text-xs font-bold">
              No orders recorded yet to calculate daily breakdown.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-400 text-[10px] font-black uppercase tracking-wider">
                    <th className="pb-3 pl-2">Date / Day</th>
                    <th className="pb-3 text-center">Orders Count</th>
                    <th className="pb-3 text-center">Home Delivery</th>
                    <th className="pb-3 text-center">Counter Takeaway</th>
                    <th className="pb-3 text-right">Daily Sales (PKR)</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {dailyBreakdown.map((row) => {
                    const isToday = isSameDay(row.dateObj, new Date());
                    const formattedDate = row.dateObj.toLocaleDateString('en-PK', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });

                    return (
                      <tr key={row.dateKey} className={`hover:bg-gray-50/80 transition-colors ${isToday ? 'bg-amber-50/50' : ''}`}>
                        <td className="py-3.5 pl-2">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-gray-900 text-sm">
                              {formattedDate}
                            </span>
                            {isToday && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                                Today
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 text-center font-bold text-gray-700">
                          <span className="px-2.5 py-1 bg-gray-100 rounded-lg text-xs">
                            {row.validCount} {row.validCount === 1 ? 'order' : 'orders'}
                          </span>
                          {row.cancelledCount > 0 && (
                            <span className="ml-1.5 text-[10px] text-rose-500">
                              ({row.cancelledCount} cancelled)
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 text-center font-semibold text-gray-600">
                          <span className="inline-flex items-center gap-1 text-[#B91C1C]">
                            <Bike className="w-3 h-3" /> {row.deliveryCount}
                          </span>
                        </td>

                        <td className="py-3.5 text-center font-semibold text-gray-600">
                          <span className="inline-flex items-center gap-1 text-emerald-700">
                            <Store className="w-3 h-3" /> {row.takeawayCount}
                          </span>
                        </td>

                        <td className="py-3.5 text-right font-mono font-black text-gray-900 text-sm">
                          Rs {row.totalSales.toLocaleString()}
                        </td>

                        <td className="py-3.5 text-right pr-2">
                          <button
                            onClick={() => {
                              setSelectedDate(row.dateKey);
                              setTimeframe('specific_date');
                              setViewMode('detailed_orders');
                            }}
                            className="px-3 py-1.5 bg-gray-900 hover:bg-[#B91C1C] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer inline-flex items-center gap-1"
                          >
                            <span>Inspect Day</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : null}

      {/* VIEW MODE 2: DETAILED ORDERS LIST */}
      {viewMode === 'detailed_orders' && (
        <>
          {/* Search & Status Filter Toolbar */}
          <div className="bg-white p-4 rounded-3xl border border-gray-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
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
                <option value="all">All Statuses ({timeframeOrders.length})</option>
                <option value="pending">Pending ({timeframeOrders.filter(o => o.status === 'pending').length})</option>
                <option value="preparing">Preparing ({timeframeOrders.filter(o => o.status === 'preparing').length})</option>
                <option value="on_the_way">On The Way ({timeframeOrders.filter(o => o.status === 'on_the_way').length})</option>
                <option value="delivered">Delivered ({timeframeOrders.filter(o => o.status === 'delivered').length})</option>
                <option value="cancelled">Cancelled ({timeframeOrders.filter(o => o.status === 'cancelled').length})</option>
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

          {/* Orders List Container */}
          {timeframeOrders.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-gray-200 space-y-3">
              <div className="w-14 h-14 rounded-full bg-gray-100 text-gray-400 mx-auto flex items-center justify-center">
                <FileText className="w-7 h-7" />
              </div>
              <h4 className="text-base font-black text-gray-900">No Orders Found for {timeframeLabel}</h4>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                There are no recorded orders for this selected timeframe. Choose another date or timeframe option above.
              </p>
              {timeframe !== 'all' && (
                <button
                  onClick={() => setTimeframe('all')}
                  className="px-4 py-2 rounded-xl bg-gray-900 hover:bg-[#B91C1C] text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  View All Orders History
                </button>
              )}
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="bg-white p-8 text-center rounded-2xl border border-gray-200">
              <p className="text-xs font-bold text-gray-500">No orders match your search and status filter criteria.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="bg-white rounded-3xl border border-gray-200 p-5 shadow-sm space-y-4 hover:border-gray-300 transition-all"
                >
                  {/* Header row: Order ID, Type, Date, Status Selector */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gray-100 flex items-center justify-center font-black">
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
                  <div className="p-3 bg-gray-50 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
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
                            className="px-2.5 py-1 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-800 text-[11px] font-bold flex items-center gap-1"
                          >
                            <Phone className="w-3 h-3 text-[#B91C1C]" />
                            <span>Call</span>
                          </a>
                          <button
                            onClick={() => openCustomerWhatsApp(ord)}
                            className="px-2.5 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold flex items-center gap-1 cursor-pointer"
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
        </>
      )}

      {/* Printable Invoice Modal */}
      <InvoiceModal
        order={invoiceOrder}
        isOpen={Boolean(invoiceOrder)}
        onClose={() => setInvoiceOrder(null)}
      />

      {/* Printable Daily & Timeframe Sales Summary Report */}
      <DailySalesReportModal
        isOpen={showDailyReportModal}
        onClose={() => setShowDailyReportModal(false)}
        orders={timeframeOrders}
        timeframeLabel={timeframeLabel}
        selectedDate={selectedDate}
      />

    </div>
  );
};
