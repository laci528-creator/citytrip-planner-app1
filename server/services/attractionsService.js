

export async function getNearbyAttractions(
  latitude,
  longitude
) {

const API_KEY = process.env.OPENTRIPMAP_API_KEY;

console.log(
  "OpenTripMap key loaded:",
  Boolean(process.env.OPENTRIPMAP_API_KEY)
);

  if (!API_KEY) {
    throw new Error("OpenTripMap API key is missing.");
  }

  if (
    !Number.isFinite(latitude) ||
    !Number.isFinite(longitude)
  ) {
    throw new Error("Invalid geographical coordinates.");
  }

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
    throw new Error(
      "The attractions service returned an error."
    );
  }

  const places = await response.json();

  return places
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
}