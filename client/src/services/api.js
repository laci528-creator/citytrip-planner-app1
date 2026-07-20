const BASE_URL = import.meta.env.VITE_API_URL;

export async function searchCity(query) {
const trimmedQuery = query.trim();

  if (trimmedQuery.length < 2) {
    throw new Error("Please enter at least 2 characters.");
  }
  const url = `${BASE_URL}/search?query=${encodeURIComponent(trimmedQuery)}`;

  console.log("Request URL:", url);

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || "The city search was unsuccessful."
    );
  }

  return response.json();
}


