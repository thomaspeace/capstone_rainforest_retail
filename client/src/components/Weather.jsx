import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/Weather.css';
import { Card } from 'react-bootstrap';



const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = '40fef30053fea6f30c11838982ef7d32';
  const city = 'LONDON';

  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=London&appid=40fef30053fea6f30c11838982ef7d32&units=metric`)
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
      {/* <h1>Weather in {weatherData.name}</h1>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p> */}
   

    <Card className='weather-carousel-card'>
    <Card.Title className='weather-carousel-card-title'>Weather</Card.Title>
    <Card.Body className='weather-carousel-card-body'>
    <p>Temperature: {weatherData.main.temp}°C</p>
    <p>Weather: {weatherData.weather[0].description}</p>
    </Card.Body>
    </Card>
</>

  );
}

export default Weather;
