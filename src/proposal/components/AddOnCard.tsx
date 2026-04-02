import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Plus, Package, Droplets, ShieldCheck, Thermometer, Sun, Lightbulb } from 'lucide-react';
import type { AddOn } from '../types/proposal.types';
import { OptionGroup } from './OptionSwatch';
import { formatPrice } from '../utils/priceFormatter';
import type { LucideIcon } from 'lucide-react';

interface AddOnCardProps {
  addon: AddOn;
  isSelected: boolean;
  onToggle: () => void;
  subOptionSelections?: Record<string, string>;
  onSubOptionSelect?: (subOptionId: string, optionId: string) => void;
}

const iconMap: Record<string, LucideIcon> = {
  Droplets, ShieldCheck, Thermometer, Sun, Lightbulb, Package,
};

const gradientMap: Record<string, string> = {
  Droplets:    'from-blue-500/10 via-blue-400/5 to-cyan-500/10',
  ShieldCheck: 'from-teal-500/10 via-emerald-400/5 to-green-500/10',
  Thermometer: 'from-orange-500/10 via-amber-400/5 to-yellow-500/10',
  Sun:         'from-yellow-400/10 via-amber-300/5 to-orange-400/10',
  Lightbulb:   'from-violet-500/10 via-purple-400/5 to-indigo-500/10',
};

const iconColorMap: Record<string, string> = {
  Droplets:    'text-blue-500',
  ShieldCheck: 'text-teal-600',
  Thermometer: 'text-orange-500',
  Sun:         'text-amber-500',
  Lightbulb:   'text-violet-500',
};

function AddOnHero({ addon }: { addon: AddOn }) {
  const [imgError, setImgError] = useState(false);
  const hasImage = addon.image && !imgError;

  if (hasImage) {
    return (
      <>
        <img
          src={addon.image}
          alt={addon.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => setImgError(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </>
    );
  }

  const IconComponent = iconMap[addon.icon || ''] || Package;
  const gradient = gradientMap[addon.icon || ''] || 'from-gray-500/10 to-gray-400/10';
  const iconColor = iconColorMap[addon.icon || ''] || 'text-[var(--body-light)]';

  return (
    <div className={`w-full h-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
      <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center">
        <IconComponent className={`w-8 h-8 ${iconColor}`} strokeWidth={1.5} />
      </div>
    </div>
  );
}

export function AddOnCard({ addon, isSelected, onToggle, subOptionSelections, onSubOptionSelect }: AddOnCardProps) {
  return (
    <motion.div
      layout
      className={`rounded-xl overflow-hidden border-2 transition-all duration-200 flex flex-col w-full ${
        isSelected
          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-light)]'
          : 'border-[var(--border-default)] bg-white hover:shadow-md'
      }`}
    >
      <div className="relative h-28 overflow-hidden shrink-0">
        <AddOnHero addon={addon} />
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3">
          <h4 className="font-serif text-lg text-[var(--heading)]">{addon.name}</h4>
          <span className="text-base font-semibold tabular-nums shrink-0" style={{ color: 'var(--brand-primary)' }}>
            +{formatPrice(addon.price)}
          </span>
        </div>
        <p className="text-sm text-[var(--body)] mt-1.5 leading-relaxed line-clamp-3">
          {addon.description}
        </p>

        <div className="mt-auto pt-4">
          <motion.button
            onClick={onToggle}
            whileTap={{ scale: 0.97 }}
            className={`w-full py-2.5 rounded-lg text-sm font-medium font-sans flex items-center justify-center gap-2 transition-all duration-200 ${
              isSelected
                ? 'bg-[var(--brand-primary)] text-white'
                : 'bg-[var(--surface)] text-[var(--heading)] border border-[var(--border-default)] hover:border-[var(--body-light)]'
            }`}
          >
            {isSelected ? (
              <>
                <Check className="w-4 h-4" strokeWidth={3} />
                Added
              </>
            ) : (
              <>
                <Plus className="w-4 h-4" />
                Include this upgrade
              </>
            )}
          </motion.button>
        </div>

        <AnimatePresence>
          {isSelected && addon.subOptions && addon.subOptions.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="pt-4 mt-4 border-t border-[var(--border-default)] space-y-4">
                {addon.subOptions.map((sub) => (
                  <OptionGroup
                    key={sub.id}
                    label={sub.label}
                    category=""
                    options={sub.options}
                    selectedOptionId={subOptionSelections?.[sub.id]}
                    onSelect={(optionId) => onSubOptionSelect?.(sub.id, optionId)}
                    size="sm"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
