import svgPaths from "./svg-dzi9eainbt";
import imgRectangle3 from "figma:asset/7cedfbfb6d723ed95a9c12a4e11288387f2bd9a5.png";
import imgRectangle4 from "figma:asset/f028081d2b675e798389127a0f7004d4dd342f5b.png";

function Close() {
  return (
    <div className="absolute left-0 size-[24px] top-px" data-name="Close">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Close">
          <path d={svgPaths.p30a4ad00} fill="var(--fill-0, #252A31)" id="Glyph" />
        </g>
      </svg>
    </div>
  );
}

function BackArrow() {
  return (
    <div className="h-[24px] relative shrink-0 w-[64px]" data-name="Back arrow">
      <Close />
    </div>
  );
}

function Frame7() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] text-center tracking-[0.2px]">Add Products</p>
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group">
          <g id="Path" />
          <path d="M10 4.16667V15.8333" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M4.16667 10H15.8333" id="Path_3" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Barcode() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="barcode">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p1dd6d700} id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p1705f1c0} id="Path_3" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.pc99b300} id="Path_4" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p13deb80} id="Path_5" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <rect height="1.66667" id="Rectangle" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="0.833333" x="4.16667" y="9.16667" />
          <path d="M8.33333 9.16667V10.8333" id="Path_6" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <rect height="1.66667" id="Rectangle_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="0.833333" x="11.6667" y="9.16667" />
          <path d="M15.8333 9.16667V10.8333" id="Path_7" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-end relative shrink-0 w-[64px]" data-name="Actions">
      <Plus />
      <Barcode />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center pb-[9px] pt-[10px] px-[16px] relative w-full">
          <BackArrow />
          <Frame7 />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="content-stretch flex flex-col items-center justify-end px-[16px] py-[12px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f5e71] text-[14px] text-center">Products</p>
    </div>
  );
}

function Tab1() {
  return (
    <div className="content-stretch flex flex-col gap-[10px] items-center justify-end overflow-clip px-[16px] py-[12px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#252a31] text-[14px] text-center">Selected (2)</p>
      <div className="-translate-x-1/2 absolute bottom-[-2px] h-0 left-1/2 w-[56px]">
        <div className="absolute inset-[-4px_0_0_0]">
          <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 56 4">
            <line id="Line 1" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeWidth="4" x1="2" x2="54" y1="2" y2="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

function Tabs() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Tabs">
      <Tab />
      <Tab1 />
    </div>
  );
}

function TitleBar() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title Bar">
      <Wrapper />
      <Tabs />
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator" />
    </div>
  );
}

function ModalHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Modal header">
      <TitleBar />
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">CAT-6 Cable</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4f5e71] text-[12px] w-full">6ENCAT</p>
    </div>
  );
}

function Pencil() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p15f4d200} id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M13.5 6.5L17.5 10.5" id="Path_3" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Trash() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M4 7H20" id="Path_2" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M10 11V17" id="Path_3" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M14 11V17" id="Path_4" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p32830000} id="Path_5" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p204bb80} id="Path_6" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[12px] items-start px-[16px] py-[12px] relative w-full">
        <div className="relative rounded-[6px] shrink-0 size-[48px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6px]">
            <div className="absolute bg-[#d9d9d9] inset-0 rounded-[6px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={imgRectangle3} />
          </div>
        </div>
        <Frame5 />
        <Pencil />
        <Trash />
      </div>
    </div>
  );
}

function InfoCircle() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="info-circle">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <circle cx="8" cy="8" id="Oval" r="6" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M8 5.33333H8.00667" id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M7.33333 8H8V10.6667H8.66667" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[24px] shrink-0" data-name="_Badge">
      <InfoCircle />
    </div>
  );
}

function Content1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pt-[4px] relative" data-name="Content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] tracking-[0.2px] w-full whitespace-pre-wrap">Description about CAT-6 cable</p>
    </div>
  );
}

function BadgeList() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip pb-[4px] relative shrink-0 w-full" data-name="BadgeList">
      <Badge />
      <Content1 />
    </div>
  );
}

function Sitemap() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="sitemap">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <rect height="4" id="Rectangle" rx="2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" width="4" x="2" y="10" />
          <rect height="4" id="Rectangle_2" rx="2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" width="4" x="10" y="10" />
          <rect height="4" id="Rectangle_3" rx="2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" width="4" x="6" y="2" />
          <path d={svgPaths.p3be40700} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2" />
          <path d="M8 6V8" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Badge1() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[24px] shrink-0 size-[22px]" data-name="_Badge">
      <Sitemap />
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex gap-[10px] items-center relative shrink-0 w-[247px]">
      <Badge1 />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] tracking-[0.2px] w-[217px] whitespace-pre-wrap">Charcoal - Option</p>
    </div>
  );
}

function BadgeList1() {
  return (
    <div className="content-stretch flex h-[24px] items-start overflow-clip pb-[2px] relative shrink-0 w-[251px]" data-name="BadgeList">
      <Frame8 />
    </div>
  );
}

function PartsAndServicesCardDynamicContent() {
  return (
    <div className="relative shrink-0 w-full" data-name="Parts and Services Card Dynamic Content">
      <div className="content-stretch flex flex-col items-start pb-[4px] px-[16px] relative w-full">
        <BadgeList />
        <BadgeList1 />
      </div>
    </div>
  );
}

function Frame2() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between leading-[0] not-italic pb-[8px] px-[16px] relative tracking-[0.2px] w-full whitespace-nowrap">
          <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#252a31] text-[12px]">
            <p className="leading-[1.4]">100 meters X USD 1.5</p>
          </div>
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#0172cb] text-[14px] uppercase">
            <p className="leading-[1.4]">USD 150</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartsAndServicesCard() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-full" data-name="Parts and Services Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Frame />
      <PartsAndServicesCardDynamicContent />
      <Frame2 />
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">Cable Protector</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4f5e71] text-[12px] w-full">CABPROT</p>
    </div>
  );
}

function Pencil1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p15f4d200} id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M13.5 6.5L17.5 10.5" id="Path_3" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Trash1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="trash">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M4 7H20" id="Path_2" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M10 11V17" id="Path_3" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M14 11V17" id="Path_4" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p32830000} id="Path_5" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d={svgPaths.p204bb80} id="Path_6" stroke="var(--stroke-0, #D21C1C)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame1() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[12px] items-start px-[16px] py-[12px] relative w-full">
        <div className="relative rounded-[6px] shrink-0 size-[48px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6px]">
            <div className="absolute bg-[#d9d9d9] inset-0 rounded-[6px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={imgRectangle4} />
          </div>
        </div>
        <Frame6 />
        <Pencil1 />
        <Trash1 />
      </div>
    </div>
  );
}

function MapPin() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="map-pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <circle cx="8" cy="7.33333" id="Oval" r="2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path clipRule="evenodd" d={svgPaths.p1a664140} fillRule="evenodd" id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Badge2() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[24px] shrink-0" data-name="_Badge">
      <MapPin />
    </div>
  );
}

function Content2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col items-start min-h-px min-w-px pt-[4px] relative" data-name="Content">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] tracking-[0.2px] w-full whitespace-pre-wrap">Genese Street Warehouse</p>
    </div>
  );
}

function BadgeList2() {
  return (
    <div className="content-stretch flex gap-[8px] items-start overflow-clip pb-[4px] relative shrink-0 w-full" data-name="BadgeList">
      <Badge2 />
      <Content2 />
    </div>
  );
}

function PartsAndServicesCardDynamicContent1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Parts and Services Card Dynamic Content">
      <div className="content-stretch flex flex-col items-start pb-[4px] px-[16px] relative w-full">
        <BadgeList2 />
      </div>
    </div>
  );
}

function Frame3() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[4px] items-center leading-[0] not-italic pb-[8px] px-[16px] relative tracking-[0.2px] w-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center min-h-px min-w-px relative text-[#252a31] text-[12px]">
            <p className="leading-[1.4] whitespace-pre-wrap">100 meters X USD 0.3</p>
          </div>
          <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#0172cb] text-[14px] uppercase whitespace-nowrap">
            <p className="leading-[1.4]">USD 30</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PartsAndServicesCard1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative rounded-[6px] shrink-0 w-full" data-name="Parts and Services Card">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <Frame1 />
      <PartsAndServicesCardDynamicContent1 />
      <Frame3 />
    </div>
  );
}

function Content() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <PartsAndServicesCard />
          <PartsAndServicesCard1 />
        </div>
      </div>
    </div>
  );
}

function ButtonPrimary() {
  return (
    <div className="bg-[#e44a19] flex-[1_0_0] h-[44px] min-h-px min-w-px relative rounded-[6px]" data-name="Button Primary">
      <div className="flex flex-row items-center justify-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center justify-center px-[16px] py-[14px] relative size-full">
          <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-h-px min-w-px not-italic relative text-[14px] text-center text-white tracking-[0.2px]">
            <p className="leading-[1.4] whitespace-pre-wrap">Update</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Footer">
      <div className="content-stretch flex items-start p-[16px] relative w-full">
        <ButtonPrimary />
      </div>
    </div>
  );
}

export default function Frame4() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center overflow-clip relative rounded-tl-[12px] rounded-tr-[12px] size-full">
      <ModalHeader />
      <Content />
      <Footer />
    </div>
  );
}