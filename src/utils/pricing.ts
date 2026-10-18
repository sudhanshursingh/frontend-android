export interface PricingTier {
  id: string;
  name: string;
  minUnits: number;
  maxUnits: number | null;
  unitPrice: number;
  label?: string;
  badge?: string;
}

export interface VolumeCalculationResult {
  qualifiedTier: PricingTier;
  unitPrice: number;
  grossTotal: number;
  savingsVsBase: number;
  marginLiftPercent: number;
}

export interface EscrowMilestoneSchedule {
  baseAmount: number;
  gstAmount: number;
  totalContractValue: number;
  stage1Deposit15: number;
  stage2Hold50: number;
  stage3Release35: number;
}

export function calculateVolumeTierPrice(
  quantity: number,
  tiers: PricingTier[]
): VolumeCalculationResult {
  const sorted = [...tiers].sort((a, b) => a.minUnits - b.minUnits);
  const basePrice = sorted[0]?.unitPrice ?? 0;

  let qualified = sorted[0];
  for (const tier of sorted) {
    if (quantity >= tier.minUnits) {
      if (tier.maxUnits === null || quantity <= tier.maxUnits) {
        qualified = tier;
      }
    }
  }

  const unitPrice = qualified.unitPrice;
  const grossTotal = quantity * unitPrice;
  const baseTotal = quantity * basePrice;
  const savingsVsBase = Math.max(0, baseTotal - grossTotal);
  const marginLiftPercent = basePrice > 0 ? Math.round(((basePrice - unitPrice) / basePrice) * 100) : 0;

  return {
    qualifiedTier: qualified,
    unitPrice,
    grossTotal,
    savingsVsBase,
    marginLiftPercent,
  };
}

export function calculateEscrowMilestones(
  baseAmount: number,
  gstRate: number = 0.18
): EscrowMilestoneSchedule {
  const gstAmount = Math.round(baseAmount * gstRate);
  const totalContractValue = baseAmount + gstAmount;

  const stage1Deposit15 = Math.round(totalContractValue * 0.15);
  const stage2Hold50 = Math.round(totalContractValue * 0.50);
  const stage3Release35 = totalContractValue - stage1Deposit15 - stage2Hold50;

  return {
    baseAmount,
    gstAmount,
    totalContractValue,
    stage1Deposit15,
    stage2Hold50,
    stage3Release35,
  };
}

export function formatINR(value: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatUnitRate(value: number): string {
  return '₹' + value.toFixed(2);
}
