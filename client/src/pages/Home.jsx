import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { searchCity } from "../services/api";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearchTerm, setLastSearchTerm] = useState("");
  const [city, setCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(event) {
    event.preventDefault();

    const trimmedSearchTerm = searchTerm.trim();

    if (!trimmedSearchTerm) {
      setErrorMessage("Please enter a search term.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage("");
      setCity(null);

      const cityData = await searchCity(trimmedSearchTerm);

      setCity(cityData);
      setLastSearchTerm(trimmedSearchTerm);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <h1>Urlaub Planer</h1>
      <p>Search for your holiday destination.</p>

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />

      {isLoading && <p>Searching...</p>}

      {errorMessage && <p>{errorMessage}</p>}

      {city && (
        <section>
          <h2>
            {city.name}, {city.country}
          </h2>

          <p>Latitude: {city.latitude}</p>
          <p>Longitude: {city.longitude}</p>

          {city.population !== null && (
            <p>Population: {city.population.toLocaleString()}</p>
          )}
        </section>
      )}

      {lastSearchTerm && <p>Last search: {lastSearchTerm}</p>}
    </main>
  );
}

export default Home;