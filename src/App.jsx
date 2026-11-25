
import { useState } from 'react';
import './App.css';

import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';

import { getWeather } from './services/weatherService';

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

            <SearchBar
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
                    <WeatherCard weather={weather} />

                    <WeatherDetails weather={weather} />
                </>
            )}

        </div>

    );

}

export default App;
