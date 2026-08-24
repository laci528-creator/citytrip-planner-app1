import { getCity } from "../services/searchCities.js";
import { getWeather } from "../services/weatherService.js";
import {
  getNearbyAttractions,
} from "../services/attractionsService.js";
import { getCityImage } from "../services/imageService.js";
import { getCurrencyInfo } from "../services/currencyService.js";
import { isValidCoordinates } from "../utils/validators.js";


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

  const cityName = name.trim();

  if (lat == null || lon == null || !cityName) {
    return res.status(400).json({
      message: "Latitude, longitude, and city name are required.",
    });
  }

    const latitude = Number.parseFloat(lat);
    const longitude = Number.parseFloat(lon);

  if (
    !isValidCoordinates(latitude, longitude)) {
    return res.status(400).json({
      message: "Invalid latitude or longitude.",
    });
  }

  try {
    const city = {
      latitude,
      longitude,
      cityName,
      country,
      countryCode,
      population: population
      ? Number.parseInt(population, 10)
      : null,
    };

    //console.log("Destination city:", city);

    const [weather, attraction, image, currency] = await Promise.all ([
      getWeather(city.latitude,city.longitude), 
      getNearbyAttractions(city.latitude, city.longitude),
      getCityImage(city.cityName),
      getCurrencyInfo(city.countryCode),
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
