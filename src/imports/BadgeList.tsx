import svgPaths from "./svg-ajfnd5kbms";

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

function Badge() {
  return (
    <div className="bg-[#e8f4fd] content-stretch flex flex-col items-center justify-center overflow-clip p-[4px] relative rounded-[24px] shrink-0 size-[22px]" data-name="_Badge">
      <Sitemap />
    </div>
  );
}

function Frame() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-[247px]">
      <Badge />
      <p className="font-['Inter:Regular',sans-serif] font-normal leading-[1.4] not-italic relative shrink-0 text-[#4f5e71] text-[12px] tracking-[0.2px] w-[217px] whitespace-pre-wrap">5 Options</p>
    </div>
  );
}

export default function BadgeList() {
  return (
    <div className="content-stretch flex items-start pb-[2px] relative size-full" data-name="BadgeList">
      <Frame />
    </div>
  );
}