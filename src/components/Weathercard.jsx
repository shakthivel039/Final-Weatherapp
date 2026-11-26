import {
    Sun,
    Cloud,
    CloudSun,
    CloudRain,
    CloudSnow,
    CloudLightning,
    CloudDrizzle,
    CloudFog
} from "lucide-react";

function Weathercard({ weather }) {

    if (!weather) {
        return null;
    }

    const condition = weather.weather[0].main.toLowerCase();

    const weatherIcons = {
        clear: Sun,
        clouds: Cloud,
        rain: CloudRain,
        drizzle: CloudDrizzle,
        snow: CloudSnow,
        thunderstorm: CloudLightning,
        mist: CloudFog,
        haze: CloudFog,
        fog: CloudFog,
        smoke: CloudFog
    };

    const WeatherIcon = weatherIcons[condition] || CloudSun;

    return (
        <div className="weather-card">

            <h2>{weather.name}, {weather.sys.country}</h2>

            <div className="weather-main-icon">
                <WeatherIcon size={100} strokeWidth={1.5} />
            </div>

            <h1>{Math.round(weather.main.temp)}°C</h1>

            <h3>{weather.weather[0].description}</h3>

            <p>
                Feels Like {Math.round(weather.main.feels_like)}°C
            </p>

        </div>
    );
}

export default Weathercard;