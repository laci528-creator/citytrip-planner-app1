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
    return { 
      error: true, 
      code: "INVALID_COUNTRYCODE", 
      message: "Country code is missing or invalid." 
    };
  }

  const localCurrency =
    countryToCurrency[normalizedCountryCode];

  if (!localCurrency) {
    return {
      error: true, 
      code: "INVALID_COUNTRYCODE", 
      message: "Invalid COUNTRY CODE." 
    }
    
  }

  if (localCurrency === baseCurrency) {
    return {
      error:false,
      baseCurrency,
      localCurrency,
      rate: 1,
      date: new Date().toISOString().slice(0, 10),
    };
  }

  try {
  const url =
    `${CURRENCY_API_URL}/rate/` +
    `${baseCurrency}/${localCurrency}`;

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => null);

      if (response.status === 429) {
        return { error: true, code: "LIMIT_REACHED", message: "Daily API request limit exceeded." };
      }
    return { 
        error: true, 
        code: "API_ERROR", 
        message: errorData?.reason || "The currency service returned an error." 
      };
  }

  const data = await response.json();

  return {
    error:false,
    baseCurrency,
    localCurrency,
    rate: data.rate,
    date: data.date,
  };
  } catch (err) {
    console.error("Currency Fetch Error:", err);
    return { error: true, code: "NETWORK_ERROR", message: "Failed to connect to currency provider." };
  }
}