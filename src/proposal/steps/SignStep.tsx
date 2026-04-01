import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Check, CheckCircle2 } from 'lucide-react';
import { OrderSummary } from '../components/OrderSummary';
import { SignaturePad } from '../components/SignaturePad';
import { TrustBadges } from '../components/TrustBadges';
import type {
  AcknowledgedPageSnapshot,
  Proposal,
  ProposalSelections,
} from '../types/proposal.types';
import type { PriceBreakdown } from '../hooks/usePriceCalculation';

interface SignStepProps {
  proposal: Proposal;
  selections: ProposalSelections;
  breakdown: PriceBreakdown;
  onSign: (signatureData: string) => void;
  acknowledgedPages?: AcknowledgedPageSnapshot[];
}

export function SignStep({
  proposal,
  selections,
  breakdown,
  onSign,
  acknowledgedPages = [],
}: SignStepProps) {
  const [signatureData, setSignatureData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const currentSigner = proposal.signers.find((s) => s.status === 'current') || proposal.signers[0];

  const handleSubmit = () => {
    if (!signatureData) return;
    setIsSubmitting(true);
    setTimeout(() => {
      onSign(signatureData);
    }, 600);
  };

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-6 pt-10 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--heading)] mb-2">
          Review & Sign
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed max-w-lg">
          Review your selections below, then sign to accept the proposal.
        </p>
      </motion.div>

      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        className="mb-8"
      >
        <OrderSummary proposal={proposal} selections={selections} breakdown={breakdown} />
      </motion.div>

      {/* Acknowledged proposal pages (from review step) */}
      {acknowledgedPages.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.4 }}
          className="mb-8 rounded-xl border border-[var(--border-default)] bg-white p-5 sm:p-6"
        >
          <h3 className="text-sm font-semibold text-[var(--heading)] font-sans mb-1">
            Document acknowledgements
          </h3>
          <p className="text-xs text-[var(--body-light)] font-sans mb-4 leading-relaxed">
            Your signature below applies to each section you acknowledged during review.
          </p>
          <ul className="space-y-4">
            {acknowledgedPages.map((page) => (
              <li
                key={page.pageId}
                className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4 pb-4 border-b border-[var(--border-default)] last:border-0 last:pb-0"
              >
                <div className="flex gap-3 min-w-0 flex-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[var(--heading)] font-sans">
                      {page.pageTitle}
                    </p>
                    <p className="text-xs text-[var(--body)] font-sans mt-1 leading-relaxed">
                      {page.acknowledgementText}
                    </p>
                  </div>
                </div>
                <div className="shrink-0 sm:w-36 h-12 rounded-md border border-dashed border-[var(--border-default)] bg-[var(--surface)] flex items-center justify-center overflow-hidden pl-2 pr-2">
                  {signatureData ? (
                    <img
                      src={signatureData}
                      alt=""
                      className="max-h-10 w-auto object-contain opacity-90"
                    />
                  ) : (
                    <span className="text-[10px] text-[var(--body-light)] font-sans text-center leading-tight">
                      Signature preview
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      )}

      {/* Signer Info */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="bg-white rounded-xl border border-[var(--border-default)] p-6 sm:p-8 mb-8"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
          </div>
          <div>
            <h3 className="text-lg font-serif text-[var(--heading)]">Signature Required</h3>
            <p className="text-sm text-[var(--body)] font-sans mt-1 leading-relaxed">
              {acknowledgedPages.length > 0 ? (
                <>
                  You acknowledged each section above during review. By signing below, you confirm
                  those statements and agree to the proposal terms, and you authorize{' '}
                  <strong>{proposal.contractorInfo.name}</strong> to proceed with the work as
                  described.
                </>
              ) : (
                <>
                  By signing below, you agree to the proposal terms and authorize{' '}
                  <strong>{proposal.contractorInfo.name}</strong> to proceed with the work as
                  described.
                </>
              )}
            </p>
            {proposal.termsUrl && (
              <a href={proposal.termsUrl} className="text-sm font-sans mt-1 inline-block underline" style={{ color: 'var(--brand-primary)' }}>
                View Full Terms
              </a>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-[var(--surface)] rounded-lg">
          <div>
            <span className="text-xs text-[var(--body-light)] font-sans uppercase tracking-wide">Signer</span>
            <p className="text-sm font-medium text-[var(--heading)] font-sans mt-1">{currentSigner.name}</p>
          </div>
          <div>
            <span className="text-xs text-[var(--body-light)] font-sans uppercase tracking-wide">Date</span>
            <p className="text-sm font-medium text-[var(--heading)] font-sans mt-1">{today}</p>
          </div>
        </div>

        <SignaturePad onSignatureChange={setSignatureData} />

        <motion.button
          onClick={handleSubmit}
          disabled={!signatureData || isSubmitting}
          whileHover={signatureData ? { scale: 1.01 } : {}}
          whileTap={signatureData ? { scale: 0.99 } : {}}
          className={`mt-6 w-full py-4 rounded-xl text-base font-medium font-sans flex items-center justify-center gap-2 transition-all duration-200 ${
            signatureData && !isSubmitting
              ? 'bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-hover)] shadow-md hover:shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <>
              <Check className="w-5 h-5" strokeWidth={3} />
              Sign & Accept Proposal
            </>
          )}
        </motion.button>

        <p className="text-xs text-[var(--body-light)] font-sans text-center mt-3">
          You'll receive a confirmation email at {currentSigner.email}
        </p>
      </motion.div>

      <TrustBadges contractor={proposal.contractorInfo} variant="payment" />
    </div>
  );
}
