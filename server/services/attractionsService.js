

export async function getNearbyAttractions(
  latitude,
  longitude
) {

const API_KEY = process.env.OPENTRIPMAP_API_KEY;

if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return { 
      error: true, 
      code: "INVALID_COORDINATES", 
      message: "Invalid geographical coordinates." 
    };
  }

  try {
  const params = new URLSearchParams({
    radius: "5000",
    lon: String(longitude),
    lat: String(latitude),
    rate: "2",
    format: "json",
    limit: "12",
    apikey: API_KEY,
  });

  const url =
    `https://api.opentripmap.com/0.1/en/places/radius?` +
    params.toString();

  const response = await fetch(url);

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);  

    if (response.status === 429) {
        return { error: true, code: "LIMIT_REACHED", message: "Daily API request limit exceeded." };
  }
        return { 
        error: true, 
        code: "API_ERROR", 
        message: errorData?.reason || "The NearbyAttraction service returned an error." 
      };
    }

  const places = await response.json();

  const formattedPlaces = places
    .filter((place) => place.name?.trim())
    .map((place) => ({
      id: place.xid,
      name: place.name,
      categories: place.kinds
        ? place.kinds.split(",")
        : [],
      distance: place.dist ?? null,
      latitude: place.point?.lat ?? null,
      longitude: place.point?.lon ?? null,
    }));

    
  return {
      error: false,
      data: formattedPlaces
  };

} catch (err) {
    console.error("Attraction Fetch Error:", err);
    return { error: true, code: "NETWORK_ERROR", message: "Failed to connect to OPENTRIPMAP provider." 
    };
  }
}

