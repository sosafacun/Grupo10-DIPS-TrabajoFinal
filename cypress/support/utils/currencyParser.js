export function parseCurrencyToFloat(priceString) {
  return parseFloat(priceString.replace('₹', '').replace(/,/g, '').trim());
}