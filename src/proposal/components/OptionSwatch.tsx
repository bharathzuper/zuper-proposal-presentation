import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { ConfigOption } from '../types/proposal.types';
import { formatPriceDelta } from '../utils/priceFormatter';

// Inline SVG noise texture as a data URI for material-like grain
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`;

interface OptionSwatchProps {
  option: ConfigOption;
  isSelected: boolean;
  onSelect: () => void;
  size?: 'sm' | 'md' | 'lg';
}

export function OptionSwatch({ option, isSelected, onSelect, size = 'md' }: OptionSwatchProps) {
  const [imgError, setImgError] = useState(false);

  const sizeConfig = {
    sm: { container: 'w-20', image: 'h-16 rounded-lg', text: 'text-[11px]' },
    md: { container: 'w-[100px]', image: 'h-[72px] rounded-xl', text: 'text-xs' },
    lg: { container: 'w-[120px]', image: 'h-[88px] rounded-xl', text: 'text-xs' },
  };

  const cfg = sizeConfig[size];
  const hasImage = option.imageUrl && !imgError;

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className={`${cfg.container} flex flex-col items-center gap-1.5 group`}
    >
      <motion.div
        animate={isSelected ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.2 }}
        className={`w-full ${cfg.image} overflow-hidden relative border-2 transition-all duration-200 ${
          isSelected
            ? 'border-[var(--brand-primary)] shadow-lg ring-2 ring-[var(--brand-primary)]/20'
            : 'border-[var(--border-default)] hover:border-[var(--body-light)] shadow-sm'
        }`}
      >
        {hasImage ? (
          <img
            src={option.imageUrl}
            alt={option.label}
            className="w-full h-full object-cover"
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : option.colorHex ? (
          <div className="w-full h-full relative" style={{ backgroundColor: option.colorHex }}>
            {/* Granular noise texture overlay */}
            <div
              className="absolute inset-0"
              style={{ backgroundImage: NOISE_SVG, backgroundSize: '100px 100px', mixBlendMode: 'overlay' }}
            />
            {/* Light/shadow gradient for depth */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(145deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.05) 30%, transparent 55%, rgba(0,0,0,0.12) 100%)',
              }}
            />
            {/* Subtle inner shadow for inset material feel */}
            <div
              className="absolute inset-0 rounded-[inherit]"
              style={{ boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.15), inset 0 -1px 2px rgba(255,255,255,0.1)' }}
            />
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-[var(--body-light)] font-medium">
            {option.label.charAt(0)}
          </div>
        )}

        {isSelected && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/20 rounded-[inherit]" />
            <div className="relative w-7 h-7 rounded-full bg-white shadow-md flex items-center justify-center">
              <Check className="w-4 h-4 text-[var(--brand-primary)]" strokeWidth={3} />
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="text-center w-full px-0.5">
        <span className={`${cfg.text} font-sans block leading-tight truncate ${
          isSelected ? 'font-semibold text-[var(--heading)]' : 'text-[var(--body)] group-hover:text-[var(--heading)]'
        }`}>
          {option.label}
        </span>
        {option.priceAdjustment !== undefined && option.priceAdjustment !== 0 && (
          <span className="text-[10px] text-[var(--brand-primary)] font-medium mt-0.5 block">
            {formatPriceDelta(option.priceAdjustment)}
          </span>
        )}
      </div>
    </motion.button>
  );
}

interface OptionGroupProps {
  label: string;
  category: string;
  options: ConfigOption[];
  selectedOptionId?: string;
  onSelect: (optionId: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export function OptionGroup({ label, options, selectedOptionId, onSelect, size = 'md' }: OptionGroupProps) {
  const selectedLabel = options.find((o) => o.id === selectedOptionId)?.label;

  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <label className="text-sm font-medium text-[var(--heading)] font-sans">
          {label}
        </label>
        {selectedLabel && (
          <span className="text-xs text-[var(--body-light)] font-sans">
            {selectedLabel}
          </span>
        )}
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
        {options.map((opt) => (
          <div key={opt.id} className="snap-start shrink-0">
            <OptionSwatch
              option={opt}
              isSelected={selectedOptionId === opt.id}
              onSelect={() => onSelect(opt.id)}
              size={size}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
