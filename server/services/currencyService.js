import countryToCurrency from "country-to-currency";

const CURRENCY_API_URL = "https://api.frankfurter.dev/v2";

export async function getCurrencyInfo(
  countryCode,
  baseCurrency = "EUR"
) {
  const normalizedCountryCode = countryCode
    ?.trim()
    .toUpperCase();

  if (!normalizedCountryCode) {
    return null;
  }

  const localCurrency =
    countryToCurrency[normalizedCountryCode];

  if (!localCurrency) {
    return null;
  }

  if (localCurrency === baseCurrency) {
    return {
      baseCurrency,
      localCurrency,
      rate: 1,
      date: new Date().toISOString().slice(0, 10),
    };
  }

  const url =
    `${CURRENCY_API_URL}/rate/` +
    `${baseCurrency}/${localCurrency}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

    throw new Error(
      errorData?.message ||
        "The exchange rate could not be loaded."
    );
  }

  const data = await response.json();

  return {
    baseCurrency,
    localCurrency,
    rate: data.rate,
    date: data.date,
  };
}