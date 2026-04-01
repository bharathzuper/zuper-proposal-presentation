import { motion } from 'framer-motion';
import { FileSignature, CheckCircle2 } from 'lucide-react';

interface PageAcknowledgementFooterProps {
  acknowledgementText: string;
  isAcknowledged: boolean;
  signatureData?: string;
}

export function PageAcknowledgementFooter({
  acknowledgementText,
  isAcknowledged,
  signatureData,
}: PageAcknowledgementFooterProps) {
  return (
    <div className="border-t border-[var(--border-default)] bg-[var(--surface)]">
      <div className="px-6 py-5 sm:px-10 sm:py-6">
        {/* Acknowledgement text */}
        <div className="flex items-start gap-3 mb-4">
          <div
            className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-300 ${
              isAcknowledged
                ? 'bg-emerald-100 text-emerald-600'
                : 'bg-[var(--brand-primary)]/10 text-[var(--brand-primary)]'
            }`}
          >
            {isAcknowledged ? (
              <CheckCircle2 className="w-3.5 h-3.5" />
            ) : (
              <FileSignature className="w-3 h-3" />
            )}
          </div>
          <p
            className={`text-sm leading-relaxed font-sans transition-colors duration-300 ${
              isAcknowledged ? 'text-emerald-700' : 'text-[var(--body)]'
            }`}
          >
            {acknowledgementText}
          </p>
        </div>

        {/* Signature placeholder */}
        <motion.div
          initial={false}
          animate={{
            borderColor: isAcknowledged
              ? 'var(--color-emerald-200, #a7f3d0)'
              : 'var(--color-border, #d1d5db)',
          }}
          className={`relative rounded-lg border border-dashed overflow-hidden transition-colors duration-300 ${
            signatureData ? 'h-14 bg-white' : 'h-16 bg-[var(--surface)]'
          }`}
        >
          {signatureData ? (
            <div className="flex items-center h-full px-4 gap-3">
              <img
                src={signatureData}
                alt="Signature"
                className="h-10 w-auto object-contain opacity-80"
              />
              <div className="flex items-center gap-1.5 ml-auto">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-[11px] text-emerald-600 font-sans font-medium">
                  Signed
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full gap-2">
              <div className="w-16 border-b border-[var(--body-light)]/30" />
              <span className="text-[11px] text-[var(--body-light)] font-sans tracking-wide">
                Your signature will appear here
              </span>
              <div className="w-16 border-b border-[var(--body-light)]/30" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
