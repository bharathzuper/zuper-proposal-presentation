import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { OptionGroup } from '../components/OptionSwatch';
import { TradeTabBar } from '../components/TradeTabBar';
import type { Proposal, ProposalSelections } from '../types/proposal.types';

interface ConfigureStepProps {
  proposal: Proposal;
  selections: ProposalSelections;
  onSelectConfig: (tradeId: string, configGroupId: string, optionId: string) => void;
}

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function ConfigureStep({ proposal, selections, onSelectConfig }: ConfigureStepProps) {
  const visibleTrades = proposal.trades.filter(
    (t) => !selections.skippedTradeIds.includes(t.id)
  );
  const [activeTradeId, setActiveTradeId] = useState(visibleTrades[0]?.id || '');
  const isMultiTrade = proposal.trades.length > 1;

  const activeTrade = visibleTrades.find((t) => t.id === activeTradeId) || visibleTrades[0];
  const sel = activeTrade ? selections.tradeSelections[activeTrade.id] : null;
  const pkg = activeTrade && sel
    ? activeTrade.packages.find((p) => p.id === sel.packageId)
    : null;

  const completedTradeIds = visibleTrades
    .filter((trade) => {
      const tradeSel = selections.tradeSelections[trade.id];
      if (!tradeSel) return false;
      const tradePkg = trade.packages.find((p) => p.id === tradeSel.packageId);
      if (!tradePkg) return false;
      return tradePkg.configGroups.every(
        (g) => tradeSel.configSelections[g.id]
      );
    })
    .map((t) => t.id);

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--heading)] mb-2">
          Configure Your Package
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed max-w-lg">
          Personalize your selections. Choose colors and materials that complement your home.
        </p>
      </motion.div>

      {isMultiTrade && (
        <TradeTabBar
          trades={visibleTrades}
          activeTradeId={activeTradeId}
          onSelectTrade={setActiveTradeId}
          selections={selections}
          completedTradeIds={completedTradeIds}
        />
      )}

      <AnimatePresence mode="wait">
        {activeTrade && pkg && sel && (
          <motion.div
            key={activeTradeId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {isMultiTrade && (
              <p className="text-sm text-[var(--body-light)] font-sans mb-6">
                Configuring <span className="font-medium text-[var(--heading)]">{activeTrade.name} — {pkg.name}</span>
              </p>
            )}

            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-10">
              {[...new Set(pkg.configGroups.map((g) => g.category))].map((category) => {
                const groups = pkg.configGroups.filter((g) => g.category === category);
                return (
                  <motion.div key={category} variants={fadeUp}>
                    <h3 className="text-xs font-medium uppercase tracking-[0.1em] text-[var(--body-light)] font-sans mb-6">
                      {category}
                    </h3>
                    <div className="bg-white rounded-xl border border-[var(--border-default)] p-5 sm:p-6 space-y-6">
                      {groups.map((group) => (
                        <OptionGroup
                          key={group.id}
                          label={group.label}
                          category={group.category}
                          options={group.options}
                          selectedOptionId={sel.configSelections[group.id]}
                          onSelect={(optionId) => onSelectConfig(activeTrade.id, group.id, optionId)}
                        />
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}

        {activeTrade && !pkg && (
          <motion.div
            key="no-package"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-[var(--body-light)] font-sans">
              No package selected for {activeTrade.name}. Go back to choose a package first.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
