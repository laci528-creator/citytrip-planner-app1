const countryCurrencies = {
  AT: "EUR",
  DE: "EUR",
  HU: "HUF",
  CH: "CHF",
  GB: "GBP",
  US: "USD",
  CZ: "CZK",
  PL: "PLN",
  HR: "EUR",
  IT: "EUR",
  ES: "EUR",
  FR: "EUR",
};

export function getCurrencyByCountryCode(countryCode) {
  if (!countryCode) {
    return null;
  }

  return countryCurrencies[countryCode.toUpperCase()] ?? null;
}
