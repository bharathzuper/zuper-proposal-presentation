import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ProposalSection } from "../data/mockProposal";
import { Check, AlertCircle, Shield, Clock, Award, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export interface PaginationControls {
  currentPage: number;
  totalPages: number;
  goToPage: (page: number) => void;
  nextPage: () => void;
  prevPage: () => void;
}

interface Addon {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface DocumentPreviewProps {
  companyName: string;
  companyLogo: string;
  recipientName: string;
  recipientAddress: string;
  sections: ProposalSection[];
  hideNavigation?: boolean;
  onPaginationChange?: (controls: PaginationControls) => void;
  selectedOptionId?: string;
  selectedAddons?: Addon[];
  estimateOptions?: Array<{
    id: string;
    title: string;
    description: string;
    price: number;
    recommended?: boolean;
  }>;
}

export function DocumentPreview({
  companyName,
  companyLogo,
  recipientName,
  recipientAddress,
  sections,
  hideNavigation = false,
  onPaginationChange,
  selectedOptionId,
  selectedAddons,
  estimateOptions,
}: DocumentPreviewProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalPages = 4;
  const minSwipeDistance = 50;

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const nextPage = () => goToPage(currentPage + 1);
  const prevPage = () => goToPage(currentPage - 1);

  // Notify parent of pagination state changes
  useEffect(() => {
    if (onPaginationChange) {
      onPaginationChange({
        currentPage,
        totalPages,
        goToPage,
        nextPage,
        prevPage,
      });
    }
  }, [currentPage, totalPages, onPaginationChange]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
    if (isRightSwipe && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Page 1 Component
  const Page1 = () => (
    <div className="relative bg-white page-section" id="page-1">
      {/* Cover Section */}
      <div className="relative h-[400px] md:h-[350px] lg:h-[400px] overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1605450098589-d2586aafa386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29maW5nJTIwY29tcGFueSUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MjMzODMwOHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Roofing Company"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-8">
          <img
            src={companyLogo}
            alt={companyName}
            className="w-20 h-20 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-xl mb-6 md:mb-4 lg:mb-6 bg-white/10 backdrop-blur-sm p-3"
          />
          <h1 className="text-4xl md:text-3xl lg:text-4xl mb-4 md:mb-3 lg:mb-4 text-center">Roofing Proposal</h1>
          <div className="h-1 w-24 bg-[var(--zuper-primary)] mb-6 md:mb-4 lg:mb-6 rounded-full" />
          <div className="text-center space-y-2">
            <p className="text-xl md:text-lg lg:text-xl">Prepared for:</p>
            <p className="text-2xl md:text-xl lg:text-2xl">{recipientName}</p>
            <p className="text-lg md:text-base lg:text-lg text-white/80">{recipientAddress}</p>
          </div>
          <div className="mt-8 md:mt-6 lg:mt-8 text-sm text-white/70">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="px-6 py-6 md:px-8 md:py-6 lg:px-12 lg:py-10 border-t-8 md:border-t-4 lg:border-t-8 border-[var(--zuper-primary)]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-xl lg:text-3xl text-[var(--zuper-text-primary)] mb-4 md:mb-4 lg:mb-6">About {companyName}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-4 lg:gap-6 mb-6 md:mb-6 lg:mb-8">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg bg-[var(--zuper-primary)]/10 flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[var(--zuper-primary)]" />
              </div>
              <div>
                <h4 className="text-sm mb-1 text-[var(--zuper-text-primary)]">25+ Years</h4>
                <p className="text-xs text-[var(--zuper-text-secondary)]">Industry Experience</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg bg-[var(--zuper-primary)]/10 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[var(--zuper-primary)]" />
              </div>
              <div>
                <h4 className="text-sm mb-1 text-[var(--zuper-text-primary)]">Licensed & Insured</h4>
                <p className="text-xs text-[var(--zuper-text-secondary)]">Full Coverage Protection</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-lg bg-[var(--zuper-primary)]/10 flex items-center justify-center flex-shrink-0">
                <Check className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[var(--zuper-primary)]" />
              </div>
              <div>
                <h4 className="text-sm mb-1 text-[var(--zuper-text-primary)]">5,000+ Projects</h4>
                <p className="text-xs text-[var(--zuper-text-secondary)]">Successfully Completed</p>
              </div>
            </div>
          </div>
          <p className="text-sm text-[var(--zuper-text-secondary)] leading-relaxed mb-4">
            {companyName} is a family-owned and operated roofing company serving the greater metropolitan area since 1998. 
            We specialize in residential and commercial roofing solutions, offering comprehensive services from inspection 
            to installation, repair, and maintenance.
          </p>
          <p className="text-sm text-[var(--zuper-text-secondary)] leading-relaxed">
            Our team of certified roofing professionals is committed to delivering exceptional craftsmanship, using only 
            premium materials from trusted manufacturers. We stand behind our work with industry-leading warranties and 
            a dedication to customer satisfaction that has earned us an A+ rating with the Better Business Bureau.
          </p>
        </div>
      </div>
    </div>
  );

  // Page 2 Component
  const Page2 = () => (
    <div className="bg-white page-section border-t-2 border-[var(--zuper-border)] lg:border-t-2" id="page-2">
      <div className="px-6 py-6 md:px-8 md:py-6 lg:px-12 lg:py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-xl lg:text-3xl text-[var(--zuper-text-primary)] mb-4 md:mb-4 lg:mb-6">Inspection Summary</h2>
          
          {/* Inspection Details */}
          <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4 md:p-5 lg:p-6 mb-6 md:mb-6 lg:mb-8">
            <div className="grid grid-cols-2 gap-4 md:gap-5 lg:gap-6 mb-4 md:mb-5 lg:mb-6">
              <div>
                <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Inspection Date</p>
                <p className="text-sm text-[var(--zuper-text-primary)]">October 28, 2024</p>
              </div>
              <div>
                <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Inspector</p>
                <p className="text-sm text-[var(--zuper-text-primary)]">Mike Anderson, Master Roofer</p>
              </div>
              <div>
                <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Property Type</p>
                <p className="text-sm text-[var(--zuper-text-primary)]">Single Family Residence</p>
              </div>
              <div>
                <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Roof Age</p>
                <p className="text-sm text-[var(--zuper-text-primary)]">18 Years</p>
              </div>
            </div>
            <div className="border-t border-[var(--zuper-border)] pt-4">
              <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Current Roofing Material</p>
              <p className="text-sm text-[var(--zuper-text-primary)]">Asphalt Shingles (3-Tab)</p>
            </div>
          </div>

          {/* Inspection Photos */}
          <div className="mb-6 md:mb-6 lg:mb-8">
            <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)] mb-3 md:mb-3 lg:mb-4">Inspection Photos</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1721493707262-0fc9e5794c27?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwaW5zcGVjdGlvbiUyMGRhbWFnZXxlbnwxfHx8fDE3NjIzMzgzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Roof condition"
                  className="w-full h-40 md:h-44 lg:h-48 object-cover rounded-lg border border-[var(--zuper-border)]"
                />
                <p className="text-xs text-[var(--zuper-text-secondary)] mt-2">Current roof condition - overall view</p>
              </div>
              <div>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1632759145351-1d592919f522?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjB3b3JrZXJzJTIwcm9vZnxlbnwxfHx8fDE3NjIzMzgzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Roof detail"
                  className="w-full h-40 md:h-44 lg:h-48 object-cover rounded-lg border border-[var(--zuper-border)]"
                />
                <p className="text-xs text-[var(--zuper-text-secondary)] mt-2">Detailed area requiring attention</p>
              </div>
            </div>
          </div>

          {/* Findings */}
          <div>
            <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)] mb-3 md:mb-3 lg:mb-4">Key Findings</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 md:p-4 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-xs lg:text-sm text-red-900 mb-1">Critical: Shingle Deterioration</p>
                  <p className="text-xs text-red-700">
                    Widespread curling, cracking, and granule loss detected across 60% of roof surface. 
                    Multiple shingles missing or damaged, creating vulnerability to water infiltration.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 md:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-xs lg:text-sm text-amber-900 mb-1">Moderate: Flashing Issues</p>
                  <p className="text-xs text-amber-700">
                    Chimney and valley flashing showing signs of separation and corrosion. 
                    Requires replacement to prevent leaks.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 md:p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <AlertCircle className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm md:text-xs lg:text-sm text-amber-900 mb-1">Moderate: Ventilation Concerns</p>
                  <p className="text-xs text-amber-700">
                    Inadequate attic ventilation may be contributing to premature shingle aging. 
                    Additional ridge vents recommended.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="mt-6 md:mt-6 lg:mt-8 p-4 md:p-5 lg:p-6 bg-[var(--zuper-primary)]/5 border-l-4 border-[var(--zuper-primary)] rounded-r-lg">
            <h4 className="text-sm text-[var(--zuper-text-primary)] mb-2">Professional Recommendation</h4>
            <p className="text-sm text-[var(--zuper-text-secondary)] leading-relaxed">
              Based on our comprehensive inspection, we recommend a complete roof replacement. While repairs are 
              possible, the extensive deterioration means you would likely face ongoing maintenance costs and 
              repeated repairs. A new roof will provide long-term protection, improved energy efficiency, and 
              increased property value.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  // Page 3 Component (Scope of Work & Estimate - truncated for brevity, keeping structure)
  const Page3 = () => {
    // If we're showing selected options only (secondary signer view)
    const selectedOption = selectedOptionId && estimateOptions 
      ? estimateOptions.find(opt => opt.id === selectedOptionId)
      : null;
    
    return (
    <div className="bg-white page-section border-t-2 border-[var(--zuper-border)] lg:border-t-2" id="page-3">
      <div className="px-6 py-6 md:px-8 md:py-6 lg:px-12 lg:py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-xl lg:text-3xl text-[var(--zuper-text-primary)] mb-4 md:mb-4 lg:mb-6">Scope of Work</h2>
          <p className="text-sm text-[var(--zuper-text-secondary)] mb-4 md:mb-5 lg:mb-6">
            This project will include the following work to ensure a complete, professional roofing installation:
          </p>
          
          <div className="space-y-3 md:space-y-3 lg:space-y-4 mb-8 md:mb-8 lg:mb-10">
            {[
              {
                title: "Complete Tear-Off & Removal",
                description: "Remove all existing shingles, underlayment, and damaged decking. Dispose of all materials responsibly and ensure property is kept clean throughout the project."
              },
              {
                title: "Deck Inspection & Repair",
                description: "Inspect all roof decking for damage. Replace any rotted or compromised sections with new 7/16\" OSB or plywood sheathing (material cost additional if extensive repairs needed)."
              },
              {
                title: "Ice & Water Shield Installation",
                description: "Install premium ice and water shield membrane along all eaves, valleys, and vulnerable areas to provide superior leak protection."
              },
              {
                title: "Synthetic Underlayment",
                description: "Cover entire roof deck with high-performance synthetic underlayment, providing an additional weather-resistant barrier."
              },
              {
                title: "Shingle Installation",
                description: "Install your selected roofing shingles per manufacturer specifications. All shingles will be hand-sealed for maximum wind resistance."
              },
              {
                title: "Flashing & Trim Installation",
                description: "Install new aluminum drip edge, step flashing, valley flashing, and chimney counter-flashing. All penetrations will be properly flashed and sealed."
              },
              {
                title: "Ventilation System",
                description: "Install ridge vent system along entire roof peak for optimal attic ventilation, helping to extend roof life and improve energy efficiency."
              },
              {
                title: "Cleanup & Final Inspection",
                description: "Magnetic sweep of entire property to collect nails and debris. Complete final inspection and walkthrough with homeowner to ensure satisfaction."
              }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-6 h-6 md:w-5 md:h-5 lg:w-6 lg:h-6 rounded-full bg-[var(--zuper-green)]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)]" />
                </div>
                <div>
                  <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-1">{item.title}</h4>
                  <p className="text-xs text-[var(--zuper-text-secondary)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Project Timeline */}
          <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4 md:p-5 lg:p-6 mb-8 md:mb-8 lg:mb-10">
            <div className="flex items-center gap-3 mb-4">
              <Clock className="w-5 h-5 md:w-4 md:h-4 lg:w-5 lg:h-5 text-[var(--zuper-primary)]" />
              <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)]">Project Timeline</h3>
            </div>
            <div className="grid grid-cols-3 gap-4 md:gap-5 lg:gap-6">
              <div>
                <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Duration</p>
                <p className="text-sm text-[var(--zuper-text-primary)]">2-3 Days</p>
              </div>
              <div>
                <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Crew Size</p>
                <p className="text-sm text-[var(--zuper-text-primary)]">5-6 Workers</p>
              </div>
              <div>
                <p className="text-xs text-[var(--zuper-text-tertiary)] mb-1">Start Date</p>
                <p className="text-sm text-[var(--zuper-text-primary)]">Within 2 Weeks</p>
              </div>
            </div>
            <p className="text-xs text-[var(--zuper-text-secondary)] mt-4">
              Weather permitting. Final schedule will be confirmed upon contract signing.
            </p>
          </div>

          {/* Estimate Options - Conditional Rendering */}
          {selectedOption ? (
            // Show only selected option for secondary signers
            <>
              <h2 className="text-2xl md:text-xl lg:text-3xl text-[var(--zuper-text-primary)] mb-4 md:mb-4 lg:mb-6">Selected Estimate</h2>
              <p className="text-sm text-[var(--zuper-text-secondary)] mb-4 md:mb-5 lg:mb-6">
                The primary signer has selected the following roofing package for this project.
              </p>

              <div className="bg-[var(--zuper-background)] border-2 border-[var(--zuper-success)] rounded-lg p-4 md:p-5 lg:p-6 mb-6">
                <div className="flex items-start justify-between mb-3 md:mb-3 lg:mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)]">
                        {selectedOption.title}
                      </h3>
                      {selectedOption.recommended && (
                        <Badge className="bg-[var(--zuper-primary)] text-white text-xs">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-[var(--zuper-text-secondary)]">
                      {selectedOption.description}
                    </p>
                  </div>
                  <p className="text-xl md:text-lg lg:text-2xl text-[var(--zuper-estimate)] flex-shrink-0 ml-4">
                    ${selectedOption.price.toLocaleString()}
                  </p>
                </div>
                
                {/* Package Features based on selected option */}
                <ul className="space-y-2 text-xs text-[var(--zuper-text-secondary)] mt-4">
                  {selectedOption.id === "standard-package" && (
                    <>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>Owens Corning Duration Series Architectural Shingles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>25-Year Material Warranty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>10-Year Workmanship Warranty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>130 MPH Wind Rating</span>
                      </li>
                    </>
                  )}
                  {selectedOption.id === "premium-package" && (
                    <>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>GAF Timberline HDZ High-Definition Shingles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>Lifetime Limited Material Warranty (50 Years)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>15-Year Workmanship Warranty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>StrikeZone Nailing Technology</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>Algae Resistance Protection</span>
                      </li>
                    </>
                  )}
                  {selectedOption.id === "elite-package" && (
                    <>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>CertainTeed Landmark Premium Designer Shingles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>Lifetime Limited Warranty with SureStart Protection</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>20-Year Workmanship Warranty</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>Class 4 Impact Resistance (Insurance Discount)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>StreakFighter Algae Resistance (15 Years)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                        <span>Authentic Wood-Shake Appearance</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>

              {/* Selected Addons */}
              {selectedAddons && selectedAddons.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)] mb-4">
                    Selected Upgrades
                  </h3>
                  <div className="space-y-3">
                    {selectedAddons.map((addon) => (
                      <div
                        key={addon.id}
                        className="bg-[var(--zuper-background)] border border-[var(--zuper-success)] rounded-lg p-3 sm:p-4"
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={addon.image}
                            alt={addon.title}
                            className="w-12 h-12 sm:w-16 sm:h-16 rounded object-cover flex-shrink-0 ring-1 ring-[var(--zuper-border)]"
                          />
                          <div className="flex items-start justify-between gap-3 flex-1">
                            <div className="flex items-start gap-2 flex-1">
                              <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                              <div className="flex-1">
                                <p className="text-sm text-[var(--zuper-text-primary)] mb-1">
                                  {addon.title}
                                </p>
                                <p className="text-xs text-[var(--zuper-text-secondary)]">
                                  {addon.description}
                                </p>
                              </div>
                            </div>
                            <p className="text-sm font-medium text-[var(--zuper-text-primary)] flex-shrink-0">
                              +${addon.price.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            // Show all options for primary signers
            <>
              <h2 className="text-2xl md:text-xl lg:text-3xl text-[var(--zuper-text-primary)] mb-4 md:mb-4 lg:mb-6">Estimate Options</h2>
              <p className="text-sm text-[var(--zuper-text-secondary)] mb-4 md:mb-5 lg:mb-6">
                We offer three roofing packages to fit your needs and budget. All options include the complete scope 
                of work outlined above and come with our satisfaction guarantee.
              </p>

              <div className="space-y-3 md:space-y-3 lg:space-y-4">
                {/* Standard Package */}
                <div className="border-2 border-[var(--zuper-border)] rounded-lg p-4 md:p-5 lg:p-6 hover:border-[var(--zuper-primary)] transition-colors">
                  <div className="flex items-start justify-between mb-3 md:mb-3 lg:mb-4">
                    <div>
                      <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)] mb-1">Standard Package</h3>
                      <p className="text-xs text-[var(--zuper-text-secondary)]">
                        Quality protection with 25-year warranty
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl md:text-lg lg:text-2xl text-[var(--zuper-estimate)]">$12,500</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--zuper-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>Owens Corning Duration Series Architectural Shingles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>25-Year Material Warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>10-Year Workmanship Warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>130 MPH Wind Rating</span>
                    </li>
                  </ul>
                </div>

                {/* Premium Package */}
                <div className="border-2 border-[var(--zuper-primary)] rounded-lg p-4 md:p-5 lg:p-6 bg-[var(--zuper-primary)]/5 relative">
                  <div className="absolute -top-3 left-6 bg-[var(--zuper-primary)] text-white px-3 py-1 rounded-full text-xs">
                    Most Popular
                  </div>
                  <div className="flex items-start justify-between mb-3 md:mb-3 lg:mb-4">
                    <div>
                      <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)] mb-1">Premium Package</h3>
                      <p className="text-xs text-[var(--zuper-text-secondary)]">
                        Enhanced durability with extended warranty
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl md:text-lg lg:text-2xl text-[var(--zuper-estimate)]">$15,800</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--zuper-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>GAF Timberline HDZ High-Definition Shingles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>Lifetime Limited Material Warranty (50 Years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>15-Year Workmanship Warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>StrikeZone Nailing Technology</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>Algae Resistance Protection</span>
                    </li>
                  </ul>
                </div>

                {/* Elite Package */}
                <div className="border-2 border-[var(--zuper-border)] rounded-lg p-4 md:p-5 lg:p-6 hover:border-[var(--zuper-primary)] transition-colors">
                  <div className="flex items-start justify-between mb-3 md:mb-3 lg:mb-4">
                    <div>
                      <h3 className="text-base md:text-base lg:text-lg text-[var(--zuper-text-primary)] mb-1">Elite Package</h3>
                      <p className="text-xs text-[var(--zuper-text-secondary)]">
                        Premium designer shingles with maximum protection
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl md:text-lg lg:text-2xl text-[var(--zuper-estimate)]">$19,200</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs text-[var(--zuper-text-secondary)]">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>CertainTeed Landmark Premium Designer Shingles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>Lifetime Limited Warranty with SureStart Protection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>20-Year Workmanship Warranty</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>Class 4 Impact Resistance (Insurance Discount)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>StreakFighter Algae Resistance (15 Years)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 md:w-3 md:h-3 lg:w-4 lg:h-4 text-[var(--zuper-green)] flex-shrink-0 mt-0.5" />
                      <span>Authentic Wood-Shake Appearance</span>
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          <div className="mt-4 md:mt-5 lg:mt-6 p-3 md:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-xs text-blue-900">
              <strong>Note:</strong> All prices include materials, labor, permits, and cleanup. Does not include 
              costs for unexpected structural repairs beyond normal deck replacement. Payment terms: 50% deposit 
              upon contract signing, 50% upon completion.
            </p>
          </div>
        </div>
      </div>
    </div>
    );
  };

  // Page 4 Component (Terms & Conditions - abbreviated)
  const Page4 = () => (
    <div className="bg-white page-section border-t-2 border-[var(--zuper-border)] lg:border-t-2" id="page-4">
      <div className="px-6 py-6 md:px-8 md:py-6 lg:px-12 lg:py-10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-xl lg:text-3xl text-[var(--zuper-text-primary)] mb-4 md:mb-4 lg:mb-6">Terms & Conditions</h2>
          
          <div className="space-y-4 md:space-y-5 lg:space-y-6 text-xs text-[var(--zuper-text-secondary)]">
            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">1. Contract Agreement</h4>
              <p className="leading-relaxed">
                This proposal, when accepted by customer's signature, becomes a binding contract between {companyName} 
                (the "Contractor") and the customer (the "Owner"). Work will commence upon receipt of deposit and 
                signed contract. This proposal is valid for 30 days from the date of issue.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">2. Payment Terms</h4>
              <p className="leading-relaxed">
                Payment schedule: 50% deposit due upon contract signing, 50% due upon project completion. We accept 
                cash, check, credit cards (Visa, Mastercard, American Express), and offer financing options through 
                approved partners. All payments must be received before final walkthrough and warranty documentation 
                is provided.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">3. Scope of Work & Changes</h4>
              <p className="leading-relaxed">
                The scope of work is as described in this proposal. Any additional work requested by the Owner or 
                required due to unforeseen conditions (such as hidden structural damage, code violations, or extensive 
                deck rot) will be documented and priced separately. Owner will be notified of additional costs before 
                work proceeds.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">4. Permits & Inspections</h4>
              <p className="leading-relaxed">
                Contractor will obtain all necessary building permits required by local authorities. All work will be 
                performed in compliance with local building codes and manufacturer specifications. Owner is responsible 
                for ensuring property access and providing utilities (electricity and water) if needed.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">5. Timeline & Weather Delays</h4>
              <p className="leading-relaxed">
                Project timeline is estimated based on normal working conditions. Delays due to weather, material 
                availability, or circumstances beyond Contractor's control will not be considered a breach of contract. 
                Contractor will make reasonable efforts to minimize delays and keep Owner informed of schedule changes.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">6. Warranty Information</h4>
              <p className="leading-relaxed">
                Material warranties are provided by manufacturers and vary by product selected. Workmanship warranty 
                is provided by {companyName} as specified in your chosen package. Warranty does not cover damage from 
                acts of nature, owner negligence, or modifications made by others. Full warranty documentation will be 
                provided upon project completion.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">7. Property Protection & Cleanup</h4>
              <p className="leading-relaxed">
                Contractor will take reasonable precautions to protect Owner's property, landscaping, and structures 
                during the project. A magnetic sweep will be performed daily and upon completion. Debris and old 
                materials will be removed and disposed of properly. Owner should remove or protect valuable plants, 
                decorations, and items near work areas.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">8. Insurance & Liability</h4>
              <p className="leading-relaxed">
                Contractor maintains full liability insurance and workers' compensation coverage for all employees. 
                Certificate of insurance available upon request. Contractor is not liable for pre-existing conditions 
                or damage discovered during work that was not caused by our operations.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">9. Cancellation Policy</h4>
              <p className="leading-relaxed">
                Owner may cancel this contract in writing within 3 business days of signing with no penalty. After 
                3 days, cancellation will result in forfeiture of the deposit to cover administrative costs, material 
                ordering, and scheduling. If work has commenced, Owner is responsible for payment for work completed 
                and materials purchased.
              </p>
            </div>

            <div>
              <h4 className="text-sm md:text-xs lg:text-sm text-[var(--zuper-text-primary)] mb-2">10. Dispute Resolution</h4>
              <p className="leading-relaxed">
                Any disputes arising from this contract will first be addressed through good-faith negotiation. If 
                resolution cannot be reached, both parties agree to mediation before pursuing legal action. This 
                contract shall be governed by the laws of the state in which the work is performed.
              </p>
            </div>
          </div>

          <div className="mt-6 md:mt-8 p-4 md:p-5 lg:p-6 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
            <p className="text-sm text-[var(--zuper-text-primary)] mb-3">
              By signing this proposal, you acknowledge that you have read, understood, and agree to these terms and conditions.
            </p>
            <p className="text-xs text-[var(--zuper-text-secondary)]">
              For questions about these terms or to request modifications, please contact us at (555) 123-4567 or 
              info@{companyName.toLowerCase().replace(/\s+/g, '')}.com before signing.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const pages = [Page1, Page2, Page3, Page4];
  const CurrentPageComponent = pages[currentPage - 1];

  return (
    <>
      {/* Desktop: Continuous Scroll (> 1024px) */}
      <div className="hidden lg:block bg-white">
        <Page1 />
        <Page2 />
        <Page3 />
        <Page4 />
      </div>

      {/* Mobile & Tablet: Paginated (< 1024px) */}
      <div 
        className="lg:hidden bg-white"
        ref={containerRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Current Page */}
        <div className="min-h-[500px]">
          <CurrentPageComponent />
        </div>
      </div>
    </>
  );
}