import { useState, useEffect } from 'react';
import { Star, Moon, Gift } from 'lucide-react';

const RamadanAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Show/hide announcement based on user preference
    const hidden = localStorage.getItem('ramadan-announcement-hidden');
    if (hidden) {
      setIsVisible(false);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('ramadan-announcement-hidden', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 text-white overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Close button */}
      <button
        onClick={handleClose}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white transition-colors"
        aria-label="Close announcement"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Marquee content */}
      <div className="relative py-3 px-8">
        <div className="flex items-center overflow-hidden">
          <div className="flex items-center ramadan-marquee whitespace-nowrap">
            {/* First set of content */}
            <div className="flex items-center space-x-6 mx-6">
              <Moon className="w-5 h-5 text-emerald-200" />
              <span className="font-medium">🌙 Ramadan Mubarak!</span>
              <span className="text-emerald-200 font-semibold">20% OFF</span>
              <span className="bg-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-600">
                RAMADAN20
              </span>
              <Gift className="w-5 h-5 text-emerald-200" />
              <span className="text-emerald-200">Special Ramadan Offer</span>
              <Star className="w-5 h-5 text-emerald-200" />
            </div>
            
            {/* Duplicate content for seamless loop */}
            <div className="flex items-center space-x-6 mx-6">
              <Moon className="w-5 h-5 text-emerald-200" />
              <span className="font-medium">🌙 Ramadan Mubarak!</span>
              <span className="text-emerald-200 font-semibold">20% OFF</span>
              <span className="bg-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-600">
                RAMADAN20
              </span>
              <Gift className="w-5 h-5 text-emerald-200" />
              <span className="text-emerald-200">Special Ramadan Offer</span>
              <Star className="w-5 h-5 text-emerald-200" />
            </div>
            
            {/* Third set for continuous flow */}
            <div className="flex items-center space-x-6 mx-6">
              <Moon className="w-5 h-5 text-emerald-200" />
              <span className="font-medium">🌙 Ramadan Mubarak!</span>
              <span className="text-emerald-200 font-semibold">20% OFF</span>
              <span className="bg-emerald-700 px-3 py-1 rounded-full text-sm font-bold border border-emerald-600">
                RAMADAN20
              </span>
              <Gift className="w-5 h-5 text-emerald-200" />
              <span className="text-emerald-200">Special Ramadan Offer</span>
              <Star className="w-5 h-5 text-emerald-200" />
            </div>
          </div>
        </div>
      </div>

      {/* CSS for marquee animation is handled in index.css */}
    </div>
  );
};

export default RamadanAnnouncement;
