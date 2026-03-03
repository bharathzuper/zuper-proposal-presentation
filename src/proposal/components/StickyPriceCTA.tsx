import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { formatPrice } from '../utils/priceFormatter';

interface StickyPriceCTAProps {
  currentTotal: number;
  label: string;
  onContinue: () => void;
  onBack?: () => void;
  ctaLabel: string;
  showBack?: boolean;
  disabled?: boolean;
}

export function StickyPriceCTA({
  currentTotal,
  label,
  onContinue,
  onBack,
  ctaLabel,
  showBack = false,
  disabled = false,
}: StickyPriceCTAProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[var(--border-default)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        {/* Back button */}
        <div className="shrink-0">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-[var(--body)] hover:text-[var(--heading)] transition-colors font-sans"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Price display */}
        <div className="flex-1 text-center sm:text-left">
          <p className="text-xs text-[var(--body-light)] font-sans hidden sm:block">{label}</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentTotal}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.3 }}
              className="text-lg sm:text-xl font-semibold text-[var(--heading)] tabular-nums font-sans"
            >
              {formatPrice(currentTotal)}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* CTA button */}
        <motion.button
          onClick={onContinue}
          disabled={disabled}
          whileHover={disabled ? {} : { scale: 1.02 }}
          whileTap={disabled ? {} : { scale: 0.98 }}
          className={`shrink-0 flex items-center gap-2 px-5 sm:px-8 py-3 rounded-lg text-sm sm:text-base font-medium text-white transition-all duration-200 font-sans ${
            disabled
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] shadow-sm hover:shadow-md'
          }`}
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>
    </div>
  );
}
