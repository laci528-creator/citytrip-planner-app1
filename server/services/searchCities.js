

export async function getCity(query) {
  const searchUrl =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(query)}` +
    `&count=5` +
    `&language=en` +
    `&format=json`;

  const response = await fetch(searchUrl);

  if (!response.ok) {
    throw new Error("The city search service returned an error.");
  }

  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map((city) => ({
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    population: city.population ?? null,
    country: city.country,
    countryCode: city.country_code,
    admin1: city.admin1,
  }));
}

