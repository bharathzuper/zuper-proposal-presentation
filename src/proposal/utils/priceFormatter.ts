export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPriceWithCents(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatMonthly(amount: number): string {
  return `$${Math.round(amount)}/mo`;
}

export function formatPriceDelta(amount: number): string {
  if (amount === 0) return '';
  const sign = amount > 0 ? '+' : '';
  return `${sign}${formatPrice(amount)}`;
}
