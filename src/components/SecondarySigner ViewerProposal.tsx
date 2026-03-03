import { useState } from "react";
import { Proposal, Signer } from "../data/mockProposal";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2, Pen, FileText } from "lucide-react";
import { DocumentPreview } from "./DocumentPreview";
import { SignatureDialog } from "./SignatureDialog";

interface SecondarySignerProposalProps {
  proposal: Proposal;
  signers: Signer[];
  currentSignerIndex: number;
  primarySelections: {
    selectedOptionId: string;
    selectedAddons: string[];
  };
  onSubmit: (signature: string) => void;
}

export function SecondarySignerProposal({
  proposal,
  signers,
  currentSignerIndex,
  primarySelections,
  onSubmit,
}: SecondarySignerProposalProps) {
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [savedSignatureData, setSavedSignatureData] = useState<string>("");

  const currentSigner = signers[currentSignerIndex];
  const primarySigner = signers[0];
  const selectedOption = proposal.estimateOptions.find(
    (opt) => opt.id === primarySelections.selectedOptionId
  );

  const availableAddons = proposal.addons || [];
  const selectedAddons = availableAddons.filter((addon) =>
    primarySelections.selectedAddons.includes(addon.id)
  );

  const handleSaveSignature = (signatureData: string) => {
    setSavedSignatureData(signatureData);
    setHasSignature(true);
    setIsSignatureDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!hasSignature || !savedSignatureData) return;
    onSubmit(savedSignatureData);
  };

  return (
    <div className="min-h-screen bg-[var(--zuper-background)]">
      {/* Header */}
      <div className="bg-white border-b border-[var(--zuper-border)] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--zuper-primary)]" />
              <div>
                <h1 className="text-sm sm:text-base text-[var(--zuper-text-primary)]">
                  {proposal.projectName}
                </h1>
                <p className="text-xs text-[var(--zuper-text-tertiary)]">
                  {proposal.companyName}
                </p>
              </div>
            </div>
            <Badge className="bg-[var(--zuper-warning)] text-white text-xs">
              Review & Sign
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Signer Info Banner */}
        <Card className="p-4 sm:p-5 bg-[var(--zuper-primary-light)] border-[var(--zuper-primary)] mb-6">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-[var(--zuper-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm sm:text-base text-[var(--zuper-text-primary)] mb-1">
                Hello, {currentSigner.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--zuper-text-secondary)]">
                {primarySigner.name} has selected an estimate option and signed this proposal. 
                Please review the document below and add your signature to complete the agreement.
              </p>
            </div>
          </div>
        </Card>

        {/* Document Preview */}
        <Card className="p-4 sm:p-6 mb-6">
          <h2 className="text-base sm:text-lg text-[var(--zuper-text-primary)] mb-4">
            Proposal Document
          </h2>
          <DocumentPreview
            pdfUrl={proposal.pdfUrl}
            onControlsReady={() => {}}
          />
        </Card>

        {/* Selected Estimate Section */}
        <Card className="p-4 sm:p-6 mb-6">
          <h2 className="text-base sm:text-lg text-[var(--zuper-text-primary)] mb-4">
            Selected Estimate Option
          </h2>
          
          <div className="bg-[var(--zuper-background)] border-2 border-[var(--zuper-success)] rounded-lg p-4 sm:p-5 mb-6">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex items-start gap-3 flex-1">
                <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="text-sm sm:text-base text-[var(--zuper-text-primary)]">
                      {selectedOption?.title}
                    </p>
                    {selectedOption?.recommended && (
                      <Badge className="bg-[var(--zuper-primary)] text-white text-xs">
                        Recommended
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-[var(--zuper-text-secondary)]">
                    {selectedOption?.description}
                  </p>
                </div>
              </div>
              <p className="text-base sm:text-lg font-medium text-[var(--zuper-text-primary)] flex-shrink-0">
                ${selectedOption?.price.toLocaleString()}
              </p>
            </div>
            
            <div className="pt-3 border-t border-[var(--zuper-border)]">
              <p className="text-xs text-[var(--zuper-text-tertiary)]">
                Selected by {primarySigner.name} on{" "}
                {new Date(primarySigner.signedAt!).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Selected Addons */}
          {selectedAddons.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm text-[var(--zuper-text-primary)] mb-3">
                Selected Upgrades
              </h3>
              <div className="space-y-2">
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
        </Card>

        {/* Signatures Section */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-base sm:text-lg text-[var(--zuper-text-primary)] mb-4">
            Signatures
          </h2>

          {/* Primary Signer's Signature */}
          <div className="mb-6 pb-6 border-b border-[var(--zuper-border)]">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)]" />
              <p className="text-sm text-[var(--zuper-text-primary)]">
                {primarySigner.name}
              </p>
            </div>
            {primarySigner.signatureData && (
              <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4">
                <img
                  src={primarySigner.signatureData}
                  alt={`${primarySigner.name}'s signature`}
                  className="h-16 sm:h-20 w-auto"
                />
                <p className="text-xs text-[var(--zuper-text-tertiary)] mt-2">
                  Signed on {new Date(primarySigner.signedAt!).toLocaleString()}
                </p>
              </div>
            )}
          </div>

          {/* Current Signer's Signature */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-[var(--zuper-text-primary)]">
                {currentSigner.name}
              </p>
              {hasSignature && (
                <Badge className="bg-[var(--zuper-success)] text-white text-xs">
                  Signed
                </Badge>
              )}
            </div>
            
            {hasSignature ? (
              <div className="bg-[var(--zuper-background)] border-2 border-[var(--zuper-success)] rounded-lg p-4 mb-4">
                <img
                  src={savedSignatureData}
                  alt={`${currentSigner.name}'s signature`}
                  className="h-16 sm:h-20 w-auto mb-2"
                />
                <Button
                  onClick={() => setIsSignatureDialogOpen(true)}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  Change Signature
                </Button>
              </div>
            ) : (
              <div className="bg-[var(--zuper-background)] border-2 border-dashed border-[var(--zuper-border)] rounded-lg p-6 sm:p-8 text-center mb-4">
                <Pen className="w-8 h-8 text-[var(--zuper-text-tertiary)] mx-auto mb-2" />
                <p className="text-sm text-[var(--zuper-text-secondary)] mb-4">
                  Click below to add your signature
                </p>
                <Button
                  onClick={() => setIsSignatureDialogOpen(true)}
                  className="bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)]"
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Add Signature
                </Button>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!hasSignature}
              className="w-full bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] disabled:opacity-50 h-11 sm:h-12 text-sm sm:text-base"
              size="lg"
            >
              Complete & Submit
            </Button>
          </div>
        </Card>
      </div>

      {/* Signature Dialog */}
      <SignatureDialog
        isOpen={isSignatureDialogOpen}
        onClose={() => setIsSignatureDialogOpen(false)}
        onSave={handleSaveSignature}
        signerName={currentSigner.name}
      />
    </div>
  );
}
