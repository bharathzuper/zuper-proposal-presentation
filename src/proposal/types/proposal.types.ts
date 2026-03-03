export interface ContractorInfo {
  name: string;
  logo: string;
  licenseNumber?: string;
  phone?: string;
  email?: string;
  city?: string;
  rating?: number;
  reviewCount?: number;
}

export interface CustomerInfo {
  name: string;
  email: string;
  address: string;
  phone?: string;
}

export interface ConfigOption {
  id: string;
  label: string;
  colorHex?: string;
  imageUrl?: string;
  priceAdjustment?: number;
}

export interface ConfigGroup {
  id: string;
  label: string;
  category: string;
  options: ConfigOption[];
  selectedOptionId?: string;
}

export interface PackageFeature {
  text: string;
  highlighted?: boolean;
}

export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  features: PackageFeature[];
  isRecommended?: boolean;
  warrantyYears?: number;
  configGroups: ConfigGroup[];
  breakdown: BreakdownItem[];
}

export interface BreakdownItem {
  label: string;
  amount: number;
  category?: string;
}

export interface AddOnSubOption {
  id: string;
  label: string;
  options: ConfigOption[];
  selectedOptionId?: string;
}

export interface AddOn {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  icon?: string;
  badge?: 'POPULAR' | 'BUNDLE' | 'SAVE';
  subOptions?: AddOnSubOption[];
  bundleRequiresTrades?: string[];
}

export interface FinancingOption {
  id: string;
  providerName: string;
  providerLogo?: string;
  apr: number;
  termMonths: number;
  monthlyPayment: number;
  badge?: string;
  noImpactCredit?: boolean;
}

export interface Trade {
  id: string;
  name: string;
  icon: string;
  color?: string;
  packages: Package[];
  selectedPackageId?: string;
  tradeAddOns?: AddOn[];
  isRequired?: boolean;
  optOutLabel?: string;
}

export interface Signer {
  id: string;
  name: string;
  role: string;
  email: string;
  order: number;
  status: 'pending' | 'signed' | 'current';
  signedAt?: string;
  signatureData?: string;
  isCompanySigner?: boolean;
}

export interface BundleDiscount {
  minTrades: number;
  amount: number;
  label: string;
}

export interface Proposal {
  id: string;
  contractorInfo: ContractorInfo;
  customer: CustomerInfo;
  trades: Trade[];
  globalAddOns: AddOn[];
  financing: FinancingOption[];
  signers: Signer[];
  proposalPdfUrl: string;
  validUntil: string;
  createdAt: string;
  termsUrl?: string;
  bundleDiscount?: BundleDiscount;
}

export interface ProposalSelections {
  tradeSelections: Record<string, {
    packageId: string;
    configSelections: Record<string, string>;
  }>;
  selectedAddOnIds: string[];
  addOnConfigSelections: Record<string, Record<string, string>>;
  paymentMethod: 'full' | 'finance';
  selectedFinancingId?: string;
  signatureData?: string;
  skippedTradeIds: string[];
}

export type StepId = 'review' | 'package' | 'configure' | 'addons' | 'payment' | 'sign';

export interface Step {
  id: StepId;
  label: string;
}
