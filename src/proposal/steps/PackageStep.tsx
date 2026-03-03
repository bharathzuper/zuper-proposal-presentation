import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageCard } from '../components/PackageCard';
import { TradeTabBar } from '../components/TradeTabBar';
import { TrustBadges } from '../components/TrustBadges';
import { RotateCcw, Tag } from 'lucide-react';
import type { Proposal, ProposalSelections, BundleDiscount } from '../types/proposal.types';

interface PackageStepProps {
  proposal: Proposal;
  selections: ProposalSelections;
  onSelectPackage: (tradeId: string, packageId: string) => void;
  onSkipTrade: (tradeId: string) => void;
  onRestoreTrade: (tradeId: string) => void;
  bundleDiscount?: BundleDiscount;
}

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function PackageStep({
  proposal,
  selections,
  onSelectPackage,
  onSkipTrade,
  onRestoreTrade,
  bundleDiscount,
}: PackageStepProps) {
  const [activeTradeId, setActiveTradeId] = useState(proposal.trades[0]?.id || '');
  const isMultiTrade = proposal.trades.length > 1;
  const activeTrade = proposal.trades.find((t) => t.id === activeTradeId) || proposal.trades[0];
  const isSkipped = selections.skippedTradeIds.includes(activeTradeId);

  const completedTradeIds = proposal.trades
    .filter((t) => {
      if (selections.skippedTradeIds.includes(t.id)) return false;
      return !!selections.tradeSelections[t.id]?.packageId;
    })
    .map((t) => t.id);

  const selectedTradeCount = proposal.trades.filter(
    (t) =>
      !selections.skippedTradeIds.includes(t.id) &&
      !!selections.tradeSelections[t.id]?.packageId
  ).length;

  const showBundleBanner =
    bundleDiscount && selectedTradeCount >= bundleDiscount.minTrades;

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <TrustBadges contractor={proposal.contractorInfo} variant="inline" />
        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--heading)] mt-4 mb-2">
          Choose Your Package
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed max-w-lg">
          Select the protection level that's right for your home. Every package includes professional installation and permits.
        </p>
      </motion.div>

      {isMultiTrade && (
        <TradeTabBar
          trades={proposal.trades}
          activeTradeId={activeTradeId}
          onSelectTrade={setActiveTradeId}
          selections={selections}
          completedTradeIds={completedTradeIds}
        />
      )}

      {showBundleBanner && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-6 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5"
        >
          <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800 font-sans font-medium">
            {bundleDiscount!.label} — saving ${bundleDiscount!.amount.toLocaleString()}
          </p>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {activeTrade && (
          <motion.div
            key={activeTradeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {isSkipped ? (
              <div className="text-center py-16">
                <p className="text-[var(--body-light)] font-sans mb-4">
                  You've opted out of {activeTrade.name}.
                </p>
                <button
                  onClick={() => onRestoreTrade(activeTradeId)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--brand-primary)] border border-[var(--brand-primary)] rounded-lg hover:bg-[var(--brand-primary-light)] transition-colors font-sans"
                >
                  <RotateCcw className="w-4 h-4" />
                  Bring back {activeTrade.name}
                </button>
              </div>
            ) : (
              <>
                <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
                  {activeTrade.packages.map((pkg) => (
                    <motion.div key={pkg.id} variants={item}>
                      <PackageCard
                        pkg={pkg}
                        isSelected={selections.tradeSelections[activeTrade.id]?.packageId === pkg.id}
                        onSelect={() => onSelectPackage(activeTrade.id, pkg.id)}
                        trade={activeTrade.name}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {isMultiTrade && activeTrade.isRequired === false && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => onSkipTrade(activeTradeId)}
                      className="text-sm text-[var(--body-light)] hover:text-[var(--body)] transition-colors font-sans underline underline-offset-2"
                    >
                      {activeTrade.optOutLabel || `Skip ${activeTrade.name} for now`}
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
