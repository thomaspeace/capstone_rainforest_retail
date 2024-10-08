import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Weather.css';
import { Card } from 'react-bootstrap';

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const VITE_OPENWEATHER_API = import.meta.env.VITE_OPENWEATHER_API;

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${VITE_OPENWEATHER_API}&units=metric`)
      .then(response => {
        setWeatherData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
<>
    <Card className='weather-carousel-card-class'>
      <Card.Title className='weather-carousel-card-title'>Weather</Card.Title>
        <Card.Body className='weather-carousel-card-body'>
          <p className='weather-carousel-card-p'>Temperature: {weatherData.main.temp}°C</p>
          <p className='weather-carousel-card-p'>Weather: {weatherData.weather[0].description}</p>
          <p className='weather-carousel-card-p'>Humidity: {weatherData.main.humidity}%</p>
          <p className='weather-carousel-card-p last-p'>Wind Speed: {weatherData.wind.speed} m/s</p>
      </Card.Body>
    </Card>
</>

  );
}

export default Weather;
