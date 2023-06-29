import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Zabrze');

  const searchLocation = async (event) => {
    if (event.key === 'Enter') {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9fb572979deddf311431550e16a92c40`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error while fetching weather data:', error);
      }
      setLocation('');
    }
  };

  const convertToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=9fb572979deddf311431550e16a92c40`
        );
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error while fetching weather data:', error);
      }
    };

    fetchData();
  }, [location]);

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Wybierz miasto"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main && <h1>{convertToCelsius(data.main.temp).toFixed(2)}°C</h1>}
          </div>
          <div className="description">
            {data.weather && <p>{data.weather[0].main}</p>}
          </div>
        </div>

        {data.name && (
          <div className="bottom">
            <div className="feels">
              {data.main && (
                <p className="bold">
                  {convertToCelsius(data.main.feels_like).toFixed(2)}°C
                </p>
              )}
              <p>Odczuwalność</p>
            </div>
            <div className="humidity">
              {data.main && <p className="bold">{data.main.humidity}%</p>}
              <p>Wilgotność</p>
            </div>
            <div className="wind">
              {data.wind && <p className="bold">{data.wind.speed.toFixed()} MPH</p>}
              <p>Wiatr</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
