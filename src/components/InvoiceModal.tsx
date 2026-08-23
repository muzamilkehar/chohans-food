import React, { useRef, useState } from 'react';
import { 
  Printer, 
  X, 
  Download, 
  Check, 
  FileText, 
  Bike, 
  Store, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Receipt,
  Share2,
  Copy
} from 'lucide-react';
import { OrderRecord } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface InvoiceModalProps {
  order: OrderRecord | null;
  isOpen: boolean;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  const [printFormat, setPrintFormat] = useState<'thermal' | 'standard'>('thermal');
  const [isCopied, setIsCopied] = useState(false);

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    if (order.receiptText) {
      navigator.clipboard.writeText(order.receiptText);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('en-PK', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
    } catch {
      return isoString;
    }
  };

  return (
    <>
      {/* Print CSS to isolate and format the invoice when window.print() is called */}
      <style>{`
        @media print {
          body * {
            visibility: hidden !important;
          }
          #printable-invoice-container, #printable-invoice-container * {
            visibility: visible !important;
          }
          #printable-invoice-container {
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
            margin: 5mm;
            size: auto;
          }
        }
      `}</style>

      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 no-print animate-in fade-in duration-200">
        <div className="bg-gray-100 w-full max-w-2xl rounded-3xl shadow-2xl border border-gray-300 flex flex-col max-h-[92vh] overflow-hidden">
          
          {/* Modal Header */}
          <div className="p-4 sm:p-5 bg-[#111827] text-white flex items-center justify-between border-b border-gray-800 shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#B91C1C] flex items-center justify-center text-white shadow-md">
                <Printer className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-black tracking-tight text-white flex items-center gap-2">
                  <span>Customer Invoice & Kitchen Slip</span>
                  <span className="text-[11px] font-bold bg-white/20 text-white px-2 py-0.5 rounded-full font-mono">
                    #{order.orderNumber}
                  </span>
                </h3>
                <p className="text-xs text-gray-400">
                  Ready to print for customer delivery, counter slip, or records.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-gray-300 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Bar (Format Switcher & Print Trigger) */}
          <div className="p-3 bg-white border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
            <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setPrintFormat('thermal')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  printFormat === 'thermal'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                POS Thermal Slip (80mm)
              </button>
              <button
                onClick={() => setPrintFormat('standard')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  printFormat === 'standard'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Standard Bill (A4 / Full)
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyText}
                className="px-3 py-1.5 rounded-xl border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-gray-500" />}
                <span>{isCopied ? 'Copied' : 'Copy Text'}</span>
              </button>

              <button
                onClick={handlePrint}
                className="px-4 py-1.5 rounded-xl bg-[#B91C1C] hover:bg-red-700 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-red-900/20 transition-all cursor-pointer active:scale-95"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Invoice Now</span>
              </button>
            </div>
          </div>

          {/* Invoice Document Preview Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-200/70 flex justify-center">
            
            {/* Printable Area with ID targeting */}
            <div 
              id="printable-invoice-container"
              className={`bg-white text-black transition-all ${
                printFormat === 'thermal' 
                  ? 'w-full max-w-[380px] p-5 rounded-2xl shadow-md border border-gray-300 font-sans' 
                  : 'w-full max-w-xl p-8 rounded-2xl shadow-md border border-gray-300 font-sans'
              }`}
            >
              {/* Brand Header */}
              <div className="text-center pb-4 border-b-2 border-dashed border-gray-300 space-y-1">
                <div className="inline-block px-3 py-1 bg-black text-white text-[11px] font-black tracking-widest uppercase rounded">
                  OFFICIAL INVOICE
                </div>
                <h1 className="text-xl font-black tracking-tight text-gray-900 uppercase pt-1">
                  {RESTAURANT_INFO.name}
                </h1>
                <p className="text-[11px] font-bold text-gray-600">
                  {RESTAURANT_INFO.formerName} · {RESTAURANT_INFO.tagline}
                </p>
                <p className="text-[11px] text-gray-500">
                  📍 {RESTAURANT_INFO.address}
                </p>
                <p className="text-[11px] font-black text-gray-900">
                  📞 Ph: {RESTAURANT_INFO.phone} · WA: {RESTAURANT_INFO.whatsappNumber}
                </p>
              </div>

              {/* Order Metadata Strip */}
              <div className="py-3 border-b border-dashed border-gray-300 space-y-1.5 text-xs">
                <div className="flex justify-between items-center font-bold">
                  <span className="text-gray-500 uppercase tracking-wider text-[10px]">Order No:</span>
                  <span className="font-mono text-sm font-black bg-gray-100 px-2 py-0.5 rounded">
                    #{order.orderNumber}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[11px]">Date & Time:</span>
                  <span className="font-medium text-gray-800 text-[11px]">
                    {formatDate(order.createdAt)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[11px]">Order Type:</span>
                  <span className="font-black text-gray-900 uppercase text-[11px] flex items-center gap-1">
                    {order.orderType === 'delivery' ? '🛵 Home Delivery' : '🏪 Dine-in / Takeaway'}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-[11px]">Payment Mode:</span>
                  <span className="font-bold text-emerald-800 text-[11px]">
                    Cash on Delivery (COD)
                  </span>
                </div>
              </div>

              {/* Customer Information Block */}
              <div className="py-3 border-b border-dashed border-gray-300 bg-gray-50/80 -mx-5 px-5 my-1 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-500 font-medium">Customer:</span>
                  <span className="font-black text-gray-900">{order.customerName}</span>
                </div>

                {order.customerPhone && (
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Phone / WA:</span>
                    <span className="font-bold text-gray-900">{order.customerPhone}</span>
                  </div>
                )}

                {order.deliveryAddress && (
                  <div className="pt-1">
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Delivery Address:</span>
                    <p className="font-bold text-gray-900 text-xs mt-0.5 leading-snug">
                      {order.deliveryAddress}
                    </p>
                  </div>
                )}

                {order.specialInstructions && (
                  <div className="pt-1">
                    <span className="text-gray-500 block text-[10px] uppercase font-bold">Special Notes:</span>
                    <p className="italic text-gray-700 text-xs mt-0.5">
                      "{order.specialInstructions}"
                    </p>
                  </div>
                )}
              </div>

              {/* Itemized Order Table */}
              <div className="py-3 border-b-2 border-dashed border-gray-300">
                <div className="flex justify-between text-[11px] font-black uppercase text-gray-500 pb-1.5 border-b border-gray-200">
                  <span>Item & Description</span>
                  <span className="text-right">Price (PKR)</span>
                </div>

                <div className="divide-y divide-gray-100 py-1">
                  {order.items.map((cartItem, idx) => (
                    <div key={idx} className="py-2 text-xs flex justify-between items-start gap-2">
                      <div className="space-y-0.5">
                        <div className="font-black text-gray-900 flex items-baseline gap-1.5">
                          <span className="font-mono text-[11px] bg-gray-200 px-1 rounded font-bold">
                            {cartItem.quantity}x
                          </span>
                          <span>{cartItem.item.name}</span>
                        </div>

                        {cartItem.selectedSize && (
                          <p className="text-[11px] text-gray-600 pl-6">
                            Size: <span className="font-semibold">{cartItem.selectedSize.name}</span>
                          </p>
                        )}

                        {cartItem.selectedAddOns && cartItem.selectedAddOns.length > 0 && (
                          <p className="text-[10px] text-gray-500 pl-6">
                            Add-ons: {cartItem.selectedAddOns.map(a => `${a.name} (+Rs ${a.price})`).join(', ')}
                          </p>
                        )}
                      </div>

                      <div className="text-right font-mono font-black text-gray-900 text-xs shrink-0 pt-0.5">
                        Rs {cartItem.itemTotal.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Financial Calculation */}
              <div className="py-3 border-b-2 border-dashed border-gray-300 space-y-1 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({order.items.reduce((s, i) => s + i.quantity, 0)} items):</span>
                  <span className="font-mono font-bold">Rs {order.subtotal.toLocaleString()}</span>
                </div>

                {order.deliveryFee > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Charges:</span>
                    <span className="font-mono font-bold">Rs {order.deliveryFee.toLocaleString()}</span>
                  </div>
                )}

                <div className="flex justify-between items-baseline pt-2 text-base font-black text-gray-900 border-t border-gray-200">
                  <span className="uppercase text-sm">Grand Total:</span>
                  <span className="font-mono text-lg font-black text-[#B91C1C]">
                    Rs {order.grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Footer Note & Barcode / Token Visual */}
              <div className="text-center pt-4 space-y-2 text-[11px] text-gray-600">
                <p className="font-black text-gray-900">
                  Thank you for ordering with Chohan's Food Club!
                </p>
                <p className="text-[10px] text-gray-500">
                  For support or inquiries, please call {RESTAURANT_INFO.phone}
                </p>
                <div className="pt-1 text-[9px] font-mono text-gray-400">
                  * Customer Copy / Kitchen Token *
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>
    </>
  );
};
