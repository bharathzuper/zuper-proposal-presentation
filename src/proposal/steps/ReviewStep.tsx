import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Award,
  Shield,
  Check,
  AlertCircle,
  Clock,
  ArrowRight,
  FileText,
  Star,
  Hammer,
  ShieldCheck,
  FileSignature,
} from 'lucide-react';
import type { Proposal } from '../types/proposal.types';
import { useAcknowledgementSettings } from '../context/AcknowledgementSettingsContext';

interface ReviewStepProps {
  proposal: Proposal;
  onContinue: () => void;
}

const DOCUMENT_SECTIONS = [
  { id: 'cover' as const, label: 'Cover' },
  { id: 'projects' as const, label: 'Projects' },
  { id: 'inspection' as const, label: 'Inspection' },
  { id: 'scope' as const, label: 'Scope of Work' },
  { id: 'materials' as const, label: 'Materials' },
  { id: 'terms' as const, label: 'Terms' },
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

function PastProjectsPage({ proposal }: { proposal: Proposal }) {
  const projects = [
    {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=400&fit=crop&q=80',
      title: 'Anderson Residence — Full Replacement',
      location: 'Springfield, IL',
      desc: 'Complete tear-off and installation of CertainTeed Grand Manor luxury shingles. Included custom copper flashing and upgraded ridge ventilation.',
    },
    {
      src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=400&fit=crop&q=80',
      title: 'Westfield Community Center',
      location: 'Chatham, IL',
      desc: 'Commercial flat-roof restoration with TPO membrane. 15,000 sq ft completed in 5 days with zero disruption to building operations.',
    },
    {
      src: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=400&fit=crop&q=80',
      title: 'Parker Family Home — Storm Damage',
      location: 'Rochester, IL',
      desc: 'Insurance-claim roof replacement after hail damage. GAF Timberline HDZ shingles with full ice & water shield. Completed in 2 days.',
    },
  ];

  const testimonials = [
    {
      name: 'David & Linda Thompson',
      text: 'Summit was professional from start to finish. The crew was punctual, respectful, and left our property cleaner than they found it. Highly recommend.',
      rating: 5,
    },
    {
      name: 'Maria Gonzales',
      text: 'After getting three bids, Summit offered the best value and the most thorough inspection. Our new roof looks incredible and the warranty gives us peace of mind.',
      rating: 5,
    },
  ];

  return (
    <div className="bg-white px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="text-2xl font-serif text-[var(--heading)] mb-2">Past Projects & References</h2>
      <p className="text-sm text-[var(--body)] font-sans mb-6 leading-relaxed">
        A selection of recent projects completed by {proposal.contractorInfo.name}.
      </p>

      <div className="space-y-6 mb-8">
        {projects.map((project) => (
          <div key={project.title} className="flex flex-col sm:flex-row gap-4">
            <img
              src={project.src}
              alt={project.title}
              className="w-full sm:w-40 h-32 sm:h-28 object-cover rounded-lg border border-[var(--border-default)] shrink-0"
            />
            <div className="min-w-0">
              <h4 className="text-sm font-semibold text-[var(--heading)] font-sans">{project.title}</h4>
              <p className="text-[11px] text-[var(--body-light)] font-sans mt-0.5">{project.location}</p>
              <p className="text-xs text-[var(--body)] font-sans mt-1.5 leading-relaxed">{project.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-base font-semibold text-[var(--heading)] font-sans mb-4">
        Customer Testimonials
      </h3>
      <div className="space-y-4">
        {testimonials.map((t) => (
          <div key={t.name} className="p-4 bg-[var(--surface)] border border-[var(--border-default)] rounded-lg">
            <div className="flex items-center gap-1 mb-2">
              {Array.from({ length: t.rating }).map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-xs text-[var(--body)] font-sans leading-relaxed italic mb-2">
              &ldquo;{t.text}&rdquo;
            </p>
            <p className="text-xs font-medium text-[var(--heading)] font-sans">{t.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MaterialsWarrantyPage({ proposal }: { proposal: Proposal }) {
  const materials = [
    {
      category: 'Shingles',
      name: 'GAF Timberline HDZ® / CertainTeed Grand Manor®',
      detail: 'Architectural-grade laminated shingles with superior wind resistance (up to 130 mph). Class A fire rated, algae-resistant granules.',
      icon: Hammer,
    },
    {
      category: 'Underlayment',
      name: 'GAF Deck-Armor™ / CertainTeed DiamondDeck™',
      detail: 'Premium synthetic underlayment providing a secondary weather barrier. Slip-resistant surface for safer installation.',
      icon: Shield,
    },
    {
      category: 'Ice & Water Shield',
      name: 'GAF WeatherWatch® / CertainTeed WinterGuard®',
      detail: 'Self-adhering membrane applied to eaves, valleys, and penetrations. Prevents ice-dam leaks and wind-driven rain infiltration.',
      icon: ShieldCheck,
    },
    {
      category: 'Ventilation',
      name: 'GAF Cobra® Ridge Vent',
      detail: 'Externally baffled ridge vent that provides balanced attic ventilation while remaining virtually invisible from the ground.',
      icon: Award,
    },
  ];

  const warranties = [
    {
      tier: 'Standard Package',
      manufacturer: '25-year limited',
      workmanship: '5-year workmanship',
    },
    {
      tier: 'Premium Package',
      manufacturer: '50-year limited lifetime',
      workmanship: '25-year workmanship',
    },
    {
      tier: 'Elite Package',
      manufacturer: '75-year transferable',
      workmanship: 'Lifetime workmanship',
    },
  ];

  return (
    <div className="bg-white px-6 py-8 sm:px-10 sm:py-10">
      <h2 className="text-2xl font-serif text-[var(--heading)] mb-2">Materials & Warranty</h2>
      <p className="text-sm text-[var(--body)] font-sans mb-6 leading-relaxed">
        We use only premium, manufacturer-certified materials. Every component is selected for
        performance, longevity, and compatibility.
      </p>

      <div className="space-y-4 mb-8">
        {materials.map((mat) => {
          const Icon = mat.icon;
          return (
            <div key={mat.category} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
                <Icon className="w-4 h-4 text-[var(--brand-primary)]" />
              </div>
              <div>
                <p className="text-[11px] text-[var(--body-light)] font-sans uppercase tracking-wider">
                  {mat.category}
                </p>
                <h4 className="text-sm font-medium text-[var(--heading)] font-sans mt-0.5">{mat.name}</h4>
                <p className="text-xs text-[var(--body)] font-sans leading-relaxed mt-1">{mat.detail}</p>
              </div>
            </div>
          );
        })}
      </div>

      <h3 className="text-base font-semibold text-[var(--heading)] font-sans mb-4">
        Warranty Coverage by Package
      </h3>
      <div className="border border-[var(--border-default)] rounded-lg overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[var(--surface)]">
              <th className="px-4 py-2.5 text-[11px] text-[var(--body-light)] font-sans font-medium uppercase tracking-wider">Package</th>
              <th className="px-4 py-2.5 text-[11px] text-[var(--body-light)] font-sans font-medium uppercase tracking-wider">Manufacturer</th>
              <th className="px-4 py-2.5 text-[11px] text-[var(--body-light)] font-sans font-medium uppercase tracking-wider">Workmanship</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-default)]">
            {warranties.map((w) => (
              <tr key={w.tier}>
                <td className="px-4 py-3 text-sm font-medium text-[var(--heading)] font-sans">{w.tier}</td>
                <td className="px-4 py-3 text-xs text-[var(--body)] font-sans">{w.manufacturer}</td>
                <td className="px-4 py-3 text-xs text-[var(--body)] font-sans">{w.workmanship}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
        <p className="text-xs text-emerald-900 font-sans leading-relaxed">
          <strong>Warranty note:</strong> All manufacturer warranties require professional installation
          by a certified contractor. {proposal.contractorInfo.name} is a certified installer for all
          listed manufacturers, ensuring full warranty eligibility.
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

// ─── Acknowledgement Preview (read-only) ────────────────────────────────

function AcknowledgementPreviewFooter({ text }: { text: string }) {
  return (
    <div className="border-t border-dashed border-[var(--border-default)] bg-slate-50/80">
      <div className="px-6 py-5 sm:px-10 sm:py-6">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-5 h-5 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center shrink-0 mt-0.5">
            <FileSignature className="w-3 h-3 text-[var(--brand-primary)]" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] text-[var(--brand-primary)] font-sans font-medium uppercase tracking-wider mb-1">
              Acknowledgement Required
            </p>
            <p className="text-sm text-[var(--body)] leading-relaxed font-sans">
              {text}
            </p>
          </div>
        </div>

        <div className="relative rounded-lg border border-dashed border-[var(--border-default)] h-16 bg-white/60 flex items-center justify-center gap-2">
          <div className="w-16 border-b border-[var(--body-light)]/25" />
          <span className="text-[11px] text-[var(--body-light)]/70 font-sans tracking-wide">
            Your signature will appear here
          </span>
          <div className="w-16 border-b border-[var(--body-light)]/25" />
        </div>
      </div>
    </div>
  );
}

// ─── Main ReviewStep ───────────────────────────────────────────────────

export function ReviewStep({ proposal, onContinue }: ReviewStepProps) {
  const { settings: ackSettings } = useAcknowledgementSettings();

  const ackByPageId = ackSettings.enabled
    ? Object.fromEntries(
        ackSettings.pages
          .filter((p) => p.requiresAcknowledgement && p.acknowledgementText)
          .map((p) => [p.pageId, p.acknowledgementText]),
      )
    : {};

  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIdx, setActiveIdx] = useState(0);
  const isScrollingTo = useRef(false);

  const isLastSection = activeIdx === DOCUMENT_SECTIONS.length - 1;

  useEffect(() => {
    const els = sectionRefs.current.filter(Boolean) as HTMLDivElement[];
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollingTo.current) return;

        let topIdx = activeIdx;
        let topY = Infinity;

        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const idx = els.indexOf(entry.target as HTMLDivElement);
          if (idx === -1) continue;

          const rect = entry.boundingClientRect;
          if (rect.top < topY) {
            topY = rect.top;
            topIdx = idx;
          }
        }

        setActiveIdx(topIdx);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: 0 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeIdx]);

  const scrollToSection = useCallback((idx: number) => {
    const el = sectionRefs.current[idx];
    if (!el) return;

    isScrollingTo.current = true;
    setActiveIdx(idx);

    el.scrollIntoView({ behavior: 'smooth', block: 'start' });

    setTimeout(() => {
      isScrollingTo.current = false;
    }, 800);
  }, []);

  const goToNextSection = useCallback(() => {
    if (activeIdx < DOCUMENT_SECTIONS.length - 1) {
      scrollToSection(activeIdx + 1);
    }
  }, [activeIdx, scrollToSection]);

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
        {DOCUMENT_SECTIONS.map((section, idx) => (
          <div
            key={section.id}
            ref={(el) => { sectionRefs.current[idx] = el; }}
            className="scroll-mt-[100px]"
          >
            {idx > 0 && (
              <div className="h-3 bg-[var(--surface)] sm:border-x border-[var(--border-default)]" />
            )}
            <div>
              {section.id === 'cover' && <CoverPage proposal={proposal} />}
              {section.id === 'projects' && <PastProjectsPage proposal={proposal} />}
              {section.id === 'inspection' && <InspectionPage proposal={proposal} />}
              {section.id === 'scope' && <ScopePage proposal={proposal} />}
              {section.id === 'materials' && <MaterialsWarrantyPage proposal={proposal} />}
              {section.id === 'terms' && <TermsPage proposal={proposal} />}

              {ackByPageId[section.id] && (
                <AcknowledgementPreviewFooter text={ackByPageId[section.id]} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar — steps through sections, then continues to sign */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-white/95 backdrop-blur-sm border-t border-[var(--border-default)] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-[var(--heading)] font-sans">
                  {DOCUMENT_SECTIONS[activeIdx].label}
                </p>
                <p className="text-xs text-[var(--body-light)] font-sans mt-0.5">
                  Section {activeIdx + 1} of {DOCUMENT_SECTIONS.length}
                  {isLastSection && ' — last section'}
                </p>
              </div>
              <motion.button
                type="button"
                onClick={isLastSection ? onContinue : goToNextSection}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg bg-[var(--brand-primary)] text-white text-sm font-medium hover:bg-[var(--brand-primary-hover)] transition-colors shadow-sm shrink-0 font-sans"
              >
                {isLastSection ? 'Continue' : 'Next Section'}
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
