
export async function getCityImage(cityName) {
  // A kulcsot a .env fájlodból olvassuk ki biztonsági okokból
  const accessKey = process.env.UNSPLASH_ACCESS_KEY; 
  
  // A keresés: a város neve, tájkép (landscape) formátum, és csak 1 db kép kell
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

    // Ha nincs találat a városra, visszaadunk null-t, így a frontend tudja, hogy nem kell képet mutatni
    if (data.results.length === 0) {
      return null; 
    }

    const image = data.results[0];

    // Csak a legszükségesebb adatokat küldjük át a React frontendnek
    return {
      imageUrl: image.urls.regular,        // Közepes méretű, webre optimalizált kép
      altDescription: image.alt_description,
      photographerName: image.user.name,   // A fotós neve a kredithez
    };
  } catch (error) {
    console.error("Image Service Error:", error);
    // Hiba esetén ne omoljon össze a backend, csak jelezzük, hogy nincs kép
    return null; 
  }
}