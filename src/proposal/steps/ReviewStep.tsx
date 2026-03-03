import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle2,
  Award,
  Shield,
  Check,
  AlertCircle,
  Clock,
  ArrowRight,
  FileText,
} from 'lucide-react';
import type { Proposal } from '../types/proposal.types';

interface ReviewStepProps {
  proposal: Proposal;
  acknowledged: boolean;
  onAcknowledge: (value: boolean) => void;
  onContinue: () => void;
}

interface PageMeta {
  id: string;
  title: string;
  required: boolean;
}

const PAGE_META: PageMeta[] = [
  { id: 'cover', title: 'Cover & About Us', required: false },
  { id: 'inspection', title: 'Inspection Summary', required: true },
  { id: 'scope', title: 'Scope of Work & Estimate', required: true },
  { id: 'terms', title: 'Terms & Conditions', required: true },
];

// ─── Page Components ───────────────────────────────────────────────────

function CoverPage({ proposal }: { proposal: Proposal }) {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative h-[340px] sm:h-[400px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1605450098589-d2586aafa386?w=1200&h=600&fit=crop&q=80"
          alt="Roofing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8">
          {proposal.contractorInfo.logo && (
            <img
              src={proposal.contractorInfo.logo}
              alt={proposal.contractorInfo.name}
              className="w-16 h-16 rounded-xl mb-5 bg-white/10 backdrop-blur-sm p-2.5 object-cover"
            />
          )}
          <h1 className="text-3xl sm:text-4xl font-serif mb-3 text-center">Roofing Proposal</h1>
          <div className="h-0.5 w-20 bg-[var(--brand-primary)] mb-5 rounded-full" />
          <p className="text-white/80 text-sm font-sans">Prepared for</p>
          <p className="text-xl sm:text-2xl font-serif mt-1">{proposal.customer.name}</p>
          <p className="text-white/70 text-sm font-sans mt-1">{proposal.customer.address}</p>
          <p className="text-white/50 text-xs font-sans mt-6">
            {new Date(proposal.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        </div>
      </div>

      {/* About */}
      <div className="px-6 py-8 sm:px-10 sm:py-10 border-t-4 border-[var(--brand-primary)]">
        <h2 className="text-2xl font-serif text-[var(--heading)] mb-5">
          About {proposal.contractorInfo.name}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          {[
            { icon: Award, label: '25+ Years', sub: 'Industry Experience' },
            { icon: Shield, label: 'Licensed & Insured', sub: 'Full Coverage Protection' },
            { icon: Check, label: '5,000+ Projects', sub: 'Successfully Completed' },
          ].map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0">
                <Icon className="w-4 h-4 text-[var(--brand-primary)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--heading)] font-sans">{label}</p>
                <p className="text-xs text-[var(--body-light)] font-sans">{sub}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--body)] leading-relaxed font-sans mb-3">
          {proposal.contractorInfo.name} is a family-owned roofing company serving the greater
          metropolitan area since 1998. We specialize in residential and commercial roofing
          solutions, offering comprehensive services from inspection to installation, repair, and
          maintenance.
        </p>
        <p className="text-sm text-[var(--body)] leading-relaxed font-sans">
          Our team of certified professionals is committed to delivering exceptional craftsmanship
          using only premium materials from trusted manufacturers. We stand behind our work with
          industry-leading warranties and an A+ BBB rating.
        </p>
      </div>
    </div>
  );
}

function InspectionPage({ proposal }: { proposal: Proposal }) {
  return (
    <div className="bg-white px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="text-2xl font-serif text-[var(--heading)] mb-5">Inspection Summary</h2>

      {/* Details */}
      <div className="bg-[var(--surface)] border border-[var(--border-default)] rounded-lg p-5 mb-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {[
            ['Inspection Date', 'February 20, 2026'],
            ['Inspector', 'Mike Anderson, Master Roofer'],
            ['Property Type', 'Single Family Residence'],
            ['Roof Age', '18 Years'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] text-[var(--body-light)] font-sans uppercase tracking-wider mb-0.5">
                {label}
              </p>
              <p className="text-sm text-[var(--heading)] font-sans">{value}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-[var(--border-default)] pt-3">
          <p className="text-[11px] text-[var(--body-light)] font-sans uppercase tracking-wider mb-0.5">
            Current Roofing Material
          </p>
          <p className="text-sm text-[var(--heading)] font-sans">Asphalt Shingles (3-Tab)</p>
        </div>
      </div>

      {/* Photos */}
      <h3 className="text-base font-semibold text-[var(--heading)] font-sans mb-3">
        Inspection Photos
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        {[
          {
            src: 'https://images.unsplash.com/photo-1721493707262-0fc9e5794c27?w=600&h=400&fit=crop&q=80',
            caption: 'Current roof condition — overall view',
          },
          {
            src: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?w=600&h=400&fit=crop&q=80',
            caption: 'Detailed area requiring attention',
          },
        ].map(({ src, caption }) => (
          <div key={caption}>
            <img
              src={src}
              alt={caption}
              className="w-full h-40 sm:h-44 object-cover rounded-lg border border-[var(--border-default)]"
            />
            <p className="text-xs text-[var(--body-light)] font-sans mt-2">{caption}</p>
          </div>
        ))}
      </div>

      {/* Findings */}
      <h3 className="text-base font-semibold text-[var(--heading)] font-sans mb-3">
        Key Findings
      </h3>
      <div className="space-y-3 mb-6">
        {[
          {
            severity: 'critical' as const,
            title: 'Critical: Shingle Deterioration',
            desc: 'Widespread curling, cracking, and granule loss across 60% of the roof surface. Multiple shingles missing or damaged.',
          },
          {
            severity: 'moderate' as const,
            title: 'Moderate: Flashing Issues',
            desc: 'Chimney and valley flashing showing separation and corrosion. Requires replacement to prevent leaks.',
          },
          {
            severity: 'moderate' as const,
            title: 'Moderate: Ventilation Concerns',
            desc: 'Inadequate attic ventilation contributing to premature shingle aging. Additional ridge vents recommended.',
          },
        ].map(({ severity, title, desc }) => (
          <div
            key={title}
            className={`flex items-start gap-3 p-3 rounded-lg border ${
              severity === 'critical'
                ? 'bg-red-50 border-red-200'
                : 'bg-amber-50 border-amber-200'
            }`}
          >
            <AlertCircle
              className={`w-4 h-4 mt-0.5 shrink-0 ${
                severity === 'critical' ? 'text-red-600' : 'text-amber-600'
              }`}
            />
            <div>
              <p
                className={`text-sm font-medium font-sans mb-0.5 ${
                  severity === 'critical' ? 'text-red-900' : 'text-amber-900'
                }`}
              >
                {title}
              </p>
              <p
                className={`text-xs font-sans leading-relaxed ${
                  severity === 'critical' ? 'text-red-700' : 'text-amber-700'
                }`}
              >
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation */}
      <div className="p-4 bg-[var(--brand-primary)]/5 border-l-4 border-[var(--brand-primary)] rounded-r-lg">
        <h4 className="text-sm font-semibold text-[var(--heading)] font-sans mb-1">
          Professional Recommendation
        </h4>
        <p className="text-sm text-[var(--body)] leading-relaxed font-sans">
          Based on our comprehensive inspection, we recommend a complete roof replacement. The
          extensive deterioration means ongoing repair costs would approach a full replacement within
          3–5 years. A new roof provides long-term protection, improved energy efficiency, and
          increased property value.
        </p>
      </div>
    </div>
  );
}

function ScopePage({ proposal }: { proposal: Proposal }) {
  const workItems = [
    {
      title: 'Complete Tear-Off & Removal',
      desc: 'Remove all existing shingles, underlayment, and damaged decking. Dispose of all materials responsibly.',
    },
    {
      title: 'Deck Inspection & Repair',
      desc: 'Inspect all roof decking for damage. Replace rotted or compromised sections with new 7/16" OSB sheathing.',
    },
    {
      title: 'Ice & Water Shield Installation',
      desc: 'Install premium membrane along all eaves, valleys, and vulnerable areas for superior leak protection.',
    },
    {
      title: 'Synthetic Underlayment',
      desc: 'Cover entire roof deck with high-performance synthetic underlayment as an additional weather barrier.',
    },
    {
      title: 'Shingle Installation',
      desc: 'Install your selected roofing shingles per manufacturer specifications. All shingles hand-sealed for maximum wind resistance.',
    },
    {
      title: 'Flashing & Trim Installation',
      desc: 'Install new aluminum drip edge, step flashing, valley flashing, and chimney counter-flashing.',
    },
    {
      title: 'Ventilation System',
      desc: 'Install ridge vent system along entire roof peak for optimal attic ventilation and extended roof life.',
    },
    {
      title: 'Cleanup & Final Inspection',
      desc: 'Magnetic sweep of entire property to collect nails and debris. Final walkthrough with homeowner.',
    },
  ];

  return (
    <div className="bg-white px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="text-2xl font-serif text-[var(--heading)] mb-2">Scope of Work</h2>
      <p className="text-sm text-[var(--body)] font-sans mb-6 leading-relaxed">
        This project includes the following work to ensure a complete, professional installation:
      </p>

      <div className="space-y-3 mb-8">
        {workItems.map((item, idx) => (
          <div key={idx} className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 mt-0.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-[var(--heading)] font-sans">{item.title}</h4>
              <p className="text-xs text-[var(--body-light)] font-sans leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="bg-[var(--surface)] border border-[var(--border-default)] rounded-lg p-5 mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-4 h-4 text-[var(--brand-primary)]" />
          <h3 className="text-base font-semibold text-[var(--heading)] font-sans">
            Project Timeline
          </h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[
            ['Duration', '2–3 Days'],
            ['Crew Size', '5–6 Workers'],
            ['Start Date', 'Within 2 Weeks'],
          ].map(([label, value]) => (
            <div key={label}>
              <p className="text-[11px] text-[var(--body-light)] font-sans uppercase tracking-wider mb-0.5">
                {label}
              </p>
              <p className="text-sm text-[var(--heading)] font-sans">{value}</p>
            </div>
          ))}
        </div>
        <p className="text-xs text-[var(--body-light)] font-sans mt-3">
          Weather permitting. Final schedule confirmed upon contract signing.
        </p>
      </div>

      {/* Note */}
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs text-blue-900 font-sans leading-relaxed">
          <strong>Note:</strong> All prices include materials, labor, permits, and cleanup. Payment
          terms: 50% deposit upon signing, 50% upon completion.
        </p>
      </div>
    </div>
  );
}

function TermsPage({ proposal }: { proposal: Proposal }) {
  const terms = [
    {
      title: '1. Contract Agreement',
      text: `This proposal, when accepted by customer's signature, becomes a binding contract between ${proposal.contractorInfo.name} and the customer. Work commences upon receipt of deposit and signed contract. This proposal is valid for 30 days from the date of issue.`,
    },
    {
      title: '2. Payment Terms',
      text: 'Payment schedule: 50% deposit due upon contract signing, 50% due upon project completion. We accept cash, check, credit cards, and offer financing options through approved partners.',
    },
    {
      title: '3. Scope of Work & Changes',
      text: 'Any additional work requested or required due to unforeseen conditions (hidden structural damage, code violations, extensive deck rot) will be documented and priced separately. Owner will be notified before additional work proceeds.',
    },
    {
      title: '4. Permits & Inspections',
      text: 'Contractor will obtain all necessary building permits. All work performed in compliance with local building codes and manufacturer specifications.',
    },
    {
      title: '5. Timeline & Weather Delays',
      text: "Delays due to weather, material availability, or circumstances beyond Contractor's control will not be considered a breach of contract.",
    },
    {
      title: '6. Warranty Information',
      text: `Material warranties are provided by manufacturers and vary by product. Workmanship warranty provided by ${proposal.contractorInfo.name} as specified in your chosen package.`,
    },
    {
      title: '7. Property Protection & Cleanup',
      text: "Contractor will take reasonable precautions to protect Owner's property and landscaping. A magnetic sweep will be performed daily and upon completion.",
    },
    {
      title: '8. Insurance & Liability',
      text: 'Contractor maintains full liability insurance and workers\' compensation coverage. Certificate of insurance available upon request.',
    },
    {
      title: '9. Cancellation Policy',
      text: 'Owner may cancel within 3 business days of signing with no penalty. After 3 days, the deposit is forfeited to cover administrative costs and material ordering.',
    },
    {
      title: '10. Dispute Resolution',
      text: 'Any disputes arising from this contract will first be addressed through good-faith negotiation, followed by mediation before pursuing legal action.',
    },
  ];

  return (
    <div className="bg-white px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="text-2xl font-serif text-[var(--heading)] mb-5">Terms & Conditions</h2>

      <div className="space-y-5">
        {terms.map(({ title, text }) => (
          <div key={title}>
            <h4 className="text-sm font-semibold text-[var(--heading)] font-sans mb-1">{title}</h4>
            <p className="text-xs text-[var(--body)] font-sans leading-relaxed">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-[var(--surface)] border border-[var(--border-default)] rounded-lg">
        <p className="text-sm font-medium text-[var(--heading)] font-sans mb-2">
          By signing this proposal, you acknowledge that you have read, understood, and agree to
          these terms and conditions.
        </p>
        <p className="text-xs text-[var(--body-light)] font-sans">
          For questions, contact us at {proposal.contractorInfo.phone} or{' '}
          {proposal.contractorInfo.email} before signing.
        </p>
      </div>
    </div>
  );
}

// ─── Main ReviewStep ───────────────────────────────────────────────────

export function ReviewStep({
  proposal,
  acknowledged,
  onAcknowledge,
  onContinue,
}: ReviewStepProps) {
  const [acknowledgedPages, setAcknowledgedPages] = useState<Set<string>>(new Set());
  const [visibleSection, setVisibleSection] = useState<string>(PAGE_META[0].id);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const requiredPages = PAGE_META.filter((p) => p.required);
  const allRequiredAcknowledged = requiredPages.every((p) => acknowledgedPages.has(p.id));

  const visibleMeta = PAGE_META.find((p) => p.id === visibleSection) || PAGE_META[0];
  const visibleIndex = PAGE_META.findIndex((p) => p.id === visibleSection);
  const isVisibleAcknowledged = acknowledgedPages.has(visibleSection);

  const acknowledgedCount = [...acknowledgedPages].filter((id) =>
    requiredPages.some((p) => p.id === id)
  ).length;
  const progressPercent =
    requiredPages.length > 0 ? (acknowledgedCount / requiredPages.length) * 100 : 0;

  // Track which section is in the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    PAGE_META.forEach((meta) => {
      const el = sectionRefs.current[meta.id];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSection(meta.id);
          }
        },
        { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Sync up to parent when all required sections acknowledged
  useEffect(() => {
    if (allRequiredAcknowledged && !acknowledged) {
      onAcknowledge(true);
    }
  }, [allRequiredAcknowledged, acknowledged, onAcknowledge]);

  const handleAcknowledgeAndContinue = useCallback(() => {
    // Acknowledge the current section if it's required
    if (visibleMeta.required && !isVisibleAcknowledged) {
      setAcknowledgedPages((prev) => {
        const next = new Set(prev);
        next.add(visibleSection);
        return next;
      });
    }

    // Scroll to the next section (any section, not just required ones)
    const currentIdx = PAGE_META.findIndex((p) => p.id === visibleSection);
    for (let i = currentIdx + 1; i < PAGE_META.length; i++) {
      const meta = PAGE_META[i];
      const el = sectionRefs.current[meta.id];
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
        return;
      }
    }
  }, [visibleSection, visibleMeta, isVisibleAcknowledged]);

  return (
    <div className="max-w-3xl mx-auto px-0 sm:px-6 pt-0 sm:pt-4 pb-28">
      {/* Document header */}
      <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-[var(--border-default)] px-4 sm:px-5 py-2.5 flex items-center justify-between sm:rounded-t-xl">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-[var(--body-light)]" />
          <span className="text-xs text-[var(--body)] font-sans">Proposal #{proposal.id}.pdf</span>
        </div>
        <span className="text-xs text-[var(--body-light)] font-sans">Document Preview</span>
      </div>

      {/* All pages stacked vertically */}
      <div className="bg-white sm:border-x border-[var(--border-default)]">
        {PAGE_META.map((meta, idx) => {
          const isAcked = acknowledgedPages.has(meta.id);
          const isViewing = visibleSection === meta.id;

          return (
            <div key={meta.id}>
              {idx > 0 && (
                <div className="h-3 bg-[var(--surface)] sm:border-x border-[var(--border-default)]" />
              )}
              <div ref={(el) => { sectionRefs.current[meta.id] = el; }}>
                {meta.id === 'cover' && <CoverPage proposal={proposal} />}
                {meta.id === 'inspection' && <InspectionPage proposal={proposal} />}
                {meta.id === 'scope' && <ScopePage proposal={proposal} />}
                {meta.id === 'terms' && <TermsPage proposal={proposal} />}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom acknowledgement bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="w-full bg-[var(--border-default)] h-0.5">
          <motion.div
            className="h-full bg-emerald-500"
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        <div className="bg-white/95 backdrop-blur-sm border-t border-[var(--border-default)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            {allRequiredAcknowledged ? (
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[var(--heading)] font-sans">
                      All sections reviewed
                    </p>
                    <p className="text-xs text-[var(--body-light)] font-sans">
                      You can now proceed to package selection
                    </p>
                  </div>
                </div>
                <motion.button
                  onClick={onContinue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-medium hover:bg-[var(--brand-primary-hover)] transition-colors shadow-sm shrink-0 font-sans"
                >
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-[10px] text-[var(--body-light)] font-sans uppercase tracking-wider">
                    Section {visibleIndex + 1} of {PAGE_META.length}
                    {isVisibleAcknowledged && visibleMeta.required && (
                      <span className="ml-2 text-emerald-600">
                        <CheckCircle2 className="w-3 h-3 inline -mt-px mr-0.5" />
                        Acknowledged
                      </span>
                    )}
                  </p>
                  <p className="text-sm font-medium text-[var(--heading)] font-sans truncate">
                    {visibleMeta.title}
                  </p>
                </div>

                <motion.button
                  onClick={handleAcknowledgeAndContinue}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-medium hover:bg-[var(--brand-primary-hover)] transition-colors shadow-sm shrink-0 font-sans"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Acknowledge & Continue</span>
                  <span className="sm:hidden">Acknowledge</span>
                </motion.button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
