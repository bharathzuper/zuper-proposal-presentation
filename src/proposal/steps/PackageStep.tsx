import { useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { PackageCard } from '../components/PackageCard';
import { RotateCcw, Tag, Check } from 'lucide-react';
import type { Proposal, ProposalSelections, BundleDiscount, Trade } from '../types/proposal.types';

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
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

function TradeSection({
  trade,
  tradeIndex,
  totalTrades,
  selections,
  onSelectPackage,
  onSkipTrade,
  onRestoreTrade,
  onPackageSelected,
}: {
  trade: Trade;
  tradeIndex: number;
  totalTrades: number;
  selections: ProposalSelections;
  onSelectPackage: (tradeId: string, packageId: string) => void;
  onSkipTrade: (tradeId: string) => void;
  onRestoreTrade: (tradeId: string) => void;
  onPackageSelected: (tradeIndex: number) => void;
}) {
  const isSkipped = selections.skippedTradeIds.includes(trade.id);
  const isMultiTrade = totalTrades > 1;
  const selectedPkgId = selections.tradeSelections[trade.id]?.packageId;
  const tradeColor = trade.color || '#C4714B';

  const handleSelect = (packageId: string) => {
    onSelectPackage(trade.id, packageId);
    onPackageSelected(tradeIndex);
  };

  return (
    <div>
      {/* Trade header */}
      {isMultiTrade && (
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-sm font-semibold font-sans"
            style={{ backgroundColor: tradeColor }}
          >
            {selectedPkgId && !isSkipped ? (
              <Check className="w-4 h-4" strokeWidth={3} />
            ) : (
              tradeIndex + 1
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-serif text-[var(--heading)]">
              {trade.name}
            </h2>
            {selectedPkgId && !isSkipped && (
              <p className="text-xs text-[var(--body-light)] font-sans mt-0.5">
                {trade.packages.find((p) => p.id === selectedPkgId)?.name} selected
              </p>
            )}
          </div>
        </div>
      )}

      {isSkipped ? (
        <div className="text-center py-12 bg-[var(--surface)] rounded-xl border border-dashed border-[var(--border-default)]">
          <p className="text-[var(--body-light)] font-sans mb-4 text-sm">
            You&apos;ve opted out of {trade.name}.
          </p>
          <button
            onClick={() => onRestoreTrade(trade.id)}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[var(--brand-primary)] border border-[var(--brand-primary)] rounded-lg hover:bg-[var(--brand-primary-light)] transition-colors font-sans"
          >
            <RotateCcw className="w-4 h-4" />
            Bring back {trade.name}
          </button>
        </div>
      ) : (
        <>
          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-4">
            {trade.packages.map((pkg) => (
              <motion.div key={pkg.id} variants={item}>
                <PackageCard
                  pkg={pkg}
                  isSelected={selectedPkgId === pkg.id}
                  onSelect={() => handleSelect(pkg.id)}
                  trade={trade.name}
                />
              </motion.div>
            ))}
          </motion.div>

          {isMultiTrade && trade.isRequired === false && (
            <div className="mt-5 text-center">
              <button
                onClick={() => onSkipTrade(trade.id)}
                className="text-sm text-[var(--body-light)] hover:text-[var(--body)] transition-colors font-sans underline underline-offset-2"
              >
                {trade.optOutLabel || `Skip ${trade.name} for now`}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export function PackageStep({
  proposal,
  selections,
  onSelectPackage,
  onSkipTrade,
  onRestoreTrade,
  bundleDiscount,
}: PackageStepProps) {
  const tradeSectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const selectedTradeCount = proposal.trades.filter(
    (t) =>
      !selections.skippedTradeIds.includes(t.id) &&
      !!selections.tradeSelections[t.id]?.packageId
  ).length;

  const showBundleBanner =
    bundleDiscount && selectedTradeCount >= bundleDiscount.minTrades;

  const handlePackageSelected = useCallback(
    (tradeIndex: number) => {
      const nextIncompleteIdx = proposal.trades.findIndex((t, idx) => {
        if (idx <= tradeIndex) return false;
        if (selections.skippedTradeIds.includes(t.id)) return false;
        return !selections.tradeSelections[t.id]?.packageId;
      });

      if (nextIncompleteIdx !== -1) {
        const el = tradeSectionRefs.current[nextIncompleteIdx];
        if (el) {
          setTimeout(() => {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 300);
        }
      }
    },
    [proposal.trades, selections],
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
          Choose Your Package
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed max-w-lg">
          {proposal.trades.length > 1
            ? `Select a package for each service below. Every package includes professional installation and permits.`
            : `Select the protection level that's right for your home. Every package includes professional installation and permits.`}
        </p>
      </motion.div>

      {showBundleBanner && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mb-8 px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-2.5"
        >
          <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
          <p className="text-sm text-emerald-800 font-sans font-medium">
            {bundleDiscount!.label} — saving ${bundleDiscount!.amount.toLocaleString()}
          </p>
        </motion.div>
      )}

      {/* All trades stacked vertically */}
      <div className="space-y-12">
        {proposal.trades.map((trade, idx) => (
          <div
            key={trade.id}
            ref={(el) => { tradeSectionRefs.current[idx] = el; }}
            className="scroll-mt-[100px]"
          >
            <TradeSection
              trade={trade}
              tradeIndex={idx}
              totalTrades={proposal.trades.length}
              selections={selections}
              onSelectPackage={onSelectPackage}
              onSkipTrade={onSkipTrade}
              onRestoreTrade={onRestoreTrade}
              onPackageSelected={handlePackageSelected}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
