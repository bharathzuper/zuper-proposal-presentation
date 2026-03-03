import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Lottie from "lottie-react";
import { swipeAnimation } from "../data/swipeAnimation";
import { Button } from "./ui/button";

export function SwipeOnboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Always show the onboarding after a brief delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 800);

    return () => {
      clearTimeout(showTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="lg:hidden fixed inset-0 z-[100] pointer-events-none">
      {/* Backdrop with subtle gradient */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent animate-in fade-in duration-500"
        onClick={handleDismiss}
        style={{ pointerEvents: 'auto' }}
      />
      
      {/* Onboarding Card */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md animate-in slide-in-from-bottom-8 fade-in duration-500" style={{ pointerEvents: 'auto' }}>
        <div className="relative bg-[var(--zuper-card)] border border-[var(--zuper-border)] rounded-2xl shadow-2xl overflow-hidden">
          {/* Accent gradient top border */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--zuper-primary)] via-purple-500 to-blue-500" />
          
          <div className="relative px-6 py-6">
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-zinc-100 transition-colors group"
              aria-label="Dismiss"
            >
              <X className="w-4 h-4 text-zinc-400 group-hover:text-zinc-900 transition-colors" />
            </button>

            {/* Badge */}
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-100 text-zinc-600 text-xs rounded-full">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Quick tip
              </span>
            </div>

            {/* Lottie Animation with background */}
            <div className="flex justify-center mb-4">
              <div className="relative px-4 py-3 bg-zinc-50 rounded-lg">
                <div className="w-48 h-20">
                  <Lottie 
                    animationData={swipeAnimation} 
                    loop={true}
                    className="w-full h-full"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center space-y-1.5 mb-5">
              <h3 className="text-zinc-900 tracking-tight">
                Swipe to navigate
              </h3>
              <p className="text-sm text-zinc-500 max-w-[260px] mx-auto leading-relaxed">
                Swipe left or right to move between pages
              </p>
            </div>

            {/* Action button */}
            <Button
              onClick={handleDismiss}
              className="w-full"
            >
              Got it
            </Button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes swipe-indicator {
          0%, 100% {
            left: -33%;
          }
          50% {
            left: 100%;
          }
        }
        
        .animate-swipe-indicator {
          animation: swipe-indicator 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
