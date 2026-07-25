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
  const { lat, lon, name, country, countryCode, population } = req.query;


  if (!lat || !lon || !name) {
    return res.status(400).json({
      message: "Latitude, longitude, and city name are required.",
    });
  }

  try {
    const city = {
      latitude: parseFloat(lat),
      longitude: parseFloat(lon),
      name,
      country,
      countryCode,
      population: population ? parseInt(population) : null,
    };

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
