import { formatPrice } from '../utils/priceFormatter';
import type { PriceBreakdown } from '../hooks/usePriceCalculation';
import type { Proposal, ProposalSelections } from '../types/proposal.types';

interface OrderSummaryProps {
  proposal: Proposal;
  selections: ProposalSelections;
  breakdown: PriceBreakdown;
}

export function OrderSummary({ proposal, selections, breakdown }: OrderSummaryProps) {
  return (
    <div className="bg-white rounded-xl border border-[var(--border-default)] p-6 sm:p-8">
      {/* Per-trade selections */}
      {breakdown.tradeSubtotals.map((tradeSub) => {
        const trade = proposal.trades.find((t) => t.id === tradeSub.tradeId);
        if (!trade) return null;
        const sel = selections.tradeSelections[trade.id];
        if (!sel) return null;
        const pkg = trade.packages.find((p) => p.id === sel.packageId);
        if (!pkg) return null;

        return (
          <div key={trade.id} className="mb-6 last:mb-0">
            <div className="flex items-center gap-2 mb-3">
              {tradeSub.tradeColor && (
                <div
                  className="w-1 h-4 rounded-full shrink-0"
                  style={{ backgroundColor: tradeSub.tradeColor }}
                />
              )}
              <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--body-light)] font-sans">
                {trade.name} — {pkg.name} Package
              </h4>
            </div>
            <div className="space-y-2">
              {pkg.breakdown.map((item, i) => (
                <div key={i} className="flex items-baseline justify-between text-sm font-sans">
                  <span className="text-[var(--body)]">{item.label}</span>
                  <span className="text-[var(--heading)] tabular-nums font-medium ml-4 shrink-0">
                    {formatPrice(item.amount)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-baseline justify-between mt-3 pt-3 border-t border-[var(--border-light)]">
              <span className="text-sm font-medium text-[var(--heading)] font-sans">Subtotal</span>
              <span className="text-base font-semibold text-[var(--heading)] tabular-nums font-sans">
                {formatPrice(tradeSub.packagePrice)}
              </span>
            </div>
          </div>
        );
      })}

      {/* Add-ons */}
      {breakdown.addOnItems.length > 0 && (
        <div className="mb-6 pt-4 border-t border-[var(--border-default)]">
          <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--body-light)] font-sans mb-3">
            Add-ons
          </h4>
          <div className="space-y-2">
            {breakdown.addOnItems.map((item, i) => (
              <div key={i} className="flex items-baseline justify-between text-sm font-sans">
                <span className="text-[var(--body)]">{item.name}</span>
                <span className="text-[var(--heading)] tabular-nums font-medium ml-4 shrink-0">
                  {formatPrice(item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bundle discount */}
      {breakdown.bundleDiscountAmount > 0 && (
        <div className="mb-6 pt-4 border-t border-[var(--border-default)]">
          <div className="flex items-baseline justify-between text-sm font-sans">
            <span className="text-emerald-700 font-medium">
              {proposal.bundleDiscount?.label || 'Bundle Discount'}
            </span>
            <span className="text-emerald-700 tabular-nums font-semibold ml-4 shrink-0">
              −{formatPrice(breakdown.bundleDiscountAmount)}
            </span>
          </div>
        </div>
      )}

      {/* Payment method */}
      {breakdown.financingLabel && (
        <div className="mb-6 pt-4 border-t border-[var(--border-default)]">
          <h4 className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--body-light)] font-sans mb-2">
            Payment
          </h4>
          <p className="text-sm text-[var(--body)] font-sans">
            {breakdown.financingLabel}
          </p>
          {breakdown.monthlyPayment && (
            <p className="text-sm font-medium text-[var(--heading)] font-sans mt-1">
              ${breakdown.monthlyPayment}/mo
            </p>
          )}
        </div>
      )}

      {/* Grand total */}
      <div className="pt-4 border-t-2 border-[var(--heading)]">
        <div className="flex items-baseline justify-between">
          <span className="text-base font-semibold text-[var(--heading)] font-sans uppercase tracking-wide">
            Total
          </span>
          <span className="text-2xl font-semibold text-[var(--heading)] tabular-nums font-sans">
            {formatPrice(breakdown.grandTotal)}
          </span>
        </div>
      </div>
    </div>
  );
}
