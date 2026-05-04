import { motion } from 'framer-motion';
import { Check, Mail, MessageSquare, Phone, Clock, RotateCcw } from 'lucide-react';
import type { ContractorInfo, CustomerInfo } from '../types/proposal.types';

export type OutcomeKind = 'declined' | 'change-requested';

interface OutcomeScreenProps {
  kind: OutcomeKind;
  contractor: ContractorInfo;
  customer: CustomerInfo;
  detail?: string;
  onUndo?: () => void;
}

interface OutcomeCopy {
  iconBg: string;
  iconColor: string;
  nextStepIconColor: string;
  Icon: typeof Mail;
  title: (firstName: string) => string;
  body: (contractorName: string) => string;
  nextSteps: (contractor: ContractorInfo, customerEmail: string) => Array<{
    Icon: typeof Mail;
    title: string;
    desc: string;
  }>;
  undoLabel?: string;
}

const COPY: Record<OutcomeKind, OutcomeCopy> = {
  declined: {
    iconBg: 'bg-[var(--border-default)]',
    iconColor: 'text-[var(--body)]',
    nextStepIconColor: 'text-[var(--body)]',
    Icon: Check,
    title: (firstName) => `Thanks for letting us know, ${firstName}.`,
    body: (contractorName) =>
      `Your decision has been sent to ${contractorName}. They've been notified and won't proceed — no contract has been signed.`,
    nextSteps: (contractor, customerEmail) => [
      {
        Icon: Mail,
        title: 'Confirmation emailed',
        desc: `A copy of your response was sent to ${customerEmail}.`,
      },
      {
        Icon: Phone,
        title: 'Want to talk?',
        desc: contractor.phone
          ? `Call ${contractor.name} at ${contractor.phone} if anything changes.`
          : `Reach out to ${contractor.name} any time if anything changes.`,
      },
    ],
    undoLabel: 'Undo decline',
  },
  'change-requested': {
    iconBg: 'bg-[var(--brand-primary)]/10',
    iconColor: 'text-[var(--brand-primary)]',
    nextStepIconColor: 'text-[var(--brand-primary)]',
    Icon: MessageSquare,
    title: (firstName) => `Your request is on its way, ${firstName}.`,
    body: (contractorName) =>
      `${contractorName} will review your changes and follow up shortly. Your selections aren't submitted yet — you can revisit this proposal once it's been updated.`,
    nextSteps: (contractor, customerEmail) => [
      {
        Icon: Clock,
        title: 'Typical response',
        desc: 'Most contractors reply within one business day.',
      },
      {
        Icon: Mail,
        title: 'Updates by email',
        desc: `We'll notify you at ${customerEmail} when the proposal is updated.`,
      },
      {
        Icon: Phone,
        title: 'Need to add something?',
        desc: contractor.phone
          ? `Call ${contractor.name} at ${contractor.phone}.`
          : `Reach out to ${contractor.name} directly.`,
      },
    ],
    undoLabel: 'Back to proposal',
  },
};

export function OutcomeScreen({ kind, contractor, customer, detail, onUndo }: OutcomeScreenProps) {
  const copy = COPY[kind];
  const firstName = customer.name.split(' ')[0] || customer.name;
  const Icon = copy.Icon;

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 18 }}
          className={`w-16 h-16 rounded-full mx-auto mb-7 flex items-center justify-center ${copy.iconBg}`}
        >
          <Icon className={`w-7 h-7 ${copy.iconColor}`} strokeWidth={2} />
        </motion.div>

        <h1 className="text-3xl sm:text-[32px] font-serif text-[var(--heading)] leading-tight mb-3">
          {copy.title(firstName)}
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed mb-8">
          {copy.body(contractor.name)}
        </p>

        {detail && (
          <div className="text-left bg-white border border-[var(--border-default)] rounded-xl p-4 mb-6">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--body-light)] font-sans font-medium mb-1.5">
              {kind === 'declined' ? 'Reason shared' : 'Your message'}
            </p>
            <p className="text-sm text-[var(--heading)] font-sans leading-relaxed whitespace-pre-line">
              {detail}
            </p>
          </div>
        )}

        <div className="bg-white rounded-xl border border-[var(--border-default)] p-5 sm:p-6 text-left space-y-4">
          <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--body-light)] font-sans font-medium">
            What's next
          </p>

          {copy.nextSteps(contractor, customer.email).map((step, idx) => {
            const StepIcon = step.Icon;
            return (
              <div key={idx} className="flex items-start gap-3">
                <StepIcon className={`w-5 h-5 mt-0.5 shrink-0 ${copy.nextStepIconColor}`} />
                <div>
                  <p className="text-sm font-medium text-[var(--heading)] font-sans">
                    {step.title}
                  </p>
                  <p className="text-sm text-[var(--body)] font-sans leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {onUndo && copy.undoLabel && (
          <button
            type="button"
            onClick={onUndo}
            className="mt-6 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium font-sans text-[var(--body)] hover:text-[var(--heading)] hover:bg-white border border-transparent hover:border-[var(--border-default)] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {copy.undoLabel}
          </button>
        )}
      </motion.div>
    </div>
  );
}
