import { motion } from 'framer-motion';
import { AddOnCard } from '../components/AddOnCard';
import type { Proposal, ProposalSelections, AddOn } from '../types/proposal.types';

interface AddOnsStepProps {
  proposal: Proposal;
  selections: ProposalSelections;
  onToggleAddOn: (addOnId: string) => void;
  onSelectAddOnConfig: (addOnId: string, subOptionId: string, optionId: string) => void;
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

interface AddOnSection {
  title: string;
  color?: string;
  addOns: AddOn[];
  disabled?: boolean;
}

export function AddOnsStep({ proposal, selections, onToggleAddOn, onSelectAddOnConfig }: AddOnsStepProps) {
  const isMultiTrade = proposal.trades.length > 1;
  const activeTrades = proposal.trades.filter(
    (t) => !selections.skippedTradeIds.includes(t.id)
  );

  const sections: AddOnSection[] = [];

  if (proposal.globalAddOns.length > 0) {
    const standardGlobal = proposal.globalAddOns.filter((a) => !a.bundleRequiresTrades);
    if (standardGlobal.length > 0) {
      sections.push({
        title: isMultiTrade ? 'General Upgrades' : 'Available Upgrades',
        addOns: standardGlobal,
      });
    }
  }

  if (isMultiTrade) {
    for (const trade of activeTrades) {
      if (trade.tradeAddOns && trade.tradeAddOns.length > 0) {
        sections.push({
          title: `${trade.name} Upgrades`,
          color: trade.color,
          addOns: trade.tradeAddOns,
        });
      }
    }

    const bundleAddOns = proposal.globalAddOns.filter((a) => a.bundleRequiresTrades?.length);
    if (bundleAddOns.length > 0) {
      const enabledBundleAddOns = bundleAddOns.filter((a) =>
        a.bundleRequiresTrades!.every(
          (tid) => !selections.skippedTradeIds.includes(tid)
        )
      );
      const disabledBundleAddOns = bundleAddOns.filter((a) =>
        a.bundleRequiresTrades!.some(
          (tid) => selections.skippedTradeIds.includes(tid)
        )
      );

      if (enabledBundleAddOns.length > 0) {
        sections.push({
          title: 'Bundle Upgrades',
          addOns: enabledBundleAddOns,
        });
      }
      if (disabledBundleAddOns.length > 0) {
        sections.push({
          title: 'Bundle Upgrades (Unavailable)',
          addOns: disabledBundleAddOns,
          disabled: true,
        });
      }
    }
  } else {
    const singleTrade = proposal.trades[0];
    if (singleTrade?.tradeAddOns && singleTrade.tradeAddOns.length > 0) {
      sections.push({
        title: `${singleTrade.name} Upgrades`,
        addOns: singleTrade.tradeAddOns,
      });
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--heading)] mb-2">
          Protect Your Investment
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed max-w-lg">
          Optional upgrades to maximize your home's protection and value. These can be added at any time.
        </p>
      </motion.div>

      {sections.map((section, sectionIdx) => (
        <div key={section.title} className={sectionIdx > 0 ? 'mt-10' : ''}>
          <div className="flex items-center gap-3 mb-5">
            {section.color && (
              <div
                className="w-1 h-5 rounded-full shrink-0"
                style={{ backgroundColor: section.color }}
              />
            )}
            <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--body-light)] font-sans">
              {section.title}
            </h3>
          </div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 gap-5"
          >
            {section.addOns.map((addon) => (
              <motion.div
                key={addon.id}
                variants={fadeUp}
                className={`flex ${section.disabled ? 'opacity-40 pointer-events-none' : ''}`}
              >
                <AddOnCard
                  addon={addon}
                  isSelected={selections.selectedAddOnIds.includes(addon.id)}
                  onToggle={() => onToggleAddOn(addon.id)}
                  subOptionSelections={selections.addOnConfigSelections[addon.id]}
                  onSubOptionSelect={(subId, optId) => onSelectAddOnConfig(addon.id, subId, optId)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      ))}

      {sections.length === 0 && (
        <div className="text-center py-16">
          <p className="text-[var(--body-light)] font-sans">
            No upgrades available for your current selections.
          </p>
        </div>
      )}
    </div>
  );
}
