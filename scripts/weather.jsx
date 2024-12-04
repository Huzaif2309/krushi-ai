"use client"

import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardBody, CardFooter } from 'shadcn-ui'; // Import Shadcn components
import { Button } from 'shadcn-ui'; // Import any other components you need

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '401fae30399545d09cc135616240412';
  const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location ? `${location.lat},${location.lon}` : 'New York'}`;
  const forecastUrl = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location ? `${location.lat},${location.lon}` : 'New York'}&days=3`;

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ lat: latitude, lon: longitude });
          },
          (error) => {
            setError('Unable to retrieve your location');
            console.error(error);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };

    getLocation();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeatherData = async () => {
        try {
          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error('Weather data not found');
          }
          const data = await response.json();
          setWeatherData(data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setWeatherData(null);
        }
      };

      const fetchForecastData = async () => {
        try {
          const response = await fetch(forecastUrl);
          if (!response.ok) {
            throw new Error('Forecast data not found');
          }
          const data = await response.json();
          setForecastData(data);
          setError(null);
        } catch (err) {
          setError(err.message);
          setForecastData(null);
        }
      };

      fetchWeatherData();
      fetchForecastData();
    }
  }, [location]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-800">
      <h1 className="text-4xl font-bold mb-6">Weather App</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      {!location && !error && (
        <p className="text-lg text-gray-500">Fetching your location...</p>
      )}

      <div className="flex space-x-4">
        {weatherData && location && (
          <Card className="bg-white shadow-md w-80 p-4">
            <CardHeader>
              <h2 className="text-2xl font-semibold">
                {weatherData.location.name}, {weatherData.location.country}
              </h2>
            </CardHeader>
            <CardBody>
              <p className="text-lg mb-2">Temperature: {weatherData.current.temp_c}°C</p>
              <p className="text-lg mb-2">Condition: {weatherData.current.condition.text}</p>
              <p className="text-lg mb-2">Humidity: {weatherData.current.humidity}%</p>
              <p className="text-lg mb-4">Wind: {weatherData.current.wind_kph} km/h</p>
              <img
                src={weatherData.current.condition.icon}
                alt={weatherData.current.condition.text}
                className="mx-auto mb-4"
                style={{ width: '50px', height: '50px' }}
              />
            </CardBody>
          </Card>
        )}

        {forecastData && (
          <Card className="bg-white shadow-md w-80 p-4">
            <CardHeader>
              <h2 className="text-2xl font-semibold">3-Day Forecast</h2>
            </CardHeader>
            <CardBody>
              {forecastData.forecast .forecastday.map((day) => (
                <div key={day.date} className="mb-4">
                  <h3 className="text-lg font-semibold">{new Date(day.date).toLocaleDateString()}</h3>
                  <p className="text-lg mb-2">Max Temp: {day.day.maxtemp_c}°C</p>
                  <p className="text-lg mb-2">Min Temp: {day.day.mintemp_c}°C</p>
                  <p className="text-lg mb-2">Condition: {day.day.condition.text}</p>
                  <img
                    src={day.day.condition.icon}
                    alt={day.day.condition.text}
                    className="mx-auto mb-2"
                    style={{ width: '50px', height: '50px' }}
                  />
                </div>
              ))}
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;