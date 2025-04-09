import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = "YOUR_API_KEY_HERE"; // Replace with your OpenWeatherMap API key

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError('');
    try {
      const res = await axios.get(
        \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${API_KEY}&units=metric\`
      );
      setWeather(res.data);
    } catch (err) {
      setError('City not found or API error.');
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') fetchWeather();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-500 to-indigo-500 text-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">🌤️ Weather Dashboard</h1>
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter city"
          className="px-4 py-2 rounded text-black"
        />
        <button
          onClick={fetchWeather}
          className="bg-white text-blue-700 font-bold px-4 py-2 rounded hover:bg-gray-200"
        >
          Search
        </button>
      </div>
      {loading && <p className="text-lg">Loading...</p>}
      {error && <p className="text-red-200">{error}</p>}
      {weather && (
        <div className="bg-white text-black rounded-xl p-6 shadow-md w-full max-w-md">
          <h2 className="text-xl font-bold mb-2">{weather.name}</h2>
          <p className="text-lg">🌡️ {weather.main.temp} °C</p>
          <p>🌥️ {weather.weather[0].main}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} km/h</p>
          <img
            src={\`https://openweathermap.org/img/wn/\${weather.weather[0].icon}@2x.png\`}
            alt="weather icon"
            className="mx-auto"
          />
        </div>
      )}
    </div>
  );
}

export default App;