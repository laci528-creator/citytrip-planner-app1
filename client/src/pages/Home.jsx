import { useState } from "react";

import SearchBar from "../components/SearchBar";
import CitySuggestions from "../components/CitySuggestions";
import CitySection from "../components/CitySection";
import CityMap from "../components/CityMap";
import WeatherSection from "../components/WeatherSection";
import AttractionSection from "../components/AttractionSection";

import { 
  searchCity, 
  fetchCitySuggestions 
} from "../services/api";


function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [city, setCity] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);


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
    setSuggestions([]);

    const data = await fetchCitySuggestions(trimmedSearchTerm);

    if (data.length === 0) {
      setErrorMessage("No cities found.");
    } else {
      setSuggestions(data);
    }
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setIsLoading(false);
  }
}


async function handleCitySelect(selectedCity) {
  setSuggestions([]);
  setSearchTerm(selectedCity.name); 

  try {
    setIsLoading(true);
    setErrorMessage("");

    const cityData = await searchCity(selectedCity);

    setCity(cityData);
  } catch (error) {
    setErrorMessage(error.message);
  } finally {
    setIsLoading(false);
  }
}

  return (
    <main className="main-container">
      <div className="hero-header" style={{ position: "relative" }}>
      <h1>CityTrip Planner</h1>
      <p>Plan your next urban adventure.</p>
      
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
      />
      <CitySuggestions 
        suggestions={suggestions} 
        onSelect={handleCitySelect} 
      />
      </div>

      {isLoading && <p className="status-message loading">Searching...</p>}

      {errorMessage && <p className="status-message error">{errorMessage}</p>}

        {city && (
                <div className="destination-results">
                <CitySection city={city.city} attractions={city.attraction} image={city.image} currency={city.currency} />
                <CityMap 
                    latitude={city.city.latitude} 
                    longitude={city.city.longitude} 
                    cityName={city.city.name} 
                    country={city.city.country} 
                    attractions={city.attraction} 
                  />
                <WeatherSection weather={city.weather} />
                <AttractionSection attraction={city.attraction} />
                </div>
            )}
            </main>
        );
    }


export default Home;
