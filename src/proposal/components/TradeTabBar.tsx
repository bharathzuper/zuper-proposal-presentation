import { motion } from 'framer-motion';
import { Check, SkipForward } from 'lucide-react';
import type { Trade, ProposalSelections } from '../types/proposal.types';

const DEFAULT_TRADE_COLORS: Record<string, string> = {
  roofing: '#C4714B',
  windows: '#5B7FA6',
  siding: '#6A8F6E',
  gutters: '#6B7280',
  hvac: '#5BA4B8',
};

const FALLBACK_COLORS = ['#C4714B', '#5B7FA6', '#6A8F6E', '#6B7280', '#5BA4B8'];

function getTradeColor(trade: Trade, index: number): string {
  if (trade.color) return trade.color;
  const byName = DEFAULT_TRADE_COLORS[trade.name.toLowerCase()];
  if (byName) return byName;
  return FALLBACK_COLORS[index % FALLBACK_COLORS.length];
}

interface TradeTabBarProps {
  trades: Trade[];
  activeTradeId: string;
  onSelectTrade: (tradeId: string) => void;
  selections: ProposalSelections;
  completedTradeIds?: string[];
}

export function TradeTabBar({
  trades,
  activeTradeId,
  onSelectTrade,
  selections,
  completedTradeIds = [],
}: TradeTabBarProps) {
  if (trades.length < 2) return null;

  return (
    <div className="mb-8">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory -mx-1 px-1">
        {trades.map((trade, index) => {
          const isActive = trade.id === activeTradeId;
          const isCompleted = completedTradeIds.includes(trade.id);
          const isSkipped = selections.skippedTradeIds.includes(trade.id);
          const tradeColor = getTradeColor(trade, index);
          const tradeSelection = selections.tradeSelections[trade.id];
          const selectedPkg = tradeSelection
            ? trade.packages.find((p) => p.id === tradeSelection.packageId)
            : null;

          return (
            <motion.button
              key={trade.id}
              onClick={() => onSelectTrade(trade.id)}
              whileTap={{ scale: 0.97 }}
              className={`relative flex items-center gap-2.5 min-w-[140px] snap-start px-4 py-3 rounded-xl text-left transition-all duration-200 shrink-0 ${
                isActive
                  ? 'bg-white shadow-sm border border-[var(--border-default)]'
                  : isSkipped
                    ? 'bg-black/[0.02] opacity-60 hover:opacity-80'
                    : 'bg-black/[0.02] hover:bg-black/[0.04]'
              }`}
              style={{
                borderLeftWidth: isActive ? '3px' : undefined,
                borderLeftColor: isActive ? tradeColor : undefined,
              }}
            >
              {isCompleted && !isSkipped && (
                <span
                  className="flex items-center justify-center w-5 h-5 rounded-full shrink-0"
                  style={{ backgroundColor: tradeColor }}
                >
                  <Check className="w-3 h-3 text-white" strokeWidth={3} />
                </span>
              )}
              {isSkipped && (
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-gray-300 shrink-0">
                  <SkipForward className="w-3 h-3 text-white" strokeWidth={2.5} />
                </span>
              )}
              {!isCompleted && !isSkipped && (
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: tradeColor }}
                />
              )}

              <div className="min-w-0">
                <span className={`text-sm font-medium font-sans block truncate ${
                  isSkipped ? 'line-through text-[var(--body-light)]' : 'text-[var(--heading)]'
                }`}>
                  {trade.name}
                </span>
                {selectedPkg && !isSkipped && (
                  <span className="text-[11px] text-[var(--body-light)] font-sans block truncate mt-0.5">
                    {selectedPkg.name}
                  </span>
                )}
                {!selectedPkg && !isSkipped && (
                  <span className="text-[11px] text-amber-600 font-sans block truncate mt-0.5">
                    Select a package
                  </span>
                )}
                {isSkipped && (
                  <span className="text-[11px] text-[var(--body-light)] font-sans block truncate mt-0.5">
                    Skipped
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
