export async function getExchangeRate(baseCurrency, targetCurrency) {
  const base = baseCurrency.trim().toUpperCase();
  const target = targetCurrency.trim().toUpperCase();

  if (!/^[A-Z]{3}$/.test(base) || !/^[A-Z]{3}$/.test(target)) {
    throw new Error("Invalid currency code.");
  }

  if (base === target) {
    return {
      base,
      target,
      rate: 1,
      date: null,
    };
  }

  const url =
    `https://api.frankfurter.dev/v2/rate/` +
    `${encodeURIComponent(base)}/${encodeURIComponent(target)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("The currency service returned an error.");
  }

  const data = await response.json();

  if (typeof data.rate !== "number") {
    throw new Error("The currency service returned invalid data.");
  }

  return {
    base: data.base,
    target: data.quote,
    rate: data.rate,
    date: data.date,
  };
}
