
export async function getCity(query) {

const params = new URLSearchParams({
  name: query.trim(),
  count: "5",
  language: "en",
  format: "json",
});

const searchUrl =
  `https://geocoding-api.open-meteo.com/v1/search?${params.toString()}`;

  const response = await fetch(searchUrl);

  if (!response.ok) {
    throw new Error("The city search service returned an error.");
  }

  const data = await response.json();
  
  if (!Array.isArray(data.results)) {
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
