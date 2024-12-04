"use client";

import React, { useState, useEffect } from "react";
import { BorderBeam } from "../ui/border-beam";
import { Sun, CloudRain, Wind, Droplet, Thermometer } from "lucide-react"; // Import icons from lucide-react

const WeatherApp = () => {
	const [weatherData, setWeatherData] = useState(null);
	const [forecastData, setForecastData] = useState(null);
	const [location, setLocation] = useState(null);
	const [error, setError] = useState(null);

	const apiKey = "401fae30399545d09cc135616240412";
	const apiUrl = location
		? `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location.lat},${location.lon}`
		: `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=New York`;
	const forecastUrl = location
		? `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location.lat},${location.lon}&days=3`
		: `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=New York&days=3`;

	useEffect(() => {
		// Get user location
		const getLocation = () => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						const { latitude, longitude } = position.coords;
						setLocation({ lat: latitude, lon: longitude });
					},
					(err) => {
						setError("Unable to retrieve your location.");
						console.error(err);
					}
				);
			} else {
				setError("Geolocation is not supported by this browser.");
			}
		};

		getLocation();
	}, []);

	useEffect(() => {
		if (location) {
			// Fetch current weather data
			const fetchWeatherData = async () => {
				try {
					const response = await fetch(apiUrl);
					if (!response.ok) throw new Error("Weather data not found.");
					const data = await response.json();
					setWeatherData(data);
					setError(null);
				} catch (err) {
					setError(err.message);
					setWeatherData(null);
				}
			};

			// Fetch forecast data
			const fetchForecastData = async () => {
				try {
					const response = await fetch(forecastUrl);
					if (!response.ok) throw new Error("Forecast data not found.");
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
		<div className="flex flex-col items-center justify-center">
			{error && <p className="text-red-500 mb-4">{error}</p>}

			{!location && !error && (
				<p className="text-sm text-gray-500">Fetching your location...</p>
			)}

			{weatherData && (
				<div className="relative rounded-xl shadow-lg p-4 bg-white dark:bg-gray-800 transition-all duration-300">
					<h2 className="text-2xl font-semibold text-center my-2 text-transparent bg-clip-text bg-gradient-to-r from-[#16a32a] to-teal-500 ">
						{weatherData.location.name}, {weatherData.location.country}
					</h2>

					<div className="grid grid-cols-2 gap-2">
						<div className="flex items-center text-sm mb-1">
							<Thermometer className="mr-2 text-[#16a34a]" />
							Temperature: {weatherData.current.temp_c}°C
						</div>

						<div className="flex items-center text-sm mb-1">
							<CloudRain className="mr-2 text-[#16a34a]" />
							Condition: {weatherData.current.condition.text}
						</div>

						<div className="flex items-center text-sm mb-1">
							<Droplet className="mr-2 text-[#16a34a]" />
							Humidity: {weatherData.current.humidity}%
						</div>

						<div className="flex items-center text-sm mb-1">
							<Wind className="mr-2 text-[#16a34a]" />
							Wind: {weatherData.current.wind_kph} km/h
						</div>
					</div>

					{forecastData && (
						<div>
							<h2 className="text-md font-semibold text-center my-2">
								3-Day Forecast
							</h2>
							<div className="grid grid-cols-2 gap-2">
								{forecastData.forecast.forecastday.map((day) => (
									<div
										key={day.date}
										className="border p-2 rounded-lg bg-gray-100 dark:bg-gray-700"
									>
										<h3 className="text-sm font-semibold">
											{new Date(day.date).toLocaleDateString()}
										</h3>
										<div className="flex items-center">
											<Thermometer className="mr-1 text-[#16a34a]" />
											<p className="text-sm mb-1">Max: {day.day.maxtemp_c}°C</p>
										</div>
										<div className="flex items-center">
											<Thermometer className="mr-1 text-[#16a34a]" />
											<p className="text-sm mb-1">Min: {day.day.mintemp_c}°C</p>
										</div>
										<div className="flex items-center">
											<CloudRain className="mr-1 text-[#16a34a]" />
											<p className="text-sm mb-2">
												Condition: {day.day.condition.text}
											</p>
										</div>
									</div>
								))}
							</div>
						</div>
					)}

					<BorderBeam />
				</div>
			)}
		</div>
	);
};

export default WeatherApp;
