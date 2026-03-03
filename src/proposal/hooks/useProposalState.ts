import { useState, useCallback } from 'react';
import type { Proposal, ProposalSelections } from '../types/proposal.types';

function getInitialSelections(proposal: Proposal): ProposalSelections {
  const tradeSelections: ProposalSelections['tradeSelections'] = {};
  const isMultiTrade = proposal.trades.length > 1;

  for (const trade of proposal.trades) {
    if (isMultiTrade) {
      // Multi-trade: don't auto-select — customer must explicitly choose per trade
      continue;
    }
    const recommended = trade.packages.find((p) => p.isRecommended);
    const defaultPkg = recommended || trade.packages[0];
    if (defaultPkg) {
      const configSelections: Record<string, string> = {};
      for (const group of defaultPkg.configGroups) {
        if (group.selectedOptionId) {
          configSelections[group.id] = group.selectedOptionId;
        }
      }
      tradeSelections[trade.id] = {
        packageId: defaultPkg.id,
        configSelections,
      };
    }
  }

  return {
    tradeSelections,
    selectedAddOnIds: [],
    addOnConfigSelections: {},
    paymentMethod: 'full',
    skippedTradeIds: [],
  };
}

export function useProposalState(proposal: Proposal) {
  const [selections, setSelections] = useState<ProposalSelections>(() =>
    getInitialSelections(proposal)
  );
  const [isComplete, setIsComplete] = useState(false);

  const selectPackage = useCallback(
    (tradeId: string, packageId: string) => {
      setSelections((prev) => {
        const trade = proposal.trades.find((t) => t.id === tradeId);
        const pkg = trade?.packages.find((p) => p.id === packageId);
        const configSelections: Record<string, string> = {};
        if (pkg) {
          for (const group of pkg.configGroups) {
            if (group.selectedOptionId) {
              configSelections[group.id] = group.selectedOptionId;
            }
          }
        }
        return {
          ...prev,
          tradeSelections: {
            ...prev.tradeSelections,
            [tradeId]: { packageId, configSelections },
          },
        };
      });
    },
    [proposal]
  );

  const selectConfig = useCallback(
    (tradeId: string, configGroupId: string, optionId: string) => {
      setSelections((prev) => ({
        ...prev,
        tradeSelections: {
          ...prev.tradeSelections,
          [tradeId]: {
            ...prev.tradeSelections[tradeId],
            configSelections: {
              ...prev.tradeSelections[tradeId]?.configSelections,
              [configGroupId]: optionId,
            },
          },
        },
      }));
    },
    []
  );

  const toggleAddOn = useCallback((addOnId: string) => {
    setSelections((prev) => {
      const isSelected = prev.selectedAddOnIds.includes(addOnId);
      return {
        ...prev,
        selectedAddOnIds: isSelected
          ? prev.selectedAddOnIds.filter((id) => id !== addOnId)
          : [...prev.selectedAddOnIds, addOnId],
      };
    });
  }, []);

  const selectAddOnConfig = useCallback(
    (addOnId: string, subOptionId: string, optionId: string) => {
      setSelections((prev) => ({
        ...prev,
        addOnConfigSelections: {
          ...prev.addOnConfigSelections,
          [addOnId]: {
            ...prev.addOnConfigSelections[addOnId],
            [subOptionId]: optionId,
          },
        },
      }));
    },
    []
  );

  const setPaymentMethod = useCallback(
    (method: 'full' | 'finance') => {
      setSelections((prev) => ({ ...prev, paymentMethod: method }));
    },
    []
  );

  const selectFinancing = useCallback((financingId: string) => {
    setSelections((prev) => ({
      ...prev,
      paymentMethod: 'finance',
      selectedFinancingId: financingId,
    }));
  }, []);

  const setSignature = useCallback((data: string) => {
    setSelections((prev) => ({ ...prev, signatureData: data }));
  }, []);

  const skipTrade = useCallback((tradeId: string) => {
    setSelections((prev) => {
      const newTradeSelections = { ...prev.tradeSelections };
      delete newTradeSelections[tradeId];

      const trade = proposal.trades.find((t) => t.id === tradeId);
      const tradeAddOnIds = trade?.tradeAddOns?.map((a) => a.id) ?? [];
      const newSelectedAddOnIds = prev.selectedAddOnIds.filter(
        (id) => !tradeAddOnIds.includes(id)
      );

      return {
        ...prev,
        tradeSelections: newTradeSelections,
        selectedAddOnIds: newSelectedAddOnIds,
        skippedTradeIds: prev.skippedTradeIds.includes(tradeId)
          ? prev.skippedTradeIds
          : [...prev.skippedTradeIds, tradeId],
      };
    });
  }, [proposal]);

  const restoreTrade = useCallback((tradeId: string) => {
    setSelections((prev) => {
      const trade = proposal.trades.find((t) => t.id === tradeId);
      const recommended = trade?.packages.find((p) => p.isRecommended);
      const defaultPkg = recommended || trade?.packages[0];
      const configSelections: Record<string, string> = {};
      if (defaultPkg) {
        for (const group of defaultPkg.configGroups) {
          if (group.selectedOptionId) {
            configSelections[group.id] = group.selectedOptionId;
          }
        }
      }

      return {
        ...prev,
        tradeSelections: {
          ...prev.tradeSelections,
          ...(defaultPkg
            ? { [tradeId]: { packageId: defaultPkg.id, configSelections } }
            : {}),
        },
        skippedTradeIds: prev.skippedTradeIds.filter((id) => id !== tradeId),
      };
    });
  }, [proposal]);

  const completeProposal = useCallback(() => {
    setIsComplete(true);
  }, []);

  return {
    selections,
    isComplete,
    selectPackage,
    selectConfig,
    toggleAddOn,
    selectAddOnConfig,
    setPaymentMethod,
    selectFinancing,
    setSignature,
    skipTrade,
    restoreTrade,
    completeProposal,
  };
}
