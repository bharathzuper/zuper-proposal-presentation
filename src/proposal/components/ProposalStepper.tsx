import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Step } from '../types/proposal.types';

interface ProposalStepperProps {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (index: number) => void;
}

export function ProposalStepper({ steps, currentStep, completedSteps, onStepClick }: ProposalStepperProps) {
  const progress = steps.length > 1 ? (currentStep / (steps.length - 1)) * 100 : 0;

  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--border-default)]">
      {/* Mobile: compact view */}
      <div className="flex sm:hidden items-center justify-between px-5 py-3">
        <span className="text-sm text-[var(--body-light)] font-sans">
          Step {currentStep + 1} of {steps.length}
        </span>
        <span className="text-sm font-medium text-[var(--heading)] font-sans">
          {steps[currentStep]?.label}
        </span>
      </div>

      {/* Desktop: full stepper */}
      <div className="hidden sm:block max-w-3xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, i) => {
            const isCompleted = completedSteps.includes(i);
            const isCurrent = i === currentStep;
            const isClickable = isCompleted || i < currentStep;

            return (
              <div key={`${step.id}-${i}`} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => isClickable && onStepClick(i)}
                  disabled={!isClickable && !isCurrent}
                  className={`flex items-center gap-2.5 group transition-all duration-200 ${
                    isClickable ? 'cursor-pointer' : isCurrent ? 'cursor-default' : 'cursor-default opacity-40'
                  }`}
                >
                  <motion.div
                    initial={false}
                    animate={{
                      scale: isCurrent ? 1 : 0.9,
                      backgroundColor: isCompleted
                        ? 'var(--brand-success)'
                        : isCurrent
                        ? 'var(--brand-primary)'
                        : '#E8E4DF',
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0"
                  >
                    {isCompleted ? (
                      <Check className="w-4 h-4 text-white" strokeWidth={3} />
                    ) : (
                      <span className={isCurrent ? 'text-white' : 'text-[var(--body-light)]'}>
                        {i + 1}
                      </span>
                    )}
                  </motion.div>
                  <span
                    className={`text-sm font-sans whitespace-nowrap transition-colors ${
                      isCurrent
                        ? 'font-medium text-[var(--heading)]'
                        : isCompleted
                        ? 'text-[var(--brand-success)]'
                        : 'text-[var(--body-light)]'
                    }`}
                  >
                    {step.label}
                  </span>
                </button>
                {i < steps.length - 1 && (
                  <div className="flex-1 h-px bg-[var(--border-default)] mx-4" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[2px] bg-[var(--border-light)]">
        <motion.div
          className="h-full"
          style={{ backgroundColor: 'var(--brand-primary)' }}
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
}
