import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ComponentType } from 'react';
import { formatPrice } from '../utils/priceFormatter';

export interface StickyPriceCTASecondaryAction {
  label: string;
  onClick: () => void;
  icon?: ComponentType<{ className?: string }>;
  /** When false, the secondary action animates out (used to gate behind a state). */
  visible?: boolean;
}

interface StickyPriceCTAProps {
  currentTotal: number;
  label: string;
  onContinue: () => void;
  onBack?: () => void;
  ctaLabel: string;
  showBack?: boolean;
  disabled?: boolean;
  disabledHint?: string;
  secondaryAction?: StickyPriceCTASecondaryAction;
}

export function StickyPriceCTA({
  currentTotal,
  label,
  onContinue,
  onBack,
  ctaLabel,
  showBack = false,
  disabled = false,
  disabledHint,
  secondaryAction,
}: StickyPriceCTAProps) {
  const showSecondary = !!secondaryAction && secondaryAction.visible !== false;
  const SecondaryIcon = secondaryAction?.icon;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-t border-[var(--border-default)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-4">
        {/* Back button */}
        <div className="shrink-0">
          {showBack && onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 text-sm text-[var(--body)] hover:text-[var(--heading)] transition-colors font-sans px-2 -ml-2 py-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          ) : (
            <div className="w-10" />
          )}
        </div>

        {/* Price display */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <p className="text-xs text-[var(--body-light)] font-sans hidden sm:block truncate">{label}</p>
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

        {/* Action cluster (right corner) */}
        <div className="shrink-0 flex items-center gap-1.5 sm:gap-2">
          <AnimatePresence initial={false}>
            {showSecondary && secondaryAction && (
              <motion.button
                key="secondary"
                type="button"
                onClick={secondaryAction.onClick}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                transition={{ duration: 0.2, ease: [0.22, 0.9, 0.32, 1] }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm font-medium font-sans text-[var(--body)] hover:text-[var(--heading)] hover:bg-[var(--surface)] transition-colors whitespace-nowrap"
                aria-label={secondaryAction.label}
              >
                {SecondaryIcon && <SecondaryIcon className="w-3.5 h-3.5" />}
                {secondaryAction.label}
              </motion.button>
            )}
            {showSecondary && secondaryAction && SecondaryIcon && (
              <motion.button
                key="secondary-mobile"
                type="button"
                onClick={secondaryAction.onClick}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2, ease: [0.22, 0.9, 0.32, 1] }}
                className="sm:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[var(--body)] hover:text-[var(--heading)] hover:bg-[var(--surface)] transition-colors"
                aria-label={secondaryAction.label}
              >
                <SecondaryIcon className="w-4 h-4" />
              </motion.button>
            )}
          </AnimatePresence>

          <div className="flex flex-col items-end gap-1">
            <motion.button
              onClick={onContinue}
              disabled={disabled}
              whileHover={disabled ? {} : { scale: 1.02 }}
              whileTap={disabled ? {} : { scale: 0.98 }}
              className={`flex items-center gap-2 px-5 sm:px-8 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white transition-all duration-200 font-sans ${
                disabled
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[var(--brand-primary)] hover:bg-[var(--brand-primary-hover)] shadow-sm hover:shadow-md'
              }`}
            >
              {ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            {disabled && disabledHint && (
              <p className="text-[11px] text-amber-600 font-sans">{disabledHint}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
