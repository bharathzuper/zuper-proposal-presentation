import { useState } from "react";
import { ProposalViewer } from "../components/ProposalViewer";
import { AcknowledgementBottomBar } from "../components/AcknowledgementBottomBar";
import { SignatureForm } from "../components/SignatureForm";
import { CompletionScreen } from "../components/CompletionScreen";
import { SecondarySignerProposal } from "../components/SecondarySignerProposal";
import { CompanySignerProposal } from "../components/CompanySignerProposal";
import { ChangeRequestDialog } from "../components/ChangeRequestDialog";
import { mockProposal } from "../data/mockProposal";
import { Signer } from "../data/mockProposal";

type FlowStep = "viewer" | "acknowledging" | "signing" | "complete";

interface SignatureData {
  selectedOptionId: string;
  signature: string;
  selectedAddons: string[];
  productOptionSelections?: Record<string, string>;
}

export default function ProposalFlow() {
  const [currentStep, setCurrentStep] = useState<FlowStep>("viewer");
  const [acknowledgedSections, setAcknowledgedSections] = useState<string[]>([]);
  const [currentAcknowledgementIndex, setCurrentAcknowledgementIndex] = useState(0);
  const [signatureData, setSignatureData] = useState<SignatureData | null>(null);
  const [signers, setSigners] = useState<Signer[]>(mockProposal.signers);
  const [currentSignerIndex, setCurrentSignerIndex] = useState(0);
  const [isChangeRequestDialogOpen, setIsChangeRequestDialogOpen] = useState(false);

  const requiredSections = mockProposal.sections.filter(s => s.required);
  const allSectionsAcknowledged = acknowledgedSections.length === requiredSections.length;

  const handleStartSigning = () => {
    // Check if this is the primary signer (first signer)
    const isPrimarySigner = currentSignerIndex === 0;
    
    if (isPrimarySigner) {
      // Primary signer goes through acknowledgement flow
      setCurrentStep("acknowledging");
      setCurrentAcknowledgementIndex(0);
    } else {
      // Secondary signers go directly to signing (they'll sign within the proposal viewer)
      setCurrentStep("signing");
    }
  };

  const handleAcknowledge = () => {
    const currentSection = requiredSections[currentAcknowledgementIndex];
    
    if (!acknowledgedSections.includes(currentSection.id)) {
      setAcknowledgedSections([...acknowledgedSections, currentSection.id]);
    }

    if (currentAcknowledgementIndex < requiredSections.length - 1) {
      setCurrentAcknowledgementIndex(currentAcknowledgementIndex + 1);
    } else {
      // All sections acknowledged, move to signing
      setCurrentStep("signing");
    }
  };

  const handleSignatureSubmit = (data: SignatureData) => {
    // Update the current signer's status
    const updatedSigners = signers.map((signer, index) => {
      if (index === currentSignerIndex) {
        return {
          ...signer,
          status: "signed" as const,
          signedAt: new Date().toISOString(),
          signatureData: data.signature,
        };
      } else if (index === currentSignerIndex + 1) {
        return {
          ...signer,
          status: "current" as const,
        };
      }
      return signer;
    });

    setSigners(updatedSigners);
    setSignatureData(data);
    
    // On desktop, check if next signer exists
    const isDesktop = window.innerWidth >= 768; // md breakpoint
    const hasNextSigner = currentSignerIndex + 1 < signers.length;
    
    if (isDesktop && hasNextSigner) {
      // Move to next signer directly
      setCurrentSignerIndex(currentSignerIndex + 1);
      setCurrentStep("signing");
    } else {
      setCurrentStep("complete");
    }
  };

  // For secondary signers who only submit signature (not option selection)
  const handleSecondarySignatureSubmit = (signature: string) => {
    const data: SignatureData = {
      selectedOptionId: signatureData?.selectedOptionId || "",
      signature: signature,
      selectedAddons: signatureData?.selectedAddons || [],
    };
    handleSignatureSubmit(data);
  };

  const handleRequestChange = () => {
    setIsChangeRequestDialogOpen(true);
  };

  const handleContinueToNextSigner = () => {
    // Move to the next signer's signing step
    setCurrentSignerIndex(currentSignerIndex + 1);
    setCurrentStep("signing");
  };

  const handleSendToNextSigner = () => {
    // Mark current signer as "pending" (email sent)
    const updatedSigners = [...signers];
    updatedSigners[currentSignerIndex] = {
      ...updatedSigners[currentSignerIndex],
      status: "pending",
    };
    setSigners(updatedSigners);
    
    // Send email notification
    const currentSigner = updatedSigners[currentSignerIndex];
    alert(`Email would be sent to ${currentSigner.name} (${currentSigner.email}) with a link to complete their signature.`);
    
    // Check if there are more signers after this one
    if (currentSignerIndex + 1 < signers.length) {
      // Move to next signer
      setCurrentSignerIndex(currentSignerIndex + 1);
      // Stay on completion screen to ask about the next signer
      setCurrentStep("complete");
    } else {
      // No more signers, show final completion
      setCurrentStep("complete");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Viewer Step */}
      {currentStep === "viewer" && (
        <ProposalViewer
          proposal={mockProposal}
          onStartSigning={handleStartSigning}
          onRequestChange={handleRequestChange}
        />
      )}

      {/* Acknowledging Step */}
      {currentStep === "acknowledging" && (
        <>
          {/* Show proposal viewer with current section highlighted */}
          <ProposalViewer
            proposal={mockProposal}
            onStartSigning={() => {}}
            scrollToSectionId={requiredSections[currentAcknowledgementIndex].id}
            highlightSectionId={requiredSections[currentAcknowledgementIndex].id}
            hideWelcome={true}
            hideCTA={true}
          />
          
          {/* Show acknowledgement bottom bar */}
          <AcknowledgementBottomBar
            section={requiredSections[currentAcknowledgementIndex]}
            onAcknowledge={handleAcknowledge}
            currentIndex={currentAcknowledgementIndex}
            totalCount={requiredSections.length}
          />
        </>
      )}

      {/* Signing Step */}
      {currentStep === "signing" && (() => {
        const currentSigner = signers[currentSignerIndex];
        
        if (currentSignerIndex === 0) {
          // Primary signer sees the full signature form
          return (
            <SignatureForm
              estimateOptions={mockProposal.estimateOptions}
              recipientName={signers[currentSignerIndex].name}
              signers={signers}
              currentSignerIndex={currentSignerIndex}
              onSubmit={handleSignatureSubmit}
              isPrimarySigner={true}
              primarySelections={undefined}
              addons={mockProposal.addons}
            />
          );
        } else if (currentSigner?.isCompanySigner) {
          // Company signer sees the company authorization view
          return signatureData && (
            <CompanySignerProposal
              proposal={mockProposal}
              signers={signers}
              currentSignerIndex={currentSignerIndex}
              primarySelections={{
                selectedOptionId: signatureData.selectedOptionId,
                selectedAddons: signatureData.selectedAddons,
              }}
              onSubmit={handleSecondarySignatureSubmit}
            />
          );
        } else {
          // Secondary signers see the proposal with embedded signature
          return signatureData && (
            <SecondarySignerProposal
              proposal={mockProposal}
              signers={signers}
              currentSignerIndex={currentSignerIndex}
              primarySelections={{
                selectedOptionId: signatureData.selectedOptionId,
                selectedAddons: signatureData.selectedAddons,
              }}
              onSubmit={handleSecondarySignatureSubmit}
            />
          );
        }
      })()}

      {/* Completion Step */}
      {currentStep === "complete" && signatureData && (
        <CompletionScreen
          proposal={mockProposal}
          selectedOptionId={signatureData.selectedOptionId}
          signers={signers}
          selectedAddons={signatureData.selectedAddons}
          onContinueToNextSigner={handleContinueToNextSigner}
          onSendToNextSigner={handleSendToNextSigner}
        />
      )}

      {/* Change Request Dialog */}
      {isChangeRequestDialogOpen && (
        <ChangeRequestDialog
          isOpen={isChangeRequestDialogOpen}
          onClose={() => setIsChangeRequestDialogOpen(false)}
          proposalId={mockProposal.id}
          proposalTitle={mockProposal.title}
          recipientName={mockProposal.recipientName}
          recipientEmail={mockProposal.recipientEmail}
        />
      )}
    </div>
  );
}
