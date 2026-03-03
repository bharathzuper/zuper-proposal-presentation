import { useState, useRef, useEffect } from "react";
import { EstimateOption, Signer, BreakdownItem, BreakdownSection } from "../data/mockProposal";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { RadioGroup } from "./ui/radio-group";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Pen, Eraser, Check, Plus, CheckCircle2, Circle, UserCheck, Lock, AlertCircle, Settings, DollarSign, ChevronDown } from "lucide-react";
import { ProductOptionButton } from "./ProductOptionButton";

// Color mapping for options
const colorMap: Record<string, string> = {
  "White": "#FFFFFF",
  "Brown": "#8B4513",
  "Black": "#1F2937",
  "Gray": "#9CA3AF",
  "Charcoal": "#374151",
  "Weathered Wood": "#8B7355",
  "Desert Tan": "#D2B48C",
  "Estate Gray": "#6B7280",
  "Onyx Black": "#0F172A",
  "Bronze": "#CD7F32",
  "Aluminum": "#C0C0C0",
};

// Utility: Group breakdown items by section, preserving section order
interface GroupedSection {
  section: BreakdownSection | null; // null = ungrouped items
  items: BreakdownItem[];
  total: number;
}

function groupBreakdownBySections(
  breakdown: BreakdownItem[],
  sections?: BreakdownSection[]
): GroupedSection[] {
  if (!sections || sections.length === 0) {
    // No sections defined — return all items as a single ungrouped group
    return [{
      section: null,
      items: breakdown,
      total: breakdown.reduce((sum, item) => sum + item.cost, 0),
    }];
  }

  const groups: GroupedSection[] = [];
  const sectionMap = new Map<string, BreakdownItem[]>();

  // Initialize section buckets in order
  for (const sec of sections) {
    sectionMap.set(sec.id, []);
  }

  const ungrouped: BreakdownItem[] = [];

  for (const item of breakdown) {
    if (item.section && sectionMap.has(item.section)) {
      sectionMap.get(item.section)!.push(item);
    } else {
      ungrouped.push(item);
    }
  }

  // Build groups in section order
  for (const sec of sections) {
    const items = sectionMap.get(sec.id) || [];
    if (items.length > 0) {
      groups.push({
        section: sec,
        items,
        total: items.reduce((sum, item) => sum + item.cost, 0),
      });
    }
  }

  // Append ungrouped items at the end
  if (ungrouped.length > 0) {
    groups.push({
      section: null,
      items: ungrouped,
      total: ungrouped.reduce((sum, item) => sum + item.cost, 0),
    });
  }

  return groups;
}

interface Addon {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  hasOptions?: boolean;
  customerSelectionEnabled?: boolean;
  availableOptions?: {
    name: string;
    imageUrl: string;
    available: boolean;
  }[];
  selectedOption?: string | null;
  optionLabel?: string;
  isBundle?: boolean;
  bundleItems?: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
    required?: boolean;
    hasOptions?: boolean;
    customerSelectionEnabled?: boolean;
    availableOptions?: {
      name: string;
      imageUrl: string;
      available: boolean;
    }[];
    selectedOption?: string | null;
    optionLabel?: string;
  }[];
}

interface FinancingProvider {
  id: string;
  name: string;
  logo: string;
  apr: number;
  term: number; // in months
  recommended?: boolean;
  description: string;
}

interface SignatureFormProps {
  estimateOptions: EstimateOption[];
  recipientName: string;
  signers: Signer[];
  currentSignerIndex: number;
  onSubmit: (data: { selectedOptionId: string; signature: string; selectedAddons: string[]; productOptionSelections?: Record<string, string> }) => void;
  isPrimarySigner?: boolean;
  primarySelections?: {
    selectedOptionId: string;
    selectedAddons: string[];
    productOptionSelections?: Record<string, string>;
  };
  addons?: any[]; // Array of addons from proposal
}

export function SignatureForm({
  estimateOptions,
  recipientName,
  signers,
  currentSignerIndex,
  onSubmit,
  isPrimarySigner = true,
  primarySelections,
  addons = [],
}: SignatureFormProps) {
  const [selectedOption, setSelectedOption] = useState<string>(primarySelections?.selectedOptionId || "");
  const [selectedAddons, setSelectedAddons] = useState<string[]>(primarySelections?.selectedAddons || []);
  const [productOptionSelections, setProductOptionSelections] = useState<Record<string, string>>({});
  const [addonOptionSelections, setAddonOptionSelections] = useState<Record<string, string>>({});
  const [bundleItemOptionSelections, setBundleItemOptionSelections] = useState<Record<string, string>>({});  // Track options for bundle items
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "financing">("cash");
  const [selectedFinancingProvider, setSelectedFinancingProvider] = useState<string>("");
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSignatureDialogOpen, setIsSignatureDialogOpen] = useState(false);
  const [savedSignatureData, setSavedSignatureData] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const selectedEstimate = estimateOptions.find(opt => opt.id === selectedOption);
  const currentSigner = signers[currentSignerIndex];

  // Render sectioned breakdown items for cost summaries and financing details
  // size: "sm" for mobile/financing compact, "md" for tablet/desktop
  const renderSectionedBreakdown = (
    estimate: EstimateOption,
    size: "sm" | "md" = "md"
  ) => {
    const groups = groupBreakdownBySections(estimate.breakdown, estimate.breakdownSections);
    const isSm = size === "sm";

    return (
      <div className={isSm ? "space-y-3" : "space-y-4"}>
        {groups.map((group, gIdx) => (
          <div key={group.section?.id || `ungrouped-${gIdx}`}>
            {/* Section header */}
            {group.section && (
              <div className={`${isSm ? "mb-1.5" : "mb-2"} ${gIdx > 0 ? (isSm ? "pt-3 border-t border-[var(--zuper-border)]" : "pt-3.5 border-t border-[var(--zuper-border)]") : ""}`}>
                <span className={`${isSm ? "text-[9px]" : "text-[10px]"} uppercase tracking-[0.08em] text-[var(--zuper-text-tertiary)]`}>
                  {group.section.title}
                </span>
              </div>
            )}

            {/* Items */}
            <div className={isSm ? "space-y-1" : "space-y-1.5"}>
              {group.items.map((item, idx) => {
                const selectedValue = productOptionSelections[item.item];
                const displayName = selectedValue ? `${item.item} (${selectedValue})` : item.item;
                return (
                  <div key={idx} className={`flex justify-between items-baseline gap-4 ${isSm ? "text-[10px]" : "text-xs"} ${group.section ? (isSm ? "pl-2" : "pl-3") : ""}`}>
                    <span className="text-[var(--zuper-text-primary)] flex-1 min-w-0">{displayName}</span>
                    <span className="text-[var(--zuper-text-secondary)] tabular-nums flex-shrink-0">${item.cost.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>

            {/* Section subtotal */}
            {group.section?.showTotal && group.items.length > 1 && (
              <div className={`flex justify-between items-baseline gap-4 ${isSm ? "text-[10px] mt-1.5 pt-1" : "text-xs mt-2 pt-1.5"} border-t border-dashed border-[var(--zuper-border)] ${group.section ? (isSm ? "ml-2" : "ml-3") : ""}`}>
                <span className="text-[var(--zuper-text-tertiary)] italic">{group.section.title} Subtotal</span>
                <span className="text-[var(--zuper-text-primary)] tabular-nums flex-shrink-0">${group.total.toLocaleString()}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Available financing providers
  const financingProviders: FinancingProvider[] = [
    {
      id: "greensky",
      name: "GreenSky",
      logo: "https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      apr: 4.99,
      term: 120,
      recommended: true,
      description: "Low APR with 10-year term"
    },
    {
      id: "mosaic",
      name: "Mosaic Solar",
      logo: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      apr: 5.99,
      term: 144,
      description: "Extended 12-year financing"
    },
    {
      id: "hearth",
      name: "Hearth",
      logo: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      apr: 6.99,
      term: 84,
      description: "Fast approval process"
    },
    {
      id: "enhancify",
      name: "Enhancify",
      logo: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=200",
      apr: 5.49,
      term: 120,
      description: "Competitive rates for home improvement"
    }
  ];

  // Available addons - use from addons prop
  const availableAddons = addons || [];
  


  // Determine if addons should be shown (only for Premium and Elite packages)
  const showAddons = selectedOption === "premium-package" || selectedOption === "elite-package";

  // Calculate total with addons
  const calculateTotal = () => {
    if (!selectedEstimate) return 0;
    const addonTotal = selectedAddons.reduce((sum, addonId) => {
      const addon = availableAddons.find(a => a.id === addonId);
      if (!addon) return sum;
      
      // If it's a bundle, calculate price from all bundle items
      if (addon.isBundle && addon.bundleItems) {
        const bundlePrice = addon.bundleItems.reduce((itemSum, item) => {
          return itemSum + (item.price || 0);
        }, 0);
        return sum + bundlePrice;
      }
      
      return sum + (addon.price || 0);
    }, 0);
    return selectedEstimate.price + addonTotal;
  };

  // Calculate monthly payment for financing
  const calculateMonthlyPayment = (principal: number, apr: number, term: number) => {
    const monthlyRate = apr / 100 / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    return payment;
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method: "cash" | "financing") => {
    if (!isPrimarySigner) return;
    setPaymentMethod(method);
    if (method === "cash") {
      setSelectedFinancingProvider("");
    }
  };

  // Handle financing provider selection
  const handleFinancingProviderSelect = (providerId: string) => {
    if (!isPrimarySigner) return;
    setSelectedFinancingProvider(providerId);
  };

  // Toggle addon selection
  const toggleAddon = (addonId: string) => {
    if (!isPrimarySigner) return; // Prevent secondary signers from changing addons
    setSelectedAddons(prev => 
      prev.includes(addonId)
        ? prev.filter(id => id !== addonId)
        : [...prev, addonId]
    );
  };

  // Handle addon option selection
  const handleAddonOptionSelect = (addonId: string, optionName: string) => {
    if (!isPrimarySigner) return;
    setAddonOptionSelections(prev => ({
      ...prev,
      [addonId]: optionName
    }));
  };

  // Handle bundle item option selection
  const handleBundleItemOptionSelect = (itemId: string, optionName: string) => {
    if (!isPrimarySigner) return;
    setBundleItemOptionSelections(prev => ({
      ...prev,
      [itemId]: optionName
    }));
  };

  // Handle option selection
  const handleOptionSelect = (optionId: string) => {
    if (!isPrimarySigner) return; // Prevent secondary signers from changing options
    setSelectedOption(optionId);
  };

  // Reset addons when option changes
  useEffect(() => {
    if (!showAddons) {
      setSelectedAddons([]);
    }
  }, [selectedOption, showAddons]);

  // Initialize product option selections when estimate changes
  useEffect(() => {
    if (selectedEstimate) {
      const initialSelections: Record<string, string> = {};
      selectedEstimate.breakdown.forEach((item) => {
        if (item.hasOptions && item.customerSelectionEnabled && item.selectedOption) {
          initialSelections[item.item] = item.selectedOption;
        }
      });
      setProductOptionSelections(initialSelections);
    }
  }, [selectedOption]);

  // Handle product option selection
  const handleProductOptionSelect = (itemName: string, optionName: string) => {
    if (!isPrimarySigner) return;
    setProductOptionSelections(prev => ({
      ...prev,
      [itemName]: optionName
    }));
  };

  // Check if all required product options are selected
  const getMissingProductOptions = (): string[] => {
    if (!selectedEstimate) return [];
    
    const missing: string[] = [];
    selectedEstimate.breakdown.forEach((item) => {
      if (item.hasOptions && item.customerSelectionEnabled) {
        if (!productOptionSelections[item.item]) {
          missing.push(item.item);
        }
      }
    });
    return missing;
  };

  const allProductOptionsSelected = getMissingProductOptions().length === 0;

  // Get product options from breakdown
  const getProductOptions = () => {
    if (!selectedEstimate) return [];
    return selectedEstimate.breakdown.filter(item => 
      item.hasOptions && item.customerSelectionEnabled && item.availableOptions
    );
  };

  const productOptions = getProductOptions();
  const hasProductOptions = productOptions.length > 0;

  // Canvas drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    setIsDrawing(true);
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
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setHasSignature(true);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleOpenSignatureDialog = () => {
    if (!selectedOption) {
      alert("Please select a package option");
      return;
    }
    if (hasProductOptions && !allProductOptionsSelected) {
      alert("Please select all required product options");
      return;
    }
    setIsSignatureDialogOpen(true);
  };

  const handleSaveSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas || !hasSignature) return;

    const signatureData = canvas.toDataURL();
    setSavedSignatureData(signatureData);
    setIsSignatureDialogOpen(false);
  };

  const handleFinalSubmit = () => {
    if (!savedSignatureData) {
      alert("Please add your signature");
      return;
    }

    onSubmit({
      selectedOptionId: selectedOption,
      signature: savedSignatureData,
      selectedAddons,
      productOptionSelections,
    });
  };

  return (
    <div className="space-y-6">
      <div className="max-w-2xl mx-auto">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Package Selection */}
          <div className="mb-6">
            <Label className="mb-3 block text-xs text-[var(--zuper-text-primary)]">
              {isPrimarySigner ? "Select Package" : "Selected Package"}
            </Label>
            {isPrimarySigner ? (
              <div className="space-y-2">
                {estimateOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`px-4 py-3 cursor-pointer transition-all border ${ 
                      selectedOption === option.id
                        ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                        : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2 flex-1">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          selectedOption === option.id
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {selectedOption === option.id && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          {option.recommended && (
                            <Badge className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary)] text-xs px-2 py-0 mb-1.5 inline-block">
                              Recommended
                            </Badge>
                          )}
                          <p className="text-sm text-[var(--zuper-text-primary)] mb-1">{option.title}</p>
                          <p className="text-xs text-[var(--zuper-text-secondary)]">{option.description}</p>
                        </div>
                      </div>
                      <p className="text-xs text-[var(--zuper-text-primary)] flex-shrink-0">
                        ${option.price.toLocaleString()}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              // Read-only view for secondary signers
              <div className="bg-[var(--zuper-background)] border-2 border-[var(--zuper-success)] rounded-lg p-3 sm:p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2 flex-1">
                    <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      {estimateOptions.find(opt => opt.id === selectedOption)?.recommended && (
                        <Badge className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary)] text-xs px-2 py-0 mb-1.5 inline-block">
                          Recommended
                        </Badge>
                      )}
                      <p className="text-sm text-[var(--zuper-text-primary)] mb-1">
                        {estimateOptions.find(opt => opt.id === selectedOption)?.title}
                      </p>
                      <p className="text-xs text-[var(--zuper-text-secondary)]">
                        {estimateOptions.find(opt => opt.id === selectedOption)?.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm font-medium text-[var(--zuper-text-primary)] flex-shrink-0">
                    ${estimateOptions.find(opt => opt.id === selectedOption)?.price.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Configuration Section */}
          {selectedOption && hasProductOptions && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Settings className="w-3.5 h-3.5 text-[var(--zuper-primary)]" />
                <Label className="text-xs text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Configure Your Package" : "Package Configuration"}
                </Label>
                {isPrimarySigner && !allProductOptionsSelected && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-[var(--zuper-warning-light)] text-[var(--zuper-warning)] border-[var(--zuper-warning)]">
                    Required
                  </Badge>
                )}
              </div>
              <div className="space-y-4">
                {(() => {
                  const sections = selectedEstimate?.breakdownSections;
                  if (!sections || sections.length === 0) {
                    // No sections — render flat
                    return productOptions.map((item) => {
                      const selectedValue = productOptionSelections[item.item];
                      const availableOptions = item.availableOptions!.filter(opt => opt.available);
                      return (
                        <div key={item.item} className="p-3 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
                          <p className="text-xs text-[var(--zuper-text-primary)] mb-2">{item.item}</p>
                          {isPrimarySigner ? (
                            <>
                              <p className="text-[10px] text-[var(--zuper-text-tertiary)] mb-2">
                                {item.optionLabel || "Select Option"} {selectedValue && `- ${selectedValue}`}
                              </p>
                              <div className="grid grid-cols-3 gap-2">
                                {availableOptions.map((option) => (
                                  <ProductOptionButton key={option.name} optionName={option.name} isSelected={selectedValue === option.name} onClick={() => handleProductOptionSelect(item.item, option.name)} colorMap={colorMap} imageUrl={option.imageUrl} size="small" />
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[var(--zuper-success)]" />
                              <p className="text-xs text-[var(--zuper-text-secondary)]">{item.optionLabel}: <span className="text-[var(--zuper-text-primary)]">{selectedValue}</span></p>
                            </div>
                          )}
                        </div>
                      );
                    });
                  }

                  // Group productOptions by section
                  const grouped = groupBreakdownBySections(productOptions, sections);
                  return grouped.map((group, gIdx) => (
                    <div key={group.section?.id || `ungrouped-${gIdx}`}>
                      {group.section && (
                        <div className={`flex items-center gap-2 ${gIdx > 0 ? "mt-2" : ""} mb-2`}>
                          <span className="text-[10px] uppercase tracking-wider text-[var(--zuper-text-tertiary)]">
                            {group.section.title}
                          </span>
                          <div className="flex-1 h-px bg-[var(--zuper-border)]" />
                        </div>
                      )}
                      <div className="space-y-3">
                        {group.items.map((item) => {
                          const selectedValue = productOptionSelections[item.item];
                          const availableOptions = item.availableOptions!.filter(opt => opt.available);
                          return (
                            <div key={item.item} className="p-3 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
                              <p className="text-xs text-[var(--zuper-text-primary)] mb-2">{item.item}</p>
                              {isPrimarySigner ? (
                                <>
                                  <p className="text-[10px] text-[var(--zuper-text-tertiary)] mb-2">
                                    {item.optionLabel || "Select Option"} {selectedValue && `- ${selectedValue}`}
                                  </p>
                                  <div className="grid grid-cols-3 gap-2">
                                    {availableOptions.map((option) => (
                                      <ProductOptionButton key={option.name} optionName={option.name} isSelected={selectedValue === option.name} onClick={() => handleProductOptionSelect(item.item, option.name)} colorMap={colorMap} imageUrl={option.imageUrl} size="small" />
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[var(--zuper-success)]" />
                                  <p className="text-xs text-[var(--zuper-text-secondary)]">{item.optionLabel}: <span className="text-[var(--zuper-text-primary)]">{selectedValue}</span></p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Optional Upgrades Section */}
          {showAddons && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Plus className="w-3.5 h-3.5 text-[var(--zuper-primary)]" />
                <Label className="text-xs text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Optional Upgrades" : "Selected Upgrades"}
                </Label>
                {isPrimarySigner && (
                  <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-[var(--zuper-text-tertiary)] border-[var(--zuper-border)]">
                    Optional
                  </Badge>
                )}
              </div>
              
              {isPrimarySigner ? (
                <div className="space-y-2">
                  {availableAddons.map((addon) => (
                    <div key={addon.id}>
                      <Card
                        className={`p-3 cursor-pointer transition-all border ${
                          selectedAddons.includes(addon.id)
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                            : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                        }`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <div className="flex items-start gap-3">
                          <img
                            src={
                              addon.hasOptions && 
                              addon.availableOptions && 
                              addonOptionSelections[addon.id]
                                ? addon.availableOptions.find(opt => opt.name === addonOptionSelections[addon.id])?.imageUrl || addon.image
                                : addon.image
                            }
                            alt={addon.title}
                            className="w-12 h-12 rounded object-cover flex-shrink-0 ring-1 ring-[var(--zuper-border)]"
                          />
                          <div className="flex items-start justify-between gap-2 flex-1">
                            <div className="flex items-start gap-2 flex-1">
                              <div className={`w-4 h-4 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                selectedAddons.includes(addon.id)
                                  ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                                  : "border-[var(--zuper-border)]"
                              }`}>
                                {selectedAddons.includes(addon.id) && (
                                  <Check className="w-3 h-3 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-sm text-[var(--zuper-text-primary)]">{addon.title}</p>
                                  {addon.isBundle && (
                                    <Badge variant="outline" className="text-[9px] px-1.5 py-0 text-[var(--zuper-primary)] border-[var(--zuper-primary)]">
                                      Bundle
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-[var(--zuper-text-secondary)]">{addon.description}</p>
                              </div>
                            </div>
                            <p className="text-xs text-[var(--zuper-text-primary)] flex-shrink-0 mt-0.5">
                              {addon.isBundle && addon.bundleItems ? (
                                `+$${addon.bundleItems.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}`
                              ) : (
                                `+$${addon.price.toLocaleString()}`
                              )}
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      {/* Show bundle items if addon is selected and is a bundle */}
                      {selectedAddons.includes(addon.id) && addon.isBundle && addon.bundleItems && (
                        <div className="mt-3 space-y-2">
                          {addon.bundleItems.map((item) => (
                            <div key={item.id} className="rounded-xl border border-[var(--zuper-border)] bg-[var(--zuper-card)] overflow-hidden shadow-sm">
                              {/* Item header */}
                              <div className="p-3 flex items-start gap-2.5">
                                <img
                                  src={
                                    item.hasOptions && 
                                    item.availableOptions && 
                                    bundleItemOptionSelections[item.id]
                                      ? item.availableOptions.find(opt => opt.name === bundleItemOptionSelections[item.id])?.imageUrl || item.image
                                      : item.image
                                  }
                                  alt={item.title}
                                  className="w-10 h-10 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-2">
                                    <p className="text-xs text-[var(--zuper-text-primary)]">{item.title}</p>
                                    <p className="text-xs text-[var(--zuper-text-primary)] flex-shrink-0">
                                      ${item.price.toLocaleString()}
                                    </p>
                                  </div>
                                  <p className="text-[10px] text-[var(--zuper-text-secondary)] mt-0.5 line-clamp-1">{item.description}</p>
                                </div>
                              </div>

                              {/* Inline option selector */}
                              {item.hasOptions && item.customerSelectionEnabled && item.availableOptions && (
                                <div className="px-3 pb-3 pt-0">
                                  <div className="border-t border-dashed border-[var(--zuper-border)] pt-2.5">
                                    <p className="text-[9px] uppercase tracking-wider text-[var(--zuper-text-tertiary)] mb-2">
                                      {item.optionLabel || "Select Option"}
                                    </p>
                                    <div className="grid grid-cols-3 gap-1.5">
                                      {item.availableOptions.map((option) => (
                                        <div key={option.name} className={!option.available ? "opacity-40 pointer-events-none" : ""}>
                                          <ProductOptionButton
                                            optionName={option.name}
                                            isSelected={bundleItemOptionSelections[item.id] === option.name}
                                            onClick={() => {
                                              if (option.available) {
                                                handleBundleItemOptionSelect(item.id, option.name);
                                              }
                                            }}
                                            colorMap={colorMap}
                                            imageUrl={option.imageUrl}
                                            size="small"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      {/* Show option selector if addon is selected and has options (non-bundle) */}
                      {selectedAddons.includes(addon.id) && !addon.isBundle && addon.hasOptions && addon.customerSelectionEnabled && addon.availableOptions && (
                        <div className="mt-2 ml-1">
                          <p className="text-[10px] text-[var(--zuper-text-tertiary)] mb-2">
                            {addon.optionLabel || "Select Option"}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {addon.availableOptions.map((option) => (
                              <div key={option.name} className={`w-[calc(33.33%-6px)] min-w-[72px] max-w-[96px] ${!option.available ? "opacity-50" : ""}`}>
                                <ProductOptionButton
                                  optionName={option.name}
                                  isSelected={addonOptionSelections[addon.id] === option.name}
                                  onClick={(e) => {
                                    e?.stopPropagation();
                                    if (option.available) {
                                      handleAddonOptionSelect(addon.id, option.name);
                                    }
                                  }}
                                  colorMap={colorMap}
                                  imageUrl={option.imageUrl}
                                  size="small"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                // Read-only view for secondary signers
                selectedAddons.length > 0 ? (
                  <div className="space-y-2">
                    {selectedAddons.map((addonId) => {
                      const addon = availableAddons.find(a => a.id === addonId);
                      if (!addon) return null;
                      return (
                        <div key={addonId} className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-3">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                            <div className="flex items-start justify-between gap-2 flex-1">
                              <div className="flex-1">
                                <p className="text-sm text-[var(--zuper-text-primary)] mb-1">{addon.title}</p>
                                <p className="text-xs text-[var(--zuper-text-secondary)]">{addon.description}</p>
                              </div>
                              <p className="text-xs font-medium text-[var(--zuper-text-primary)] flex-shrink-0 mt-0.5">
                                +${addon.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  // No addons selected
                  <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-3 text-center">
                    <p className="text-xs text-[var(--zuper-text-tertiary)]">No upgrades selected</p>
                  </div>
                )
              )}
            </div>
          )}

          {/* Cost Summary - Read-only */}
          {selectedEstimate && (() => {
            return (
            <div className="mb-6 p-4 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-xl">
              <h4 className="mb-4 text-xs text-[var(--zuper-text-primary)]">Cost Summary</h4>
              <div>
                {renderSectionedBreakdown(selectedEstimate, "sm")}
                
                {/* Selected Addons */}
                {selectedAddons.length > 0 && (
                  <>
                    <div className="mt-3 pt-3 border-t border-[var(--zuper-border)]">
                      <span className="text-[9px] uppercase tracking-[0.08em] text-[var(--zuper-text-tertiary)]">Add-ons</span>
                    </div>
                    <div className="mt-1.5 space-y-1">
                      {selectedAddons.map((addonId) => {
                        const addon = availableAddons.find(a => a.id === addonId);
                        if (!addon) return null;
                        const selectedOpt = addonOptionSelections[addonId];
                        const displayTitle = selectedOpt ? `${addon.title} (${selectedOpt})` : addon.title;
                        const addonPrice = addon.isBundle && addon.bundleItems
                          ? addon.bundleItems.reduce((sum, item) => sum + (item.price || 0), 0)
                          : addon.price;
                        return (
                          <div key={addonId} className="flex justify-between items-baseline gap-4 text-[10px] pl-2">
                            <span className="text-[var(--zuper-text-primary)]">{displayTitle}</span>
                            <span className="text-[var(--zuper-text-secondary)] tabular-nums flex-shrink-0">${addonPrice.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                
                <div className="mt-4 pt-3 border-t border-[var(--zuper-border)]">
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="text-[var(--zuper-text-primary)]">Total</span>
                    <span className="text-[var(--zuper-text-primary)] tabular-nums">
                      ${calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            );
          })()}

          {/* Payment Method Section - Mobile */}
          {selectedEstimate && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign className="w-3.5 h-3.5 text-[var(--zuper-primary)]" />
                <Label className="text-xs text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Payment Method" : "Selected Payment Method"}
                </Label>
              </div>
              
              {isPrimarySigner ? (
                <div>
                  <div className="space-y-2">
                    <Card
                      className={`p-3 cursor-pointer transition-all border ${
                        paymentMethod === "cash"
                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                          : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                      }`}
                      onClick={() => handlePaymentMethodChange("cash")}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === "cash"
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {paymentMethod === "cash" && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[var(--zuper-text-primary)] mb-0.5">Cash Payment</p>
                          <p className="text-xs text-[var(--zuper-text-secondary)]">Pay in full upfront</p>
                        </div>
                      </div>
                    </Card>

                    <Card
                      className={`p-3 cursor-pointer transition-all border ${
                        paymentMethod === "financing"
                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                          : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                      }`}
                      onClick={() => handlePaymentMethodChange("financing")}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === "financing"
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {paymentMethod === "financing" && (
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-[var(--zuper-text-primary)] mb-0.5">Financing</p>
                          <p className="text-xs text-[var(--zuper-text-secondary)]">Monthly payments with competitive rates</p>
                          {(() => {
                            const lowestOption = financingProviders.reduce((lowest, provider) => {
                              const payment = calculateMonthlyPayment(calculateTotal(), provider.apr, provider.term);
                              const lowestPayment = calculateMonthlyPayment(calculateTotal(), lowest.apr, lowest.term);
                              return payment < lowestPayment ? provider : lowest;
                            }, financingProviders[0]);
                            const lowestPayment = calculateMonthlyPayment(calculateTotal(), lowestOption.apr, lowestOption.term);
                            
                            return (
                              <div className="flex items-center gap-2 mt-2 bg-[var(--zuper-primary-light)] rounded-lg p-2">
                                <div className="w-6 h-6 rounded-full bg-white border border-[var(--zuper-border)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  <img src={lowestOption.logo} alt={lowestOption.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-xs text-[var(--zuper-primary)] font-medium">
                                  As Low as ${Math.round(lowestPayment).toLocaleString()}/month for {lowestOption.term} months at {lowestOption.apr}%
                                </p>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {paymentMethod === "financing" && (
                    <div className="mt-3">
                      <p className="text-[10px] text-[var(--zuper-text-tertiary)] mb-2">Select Financing Provider</p>
                      <div className="space-y-2">
                        {financingProviders.map((provider) => {
                          const monthlyPayment = calculateMonthlyPayment(calculateTotal(), provider.apr, provider.term);
                          const totalWithInterest = monthlyPayment * provider.term;
                          const totalInterest = totalWithInterest - calculateTotal();
                          
                          return (
                            <Card
                              key={provider.id}
                              className={`overflow-hidden transition-all border ${
                                selectedFinancingProvider === provider.id
                                  ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                                  : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                              }`}
                            >
                              <div 
                                className="p-3 cursor-pointer"
                                onClick={() => handleFinancingProviderSelect(provider.id)}
                              >
                                <div className="flex items-start gap-3">
                                  <img
                                    src={provider.logo}
                                    alt={provider.name}
                                    className="w-10 h-10 rounded object-cover flex-shrink-0 ring-1 ring-[var(--zuper-border)]"
                                  />
                                  <div className="flex items-start justify-between gap-2 flex-1">
                                    <div className="flex items-start gap-2 flex-1">
                                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                        selectedFinancingProvider === provider.id
                                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                                          : "border-[var(--zuper-border)]"
                                      }`}>
                                        {selectedFinancingProvider === provider.id && (
                                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-sm text-[var(--zuper-text-primary)] mb-0.5">{provider.name}</p>
                                        <p className="text-xs text-[var(--zuper-text-secondary)] mb-1">{provider.description}</p>
                                        <div className="flex items-center gap-3 text-[10px] text-[var(--zuper-text-tertiary)]">
                                          <span>{provider.apr}% APR</span>
                                          <span>•</span>
                                          <span>{provider.term} months</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-base text-[var(--zuper-text-primary)] font-medium">
                                        ${Math.round(monthlyPayment).toLocaleString()}<span className="text-xs font-normal">/mo</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {selectedFinancingProvider === provider.id && (
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value="details" className="border-t border-[var(--zuper-border)]">
                                    <AccordionTrigger className="px-3 py-2 hover:no-underline hover:bg-[var(--zuper-background)]">
                                      <span className="text-xs text-[var(--zuper-text-primary)]">View Financing Details</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-3 pb-3">
                                      <div className="space-y-2 pt-1">
                                        <div className="bg-[var(--zuper-background)] rounded-lg p-2 space-y-1.5">
                                          <p className="text-[10px] font-medium text-[var(--zuper-text-primary)] mb-1">Project Cost</p>
                                          {selectedEstimate && renderSectionedBreakdown(selectedEstimate, "sm")}
                                          
                                          {selectedAddons.length > 0 && (
                                            <>
                                              <Separator className="my-1.5" />
                                              <p className="text-[10px] font-medium text-[var(--zuper-text-primary)] mb-0.5">Add-ons</p>
                                              {selectedAddons.map((addonId) => {
                                                const addon = availableAddons.find(a => a.id === addonId);
                                                if (!addon) return null;
                                                const selectedOption = addonOptionSelections[addonId];
                                                const displayTitle = selectedOption ? `${addon.title} (${selectedOption})` : addon.title;
                                                return (
                                                  <div key={addonId} className="flex justify-between text-[10px]">
                                                    <span className="text-[var(--zuper-text-secondary)]">{displayTitle}</span>
                                                    <span className="text-[var(--zuper-text-primary)]">${addon.price.toLocaleString()}</span>
                                                  </div>
                                                );
                                              })}
                                            </>
                                          )}
                                          
                                          <Separator className="my-1.5" />
                                          <div className="flex justify-between text-xs font-medium">
                                            <span className="text-[var(--zuper-text-primary)]">Subtotal</span>
                                            <span className="text-[var(--zuper-text-primary)]">${calculateTotal().toLocaleString()}</span>
                                          </div>
                                        </div>
                                        
                                        <div className="bg-[var(--zuper-background)] rounded-lg p-2 space-y-1.5">
                                          <p className="text-[10px] font-medium text-[var(--zuper-text-primary)] mb-1">Financing Terms</p>
                                          <div className="flex justify-between text-[10px]">
                                            <span className="text-[var(--zuper-text-secondary)]">Loan Amount</span>
                                            <span className="text-[var(--zuper-text-primary)]">${calculateTotal().toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between text-[10px]">
                                            <span className="text-[var(--zuper-text-secondary)]">Dealer Fee</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(calculateTotal() * 0.02).toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between text-[10px]">
                                            <span className="text-[var(--zuper-text-secondary)]">Interest Rate (APR)</span>
                                            <span className="text-[var(--zuper-text-primary)]">{provider.apr}%</span>
                                          </div>
                                          <div className="flex justify-between text-[10px]">
                                            <span className="text-[var(--zuper-text-secondary)]">Loan Term</span>
                                            <span className="text-[var(--zuper-text-primary)]">{provider.term} months</span>
                                          </div>
                                          <div className="flex justify-between text-[10px]">
                                            <span className="text-[var(--zuper-text-secondary)]">Total Interest</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(totalInterest).toLocaleString()}</span>
                                          </div>
                                          <Separator className="my-1.5" />
                                          <div className="flex justify-between text-[10px]">
                                            <span className="text-[var(--zuper-text-secondary)]">Monthly Payment</span>
                                            <span className="text-[var(--zuper-text-primary)] font-medium">${Math.round(monthlyPayment).toLocaleString()}/mo</span>
                                          </div>
                                          <div className="flex justify-between text-xs font-medium">
                                            <span className="text-[var(--zuper-text-primary)]">Total Amount</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(totalWithInterest).toLocaleString()}</span>
                                          </div>
                                        </div>
                                        
                                        <p className="text-[9px] text-[var(--zuper-text-tertiary)] italic">
                                          * Estimated monthly payment. Final terms subject to credit approval.
                                        </p>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm text-[var(--zuper-text-primary)] mb-0.5">
                        {paymentMethod === "cash" ? "Cash Payment" : "Financing"}
                      </p>
                      {paymentMethod === "financing" && selectedFinancingProvider && (
                        <>
                          <p className="text-xs text-[var(--zuper-text-secondary)] mb-1">
                            {financingProviders.find(p => p.id === selectedFinancingProvider)?.name}
                          </p>
                          <div className="flex items-center gap-3 text-[10px] text-[var(--zuper-text-tertiary)]">
                            <span>{financingProviders.find(p => p.id === selectedFinancingProvider)?.apr}% APR</span>
                            <span>•</span>
                            <span>{financingProviders.find(p => p.id === selectedFinancingProvider)?.term} months</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Customer Details */}
          <div className="mb-6 p-4 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
            <Label className="mb-2 block text-[10px] text-[var(--zuper-text-tertiary)] tracking-wide uppercase">Signee Information</Label>
            <p className="text-xs text-[var(--zuper-text-primary)] mb-0.5">{recipientName}</p>
            <p className="text-[10px] text-[var(--zuper-text-secondary)]">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleOpenSignatureDialog}
            disabled={!selectedOption || (hasProductOptions && !allProductOptionsSelected)}
            className="w-full bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-white py-5 text-sm"
          >
            <Pen className="w-4 h-4 mr-2" />
            {savedSignatureData ? "Update Signature" : "Add Signature"}
          </Button>

          {savedSignatureData && (
            <div className="mt-4 p-4 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
              <Label className="mb-2 block text-[10px] text-[var(--zuper-text-tertiary)] tracking-wide uppercase">Your Signature</Label>
              <div className="bg-white border border-[var(--zuper-border)] rounded p-2 mb-3">
                <img src={savedSignatureData} alt="Signature" className="max-w-full h-auto" />
              </div>
              <Button
                onClick={handleFinalSubmit}
                className="w-full bg-[var(--zuper-success)] hover:bg-[var(--zuper-success-hover)] text-white py-5 text-sm"
              >
                <Check className="w-4 h-4 mr-2" />
                Complete Signature
              </Button>
            </div>
          )}
        </div>

        {/* Tablet Layout (sm to md) */}
        <div className="hidden md:block lg:hidden">
          {/* Same structure as mobile but with adjusted spacing and sizing */}
          {/* Package Selection */}
          <div className="mb-8">
            <Label className="mb-4 block text-sm text-[var(--zuper-text-primary)]">
              {isPrimarySigner ? "Select Package" : "Selected Package"}
            </Label>
            {isPrimarySigner ? (
              <div className="space-y-3">
                {estimateOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`p-4 cursor-pointer transition-all border ${ 
                      selectedOption === option.id
                        ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                        : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          selectedOption === option.id
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {selectedOption === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          {option.recommended && (
                            <Badge className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary)] text-xs px-2 py-0.5 mb-2 inline-block">
                              Recommended
                            </Badge>
                          )}
                          <p className="text-base text-[var(--zuper-text-primary)] mb-1.5">{option.title}</p>
                          <p className="text-sm text-[var(--zuper-text-secondary)]">{option.description}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--zuper-text-primary)] flex-shrink-0">
                        ${option.price.toLocaleString()}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-[var(--zuper-background)] border-2 border-[var(--zuper-success)] rounded-lg p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      {estimateOptions.find(opt => opt.id === selectedOption)?.recommended && (
                        <Badge className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary)] text-xs px-2 py-0.5 mb-2 inline-block">
                          Recommended
                        </Badge>
                      )}
                      <p className="text-base text-[var(--zuper-text-primary)] mb-1.5">
                        {estimateOptions.find(opt => opt.id === selectedOption)?.title}
                      </p>
                      <p className="text-sm text-[var(--zuper-text-secondary)]">
                        {estimateOptions.find(opt => opt.id === selectedOption)?.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-medium text-[var(--zuper-text-primary)] flex-shrink-0">
                    ${estimateOptions.find(opt => opt.id === selectedOption)?.price.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Configuration Section */}
          {selectedOption && hasProductOptions && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-[var(--zuper-primary)]" />
                <Label className="text-sm text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Configure Your Package" : "Package Configuration"}
                </Label>
                {isPrimarySigner && !allProductOptionsSelected && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 bg-[var(--zuper-warning-light)] text-[var(--zuper-warning)] border-[var(--zuper-warning)]">
                    Required
                  </Badge>
                )}
              </div>
              <div className="space-y-4">
                {(() => {
                  const sections = selectedEstimate?.breakdownSections;
                  if (!sections || sections.length === 0) {
                    return productOptions.map((item) => {
                      const selectedValue = productOptionSelections[item.item];
                      const availableOptions = item.availableOptions!.filter(opt => opt.available);
                      return (
                        <div key={item.item} className="p-4 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
                          <p className="text-sm text-[var(--zuper-text-primary)] mb-3">{item.item}</p>
                          {isPrimarySigner ? (
                            <>
                              <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">{item.optionLabel || "Select Option"} {selectedValue && `- ${selectedValue}`}</p>
                              <div className="flex gap-2 flex-wrap">
                                {availableOptions.map((option) => (
                                  <div key={option.name} className="w-[100px]"><ProductOptionButton optionName={option.name} isSelected={selectedValue === option.name} onClick={() => handleProductOptionSelect(item.item, option.name)} colorMap={colorMap} imageUrl={option.imageUrl} size="small" /></div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)]" />
                              <p className="text-sm text-[var(--zuper-text-secondary)]">{item.optionLabel}: <span className="text-[var(--zuper-text-primary)]">{selectedValue}</span></p>
                            </div>
                          )}
                        </div>
                      );
                    });
                  }
                  const grouped = groupBreakdownBySections(productOptions, sections);
                  return grouped.map((group, gIdx) => (
                    <div key={group.section?.id || `ungrouped-tablet-${gIdx}`}>
                      {group.section && (
                        <div className={`flex items-center gap-2 ${gIdx > 0 ? "mt-2" : ""} mb-2`}>
                          <span className="text-[10px] uppercase tracking-wider text-[var(--zuper-text-tertiary)]">{group.section.title}</span>
                          <div className="flex-1 h-px bg-[var(--zuper-border)]" />
                        </div>
                      )}
                      <div className="space-y-3">
                        {group.items.map((item) => {
                          const selectedValue = productOptionSelections[item.item];
                          const availableOptions = item.availableOptions!.filter(opt => opt.available);
                          return (
                            <div key={item.item} className="p-4 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
                              <p className="text-sm text-[var(--zuper-text-primary)] mb-3">{item.item}</p>
                              {isPrimarySigner ? (
                                <>
                                  <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">{item.optionLabel || "Select Option"} {selectedValue && `- ${selectedValue}`}</p>
                                  <div className="flex gap-2 flex-wrap">
                                    {availableOptions.map((option) => (
                                      <div key={option.name} className="w-[100px]"><ProductOptionButton optionName={option.name} isSelected={selectedValue === option.name} onClick={() => handleProductOptionSelect(item.item, option.name)} colorMap={colorMap} imageUrl={option.imageUrl} size="small" /></div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)]" />
                                  <p className="text-sm text-[var(--zuper-text-secondary)]">{item.optionLabel}: <span className="text-[var(--zuper-text-primary)]">{selectedValue}</span></p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Optional Upgrades Section */}
          {showAddons && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-4 h-4 text-[var(--zuper-primary)]" />
                <Label className="text-sm text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Optional Upgrades" : "Selected Upgrades"}
                </Label>
                {isPrimarySigner && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 text-[var(--zuper-text-tertiary)] border-[var(--zuper-border)]">
                    Optional
                  </Badge>
                )}
              </div>
              
              {isPrimarySigner ? (
                <div className="space-y-3">
                  {availableAddons.map((addon) => (
                    <div key={addon.id}>
                      <Card
                        className={`p-4 cursor-pointer transition-all border ${
                          selectedAddons.includes(addon.id)
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                            : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                        }`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={
                              addon.hasOptions && 
                              addon.availableOptions && 
                              addonOptionSelections[addon.id]
                                ? addon.availableOptions.find(opt => opt.name === addonOptionSelections[addon.id])?.imageUrl || addon.image
                                : addon.image
                            }
                            alt={addon.title}
                            className="w-16 h-16 rounded object-cover flex-shrink-0 ring-1 ring-[var(--zuper-border)]"
                          />
                          <div className="flex items-start justify-between gap-3 flex-1">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                selectedAddons.includes(addon.id)
                                  ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                                  : "border-[var(--zuper-border)]"
                              }`}>
                                {selectedAddons.includes(addon.id) && (
                                  <Check className="w-3.5 h-3.5 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <p className="text-base text-[var(--zuper-text-primary)]">{addon.title}</p>
                                  {addon.isBundle && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-[var(--zuper-primary)] border-[var(--zuper-primary)]">
                                      Bundle
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-[var(--zuper-text-secondary)]">{addon.description}</p>
                              </div>
                            </div>
                            <p className="text-sm text-[var(--zuper-text-primary)] flex-shrink-0 mt-0.5">
                              {addon.isBundle && addon.bundleItems ? (
                                `+$${addon.bundleItems.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}`
                              ) : (
                                `+$${addon.price.toLocaleString()}`
                              )}
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      {/* Bundle items for tablet */}
                      {selectedAddons.includes(addon.id) && addon.isBundle && addon.bundleItems && (
                        <div className="mt-3 space-y-2.5">
                          {addon.bundleItems.map((item) => (
                            <div key={item.id} className="rounded-xl border border-[var(--zuper-border)] bg-[var(--zuper-card)] overflow-hidden shadow-sm">
                              {/* Item header */}
                              <div className="p-3.5 flex items-start gap-3">
                                <img
                                  src={
                                    item.hasOptions && 
                                    item.availableOptions && 
                                    bundleItemOptionSelections[item.id]
                                      ? item.availableOptions.find(opt => opt.name === bundleItemOptionSelections[item.id])?.imageUrl || item.image
                                      : item.image
                                  }
                                  alt={item.title}
                                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-[var(--zuper-text-primary)]">{item.title}</p>
                                      <p className="text-xs text-[var(--zuper-text-secondary)] mt-0.5">{item.description}</p>
                                    </div>
                                    <p className="text-sm text-[var(--zuper-text-primary)] flex-shrink-0">
                                      ${item.price.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Inline option selector */}
                              {item.hasOptions && item.customerSelectionEnabled && item.availableOptions && (
                                <div className="px-3.5 pb-3.5 pt-0">
                                  <div className="border-t border-dashed border-[var(--zuper-border)] pt-3">
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--zuper-text-tertiary)] mb-2.5">
                                      {item.optionLabel || "Select Option"}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                      {item.availableOptions.map((option) => (
                                        <div key={option.name} className={`w-[100px] ${!option.available ? "opacity-40 pointer-events-none" : ""}`}>
                                          <ProductOptionButton
                                            optionName={option.name}
                                            isSelected={bundleItemOptionSelections[item.id] === option.name}
                                            onClick={() => {
                                              if (option.available) {
                                                handleBundleItemOptionSelect(item.id, option.name);
                                              }
                                            }}
                                            colorMap={colorMap}
                                            imageUrl={option.imageUrl}
                                            size="small"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Non-bundle addon options */}
                      {selectedAddons.includes(addon.id) && !addon.isBundle && addon.hasOptions && addon.customerSelectionEnabled && addon.availableOptions && (
                        <div className="mt-3 ml-2">
                          <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">
                            {addon.optionLabel || "Select Option"}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {addon.availableOptions.map((option) => (
                              <div key={option.name} className={`w-[100px] ${!option.available ? "opacity-50" : ""}`}>
                                <ProductOptionButton
                                  optionName={option.name}
                                  isSelected={addonOptionSelections[addon.id] === option.name}
                                  onClick={(e) => {
                                    e?.stopPropagation();
                                    if (option.available) {
                                      handleAddonOptionSelect(addon.id, option.name);
                                    }
                                  }}
                                  colorMap={colorMap}
                                  imageUrl={option.imageUrl}
                                  size="small"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                selectedAddons.length > 0 ? (
                  <div className="space-y-3">
                    {selectedAddons.map((addonId) => {
                      const addon = availableAddons.find(a => a.id === addonId);
                      if (!addon) return null;
                      return (
                        <div key={addonId} className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                            <div className="flex items-start justify-between gap-3 flex-1">
                              <div className="flex-1">
                                <p className="text-base text-[var(--zuper-text-primary)] mb-1.5">{addon.title}</p>
                                <p className="text-sm text-[var(--zuper-text-secondary)]">{addon.description}</p>
                              </div>
                              <p className="text-sm font-medium text-[var(--zuper-text-primary)] flex-shrink-0 mt-0.5">
                                +${addon.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4 text-center">
                    <p className="text-sm text-[var(--zuper-text-tertiary)]">No upgrades selected</p>
                  </div>
                )
              )}
            </div>
          )}

          {/* Cost Summary - Read-only */}
          {selectedEstimate && (() => {
            return (
            <div className="mb-8 p-5 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-xl">
              <h4 className="mb-5 text-sm text-[var(--zuper-text-primary)]">Cost Summary</h4>
              <div>
                {renderSectionedBreakdown(selectedEstimate)}
                
                {selectedAddons.length > 0 && (
                  <>
                    <div className="mt-4 pt-3.5 border-t border-[var(--zuper-border)]">
                      <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--zuper-text-tertiary)]">Add-ons</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {selectedAddons.map((addonId) => {
                        const addon = availableAddons.find(a => a.id === addonId);
                        if (!addon) return null;
                        const selectedOpt = addonOptionSelections[addonId];
                        const displayTitle = selectedOpt ? `${addon.title} (${selectedOpt})` : addon.title;
                        const addonPrice = addon.isBundle && addon.bundleItems
                          ? addon.bundleItems.reduce((sum, item) => sum + (item.price || 0), 0)
                          : addon.price;
                        return (
                          <div key={addonId} className="flex justify-between items-baseline gap-4 text-xs pl-3">
                            <span className="text-[var(--zuper-text-primary)]">{displayTitle}</span>
                            <span className="text-[var(--zuper-text-secondary)] tabular-nums flex-shrink-0">${addonPrice.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                
                <div className="mt-5 pt-3.5 border-t border-[var(--zuper-border)]">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-[var(--zuper-text-primary)]">Total</span>
                    <span className="text-[var(--zuper-text-primary)] tabular-nums">
                      ${calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            );
          })()}

          {/* Payment Method Section - Tablet */}
          {selectedEstimate && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4 text-[var(--zuper-primary)]" />
                <Label className="text-sm text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Payment Method" : "Selected Payment Method"}
                </Label>
              </div>
              
              {isPrimarySigner ? (
                <div>
                  <div className="space-y-3">
                    <Card
                      className={`p-4 cursor-pointer transition-all border ${
                        paymentMethod === "cash"
                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                          : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                      }`}
                      onClick={() => handlePaymentMethodChange("cash")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === "cash"
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {paymentMethod === "cash" && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-[var(--zuper-text-primary)] mb-1">Cash Payment</p>
                          <p className="text-sm text-[var(--zuper-text-secondary)]">Pay in full upfront</p>
                        </div>
                      </div>
                    </Card>

                    <Card
                      className={`p-4 cursor-pointer transition-all border ${
                        paymentMethod === "financing"
                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                          : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                      }`}
                      onClick={() => handlePaymentMethodChange("financing")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === "financing"
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {paymentMethod === "financing" && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-[var(--zuper-text-primary)] mb-1">Financing</p>
                          <p className="text-sm text-[var(--zuper-text-secondary)]">Monthly payments with competitive rates</p>
                          {(() => {
                            const lowestOption = financingProviders.reduce((lowest, provider) => {
                              const payment = calculateMonthlyPayment(calculateTotal(), provider.apr, provider.term);
                              const lowestPayment = calculateMonthlyPayment(calculateTotal(), lowest.apr, lowest.term);
                              return payment < lowestPayment ? provider : lowest;
                            }, financingProviders[0]);
                            const lowestPayment = calculateMonthlyPayment(calculateTotal(), lowestOption.apr, lowestOption.term);
                            
                            return (
                              <div className="flex items-center gap-2 mt-2 bg-[var(--zuper-primary-light)] rounded-lg p-2">
                                <div className="w-8 h-8 rounded-full bg-white border border-[var(--zuper-border)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  <img src={lowestOption.logo} alt={lowestOption.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-sm text-[var(--zuper-primary)] font-medium">
                                  As Low as ${Math.round(lowestPayment).toLocaleString()}/month for {lowestOption.term} months at {lowestOption.apr}%
                                </p>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {paymentMethod === "financing" && (
                    <div className="mt-4">
                      <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">Select Financing Provider</p>
                      <div className="space-y-3">
                        {financingProviders.map((provider) => {
                          const monthlyPayment = calculateMonthlyPayment(calculateTotal(), provider.apr, provider.term);
                          const totalWithInterest = monthlyPayment * provider.term;
                          const totalInterest = totalWithInterest - calculateTotal();
                          
                          return (
                            <Card
                              key={provider.id}
                              className={`overflow-hidden transition-all border ${
                                selectedFinancingProvider === provider.id
                                  ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                                  : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                              }`}
                            >
                              <div 
                                className="p-4 cursor-pointer"
                                onClick={() => handleFinancingProviderSelect(provider.id)}
                              >
                                <div className="flex items-start gap-4">
                                  <img
                                    src={provider.logo}
                                    alt={provider.name}
                                    className="w-12 h-12 rounded object-cover flex-shrink-0 ring-1 ring-[var(--zuper-border)]"
                                  />
                                  <div className="flex items-start justify-between gap-3 flex-1">
                                    <div className="flex items-start gap-3 flex-1">
                                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                        selectedFinancingProvider === provider.id
                                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                                          : "border-[var(--zuper-border)]"
                                      }`}>
                                        {selectedFinancingProvider === provider.id && (
                                          <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-base text-[var(--zuper-text-primary)] mb-1">{provider.name}</p>
                                        <p className="text-sm text-[var(--zuper-text-secondary)] mb-2">{provider.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-[var(--zuper-text-tertiary)]">
                                          <span>{provider.apr}% APR</span>
                                          <span>•</span>
                                          <span>{provider.term} months</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-lg text-[var(--zuper-text-primary)] font-medium">
                                        ${Math.round(monthlyPayment).toLocaleString()}<span className="text-sm font-normal">/mo</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {selectedFinancingProvider === provider.id && (
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value="details" className="border-t border-[var(--zuper-border)]">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[var(--zuper-background)]">
                                      <span className="text-sm text-[var(--zuper-text-primary)]">View Financing Details</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                      <div className="space-y-3 pt-1">
                                        <div className="bg-[var(--zuper-background)] rounded-lg p-3 space-y-2">
                                          <p className="text-xs font-medium text-[var(--zuper-text-primary)] mb-2">Project Cost</p>
                                          {selectedEstimate && renderSectionedBreakdown(selectedEstimate, "sm")}
                                          
                                          {selectedAddons.length > 0 && (
                                            <>
                                              <Separator className="my-2" />
                                              <p className="text-xs font-medium text-[var(--zuper-text-primary)] mb-1">Add-ons</p>
                                              {selectedAddons.map((addonId) => {
                                                const addon = availableAddons.find(a => a.id === addonId);
                                                if (!addon) return null;
                                                const selectedOption = addonOptionSelections[addonId];
                                                const displayTitle = selectedOption ? `${addon.title} (${selectedOption})` : addon.title;
                                                return (
                                                  <div key={addonId} className="flex justify-between text-xs">
                                                    <span className="text-[var(--zuper-text-secondary)]">{displayTitle}</span>
                                                    <span className="text-[var(--zuper-text-primary)]">${addon.price.toLocaleString()}</span>
                                                  </div>
                                                );
                                              })}
                                            </>
                                          )}
                                          
                                          <Separator className="my-2" />
                                          <div className="flex justify-between text-sm font-medium">
                                            <span className="text-[var(--zuper-text-primary)]">Subtotal</span>
                                            <span className="text-[var(--zuper-text-primary)]">${calculateTotal().toLocaleString()}</span>
                                          </div>
                                        </div>
                                        
                                        <div className="bg-[var(--zuper-background)] rounded-lg p-3 space-y-2">
                                          <p className="text-xs font-medium text-[var(--zuper-text-primary)] mb-2">Financing Terms</p>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Loan Amount</span>
                                            <span className="text-[var(--zuper-text-primary)]">${calculateTotal().toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Dealer Fee</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(calculateTotal() * 0.02).toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Interest Rate (APR)</span>
                                            <span className="text-[var(--zuper-text-primary)]">{provider.apr}%</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Loan Term</span>
                                            <span className="text-[var(--zuper-text-primary)]">{provider.term} months</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Total Interest</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(totalInterest).toLocaleString()}</span>
                                          </div>
                                          <Separator className="my-2" />
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Monthly Payment</span>
                                            <span className="text-[var(--zuper-text-primary)] font-medium">${Math.round(monthlyPayment).toLocaleString()}/mo</span>
                                          </div>
                                          <div className="flex justify-between text-sm font-medium">
                                            <span className="text-[var(--zuper-text-primary)]">Total Amount</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(totalWithInterest).toLocaleString()}</span>
                                          </div>
                                        </div>
                                        
                                        <p className="text-[10px] text-[var(--zuper-text-tertiary)] italic">
                                          * Estimated monthly payment. Final terms subject to credit approval.
                                        </p>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-base text-[var(--zuper-text-primary)] mb-1">
                        {paymentMethod === "cash" ? "Cash Payment" : "Financing"}
                      </p>
                      {paymentMethod === "financing" && selectedFinancingProvider && (
                        <>
                          <p className="text-sm text-[var(--zuper-text-secondary)] mb-2">
                            {financingProviders.find(p => p.id === selectedFinancingProvider)?.name}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-[var(--zuper-text-tertiary)]">
                            <span>{financingProviders.find(p => p.id === selectedFinancingProvider)?.apr}% APR</span>
                            <span>•</span>
                            <span>{financingProviders.find(p => p.id === selectedFinancingProvider)?.term} months</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Customer Details */}
          <div className="mb-8 p-5 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
            <Label className="mb-3 block text-xs text-[var(--zuper-text-tertiary)] tracking-wide uppercase">Signee Information</Label>
            <p className="text-sm text-[var(--zuper-text-primary)] mb-1">{recipientName}</p>
            <p className="text-xs text-[var(--zuper-text-secondary)]">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleOpenSignatureDialog}
            disabled={!selectedOption || (hasProductOptions && !allProductOptionsSelected)}
            className="w-full bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-white py-6 text-base"
          >
            <Pen className="w-4 h-4 mr-2" />
            {savedSignatureData ? "Update Signature" : "Add Signature"}
          </Button>

          {savedSignatureData && (
            <div className="mt-6 p-5 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
              <Label className="mb-3 block text-xs text-[var(--zuper-text-tertiary)] tracking-wide uppercase">Your Signature</Label>
              <div className="bg-white border border-[var(--zuper-border)] rounded p-3 mb-4">
                <img src={savedSignatureData} alt="Signature" className="max-w-full h-auto" />
              </div>
              <Button
                onClick={handleFinalSubmit}
                className="w-full bg-[var(--zuper-success)] hover:bg-[var(--zuper-success-hover)] text-white py-6 text-base"
              >
                <Check className="w-4 h-4 mr-2" />
                Complete Signature
              </Button>
            </div>
          )}
        </div>

        {/* Desktop Layout (lg and up) - Similar structure with further refinements */}
        <div className="hidden lg:block">
          {/* Package Selection */}
          <div className="mb-8">
            <Label className="mb-4 block text-sm text-[var(--zuper-text-primary)]">
              {isPrimarySigner ? "Select Package" : "Selected Package"}
            </Label>
            {isPrimarySigner ? (
              <div className="space-y-3">
                {estimateOptions.map((option) => (
                  <Card
                    key={option.id}
                    className={`p-5 cursor-pointer transition-all border ${ 
                      selectedOption === option.id
                        ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                        : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                    }`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                          selectedOption === option.id
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {selectedOption === option.id && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          {option.recommended && (
                            <Badge className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary)] text-xs px-2 py-0.5 mb-2 inline-block">
                              Recommended
                            </Badge>
                          )}
                          <p className="text-base text-[var(--zuper-text-primary)] mb-1.5">{option.title}</p>
                          <p className="text-sm text-[var(--zuper-text-secondary)]">{option.description}</p>
                        </div>
                      </div>
                      <p className="text-sm text-[var(--zuper-text-primary)] flex-shrink-0">
                        ${option.price.toLocaleString()}
                      </p>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="bg-[var(--zuper-background)] border-2 border-[var(--zuper-success)] rounded-lg p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      {estimateOptions.find(opt => opt.id === selectedOption)?.recommended && (
                        <Badge className="bg-[var(--zuper-primary)] text-white hover:bg-[var(--zuper-primary)] text-xs px-2 py-0.5 mb-2 inline-block">
                          Recommended
                        </Badge>
                      )}
                      <p className="text-base text-[var(--zuper-text-primary)] mb-1.5">
                        {estimateOptions.find(opt => opt.id === selectedOption)?.title}
                      </p>
                      <p className="text-sm text-[var(--zuper-text-secondary)]">
                        {estimateOptions.find(opt => opt.id === selectedOption)?.description}
                      </p>
                    </div>
                  </div>
                  <p className="text-base font-medium text-[var(--zuper-text-primary)] flex-shrink-0">
                    ${estimateOptions.find(opt => opt.id === selectedOption)?.price.toLocaleString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Product Configuration Section */}
          {selectedOption && hasProductOptions && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-4 h-4 text-[var(--zuper-primary)]" />
                <Label className="text-sm text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Configure Your Package" : "Package Configuration"}
                </Label>
                {isPrimarySigner && !allProductOptionsSelected && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 bg-[var(--zuper-warning-light)] text-[var(--zuper-warning)] border-[var(--zuper-warning)]">
                    Required
                  </Badge>
                )}
              </div>
              <div className="space-y-4">
                {(() => {
                  const sections = selectedEstimate?.breakdownSections;
                  if (!sections || sections.length === 0) {
                    return productOptions.map((item) => {
                      const selectedValue = productOptionSelections[item.item];
                      const availableOptions = item.availableOptions!.filter(opt => opt.available);
                      return (
                        <div key={item.item} className="p-4 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
                          <p className="text-sm text-[var(--zuper-text-primary)] mb-3">{item.item}</p>
                          {isPrimarySigner ? (
                            <>
                              <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">{item.optionLabel || "Select Option"} {selectedValue && `- ${selectedValue}`}</p>
                              <div className="flex gap-2 flex-wrap">
                                {availableOptions.map((option) => (
                                  <div key={option.name} className="w-[110px]"><ProductOptionButton optionName={option.name} isSelected={selectedValue === option.name} onClick={() => handleProductOptionSelect(item.item, option.name)} colorMap={colorMap} imageUrl={option.imageUrl} size="small" /></div>
                                ))}
                              </div>
                            </>
                          ) : (
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)]" />
                              <p className="text-sm text-[var(--zuper-text-secondary)]">{item.optionLabel}: <span className="text-[var(--zuper-text-primary)]">{selectedValue}</span></p>
                            </div>
                          )}
                        </div>
                      );
                    });
                  }
                  const grouped = groupBreakdownBySections(productOptions, sections);
                  return grouped.map((group, gIdx) => (
                    <div key={group.section?.id || `ungrouped-desktop-${gIdx}`}>
                      {group.section && (
                        <div className={`flex items-center gap-2 ${gIdx > 0 ? "mt-2" : ""} mb-2`}>
                          <span className="text-[10px] uppercase tracking-wider text-[var(--zuper-text-tertiary)]">{group.section.title}</span>
                          <div className="flex-1 h-px bg-[var(--zuper-border)]" />
                        </div>
                      )}
                      <div className="space-y-3">
                        {group.items.map((item) => {
                          const selectedValue = productOptionSelections[item.item];
                          const availableOptions = item.availableOptions!.filter(opt => opt.available);
                          return (
                            <div key={item.item} className="p-4 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
                              <p className="text-sm text-[var(--zuper-text-primary)] mb-3">{item.item}</p>
                              {isPrimarySigner ? (
                                <>
                                  <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">{item.optionLabel || "Select Option"} {selectedValue && `- ${selectedValue}`}</p>
                                  <div className="flex gap-2 flex-wrap">
                                    {availableOptions.map((option) => (
                                      <div key={option.name} className="w-[110px]"><ProductOptionButton optionName={option.name} isSelected={selectedValue === option.name} onClick={() => handleProductOptionSelect(item.item, option.name)} colorMap={colorMap} imageUrl={option.imageUrl} size="small" /></div>
                                    ))}
                                  </div>
                                </>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <CheckCircle2 className="w-4 h-4 text-[var(--zuper-success)]" />
                                  <p className="text-sm text-[var(--zuper-text-secondary)]">{item.optionLabel}: <span className="text-[var(--zuper-text-primary)]">{selectedValue}</span></p>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
              </div>
            </div>
          )}

          {/* Optional Upgrades Section */}
          {showAddons && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Plus className="w-4 h-4 text-[var(--zuper-primary)]" />
                <Label className="text-sm text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Optional Upgrades" : "Selected Upgrades"}
                </Label>
                {isPrimarySigner && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5 text-[var(--zuper-text-tertiary)] border-[var(--zuper-border)]">
                    Optional
                  </Badge>
                )}
              </div>
              
              {isPrimarySigner ? (
                <div className="space-y-3">
                  {availableAddons.map((addon) => (
                    <div key={addon.id}>
                      <Card
                        className={`p-4 cursor-pointer transition-all border ${
                          selectedAddons.includes(addon.id)
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                            : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                        }`}
                        onClick={() => toggleAddon(addon.id)}
                      >
                        <div className="flex items-start gap-4">
                          <img
                            src={
                              addon.hasOptions && 
                              addon.availableOptions && 
                              addonOptionSelections[addon.id]
                                ? addon.availableOptions.find(opt => opt.name === addonOptionSelections[addon.id])?.imageUrl || addon.image
                                : addon.image
                            }
                            alt={addon.title}
                            className="w-16 h-16 rounded object-cover flex-shrink-0 ring-1 ring-[var(--zuper-border)]"
                          />
                          <div className="flex items-start justify-between gap-3 flex-1">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`w-5 h-5 rounded border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                selectedAddons.includes(addon.id)
                                  ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                                  : "border-[var(--zuper-border)]"
                              }`}>
                                {selectedAddons.includes(addon.id) && (
                                  <Check className="w-3.5 h-3.5 text-white" />
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <p className="text-base text-[var(--zuper-text-primary)]">{addon.title}</p>
                                  {addon.isBundle && (
                                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-[var(--zuper-primary)] border-[var(--zuper-primary)]">
                                      Bundle
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-sm text-[var(--zuper-text-secondary)]">{addon.description}</p>
                              </div>
                            </div>
                            <p className="text-sm text-[var(--zuper-text-primary)] flex-shrink-0 mt-0.5">
                              {addon.isBundle && addon.bundleItems ? (
                                `+$${addon.bundleItems.reduce((sum, item) => sum + (item.price || 0), 0).toLocaleString()}`
                              ) : (
                                `+$${addon.price.toLocaleString()}`
                              )}
                            </p>
                          </div>
                        </div>
                      </Card>
                      
                      {/* Bundle items for desktop */}
                      {selectedAddons.includes(addon.id) && addon.isBundle && addon.bundleItems && (
                        <div className="mt-3 space-y-2.5">
                          {addon.bundleItems.map((item) => (
                            <div key={item.id} className="rounded-xl border border-[var(--zuper-border)] bg-[var(--zuper-card)] overflow-hidden shadow-sm">
                              {/* Item header */}
                              <div className="p-4 flex items-start gap-3.5">
                                <img
                                  src={
                                    item.hasOptions && 
                                    item.availableOptions && 
                                    bundleItemOptionSelections[item.id]
                                      ? item.availableOptions.find(opt => opt.name === bundleItemOptionSelections[item.id])?.imageUrl || item.image
                                      : item.image
                                  }
                                  alt={item.title}
                                  className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                      <p className="text-sm text-[var(--zuper-text-primary)]">{item.title}</p>
                                      <p className="text-xs text-[var(--zuper-text-secondary)] mt-0.5">{item.description}</p>
                                    </div>
                                    <p className="text-sm text-[var(--zuper-text-primary)] flex-shrink-0">
                                      ${item.price.toLocaleString()}
                                    </p>
                                  </div>
                                </div>
                              </div>

                              {/* Inline option selector */}
                              {item.hasOptions && item.customerSelectionEnabled && item.availableOptions && (
                                <div className="px-4 pb-4 pt-0">
                                  <div className="border-t border-dashed border-[var(--zuper-border)] pt-3">
                                    <p className="text-[10px] uppercase tracking-wider text-[var(--zuper-text-tertiary)] mb-2.5">
                                      {item.optionLabel || "Select Option"}
                                    </p>
                                    <div className="flex gap-2 flex-wrap">
                                      {item.availableOptions.map((option) => (
                                        <div key={option.name} className={`w-[110px] ${!option.available ? "opacity-40 pointer-events-none" : ""}`}>
                                          <ProductOptionButton
                                            optionName={option.name}
                                            isSelected={bundleItemOptionSelections[item.id] === option.name}
                                            onClick={() => {
                                              if (option.available) {
                                                handleBundleItemOptionSelect(item.id, option.name);
                                              }
                                            }}
                                            colorMap={colorMap}
                                            imageUrl={option.imageUrl}
                                            size="small"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Non-bundle addon options */}
                      {selectedAddons.includes(addon.id) && !addon.isBundle && addon.hasOptions && addon.customerSelectionEnabled && addon.availableOptions && (
                        <div className="mt-3 ml-2">
                          <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">
                            {addon.optionLabel || "Select Option"}
                          </p>
                          <div className="flex gap-2 flex-wrap">
                            {addon.availableOptions.map((option) => (
                              <div key={option.name} className={`w-[110px] ${!option.available ? "opacity-50" : ""}`}>
                                <ProductOptionButton
                                  optionName={option.name}
                                  isSelected={addonOptionSelections[addon.id] === option.name}
                                  onClick={(e) => {
                                    e?.stopPropagation();
                                    if (option.available) {
                                      handleAddonOptionSelect(addon.id, option.name);
                                    }
                                  }}
                                  colorMap={colorMap}
                                  imageUrl={option.imageUrl}
                                  size="small"
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                selectedAddons.length > 0 ? (
                  <div className="space-y-3">
                    {selectedAddons.map((addonId) => {
                      const addon = availableAddons.find(a => a.id === addonId);
                      if (!addon) return null;
                      return (
                        <div key={addonId} className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4">
                          <div className="flex items-start gap-4">
                            <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                            <div className="flex items-start justify-between gap-3 flex-1">
                              <div className="flex-1">
                                <p className="text-base text-[var(--zuper-text-primary)] mb-1.5">{addon.title}</p>
                                <p className="text-sm text-[var(--zuper-text-secondary)]">{addon.description}</p>
                              </div>
                              <p className="text-sm font-medium text-[var(--zuper-text-primary)] flex-shrink-0 mt-0.5">
                                +${addon.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-4 text-center">
                    <p className="text-sm text-[var(--zuper-text-tertiary)]">No upgrades selected</p>
                  </div>
                )
              )}
            </div>
          )}

          {/* Cost Summary - Read-only */}
          {selectedEstimate && (() => {
            return (
            <div className="mb-8 p-5 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-xl">
              <h4 className="mb-5 text-sm text-[var(--zuper-text-primary)]">Cost Summary</h4>
              <div>
                {renderSectionedBreakdown(selectedEstimate)}
                
                {selectedAddons.length > 0 && (
                  <>
                    <div className="mt-4 pt-3.5 border-t border-[var(--zuper-border)]">
                      <span className="text-[10px] uppercase tracking-[0.08em] text-[var(--zuper-text-tertiary)]">Add-ons</span>
                    </div>
                    <div className="mt-2 space-y-1.5">
                      {selectedAddons.map((addonId) => {
                        const addon = availableAddons.find(a => a.id === addonId);
                        if (!addon) return null;
                        const selectedOpt = addonOptionSelections[addonId];
                        const displayTitle = selectedOpt ? `${addon.title} (${selectedOpt})` : addon.title;
                        const addonPrice = addon.isBundle && addon.bundleItems
                          ? addon.bundleItems.reduce((sum, item) => sum + (item.price || 0), 0)
                          : addon.price;
                        return (
                          <div key={addonId} className="flex justify-between items-baseline gap-4 text-xs pl-3">
                            <span className="text-[var(--zuper-text-primary)]">{displayTitle}</span>
                            <span className="text-[var(--zuper-text-secondary)] tabular-nums flex-shrink-0">${addonPrice.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
                
                <div className="mt-5 pt-3.5 border-t border-[var(--zuper-border)]">
                  <div className="flex justify-between items-baseline text-sm">
                    <span className="text-[var(--zuper-text-primary)]">Total</span>
                    <span className="text-[var(--zuper-text-primary)] tabular-nums">
                      ${calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            );
          })()}

          {/* Payment Method Section - Desktop */}
          {selectedEstimate && (
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-4 h-4 text-[var(--zuper-primary)]" />
                <Label className="text-sm text-[var(--zuper-text-primary)]">
                  {isPrimarySigner ? "Payment Method" : "Selected Payment Method"}
                </Label>
              </div>
              
              {isPrimarySigner ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Card
                      className={`p-4 cursor-pointer transition-all border ${
                        paymentMethod === "cash"
                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                          : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                      }`}
                      onClick={() => handlePaymentMethodChange("cash")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === "cash"
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {paymentMethod === "cash" && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-[var(--zuper-text-primary)] mb-1">Cash Payment</p>
                          <p className="text-sm text-[var(--zuper-text-secondary)]">Pay the full amount upfront</p>
                        </div>
                      </div>
                    </Card>
                    
                    <Card
                      className={`p-4 cursor-pointer transition-all border ${
                        paymentMethod === "financing"
                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                          : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                      }`}
                      onClick={() => handlePaymentMethodChange("financing")}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center flex-shrink-0 ${
                          paymentMethod === "financing"
                            ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                            : "border-[var(--zuper-border)]"
                        }`}>
                          {paymentMethod === "financing" && (
                            <div className="w-2 h-2 bg-white rounded-full" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-base text-[var(--zuper-text-primary)] mb-1">Financing</p>
                          <p className="text-sm text-[var(--zuper-text-secondary)]">Monthly payments with competitive rates</p>
                          {(() => {
                            const lowestOption = financingProviders.reduce((lowest, provider) => {
                              const payment = calculateMonthlyPayment(calculateTotal(), provider.apr, provider.term);
                              const lowestPayment = calculateMonthlyPayment(calculateTotal(), lowest.apr, lowest.term);
                              return payment < lowestPayment ? provider : lowest;
                            }, financingProviders[0]);
                            const lowestPayment = calculateMonthlyPayment(calculateTotal(), lowestOption.apr, lowestOption.term);
                            
                            return (
                              <div className="flex items-center gap-1.5 mt-2">
                                <div className="w-5 h-5 rounded-full bg-white border border-[var(--zuper-border)] flex items-center justify-center flex-shrink-0 overflow-hidden">
                                  <img src={lowestOption.logo} alt={lowestOption.name} className="w-full h-full object-cover" />
                                </div>
                                <p className="text-xs text-[var(--zuper-text-secondary)]">
                                  As Low as ${Math.round(lowestPayment).toLocaleString()}/mo for {lowestOption.term} months at {lowestOption.apr}%
                                </p>
                              </div>
                            );
                          })()}
                        </div>
                      </div>
                    </Card>
                  </div>

                  {paymentMethod === "financing" && (
                    <div className="mt-4">
                      <p className="text-xs text-[var(--zuper-text-tertiary)] mb-3">Select Financing Provider</p>
                      <div className="space-y-3">
                        {financingProviders.map((provider) => {
                          const monthlyPayment = calculateMonthlyPayment(calculateTotal(), provider.apr, provider.term);
                          const totalWithInterest = monthlyPayment * provider.term;
                          const totalInterest = totalWithInterest - calculateTotal();
                          
                          return (
                            <Card
                              key={provider.id}
                              className={`overflow-hidden transition-all border ${
                                selectedFinancingProvider === provider.id
                                  ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary-light)] shadow-sm"
                                  : "border-[var(--zuper-border)] hover:border-[var(--zuper-text-tertiary)] bg-[var(--zuper-card)]"
                              }`}
                            >
                              <div 
                                className="p-4 cursor-pointer"
                                onClick={() => handleFinancingProviderSelect(provider.id)}
                              >
                                <div className="flex items-start gap-4">
                                  <img
                                    src={provider.logo}
                                    alt={provider.name}
                                    className="w-12 h-12 rounded object-cover flex-shrink-0 ring-1 ring-[var(--zuper-border)]"
                                  />
                                  <div className="flex items-start justify-between gap-3 flex-1">
                                    <div className="flex items-start gap-3 flex-1">
                                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center mt-0.5 flex-shrink-0 ${
                                        selectedFinancingProvider === provider.id
                                          ? "border-[var(--zuper-primary)] bg-[var(--zuper-primary)]"
                                          : "border-[var(--zuper-border)]"
                                      }`}>
                                        {selectedFinancingProvider === provider.id && (
                                          <div className="w-2 h-2 bg-white rounded-full" />
                                        )}
                                      </div>
                                      <div className="flex-1">
                                        <p className="text-base text-[var(--zuper-text-primary)] mb-1">{provider.name}</p>
                                        <p className="text-sm text-[var(--zuper-text-secondary)] mb-2">{provider.description}</p>
                                        <div className="flex items-center gap-4 text-xs text-[var(--zuper-text-tertiary)]">
                                          <span>{provider.apr}% APR</span>
                                          <span>•</span>
                                          <span>{provider.term} months</span>
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-right flex-shrink-0">
                                      <p className="text-lg text-[var(--zuper-text-primary)] font-medium">
                                        ${Math.round(monthlyPayment).toLocaleString()}<span className="text-sm font-normal">/mo</span>
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              
                              {selectedFinancingProvider === provider.id && (
                                <Accordion type="single" collapsible className="w-full">
                                  <AccordionItem value="details" className="border-t border-[var(--zuper-border)]">
                                    <AccordionTrigger className="px-4 py-3 hover:no-underline hover:bg-[var(--zuper-background)]">
                                      <span className="text-sm text-[var(--zuper-text-primary)]">View Financing Details</span>
                                    </AccordionTrigger>
                                    <AccordionContent className="px-4 pb-4">
                                      <div className="space-y-3 pt-1">
                                        {/* Project Cost Breakdown */}
                                        <div className="bg-[var(--zuper-background)] rounded-lg p-3 space-y-2">
                                          <p className="text-xs font-medium text-[var(--zuper-text-primary)] mb-1">Project Cost</p>
                                          {selectedEstimate && renderSectionedBreakdown(selectedEstimate, "sm")}
                                          
                                          {selectedAddons.length > 0 && (
                                            <>
                                              <Separator className="my-2" />
                                              <p className="text-xs font-medium text-[var(--zuper-text-primary)] mb-1">Add-ons</p>
                                              {selectedAddons.map((addonId) => {
                                                const addon = availableAddons.find(a => a.id === addonId);
                                                if (!addon) return null;
                                                const selectedOption = addonOptionSelections[addonId];
                                                const displayTitle = selectedOption ? `${addon.title} (${selectedOption})` : addon.title;
                                                return (
                                                  <div key={addonId} className="flex justify-between text-xs">
                                                    <span className="text-[var(--zuper-text-secondary)]">{displayTitle}</span>
                                                    <span className="text-[var(--zuper-text-primary)]">${addon.price.toLocaleString()}</span>
                                                  </div>
                                                );
                                              })}
                                            </>
                                          )}
                                          
                                          <Separator className="my-2" />
                                          <div className="flex justify-between text-sm font-medium">
                                            <span className="text-[var(--zuper-text-primary)]">Subtotal</span>
                                            <span className="text-[var(--zuper-text-primary)]">${calculateTotal().toLocaleString()}</span>
                                          </div>
                                        </div>
                                        
                                        {/* Financing Terms */}
                                        <div className="bg-[var(--zuper-background)] rounded-lg p-3 space-y-2">
                                          <p className="text-xs font-medium text-[var(--zuper-text-primary)] mb-2">Financing Terms</p>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Loan Amount</span>
                                            <span className="text-[var(--zuper-text-primary)]">${calculateTotal().toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Dealer Fee</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(calculateTotal() * 0.02).toLocaleString()}</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Interest Rate (APR)</span>
                                            <span className="text-[var(--zuper-text-primary)]">{provider.apr}%</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Loan Term</span>
                                            <span className="text-[var(--zuper-text-primary)]">{provider.term} months</span>
                                          </div>
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Total Interest</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(totalInterest).toLocaleString()}</span>
                                          </div>
                                          <Separator className="my-2" />
                                          <div className="flex justify-between text-xs">
                                            <span className="text-[var(--zuper-text-secondary)]">Monthly Payment</span>
                                            <span className="text-[var(--zuper-text-primary)] font-medium">${Math.round(monthlyPayment).toLocaleString()}/mo</span>
                                          </div>
                                          <div className="flex justify-between text-sm font-medium">
                                            <span className="text-[var(--zuper-text-primary)]">Total Amount</span>
                                            <span className="text-[var(--zuper-text-primary)]">${Math.round(totalWithInterest).toLocaleString()}</span>
                                          </div>
                                        </div>
                                        
                                        <p className="text-[10px] text-[var(--zuper-text-tertiary)] italic">
                                          * Estimated monthly payment. Final terms subject to credit approval.
                                        </p>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg p-5">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[var(--zuper-success)] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className="text-base text-[var(--zuper-text-primary)] mb-1">
                        {paymentMethod === "cash" ? "Cash Payment" : "Financing"}
                      </p>
                      {paymentMethod === "financing" && selectedFinancingProvider && (
                        <>
                          <p className="text-sm text-[var(--zuper-text-secondary)] mb-2">
                            {financingProviders.find(p => p.id === selectedFinancingProvider)?.name}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-[var(--zuper-text-tertiary)]">
                            <span>{financingProviders.find(p => p.id === selectedFinancingProvider)?.apr}% APR</span>
                            <span>•</span>
                            <span>{financingProviders.find(p => p.id === selectedFinancingProvider)?.term} months</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Customer Details */}
          <div className="mb-8 p-5 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
            <Label className="mb-3 block text-xs text-[var(--zuper-text-tertiary)] tracking-wide uppercase">Signee Information</Label>
            <p className="text-sm text-[var(--zuper-text-primary)] mb-1">{recipientName}</p>
            <p className="text-xs text-[var(--zuper-text-secondary)]">
              {new Date().toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleOpenSignatureDialog}
            disabled={!selectedOption || (hasProductOptions && !allProductOptionsSelected)}
            className="w-full bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-white py-6 text-base"
          >
            <Pen className="w-4 h-4 mr-2" />
            {savedSignatureData ? "Update Signature" : "Add Signature"}
          </Button>

          {savedSignatureData && (
            <div className="mt-6 p-5 bg-[var(--zuper-background)] border border-[var(--zuper-border)] rounded-lg">
              <Label className="mb-3 block text-xs text-[var(--zuper-text-tertiary)] tracking-wide uppercase">Your Signature</Label>
              <div className="bg-white border border-[var(--zuper-border)] rounded p-3 mb-4">
                <img src={savedSignatureData} alt="Signature" className="max-w-full h-auto" />
              </div>
              <Button
                onClick={handleFinalSubmit}
                className="w-full bg-[var(--zuper-success)] hover:bg-[var(--zuper-success-hover)] text-white py-6 text-base"
              >
                <Check className="w-4 h-4 mr-2" />
                Complete Signature
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Signature Dialog */}
      <Dialog open={isSignatureDialogOpen} onOpenChange={setIsSignatureDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Your Signature</DialogTitle>
            <DialogDescription>
              Please sign in the box below to complete your approval
            </DialogDescription>
          </DialogHeader>
          <div className="border-2 border-[var(--zuper-border)] rounded-lg bg-white">
            <canvas
              ref={canvasRef}
              width={400}
              height={200}
              className="w-full touch-none"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
            />
          </div>
          <DialogFooter className="flex gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={clearSignature}
              className="flex-1 sm:flex-none"
            >
              <Eraser className="w-4 h-4 mr-2" />
              Clear
            </Button>
            <Button
              type="button"
              onClick={handleSaveSignature}
              disabled={!hasSignature}
              className="flex-1 sm:flex-none bg-[var(--zuper-primary)] hover:bg-[var(--zuper-primary-hover)] text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Save Signature
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
