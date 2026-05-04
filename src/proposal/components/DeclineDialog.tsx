import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, Mail } from 'lucide-react';
import { ProposalDialog } from './ProposalDialog';

export interface DeclineSubmission {
  reasonId: DeclineReasonId;
  reasonLabel: string;
  comment: string;
}

type DeclineReasonId =
  | 'price'
  | 'timeline'
  | 'other-contractor'
  | 'scope'
  | 'not-ready'
  | 'other';

const REASONS: { id: DeclineReasonId; label: string; sub: string }[] = [
  { id: 'price', label: 'Pricing is outside my budget', sub: 'Total cost or payment terms' },
  { id: 'timeline', label: "Timeline doesn't work", sub: 'Start date, duration, or scheduling' },
  { id: 'other-contractor', label: 'Going with another contractor', sub: 'Chose a different provider' },
  { id: 'scope', label: "Scope doesn't match my needs", sub: 'Wrong materials, services, or coverage' },
  { id: 'not-ready', label: 'Need more time to decide', sub: 'Not ready to commit yet' },
  { id: 'other', label: 'Something else', sub: "We'll ask you to share details" },
];

interface DeclineDialogProps {
  open: boolean;
  onClose: () => void;
  contractorName: string;
  onSubmit: (submission: DeclineSubmission) => void | Promise<void>;
}

export function DeclineDialog({ open, onClose, contractorName, onSubmit }: DeclineDialogProps) {
  const [reasonId, setReasonId] = useState<DeclineReasonId | null>(null);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const otherRequired = reasonId === 'other';
  const canSubmit =
    !!reasonId && (!otherRequired || comment.trim().length >= 4) && !submitting;

  const handleClose = () => {
    if (submitting) return;
    setReasonId(null);
    setComment('');
    onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit || !reasonId) return;
    const reason = REASONS.find((r) => r.id === reasonId);
    if (!reason) return;
    setSubmitting(true);
    await onSubmit({
      reasonId,
      reasonLabel: reason.label,
      comment: comment.trim(),
    });
    setSubmitting(false);
  };

  return (
    <ProposalDialog open={open} onClose={handleClose} locked={submitting} ariaLabel="Decline proposal">
      <div className="px-6 sm:px-7 pt-7 pb-2">
        <div className="w-11 h-11 rounded-full bg-[var(--border-default)] flex items-center justify-center mb-4">
          <Mail className="w-5 h-5 text-[var(--body)]" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-serif text-[var(--heading)] leading-tight">
          Decline this proposal
        </h2>
        <p className="text-sm text-[var(--body)] font-sans mt-2 leading-relaxed">
          Your feedback helps {contractorName} understand and improve. They'll be notified — no
          contract is signed.
        </p>
      </div>

      <div className="px-6 sm:px-7 pb-6 overflow-y-auto flex-1">
        <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--body-light)] font-sans font-medium mt-5 mb-2">
          Reason for declining
        </p>
        <div className="space-y-2">
          {REASONS.map((reason) => {
            const isSelected = reasonId === reason.id;
            return (
              <button
                key={reason.id}
                type="button"
                onClick={() => setReasonId(reason.id)}
                className={`w-full text-left flex items-start gap-3 px-3.5 py-3 rounded-lg border transition-colors font-sans ${
                  isSelected
                    ? 'border-[var(--brand-primary)] bg-[var(--brand-primary)]/5'
                    : 'border-[var(--border-default)] hover:border-[var(--body-light)] bg-white'
                }`}
              >
                <span
                  className={`mt-1 w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors ${
                    isSelected ? 'border-[var(--brand-primary)]' : 'border-[var(--border-default)]'
                  }`}
                >
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)]" />
                  )}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm text-[var(--heading)]">{reason.label}</span>
                  <span className="block text-xs text-[var(--body-light)] mt-0.5">{reason.sub}</span>
                </span>
              </button>
            );
          })}
        </div>

        <label htmlFor="decline-comment" className="block mt-5 mb-1.5">
          <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--body-light)] font-sans font-medium">
            Additional details
            {!otherRequired && (
              <span className="ml-1 text-[var(--body-light)]/70 normal-case tracking-normal">
                (optional)
              </span>
            )}
          </span>
        </label>
        <textarea
          id="decline-comment"
          value={comment}
          onChange={(e) => setComment(e.target.value.slice(0, 500))}
          placeholder={
            otherRequired
              ? 'Please share what made you decline…'
              : 'Anything else you want to share?'
          }
          rows={3}
          className="w-full text-sm font-sans text-[var(--heading)] bg-[var(--surface)] border border-[var(--border-default)] rounded-lg px-3 py-2.5 placeholder:text-[var(--body-light)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30 focus:border-[var(--brand-primary)] resize-none"
        />
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-[var(--body-light)] font-sans">
            {otherRequired && comment.trim().length < 4
              ? 'A short note helps the contractor follow up.'
              : ''}
          </span>
          <span className="text-[11px] text-[var(--body-light)] font-sans tabular-nums">
            {comment.length} / 500
          </span>
        </div>
      </div>

      <div className="px-6 sm:px-7 py-4 border-t border-[var(--border-default)] bg-[var(--surface)]/60 flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-3">
        <button
          type="button"
          onClick={handleClose}
          disabled={submitting}
          className="px-4 py-2.5 rounded-lg text-sm font-medium font-sans text-[var(--body)] hover:text-[var(--heading)] hover:bg-white transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          whileHover={canSubmit ? { scale: 1.02 } : {}}
          whileTap={canSubmit ? { scale: 0.98 } : {}}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium font-sans transition-colors ${
            canSubmit
              ? 'bg-[var(--heading)] text-white hover:bg-[#0F0F0F] shadow-sm'
              : 'bg-[var(--border-default)] text-[var(--body-light)] cursor-not-allowed'
          }`}
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending…
            </>
          ) : (
            <>
              Submit decline
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </ProposalDialog>
  );
}
