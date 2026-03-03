import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Shield, Star, Home } from 'lucide-react';
import type { Package } from '../types/proposal.types';
import { formatPrice } from '../utils/priceFormatter';

interface PackageCardProps {
  pkg: Package;
  isSelected: boolean;
  onSelect: () => void;
  trade?: string;
}

function PackageImage({ src, alt }: { src?: string; alt: string }) {
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-[var(--surface)] to-[var(--border-default)] flex items-center justify-center">
        <Home className="w-10 h-10 text-[var(--body-light)]" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      loading="lazy"
      onError={() => setError(true)}
    />
  );
}

export function PackageCard({ pkg, isSelected, onSelect }: PackageCardProps) {
  return (
    <motion.button
      onClick={onSelect}
      whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: 0.995 }}
      transition={{ duration: 0.15 }}
      className={`group w-full text-left rounded-xl border-2 transition-colors duration-200 relative overflow-hidden ${
        isSelected
          ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-light)]'
          : 'border-[var(--border-default)] bg-white hover:border-[var(--border-default)]'
      }`}
    >
      {/* Hero image */}
      <div className="relative h-44 sm:h-52 overflow-hidden">
        <PackageImage src={pkg.image} alt={pkg.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* Badges & price overlaid on image */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {pkg.isRecommended && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase text-white bg-[var(--brand-gold)] shadow-sm">
              <Star className="w-3 h-3 fill-white" />
              Recommended
            </span>
          )}
        </div>

        {isSelected && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center bg-[var(--brand-primary)] shadow-md"
          >
            <Check className="w-4.5 h-4.5 text-white" strokeWidth={3} />
          </motion.div>
        )}

        <div className="absolute bottom-0 left-0 right-0 px-5 sm:px-6 pb-4 flex items-end justify-between">
          <h3 className="text-2xl sm:text-3xl font-serif text-white drop-shadow-md">{pkg.name}</h3>
          <span className="text-2xl sm:text-3xl font-semibold text-white tabular-nums font-sans drop-shadow-md">
            {formatPrice(pkg.price)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6">
        <p className="text-[var(--body)] text-sm leading-relaxed">{pkg.description}</p>

        <ul className="mt-4 space-y-2">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm">
              <Check
                className={`w-4 h-4 mt-0.5 shrink-0 ${f.highlighted ? 'text-[var(--brand-primary)]' : 'text-[var(--brand-success)]'}`}
                strokeWidth={2.5}
              />
              <span className={f.highlighted ? 'font-medium text-[var(--heading)]' : 'text-[var(--body)]'}>
                {f.text}
              </span>
            </li>
          ))}
        </ul>

        {pkg.warrantyYears && (
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--brand-success-light)] text-[var(--brand-success)]">
            <Shield className="w-3.5 h-3.5" />
            {pkg.warrantyYears}-year warranty included
          </div>
        )}
      </div>
    </motion.button>
  );
}
