import React, { useState, useEffect } from 'react';
import {
  WiDaySunny,
  WiNightClear,
  WiDayCloudy,
  WiNightAltCloudy,
  WiCloudy,
  WiRain,
  WiShowers,
  WiThunderstorm,
  WiSnow,
  WiFog,
} from 'react-icons/wi';
import './Weather.css'; // Import CSS for animations

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [searchCity, setSearchCity] = useState('');
  const [displayTemp, setDisplayTemp] = useState(0); // State to handle temperature display animation

  useEffect(() => {
    if (searchCity) {
      weatherFetch(searchCity);
    }
    document.body.style.backgroundColor = "#000435";
  }, [searchCity]);

  useEffect(() => {
    if (weatherData) {
      let startTemp = 0;
      const endTemp = convert(weatherData.main.temp);
      const duration = 2000; // Duration of the animation in milliseconds
      const increment = (endTemp / duration) * 10;

      const interval = setInterval(() => {
        startTemp += increment;
        if (startTemp >= endTemp) {
          startTemp = endTemp;
          clearInterval(interval);
        }
        setDisplayTemp(Math.round(startTemp));
      }, 10);

      return () => clearInterval(interval);
    }
  }, [weatherData]);

  const weatherFetch = async (city) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid={apiKey}`;
    try {
      const data = await fetch(url);
      if (!data.ok) {
        throw new Error('City not found');
      }
      const weatherData = await data.json();
      setWeatherData(weatherData);
      setCity('');
    } catch (error) {
      console.error(error);
      setWeatherData(null); // Reset weather data if city not found
    }
  };

  const convert = (kelvin) => {
    const celsius = kelvin - 273.15;
    return Math.round(celsius);
  };

  const getWeatherIcon = (weatherCode) => {
    switch (weatherCode) {
      case '01d':
        return { icon: <WiDaySunny size={50} />, color: '#FFD700', name: 'Sunny' };
      case '01n':
        return { icon: <WiNightClear size={50} />, color: '#4169E1', name: 'Clear Night' };
      case '02d':
        return { icon: <WiDayCloudy size={50} />, color: '#87CEEB', name: 'Partly Cloudy' };
      case '02n':
        return { icon: <WiNightAltCloudy size={50} />, color: '#708090', name: 'Partly Cloudy Night' };
      case '03d':
      case '03n':
      case '04d':
      case '04n':
        return { icon: <WiCloudy size={50} />, color: '#5F9EA0', name: 'Cloudy' }; // Light blue color for clouds
      case '09d':
      case '09n':
        return { icon: <WiShowers size={50} />, color: '#4682B4', name: 'Showers' };
      case '10d':
        return { icon: <WiRain size={50} />, color: '#6495ED', name: 'Rain' };
      case '10n':
        return { icon: <WiRain size={50} />, color: '#6495ED', name: 'Rain Night' };
      case '11d':
      case '11n':
        return { icon: <WiThunderstorm size={50} />, color: '#0000CD', name: 'Thunderstorm' };
      case '13d':
      case '13n':
        return { icon: <WiSnow size={50} />, color: '#87CEEB', name: 'Snow' };
      case '50d':
      case '50n':
        return { icon: <WiFog size={50} />, color: '#696969', name: 'Fog' };
      default:
        return null;
    }
  };
  
  const handleSearch = (event) => {
    event.preventDefault();
    setSearchCity(city);
  };

  return (
    <>
    <nav className="navbar" style={{backgroundColor: '#FFD700'}}>
  <div className="container-fluid">
    <span className="navbar-brand mb-0 h1">Weather</span>
  </div>
</nav>

    <div className='container mt-5'>
      <form className="d-flex mb-4" role="search" onSubmit={handleSearch}>
        <input
          className="form-control me-2"
          type="search"
          value={city}
          placeholder="Search for a city"
          aria-label="Search"
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>
      {weatherData ? (
        <div className="card text-center fade-in"> {/* Added fade-in class */}
          <div className="card-body">
            <h5 className="card-title">{weatherData.name}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{weatherData.weather[0].description}</h6>
            <div className="weather-icon" >
              <div className="icon-circle pulse" style={{ backgroundColor: getWeatherIcon(weatherData.weather[0].icon).color }}>
                {getWeatherIcon(weatherData.weather[0].icon).icon}
              </div>
              <span className="icon-name" >{getWeatherIcon(weatherData.weather[0].icon).name}</span>
            </div>
            <p className="temperature">{displayTemp}&deg;C</p>
            <div className="additional-info">
              <div className="info-item">
                <strong>Humidity:</strong> <span>{weatherData.main.humidity}%</span>
              </div>
              <div className="info-item">
                <strong>Wind Speed:</strong> <span>{weatherData.wind.speed} m/s</span>
              </div>
              <div className="info-item">
                <strong>Pressure:</strong> <span>{weatherData.main.pressure} hPa</span>
              </div>
              <div className="info-item">
                <strong>Feels Like:</strong> <span>{convert(weatherData.main.feels_like)}&deg;C</span>
              </div>
              <div className="info-item">
                <strong>Sunrise:</strong> <span>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</span>
              </div>
              <div className="info-item">
                <strong>Sunset:</strong> <span>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card text-center fade-in"> {/* Added fade-in class */}
          <div className="card-body">
            <h5 className="card-title">To get the weather, please enter the name of your city.</h5>
            <p className="card-text">
              <strong>Current Temperature:</strong> Indicates the actual temperature outside.<br />
              <strong>Humidity Level:</strong> Represents the amount of moisture in the air, which can affect how the temperature feels.<br />
              <strong>Feels Like Temperature:</strong> Gives a sense of what the temperature feels like to the human body when humidity and wind are considered.<br />
              <strong>Conditions:</strong> Describes the current state of the sky (e.g., clear, cloudy, rainy).<br />
              <strong>Wind Speed:</strong> Measures how fast the wind is blowing, which can impact comfort and safety.<br />
              <strong>Atmospheric Pressure:</strong> The pressure exerted by the weight of the atmosphere, often associated with weather changes (e.g., high pressure usually indicates fair weather, while low pressure can indicate stormy weather).
            </p>
          </div>
        </div>
      )}
    </div>
    </>
  );
};

export default Weather;
