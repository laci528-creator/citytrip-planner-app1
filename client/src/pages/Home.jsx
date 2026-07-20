import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchCity } from "../services/api";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");
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
      setLastSearchTerm(trimmedSearchTerm);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <main>
      <h1>Urlaub Planer</h1>
      <p>Search for your holiday destination.</p>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {isLoading && <p>Searching...</p>}

      {errorMessage && <p>{errorMessage}</p>}

        {city && (
                <div className="destination-results">
                <CitySection city={city.city} />

                <WeatherSection weather={city.weather} />
                </div>
            )}
            </main>
        );
    }
        

function CitySection({ city }) {
  return (
    <section className="result-card">
      <h2>
        {city.name}, {city.country}
      </h2>

      {city.population !== null && (
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


export default Home;










 /*city && (
        <section>
          <h2>
            {city.city.name}, {city.city.country}
          </h2>
          <p>Country Code: {city.city.countryCode}</p>
            <p>Timezone: {city.weather.timezone}</p>
            <p>Current time: {city.weather.current.time}</p>
            <p>Temperature: {city.weather.current.temperature}</p>
            <p>Apparent Temperature: {city.weather.current.apparentTemperature}</p>
            <p>Windspeed: {city.weather.current.windSpeed}</p>
        </section>
      )}

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



      {lastSearchTerm && <p>Last search: {lastSearchTerm}</p>}
    </main>
  );
}

export default Home  */
