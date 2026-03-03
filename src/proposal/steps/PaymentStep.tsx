import { motion, AnimatePresence } from 'framer-motion';
import { CreditCard, Banknote, Check } from 'lucide-react';
import { FinancingProviderCard } from '../components/FinancingProviderCard';
import { TrustBadges } from '../components/TrustBadges';
import { formatPrice } from '../utils/priceFormatter';
import type { Proposal, ProposalSelections } from '../types/proposal.types';

interface PaymentStepProps {
  proposal: Proposal;
  selections: ProposalSelections;
  grandTotal: number;
  onSetPaymentMethod: (method: 'full' | 'finance') => void;
  onSelectFinancing: (financingId: string) => void;
}

export function PaymentStep({ proposal, selections, grandTotal, onSetPaymentMethod, onSelectFinancing }: PaymentStepProps) {
  const lowestMonthly = Math.min(
    ...proposal.financing.map((f) => {
      const r = f.apr / 100 / 12;
      return Math.round((grandTotal * r * Math.pow(1 + r, f.termMonths)) / (Math.pow(1 + r, f.termMonths) - 1));
    })
  );

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--heading)] mb-2">
          Choose Payment Method
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed max-w-lg">
          Select how you'd like to pay. Financing starts as low as ${lowestMonthly}/mo with no impact to your credit score.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {/* Pay in Full */}
        <motion.button
          onClick={() => onSetPaymentMethod('full')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          className={`text-left rounded-xl p-6 border-2 transition-all duration-200 relative ${
            selections.paymentMethod === 'full'
              ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-light)]'
              : 'border-[var(--border-default)] bg-white'
          }`}
        >
          {selections.paymentMethod === 'full' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </motion.div>
          )}
          <Banknote className="w-8 h-8 mb-3" style={{ color: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-serif text-[var(--heading)]">Pay in Full</h3>
          <p className="text-2xl font-semibold text-[var(--heading)] tabular-nums font-sans mt-2">
            {formatPrice(grandTotal)}
          </p>
          <p className="text-sm text-[var(--brand-success)] font-sans mt-2 flex items-center gap-1.5">
            <Check className="w-3.5 h-3.5" />
            No additional fees. Simple and done.
          </p>
        </motion.button>

        {/* Finance */}
        <motion.button
          onClick={() => onSetPaymentMethod('finance')}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.99 }}
          className={`text-left rounded-xl p-6 border-2 transition-all duration-200 relative ${
            selections.paymentMethod === 'finance'
              ? 'border-[var(--brand-primary)] bg-[var(--brand-primary-light)]'
              : 'border-[var(--border-default)] bg-white'
          }`}
        >
          {selections.paymentMethod === 'finance' && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-4 right-4 w-6 h-6 rounded-full flex items-center justify-center"
              style={{ backgroundColor: 'var(--brand-primary)' }}
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </motion.div>
          )}
          <CreditCard className="w-8 h-8 mb-3" style={{ color: 'var(--brand-primary)' }} />
          <h3 className="text-lg font-serif text-[var(--heading)]">Finance</h3>
          <p className="text-2xl font-semibold text-[var(--heading)] tabular-nums font-sans mt-2">
            As low as ${lowestMonthly}<span className="text-sm font-normal text-[var(--body-light)]">/mo</span>
          </p>
          <p className="text-sm text-[var(--body-light)] font-sans mt-2">
            Multiple providers · Flexible terms
          </p>
        </motion.button>
      </div>

      {/* Financing providers */}
      <AnimatePresence>
        {selections.paymentMethod === 'finance' && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3">
              {[...proposal.financing]
                .sort((a, b) => {
                  const aMonthly = (grandTotal * (a.apr/100/12) * Math.pow(1+a.apr/100/12, a.termMonths)) / (Math.pow(1+a.apr/100/12, a.termMonths)-1);
                  const bMonthly = (grandTotal * (b.apr/100/12) * Math.pow(1+b.apr/100/12, b.termMonths)) / (Math.pow(1+b.apr/100/12, b.termMonths)-1);
                  return aMonthly - bMonthly;
                })
                .map((provider) => (
                  <FinancingProviderCard
                    key={provider.id}
                    provider={provider}
                    isSelected={selections.selectedFinancingId === provider.id}
                    onSelect={() => onSelectFinancing(provider.id)}
                    totalAmount={grandTotal}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <TrustBadges contractor={proposal.contractorInfo} variant="payment" />
    </div>
  );
}
