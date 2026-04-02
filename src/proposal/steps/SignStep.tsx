import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FileText, Check } from 'lucide-react';
import { OrderSummary } from '../components/OrderSummary';
import { SignaturePad } from '../components/SignaturePad';
import { TrustBadges } from '../components/TrustBadges';
import type { AcknowledgedPageSnapshot, Proposal, ProposalSelections } from '../types/proposal.types';
import type { PriceBreakdown } from '../hooks/usePriceCalculation';
import { useAcknowledgementSettings } from '../context/AcknowledgementSettingsContext';

interface SignStepProps {
  proposal: Proposal;
  selections: ProposalSelections;
  breakdown: PriceBreakdown;
  onSign: (signatureData: string) => void;
}

export function SignStep({ proposal, selections, breakdown, onSign }: SignStepProps) {
  const { settings: ackSettings } = useAcknowledgementSettings();

  /** Page-level statements the signer affirms when they sign (from admin/settings, not review step). */
  const acknowledgementPages = useMemo((): AcknowledgedPageSnapshot[] => {
    if (!ackSettings.enabled) return [];
    return ackSettings.pages
      .filter((p) => p.requiresAcknowledgement)
      .map((p) => ({
        pageId: p.pageId,
        pageTitle: p.pageTitle,
        acknowledgementText:
          p.acknowledgementText.trim() ||
          'I acknowledge that I have reviewed this section of the proposal.',
      }));
  }, [ackSettings]);

  const [signatureData, setSignatureData] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [checkedAcks, setCheckedAcks] = useState<Set<string>>(() => new Set());

  const allAcksChecked =
    acknowledgementPages.length === 0 || checkedAcks.size === acknowledgementPages.length;

  const toggleAck = (pageId: string) => {
    setCheckedAcks((prev) => {
      const next = new Set(prev);
      if (next.has(pageId)) next.delete(pageId);
      else next.add(pageId);
      return next;
    });
  };
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
          Review your selections, sign below, confirm each acknowledgement, and accept.
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

      {/* Sign & Acknowledge */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="bg-white rounded-xl border border-[var(--border-default)] p-6 sm:p-8 mb-8"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 rounded-full bg-[var(--brand-primary-light)] flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" style={{ color: 'var(--brand-primary)' }} />
          </div>
          <div>
            <h3 className="text-lg font-serif text-[var(--heading)]">Sign & Accept</h3>
            <p className="text-sm text-[var(--body)] font-sans mt-1 leading-relaxed">
              Sign below, confirm each acknowledgement, then accept the proposal to authorize{' '}
              <strong>{proposal.contractorInfo.name}</strong> to proceed.
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

        {/* Acknowledgements */}
        {acknowledgementPages.length > 0 && (
          <div className="mt-8 pt-6 border-t border-[var(--border-default)]">
            <p className="text-sm text-[var(--body)] font-sans mb-4">
              I understand that my signature/initials will be applied to:
            </p>
            <ul className="space-y-2.5">
              {acknowledgementPages.map((page) => {
                const isChecked = checkedAcks.has(page.pageId);
                return (
                  <li key={page.pageId}>
                    <button
                      type="button"
                      onClick={() => toggleAck(page.pageId)}
                      className="w-full text-left flex items-center gap-3"
                    >
                      <div
                        className={`w-[18px] h-[18px] rounded flex items-center justify-center shrink-0 border-2 transition-all duration-200 ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600'
                            : 'border-[var(--border-default)] bg-white'
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                      </div>
                      <span className={`text-sm font-sans ${isChecked ? 'text-[var(--heading)]' : 'text-[var(--body)]'}`}>
                        {page.pageTitle}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {!allAcksChecked && (
              <p className="text-xs text-amber-600 font-sans mt-3">
                Check all {acknowledgementPages.length} acknowledgements to continue
              </p>
            )}
          </div>
        )}

        {/* Accept button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!signatureData || !allAcksChecked || isSubmitting}
          whileHover={signatureData && allAcksChecked ? { scale: 1.01 } : {}}
          whileTap={signatureData && allAcksChecked ? { scale: 0.99 } : {}}
          className={`mt-8 w-full py-4 rounded-xl text-base font-medium font-sans flex items-center justify-center gap-2 transition-all duration-200 ${
            signatureData && allAcksChecked && !isSubmitting
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
              Accept Proposal
            </>
          )}
        </motion.button>

        <p className="text-xs text-[var(--body-light)] font-sans text-center mt-3">
          You&apos;ll receive a confirmation email at {currentSigner.email}
        </p>
      </motion.div>

      <TrustBadges contractor={proposal.contractorInfo} variant="payment" />
    </div>
  );
}
