import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchCity } from "../services/api";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});


function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      setErrorMessage("Please enter a search term.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setCity(null);

      const cityData = await searchCity(trimmedSearchTerm);

      setCity(cityData);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <main className="main-container">
      <div className="hero-header">
      <h1>Urlaub Planer</h1>
      <p>Search for your holiday destination.</p>
      
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      </div>

      {isLoading && <p>Searching...</p>}

      {errorMessage && <p>{errorMessage}</p>}

        {city && (
                <div className="destination-results">
                <CitySection city={city.city} attractions={city.attraction} image={city.image} />

                <WeatherSection weather={city.weather} />
                <AttractionSection attraction={city.attraction} />
                </div>
            )}
            </main>
        );
    }
        
function CitySection({ city, attractions, image }) {
  const position = [city.latitude, city.longitude];
  return (
    <section className="result-card" style={{ padding: 0, overflow: "hidden" }}>
      {/* 1. KÉP SZEKCIÓ (Borítókép) */}
      {image && (
        <div style={{ position: "relative", width: "100%", height: "350px" }}>
          <img
            src={image.imageUrl}
            alt={image.altDescription || `Photo of ${city.name}`}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Fotós kredit megjelenítése az Unsplash szabályzata miatt */}
          <div style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "4px 8px",
            borderRadius: "4px",
            fontSize: "0.75rem",
          }}>
            Photo by {image.photographerName} on Unsplash
          </div>
        </div>
      )}
      <div style={{ padding: "24px" }}>
      <h2 style={{ marginTop: 0 }}>
        {city.name}, {city.country}
      </h2>

      {city.population != null && (
        <p>
          <strong>Population:</strong>{" "}
          {city.population.toLocaleString()}
        </p>
      )}

      <p>
        <strong>Latitude:</strong> {city.latitude}
      </p>

      <p>
        <strong>Longitude:</strong> {city.longitude}
      </p>
      <div
        style={{
          height: "400px",
          width: "100%",
          marginTop: "15px",
          borderRadius: "8px",
          overflow: "hidden",
        }}
      >
        <MapContainer
          key={`${city.latitude}-${city.longitude}`}
          center={position}
          zoom={12}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              {city.name}, {city.country}
            </Popup>
          </Marker>
          {attractions?.map((attraction) => (
          <Marker
            key={attraction.id}
            position={[
              attraction.latitude,
              attraction.longitude,
            ]}
          >
            <Popup>
              <strong>{attraction.name}</strong>
              <br />
              Distance: {formatDistance(attraction.distance)}
            </Popup>
          </Marker>
        ))}
        </MapContainer>
      </div>
      </div>


    </section>
  );
}


function WeatherSection({ weather }) {
  if (!weather) {
    return null;
  }

  return (
    <section className="result-card">
      <h2>Current weather</h2>

      <p>
        <strong>Temperature:</strong>{" "}
        {weather.current.temperature} °C
      </p>

      <p>
        <strong>Feels like:</strong>{" "}
        {weather.current.apparentTemperature} °C
      </p>

      <p>
        <strong>Humidity:</strong> {weather.current.humidity}%
      </p>

      <p>
        <strong>Wind speed:</strong>{" "}
        {weather.current.windSpeed} km/h
      </p>

      <p>
        <strong>Conditions:</strong>{" "}
        {getWeatherDescription(weather.current.weatherCode)}
      </p>

      {weather.daily?.length > 0 && (
        <>
          <h3>7-day forecast</h3>

          <div className="forecast-grid">
            {weather.daily.map((day) => (
              <article className="forecast-card" key={day.date}>
                <h4>{formatDate(day.date)}</h4>

                <p>
                  {getWeatherDescription(day.weatherCode)}
                </p>

                <p>
                  Max: {day.temperatureMax} °C
                </p>

                <p>
                  Min: {day.temperatureMin} °C
                </p>

                <p>
                  Rain: {day.precipitationProbability ?? 0}%
                </p>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(new Date(dateString));
}

function getWeatherDescription(code) {
  const weatherCodes = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Rime fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Heavy drizzle",
    61: "Light rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Light snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Light rain showers",
    81: "Moderate rain showers",
    82: "Heavy rain showers",
    95: "Thunderstorm",
  };

  return weatherCodes[code] ?? "Unknown conditions";
}

function AttractionSection({ attraction }) {
    if (!attraction) {
    return null;
  }

return (
    <section className="result-card">
      <h2>Nearby attractions</h2>

      <div className="attraction-grid">
        {attraction.map((attr) => (
          <article className="attraction-card" key={attr.id}>
            <h3>{attr.name}</h3>

            <p>
              <strong>Distance:</strong> {formatDistance(attr.distance)}
            </p>
              {attr.categories?.length > 0 && (
                <>
                  <h4>Categories:</h4>

                  <ul>
                    {attr.categories.map((category) => (
                      <li className="category-list" key={`${attr.id}-${category}`}>
                        {formatCategory(category)}
                      </li>
                    ))}
                  </ul>
                </>
              )}

          </article>
        ))}
      </div>
    </section>
  );
}

function formatDistance(distance) {
  if (distance >= 1000) {
    return `${(distance / 1000).toFixed(1)} km`;
  }

  return `${Math.round(distance)} m`;
}


function formatCategory(category) {
  return category
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}


export default Home;
