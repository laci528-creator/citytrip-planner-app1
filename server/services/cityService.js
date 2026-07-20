

export async function getCity(query) {
  const searchUrl =
    `https://geocoding-api.open-meteo.com/v1/search` +
    `?name=${encodeURIComponent(query)}` +
    `&count=1` +
    `&language=en` +
    `&format=json`;

  const response = await fetch(searchUrl);

  if (!response.ok) {
    throw new Error("The city search service returned an error.");
  }

  const data = await response.json();
  const city = data.results?.[0];

  if (!city) {
    return null;
  }

  return {
    name: city.name,
    latitude: city.latitude,
    longitude: city.longitude,
    population: city.population ?? null,
    country: city.country,
    countryCode: city.country_code,
  };
}

