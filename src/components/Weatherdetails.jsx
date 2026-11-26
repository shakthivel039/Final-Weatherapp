import {
    Droplets,
    Wind,
    Thermometer
} from "lucide-react";

function Weatherdetails({ weather }) {

    if (!weather) {
        return null;
    }

    return (
        <div className="weather-details">

            <div className="detail-box">
                <Droplets size={30} />
                <h3>Humidity</h3>
                <p>{weather.main.humidity}%</p>
            </div>

            <div className="detail-box">
                <Wind size={30} />
                <h3>Wind Speed</h3>
                <p>{(weather.wind.speed * 3.6).toFixed(1)} km/h</p>
            </div>

            <div className="detail-box">
                <Thermometer size={30} />
                <h3>Temperature</h3>
                <p>{Math.round(weather.main.temp)}°C</p>
            </div>

        </div>
    );
}

export default Weatherdetails;