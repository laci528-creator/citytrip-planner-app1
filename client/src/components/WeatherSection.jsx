import React from "react";
import { formatDate } from "../utils/formatters";

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


export default WeatherSection;