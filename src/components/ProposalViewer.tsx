import { Proposal } from "../data/mockProposal";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { FileText, Building2, ArrowRight, ChevronLeft, ChevronRight, Menu, FileCheck, ClipboardList, DollarSign, ScrollText } from "lucide-react";
import { useEffect, useState } from "react";
import { DocumentPreview, PaginationControls } from "./DocumentPreview";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import { SwipeOnboarding } from "./SwipeOnboarding";

interface ProposalViewerProps {
  proposal: Proposal;
  onStartSigning: () => void;
  onRequestChange?: () => void;
  scrollToSectionId?: string;
  highlightSectionId?: string;
  hideWelcome?: boolean;
  hideCTA?: boolean;
}

export function ProposalViewer({ 
  proposal, 
  onStartSigning,
  onRequestChange,
  scrollToSectionId,
  highlightSectionId,
  hideWelcome = false,
  hideCTA = false
}: ProposalViewerProps) {
  const [showFloatingCTA, setShowFloatingCTA] = useState(false);
  const [paginationControls, setPaginationControls] = useState<PaginationControls | null>(null);
  const [isPageMenuOpen, setIsPageMenuOpen] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Page navigation data
  const pages = [
    { number: 1, title: "Cover & About Us", icon: FileCheck, description: "Company overview and credentials" },
    { number: 2, title: "Inspection Summary", icon: ClipboardList, description: "Property assessment and findings" },
    { number: 3, title: "Scope & Estimates", icon: DollarSign, description: "Work details and pricing options" },
    { number: 4, title: "Terms & Conditions", icon: ScrollText, description: "Contract terms and policies" },
  ];

  // Auto-scroll to section when scrollToSectionId changes
  useEffect(() => {
    if (scrollToSectionId) {
      const element = document.getElementById(`section-${scrollToSectionId}`);
      if (element) {
        // Scroll with offset for the sticky header
        const yOffset = -120;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [scrollToSectionId]);

  // Show floating CTA when user scrolls past header
  useEffect(() => {
    if (hideCTA) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setShowFloatingCTA(scrollPosition > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hideCTA]);

  // Hide header on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only start hiding after scrolling past a threshold
      if (currentScrollY < 10) {
        setShowHeader(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);
  return (
    <div className="min-h-screen bg-[var(--zuper-background)]">
      {/* Header - Adaptive layouts for mobile/tablet/desktop */}
      <header className={`bg-[var(--zuper-card)] border-b border-[var(--zuper-border)] sticky top-0 z-40 backdrop-blur-sm bg-opacity-95 transition-transform duration-300 ${showHeader ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Mobile Layout (< 768px) */}
        <div className="md:hidden px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={proposal.companyLogo}
                alt={proposal.companyName}
                className="w-8 h-8 rounded object-cover ring-1 ring-[var(--zuper-border)]"
              />
              <div>
                <h1 className="text-xs text-[var(--zuper-text-primary)]">{proposal.companyName}</h1>
              </div>
            </div>
            <Badge variant="outline" className="bg-[var(--zuper-primary-light)] text-[var(--zuper-primary)] border-[var(--zuper-primary)]/10 text-[10px] px-2 py-0.5">
              Awaiting
            </Badge>
          </div>
        </div>

        {/* Tablet Layout (768px - 1024px) */}
        <div className="hidden md:block lg:hidden px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={proposal.companyLogo}
                alt={proposal.companyName}
                className="w-8 h-8 rounded-md object-cover ring-1 ring-[var(--zuper-border)]"
              />
              <div>
                <h1 className="text-sm text-[var(--zuper-text-primary)]">{proposal.companyName}</h1>
                <p className="text-xs text-[var(--zuper-text-secondary)]">{proposal.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="bg-[var(--zuper-primary-light)] text-[var(--zuper-primary)] border-[var(--zuper-primary)]/10 text-xs">
                Awaiting Signature
              </Badge>
              {!hideCTA && (
                <>
                  {onRequestChange && (
                    <Button
                      onClick={onRequestChange}
                      variant="outline"
                      className="border-[var(--zuper-border)] text-[var(--zuper-text-secondary)] hover:bg-[var(--zuper-background)] hover:text-[var(--zuper-text-primary)] text-xs"
                      size="sm"
                    >
                      Request Changes
                    </Button>
                  )}
                  <Button
                    onClick={onStartSigning}
                    className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary-hover)] shadow-sm text-xs"
                    size="sm"
                  >
                    Review & Sign
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Desktop Layout (> 1024px) */}
        <div className="hidden lg:block">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={proposal.companyLogo}
                alt={proposal.companyName}
                className="w-9 h-9 rounded-md object-cover ring-1 ring-[var(--zuper-border)]"
              />
              <div>
                <h1 className="text-sm text-[var(--zuper-text-primary)]">{proposal.companyName}</h1>
                <p className="text-xs text-[var(--zuper-text-secondary)]">{proposal.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-[var(--zuper-primary-light)] text-[var(--zuper-primary)] border-[var(--zuper-primary)]/10 text-xs">
                Awaiting Signature
              </Badge>
              {!hideCTA && (
                <>
                  {onRequestChange && (
                    <Button
                      onClick={onRequestChange}
                      variant="outline"
                      className="border-[var(--zuper-border)] text-[var(--zuper-text-secondary)] hover:bg-[var(--zuper-background)] hover:text-[var(--zuper-text-primary)] text-sm"
                      size="sm"
                    >
                      Request Changes
                    </Button>
                  )}
                  <Button
                    onClick={onStartSigning}
                    className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary-hover)] shadow-sm text-sm"
                    size="sm"
                  >
                    Review & Sign
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sticky Document Header */}
      <div className={`bg-[var(--zuper-card)] border-b border-[var(--zuper-border)] px-4 py-3 flex items-center justify-between sticky z-30 backdrop-blur-sm bg-opacity-95 transition-all duration-300 ${showHeader ? 'top-[57px] md:top-[61px] lg:top-[69px]' : 'top-0'}`}>
            <div className="flex items-center gap-2 text-[var(--zuper-text-primary)] text-sm">
              <FileText className="w-4 h-4 text-[var(--zuper-text-tertiary)]" />
              <span className="text-xs">{proposal.title}.pdf</span>
            </div>
            <div className="flex items-center gap-3">
              {/* Page indicator - Mobile/Tablet only */}
              {paginationControls && (
                <div className="lg:hidden bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-full px-2.5 py-1">
                  <span className="text-[10px] text-[var(--zuper-text-secondary)]">
                    {paginationControls.currentPage}/{paginationControls.totalPages}
                  </span>
                </div>
              )}
              <span className="text-[var(--zuper-text-tertiary)] text-xs hidden md:inline">Document Preview</span>
              
              {/* Page Navigation Menu - Show on all screen sizes */}
              <Sheet open={isPageMenuOpen} onOpenChange={setIsPageMenuOpen}>
                <SheetTrigger asChild>
                  <button className="h-8 w-8 p-0 rounded-md hover:bg-[var(--zuper-background)] transition-colors flex items-center justify-center">
                    <Menu className="w-4 h-4 text-[var(--zuper-text-secondary)]" />
                  </button>
                </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                    <SheetHeader className="pb-4 border-b border-[var(--zuper-border)]">
                      <SheetTitle className="text-[var(--zuper-text-primary)]">Navigate Pages</SheetTitle>
                    </SheetHeader>
                    <div className="mt-4 space-y-0 divide-y divide-[var(--zuper-border)]">
                      {pages.map((page) => {
                        const Icon = page.icon;
                        const isCurrentPage = paginationControls ? paginationControls.currentPage === page.number : false;
                        
                        const handlePageClick = () => {
                          // On mobile/tablet with pagination, use goToPage
                          if (paginationControls) {
                            paginationControls.goToPage(page.number);
                          } else {
                            // On desktop, scroll to the section
                            const pageElement = document.getElementById(`page-${page.number}`);
                            if (pageElement) {
                              const yOffset = -120;
                              const y = pageElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
                              window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                          }
                          setIsPageMenuOpen(false);
                        };
                        
                        return (
                          <button
                            key={page.number}
                            onClick={handlePageClick}
                            className={`w-full text-left py-3.5 px-3 transition-all relative ${
                              isCurrentPage
                                ? 'bg-[var(--zuper-primary)]/[0.04]'
                                : 'hover:bg-[var(--zuper-background)]'
                            }`}
                          >
                            {isCurrentPage && (
                              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-[var(--zuper-primary)]" />
                            )}
                            <div className="flex items-center gap-3 pl-0.5">
                              <div className={`w-8 h-8 rounded-md flex items-center justify-center flex-shrink-0 transition-colors ${
                                isCurrentPage
                                  ? 'bg-[var(--zuper-primary)]/10'
                                  : 'bg-[var(--zuper-background)]'
                              }`}>
                                <Icon className={`w-4 h-4 ${
                                  isCurrentPage
                                    ? 'text-[var(--zuper-primary)]'
                                    : 'text-[var(--zuper-text-tertiary)]'
                                }`} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                  <span className={`text-[11px] ${
                                    isCurrentPage
                                      ? 'text-[var(--zuper-primary)]'
                                      : 'text-[var(--zuper-text-tertiary)]'
                                  }`}>
                                    Page {page.number}
                                  </span>
                                  {isCurrentPage && (
                                    <Badge variant="outline" className="h-4 px-1.5 text-[10px] border-[var(--zuper-primary)]/20 bg-[var(--zuper-primary)]/5 text-[var(--zuper-primary)]">
                                      Current
                                    </Badge>
                                  )}
                                </div>
                                <h4 className={`text-sm ${
                                  isCurrentPage
                                    ? 'text-[var(--zuper-text-primary)]'
                                    : 'text-[var(--zuper-text-secondary)]'
                                }`}>
                                  {page.title}
                                </h4>
                                <p className="text-xs text-[var(--zuper-text-tertiary)] mt-0.5">
                                  {page.description}
                                </p>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
            </div>
          </div>

      {/* Main Content - Adaptive padding and width */}
      <main className="mx-auto px-4 pb-32 md:px-5 lg:max-w-6xl lg:px-6">
        {/* PDF Viewer */}
        <Card className="p-0 overflow-hidden bg-[var(--zuper-card)] border-[var(--zuper-border)] shadow-sm mb-6">
          {/* Document Preview with section markers */}
          <div className="w-full relative">
            <DocumentPreview
              companyName={proposal.companyName}
              companyLogo={proposal.companyLogo}
              recipientName={proposal.recipientName}
              recipientAddress={proposal.recipientAddress}
              sections={proposal.sections}
              hideNavigation={hideCTA}
              onPaginationChange={setPaginationControls}
            />
            
            {/* Section markers overlay - positioned absolutely */}
            {proposal.sections.map((section, index) => {
              const isHighlighted = highlightSectionId === section.id;
              return (
                <div
                  key={section.id}
                  id={`section-${section.id}`}
                  className={`absolute left-0 right-0 transition-all duration-300 ${
                    isHighlighted ? 'bg-[var(--zuper-primary)]/5 border-l-2 border-[var(--zuper-primary)]' : ''
                  }`}
                  style={{
                    top: `${(section.page - 1) * 25}%`,
                    height: '25%',
                    pointerEvents: 'none'
                  }}
                >
                  {isHighlighted && (
                    <div className="absolute top-4 left-4 bg-[var(--zuper-card)] border border-[var(--zuper-primary)] text-[var(--zuper-text-primary)] px-4 py-2.5 rounded-lg text-xs shadow-sm animate-in fade-in slide-in-from-left-5 duration-300">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-[var(--zuper-primary)] animate-pulse" />
                        <span className="text-[var(--zuper-text-secondary)]">Reviewing:</span>
                        <span className="text-[var(--zuper-text-primary)]">{section.title}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </main>

      {/* Combined Floating Bar - Mobile & Tablet with Pagination */}
      {!hideCTA && paginationControls && (
        <>
          {/* Mobile: Floating edge navigation arrows */}
          <div className="md:hidden fixed top-1/2 -translate-y-1/2 left-0 right-0 z-30 pointer-events-none">
            <div className="flex items-center justify-between px-3">
              {/* Left arrow */}
              <button
                onClick={paginationControls.prevPage}
                disabled={paginationControls.currentPage === 1}
                className={`pointer-events-auto w-10 h-10 rounded-full backdrop-blur-sm border shadow-lg transition-all ${
                  paginationControls.currentPage === 1
                    ? 'opacity-0 invisible'
                    : 'bg-[var(--zuper-card)]/90 border-[var(--zuper-border)] hover:bg-[var(--zuper-card)] hover:scale-110 active:scale-95'
                }`}
              >
                <ChevronLeft className="w-5 h-5 text-[var(--zuper-text-primary)] mx-auto" />
              </button>

              {/* Right arrow */}
              <button
                onClick={paginationControls.nextPage}
                disabled={paginationControls.currentPage === paginationControls.totalPages}
                className={`pointer-events-auto w-10 h-10 rounded-full backdrop-blur-sm border shadow-lg transition-all ${
                  paginationControls.currentPage === paginationControls.totalPages
                    ? 'opacity-0 invisible'
                    : 'bg-[var(--zuper-card)]/90 border-[var(--zuper-border)] hover:bg-[var(--zuper-card)] hover:scale-110 active:scale-95'
                }`}
              >
                <ChevronRight className="w-5 h-5 text-[var(--zuper-text-primary)] mx-auto" />
              </button>
            </div>
          </div>

          {/* Mobile: Slim bottom action bar */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--zuper-card)] border-t border-[var(--zuper-border)] shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300">
            <div className="px-4 py-3 space-y-2">
              <Button
                onClick={onStartSigning}
                className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary-hover)] shadow-sm w-full h-11 text-sm"
              >
                Review & Sign
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              {onRequestChange && (
                <Button
                  onClick={onRequestChange}
                  variant="outline"
                  className="w-full h-10 text-sm border-[var(--zuper-border)] text-[var(--zuper-text-secondary)] hover:bg-[var(--zuper-background)] hover:text-[var(--zuper-text-primary)]"
                >
                  Request Changes
                </Button>
              )}
            </div>
          </div>

          {/* Tablet: Optimized navigation layout */}
          <div className="hidden md:block lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--zuper-card)] border-t border-[var(--zuper-border)] shadow-lg animate-in slide-in-from-bottom-5 fade-in duration-300">
            {/* Thumbnail Navigation Bar - Collapsible */}
            {showThumbnails && (
              <div className="border-b border-[var(--zuper-border)] px-5 py-2.5 overflow-x-auto animate-in slide-in-from-bottom-2 fade-in duration-200">
                <div className="flex items-center gap-2 min-w-min pb-1">
                  {pages.map((page) => {
                    const Icon = page.icon;
                    const isActive = paginationControls.currentPage === page.number;
                    
                    return (
                      <button
                        key={page.number}
                        onClick={() => {
                          paginationControls.goToPage(page.number);
                          setShowThumbnails(false);
                        }}
                        className={`flex-shrink-0 w-20 transition-all ${
                          isActive ? 'opacity-100' : 'opacity-60 hover:opacity-80'
                        }`}
                      >
                        {/* Compact thumbnail preview */}
                        <div className={`relative bg-white border rounded overflow-hidden transition-all ${
                          isActive 
                            ? 'border-[var(--zuper-primary)] shadow-sm ring-1 ring-[var(--zuper-primary)]/20' 
                            : 'border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)]'
                        }`}>
                          {/* Mini page representation */}
                          <div className="aspect-[8.5/11] p-1.5 flex flex-col">
                            <div className={`w-full h-5 rounded-sm mb-1 flex items-center justify-center ${
                              page.number === 1 ? 'bg-gradient-to-br from-gray-700 to-gray-900' :
                              'bg-[var(--zuper-background)]'
                            }`}>
                              <Icon className={`w-2.5 h-2.5 ${page.number === 1 ? 'text-white' : 'text-[var(--zuper-text-tertiary)]'}`} />
                            </div>
                            <div className="space-y-0.5 flex-1">
                              <div className="h-0.5 bg-[var(--zuper-border)] rounded w-3/4" />
                              <div className="h-0.5 bg-[var(--zuper-border)] rounded w-full" />
                              <div className="h-0.5 bg-[var(--zuper-border)] rounded w-4/5" />
                            </div>
                          </div>
                          
                          {/* Active indicator */}
                          {isActive && (
                            <div className="absolute inset-0 bg-[var(--zuper-primary)]/5 pointer-events-none" />
                          )}
                        </div>
                        
                        {/* Page label */}
                        <div className="mt-1 text-center">
                          <p className={`text-[9px] transition-colors ${
                            isActive 
                              ? 'text-[var(--zuper-primary)]' 
                              : 'text-[var(--zuper-text-tertiary)]'
                          }`}>
                            {page.number}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            
            {/* Main Navigation Row */}
            <div className="px-5 py-2.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={paginationControls.prevPage}
                  disabled={paginationControls.currentPage === 1}
                  className="p-2.5 rounded-lg border border-[var(--zuper-border)] hover:bg-[var(--zuper-background)] hover:border-[var(--zuper-text-tertiary)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[var(--zuper-border)] transition-all"
                >
                  <ChevronLeft className="w-5 h-5 text-[var(--zuper-text-primary)]" />
                </button>
                
                {/* Pages toggle button */}
                <button
                  onClick={() => setShowThumbnails(!showThumbnails)}
                  className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border transition-all ${
                    showThumbnails 
                      ? 'bg-[var(--zuper-primary)]/10 border-[var(--zuper-primary)] text-[var(--zuper-primary)] shadow-sm' 
                      : 'border-[var(--zuper-border)] hover:bg-[var(--zuper-background)] hover:border-[var(--zuper-text-tertiary)] text-[var(--zuper-text-primary)]'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span className="text-sm">
                    Page {paginationControls.currentPage} of {paginationControls.totalPages}
                  </span>
                  <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showThumbnails ? 'rotate-90' : '-rotate-90'}`} />
                </button>
                
                <button
                  onClick={paginationControls.nextPage}
                  disabled={paginationControls.currentPage === paginationControls.totalPages}
                  className="p-2.5 rounded-lg border border-[var(--zuper-border)] hover:bg-[var(--zuper-background)] hover:border-[var(--zuper-text-tertiary)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-[var(--zuper-border)] transition-all"
                >
                  <ChevronRight className="w-5 h-5 text-[var(--zuper-text-primary)]" />
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                {onRequestChange && (
                  <Button
                    onClick={onRequestChange}
                    variant="outline"
                    className="border-[var(--zuper-border)] text-[var(--zuper-text-secondary)] hover:bg-[var(--zuper-background)] hover:text-[var(--zuper-text-primary)] text-sm"
                    size="sm"
                  >
                    Request Changes
                  </Button>
                )}
                <Button
                  onClick={onStartSigning}
                  className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary-hover)] shadow-sm text-sm"
                  size="sm"
                >
                  Review & Sign
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Desktop: Bottom right corner CTA only (no pagination needed) */}
      {!hideCTA && showFloatingCTA && (
        <div className="hidden lg:block fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-5 fade-in duration-300">
          <Button
            onClick={onStartSigning}
            size="lg"
            className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary-hover)] shadow-xl hover:shadow-2xl transition-all text-sm group"
          >
            Review & Sign
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      )}

      {/* Swipe Onboarding for Mobile/Tablet */}
      <SwipeOnboarding />
    </div>
  );
}
