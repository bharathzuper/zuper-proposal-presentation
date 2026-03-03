import { motion } from 'framer-motion';
import { Check, Shield, Landmark } from 'lucide-react';
import type { FinancingOption } from '../types/proposal.types';

interface FinancingProviderCardProps {
  provider: FinancingOption;
  isSelected: boolean;
  onSelect: () => void;
  totalAmount: number;
}

const providerColors: Record<string, string> = {
  GreenSky: '#00A651',
  Mosaic: '#4A90D9',
  Hearth: '#E85D3A',
};

export function FinancingProviderCard({ provider, isSelected, onSelect, totalAmount }: FinancingProviderCardProps) {
  const r = provider.apr / 100 / 12;
  const monthly = Math.round(
    (totalAmount * r * Math.pow(1 + r, provider.termMonths)) /
    (Math.pow(1 + r, provider.termMonths) - 1)
  );
  const years = Math.floor(provider.termMonths / 12);
  const remainingMonths = provider.termMonths % 12;
  const termLabel = remainingMonths > 0
    ? `${years} yr ${remainingMonths} mo`
    : `${years} year${years > 1 ? 's' : ''}`;

  const brandColor = providerColors[provider.providerName] || 'var(--brand-primary)';

  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -1, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}
      whileTap={{ scale: 0.99 }}
      className={`w-full text-left rounded-xl p-5 sm:p-6 border-2 transition-colors duration-200 relative ${
        isSelected
          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-light)]'
          : 'border-[var(--border-default)] bg-white'
      }`}
    >
      {provider.badge && (
        <span className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wide"
          style={{ backgroundColor: 'var(--brand-gold-light)', color: 'var(--brand-gold)' }}>
          {provider.badge}
        </span>
      )}

      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-3 left-3 sm:top-4 sm:left-4 w-6 h-6 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--brand-primary)' }}
        >
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </motion.div>
      )}

      <div className={isSelected ? 'ml-8' : ''}>
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: `${brandColor}15` }}
          >
            <Landmark className="w-4.5 h-4.5" style={{ color: brandColor }} />
          </div>
          <div>
            <h4 className="font-medium text-[var(--heading)] font-sans text-base">{provider.providerName}</h4>
            <p className="text-xs text-[var(--body-light)] font-sans">
              {provider.apr}% APR · {termLabel}
            </p>
          </div>
        </div>

        <div className="flex items-baseline justify-between gap-4 pt-3 border-t border-[var(--border-light)]">
          <span className="text-xs text-[var(--body-light)] font-sans uppercase tracking-wide">Monthly payment</span>
          <p className="text-2xl font-semibold text-[var(--heading)] tabular-nums font-sans">
            ${monthly}<span className="text-sm font-normal text-[var(--body-light)]">/mo</span>
          </p>
        </div>

        {provider.noImpactCredit && (
          <div className="mt-3 flex items-center gap-1.5 text-xs text-[var(--brand-success)] font-medium font-sans">
            <Shield className="w-3.5 h-3.5" />
            No impact to credit score
          </div>
        )}
      </div>
    </motion.button>
  );
}
