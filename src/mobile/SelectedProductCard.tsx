import svgPathsSelected from "../imports/svg-d35cffkwsd";

interface SelectedProductCardProps {
  product: {
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
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function SelectedProductCard({ product, onEdit, onDelete }: SelectedProductCardProps) {
  const totalPrice = parseFloat(product.unitPrice) * parseFloat(product.quantity);

  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      
      {/* Product Header */}
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex gap-[12px] items-start px-[16px] py-[12px] relative w-full">
          <div className="relative rounded-[6px] shrink-0 size-[48px]">
            <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6px]">
              <div className="absolute bg-[#d9d9d9] inset-0 rounded-[6px]" />
              <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={product.image} />
            </div>
          </div>
          <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
            <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">{product.name}</p>
            <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4f5e71] text-[12px] w-full">{product.sku}</p>
          </div>
          {/* Edit Icon */}
          <button onClick={() => onEdit(product.id)} className="relative shrink-0 size-[24px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <g />
                <path d="M4 20H8L18.5 9.5C19.6046 8.39543 19.6046 6.60457 18.5 5.5C17.3954 4.39543 15.6046 4.39543 14.5 5.5L4 16V20" stroke="#252A31" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M13.5 6.5L17.5 10.5" stroke="#252A31" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </button>
          {/* Delete Icon */}
          <button onClick={() => onDelete(product.id)} className="relative shrink-0 size-[24px]">
            <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
              <g>
                <g />
                <path d="M4 7H20" stroke="#D21C1C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M10 11V17" stroke="#D21C1C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M14 11V17" stroke="#D21C1C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" stroke="#D21C1C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                <path d="M9 7V4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V7" stroke="#D21C1C" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
              </g>
            </svg>
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="relative shrink-0 w-full">
        <div className="content-stretch flex flex-col items-start pb-[4px] px-[16px] relative w-full">
          {/* Description with info icon */}
          {product.description && (
            <div className="content-stretch flex gap-[8px] items-start overflow-clip pb-[4px] relative shrink-0 w-full">
              <div className="bg-[#e8f4fd] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[24px] shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <g />
                      <circle cx="8" cy="8" r="6" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M8 5.33333H8.00667" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path d="M7.33333 8H8V10.6667H8.66667" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pt-[4px] relative">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] tracking-[0.2px] w-full whitespace-pre-wrap">{product.description}</p>
              </div>
            </div>
          )}

          {/* Selected Option with image thumbnail */}
          {product.selectedOption && (
            <div className="content-stretch flex h-[24px] items-start overflow-clip pb-[2px] relative shrink-0 w-full">
              <div className="content-stretch flex gap-[10px] items-center relative shrink-0">
                {product.selectedOptionImage ? (
                  // Show actual option image (color swatch or material photo)
                  <div className="relative rounded-[4px] shrink-0 size-[22px] border border-[#e8edf1] overflow-hidden">
                    <img 
                      alt={product.selectedOption} 
                      className="absolute inset-0 w-full h-full object-cover" 
                      src={product.selectedOptionImage} 
                    />
                  </div>
                ) : (
                  // Fallback to generic icon if no image provided
                  <div className="bg-[#e8f4fd] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[24px] shrink-0 size-[22px]">
                    <div className="relative shrink-0 size-[16px]">
                      <svg className="absolute inset-0 w-full h-full p-[3px]" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                        <g>
                          <g />
                          <rect height="4" rx="2" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" width="4" x="2" y="10" />
                          <rect height="4" rx="2" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" width="4" x="10" y="10" />
                          <rect height="4" rx="2" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" width="4" x="6" y="2" />
                          <path d="M4 10V9.33333C4 8.59695 4.59695 8 5.33333 8H10.6667C11.403 8 12 8.59695 12 9.33333V10" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
                          <path d="M8 6V8" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                        </g>
                      </svg>
                    </div>
                  </div>
                )}
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] tracking-[0.2px] whitespace-pre-wrap">{product.selectedOption} - Option</p>
              </div>
            </div>
          )}

          {/* Location with map pin icon */}
          {product.location && (
            <div className="content-stretch flex gap-[8px] items-start overflow-clip pb-[4px] relative shrink-0 w-full">
              <div className="bg-[#e8f4fd] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[24px] shrink-0">
                <div className="relative shrink-0 size-[16px]">
                  <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
                    <g>
                      <g />
                      <circle cx="8" cy="7.33333" r="2" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                      <path clipRule="evenodd" d="M11.7713 11.1047L8.94267 13.9333C8.42208 14.4534 7.57859 14.4534 7.058 13.9333L4.22867 11.1047C2.14595 9.02184 2.14601 5.64501 4.2288 3.56226C6.31159 1.47951 9.68842 1.47951 11.7712 3.56226C13.854 5.64501 13.8541 9.02184 11.7713 11.1047V11.1047Z" fillRule="evenodd" stroke="#0172CB" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
                    </g>
                  </svg>
                </div>
              </div>
              <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pt-[4px] relative">
                <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] tracking-[0.2px] w-full whitespace-pre-wrap">{product.location}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Price Section */}
      <div className="relative shrink-0 w-full">
        <div className="flex flex-row items-center size-full">
          <div className="content-stretch flex items-center justify-between leading-[0] not-italic pb-[8px] px-[16px] relative tracking-[0.2px] w-full whitespace-nowrap">
            <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#252a31] text-[12px]">
              <p className="leading-[1.4]">{product.quantity} X USD {product.unitPrice}</p>
            </div>
            <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#0172cb] text-[14px] uppercase">
              <p className="leading-[1.4]">USD {totalPrice.toFixed(0)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}