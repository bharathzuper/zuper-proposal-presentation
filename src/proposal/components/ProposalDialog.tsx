import { useEffect, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ProposalDialogProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  /** Disables backdrop / escape close (e.g. while submitting). */
  locked?: boolean;
  ariaLabel?: string;
}

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const panelVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export function ProposalDialog({ open, onClose, children, locked, ariaLabel }: ProposalDialogProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !locked) onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, locked, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-[#1A1A1A]/55 backdrop-blur-[2px]"
          onClick={() => {
            if (!locked) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-label={ariaLabel}
        >
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.22, ease: [0.22, 0.9, 0.32, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full sm:max-w-lg bg-white sm:rounded-2xl rounded-t-2xl shadow-[0_24px_60px_rgba(26,26,26,0.18)] max-h-[92vh] overflow-hidden flex flex-col"
          >
            <div
              aria-hidden
              className="flex sm:hidden justify-center pt-2 pb-1"
            >
              <span className="w-9 h-1 rounded-full bg-[var(--border-default)]" />
            </div>
            {!locked && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-[var(--body-light)] hover:text-[var(--heading)] hover:bg-[var(--surface)] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
