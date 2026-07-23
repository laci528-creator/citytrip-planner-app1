import React from "react";

function CitySection({ city, image }) {
  return (
    <section className="result-card">
      {image && (
        <div className="top-image-container">
          <img
            src={image.imageUrl}
            alt={image.altDescription || `Photo of ${city.name}`}
            className="city-image"
          />
          <div className="photographer-name">
            Photo by {image.photographerName} on Unsplash
          </div>
        </div>
      )}

      <div style={{ padding: "24px" }}>
        <h2>
          {city.name}, {city.country}
        </h2>

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
    </section>
  );
}

export default CitySection;