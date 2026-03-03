import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { RadioGroup } from "./ui/radio-group";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { AlertCircle, CheckCircle2, FileText, DollarSign, Calendar, Wrench, Upload, X, Send, MessageSquare } from "lucide-react";
import { Input } from "./ui/input";

interface ChangeRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  proposalId: string;
  proposalTitle: string;
  recipientName: string;
  recipientEmail: string;
}

type ChangeCategory = "pricing" | "scope" | "timeline" | "materials" | "terms" | "other";

interface CategoryOption {
  id: ChangeCategory;
  label: string;
  description: string;
  icon: any;
}

const categories: CategoryOption[] = [
  {
    id: "pricing",
    label: "Pricing & Costs",
    description: "Questions about pricing, payment terms, or budget",
    icon: DollarSign,
  },
  {
    id: "scope",
    label: "Scope of Work",
    description: "Changes to project scope or deliverables",
    icon: Wrench,
  },
  {
    id: "materials",
    label: "Materials & Products",
    description: "Different materials, colors, or product specifications",
    icon: FileText,
  },
  {
    id: "timeline",
    label: "Timeline & Schedule",
    description: "Project start date, duration, or milestones",
    icon: Calendar,
  },
  {
    id: "terms",
    label: "Terms & Conditions",
    description: "Contract terms, warranties, or legal concerns",
    icon: FileText,
  },
  {
    id: "other",
    label: "Other",
    description: "Any other questions or concerns",
    icon: MessageSquare,
  },
];

export function ChangeRequestDialog({
  isOpen,
  onClose,
  proposalId,
  proposalTitle,
  recipientName,
  recipientEmail,
}: ChangeRequestDialogProps) {
  const [selectedCategory, setSelectedCategory] = useState<ChangeCategory | null>(null);
  const [details, setDetails] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectedCategory || !details.trim()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In a real implementation, this would send the request to your backend
    console.log("Change request submitted:", {
      proposalId,
      category: selectedCategory,
      details,
      attachments: attachments.map(f => f.name),
      recipientName,
      recipientEmail,
      timestamp: new Date().toISOString(),
    });

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success for 2 seconds
    setTimeout(() => {
      handleClose();
    }, 2000);
  };

  const handleClose = () => {
    setSelectedCategory(null);
    setDetails("");
    setAttachments([]);
    setIsSubmitted(false);
    onClose();
  };

  const canSubmit = selectedCategory && details.trim().length >= 10;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[var(--zuper-card)] border-[var(--zuper-border)]">
        {!isSubmitted ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-[var(--zuper-text-primary)] flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-[var(--zuper-primary)]" />
                Request Changes
              </DialogTitle>
              <DialogDescription className="text-[var(--zuper-text-secondary)]">
                Let us know what you'd like to change in "{proposalTitle}". We'll review your request and get back to you shortly.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-6 py-4">
              {/* Category Selection */}
              <div>
                <Label className="text-sm text-[var(--zuper-text-primary)] mb-3 block">
                  What would you like to change? *
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {categories.map((category) => {
                    const Icon = category.icon;
                    const isSelected = selectedCategory === category.id;
                    
                    return (
                      <Card
                        key={category.id}
                        className={`p-3 cursor-pointer transition-all border ${
                          isSelected
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                            : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                            isSelected 
                              ? "bg-[var(--zuper-primary)] text-white" 
                              : "bg-[var(--zuper-background)] text-[var(--zuper-text-tertiary)]"
                          }`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`text-sm mb-0.5 ${
                              isSelected ? "text-[var(--zuper-text-primary)]" : "text-[var(--zuper-text-primary)]"
                            }`}>
                              {category.label}
                            </p>
                            <p className="text-xs text-[var(--zuper-text-secondary)] line-clamp-2">
                              {category.description}
                            </p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="w-4 h-4 text-[var(--zuper-primary)] flex-shrink-0 mt-1" />
                          )}
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>

              {/* Details */}
              <div>
                <Label htmlFor="details" className="text-sm text-[var(--zuper-text-primary)] mb-2 block">
                  Please describe the changes you'd like to see *
                </Label>
                <Textarea
                  id="details"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  placeholder="Be as specific as possible to help us address your concerns..."
                  className="min-h-[120px] bg-[var(--zuper-background)] border-[var(--zuper-border)] text-[var(--zuper-text-primary)] placeholder:text-[var(--zuper-text-tertiary)] resize-none"
                />
                <p className="text-xs text-[var(--zuper-text-tertiary)] mt-1.5">
                  {details.length} / 1000 characters {details.length < 10 && details.length > 0 && "(minimum 10 characters)"}
                </p>
              </div>

              {/* File Attachments */}
              <div>
                <Label className="text-sm text-[var(--zuper-text-primary)] mb-2 block">
                  Attachments (optional)
                </Label>
                <div className="space-y-2">
                  {/* Upload Button */}
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <div className="border-2 border-dashed border-[var(--zuper-border)] rounded-lg p-4 hover:border-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-light)] transition-colors">
                      <div className="flex items-center justify-center gap-2">
                        <Upload className="w-4 h-4 text-[var(--zuper-text-tertiary)]" />
                        <span className="text-sm text-[var(--zuper-text-secondary)]">
                          Click to upload files or drag and drop
                        </span>
                      </div>
                      <p className="text-xs text-[var(--zuper-text-tertiary)] text-center mt-1">
                        PDF, PNG, JPG up to 10MB each
                      </p>
                    </div>
                    <Input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      multiple
                      accept=".pdf,.png,.jpg,.jpeg"
                      onChange={handleFileUpload}
                    />
                  </label>

                  {/* Attached Files */}
                  {attachments.length > 0 && (
                    <div className="space-y-1.5">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between gap-2 p-2 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <FileText className="w-4 h-4 text-[var(--zuper-text-tertiary)] flex-shrink-0" />
                            <span className="text-sm text-[var(--zuper-text-primary)] truncate">
                              {file.name}
                            </span>
                            <span className="text-xs text-[var(--zuper-text-tertiary)] flex-shrink-0">
                              {(file.size / 1024).toFixed(1)} KB
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeAttachment(index)}
                            className="h-6 w-6 p-0 hover:bg-[var(--zuper-background)]"
                          >
                            <X className="w-3.5 h-3.5 text-[var(--zuper-text-tertiary)]" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Info Alert */}
              <div className="flex items-start gap-3 p-3 bg-[var(--zuper-primary-light)] border border-[var(--zuper-primary)] rounded-lg">
                <AlertCircle className="w-4 h-4 text-[var(--zuper-primary)] mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-[var(--zuper-text-primary)] mb-1">
                    What happens next?
                  </p>
                  <p className="text-xs text-[var(--zuper-text-secondary)]">
                    Your request will be sent to Summit Roofing Co. They'll review your feedback and either update the proposal or reach out to discuss your concerns. You'll receive an email notification when there's an update.
                  </p>
                </div>
              </div>
            </div>

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={handleClose}
                className="w-full sm:w-auto border-[var(--zuper-border)] text-[var(--zuper-text-secondary)] hover:bg-[var(--zuper-background)]"
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={!canSubmit || isSubmitting}
                className="w-full sm:w-auto bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        ) : (
          /* Success State */
          <div className="py-8 px-4 text-center">
            <div className="w-16 h-16 bg-[var(--zuper-success-light)] rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[var(--zuper-success)]" />
            </div>
            <h3 className="text-lg text-[var(--zuper-text-primary)] mb-2">
              Request Sent Successfully
            </h3>
            <p className="text-sm text-[var(--zuper-text-secondary)] mb-6 max-w-md mx-auto">
              Summit Roofing Co. has received your change request and will review it shortly. You'll receive an email update at <span className="text-[var(--zuper-text-primary)]">{recipientEmail}</span>.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
              <div className="w-2 h-2 bg-[var(--zuper-success)] rounded-full animate-pulse" />
              <span className="text-xs text-[var(--zuper-text-secondary)]">
                Closing automatically...
              </span>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
