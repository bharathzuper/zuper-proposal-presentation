import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import svgPaths from "../imports/svg-o7c6doe7ol";
import { ProductOptionButton } from "../components/ProductOptionButton";

interface ProductBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    sku: string;
    image: string;
    price: number;
    options: Array<{
      name: string;
      image?: string;
    }>;
  };
  onAdd: (productData: {
    id: string;
    name: string;
    sku: string;
    image: string;
    price: number;
    selectedOption: string | null;
    selectedOptionImage?: string;
    location: string;
    description: string;
    quantity: string;
    unitPrice: string;
  }) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

// Color mapping for gutter guard options (reusing from proposal flow)
const colorMap: Record<string, string> = {
  "Aluminum": "#C0C0C0",
  "Bronze": "#CD7F32",
  "White": "#FFFFFF",
  "Black": "#000000",
  "Brown": "#8B4513",
  "Silver": "#D3D3D3",
  "Gold": "#FFD700",
  "Copper": "#B87333",
  "Pewter": "#8B8589",
  "Titanium": "#878681",
  "Steel": "#A8A9AD",
  "Brass": "#B5A642",
  "Charcoal": "#36454F",
  "Graphite": "#383838",
  "Pearl": "#F0EAD6",
};

export function ProductBottomSheet({ isOpen, onClose, product, onAdd, onDelete, onEdit }: ProductBottomSheetProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [location, setLocation] = useState("Warehouse #12");
  const [description, setDescription] = useState("Some description about the product");
  const [unitPrice, setUnitPrice] = useState(product.price.toString());
  const [quantity, setQuantity] = useState("2.00");

  if (!isOpen) return null;

  const handleAddToSelection = () => {
    // Generate product data to pass back
    const productData = {
      id: Date.now().toString(), // Simple unique ID
      name: product.name,
      sku: product.sku,
      image: product.image,
      price: product.price,
      selectedOption: selectedOption,
      selectedOptionImage: product.options.find(option => option.name === selectedOption)?.image,
      location: location,
      description: description,
      quantity: quantity,
      unitPrice: unitPrice,
    };
    
    onAdd(productData);
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[16px] max-h-[90vh] overflow-y-auto animate-slide-up max-w-[390px] mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e8edf1] z-10">
          <div className="flex items-center justify-between p-[16px]">
            <div className="flex items-center gap-[12px] flex-1">
              <div className="relative rounded-[6px] shrink-0 size-[48px]">
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6px]">
                  <div className="absolute bg-[#d9d9d9] inset-0 rounded-[6px]" />
                  <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={product.image} />
                </div>
              </div>
              <div className="flex flex-col gap-[4px] flex-1">
                <p className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[16px] leading-[1.4] tracking-[0.2px]">{product.name}</p>
                <p className="font-['Inter:Regular',sans-serif] font-normal text-[#4f5e71] text-[12px] leading-[1.4] tracking-[0.2px]">{product.sku}</p>
              </div>
            </div>
            <button onClick={onClose} className="shrink-0 size-[24px] flex items-center justify-center">
              <X className="size-[20px] text-[#252a31]" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-[16px] pb-[24px] space-y-[20px]">
          {/* Product Options */}
          <div className="space-y-[12px]">
            <div className="flex items-center justify-between">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[14px] leading-[1.4] tracking-[0.2px]">
                Product Option {product.options.length > 0 && (
                  <span className="text-[#697d95] font-normal">({product.options.length} available)</span>
                )}
              </p>
              {/* Scroll hint - only show if there are many options */}
              {product.options.length > 9 && (
                <p className="text-[#0172cb] text-[12px] font-['Inter:Medium',sans-serif] font-medium animate-pulse-subtle">
                  Scroll ↓
                </p>
              )}
            </div>
            {/* Scrollable grid with bottom border to indicate more content */}
            <div className="relative">
              <div 
                className={`grid grid-cols-3 gap-[8px] overflow-y-auto pb-[4px] pr-[2px] scroll-smooth ${
                  product.options.length > 9 
                    ? 'max-h-[232px] border-b-2 border-[#e8edf1]' 
                    : ''
                }`}
              >
                {product.options.map((option) => (
                  <ProductOptionButton
                    key={option.name}
                    optionName={option.name}
                    isSelected={selectedOption === option.name}
                    onClick={() => setSelectedOption(option.name)}
                    colorMap={colorMap}
                    size="small"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Product Location */}
          <div className="space-y-[4px]">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[14px] leading-[1.4] tracking-[0.2px]">
              Product Location
            </p>
            <div className="bg-[#eff2f5] relative rounded-[6px] w-full">
              <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#252a31] text-[14px] tracking-[0.2px] flex-1">
                    {location}
                  </p>
                  <div className="relative shrink-0 size-[24px]">
                    <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
                      <g>
                        <path d={svgPaths.p328a4100} fill="#697D95" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="space-y-[4px]">
            <p className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[14px] leading-[1.4] tracking-[0.2px]">
              Product Description
            </p>
            <div className="bg-[#eff2f5] min-h-[80px] relative rounded-[6px] w-full">
              <div className="overflow-clip rounded-[inherit] size-full">
                <div className="content-stretch flex items-start p-[12px] relative size-full">
                  <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#252a31] text-[14px] tracking-[0.2px]">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Unit Price and Quantity */}
          <div className="flex gap-[16px]">
            {/* Unit Price */}
            <div className="flex-1 space-y-[4px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[14px] leading-[1.4] tracking-[0.2px]">
                Unit Price <span className="text-[#d21c1c]">*</span>
              </p>
              <div className="bg-[#eff2f5] relative rounded-[6px] w-full">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center p-[12px] relative w-full">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[14px] tracking-[0.2px]">
                      <span className="text-[#697d95]">USD</span>
                      <span className="text-[#252a31]">{` ${unitPrice}`}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex-1 space-y-[4px]">
              <p className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[14px] leading-[1.4] tracking-[0.2px]">
                Quantity <span className="text-[#d21c1c]">*</span>
              </p>
              <div className="bg-[#eff2f5] relative rounded-[6px] w-full">
                <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
                  <div className="content-stretch flex items-center p-[12px] relative w-full">
                    <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] text-[#252a31] text-[14px] tracking-[0.2px]">
                      {quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Add to Selection Button */}
          <button
            onClick={handleAddToSelection}
            className="w-full bg-[#e44a19] hover:bg-[#c63d15] text-white font-['Inter:Medium',sans-serif] font-medium text-[14px] leading-[1.4] tracking-[0.2px] px-[16px] py-[12px] rounded-[6px] transition-colors"
          >
            Add to Selection
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
        @keyframes pulse-subtle {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.6;
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}