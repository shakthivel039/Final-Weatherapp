
import { useState } from 'react';
import './App.css';

// import SearchBar from './components/SearchBar.jsx';
// import WeatherCard from './components/WeatherCard.jsx';
// import WeatherDetails from './components/WeatherDetails.jsx';

import Searchbar from './components/Searchbar.jsx';
import Weathercard from './components/Weathercard.jsx';
import Weatherdetails from './components/Weatherdetails.jsx';
// import { getWeather } from './services/WeatherService.js';
import {getWeather} from '../src/services/Weatherservice.js';

function App() {

    const [city, setCity] = useState("");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSearch() {

        if (city.trim() === "") {
            setError("Please enter city name");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setWeather(null);

            const data = await getWeather(city.trim());

            setWeather(data);

        } catch (err) {

            console.log("Weather API Error:", err);

            setWeather(null);

            if (err.response?.status === 404) {

                setError("City not found! Please enter a valid city.");

            } else if (err.response?.status === 401) {

                setError("Invalid API Key or API Key not activated!");

            } else {

                setError("Unable to fetch weather. Please try again.");

            }

        } finally {

            setLoading(false);

        }

    }

    return (

        <div className="app">

            <h1 className="title">🌦️ Weather App</h1>

            <Searchbar
                city={city}
                setCity={setCity}
                handleSearch={handleSearch}
            />

            {loading && (
                <h3 className="loading">
                    Loading weather...
                </h3>
            )}

            {error && (
                <h3 className="error">
                    {error}
                </h3>
            )}

            {!loading && weather && (
                <>
                    <Weathercard weather={weather} />

                    <Weatherdetails weather={weather} />
                </>
            )}

        </div>

    );

}

export default App;
