import React, { useEffect, useRef, useState } from 'react'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'




const Weather = () => {

 
  const inputRef=useRef()
  const [weatherData, setweatherData] = useState(false)

  const allIcons = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,

  }

  const search = async (city) => {
    if(city===""){
      alert("Enter city name");
      return;
    }
    
    
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=e7e31c751c0ab7674df8aa82f85550aa`;


      const respone = await fetch(url);
      const data = await respone.json();
      console.log(data)
    
      const icon = allIcons[data.weather[0].icon] || clear_icon;

      setweatherData({
        humidity: data.main.humidity,
        WindSpeed: data.wind.speed,
        Temperature: Math.floor(data.main.temp),
        Location: data.name,
        icon: icon

      })


    } catch (error) {

    }
  }
  useEffect(() => {
    search()
  }, [])

  return (
    <div className='weather'>

      <div className="searchbar">
        <input ref={inputRef}  type="text"  placeholder='Search ' />
        <img src={search_icon} alt="" onClick={()=>search(inputRef.current.value)} />
      </div>
      <img src={weatherData.icon}  alt="" className='weather-icon' />
      <p className='temp'>{weatherData.Temperature}°C</p>
      <p className='location'>{weatherData.Location}</p>
      <div className="weather-data">
        <div className="col">
          <img src={humidity_icon} alt="" />
          <div>
            <p>{weatherData.humidity}</p>
            <span>Humidity</span>
          </div>
        </div>

        <div className="col">
          <img src={wind_icon} alt="" />
          <div>
            <p>{weatherData.WindSpeed}</p>
            <span>Wind Speed</span>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Weather
