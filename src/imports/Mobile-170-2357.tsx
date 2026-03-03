import svgPaths from "./svg-o7c6doe7ol";
import imgRectangle10 from "figma:asset/f77a71f2505117f7bfac1a4cecff59ab264296ed.png";
import imgRectangle3 from "figma:asset/f9e505253d777cef3e7bc806d869354d7cdb8e5b.png";
import imgRectangle4 from "figma:asset/a78b1b857d2a7b9feeb0979875c4dc92260b2767.png";
import imgRectangle1 from "figma:asset/24261bd8fc2372b01518ab183a8c090a63a33eb8.png";
import imgRectangle2 from "figma:asset/61c331e369cab7a070ebe09deb07eb5144758455.png";
import imgRectangle5 from "figma:asset/7cedfbfb6d723ed95a9c12a4e11288387f2bd9a5.png";

function Battery() {
  return (
    <div className="-translate-y-1/2 absolute contents right-[14.34px] top-[calc(50%+1px)]" data-name="Battery">
      <div className="-translate-y-1/2 absolute border border-[#252a31] border-solid h-[11.333px] opacity-35 right-[16.67px] rounded-[2.667px] top-[calc(50%+1px)] w-[22px]" data-name="Border" />
      <div className="-translate-y-1/2 absolute h-[4px] right-[14.34px] top-[calc(50%+1px)] w-[1.328px]" data-name="Cap">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 1.32804 4">
          <path d={svgPaths.p32d253c0} fill="var(--fill-0, #252A31)" id="Cap" opacity="0.4" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute bg-[#252a31] h-[7.333px] right-[18.67px] rounded-[1.333px] top-[calc(50%+1px)] w-[18px]" data-name="Capacity" />
    </div>
  );
}

function StatusBar() {
  return (
    <div className="h-[44px] relative shrink-0 w-full" data-name="Status Bar">
      <p className="-translate-x-1/2 absolute font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[normal] left-[48px] not-italic text-[#252a31] text-[15px] text-center top-[calc(50%-8px)] tracking-[-0.3px] w-[54px] whitespace-pre-wrap">9:41</p>
      <Battery />
      <div className="-translate-y-1/2 absolute h-[11px] right-[43.67px] top-[calc(50%+0.83px)] w-[15.333px]" data-name="Wifi">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15.333 10.9999">
          <path d={svgPaths.p39712400} fill="var(--fill-0, #252A31)" id="Wifi" />
        </svg>
      </div>
      <div className="-translate-y-1/2 absolute h-[10.667px] right-[64px] top-[calc(50%+1px)] w-[17px]" data-name="Cellular Connection">
        <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 17 10.667">
          <path d={svgPaths.p26d17600} fill="var(--fill-0, #252A31)" id="Cellular Connection" />
        </svg>
      </div>
    </div>
  );
}

function ChevronLeft() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="chevron-left">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M15 6L9 12L15 18" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame() {
  return (
    <div className="absolute content-stretch flex items-center left-0 top-0">
      <ChevronLeft />
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[16px] text-center tracking-[0.2px]">Back</p>
    </div>
  );
}

function BackArrow() {
  return (
    <div className="h-[24px] relative shrink-0 w-[64px]" data-name="Back arrow">
      <Frame />
    </div>
  );
}

function Message() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="message">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p30eb1d00} id="Path_2" stroke="var(--stroke-0, #005AA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.33333 6H10.6667" id="Path_3" stroke="var(--stroke-0, #005AA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M5.33333 8.66667H9.33333" id="Path_4" stroke="var(--stroke-0, #005AA3)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function BadgeInfo() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex gap-[4px] h-[24px] items-end px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge Info">
      <div aria-hidden="true" className="absolute border-[#d0e9fb] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Message />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#005aa3] text-[12px] tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[1.4]">3</p>
      </div>
    </div>
  );
}

function DotsVertical() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="dots-vertical">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <circle cx="12" cy="12" id="Oval" r="1" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <circle cx="12" cy="19" id="Oval_2" r="1" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <circle cx="12" cy="5" id="Oval_3" r="1" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Actions() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Actions">
      <DotsVertical />
    </div>
  );
}

function Wrapper() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pb-[9px] pt-[10px] px-[12px] relative w-full">
          <BackArrow />
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.2] min-h-px min-w-px not-italic relative text-[#252a31] text-[18px] text-center whitespace-pre-wrap">&nbsp;</p>
          <BadgeInfo />
          <Actions />
        </div>
      </div>
    </div>
  );
}

function TitleBar() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title Bar">
      <Wrapper />
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator" />
    </div>
  );
}

function NavigationBarIOs() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative shrink-0" data-name="NavigationBar iOS">
      <StatusBar />
      <TitleBar />
    </div>
  );
}

function Repeat() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="repeat">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p2ba8cf80} fill="var(--stroke-0, #0172CB)" id="Shape" />
          <path d={svgPaths.p2c954900} fill="var(--stroke-0, #0172CB)" id="Shape_2" />
        </g>
      </svg>
    </div>
  );
}

function BadgeInfo1() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex h-[24px] items-end px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge Info">
      <div aria-hidden="true" className="absolute border-[#d0e9fb] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#005aa3] text-[12px] text-center tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[1.4]">New</p>
      </div>
    </div>
  );
}

function JobStatus() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Job Status">
      <BadgeInfo1 />
    </div>
  );
}

function Frame4() {
  return (
    <div className="content-stretch flex gap-[8px] items-center pb-[4px] relative shrink-0 w-full">
      <Repeat />
      <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-h-px min-w-px not-italic relative text-[#4f5e71] text-[14px] tracking-[0.2px] uppercase whitespace-pre-wrap">#2022 - 1429</p>
      <JobStatus />
    </div>
  );
}

function JobCardCompact() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(28,59,84,0.05),0px_2px_4px_-1px_rgba(28,59,84,0.06)] shrink-0 w-[326px]" data-name="Job Card Compact">
      <Frame4 />
    </div>
  );
}

function JobSchedule() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 w-full" data-name="Job Schedule">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4f5e71] text-[14px] text-center tracking-[0.2px]">
        <p className="leading-[1.4] whitespace-pre-wrap">Today, 10:30 - 11:00 AM</p>
      </div>
    </div>
  );
}

function Frame8() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-center justify-center relative shrink-0 w-[326px]">
      <div className="flex flex-col font-['Inter:Semi_Bold',sans-serif] font-semibold justify-center leading-[0] not-italic relative shrink-0 text-[#252a31] text-[18px] text-center w-full">
        <p className="leading-[1.2] whitespace-pre-wrap">46th Avenue St - Interior Design</p>
      </div>
      <JobSchedule />
    </div>
  );
}

function Frame44() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0">
      <JobCardCompact />
      <Frame8 />
    </div>
  );
}

function Location() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p5813500} id="Path_2" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Action() {
  return (
    <div className="bg-[#fbe9e7] content-stretch flex items-center justify-center p-[10px] relative rounded-[48px] shrink-0 size-[38px]" data-name="Action">
      <Location />
    </div>
  );
}

function Frame1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-h-px min-w-px relative">
      <Action />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[1.4]">Navigate</p>
      </div>
    </div>
  );
}

function FilePlus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="file-plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.pbcc4980} id="Path_2" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path clipRule="evenodd" d={svgPaths.p183224c0} fillRule="evenodd" id="Path_3" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 11V17" id="Path_4" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M9 14H15" id="Path_5" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Action1() {
  return (
    <div className="bg-[#fbe9e7] content-stretch flex items-center justify-center p-[10px] relative rounded-[48px] shrink-0 size-[38px]" data-name="Action">
      <FilePlus />
    </div>
  );
}

function Frame2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-h-px min-w-px relative">
      <Action1 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[1.4]">Add Note</p>
      </div>
    </div>
  );
}

function Plus() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M12 5V19" id="Path_2" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M5 12H19" id="Path_3" stroke="var(--stroke-0, #E44A19)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Action2() {
  return (
    <div className="bg-[#fbe9e7] content-stretch flex items-center justify-center p-[10px] relative rounded-[48px] shrink-0 size-[38px]" data-name="Action">
      <Plus />
    </div>
  );
}

function Frame3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[5px] items-center min-h-px min-w-px relative">
      <Action2 />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[12px] text-black tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[1.4]">New</p>
      </div>
    </div>
  );
}

function Frame43() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <Frame1 />
      <Frame2 />
      <Frame3 />
    </div>
  );
}

function Frame42() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full">
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
      <div className="flex flex-col items-center justify-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center justify-center p-[16px] relative w-full">
          <Frame44 />
          <Frame43 />
        </div>
      </div>
    </div>
  );
}

function Tab() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col gap-[10px] items-center justify-end overflow-clip px-[16px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#252a31] text-[14px] text-center">Details</p>
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

function Tab1() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center justify-end px-[10px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f5e71] text-[14px] text-center">Associated</p>
    </div>
  );
}

function Tab2() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center justify-end px-[10px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f5e71] text-[14px] text-center">Status</p>
    </div>
  );
}

function Tab3() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center justify-end px-[10px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f5e71] text-[14px] text-center">Notes (3)</p>
    </div>
  );
}

function Tab4() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center justify-end px-[10px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f5e71] text-[14px] text-center">Messages (4)</p>
    </div>
  );
}

function Tab5() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col items-center justify-end px-[10px] py-[8px] relative shrink-0" data-name="Tab">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[20px] not-italic relative shrink-0 text-[#4f5e71] text-[14px] text-center">Activity</p>
    </div>
  );
}

function Tabs() {
  return (
    <div className="relative shrink-0 w-full" data-name="Tabs">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center px-[16px] relative w-full">
          <Tab />
          <Tab1 />
          <Tab2 />
          <Tab3 />
          <Tab4 />
          <Tab5 />
        </div>
      </div>
    </div>
  );
}

function Pencil() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p1dcbc100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.33333L11.6667 7" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Action3() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex items-center justify-center p-[10px] relative rounded-[48px] shrink-0 size-[24px]" data-name="Action">
      <Pencil />
    </div>
  );
}

function Frame30() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Service Address</p>
          <Action3 />
        </div>
      </div>
    </div>
  );
}

function Separator() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function MapPin() {
  return (
    <div className="-translate-x-1/2 -translate-y-1/2 absolute left-1/2 size-[40px] top-[calc(50%+0.5px)]" data-name="map-pin">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 40 40">
        <g id="Group">
          <g id="Path" />
          <path clipRule="evenodd" d={svgPaths.p20193200} fill="var(--fill-0, #D21C1C)" fillRule="evenodd" id="Path_2" />
          <circle cx="20" cy="18.3333" fill="var(--fill-0, white)" id="Oval" r="5" />
        </g>
      </svg>
    </div>
  );
}

function Frame18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full">
      <div className="h-[135px] pointer-events-none relative rounded-[6px] shrink-0 w-full">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[6px] size-full" src={imgRectangle10} />
        <div aria-hidden="true" className="absolute border border-[#e8edf1] border-solid inset-0 rounded-[6px]" />
      </div>
      <MapPin />
    </div>
  );
}

function Frame14() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[16px] w-full">Richard Mathew</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] w-full">
        <p className="mb-0">2600 2nd Ave #803</p>
        <p>Seattle, Washington(WA), 98121</p>
      </div>
    </div>
  );
}

function Location1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p5813500} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PhoneCall() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="phone-call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.pdd5fc00} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame5() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Frame14 />
      <Location1 />
      <PhoneCall />
    </div>
  );
}

function AddressCard() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Address Card">
      <div className="content-stretch flex flex-col gap-[12px] items-start p-[12px] relative w-full">
        <Frame18 />
        <Frame5 />
      </div>
    </div>
  );
}

function ServiceAddress() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Service address">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame30 />
        <Separator />
        <AddressCard />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function KeyValue() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic p-[12px] relative text-center tracking-[0.2px] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#4f5e71] text-[12px]">Category</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#252a31] text-[14px]">Home Renovation</p>
      </div>
    </div>
  );
}

function KeyValue1() {
  return (
    <div className="flex-[1_0_0] min-h-px min-w-px relative" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic p-[12px] relative text-center tracking-[0.2px] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#4f5e71] text-[12px]">Priority</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#252a31] text-[14px]">Low Priority</p>
      </div>
    </div>
  );
}

function Frame39() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-full">
      <KeyValue />
      <div className="flex h-0 items-center justify-center relative self-center shrink-0 w-0" style={{ "--transform-inner-width": "1200", "--transform-inner-height": "19" } as React.CSSProperties}>
        <div className="flex-none h-full rotate-90">
          <div className="h-full relative w-[65px]">
            <div className="absolute inset-[-1.5px_0_0_0]">
              <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 65 1.5">
                <line id="Line 2" stroke="var(--stroke-0, #EFF2F5)" strokeWidth="1.5" x2="65" y1="0.75" y2="0.75" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <KeyValue1 />
      <div className="-translate-y-1/2 absolute bg-[#28a138] h-[10px] left-[92.91%] right-[4.26%] rounded-[12px] top-1/2" data-name="Glyph" />
    </div>
  );
}

function Separator1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Pencil1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p1dcbc100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.33333L11.6667 7" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Action4() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#e8f4fd] content-stretch flex items-center justify-center p-[10px] right-[14px] rounded-[48px] size-[24px] top-1/2" data-name="Action">
      <Pencil1 />
    </div>
  );
}

function KeyValue2() {
  return (
    <div className="relative shrink-0 w-full" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] text-center tracking-[0.2px]">Schedule</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px] w-[min-content] whitespace-pre-wrap">24/12/2022, 12:30 PM - 3:30 PM</p>
        <Action4 />
      </div>
    </div>
  );
}

function Separator2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Pencil2() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p1dcbc100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.33333L11.6667 7" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Action5() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#e8f4fd] content-stretch flex items-center justify-center p-[10px] right-[14px] rounded-[48px] size-[24px] top-1/2" data-name="Action">
      <Pencil2 />
    </div>
  );
}

function KeyValue3() {
  return (
    <div className="relative shrink-0 w-full" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[4px] items-start p-[12px] relative w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] text-center tracking-[0.2px]">Due Date</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-w-full not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px] w-[min-content] whitespace-pre-wrap">Due by 25/12/2022</p>
        <Action5 />
      </div>
    </div>
  );
}

function CategoryCard() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="category card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame39 />
        <Separator1 />
        <KeyValue2 />
        <Separator2 />
        <KeyValue3 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Pencil3() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p1dcbc100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.33333L11.6667 7" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Action6() {
  return (
    <div className="-translate-y-1/2 absolute bg-[#e8f4fd] content-stretch flex items-center justify-center p-[10px] right-[14px] rounded-[48px] size-[24px] top-[calc(50%+2.5px)]" data-name="Action">
      <Pencil3 />
    </div>
  );
}

function Frame31() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Job Description</p>
          <Action6 />
        </div>
      </div>
    </div>
  );
}

function Separator3() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Frame45() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex items-start p-[12px] relative w-full">
        <p className="flex-[1_0_0] font-['Inter:Regular',sans-serif] font-normal leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">This is some description given by user who created this job</p>
      </div>
    </div>
  );
}

function JobDescription() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="job description">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame31 />
        <Separator3 />
        <Frame45 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Pencil4() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="pencil">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p1dcbc100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
          <path d="M9 4.33333L11.6667 7" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

function Action7() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex items-center justify-center p-[10px] relative rounded-[48px] shrink-0 size-[24px]" data-name="Action">
      <Pencil4 />
    </div>
  );
}

function ChevronDown() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M6 9L12 15L18 9" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame32() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Billing Address</p>
          <Action7 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <ChevronDown />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Frame15() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[16px] w-full">Richard Mathew</p>
      <div className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[12px] w-full">
        <p className="mb-0">2600 2nd Ave #803</p>
        <p>Seattle, Washington(WA), 98121</p>
      </div>
    </div>
  );
}

function Location2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="location">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p5813500} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PhoneCall1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="phone-call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.pdd5fc00} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame6() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full">
      <Frame15 />
      <Location2 />
      <PhoneCall1 />
    </div>
  );
}

function AddressCard1() {
  return (
    <div className="bg-white relative shrink-0 w-full" data-name="Address Card">
      <div className="content-stretch flex flex-col items-start p-[12px] relative w-full">
        <Frame6 />
      </div>
    </div>
  );
}

function BillingAddress() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="billing address">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame32 />
        <Separator4 />
        <AddressCard1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function ChevronDown1() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M6 9L12 15L18 9" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame33() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Customer</p>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <ChevronDown1 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator5() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function TextAvatar() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex items-center justify-center relative rounded-[6px] shrink-0 size-[48px]" data-name="Text Avatar">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Medium',sans-serif] font-medium h-full justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#0172cb] text-[16px] text-center tracking-[0.2px]">
        <p className="leading-[1.4] whitespace-pre-wrap">H</p>
      </div>
    </div>
  );
}

function Frame16() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">Craig Calzoni</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#0172cb] text-[14px] w-full">henryjones@sample.co</p>
    </div>
  );
}

function MessageCircle() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="message-circle-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p10b5e100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 12V12.01" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 12V12.01" id="Path_4" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 12V12.01" id="Path_5" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PhoneCall2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="phone-call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.pdd5fc00} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame17() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative self-stretch shrink-0">
      <MessageCircle />
      <PhoneCall2 />
    </div>
  );
}

function Frame7() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[8px] items-start p-[12px] relative w-full">
        <TextAvatar />
        <Frame16 />
        <Frame17 />
      </div>
    </div>
  );
}

function CustomerCard() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Customer Card">
      <Frame7 />
    </div>
  );
}

function Customer() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Customer">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame33 />
        <Separator5 />
        <CustomerCard />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function ChevronDown2() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M6 9L12 15L18 9" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame34() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Organization</p>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <ChevronDown2 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator6() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Frame19() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">Mercedes - Seattle</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4f5e71] text-[14px] w-full">Genese Street, 46th Avenue, SW, Seattle</p>
    </div>
  );
}

function Frame9() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[12px] items-start p-[12px] relative w-full">
        <div className="relative rounded-[6px] shrink-0 size-[48px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6px]">
            <div className="absolute bg-[#d9d9d9] inset-0 rounded-[6px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={imgRectangle3} />
          </div>
        </div>
        <Frame19 />
      </div>
    </div>
  );
}

function OrganizationCardCompact() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative shrink-0 w-full" data-name="Organization Card Compact">
      <Frame9 />
    </div>
  );
}

function Organization() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Organization">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame34 />
        <Separator6 />
        <OrganizationCardCompact />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function ChevronDown3() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M6 9L12 15L18 9" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame35() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Property</p>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <ChevronDown3 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator7() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Frame20() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">North Tower</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4f5e71] text-[14px] w-full">Genese Street, 46th Avenue, SW, Seattle</p>
    </div>
  );
}

function Frame10() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[8px] items-start p-[12px] relative w-full">
        <div className="relative rounded-[6px] shrink-0 size-[48px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6px]">
            <div className="absolute bg-[#d9d9d9] inset-0 rounded-[6px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={imgRectangle4} />
          </div>
        </div>
        <Frame20 />
      </div>
    </div>
  );
}

function PropertyCardCompact() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Property Card Compact">
      <Frame10 />
    </div>
  );
}

function Property() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="property">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame35 />
        <Separator7 />
        <PropertyCardCompact />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function ChevronDown4() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M6 9L12 15L18 9" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame36() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Parent Job</p>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <ChevronDown4 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator8() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function BadgeInfo2() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex h-[24px] items-end px-[8px] py-[4px] relative rounded-[12px] shrink-0" data-name="Badge Info">
      <div aria-hidden="true" className="absolute border-[#d0e9fb] border-[0.5px] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <div className="flex flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#005aa3] text-[12px] text-center tracking-[0.2px] whitespace-nowrap">
        <p className="leading-[1.4]">Started</p>
      </div>
    </div>
  );
}

function JobStatus1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0" data-name="Job Status">
      <BadgeInfo2 />
    </div>
  );
}

function Frame11() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[8px] items-center pb-[4px] pt-[12px] px-[12px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Medium',sans-serif] font-medium leading-[1.4] min-h-px min-w-px not-italic relative text-[#4f5e71] text-[14px] tracking-[0.2px] uppercase whitespace-pre-wrap">#2022 - 1429</p>
          <JobStatus1 />
        </div>
      </div>
    </div>
  );
}

function JobSchedule1() {
  return (
    <div className="content-stretch flex items-start relative shrink-0 w-[338px]" data-name="Job Schedule">
      <div className="flex flex-[1_0_0] flex-col font-['Inter:Regular',sans-serif] font-normal justify-center leading-[0] min-h-px min-w-px not-italic relative text-[#4f5e71] text-[14px] tracking-[0.2px]">
        <p className="leading-[1.4] whitespace-pre-wrap">25/11/2022, 9AM to 12/12/2022, 5PM</p>
      </div>
    </div>
  );
}

function Frame12() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex flex-col gap-[4px] items-start pb-[12px] px-[12px] relative w-full">
        <div className="flex flex-col font-['Inter:Medium',sans-serif] font-medium justify-center leading-[0] min-w-full not-italic relative shrink-0 text-[#252a31] text-[16px] tracking-[0.2px] w-[min-content]">
          <p className="leading-[1.4] whitespace-pre-wrap">46th Avenue Genese St - Interior Design</p>
        </div>
        <JobSchedule1 />
      </div>
    </div>
  );
}

function JobCardCompact1() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[4px] items-start relative shrink-0 w-full" data-name="Job Card Compact">
      <Frame11 />
      <Frame12 />
    </div>
  );
}

function ParentJob() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="parent job">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame36 />
        <Separator8 />
        <JobCardCompact1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Plus1() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="plus">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Group">
          <g id="Path" />
          <path d="M8 3.33333V12.6667" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M3.33333 8H12.6667" id="Path_3" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ChevronDown5() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M6 9L12 15L18 9" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame37() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Assigned To (2)</p>
          <Plus1 />
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <ChevronDown5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator9() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Avatar() {
  return (
    <div className="overflow-clip relative rounded-[6px] shrink-0 size-[48px]" data-name="Avatar">
      <div className="absolute left-0 pointer-events-none rounded-[6px] size-[48px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[6px] size-full" src={imgRectangle1} />
        <div aria-hidden="true" className="absolute border-2 border-[#e8edf1] border-solid inset-0 rounded-[6px]" />
      </div>
    </div>
  );
}

function Frame21() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">Henry Jones</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#697d95] text-[14px] w-full">Z082 | Interior Designer</p>
    </div>
  );
}

function MessageCircle1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="message-circle-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p10b5e100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 12V12.01" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 12V12.01" id="Path_4" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 12V12.01" id="Path_5" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PhoneCall3() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="phone-call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.pdd5fc00} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame22() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative self-stretch shrink-0">
      <MessageCircle1 />
      <PhoneCall3 />
    </div>
  );
}

function Frame13() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[8px] items-start p-[12px] relative w-full">
        <Avatar />
        <Frame21 />
        <Frame22 />
      </div>
    </div>
  );
}

function EmployeeCard() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Employee Card">
      <Frame13 />
    </div>
  );
}

function Separator10() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Avatar1() {
  return (
    <div className="overflow-clip relative rounded-[6px] shrink-0 size-[48px]" data-name="Avatar">
      <div className="absolute left-0 pointer-events-none rounded-[6px] size-[48px] top-0">
        <img alt="" className="absolute inset-0 max-w-none object-cover rounded-[6px] size-full" src={imgRectangle2} />
        <div aria-hidden="true" className="absolute border-2 border-[#e8edf1] border-solid inset-0 rounded-[6px]" />
      </div>
    </div>
  );
}

function Frame24() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">Jenna Ortega</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#697d95] text-[14px] w-full">Z099 | Interior Designer</p>
    </div>
  );
}

function MessageCircle2() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="message-circle-2">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.p10b5e100} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M12 12V12.01" id="Path_3" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M8 12V12.01" id="Path_4" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
          <path d="M16 12V12.01" id="Path_5" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function PhoneCall4() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="phone-call">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d={svgPaths.pdd5fc00} id="Path_2" stroke="var(--stroke-0, #0172CB)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame25() {
  return (
    <div className="content-stretch flex gap-[12px] items-center justify-center relative self-stretch shrink-0">
      <MessageCircle2 />
      <PhoneCall4 />
    </div>
  );
}

function Frame23() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[8px] items-start p-[12px] relative w-full">
        <Avatar1 />
        <Frame24 />
        <Frame25 />
      </div>
    </div>
  );
}

function EmployeeCard1() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Employee Card">
      <Frame23 />
    </div>
  );
}

function AssignedCard() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="assigned card">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame37 />
        <Separator9 />
        <EmployeeCard />
        <Separator10 />
        <EmployeeCard1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function Tag() {
  return (
    <div className="bg-[#dff1ff] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shrink-0" data-name="Tag">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#005aa3] text-[14px] tracking-[0.2px]">Instagram</p>
    </div>
  );
}

function Tag1() {
  return (
    <div className="bg-[#dff1ff] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shrink-0" data-name="Tag">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#005aa3] text-[14px] tracking-[0.2px]">Prague</p>
    </div>
  );
}

function Tag2() {
  return (
    <div className="bg-[#dff1ff] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shrink-0" data-name="Tag">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#005aa3] text-[14px] tracking-[0.2px]">Lead</p>
    </div>
  );
}

function Frame40() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Tag />
      <Tag1 />
      <Tag2 />
    </div>
  );
}

function KeyValue4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[6px] items-start p-[12px] relative w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] text-center tracking-[0.2px]">Tags</p>
        <Frame40 />
      </div>
    </div>
  );
}

function Separator11() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function Tag3() {
  return (
    <div className="bg-[#dff1ff] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shrink-0" data-name="Tag">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#005aa3] text-[14px] tracking-[0.2px]">Interior Design</p>
    </div>
  );
}

function Tag4() {
  return (
    <div className="bg-[#dff1ff] content-stretch flex gap-[8px] items-center overflow-clip px-[8px] py-[6px] relative rounded-[6px] shrink-0" data-name="Tag">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#005aa3] text-[14px] tracking-[0.2px]">Carpenting</p>
    </div>
  );
}

function Frame41() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full">
      <Tag3 />
      <Tag4 />
    </div>
  );
}

function KeyValue5() {
  return (
    <div className="relative shrink-0 w-full" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[6px] items-start p-[12px] relative w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] text-center tracking-[0.2px]">Skills</p>
        <Frame41 />
      </div>
    </div>
  );
}

function TagsAndSkills() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="Tags and skills">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <KeyValue4 />
        <Separator11 />
        <KeyValue5 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function ChevronDown6() {
  return (
    <div className="relative size-[24px]" data-name="chevron-down">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Group">
          <g id="Path" />
          <path d="M6 9L12 15L18 9" id="Path_2" stroke="var(--stroke-0, #252A31)" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Frame38() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <p className="flex-[1_0_0] font-['Inter:Semi_Bold',sans-serif] font-semibold leading-[1.4] min-h-px min-w-px not-italic relative text-[#252a31] text-[14px] tracking-[0.2px] whitespace-pre-wrap">Other Details</p>
          <div className="flex items-center justify-center relative shrink-0">
            <div className="flex-none rotate-180">
              <ChevronDown6 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Separator12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function KeyValue6() {
  return (
    <div className="relative shrink-0 w-full" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic p-[12px] relative text-center tracking-[0.2px] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#4f5e71] text-[12px]">Inbound Lead</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#252a31] text-[14px]">Yes</p>
      </div>
    </div>
  );
}

function Separator13() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function KeyValue7() {
  return (
    <div className="relative shrink-0 w-full" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic p-[12px] relative text-center tracking-[0.2px] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#4f5e71] text-[12px]">Customer Value</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#252a31] text-[14px]">USD 100000</p>
      </div>
    </div>
  );
}

function Separator14() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Separator">
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator 344" />
    </div>
  );
}

function KeyValue8() {
  return (
    <div className="relative shrink-0 w-full" data-name="Key Value">
      <div className="content-stretch flex flex-col gap-[4px] items-start leading-[1.4] not-italic p-[12px] relative text-center tracking-[0.2px] w-full">
        <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#4f5e71] text-[12px]">Last Called At</p>
        <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#252a31] text-[14px]">23/11/2022 12:36 PM</p>
      </div>
    </div>
  );
}

function CustomFields() {
  return (
    <div className="bg-white relative rounded-[6px] shrink-0 w-full" data-name="custom fields">
      <div className="content-stretch flex flex-col items-start overflow-clip relative rounded-[inherit] w-full">
        <Frame38 />
        <Separator12 />
        <KeyValue6 />
        <Separator13 />
        <KeyValue7 />
        <Separator14 />
        <KeyValue8 />
      </div>
      <div aria-hidden="true" className="absolute border border-[rgba(0,0,0,0.1)] border-solid inset-0 pointer-events-none rounded-[6px]" />
    </div>
  );
}

function JdmPager() {
  return (
    <div className="bg-[#fcfcfc] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="JDM - PAGER">
      <ServiceAddress />
      <CategoryCard />
      <JobDescription />
      <BillingAddress />
      <Customer />
      <Organization />
      <Property />
      <ParentJob />
      <AssignedCard />
      <TagsAndSkills />
      <CustomFields />
      <div className="bg-[#d9d9d9] h-[152px] opacity-0 shrink-0 w-full" />
    </div>
  );
}

function Content() {
  return (
    <div className="bg-[#fcfcfc] flex-[1_0_0] min-h-px min-w-px relative w-full" data-name="Content">
      <div className="flex flex-col items-center size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-center p-[16px] relative size-full">
          <Frame42 />
          <Tabs />
          <JdmPager />
        </div>
      </div>
    </div>
  );
}

function HomeIndicatorIOs() {
  return (
    <div className="bg-white content-stretch flex flex-col items-center pb-[8px] pt-[21px] relative shrink-0 w-full" data-name="HomeIndicator iOS">
      <div className="bg-black h-[5px] rounded-[100px] shrink-0 w-[134px]" data-name="Indicator" />
    </div>
  );
}

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

function BackArrow1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[64px]" data-name="Back arrow">
      <Close />
    </div>
  );
}

function Frame29() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-h-px min-w-px relative">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] text-center tracking-[0.2px]">Add Product</p>
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

function Actions1() {
  return (
    <div className="content-stretch flex items-center justify-end opacity-0 relative shrink-0 w-[64px]" data-name="Actions">
      <Barcode />
    </div>
  );
}

function Wrapper1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Wrapper">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[24px] items-center pb-[9px] pt-[10px] px-[16px] relative w-full">
          <BackArrow1 />
          <Frame29 />
          <Actions1 />
        </div>
      </div>
    </div>
  );
}

function TitleBar1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Title Bar">
      <Wrapper1 />
      <div className="bg-[#e8edf1] h-px shrink-0 w-full" data-name="Separator" />
    </div>
  );
}

function ModalHeader() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start justify-center relative rounded-tl-[16px] rounded-tr-[16px] shrink-0 w-full" data-name="Modal header">
      <TitleBar1 />
    </div>
  );
}

function Frame28() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start justify-center leading-[1.4] min-h-px min-w-px not-italic relative tracking-[0.2px] whitespace-pre-wrap">
      <p className="font-['Inter:Medium',sans-serif] font-medium relative shrink-0 text-[#252a31] text-[16px] w-full">CAT-6 Cable</p>
      <p className="font-['Inter:Regular',sans-serif] font-normal relative shrink-0 text-[#4f5e71] text-[12px] w-full">6ENCAT</p>
    </div>
  );
}

function Frame27() {
  return (
    <div className="relative shrink-0 w-full">
      <div className="content-stretch flex gap-[8px] items-start pl-[12px] pr-[8px] py-[12px] relative w-full">
        <div className="relative rounded-[6px] shrink-0 size-[48px]">
          <div aria-hidden="true" className="absolute inset-0 pointer-events-none rounded-[6px]">
            <div className="absolute bg-[#d9d9d9] inset-0 rounded-[6px]" />
            <img alt="" className="absolute max-w-none object-cover rounded-[6px] size-full" src={imgRectangle5} />
          </div>
        </div>
        <Frame28 />
      </div>
    </div>
  );
}

function PartsAndServicesCard() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[6px] shadow-[0px_0px_0px_1px_rgba(28,59,84,0.05),0px_2px_4px_-1px_rgba(28,59,84,0.06)] shrink-0 w-[360px]" data-name="Parts and Services Card">
      <Frame27 />
    </div>
  );
}

function Wrapper2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] gap-[8px] items-center min-h-px min-w-px overflow-clip relative" data-name="Wrapper">
      <div className="bg-[#36454f] relative rounded-[3.6px] shrink-0 size-[18px]" data-name="Background+Border+Shadow">
        <div aria-hidden="true" className="absolute border-[0.9px] border-solid border-white inset-0 pointer-events-none rounded-[3.6px] shadow-[0px_0.45px_0.9px_0px_rgba(0,0,0,0.05)]" />
      </div>
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">Charcoal</p>
    </div>
  );
}

function Suffix() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Suffix">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Suffix">
          <path d={svgPaths.p328a4100} fill="var(--fill-0, #697D95)" id="Glyph" />
        </g>
      </svg>
    </div>
  );
}

function Select() {
  return (
    <div className="bg-[#eff2f5] relative rounded-[6px] shrink-0 w-full" data-name="Select">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Wrapper2 />
          <Suffix />
        </div>
      </div>
    </div>
  );
}

function SelectWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full" data-name="Select with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">Product Option</p>
      <Select />
    </div>
  );
}

function Wrapper3() {
  return (
    <div className="content-stretch flex flex-[1_0_0] items-center min-h-px min-w-px overflow-clip relative" data-name="Wrapper">
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">Warehouse #12</p>
    </div>
  );
}

function Suffix1() {
  return (
    <div className="relative shrink-0 size-[24px]" data-name="Suffix">
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 24">
        <g id="Suffix">
          <path d={svgPaths.p328a4100} fill="var(--fill-0, #697D95)" id="Glyph" />
        </g>
      </svg>
    </div>
  );
}

function Select1() {
  return (
    <div className="bg-[#eff2f5] relative rounded-[6px] shrink-0 w-full" data-name="Select">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex gap-[12px] items-center px-[12px] py-[10px] relative w-full">
          <Wrapper3 />
          <Suffix1 />
        </div>
      </div>
    </div>
  );
}

function SelectWithLabel1() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start overflow-clip relative shrink-0 w-full" data-name="Select with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">Product Location</p>
      <Select1 />
    </div>
  );
}

function InputField() {
  return (
    <div className="bg-[#eff2f5] flex-[1_0_0] min-h-px min-w-px relative rounded-[6px] w-full" data-name="InputField">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-start p-[12px] relative size-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">Some description about the product</p>
        </div>
      </div>
    </div>
  );
}

function InputFieldWithLabel() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] h-[105px] items-start overflow-clip relative shrink-0 w-full" data-name="InputField with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">Product Description</p>
      <InputField />
    </div>
  );
}

function InputField1() {
  return (
    <div className="bg-[#eff2f5] relative rounded-[6px] shrink-0 w-full" data-name="InputField">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[0] not-italic relative shrink-0 text-[#252a31] text-[0px] text-[14px] tracking-[0.2px]">
            <span className="leading-[1.4] text-[#697d95]">USD</span>
            <span className="leading-[1.4]">{` 1523.00`}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

function InputFieldWithLabel1() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px overflow-clip relative" data-name="InputField with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">
        <span className="leading-[1.4]">{`Unit Price `}</span>
        <span className="leading-[1.4] text-[#d21c1c]">*</span>
      </p>
      <InputField1 />
    </div>
  );
}

function InputField2() {
  return (
    <div className="bg-[#eff2f5] relative rounded-[6px] shrink-0 w-full" data-name="InputField">
      <div className="flex flex-row items-center overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex items-center p-[12px] relative w-full">
          <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">2.00</p>
        </div>
      </div>
    </div>
  );
}

function InputFieldWithLabel2() {
  return (
    <div className="content-stretch flex flex-[1_0_0] flex-col gap-[4px] items-start min-h-px min-w-px overflow-clip relative" data-name="InputField with label">
      <p className="font-['Inter:Medium',sans-serif] font-medium leading-[0] not-italic relative shrink-0 text-[#252a31] text-[14px] tracking-[0.2px]">
        <span className="leading-[1.4]">{`Quantity `}</span>
        <span className="leading-[1.4] text-[#d21c1c]">*</span>
      </p>
      <InputField2 />
    </div>
  );
}

function Frame46() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full">
      <InputFieldWithLabel1 />
      <InputFieldWithLabel2 />
    </div>
  );
}

function Content1() {
  return (
    <div className="relative shrink-0 w-full" data-name="Content">
      <div className="overflow-clip rounded-[inherit] size-full">
        <div className="content-stretch flex flex-col gap-[16px] items-start p-[16px] relative w-full">
          <PartsAndServicesCard />
          <SelectWithLabel />
          <SelectWithLabel1 />
          <InputFieldWithLabel />
          <Frame46 />
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
            <p className="leading-[1.4] whitespace-pre-wrap">Add</p>
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

function Frame26() {
  return (
    <div className="-translate-x-1/2 absolute bg-white bottom-0 content-stretch flex flex-col items-center left-1/2 overflow-clip rounded-tl-[12px] rounded-tr-[12px] w-[390px]">
      <ModalHeader />
      <Content1 />
      <Footer />
    </div>
  );
}

export default function Mobile() {
  return (
    <div className="bg-white content-stretch flex flex-col items-start overflow-clip relative rounded-[24px] size-full" data-name="Mobile">
      <NavigationBarIOs />
      <Content />
      <div className="absolute bg-[rgba(0,0,0,0.25)] h-[844px] left-0 top-[-1px] w-[390px]" />
      <HomeIndicatorIOs />
      <Frame26 />
    </div>
  );
}