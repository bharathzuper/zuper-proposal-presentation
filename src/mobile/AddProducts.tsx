import { useState } from "react";
import { X, Search, Menu, Plus, ScanBarcode, Filter } from "lucide-react";
import imgProductPlaceholder from "figma:asset/7cedfbfb6d723ed95a9c12a4e11288387f2bd9a5.png";
import { ProductBottomSheet } from "./ProductBottomSheet";
import { SelectedProductCard } from "./SelectedProductCard";

// Type for selected product
interface SelectedProduct {
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
}

// Mock product data
const mockProducts = [
  {
    id: "1",
    name: "10 mm Screw",
    sku: "758323",
    image: imgProductPlaceholder,
    price: 120.00,
    isAvailable: false,
    description: "",
    options: [
      { name: "Aluminum", image: imgProductPlaceholder },
      { name: "Bronze", image: imgProductPlaceholder },
      { name: "White", image: imgProductPlaceholder },
    ],
  },
  {
    id: "2",
    name: "10 mm screw",
    sku: "004",
    image: imgProductPlaceholder,
    price: 20.00,
    isAvailable: false,
    description: "Description of the part",
    options: [
      { name: "Charcoal", image: imgProductPlaceholder },
      { name: "Silver", image: imgProductPlaceholder },
    ],
  },
  {
    id: "3",
    name: "10001",
    sku: "10001",
    image: imgProductPlaceholder,
    price: 1000.00,
    isAvailable: true,
    description: "",
    options: [
      { name: "Black", image: imgProductPlaceholder },
      { name: "Steel", image: imgProductPlaceholder },
    ],
  },
  {
    id: "4",
    name: "12W Battery edited",
    sku: "12344",
    image: imgProductPlaceholder,
    price: 45.00,
    isAvailable: true,
    description: "description",
    options: [
      { name: "Bronze", image: imgProductPlaceholder },
      { name: "Gold", image: imgProductPlaceholder },
    ],
  },
];

interface AddProductsProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddProducts({ isOpen, onClose }: AddProductsProps) {
  const [activeTab, setActiveTab] = useState<'products' | 'selected'>('products');
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);
  const [bottomSheetProduct, setBottomSheetProduct] = useState<typeof mockProducts[0] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddProduct = (productData: SelectedProduct) => {
    setSelectedProducts([...selectedProducts, productData]);
    setBottomSheetProduct(null);
    setActiveTab('selected');
  };

  const handleDeleteProduct = (id: string) => {
    setSelectedProducts(selectedProducts.filter(p => p.id !== id));
  };

  const handleEditProduct = (id: string) => {
    // Find the product and open bottom sheet for editing
    const product = selectedProducts.find(p => p.id === id);
    if (product) {
      // For now, just show the bottom sheet with the original product
      const originalProduct = mockProducts.find(p => p.name === product.name);
      if (originalProduct) {
        setBottomSheetProduct(originalProduct);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[16px] max-h-[90vh] flex flex-col max-w-[450px] mx-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e8edf1] z-10 rounded-t-[16px]">
          <div className="flex items-center justify-between px-[16px] py-[16px]">
            <button onClick={onClose} className="size-[24px] flex items-center justify-center">
              <X className="size-[20px] text-[#252a31]" />
            </button>
            <h2 className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#252a31] text-[17px] leading-[1.4] tracking-[-0.4px]">
              Add products
            </h2>
            <div className="flex items-center gap-[16px]">
              <button className="size-[24px] flex items-center justify-center">
                <Menu className="size-[20px] text-[#252a31]" />
              </button>
              <button className="size-[24px] flex items-center justify-center">
                <Plus className="size-[20px] text-[#252a31]" />
              </button>
              <button className="size-[24px] flex items-center justify-center">
                <ScanBarcode className="size-[20px] text-[#252a31]" />
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="px-[16px] pb-[12px]">
            <div className="relative">
              <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 size-[18px] text-[#697d95]" />
              <input
                type="text"
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f5f5f5] rounded-[8px] pl-[40px] pr-[12px] py-[10px] font-['Inter:Regular',sans-serif] text-[15px] text-[#252a31] placeholder:text-[#9ca3af] focus:outline-none focus:ring-2 focus:ring-[#0172cb]/20"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="flex items-center justify-center px-[16px] gap-[24px] border-b border-[#e8edf1]">
            <button
              onClick={() => setActiveTab('products')}
              className={`pb-[12px] relative ${
                activeTab === 'products' 
                  ? 'font-["Inter:Semi_Bold",sans-serif] font-semibold text-[#252a31]' 
                  : 'font-["Inter:Regular",sans-serif] font-normal text-[#697d95]'
              } text-[15px] leading-[1.4] tracking-[-0.2px]`}
            >
              Products
              {activeTab === 'products' && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#e44a19] rounded-t-[2px]" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('selected')}
              className={`pb-[12px] relative ${
                activeTab === 'selected' 
                  ? 'font-["Inter:Semi_Bold",sans-serif] font-semibold text-[#252a31]' 
                  : 'font-["Inter:Regular",sans-serif] font-normal text-[#697d95]'
              } text-[15px] leading-[1.4] tracking-[-0.2px]`}
            >
              Selected {selectedProducts.length > 0 && `(${selectedProducts.length})`}
              {activeTab === 'selected' && (
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#e44a19] rounded-t-[2px]" />
              )}
            </button>
          </div>

          {/* Filter Buttons - Only show on Products tab */}
          {activeTab === 'products' && (
            <div className="flex items-center gap-[12px] px-[16px] py-[12px]">
              <div className="flex-1 flex items-center justify-center gap-[8px]">
                <svg className="size-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[14px] leading-[1.4]">
                  All Categories
                </span>
              </div>
              
              {/* Vertical separator */}
              <div className="w-[1px] h-[20px] bg-[#e8edf1]"></div>
              
              <div className="flex-1 flex items-center justify-center gap-[8px]">
                <Filter className="size-[16px] text-[#252a31]" />
                <span className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[14px] leading-[1.4]">
                  Any type
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Content - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {/* Products List */}
          {activeTab === 'products' && (
            <div className="p-[16px] space-y-[12px]">
              {mockProducts.map(product => (
                <div key={product.id} className="bg-white border border-[#e8edf1] rounded-[8px] p-[12px]">
                  {/* Product Header */}
                  <div className="flex items-start gap-[12px] mb-[8px]">
                    <div className="relative rounded-[6px] shrink-0 size-[48px] bg-[#f0f0f0] overflow-hidden">
                      <img 
                        alt={product.name} 
                        className="w-full h-full object-cover" 
                        src={product.image} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-[8px]">
                        <div>
                          <p className="font-['Inter:Medium',sans-serif] font-medium text-[#252a31] text-[15px] leading-[1.4] tracking-[-0.2px]">
                            {product.name}
                          </p>
                          <p className="font-['Inter:Regular',sans-serif] font-normal text-[#697d95] text-[13px] leading-[1.4] tracking-[-0.1px] mt-[2px]">
                            {product.sku}
                          </p>
                        </div>
                        {!product.isAvailable && (
                          <span className="bg-[#fee2e2] text-[#dc2626] font-['Inter:Medium',sans-serif] font-medium text-[12px] px-[8px] py-[4px] rounded-[4px] whitespace-nowrap">
                            Unavailable
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Description (Optional) */}
                  {product.description && (
                    <div className="flex items-start gap-[6px] mb-[12px] ml-[60px]">
                      <div className="bg-[#e3f2fd] rounded-full p-[4px] shrink-0 mt-[2px]">
                        <svg className="size-[14px]" fill="none" viewBox="0 0 24 24" stroke="#0172cb" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <p className="font-['Inter:Regular',sans-serif] font-normal text-[#697d95] text-[13px] leading-[1.4] tracking-[-0.1px]">
                        {product.description}
                      </p>
                    </div>
                  )}

                  {/* Price and Add Button */}
                  <div className="flex items-center justify-between ml-[60px]">
                    <p className="font-['Inter:Semi_Bold',sans-serif] font-semibold text-[#0172cb] text-[17px] leading-[1.4] tracking-[-0.4px]">
                      ${product.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => setBottomSheetProduct(product)}
                      className="flex items-center gap-[6px] bg-[#f5f5f5] hover:bg-[#e8edf1] text-[#252a31] font-['Inter:Medium',sans-serif] font-medium text-[14px] px-[12px] py-[6px] rounded-[6px] transition-colors"
                    >
                      Add
                      <Plus className="size-[16px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Selected Products List */}
          {activeTab === 'selected' && (
            <>
              <div className="bg-[#fcfcfc] flex flex-col gap-[16px] p-[16px] flex-1">
                {selectedProducts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-[48px] w-full">
                    <p className="font-['Inter:Medium',sans-serif] font-medium text-[#697d95] text-[14px] leading-[1.4] tracking-[0.2px]">
                      No products selected
                    </p>
                    <p className="font-['Inter:Regular',sans-serif] font-normal text-[#697d95] text-[12px] leading-[1.4] tracking-[0.2px] mt-[8px]">
                      Add products from the Products tab
                    </p>
                  </div>
                ) : (
                  selectedProducts.map(product => (
                    <SelectedProductCard 
                      key={product.id} 
                      product={product} 
                      onDelete={handleDeleteProduct} 
                      onEdit={handleEditProduct} 
                    />
                  ))
                )}
              </div>

              {/* Update Button Footer - Only show when there are selected products */}
              {selectedProducts.length > 0 && (
                <div className="sticky bottom-0 bg-white border-t border-[#e8edf1]">
                  <div className="p-[16px]">
                    <button className="w-full bg-[#e44a19] hover:bg-[#c63d15] text-white font-['Inter:Medium',sans-serif] font-medium text-[15px] px-[16px] py-[12px] rounded-[6px] transition-colors">
                      Update
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Product Bottom Sheet for adding/editing */}
      {bottomSheetProduct && (
        <ProductBottomSheet
          isOpen={!!bottomSheetProduct}
          onClose={() => setBottomSheetProduct(null)}
          product={bottomSheetProduct}
          onAdd={handleAddProduct}
          onDelete={handleDeleteProduct}
          onEdit={handleEditProduct}
        />
      )}

      <style>{`
        /* Custom scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 2px;
        }
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
}