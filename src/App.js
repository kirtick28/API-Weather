import React, { useState } from 'react';
import './App.css';

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = '1635890035cbba097fd5c26c8ea672a1'; // OpenWeatherMap API key

  const searchWeather = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`
      );
      
      if (!response.ok) {
        throw new Error('Location not found');
      }

      const data = await response.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Weather Forecast</h1>
        
        <form onSubmit={searchWeather} className="search-form">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter city name..."
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        {loading && <div className="loading">Loading...</div>}
        
        {error && <div className="error">{error}</div>}

        {weather && (
          <div className="weather-card">
            <div className="weather-header">
              <h2>{weather.name}, {weather.sys.country}</h2>
            </div>
            
            <div className="weather-info">
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
                className="weather-icon"
              />
              
              <div className="temperature">
                <h3>{Math.round(weather.main.temp)}°C</h3>
                <p>{weather.weather[0].description}</p>
              </div>
            </div>

            <div className="weather-details">
              <div className="detail">
                <span>Feels like</span>
                <span>{Math.round(weather.main.feels_like)}°C</span>
              </div>
              <div className="detail">
                <span>Humidity</span>
                <span>{weather.main.humidity}%</span>
              </div>
              <div className="detail">
                <span>Wind Speed</span>
                <span>{weather.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
