import React from 'react';
import { 
  Printer, 
  X, 
  Calendar, 
  DollarSign, 
  ShoppingBag, 
  Bike, 
  Store, 
  TrendingUp,
  FileText,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { OrderRecord } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface DailySalesReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderRecord[];
  timeframeLabel: string;
  selectedDate?: string;
}

export const DailySalesReportModal: React.FC<DailySalesReportModalProps> = ({
  isOpen,
  onClose,
  orders,
  timeframeLabel,
  selectedDate
}) => {
  if (!isOpen) return null;

  const validOrders = orders.filter(o => o.status !== 'cancelled');
  const totalRevenue = validOrders.reduce((sum, o) => sum + o.grandTotal, 0);
  const totalDeliveryFees = validOrders.reduce((sum, o) => sum + (o.deliveryFee || 0), 0);
  const foodSales = totalRevenue - totalDeliveryFees;
  const deliveryOrdersCount = validOrders.filter(o => o.orderType === 'delivery').length;
  const takeawayOrdersCount = validOrders.filter(o => o.orderType !== 'delivery').length;
  const totalItemsSold = validOrders.reduce((sum, o) => sum + o.items.reduce((s, i) => s + i.quantity, 0), 0);

  // Group items sold across all orders in this timeframe
  const itemCounts: { [name: string]: { qty: number; total: number } } = {};
  validOrders.forEach(ord => {
    ord.items.forEach(it => {
      const key = it.selectedSize ? `${it.item.name} (${it.selectedSize.name})` : it.item.name;
      if (!itemCounts[key]) {
        itemCounts[key] = { qty: 0, total: 0 };
      }
      itemCounts[key].qty += it.quantity;
      itemCounts[key].total += it.itemTotal;
    });
  });

  const sortedItems = Object.entries(itemCounts).sort((a, b) => b[1].qty - a[1].qty);

  const handlePrint = () => {
    window.print();
  };

  const currentDateFormatted = new Date().toLocaleDateString('en-PK', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <>
      {/* Media print formatting */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-sales-report, #printable-sales-report * {
            visibility: visible !important;
          }
          #printable-sales-report {
            position: absolute !important;
            left: 0 !important;
            top: 0 !important;
            width: 100% !important;
            margin: 0 !important;
            padding: 10mm !important;
            background: white !important;
            color: black !important;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
          @page {
            margin: 8mm;
            size: auto;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 no-print animate-in fade-in duration-200">
        <div className="bg-gray-100 w-full max-w-3xl rounded-3xl shadow-2xl border border-gray-300 flex flex-col max-h-[92vh] overflow-hidden">
          
          {/* Header */}
          <div className="p-4 sm:p-5 bg-[#111827] text-white flex items-center justify-between border-b border-gray-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#B91C1C] flex items-center justify-center text-white shadow-md">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                  <span>Sales & Daily Revenue Summary</span>
                  <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full">
                    {timeframeLabel}
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  Comprehensive audit of daily orders, food totals, and kitchen counter summary.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-xl bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-900/20 transition-all cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Report</span>
              </button>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Printable Report Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-200/70 flex justify-center">
            
            <div 
              id="printable-sales-report"
              className="bg-white text-black w-full max-w-2xl p-6 sm:p-8 rounded-2xl shadow-md border border-gray-300 space-y-5 font-sans"
            >
              {/* Restaurant Header */}
              <div className="text-center pb-4 border-b-2 border-dashed border-gray-300 space-y-1">
                <div className="inline-block px-3 py-0.5 bg-black text-white text-[10px] font-black tracking-widest uppercase rounded">
                  DAILY SALES & AUDIT REPORT
                </div>
                <h1 className="text-2xl font-black tracking-tight text-gray-900 uppercase pt-1">
                  {RESTAURANT_INFO.name}
                </h1>
                <p className="text-xs font-bold text-gray-600">
                  {RESTAURANT_INFO.formerName} · {RESTAURANT_INFO.address}
                </p>
                <p className="text-[11px] font-semibold text-gray-500">
                  Phone: {RESTAURANT_INFO.phone} · WhatsApp: {RESTAURANT_INFO.whatsappNumber}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-gray-700 font-bold">
                  <span className="bg-gray-100 px-2.5 py-1 rounded">Period: {timeframeLabel}</span>
                  <span className="bg-gray-100 px-2.5 py-1 rounded">Generated: {currentDateFormatted}</span>
                </div>
              </div>

              {/* Financial KPI Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-1">
                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-500">Total Sales (PKR)</p>
                  <p className="text-lg font-black text-[#B91C1C] font-mono mt-0.5">
                    Rs {totalRevenue.toLocaleString()}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-500">Orders Count</p>
                  <p className="text-lg font-black text-gray-900 font-mono mt-0.5">
                    {validOrders.length}
                  </p>
                  {orders.some(o => o.status === 'cancelled') && (
                    <p className="text-[9px] text-rose-600 font-bold">
                      +{orders.filter(o => o.status === 'cancelled').length} cancelled
                    </p>
                  )}
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-500">Avg. Order Value</p>
                  <p className="text-lg font-black text-gray-900 font-mono mt-0.5">
                    Rs {validOrders.length > 0 ? Math.round(totalRevenue / validOrders.length).toLocaleString() : 0}
                  </p>
                </div>

                <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-center">
                  <p className="text-[10px] uppercase font-bold text-gray-500">Total Items Sold</p>
                  <p className="text-lg font-black text-gray-900 font-mono mt-0.5">
                    {totalItemsSold}
                  </p>
                </div>
              </div>

              {/* Order Channel Breakdown */}
              <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl flex items-center justify-around text-xs font-bold text-gray-700">
                <div className="flex items-center gap-2">
                  <Bike className="w-4 h-4 text-[#B91C1C]" />
                  <span>Delivery Orders: {deliveryOrdersCount}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div className="flex items-center gap-2">
                  <Store className="w-4 h-4 text-emerald-700" />
                  <span>Takeaway / Dine-in: {takeawayOrdersCount}</span>
                </div>
                <div className="h-4 w-px bg-gray-300"></div>
                <div>
                  <span>Food Sales: Rs {foodSales.toLocaleString()}</span>
                </div>
              </div>

              {/* Top Selling Items in This Period */}
              {sortedItems.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 pb-1 border-b border-gray-200">
                    Dishes & Items Sold in This Period ({sortedItems.length} unique items)
                  </h4>
                  <div className="divide-y divide-gray-100 text-xs">
                    {sortedItems.slice(0, 10).map(([name, data], idx) => (
                      <div key={idx} className="py-1.5 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="w-4 text-[10px] font-mono text-gray-400">{idx + 1}.</span>
                          <span className="font-bold text-gray-900">{name}</span>
                          <span className="text-[10px] bg-gray-100 px-1.5 py-0.2 rounded font-mono font-bold text-gray-700">
                            {data.qty}x sold
                          </span>
                        </div>
                        <span className="font-mono font-bold text-gray-900">
                          Rs {data.total.toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Orders List Table */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-black uppercase tracking-wider text-gray-900 pb-1 border-b border-gray-200">
                  Detailed Orders Log ({validOrders.length} Orders)
                </h4>
                
                {validOrders.length === 0 ? (
                  <p className="text-xs text-gray-500 italic py-2">No orders recorded in this timeframe.</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b border-gray-200 text-gray-500 text-[10px] uppercase font-black">
                          <th className="pb-1.5">Order #</th>
                          <th className="pb-1.5">Time</th>
                          <th className="pb-1.5">Customer</th>
                          <th className="pb-1.5">Type</th>
                          <th className="pb-1.5">Items</th>
                          <th className="pb-1.5 text-right">Amount (PKR)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {validOrders.map((ord) => (
                          <tr key={ord.id} className="py-1.5">
                            <td className="py-1.5 font-mono font-black text-gray-900">
                              #{ord.orderNumber}
                            </td>
                            <td className="py-1.5 text-gray-600 text-[11px]">
                              {new Date(ord.createdAt).toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', hour12: true })}
                            </td>
                            <td className="py-1.5 font-medium text-gray-800">
                              {ord.customerName}
                            </td>
                            <td className="py-1.5 text-[11px] capitalize font-bold text-gray-700">
                              {ord.orderType === 'delivery' ? 'Delivery' : 'Takeaway'}
                            </td>
                            <td className="py-1.5 text-gray-600 text-[11px]">
                              {ord.items.map(i => `${i.quantity}x ${i.item.name}`).join(', ')}
                            </td>
                            <td className="py-1.5 font-mono font-black text-right text-gray-900">
                              Rs {ord.grandTotal.toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Signatures / Notes Footer */}
              <div className="pt-6 border-t-2 border-dashed border-gray-300 grid grid-cols-2 gap-6 text-[11px] text-gray-600">
                <div>
                  <p className="font-bold">Prepared by: Manager / Cashier</p>
                  <div className="mt-6 border-b border-gray-300 w-36"></div>
                  <p className="text-[10px] text-gray-400 mt-1">Signature</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">Chohan's Fastfood Audit</p>
                  <p className="text-[10px] text-gray-400 mt-1">Daily Counter Sales Record</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
