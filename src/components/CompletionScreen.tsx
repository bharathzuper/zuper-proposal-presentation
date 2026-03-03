import { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download, Mail, CheckCircle2, Circle, Clock, ArrowRight, Send } from "lucide-react";
import { Proposal, Signer } from "../data/mockProposal";
import Lottie from "lottie-react";
import { successAnimation } from "../data/successAnimation";

interface CompletionScreenProps {
  proposal: Proposal;
  selectedOptionId: string;
  signers: Signer[];
  selectedAddons?: string[];
  onContinueToNextSigner?: () => void;
  onSendToNextSigner?: () => void;
}

export function CompletionScreen({ proposal, selectedOptionId, signers, selectedAddons, onContinueToNextSigner, onSendToNextSigner }: CompletionScreenProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const selectedOption = proposal.estimateOptions.find(opt => opt.id === selectedOptionId);
  
  // Calculate signature progress
  const signedCount = signers.filter(s => s.status === "signed").length;
  const totalSigners = signers.length;
  const allSigned = signedCount === totalSigners;
  
  // Find the next signer who needs to sign (status is "current")
  const nextSigner = signers.find(s => s.status === "current");

  useEffect(() => {
    // Scroll to top to ensure animation is visible
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--zuper-background)] py-6 sm:py-8 md:py-12 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-5 sm:p-6 bg-[var(--zuper-card)] border-[var(--zuper-border)] shadow-sm text-center">
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto -mb-4">
            <Lottie animationData={successAnimation} loop={false} />
          </div>

          <div className="mb-2">
            <span className="text-[10px] sm:text-xs text-[var(--zuper-text-tertiary)] tracking-wide uppercase">
              {allSigned ? "Successfully Completed" : "Signature Submitted"}
            </span>
          </div>
          <h2 className="mb-1.5 text-[var(--zuper-text-primary)] text-lg sm:text-xl">
            {allSigned 
              ? `Thank you, ${proposal.recipientName}` 
              : `Thank you for signing, ${signers.find(s => s.status === "signed" && s.order === signedCount)?.name}`
            }
          </h2>
          <p className="text-[var(--zuper-text-secondary)] mb-6 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            {(() => {
              const lastSignedSigner = signers.filter(s => s.status === "signed").sort((a, b) => 
                new Date(b.signedAt || 0).getTime() - new Date(a.signedAt || 0).getTime()
              )[0];
              const isCompanySignerCompleting = lastSignedSigner?.isCompanySigner;
              
              if (allSigned) {
                if (isCompanySignerCompleting) {
                  return `Thank you for finalizing this agreement on behalf of ${proposal.companyName}. All parties have signed and the contract is now complete. Confirmation emails have been sent to all signers.`;
                } else {
                  return `Your proposal has been signed and submitted to ${proposal.companyName}. You'll receive a confirmation email shortly.`;
                }
              } else {
                if (isCompanySignerCompleting) {
                  return `Your company authorization has been recorded. ${nextSigner ? `The proposal will now be sent to ${nextSigner.name} for their signature.` : ''}`;
                } else {
                  return `Your signature has been recorded. ${nextSigner ? `The proposal will now be sent to ${nextSigner.name} for their signature.` : ''}`;
                }
              }
            })()}
          </p>



          {/* Action Buttons */}
          {!allSigned && nextSigner ? (
            <div className="mb-5">
              <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-3 sm:p-4 mb-3">
                <p className="text-xs sm:text-sm text-[var(--zuper-text-primary)] mb-1">
                  {nextSigner.isCompanySigner ? (
                    <>Company authorization required</>
                  ) : (
                    <>{nextSigner.name} needs to sign next</>
                  )}
                </p>
                <p className="text-xs text-[var(--zuper-text-secondary)]">
                  {nextSigner.isCompanySigner ? (
                    <>
                      <span className="md:hidden">Is the company representative present to finalize, or should we send them an email?</span>
                      <span className="hidden md:inline">An email notification has been sent to {nextSigner.email} for final company authorization.</span>
                    </>
                  ) : (
                    <>
                      <span className="md:hidden">Is {nextSigner.name.split(' ')[0]} present to sign now, or should we send them an email?</span>
                      <span className="hidden md:inline">An email notification has been sent to {nextSigner.email} to complete their signature.</span>
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-2">
                {/* Continue button - only visible on mobile/tablet */}
                <Button
                  onClick={onContinueToNextSigner}
                  className="w-full md:hidden bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-xs sm:text-sm h-auto py-2.5 sm:py-2"
                  size="default"
                >
                  <ArrowRight className="w-3.5 h-3.5 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">
                    {nextSigner.isCompanySigner ? (
                      <>Continue to Company Authorization</>
                    ) : (
                      <>Continue to {nextSigner.name.split(' ')[0]}'s Signature</>
                    )}
                  </span>
                </Button>
                {/* Send email button - only visible on mobile/tablet */}
                <Button
                  onClick={onSendToNextSigner}
                  variant="outline"
                  className="w-full md:hidden border-[var(--zuper-border)] text-[var(--zuper-text-primary)] hover:bg-[var(--zuper-background)] text-xs sm:text-sm h-auto py-2.5 sm:py-2"
                  size="default"
                >
                  <Send className="w-3.5 h-3.5 mr-1.5 sm:mr-2 flex-shrink-0" />
                  <span className="truncate">Send Email to {nextSigner.name.split(' ')[0]}</span>
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row gap-2 mb-5">
              <Button
                variant="outline"
                className="flex-1 border-[var(--zuper-border)] text-[var(--zuper-text-primary)] hover:bg-[var(--zuper-background)] text-xs sm:text-sm"
                size="default"
              >
                <Download className="w-3.5 h-3.5 mr-2" />
                Download PDF
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-[var(--zuper-border)] text-[var(--zuper-text-primary)] hover:bg-[var(--zuper-background)] text-xs sm:text-sm"
                size="default"
              >
                <Mail className="w-3.5 h-3.5 mr-2" />
                Email Copy
              </Button>
            </div>
          )}

          <p className="text-xs text-[var(--zuper-text-tertiary)] mt-5 border-t border-[var(--zuper-border)] pt-5">
            If you have any questions, please contact {proposal.companyName} directly.
          </p>
        </Card>
      </div>

      <style>{`
        @keyframes fall {
          from {
            transform: translateY(-100vh) rotate(0deg);
          }
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
      `}</style>
    </div>
  );
}