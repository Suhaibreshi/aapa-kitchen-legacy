import { useState, useEffect } from 'react';
import { X, Gift, ShoppingBag } from 'lucide-react';

interface StoryPopupProps {
  isVisible: boolean;
  onClose: () => void;
  onClaimOffer: () => void;
}

const StoryPopup = ({ isVisible, onClose, onClaimOffer }: StoryPopupProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-card rounded-2xl border border-border/50 shadow-2xl max-w-md w-full p-6 transform transition-all duration-300 scale-100 animate-slide-up">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors z-10"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="text-center space-y-4">
          {/* Icon */}
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Gift className="w-8 h-8 text-primary" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-serif font-medium text-foreground">
            🌙 Ramadan Special!
          </h3>

          {/* Offer */}
          <div className="space-y-2">
            <p className="text-primary font-bold text-xl">20% EXTRA</p>
            <p className="text-muted-foreground">
              Get 20% extra quantity on all your favorite anchaars!
            </p>
          </div>

          {/* Coupon code */}
          <div className="bg-emerald-900/20 border border-emerald-600/30 rounded-lg p-3">
            <p className="text-sm text-emerald-300 mb-1">Use code:</p>
            <p className="font-mono font-bold text-emerald-100 text-lg">RAMADAN20</p>
          </div>

          {/* CTA Button */}
          <button
            onClick={onClaimOffer}
            className="w-full btn-primary flex items-center justify-center gap-2"
          >
            <ShoppingBag className="w-4 h-4" />
            Claim 20% Extra
          </button>

          {/* Subtext */}
          <p className="text-xs text-muted-foreground">
            Limited time offer • While stocks last
          </p>
        </div>
      </div>
    </div>
  );
};

export default StoryPopup;
