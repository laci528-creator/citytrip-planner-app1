const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export async function fetchCitySuggestions(query) {
    const params = new URLSearchParams({
    query: query.trim(),
  });

  const response = await fetch(`${BASE_URL}/cities/search?${params.toString()}`);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error( 
      errorData?.message || "The city search service returned an error."
    );
  }
  
  return await response.json();
}

export async function searchCity(selectedCity) {
  const queryParams = new URLSearchParams({
    lat: selectedCity.latitude,
    lon: selectedCity.longitude,
    name: selectedCity.name,
    country: selectedCity.country ?? "",
    countryCode: selectedCity.countryCode ?? "",
    population: selectedCity.population ?? "",
  });

  const response = await fetch(`${BASE_URL}/cities/details?${queryParams}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch destination data.");
  }
  
  return await response.json();
}