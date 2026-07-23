
function CurrencySection({ currency }) {
  if (!currency) {
    return null;
  }

  return (
    <section className="result-card">
      <h2>Local currency</h2>

      <p>
        <strong>Currency:</strong>{" "}
        {currency.localCurrency}
      </p>

      <p>
        <strong>Latest exchange rate:</strong>{" "}
        1 {currency.baseCurrency} ={" "}
        {formatExchangeRate(currency.rate)}{" "}
        {currency.localCurrency}
      </p>

      {currency.date && (
        <p>
          <strong>Rate date:</strong>{" "}
          {formatDate(currency.date)}
        </p>
      )}
    </section>
  );
}

function formatExchangeRate(rate) {
  return new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(rate);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date(dateString));
}

export default CurrencySection;