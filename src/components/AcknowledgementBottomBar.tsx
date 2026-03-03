import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { CheckCircle2 } from "lucide-react";
import { ProposalSection } from "../data/mockProposal";

interface AcknowledgementBottomBarProps {
  section: ProposalSection;
  currentIndex: number;
  totalCount: number;
  onAcknowledge: () => void;
}

export function AcknowledgementBottomBar({
  section,
  currentIndex,
  totalCount,
  onAcknowledge,
}: AcknowledgementBottomBarProps) {
  const isLastSection = currentIndex === totalCount - 1;
  const progressPercent = ((currentIndex + 1) / totalCount) * 100;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-5 duration-300">
      {/* Progress bar at top of bottom bar */}
      <div className="w-full bg-[var(--zuper-border)] h-0.5">
        <div
          className="bg-[var(--zuper-primary)] h-0.5 transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      
      <div className="border-t border-[var(--zuper-border)] bg-[var(--zuper-card)]/95 backdrop-blur-sm shadow-2xl">
        <Card className="rounded-none border-0 shadow-none bg-transparent">
          {/* Mobile Layout (< 768px) */}
          <div className="md:hidden px-4 py-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-md bg-[var(--zuper-primary-light)] flex items-center justify-center flex-shrink-0 border border-[var(--zuper-primary)]/10">
                <CheckCircle2 className="w-3.5 h-3.5 text-[var(--zuper-primary)]" />
              </div>
              <div className="flex-1">
                <span className="text-[10px] text-[var(--zuper-text-tertiary)] tracking-wide uppercase block mb-0.5">
                  Step {currentIndex + 1} of {totalCount}
                </span>
                <h4 className="text-xs text-[var(--zuper-text-primary)]">
                  {section.title}
                </h4>
              </div>
            </div>
            <Button
              onClick={onAcknowledge}
              className="bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-white w-full h-11 text-sm"
            >
              {isLastSection ? "Continue to Signature" : "Acknowledge & Continue"}
            </Button>
          </div>

          {/* Tablet Layout (768px - 1024px) */}
          <div className="hidden md:block lg:hidden px-5 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-md bg-[var(--zuper-primary-light)] flex items-center justify-center flex-shrink-0 border border-[var(--zuper-primary)]/10">
                  <CheckCircle2 className="w-4 h-4 text-[var(--zuper-primary)]" />
                </div>
                <div>
                  <span className="text-xs text-[var(--zuper-text-tertiary)] tracking-wide uppercase block mb-0.5">
                    Step {currentIndex + 1} of {totalCount}
                  </span>
                  <h4 className="text-sm text-[var(--zuper-text-primary)]">
                    {section.title}
                  </h4>
                </div>
              </div>
              <Button
                onClick={onAcknowledge}
                className="bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-white shadow-sm text-sm flex-shrink-0"
                size="default"
              >
                {isLastSection ? "Continue" : "Acknowledge"}
              </Button>
            </div>
          </div>

          {/* Desktop Layout (> 1024px) */}
          <div className="hidden lg:block">
            <div className="max-w-6xl mx-auto px-6 py-5">
              <div className="flex items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-md bg-[var(--zuper-primary-light)] flex items-center justify-center flex-shrink-0 border border-[var(--zuper-primary)]/10">
                    <CheckCircle2 className="w-4 h-4 text-[var(--zuper-primary)]" />
                  </div>
                  <div>
                    <span className="text-xs text-[var(--zuper-text-tertiary)] tracking-wide uppercase block mb-0.5">
                      Step {currentIndex + 1} of {totalCount}
                    </span>
                    <h4 className="text-sm text-[var(--zuper-text-primary)]">
                      {section.title}
                    </h4>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <p className="text-xs text-[var(--zuper-text-tertiary)] max-w-xs">
                    Please review the section content above before proceeding
                  </p>
                  <Button
                    onClick={onAcknowledge}
                    className="bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-white shadow-sm text-sm flex-shrink-0"
                    size="default"
                  >
                    {isLastSection ? "Continue to Signature" : "Acknowledge & Continue"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
