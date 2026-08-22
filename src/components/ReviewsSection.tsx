import React, { useState } from 'react';
import { 
  Star, 
  ThumbsUp, 
  CheckCircle, 
  Filter, 
  ExternalLink,
  Plus,
  X
} from 'lucide-react';
import { REVIEWS_DATA } from '../data/restaurantData';
import { Review } from '../types';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [activeFilter, setActiveFilter] = useState<'all' | 5 | 4 | 'broast' | 'pizza'>('all');
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [likedReviews, setLikedReviews] = useState<Record<string, number>>({});
  
  // Review form states
  const [authorName, setAuthorName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [tag, setTag] = useState('Chicken Broast');
  const [showToast, setShowToast] = useState(false);

  const filteredReviews = reviews.filter((rev) => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 5) return rev.rating === 5;
    if (activeFilter === 4) return rev.rating === 4;
    if (activeFilter === 'broast') {
      return (rev.tags && rev.tags.some(t => t.toLowerCase().includes('broast'))) || rev.comment.toLowerCase().includes('broast');
    }
    if (activeFilter === 'pizza') {
      return (rev.tags && rev.tags.some(t => t.toLowerCase().includes('pizza'))) || rev.comment.toLowerCase().includes('pizza');
    }
    return true;
  });

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !comment.trim()) return;

    const newRev: Review = {
      id: `user-rev-${Date.now()}`,
      author: authorName.trim(),
      role: 'Verified Local Diner',
      rating,
      date: 'Just now',
      comment: comment.trim(),
      tags: [tag || 'Fastfood Fan'],
      avatarBg: 'bg-[#B91C1C]'
    };

    setReviews([newRev, ...reviews]);
    setIsWriteModalOpen(false);
    setAuthorName('');
    setComment('');
    setRating(5);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleLike = (id: string) => {
    setLikedReviews(prev => ({
      ...prev,
      [id]: (prev[id] || 0) + 1
    }));
  };

  return (
    <section id="reviews" className="py-16 bg-[#f9fafb] border-b border-gray-200 text-left relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 border border-orange-200 text-orange-800 text-xs font-bold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500" />
            <span>Customer Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Google Reviews & Local Foodie Ratings
          </h2>
          <p className="text-gray-500 text-sm sm:text-base">
            Rated <strong>4.0 Stars across 294+ Google Reviews</strong> from local families and travelers in Shikarpur.
          </p>
        </div>

        {/* Rating Breakdown Dashboard Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm mb-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Big Score Column */}
            <div className="md:col-span-4 text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r border-gray-100 pb-6 md:pb-0 md:pr-8">
              <div className="flex items-baseline justify-center md:justify-start gap-2">
                <span className="text-5xl sm:text-6xl font-black text-gray-900">4.0</span>
                <span className="text-gray-400 font-bold text-lg">/ 5.0</span>
              </div>
              <div className="flex justify-center md:justify-start text-yellow-400 text-xl">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-300">★</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                Based on 294 verified reviews on Google Maps
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsWriteModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer inline-flex items-center justify-center gap-2"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write a Review</span>
                </button>
              </div>
            </div>

            {/* Rating Bars Distribution */}
            <div className="md:col-span-8 space-y-2 text-xs">
              {[
                { stars: '5 Stars', percent: 62, count: '182 reviews' },
                { stars: '4 Stars', percent: 24, count: '70 reviews' },
                { stars: '3 Stars', percent: 8, count: '24 reviews' },
                { stars: '2 Stars', percent: 4, count: '11 reviews' },
                { stars: '1 Star', percent: 2, count: '7 reviews' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-16 font-bold text-gray-600 shrink-0 text-right">{row.stars}</span>
                  <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${row.percent}%` }}
                      className={`h-full rounded-full ${
                        idx === 0 ? 'bg-[#B91C1C]' : idx === 1 ? 'bg-orange-500' : 'bg-yellow-400'
                      }`}
                    />
                  </div>
                  <span className="w-24 text-[11px] text-gray-400 font-medium shrink-0">{row.count}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter by:
            </span>
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'all'
                  ? 'bg-[#111827] text-white shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              All Reviews
            </button>
            <button
              onClick={() => setActiveFilter(5)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 5
                  ? 'bg-yellow-400 text-neutral-950 shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              5 ★ Top Rated
            </button>
            <button
              onClick={() => setActiveFilter('broast')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'broast'
                  ? 'bg-orange-100 text-orange-800 border border-orange-200 shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              🍗 Broast Reviews
            </button>
            <button
              onClick={() => setActiveFilter('pizza')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeFilter === 'pizza'
                  ? 'bg-red-100 text-red-800 border border-red-200 shadow-sm'
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-300'
              }`}
            >
              🍕 Pizza Reviews
            </button>
          </div>

          <a
            href="https://maps.google.com/?cid=chohans_fastfood_shikarpur"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#B91C1C] hover:underline font-bold uppercase tracking-wider flex items-center gap-1"
          >
            <span>View all 294 on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((rev) => {
            const likes = (likedReviews[rev.id] || 0) + (rev.rating === 5 ? 4 : 2);
            return (
              <div
                key={rev.id}
                className="bg-white rounded-3xl p-6 border border-gray-200 hover:border-[#B91C1C]/40 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  {/* Author & Rating Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full bg-[#B91C1C]/10 border border-[#B91C1C]/20 flex items-center justify-center font-black text-xs text-[#B91C1C]">
                        {rev.author.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-xs sm:text-sm flex items-center gap-1">
                          <span>{rev.author}</span>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" title="Verified Customer" />
                        </h4>
                        <span className="text-[10px] text-gray-400 font-medium">{rev.role || rev.date}</span>
                      </div>
                    </div>

                    {/* Stars */}
                    <div className="flex text-yellow-400 text-xs">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < rev.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs text-gray-600 leading-relaxed font-normal">
                    "{rev.comment}"
                  </p>

                  {/* Tags */}
                  {rev.tags && rev.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1">
                      {rev.tags.map((t, idx) => (
                        <span key={idx} className="inline-block text-[10px] font-bold uppercase tracking-wider text-orange-800 bg-orange-50 border border-orange-200 px-2 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Helpful Like Button */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-[10px] text-gray-400">Via Google Maps</span>
                  <button
                    onClick={() => handleLike(rev.id)}
                    className="flex items-center gap-1 text-gray-400 hover:text-[#B91C1C] transition-colors cursor-pointer text-[11px]"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>Helpful ({likes})</span>
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      {/* Write Review Modal */}
      {isWriteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white border border-gray-200 rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4 text-left relative animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3">
              <h3 className="text-base font-black text-gray-900">Add Your Feedback</h3>
              <button 
                onClick={() => setIsWriteModalOpen(false)}
                className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddReview} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Ali"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Rating</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    >
                      ★
                    </button>
                  ))}
                  <span className="font-bold text-gray-700 ml-2">{rating} out of 5 Stars</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">What did you eat?</label>
                <select
                  value={tag}
                  onChange={(e) => setTag(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                >
                  <option value="Chicken Broast">Chicken Broast</option>
                  <option value="Shikarpur Tikka Pizza">Shikarpur Tikka Pizza</option>
                  <option value="Zinger Burger">Zinger Burger</option>
                  <option value="Loaded Pizza Fries">Loaded Pizza Fries</option>
                  <option value="Family Meal Deal">Family Meal Deal</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Your Review</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your thoughts about taste, crispiness, sauce or service..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-900 focus:outline-none focus:border-[#B91C1C]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWriteModalOpen(false)}
                  className="px-4 py-2 rounded-full text-gray-600 hover:bg-gray-100 font-bold cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-full bg-[#111827] hover:bg-[#B91C1C] text-white font-bold cursor-pointer"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111827] text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 animate-in slide-in-from-bottom duration-200 border border-gray-800 text-xs font-bold">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Thank you! Your review has been added.</span>
        </div>
      )}
    </section>
  );
};
