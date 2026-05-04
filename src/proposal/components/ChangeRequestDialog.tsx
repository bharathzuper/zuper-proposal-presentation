import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, MessageSquare, Plus } from 'lucide-react';
import { ProposalDialog } from './ProposalDialog';

export interface ChangeRequestSubmission {
  message: string;
  topics: string[];
}

interface SelectionSummaryItem {
  trade: string;
  packageName: string;
}

interface ChangeRequestDialogProps {
  open: boolean;
  onClose: () => void;
  contractorName: string;
  selections: SelectionSummaryItem[];
  onSubmit: (submission: ChangeRequestSubmission) => void | Promise<void>;
}

const QUICK_TOPICS = [
  'Lower the price',
  'Different materials',
  'Adjust the timeline',
  'Reduce the scope',
  'Different warranty',
  'Payment plan options',
];

const MIN_LENGTH = 10;
const MAX_LENGTH = 1000;

export function ChangeRequestDialog({
  open,
  onClose,
  contractorName,
  selections,
  onSubmit,
}: ChangeRequestDialogProps) {
  const [message, setMessage] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = message.trim().length >= MIN_LENGTH && !submitting;

  const toggleTopic = (topic: string) => {
    setTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const handleClose = () => {
    if (submitting) return;
    setMessage('');
    setTopics([]);
    onClose();
  };

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setSubmitting(true);
    await onSubmit({ message: message.trim(), topics });
    setSubmitting(false);
  };

  return (
    <ProposalDialog
      open={open}
      onClose={handleClose}
      locked={submitting}
      ariaLabel="Request changes"
    >
      <div className="px-6 sm:px-7 pt-7 pb-2">
        <div className="w-11 h-11 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center mb-4">
          <MessageSquare className="w-5 h-5 text-[var(--brand-primary)]" strokeWidth={2} />
        </div>
        <h2 className="text-2xl font-serif text-[var(--heading)] leading-tight">
          Request changes
        </h2>
        <p className="text-sm text-[var(--body)] font-sans mt-2 leading-relaxed">
          Tell {contractorName} what you'd like adjusted. They'll review and follow up — your
          selections won't be submitted yet.
        </p>
      </div>

      <div className="px-6 sm:px-7 pb-6 overflow-y-auto flex-1">
        {selections.length > 0 && (
          <div className="mt-5 mb-5 px-3.5 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border-default)]">
            <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--body-light)] font-sans font-medium mb-1.5">
              Your current selection
            </p>
            <ul className="space-y-1">
              {selections.map((s) => (
                <li
                  key={s.trade}
                  className="text-sm font-sans flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-primary)] shrink-0" />
                  <span className="font-medium text-[var(--heading)]">{s.trade}</span>
                  <span className="text-[var(--body)]">— {s.packageName}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <p className="text-[11px] uppercase tracking-[0.1em] text-[var(--body-light)] font-sans font-medium mt-5 mb-2">
          Quick topics
        </p>
        <div className="flex flex-wrap gap-2 mb-5">
          {QUICK_TOPICS.map((topic) => {
            const active = topics.includes(topic);
            return (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopic(topic)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-sans border transition-all duration-200 ease-out ${
                  active
                    ? 'bg-[var(--brand-primary)] text-white border-[var(--brand-primary)]'
                    : 'bg-white text-[var(--body)] border-[var(--border-default)] hover:border-[var(--body-light)]'
                }`}
              >
                <Plus
                  className={`w-3.5 h-3.5 transition-transform duration-200 ease-out ${
                    active ? 'rotate-45' : ''
                  }`}
                  strokeWidth={2.5}
                />
                {topic}
              </button>
            );
          })}
        </div>

        <label htmlFor="change-request-message" className="block mb-1.5">
          <span className="text-[11px] uppercase tracking-[0.1em] text-[var(--body-light)] font-sans font-medium">
            What would you like to change?
          </span>
        </label>
        <textarea
          id="change-request-message"
          value={message}
          onChange={(e) => setMessage(e.target.value.slice(0, MAX_LENGTH))}
          placeholder="Be specific so we can update the proposal accurately…"
          rows={4}
          className="w-full text-sm font-sans text-[var(--heading)] bg-[var(--surface)] border border-[var(--border-default)] rounded-lg px-3 py-2.5 placeholder:text-[var(--body-light)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-primary)]/30 focus:border-[var(--brand-primary)] resize-none"
        />
        <div className="flex items-center justify-between mt-1.5">
          <span className="text-[11px] text-[var(--body-light)] font-sans">
            {message.trim().length > 0 && message.trim().length < MIN_LENGTH
              ? `Add at least ${MIN_LENGTH - message.trim().length} more character${
                  MIN_LENGTH - message.trim().length === 1 ? '' : 's'
                }`
              : ' '}
          </span>
          <span className="text-[11px] text-[var(--body-light)] font-sans tabular-nums">
            {message.length} / {MAX_LENGTH}
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
              ? 'bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] shadow-sm'
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
              Send request
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </div>
    </ProposalDialog>
  );
}
