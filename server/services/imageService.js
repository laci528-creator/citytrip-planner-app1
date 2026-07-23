
export async function getCityImage(cityName) {

  const accessKey = process.env.UNSPLASH_ACCESS_KEY; 
  
  const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&orientation=landscape&per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      throw new Error("Hiba a kép lekérésekor");
    }

    const data = await response.json();

    if (data.results.length === 0) {
      return null; 
    }

    const image = data.results[0];

    return {
      imageUrl: image.urls.regular,       
      altDescription: image.alt_description,
      photographerName: image.user.name,  
    };
  } catch (error) {
    console.error("Image Service Error:", error);
    return null; 
  }
}