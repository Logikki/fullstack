import { useEffect, useState } from 'react'
import axios from "axios"


const Weather = ({c}) => {
    const [Weather, setWeather] = useState([])
    const [lat,lon] = c.latlng
    const api_key = process.env.REACT_APP_API_AVAIN
    const capital = c.capital

    useEffect (() => {
    const req = "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api_key+"&units=metric"
        axios
           .get(req)
           .then(response => {
            console.log("promise fullfilled")
            setWeather(response.data)
           }).catch(error => {console.log(error)},)
    },[])
    if (Weather.length != 0) {

    console.log(`sää : `+ JSON.stringify(Weather))
    const temperature = JSON.stringify(Weather.main.temp) + " celcius"
    return (
        <>
            <h2>Weather in {capital}</h2>
            <p>temperature {temperature}</p>
            <img src={`http://openweathermap.org/img/wn/${Weather.weather[0].icon}@2x.png`} alt="sääkuva"/>
            <p>wind {Weather.wind.speed} m/s</p>
            </>
    )
    }
}

export default Weather