import { useMemo } from 'react';
import type { Proposal, ProposalSelections } from '../types/proposal.types';

export interface TradeSubtotal {
  tradeId: string;
  tradeName: string;
  tradeColor?: string;
  packageName: string;
  packagePrice: number;
  addOnsTotal: number;
}

export interface PriceBreakdown {
  packageTotal: number;
  packageLabel: string;
  addOnsTotal: number;
  addOnItems: { name: string; price: number }[];
  grandTotal: number;
  monthlyPayment?: number;
  financingLabel?: string;
  tradeSubtotals: TradeSubtotal[];
  bundleDiscountAmount: number;
}

export function usePriceCalculation(
  proposal: Proposal,
  selections: ProposalSelections
): PriceBreakdown {
  return useMemo(() => {
    let packageTotal = 0;
    const packageLabels: string[] = [];
    const tradeSubtotals: TradeSubtotal[] = [];
    const addOnItems: { name: string; price: number }[] = [];
    let addOnsTotal = 0;

    const activeTrades = proposal.trades.filter(
      (t) => !selections.skippedTradeIds.includes(t.id)
    );

    for (const trade of activeTrades) {
      const tradeSelection = selections.tradeSelections[trade.id];
      if (tradeSelection) {
        const pkg = trade.packages.find((p) => p.id === tradeSelection.packageId);
        if (pkg) {
          packageTotal += pkg.price;
          packageLabels.push(pkg.name);

          let tradeAddOnsTotal = 0;
          if (trade.tradeAddOns) {
            for (const addon of trade.tradeAddOns) {
              if (selections.selectedAddOnIds.includes(addon.id)) {
                tradeAddOnsTotal += addon.price;
                addOnItems.push({ name: addon.name, price: addon.price });
                addOnsTotal += addon.price;
              }
            }
          }

          tradeSubtotals.push({
            tradeId: trade.id,
            tradeName: trade.name,
            tradeColor: trade.color,
            packageName: pkg.name,
            packagePrice: pkg.price,
            addOnsTotal: tradeAddOnsTotal,
          });
        }
      }
    }

    const packageLabel = packageLabels.length > 0
      ? packageLabels.join(' + ')
      : 'No package selected';

    const selectedTradeCount = activeTrades.filter(
      (t) => selections.tradeSelections[t.id]
    ).length;
    const bundleDiscount = proposal.bundleDiscount;
    const bundleDiscountAmount =
      bundleDiscount && selectedTradeCount >= bundleDiscount.minTrades
        ? bundleDiscount.amount
        : 0;

    const grandTotal = packageTotal + addOnsTotal - bundleDiscountAmount;

    let monthlyPayment: number | undefined;
    let financingLabel: string | undefined;
    if (selections.paymentMethod === 'finance' && selections.selectedFinancingId) {
      const financing = proposal.financing.find(
        (f) => f.id === selections.selectedFinancingId
      );
      if (financing) {
        const r = financing.apr / 100 / 12;
        const n = financing.termMonths;
        monthlyPayment = r > 0
          ? Math.round((grandTotal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1))
          : Math.round(grandTotal / n);
        financingLabel = `${financing.providerName} — ${financing.apr}% APR, ${financing.termMonths} months`;
      }
    }

    return {
      packageTotal,
      packageLabel,
      addOnsTotal,
      addOnItems,
      grandTotal,
      monthlyPayment,
      financingLabel,
      tradeSubtotals,
      bundleDiscountAmount,
    };
  }, [proposal, selections]);
}
