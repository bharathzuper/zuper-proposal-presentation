import { useState } from 'react';
import { Shield, Lock, Star, BadgeCheck, Home } from 'lucide-react';
import type { ContractorInfo } from '../types/proposal.types';

interface TrustBadgesProps {
  contractor: ContractorInfo;
  variant?: 'header' | 'payment' | 'inline';
}

function ContractorLogo({ contractor }: { contractor: ContractorInfo }) {
  const [imgError, setImgError] = useState(false);
  const initials = contractor.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (imgError || !contractor.logo) {
    return (
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--brand-primary)]">
        <Home className="w-5 h-5 text-white" />
      </div>
    );
  }

  return (
    <img
      src={contractor.logo}
      alt={contractor.name}
      className="w-10 h-10 rounded-lg object-cover"
      onError={() => setImgError(true)}
    />
  );
}

export function TrustBadges({ contractor, variant = 'inline' }: TrustBadgesProps) {
  if (variant === 'header') {
    return (
      <div className="flex items-center gap-3">
        <ContractorLogo contractor={contractor} />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-[var(--heading)] font-sans">{contractor.name}</span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-[var(--brand-success-light)] text-[var(--brand-success)]">
              <BadgeCheck className="w-3 h-3" /> Verified
            </span>
          </div>
          {contractor.licenseNumber && (
            <span className="text-xs text-[var(--body-light)] font-sans">
              Lic. #{contractor.licenseNumber}
            </span>
          )}
        </div>
      </div>
    );
  }

  if (variant === 'payment') {
    return (
      <div className="flex flex-col gap-2 mt-6">
        <div className="flex items-center gap-2 text-xs text-[var(--body-light)] font-sans">
          <Lock className="w-3.5 h-3.5" />
          256-bit encrypted · Your information is never stored on our servers
        </div>
        {contractor.licenseNumber && (
          <div className="flex items-center gap-2 text-xs text-[var(--body-light)] font-sans">
            <Shield className="w-3.5 h-3.5" />
            Licensed contractor · #{contractor.licenseNumber}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--body-light)] font-sans">
      {contractor.rating && (
        <span className="flex items-center gap-1">
          <Star className="w-3.5 h-3.5 text-[var(--brand-gold)] fill-[var(--brand-gold)]" />
          {contractor.rating} · Trusted by {contractor.reviewCount?.toLocaleString()}+ homeowners
          {contractor.city && ` in ${contractor.city}`}
        </span>
      )}
    </div>
  );
}
