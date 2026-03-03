import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Phone, Mail, Calendar } from 'lucide-react';
import type { ContractorInfo, CustomerInfo } from '../types/proposal.types';

interface SuccessScreenProps {
  contractor: ContractorInfo;
  customer: CustomerInfo;
}

function ConfettiPiece({ delay, color }: { delay: number; color: string }) {
  const left = Math.random() * 100;
  const size = 6 + Math.random() * 8;
  const duration = 2 + Math.random() * 2;

  return (
    <motion.div
      initial={{ y: -20, x: 0, opacity: 1, rotate: 0 }}
      animate={{ y: '100vh', x: (Math.random() - 0.5) * 200, opacity: 0, rotate: 720 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      className="fixed pointer-events-none z-50"
      style={{
        left: `${left}%`,
        top: 0,
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: Math.random() > 0.5 ? '50%' : '2px',
      }}
    />
  );
}

export function SuccessScreen({ contractor, customer }: SuccessScreenProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const colors = ['var(--brand-primary)', 'var(--brand-gold)', 'var(--brand-success)', '#E8E4DF', '#4A90D9'];

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const firstName = customer.name.split(' ')[0];

  return (
    <div className="min-h-screen bg-[var(--surface)] flex items-center justify-center p-6">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiPiece
              key={i}
              delay={i * 0.04}
              color={colors[i % colors.length]}
            />
          ))}
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-md w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full mx-auto mb-8 flex items-center justify-center"
          style={{ backgroundColor: 'var(--brand-success)' }}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <Check className="w-10 h-10 text-white" strokeWidth={3} />
          </motion.div>
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-serif text-[var(--heading)] mb-3">
          You're all set, {firstName}!
        </h1>
        <p className="text-[var(--body)] font-sans text-base leading-relaxed mb-8">
          Your proposal has been signed and submitted. We'll reach out within 24 hours to schedule your project.
        </p>

        <div className="bg-white rounded-xl border border-[var(--border-default)] p-6 text-left space-y-4">
          <h3 className="text-sm font-medium text-[var(--heading)] font-sans uppercase tracking-wide">
            What's Next
          </h3>

          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--heading)] font-sans">Scheduling</p>
              <p className="text-sm text-[var(--body)] font-sans">
                {contractor.name} will contact you to schedule a start date.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Mail className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-[var(--heading)] font-sans">Confirmation</p>
              <p className="text-sm text-[var(--body)] font-sans">
                A copy has been sent to {customer.email}
              </p>
            </div>
          </div>

          {contractor.phone && (
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-[var(--brand-primary)] mt-0.5 shrink-0" />
              <div>
                <p className="text-sm font-medium text-[var(--heading)] font-sans">Questions?</p>
                <p className="text-sm text-[var(--body)] font-sans">
                  Call us at {contractor.phone}
                </p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
