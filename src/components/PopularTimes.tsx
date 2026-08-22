import React, { useState } from 'react';
import { Clock, Info } from 'lucide-react';
import { POPULAR_TIMES_DATA } from '../data/restaurantData';

export const PopularTimes: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>('Saturday');
  const slots = POPULAR_TIMES_DATA[selectedDay] || POPULAR_TIMES_DATA['Saturday'];

  return (
    <section id="popular-times" className="py-16 bg-white border-b border-gray-200 text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
              <Clock className="w-3.5 h-3.5 text-[#B91C1C]" />
              <span>Google Maps Live Insights</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 tracking-tight">
              Popular Times & Rush Hours
            </h2>
            <p className="text-gray-500 text-sm sm:text-base max-w-2xl">
              Plan your dine-in, takeaway, or home delivery to avoid peak rush. 
              Our kitchen operates continuously from <strong>12:00 PM to 1:00 AM</strong>.
            </p>
          </div>

          {/* Day Selector Tabs */}
          <div className="flex items-center gap-1 bg-gray-100 p-1.5 rounded-full border border-gray-200 shrink-0">
            {['Saturday', 'Sunday', 'Weekdays'].map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedDay === day
                    ? 'bg-[#111827] text-white shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Busyness Graph */}
        <div className="bg-[#f9fafb] rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B91C1C] animate-pulse" />
              <span className="text-xs font-black uppercase tracking-wider text-gray-900">
                Peak Hours: 8:00 PM – 11:00 PM (Most Active)
              </span>
            </div>
            <span className="text-xs text-gray-500 font-medium">
              Average wait time: 15–25 mins
            </span>
          </div>

          {/* Bar Chart Visualization */}
          <div className="grid grid-cols-9 gap-2 sm:gap-4 items-end h-48 pt-6 pb-2">
            {slots.map((slot, index) => {
              const isPeak = slot.busyness >= 85;
              const isModerate = slot.busyness >= 50 && slot.busyness < 85;

              return (
                <div key={index} className="flex flex-col items-center h-full justify-end group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-[#111827] text-white text-[10px] font-bold px-2 py-1 rounded-lg shadow-lg whitespace-nowrap pointer-events-none z-20">
                    {slot.hour}: {slot.label} ({slot.busyness}%)
                  </div>

                  {/* Vertical Bar */}
                  <div className="w-full max-w-[36px] bg-gray-200 rounded-t-lg overflow-hidden flex flex-col justify-end h-full">
                    <div
                      style={{ height: `${slot.busyness}%` }}
                      className={`w-full rounded-t-lg transition-all duration-500 ${
                        isPeak
                          ? 'bg-[#B91C1C]'
                          : isModerate
                          ? 'bg-orange-500'
                          : 'bg-gray-400'
                      }`}
                    />
                  </div>

                  {/* Hour Label */}
                  <span className={`text-[10px] sm:text-xs font-bold mt-2.5 ${
                    isPeak ? 'text-[#B91C1C]' : 'text-gray-500'
                  }`}>
                    {slot.hour}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Legend & Tips */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-gray-200 text-xs">
            <div className="flex items-center gap-4 text-gray-600 font-semibold">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#B91C1C] inline-block" />
                <span>Peak Rush (8pm-11pm)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-orange-500 inline-block" />
                <span>Moderate (6pm-8pm)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-gray-400 inline-block" />
                <span>Quick Service (12pm-5pm)</span>
              </div>
            </div>

            <div className="flex items-start gap-2 bg-white p-3 rounded-2xl border border-gray-200 text-gray-600 shadow-sm">
              <Info className="w-4 h-4 text-[#B91C1C] shrink-0 mt-0.5" />
              <p className="text-[11px] leading-relaxed">
                <strong>Local Tip:</strong> As seating at Allah Wala Chowk gets crowded on weekends & Eid, 
                we recommend ordering ahead on WhatsApp for fast car pickup or direct home delivery!
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
