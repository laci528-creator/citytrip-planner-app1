const BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchCitySuggestions(query) {
  const response = await fetch(`${BASE_URL}/cities/search?query=${query}`);
  
  if (!response.ok) {
    throw new Error("The city search service returned an error.");
  }
  
  return await response.json();
}

// 2. A teljes város adatainak lekérése (Promise.all a backendről)
export async function searchCity(selectedCity) {
  const queryParams = new URLSearchParams({
    lat: selectedCity.latitude,
    lon: selectedCity.longitude,
    name: selectedCity.name,
    countryCode: selectedCity.countryCode || "",
    population: selectedCity.population || ""
  });

  const response = await fetch(`${BASE_URL}/cities/details?${queryParams}`);
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.message || "Failed to fetch destination data.");
  }
  
  return await response.json();
}



