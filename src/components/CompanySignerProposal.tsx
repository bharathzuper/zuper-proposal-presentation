import { useState, useRef, useEffect } from "react";
import { Proposal, Signer } from "../data/mockProposal";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { CheckCircle2, Pen, FileText, Eraser, Check, Building2 } from "lucide-react";
import { DocumentPreview } from "./DocumentPreview";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

interface CompanySignerProposalProps {
  proposal: Proposal;
  signers: Signer[];
  currentSignerIndex: number;
  primarySelections: {
    selectedOptionId: string;
    selectedAddons: string[];
  };
  onSubmit: (signature: string) => void;
}

export function CompanySignerProposal({
  proposal,
  signers,
  currentSignerIndex,
  primarySelections,
  onSubmit,
}: CompanySignerProposalProps) {
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [savedSignatureData, setSavedSignatureData] = useState<string>("");
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const currentSigner = signers[currentSignerIndex];
  const customerSigners = signers.filter(s => !s.isCompanySigner);
  
  const selectedOption = proposal.estimateOptions.find(
    (opt) => opt.id === primarySelections.selectedOptionId
  );

  const availableAddons = proposal.addons || [];
  const selectedAddons = availableAddons.filter((addon) =>
    primarySelections.selectedAddons.includes(addon.id)
  );

  // Canvas setup
  useEffect(() => {
    if (!isSignatureDialogOpen) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }, [isSignatureDialogOpen]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    setIsDrawing(true);
    setHasSignature(true);
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left;
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirmSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;
    
    const signatureData = canvas.toDataURL();
    setSavedSignatureData(signatureData);
    setIsSignatureDialogOpen(false);
  };

  const handleSubmit = () => {
    if (!savedSignatureData) return;
    onSubmit(savedSignatureData);
  };

  return (
    <div className="min-h-screen bg-[var(--zuper-background)] pb-24 sm:pb-28">
      {/* Header */}
      <div className="bg-white border-b border-[var(--zuper-border)] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--zuper-primary)]" />
              <div>
                <h1 className="text-sm sm:text-base text-[var(--zuper-text-primary)]">
                  {proposal.title}
                </h1>
                <p className="text-xs text-[var(--zuper-text-tertiary)]">
                  {proposal.companyName}
                </p>
              </div>
            </div>
            <Badge className="bg-[var(--zuper-primary)] text-white text-xs">
              Company Authorization
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Company Signer Info Banner */}
        <Card className="p-4 sm:p-5 bg-[var(--zuper-primary-light)] border-[var(--zuper-primary)] mb-6">
          <div className="flex items-start gap-3">
            <Building2 className="w-5 h-5 text-[var(--zuper-primary)] mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-sm sm:text-base text-[var(--zuper-text-primary)] mb-1">
                Company Authorization Required
              </h3>
              <p className="text-xs sm:text-sm text-[var(--zuper-text-secondary)]">
                All customers have signed this proposal. As {proposal.companyName}'s authorized representative, 
                please review the final agreement and add your signature to complete the contract.
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
            companyName={proposal.companyName}
            companyLogo={proposal.companyLogo}
            recipientName={proposal.recipientName}
            recipientAddress={proposal.recipientAddress}
            sections={proposal.sections}
            hideNavigation={false}
            selectedOptionId={primarySelections.selectedOptionId}
            selectedAddons={selectedAddons}
            estimateOptions={proposal.estimateOptions}
          />
        </Card>

        {/* Signatures Section */}
        <Card className="p-4 sm:p-6">
          <h2 className="text-base sm:text-lg text-[var(--zuper-text-primary)] mb-4">
            Customer Signatures
          </h2>

          {/* Customer Signatures */}
          <div className="space-y-4">
            {customerSigners.map((signer) => (
              <div key={signer.id} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)] mt-1 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--zuper-text-primary)] mb-2">
                    {signer.name}
                  </p>
                  {signer.signatureData && (
                    <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-3">
                      <img
                        src={signer.signatureData}
                        alt={`${signer.name}'s signature`}
                        className="h-12 sm:h-16 w-auto"
                      />
                      <p className="text-xs text-[var(--zuper-text-tertiary)] mt-2">
                        Signed on {new Date(signer.signedAt!).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Sticky Footer for Signature */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[var(--zuper-border)] shadow-lg z-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          {savedSignatureData ? (
            /* Signed state - show signature preview and finalize button */
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 flex-1">
                <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] flex-shrink-0" />
                <div className="flex items-center gap-3 flex-1">
                  <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded px-3 py-2">
                    <img
                      src={savedSignatureData}
                      alt="Company signature"
                      className="h-10 w-auto"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--zuper-text-primary)] truncate">
                      {currentSigner.name}
                    </p>
                    <p className="text-xs text-[var(--zuper-text-tertiary)] truncate">
                      {proposal.companyName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setIsSignatureDialogOpen(true)}
                  variant="outline"
                  size="default"
                  className="flex-1 sm:flex-none text-xs sm:text-sm border-[var(--zuper-border)]"
                >
                  <Pen className="w-4 h-4 mr-2" />
                  Change
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="flex-1 sm:flex-none bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-xs sm:text-sm px-6"
                  size="default"
                >
                  <Check className="w-4 h-4 mr-2" />
                  Finalize Agreement
                </Button>
              </div>
            </div>
          ) : (
            /* Unsigned state - show sign button */
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-3 flex-1">
                <Building2 className="w-5 h-5 text-[var(--zuper-primary)] flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--zuper-text-primary)] truncate">
                    Company authorization required
                  </p>
                  <p className="text-xs text-[var(--zuper-text-tertiary)] truncate">
                    {currentSigner.name} • {proposal.companyName}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => setIsSignatureDialogOpen(true)}
                className="w-full sm:w-auto bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-sm px-6"
                size="default"
              >
                <Pen className="w-4 h-4 mr-2" />
                Sign to Finalize
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Signature Dialog */}
      <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
        <DialogContent className="sm:max-w-[600px] bg-[var(--zuper-card)] border-[var(--zuper-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--zuper-text-primary)]">Company Authorization Signature</DialogTitle>
            <DialogDescription className="text-[var(--zuper-text-secondary)]">
              Draw your signature to authorize this proposal on behalf of {proposal.companyName}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="border-2 border-[var(--zuper-border)] rounded-lg bg-[var(--zuper-card)] relative overflow-hidden">
              <canvas
                ref={canvasRef}
                width={800}
                height={200}
                className="w-full h-[200px] cursor-crosshair touch-none"
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
              />
              {!hasSignature && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="flex items-center gap-2 text-[var(--zuper-text-tertiary)]">
                    <Pen className="w-4 h-4" />
                    <span className="text-sm">Draw your signature here</span>
                  </div>
                </div>
              )}
            </div>
            <p className="text-xs text-[var(--zuper-text-tertiary)] mt-3">
              By signing, you authorize this proposal on behalf of {proposal.companyName} and agree to the terms outlined
            </p>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={clearSignature}
              className="w-full sm:w-auto order-1 sm:order-1 border-[var(--zuper-border)] text-[var(--zuper-text-secondary)] hover:text-[var(--zuper-text-primary)] hover:bg-[var(--zuper-background)]"
            >
              <Eraser className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsSignatureDialogOpen(false)}
              className="w-full sm:w-auto order-2 sm:order-2 border-[var(--zuper-border)] text-[var(--zuper-text-secondary)] hover:text-[var(--zuper-text-primary)] hover:bg-[var(--zuper-background)]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmSignature}
              disabled={!hasSignature}
              className="w-full sm:w-auto order-3 sm:order-3 bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] disabled:opacity-50"
            >
              <Check className="w-4 h-4 mr-2" />
              Confirm Signature
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}