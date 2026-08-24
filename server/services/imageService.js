
export async function getCityImage(cityName) {

  const accessKey = process.env.UNSPLASH_ACCESS_KEY; 

  if (!accessKey) {
  return {
    error: true,
    code: "MISSING_API_KEY",
    message: "The image service is unavailable.",
  };
}

    const params = new URLSearchParams({
      query: cityName,
      orientation: "landscape",
      per_page: "1",
    });
  
  const url = `https://api.unsplash.com/search/photos?${params.toString()}`;

  //console.log("Unsplash search:", cityName);

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${accessKey}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      if (response.status === 429) {
        return { error: true, code: "LIMIT_REACHED", message: "Image API request limit exceeded. Please try again later." };
      }

      return { 
        error: true, 
        code: "API_ERROR", 
        message: errorData?.reason || "The Image service returned an error." 
      };
    }

    const data = await response.json();

    if (!Array.isArray(data.results)) {
      return {
        error: true,
        code: "INVALID_RESPONSE",
        message: "The image service returned unexpected data.",
      };
    }

    if (data.results.length === 0) {
      return { 
        error: false, 
        code: "NO_IMAGE", 
        message: "No image was found for this city." }; 
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