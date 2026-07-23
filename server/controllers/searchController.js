import { getCity } from "../services/searchCities.js";
import { getWeather } from "../services/weatherService.js";
import {
  getNearbyAttractions,
} from "../services/attractionsService.js";
import { getCityImage } from "../services/imageService.js";
import { getCurrencyInfo } from "../services/currencyService.js";


export async function getCitySuggestions(req, res) {
  const query = req.query.query;

  if (!query || !query.trim()) {
    return res.status(400).json({ message: "Search query is required." });
  }

  try {
    const cities = await getCity(query.trim());

    return res.status(200).json(cities); 
  } catch (error) {
    console.error("City search error:", error);
    return res.status(500).json({ message: "Could not load city suggestions." });
  }
}



export async function getDestinationData(req, res) {
  const { lat, lon, name, countryCode, population } = req.query;


  if (!lat || !lon || !name) {
    return res.status(400).json({
      message: "Latitude, longitude, and city name are required.",
    });
  }

  try {
    const city = {
      name,
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      countryCode,
      population: population ? parseInt(population) : null,
    };
    console.log(lat, typeof lat)

    const [weather, attraction, image, currency] = await Promise.all ([
      getWeather(city.latitude,city.longitude), 
      getNearbyAttractions(city.latitude, city.longitude),
      getCityImage(city.name),
      getCurrencyInfo(city.countryCode).catch((err) => {
      console.error("Valuta hiba:", err.message);
      return null; })
    ]);

    return res.status(200).json({
      city,
      weather,
      attraction,
      image,
      currency
    });

  } catch (error) {
    console.error("Destination data error:", error);

    return res.status(500).json({
      message: "Destination data could not be loaded.",
    });
  }
}
















/*
export async function searchCities(req, res) {
    const query = req.query.query;
    const count = 10;
    const language = 'en';

    if (!query || !query.trim()) {
      return res.status(400).json({ message: "Search query is required." });
    }

    const normalizedQuery = query.trim().toLowerCase();

      const searchUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
        normalizedQuery)}&count=${count}&language=${language}&format=json`;

      try {
    const response = await fetch(searchUrl);

    if (!response.ok) {
      return res.status(response.status).json({
        message: "The city search service returned an error.",
      });
    }

    const data = await response.json();

const city = data.results?.[0];

    if (!city) {
      return res.status(404).json({
        message: "City not found.",
      });
    }

    return res.status(200).json({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      population: city.population ?? null,
      country_code: city.country_code,
      timezone: city.timezone,
      country: city.country,
    });
  } catch (error) {
    console.error("City search error:", error);

    return res.status(500).json({
      message: "City search failed.",
    });
  }
}
*/

    /*const cities = (data.results ?? []).map((city) => ({
      name: city.name,
      latitude: city.latitude,
      longitude: city.longitude,
      population: city.population ?? null,
      country: city.country,
    }));*/

