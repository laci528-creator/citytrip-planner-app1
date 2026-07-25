
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
      const errorData = await response.json().catch(() => null);

      if (response.status === 429) {
        return { error: true, code: "LIMIT_REACHED", message: "Image API request limit exceeded." };
      }

      return { 
        error: true, 
        code: "API_ERROR", 
        message: errorData?.reason || "The Image service returned an error." 
      };
    }

    const data = await response.json();

    if (data.results.length === 0) {
      return { error: false, code: "DONT HAVE PHOTO", message: "Image API dont have photo for this City." }; 
    }

    const image = data.results[0];

    return {
      error:false,
      imageUrl: image.urls.regular,       
      altDescription: image.alt_description,
      photographerName: image.user.name,
      photographerUrl: image.user.links.html,
      unsplashUrl: image.links.html,  
    };
  } catch (error) {
    console.error("Image Fetch Error:", error);
    return { error: true, code: "NETWORK_ERROR", message: "Failed to connect to Image provider." };
  }
}