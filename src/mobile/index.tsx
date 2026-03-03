import { useState } from "react";
import AddProducts from "./AddProducts";

export default function MobileApp() {
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(true);

  return (
    <div className="mobile-app min-h-screen bg-[#f9fafb] max-w-[450px] mx-auto">
      {/* Demo trigger button */}
      <div className="p-[16px]">
        <button
          onClick={() => setIsBottomSheetOpen(true)}
          className="w-full bg-[#e44a19] text-white font-['Inter:Medium',sans-serif] font-medium text-[15px] px-[16px] py-[12px] rounded-[6px]"
        >
          Open Add Products
        </button>
      </div>

      {/* Bottom Sheet */}
      <AddProducts 
        isOpen={isBottomSheetOpen} 
        onClose={() => setIsBottomSheetOpen(false)} 
      />
    </div>
  );
}