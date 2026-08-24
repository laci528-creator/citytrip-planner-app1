import { isValidCoordinates } from "../utils/validators.js";

export async function getWeather(latitude, longitude) {

if (!isValidCoordinates(latitude, longitude)) {
  return {
    error: true,
    code: "INVALID_COORDINATES",
    message: "Invalid geographical coordinates.",
  };
}

try {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),

    current: [
      "temperature_2m",
      "apparent_temperature",
      "relative_humidity_2m",
      "precipitation",
      "weather_code",
      "wind_speed_10m",
    ].join(","),

    daily: [
      "weather_code",
      "temperature_2m_max",
      "temperature_2m_min",
      "precipitation_probability_max",
      "sunrise",
      "sunset",
    ].join(","),

    timezone: "auto",
    forecast_days: "7",
  });

  const weatherUrl =
    `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

  const response = await fetch(weatherUrl);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    if (response.status === 429) {
        return { error: true, code: "LIMIT_REACHED", message: "Daily API request limit exceeded. Please try again later." };
  }
      return { 
        error: true, 
        code: "API_ERROR", 
        message: errorData?.reason || "The weather service returned an error." 
      };
    }


  const data = await response.json();

  return {
    error: false,
    timezone: data.timezone,

    current: {
      time: data.current.time,
      temperature: data.current.temperature_2m,
      apparentTemperature: data.current.apparent_temperature,
      humidity: data.current.relative_humidity_2m,
      precipitation: data.current.precipitation,
      weatherCode: data.current.weather_code,
      windSpeed: data.current.wind_speed_10m,
    },
    daily: data.daily.time.map((date, index) => ({
      date,
      weatherCode: data.daily.weather_code[index],
      temperatureMax: data.daily.temperature_2m_max[index],
      temperatureMin: data.daily.temperature_2m_min[index],
      precipitationProbability:
        data.daily.precipitation_probability_max[index],
      sunrise: data.daily.sunrise[index],
      sunset: data.daily.sunset[index],
    })),
  };
    } catch (err) {
    console.error("Weather Fetch Error:", err);
    return { error: true, code: "NETWORK_ERROR", message: "Failed to connect to weather provider." };
  }
}