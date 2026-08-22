import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Navigation, 
  Copy, 
  Check, 
  Share2, 
  UtensilsCrossed, 
  HelpCircle, 
  ChevronDown,
  ChevronUp,
  ExternalLink
} from 'lucide-react';
import { RESTAURANT_INFO, RESTAURANT_FAQS } from '../data/restaurantData';

export const LocationSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [shared, setShared] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${RESTAURANT_INFO.name}, ${RESTAURANT_INFO.address}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Chohan's Fastfood Shikarpur",
        text: "Check out Chohan's Fastfood at Allah Wala Chowk, Shikarpur. Famous for Broast & Pizza!",
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent("Chohan's Fastfood Allah Wala Chowk Shikarpur Pakistan")}`;

  return (
    <section id="location" className="py-16 bg-[#f9fafb] border-b border-gray-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#B91C1C]" />
            <span>Visit Us or Order Delivery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Location, Contact & Kitchen Timings
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Conveniently situated at the heart of Shikarpur at Allah Wala Chowk.
          </p>
        </div>

        {/* Location & Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          
          {/* Left Column: Store Profile Card */}
          <div className="lg:col-span-6 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              
              {/* Header inside card */}
              <div className="border-b border-gray-100 pb-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold uppercase text-[#B91C1C] tracking-wider">
                    Store Profile
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    🟢 Open Today · 12:00 PM – 1:00 AM
                  </span>
                </div>
                <h3 className="text-2xl font-black text-gray-900 mt-1">
                  Chohan's Fastfood
                </h3>
                <p className="text-xs text-gray-500">
                  (Formerly known as Chohan's Food Club)
                </p>
              </div>

              {/* Info Rows */}
              <div className="space-y-4 text-sm">
                {/* Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 text-[#B91C1C] mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Address</span>
                    <p className="text-gray-900 font-bold leading-snug">
                      {RESTAURANT_INFO.address}
                    </p>
                    <p className="text-[11px] text-[#B91C1C] font-mono mt-0.5 font-bold">
                      Plus Code: {RESTAURANT_INFO.googlePlusCode}
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 text-[#B91C1C] mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Phone / WhatsApp Orders</span>
                    <a 
                      href={`tel:${RESTAURANT_INFO.phone}`}
                      className="text-gray-900 hover:text-[#B91C1C] font-black text-base transition-colors"
                    >
                      {RESTAURANT_INFO.phone}
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 text-[#B91C1C] mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Daily Operating Hours</span>
                    <p className="text-gray-900 font-bold">
                      Monday – Sunday: 12:00 PM – 1:00 AM Midnight
                    </p>
                  </div>
                </div>

                {/* Services & Facilities */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center shrink-0 text-[#B91C1C] mt-0.5">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-400 block font-medium">Available Services</span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {RESTAURANT_INFO.services.map((s, i) => (
                        <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-gray-100 border border-gray-200 text-gray-700 font-bold">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Quick Action Buttons */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all text-center cursor-pointer"
              >
                <Navigation className="w-3.5 h-3.5 shrink-0" />
                <span>Directions</span>
              </a>

              <button
                onClick={handleCopyAddress}
                className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase tracking-wider border border-gray-200 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Address'}</span>
              </button>

              <button
                onClick={handleShare}
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-white hover:bg-gray-50 text-gray-800 font-bold text-xs uppercase tracking-wider border border-gray-200 transition-all cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#B91C1C]" />
                <span>{shared ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

          </div>

          {/* Right Column: Visual Map Card & Delivery Coverage */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            
            {/* Visual Location Frame */}
            <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-gray-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#B91C1C]" />
                  Shikarpur City Center Map
                </span>
                <a 
                  href={googleMapsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs text-[#B91C1C] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Styled Interactive Visual Map View */}
              <div className="relative h-64 rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center group">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80"
                  alt="City Map Area Shikarpur"
                  className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                
                {/* Map Pin Pulse Point */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                  <div className="relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-red-500/20 animate-ping absolute" />
                    <div className="w-12 h-12 rounded-full bg-[#B91C1C] flex items-center justify-center shadow-2xl text-white font-black z-10 border-2 border-white">
                      <MapPin className="w-6 h-6" />
                    </div>
                  </div>
                  
                  <div className="mt-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl border border-gray-200 shadow-xl max-w-xs">
                    <p className="text-xs font-black text-gray-900">Chohan's Fastfood</p>
                    <p className="text-[11px] text-[#B91C1C] font-bold">Allah Wala Chowk, Shikarpur</p>
                  </div>
                </div>
              </div>

              {/* Delivery Coverage Areas */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold text-gray-800 block">
                  🚴 Rapid Delivery Coverage in Shikarpur (25-40 min):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {RESTAURANT_INFO.deliveryAreas.map((area, idx) => (
                    <span key={idx} className="text-[11px] px-2.5 py-1 rounded-full bg-gray-100 text-gray-700 font-bold border border-gray-200">
                      📍 {area}
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* FAQs Accordion */}
        <div className="max-w-3xl mx-auto bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <HelpCircle className="w-5 h-5 text-[#B91C1C]" />
            <h3 className="text-xl font-black text-gray-900">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-3">
            {RESTAURANT_FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 hover:bg-gray-100 transition-colors cursor-pointer"
                  >
                    <span className="text-sm font-bold text-gray-900">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#B91C1C] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-200 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
