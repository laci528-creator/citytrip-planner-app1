import { formatDate } from "../utils/formatters";

function WeatherSection({ weather }) {
if (weather?.error) {
    return (
      <section className="result-card">
        <h2>Current weather</h2>
        <div className="error-box">
          {weather.message}
        </div>
      </section>
    );
  }

  return (
    <section className="result-card">
      <h2>Current weather</h2>

          <div className="forecast-grid">
            {weather?.current && (
              <article className="forecast-card" key={weather.current.date}>
                <h4>Right Now</h4>
                <img 
                  src={getWeatherIconUrl(weather.current.weatherCode)} 
                  alt={getWeatherDescription(weather.current.weatherCode)}
                  style={{ width: "80px", height: "80px", margin: "8px 0" }} 
                />
                <p>
                  {getWeatherDescription(weather.current.weatherCode)}
                </p>

                <p>
                  Current: {weather.current.temperature} °C
                </p>

                <p>
                  Feels Like: {weather.current.apparentTemperature} °C
                </p>

                <p>
                  Wind: {weather.current.windSpeed} {" "} km/h
                </p>
              </article>
            )}

            {weather?.daily?.length > 0 && weather.daily.map((day) => (
              <article className="forecast-card" key={day.date}>
                <h4>{formatDate(day.date)}</h4>

                <img 
                  src={getWeatherIconUrl(day.weatherCode)} 
                  alt={getWeatherDescription(day.weatherCode)}
                  style={{ width: "80px", height: "80px", margin: "8px 0" }} 
                />

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

function getWeatherIconUrl(code) {
  const weatherIcons = {
    0: "day.svg",                  // Clear sky
    1: "cloudy-day-1.svg",         // Mainly clear
    2: "cloudy-day-2.svg",         // Partly cloudy
    3: "cloudy.svg",               // Overcast
    45: "cloudy.svg",              // Fog (amCharts-ban nincs külön köd, a felhős tökéletes)
    48: "cloudy.svg",              // Rime fog
    51: "rainy-4.svg",             // Light drizzle
    53: "rainy-5.svg",             // Moderate drizzle
    55: "rainy-6.svg",             // Heavy drizzle
    61: "rainy-4.svg",             // Light rain
    63: "rainy-5.svg",             // Moderate rain
    65: "rainy-6.svg",             // Heavy rain
    71: "snowy-4.svg",             // Light snow
    73: "snowy-5.svg",             // Moderate snow
    75: "snowy-6.svg",             // Heavy snow
    80: "rainy-4.svg",             // Light rain showers
    81: "rainy-5.svg",             // Moderate rain showers
    82: "rainy-6.svg",             // Heavy rain showers
    95: "thunder.svg",             // Thunderstorm
  };

  const fileName = weatherIcons[code] ?? "weather.svg"; 
  
  return `/icons/weather/${fileName}`;
}




export default WeatherSection;