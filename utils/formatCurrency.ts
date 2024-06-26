export function formatCurrency(
  amount: number,
  currency: string,
  locale: string = "es-AR"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
export default formatCurrency;
