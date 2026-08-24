import { formatDate, formatExchangeRate } from "../utils/formatters";

import defaultCityImage from "../assets/pexels-city-in-fog-andreas-geissler.jpg";

function CitySection({ city, image, currency }) {
  return (
    <section className="result-card" style={{ padding: "0", overflow: "hidden"}}>
      {image && (
        <div className="top-image-container">
          {image.error ? (
              <div className="error-box">{image.message}</div>
            ) : image.code === "DONT HAVE PHOTO" ? (
              <>
          <p className="placeholder-text">{image.message}</p>
          <img 
            src={defaultCityImage} 
            alt="Placeholder for city" 
            className="city-image grayscale"
          />
          </>
            ) : (
          <>
          <img
            src={image.imageUrl}
            alt={image.altDescription || `Photo of ${city.name}`}
            className="city-image"
          />
          <div className="photographer-name">
            Photo by{" "}
              <a
                href={image.photographerUrl}
                target="_blank"
                rel="noreferrer"
              >
                {image.photographerName}
              </a>{" "}
                on{" "}
                <a
                  href={image.unsplashUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Unsplash
                </a>
          </div>
          </>
          
          )}

        </div>
      )}

      <div style={{ padding: "24px" }}>
        <h2>
          {city.cityName}, {city.country}
        </h2>

        <div className="city-info-grid">

<div className="info-column">
  <h4 style={{ marginBottom: "10px", marginTop: "0" }}>Location Info</h4>
        {city.population != null && (
          <p>
            <strong>Population:</strong> {city.population.toLocaleString()}
          </p>
        )}

        <p>
          <strong>Latitude:</strong> {city.latitude}
        </p>

        <p>
          <strong>Longitude:</strong> {city.longitude}
        </p>
</div>
        {currency && (
            <div className="info-column">
              <h4 style={{ marginBottom: "10px", marginTop: "0" }}>Local Currency</h4>
              {currency.error ? (
                <div className="error-box-small" style={{ color: "#991b1b" }}>
                  {currency.message}
                </div>
              ) : (
                <>
                  <p><strong>Currency:</strong> {currency.localCurrency}</p>
                  <p>
                    <strong>Latest exchange rate:</strong> 1 {currency.baseCurrency} ={" "}
                    {formatExchangeRate(currency.rate)} {currency.localCurrency}
                  </p>
                  {currency.date && (
                    <p>
                      <strong>Rate date:</strong> {formatDate(currency.date)}
                    </p>
                  )}
                </>
              )}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}

export default CitySection;