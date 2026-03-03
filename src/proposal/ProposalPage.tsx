import { useState, useMemo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ProposalStepper } from './components/ProposalStepper';
import { StickyPriceCTA } from './components/StickyPriceCTA';
import { TrustBadges } from './components/TrustBadges';
import { SuccessScreen } from './components/SuccessScreen';
import { ReviewStep } from './steps/ReviewStep';
import { PackageStep } from './steps/PackageStep';
import { ConfigureStep } from './steps/ConfigureStep';
import { AddOnsStep } from './steps/AddOnsStep';
import { PaymentStep } from './steps/PaymentStep';
import { SignStep } from './steps/SignStep';
import { useProposalState } from './hooks/useProposalState';
import { usePriceCalculation } from './hooks/usePriceCalculation';
import { useStepNavigation } from './hooks/useStepNavigation';
import { mockProposalV2 } from './data/mockData';

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
  }),
};

export default function ProposalPage() {
  const proposal = mockProposalV2;
  const state = useProposalState(proposal);
  const nav = useStepNavigation();
  const breakdown = usePriceCalculation(proposal, state.selections);
  const [acknowledged, setAcknowledged] = useState(false);

  const adaptiveLabel = useMemo(() => {
    const activeTrades = proposal.trades.filter(
      (t) => !state.selections.skippedTradeIds.includes(t.id)
    );
    const selectedTrades = activeTrades.filter(
      (t) => state.selections.tradeSelections[t.id]?.packageId
    );
    const pendingTrades = activeTrades.filter(
      (t) => !state.selections.tradeSelections[t.id]?.packageId
    );

    if (selectedTrades.length === 0) return 'No package selected';

    const selectedNames = selectedTrades.map((t) => {
      const sel = state.selections.tradeSelections[t.id];
      const pkg = t.packages.find((p) => p.id === sel?.packageId);
      return pkg?.name || t.name;
    });

    if (pendingTrades.length > 0 && proposal.trades.length > 1) {
      return `${selectedNames.join(' + ')} · ${pendingTrades.map((t) => t.name).join(', ')} pending`;
    }

    const addOnCount = state.selections.selectedAddOnIds.length;
    if (addOnCount > 0 && proposal.trades.length > 1) {
      return `${selectedTrades.length} trades · ${addOnCount} add-on${addOnCount > 1 ? 's' : ''}`;
    }

    return selectedNames.join(' + ');
  }, [proposal, state.selections]);

  if (state.isComplete) {
    return (
      <SuccessScreen
        contractor={proposal.contractorInfo}
        customer={proposal.customer}
      />
    );
  }

  const ctaLabels: Record<string, string> = {
    review: '',
    package: 'Continue to Configure',
    configure: 'Continue to Add-ons',
    addons: 'Continue to Payment',
    payment: 'Review & Sign',
    sign: '',
  };

  const canProceed = (() => {
    const step = nav.currentStep;
    if (step.id === 'review') return acknowledged;
    if (step.id === 'package') {
      const activeTrades = proposal.trades.filter(
        (t) => !state.selections.skippedTradeIds.includes(t.id)
      );
      return activeTrades.every(
        (t) => !!state.selections.tradeSelections[t.id]?.packageId
      );
    }
    if (step.id === 'configure') {
      const activeTrades = proposal.trades.filter(
        (t) => !state.selections.skippedTradeIds.includes(t.id)
      );
      return activeTrades.every((trade) => {
        const sel = state.selections.tradeSelections[trade.id];
        if (!sel) return false;
        const pkg = trade.packages.find((p) => p.id === sel.packageId);
        if (!pkg) return false;
        return pkg.configGroups.every(
          (group) => !!sel.configSelections[group.id]
        );
      });
    }
    if (step.id === 'payment' && state.selections.paymentMethod === 'finance') {
      return !!state.selections.selectedFinancingId;
    }
    return true;
  })();

  const hideStickyBar = nav.currentStep.id === 'sign' || nav.currentStep.id === 'review';

  const renderStep = () => {
    switch (nav.currentStep.id) {
      case 'review':
        return (
          <ReviewStep
            proposal={proposal}
            acknowledged={acknowledged}
            onAcknowledge={setAcknowledged}
            onContinue={nav.goNext}
          />
        );
      case 'package':
        return (
          <PackageStep
            proposal={proposal}
            selections={state.selections}
            onSelectPackage={state.selectPackage}
            onSkipTrade={state.skipTrade}
            onRestoreTrade={state.restoreTrade}
            bundleDiscount={proposal.bundleDiscount}
          />
        );
      case 'configure':
        return (
          <ConfigureStep
            proposal={proposal}
            selections={state.selections}
            onSelectConfig={state.selectConfig}
          />
        );
      case 'addons':
        return (
          <AddOnsStep
            proposal={proposal}
            selections={state.selections}
            onToggleAddOn={state.toggleAddOn}
            onSelectAddOnConfig={state.selectAddOnConfig}
          />
        );
      case 'payment':
        return (
          <PaymentStep
            proposal={proposal}
            selections={state.selections}
            grandTotal={breakdown.grandTotal}
            onSetPaymentMethod={state.setPaymentMethod}
            onSelectFinancing={state.selectFinancing}
          />
        );
      case 'sign':
        return (
          <SignStep
            proposal={proposal}
            selections={state.selections}
            breakdown={breakdown}
            onSign={(sig) => {
              state.setSignature(sig);
              state.completeProposal();
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--surface)]">
      <div className="bg-white border-b border-[var(--border-default)]">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 py-3">
          <TrustBadges contractor={proposal.contractorInfo} variant="header" />
        </div>
      </div>

      <ProposalStepper
        steps={nav.steps}
        currentStep={nav.currentStepIndex}
        completedSteps={nav.completedSteps}
        onStepClick={nav.goToStep}
      />

      <AnimatePresence mode="wait" custom={1}>
        <motion.div
          key={nav.currentStepIndex}
          custom={1}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>

      {!hideStickyBar && (
        <StickyPriceCTA
          currentTotal={breakdown.grandTotal}
          label={adaptiveLabel}
          ctaLabel={ctaLabels[nav.currentStep.id] || 'Continue'}
          onContinue={nav.goNext}
          onBack={nav.goBack}
          showBack={!nav.isFirstStep}
          disabled={!canProceed}
        />
      )}
    </div>
  );
}
