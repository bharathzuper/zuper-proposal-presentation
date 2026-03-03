export interface BreakdownSection {
  id: string;
  title: string;
  showTotal?: boolean;
}

export interface BreakdownItem {
  item: string;
  cost: number;
  section?: string; // references a BreakdownSection id
  hasOptions?: boolean;
  customerSelectionEnabled?: boolean;
  availableOptions?: {
    name: string;
    imageUrl: string;
    available: boolean;
  }[];
  selectedOption?: string | null;
  optionLabel?: string;
}

export interface EstimateOption {
  id: string;
  title: string;
  description: string;
  price: number;
  recommended?: boolean;
  breakdownSections?: BreakdownSection[];
  breakdown: BreakdownItem[];
}

export interface ProposalSection {
  id: string;
  title: string;
  page: number;
  required: boolean;
}

export interface Signer {
  id: string;
  name: string;
  role: string;
  email: string;
  order: number;
  status: "pending" | "signed" | "current";
  signedAt?: string;
  signatureData?: string;
  isCompanySigner?: boolean; // Flag to identify company authorization person
}

export interface Proposal {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string;
  recipientName: string;
  recipientEmail: string;
  recipientAddress: string;
  pdfUrl: string;
  sections: ProposalSection[];
  estimateOptions: EstimateOption[];
  addons?: Array<{
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
    isBundle?: boolean; // New: indicates if this addon is a bundle
    bundleItems?: Array<{ // New: items within the bundle
      id: string;
      title: string;
      description: string;
      price: number;
      image: string;
      required?: boolean; // Bundle items can be required or optional
      hasOptions?: boolean;
      customerSelectionEnabled?: boolean;
      availableOptions?: {
        name: string;
        imageUrl: string;
        available: boolean;
      }[];
      selectedOption?: string | null;
      optionLabel?: string;
    }>;
  }>;
  signers: Signer[];
  createdAt: string;
}

// Fresh image URLs
const IMG_CHARCOAL = "https://images.unsplash.com/photo-1743292830660-0537938c46ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyY29hbCUyMGRhcmslMjByb29mJTIwc2hpbmdsZXMlMjB0ZXh0dXJlfGVufDF8fHx8MTc3MTQ5MTQxNHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_WEATHERED_WOOD = "https://images.unsplash.com/photo-1613432278032-9280f44657a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMHdlYXRoZXJlZCUyMHdvb2QlMjByb29mJTIwc2hpbmdsZXN8ZW58MXx8fHwxNzcxNDkxNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_DESERT_TAN = "https://images.unsplash.com/photo-1751818430411-3d7df9ced7f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW4lMjBiZWlnZSUyMHNhbmR5JTIwcm9vZiUyMHNoaW5nbGV8ZW58MXx8fHwxNzcxNDkxNDE1fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_ESTATE_GRAY = "https://images.unsplash.com/photo-1539589430189-ebb7d4cc0c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwc2xhdGUlMjByb29mJTIwc2hpbmdsZXMlMjBjbG9zZXVwfGVufDF8fHx8MTc3MTQ5MTQxNXww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_ONYX_BLACK = "https://images.unsplash.com/photo-1667133997340-f0280c4a0dfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGRhcmslMjByb29maW5nJTIwbWF0ZXJpYWx8ZW58MXx8fHwxNzcxNDkxNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_TRIM_WHITE = "https://images.unsplash.com/photo-1738106099498-1df3c7d8841e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMGFsdW1pbnVtJTIwcm9vZiUyMGZsYXNoaW5nJTIwdHJpbXxlbnwxfHx8fDE3NzE0OTE0MTZ8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_TRIM_BLACK = "https://images.unsplash.com/photo-1708244546566-b6019a6f9731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMG1ldGFsJTIwcm9vZiUyMHRyaW0lMjBkZXRhaWx8ZW58MXx8fHwxNzcxNDkxNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_TRIM_BRONZE = "https://images.unsplash.com/photo-1647018522558-85a4d1b9c8e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm9uemUlMjBjb3BwZXIlMjBtZXRhbCUyMHJvb2Zpbmd8ZW58MXx8fHwxNzcxNDkxNDE3fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_TRIM_ALUMINUM = "https://images.unsplash.com/photo-1577369351003-e27ab808d2c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaWx2ZXIlMjBhbHVtaW51bSUyMG1ldGFsJTIwc2hlZXR8ZW58MXx8fHwxNzcxNDkxNDE3fDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_GUTTER_WHITE = "https://images.unsplash.com/photo-1638856485841-5141e7316772?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMHJhaW4lMjBndXR0ZXIlMjBob3VzZSUyMGV4dGVyaW9yfGVufDF8fHx8MTc3MTQ5MTQxOHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GUTTER_BROWN = "https://images.unsplash.com/photo-1709324277633-f4a2cd33dc2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicm93biUyMGNvcHBlciUyMHJhaW4lMjBndXR0ZXIlMjBkb3duc3BvdXR8ZW58MXx8fHwxNzcxNDkxNDE4fDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GUTTER_BLACK = "https://images.unsplash.com/photo-1756667162928-f39492a4e340?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMGFsdW1pbnVtJTIwZ3V0dGVyJTIwc3lzdGVtfGVufDF8fHx8MTc3MTQ5MTQxOXww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GUTTER_GRAY = "https://images.unsplash.com/photo-1655876726435-d24ab1c59c0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmF5JTIwc2VhbWxlc3MlMjBndXR0ZXIlMjBob3VzZSUyMHJvb2Z8ZW58MXx8fHwxNzcxNDkxNDE5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_GUARD_MESH = "https://images.unsplash.com/photo-1707257833303-8ca789233baf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXNoJTIwZ3V0dGVyJTIwZ3VhcmQlMjBwcm90ZWN0aW9uJTIwbGVhZnxlbnwxfHx8fDE3NzE0OTE0MjB8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GUARD_PERF = "https://images.unsplash.com/photo-1613744095894-cc7eac914a64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJmb3JhdGVkJTIwYWx1bWludW0lMjBtZXRhbCUyMHBhbmVsfGVufDF8fHx8MTc3MTQ5MTQyMHww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_GUARD_SCREEN = "https://images.unsplash.com/photo-1689410190173-a40a7c70cdb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aXJlJTIwbWVzaCUyMHNjcmVlbiUyMGZpbHRlciUyMGNsb3NldXB8ZW58MXx8fHwxNzcxNDkxNDIwfDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_INSULATION = "https://images.unsplash.com/photo-1600877841955-af3c51dac2fe?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHRpYyUyMGluc3VsYXRpb24lMjBmaWJlcmdsYXNzJTIwYmxvd258ZW58MXx8fHwxNzcxNDkxNDIxfDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_SOLAR_20W = "https://images.unsplash.com/photo-1761667803892-af792edb43ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwYXR0aWMlMjB2ZW50aWxhdGlvbiUyMHJvb2Z8ZW58MXx8fHwxNzcxNDkxNDIxfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_SOLAR_30W = "https://images.unsplash.com/photo-1763114613273-ec505136d03a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2xhciUyMHBhbmVsJTIwcm9vZnRvcCUyMHJlc2lkZW50aWFsJTIwcG93ZXJ8ZW58MXx8fHwxNzcxNDkxNDIyfDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_SKYLIGHT_SM = "https://images.unsplash.com/photo-1706095118615-e28343a818d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxza3lsaWdodCUyMHdpbmRvdyUyMHJvb2YlMjBpbnRlcmlvciUyMGxpZ2h0fGVufDF8fHx8MTc3MTQ5MTQyMnww&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_SKYLIGHT_MD = "https://images.unsplash.com/photo-1706415263342-9601c2994fc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXJnZSUyMHNreWxpZ2h0JTIwd2luZG93JTIwY2VpbGluZyUyMG1vZGVybnxlbnwxfHx8fDE3NzE0OTE0MjN8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_SKYLIGHT_LG = "https://images.unsplash.com/photo-1707572435269-b0e49cac8ec4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YWxsJTIwbmFycm93JTIwc2t5bGlnaHQlMjB3aW5kb3clMjBhcmNoaXRlY3R1cmV8ZW58MXx8fHwxNzcxNDkxNDIzfDA&ixlib=rb-4.1.0&q=80&w=1080";

const IMG_COMPANY = "https://images.unsplash.com/photo-1690960944414-c529305e0fb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29maW5nJTIwY29tcGFueSUyMGJ1aWxkaW5nJTIwb2ZmaWNlJTIwZXh0ZXJpb3J8ZW58MXx8fHwxNzcxNDkxNDIzfDA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_BUNDLE = "https://images.unsplash.com/photo-1675995431182-d74862bc2b3a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mJTIwcHJvdGVjdGlvbiUyMGJ1bmRsZSUyMGhvbWUlMjBpbXByb3ZlbWVudHxlbnwxfHx8fDE3NzE0OTE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080";
const IMG_SHINGLES_STACK = "https://images.unsplash.com/photo-1553169507-38833977274b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29maW5nJTIwc2hpbmdsZXMlMjBtYXRlcmlhbCUyMHN0YWNrJTIwY2xvc2V1cHxlbnwxfHx8fDE3NzE0OTE0MjR8MA&ixlib=rb-4.1.0&q=80&w=1080";

export const mockProposal: Proposal = {
  id: "PROP-2025-001",
  title: "Residential Roofing Proposal",
  companyName: "Summit Roofing Co.",
  companyLogo: IMG_COMPANY,
  recipientName: "John Anderson",
  recipientEmail: "john.anderson@example.com",
  recipientAddress: "1247 Oak Street, Springfield, IL 62701",
  pdfUrl: "https://images.unsplash.com/photo-1554224311-beee4f0d696c?w=800&h=1000&fit=crop",
  sections: [
    {
      id: "about-us",
      title: "About Us",
      page: 1,
      required: true,
    },
    {
      id: "inspection-summary",
      title: "Inspection Summary",
      page: 2,
      required: false,
    },
    {
      id: "estimate-options",
      title: "Estimate Options",
      page: 3,
      required: true,
    },
    {
      id: "terms-conditions",
      title: "Terms & Conditions",
      page: 4,
      required: true,
    },
  ],
  estimateOptions: [
    {
      id: "standard-package",
      title: "Standard Package",
      description: "Quality protection for your home with 25-year manufacturer warranty",
      price: 12500,
      breakdownSections: [
        {
          id: "shingles",
          title: "Shingles",
          showTotal: true,
        },
        {
          id: "trim",
          title: "Trim & Flashing",
          showTotal: true,
        },
        {
          id: "labor",
          title: "Labor & Installation",
          showTotal: true,
        },
        {
          id: "permits",
          title: "Permits & Disposal",
          showTotal: true,
        },
      ],
      breakdown: [
        { 
          item: "Owens Corning Duration Series Shingles", 
          cost: 5200,
          section: "shingles",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "Charcoal", imageUrl: IMG_CHARCOAL, available: true },
            { name: "Weathered Wood", imageUrl: IMG_WEATHERED_WOOD, available: true },
            { name: "Desert Tan", imageUrl: IMG_DESERT_TAN, available: true },
            { name: "Estate Gray", imageUrl: IMG_ESTATE_GRAY, available: true },
            { name: "Onyx Black", imageUrl: IMG_ONYX_BLACK, available: true },
            { name: "Architectural", imageUrl: "", available: true },
          ],
          selectedOption: null,
          optionLabel: "Shingle Color"
        },
        { item: "Ice & Water Shield", cost: 1200, section: "shingles" },
        { item: "Synthetic Underlayment", cost: 900, section: "shingles" },
        { 
          item: "Ridge Cap Shingles", 
          cost: 800,
          section: "shingles",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "Charcoal", imageUrl: IMG_CHARCOAL, available: true },
            { name: "Weathered Wood", imageUrl: IMG_WEATHERED_WOOD, available: true },
            { name: "Desert Tan", imageUrl: IMG_DESERT_TAN, available: true },
            { name: "Estate Gray", imageUrl: IMG_ESTATE_GRAY, available: true },
          ],
          selectedOption: null,
          optionLabel: "Ridge Cap Color"
        },
        { 
          item: "Aluminum Trim & Flashing", 
          cost: 700,
          section: "trim",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "White", imageUrl: IMG_TRIM_WHITE, available: true },
            { name: "Black", imageUrl: IMG_TRIM_BLACK, available: true },
            { name: "Bronze", imageUrl: IMG_TRIM_BRONZE, available: true },
            { name: "Aluminum", imageUrl: IMG_TRIM_ALUMINUM, available: true },
          ],
          selectedOption: null,
          optionLabel: "Trim Color"
        },
        { item: "Ridge Ventilation", cost: 700, section: "trim" },
        { item: "Labor & Installation", cost: 3200, section: "labor" },
        { item: "Permits & Disposal", cost: 500, section: "permits" },
      ],
    },
    {
      id: "premium-package",
      title: "Premium Package",
      description: "Enhanced durability with upgraded materials and extended warranty coverage",
      price: 15800,
      recommended: true,
      breakdownSections: [
        {
          id: "shingles",
          title: "Shingles",
          showTotal: true,
        },
        {
          id: "trim",
          title: "Trim & Flashing",
          showTotal: true,
        },
        {
          id: "labor",
          title: "Labor & Installation",
          showTotal: true,
        },
        {
          id: "permits",
          title: "Permits & Disposal",
          showTotal: true,
        },
      ],
      breakdown: [
        { 
          item: "GAF Timberline HDZ Shingles", 
          cost: 6800,
          section: "shingles",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "Charcoal", imageUrl: IMG_CHARCOAL, available: true },
            { name: "Weathered Wood", imageUrl: IMG_WEATHERED_WOOD, available: true },
            { name: "Desert Tan", imageUrl: IMG_DESERT_TAN, available: true },
            { name: "Estate Gray", imageUrl: IMG_ESTATE_GRAY, available: true },
            { name: "Onyx Black", imageUrl: IMG_ONYX_BLACK, available: true },
          ],
          selectedOption: "Weathered Wood",
          optionLabel: "Shingle Color"
        },
        { item: "Premium Ice & Water Shield", cost: 1500, section: "shingles" },
        { item: "High-Performance Underlayment", cost: 1200, section: "shingles" },
        { 
          item: "Premium Ridge Cap Shingles", 
          cost: 1000,
          section: "shingles",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "Charcoal", imageUrl: IMG_CHARCOAL, available: true },
            { name: "Weathered Wood", imageUrl: IMG_WEATHERED_WOOD, available: true },
            { name: "Desert Tan", imageUrl: IMG_DESERT_TAN, available: true },
            { name: "Estate Gray", imageUrl: IMG_ESTATE_GRAY, available: true },
          ],
          selectedOption: "Weathered Wood",
          optionLabel: "Ridge Cap Color"
        },
        { 
          item: "Premium Aluminum Trim & Flashing", 
          cost: 900,
          section: "trim",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "White", imageUrl: IMG_TRIM_WHITE, available: true },
            { name: "Black", imageUrl: IMG_TRIM_BLACK, available: true },
            { name: "Bronze", imageUrl: IMG_TRIM_BRONZE, available: true },
            { name: "Aluminum", imageUrl: IMG_TRIM_ALUMINUM, available: true },
          ],
          selectedOption: "Bronze",
          optionLabel: "Trim Color"
        },
        { item: "Advanced Ridge Ventilation", cost: 900, section: "trim" },
        { item: "Labor & Installation", cost: 3800, section: "labor" },
        { item: "Permits & Disposal", cost: 600, section: "permits" },
      ],
    },
    {
      id: "elite-package",
      title: "Elite Package",
      description: "Premium designer shingles with maximum protection and curb appeal",
      price: 19200,
      breakdownSections: [
        {
          id: "shingles",
          title: "Shingles",
          showTotal: true,
        },
        {
          id: "trim",
          title: "Trim & Flashing",
          showTotal: true,
        },
        {
          id: "labor",
          title: "Labor & Installation",
          showTotal: true,
        },
        {
          id: "permits",
          title: "Permits & Disposal",
          showTotal: true,
        },
      ],
      breakdown: [
        { 
          item: "CertainTeed Landmark Premium Shingles", 
          cost: 8500,
          section: "shingles",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "Charcoal", imageUrl: IMG_CHARCOAL, available: true },
            { name: "Weathered Wood", imageUrl: IMG_WEATHERED_WOOD, available: true },
            { name: "Desert Tan", imageUrl: IMG_DESERT_TAN, available: true },
            { name: "Estate Gray", imageUrl: IMG_ESTATE_GRAY, available: true },
            { name: "Onyx Black", imageUrl: IMG_ONYX_BLACK, available: true },
          ],
          selectedOption: null,
          optionLabel: "Shingle Color"
        },
        { item: "Premium Ice & Water Shield", cost: 1800, section: "shingles" },
        { item: "Premium Synthetic Underlayment", cost: 1400, section: "shingles" },
        { 
          item: "Designer Ridge Cap Shingles", 
          cost: 1200,
          section: "shingles",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "Charcoal", imageUrl: IMG_CHARCOAL, available: true },
            { name: "Weathered Wood", imageUrl: IMG_WEATHERED_WOOD, available: true },
            { name: "Desert Tan", imageUrl: IMG_DESERT_TAN, available: true },
            { name: "Estate Gray", imageUrl: IMG_ESTATE_GRAY, available: true },
          ],
          selectedOption: null,
          optionLabel: "Ridge Cap Color"
        },
        { 
          item: "Designer Aluminum Trim & Flashing", 
          cost: 1000,
          section: "trim",
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "White", imageUrl: IMG_TRIM_WHITE, available: true },
            { name: "Black", imageUrl: IMG_TRIM_BLACK, available: true },
            { name: "Bronze", imageUrl: IMG_TRIM_BRONZE, available: true },
            { name: "Aluminum", imageUrl: IMG_TRIM_ALUMINUM, available: true },
          ],
          selectedOption: null,
          optionLabel: "Trim Color"
        },
        { item: "Premium Ridge Ventilation", cost: 1000, section: "trim" },
        { item: "Expert Labor & Installation", cost: 4500, section: "labor" },
        { item: "Permits, Disposal & Warranty", cost: 800, section: "permits" },
      ],
    },
  ],
  addons: [
    {
      id: "addon-1",
      title: "Additional Roofing Material",
      description: "Extra shingles for future repairs or replacements",
      price: 500,
      image: IMG_SHINGLES_STACK,
    },
    {
      id: "addon-2",
      title: "Premium Gutter System",
      description: "6-inch seamless aluminum gutters with downspouts",
      price: 1800,
      image: IMG_GUTTER_WHITE,
      hasOptions: true,
      customerSelectionEnabled: true,
      availableOptions: [
        { name: "White", imageUrl: IMG_GUTTER_WHITE, available: true },
        { name: "Brown", imageUrl: IMG_GUTTER_BROWN, available: true },
        { name: "Black", imageUrl: IMG_GUTTER_BLACK, available: true },
        { name: "Gray", imageUrl: IMG_GUTTER_GRAY, available: true },
      ],
      selectedOption: null,
      optionLabel: "Gutter Color"
    },
    {
      id: "addon-3",
      title: "Extended Warranty",
      description: "Add an additional 5 years to your warranty coverage",
      price: 1000,
      image: IMG_COMPANY,
    },
    {
      id: "addon-4",
      title: "Complete Roof Protection Bundle",
      description: "Comprehensive protection package with customizable options",
      price: 0, // Base price, will be calculated from selected items
      image: IMG_BUNDLE,
      isBundle: true,
      bundleItems: [
        {
          id: "bundle-item-1",
          title: "Gutter Guards",
          description: "Premium mesh gutter protection system",
          price: 800,
          image: IMG_GUARD_MESH,
          required: false,
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "Micro-Mesh", imageUrl: IMG_GUARD_MESH, available: true },
            { name: "Perforated Aluminum", imageUrl: IMG_GUARD_PERF, available: true },
            { name: "Screen Type", imageUrl: IMG_GUARD_SCREEN, available: true },
          ],
          selectedOption: null,
          optionLabel: "Guard Type"
        },
        {
          id: "bundle-item-2",
          title: "Attic Insulation Upgrade",
          description: "R-38 blown-in insulation for improved energy efficiency",
          price: 1200,
          image: IMG_INSULATION,
          required: false,
        },
        {
          id: "bundle-item-3",
          title: "Solar Attic Fan",
          description: "Eco-friendly solar-powered ventilation",
          price: 600,
          image: IMG_SOLAR_20W,
          required: false,
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: "20W Standard", imageUrl: IMG_SOLAR_20W, available: true },
            { name: "30W High-Power", imageUrl: IMG_SOLAR_30W, available: true },
          ],
          selectedOption: null,
          optionLabel: "Fan Power"
        },
        {
          id: "bundle-item-4",
          title: "Skylight Installation",
          description: "Energy-efficient skylight with blinds",
          price: 1800,
          image: IMG_SKYLIGHT_SM,
          required: false,
          hasOptions: true,
          customerSelectionEnabled: true,
          availableOptions: [
            { name: '22.5" x 22.5"', imageUrl: IMG_SKYLIGHT_SM, available: true },
            { name: '22.5" x 46.5"', imageUrl: IMG_SKYLIGHT_MD, available: true },
            { name: '22.5" x 70.5"', imageUrl: IMG_SKYLIGHT_LG, available: true },
          ],
          selectedOption: null,
          optionLabel: "Skylight Size"
        },
      ]
    },
  ],
  signers: [
    {
      id: "signer-1",
      name: "John Anderson",
      role: "Homeowner",
      email: "john.anderson@example.com",
      order: 1,
      status: "current",
    },
    {
      id: "signer-2",
      name: "Sarah Anderson",
      role: "Co-owner",
      email: "sarah.anderson@example.com",
      order: 2,
      status: "pending",
    },
    {
      id: "signer-3",
      name: "Michael Torres",
      role: "Property Manager",
      email: "michael.torres@example.com",
      order: 3,
      status: "pending",
    },
    {
      id: "signer-4",
      name: "David Chen",
      role: "Project Manager",
      email: "david.chen@summitroofing.com",
      order: 4,
      status: "pending",
      isCompanySigner: true,
    },
  ],
  createdAt: "2025-11-05T10:30:00Z",
};