import React, { useState } from 'react'
import axios from 'axios'

const API_KEY = process.env.REACT_WHEATER_API_KEY

const Weather = ({ country }) => {
    const [ weather, setWeather ] = useState(null);

    axios
        .get(`http://api.weatherstack.com/current?access_key=${API_KEY}&query=${country.name.common}`
        )
        .then(response => {
            console.log('promise fulfilled', response)
            if (!response.data.success) {
                setWeather(null)
            } else{
                setWeather(response.data.current);
            }
        })
        .catch(error => {
            setWeather(null)
        })

    if ( weather === null) {
        return <div></div>
    }
    return <div>
        <h2>Wheater in {country.name.common}</h2>
        <div><b>temperature: </b> {weather.temperature} Celcius</div>
        <div><img src={weather.weather_icons[0]}/></div>
        <div><b>wind: </b> {weather.wind_speed} mph direction {weather.wind_dir}</div>
    </div>
}

export default Weather