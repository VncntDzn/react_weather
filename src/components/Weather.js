import React, { useState } from 'react';
import '../styles/weather.scss';
import axios from 'axios';
import moment from 'moment';



export default function Weather() {

    const [location, setLocation] = useState('Philippines');
    const [weather, setWeather] = useState({});


    const retrieveWeather = async () => {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=71655ad9b62c3bd8ce364441183c9efb`);
        setWeather(response.data)
        console.log(weather);
    };

    return (
        <div>
            <section className="weather" >
                <div className="weather__background" />
                <div className="weather__title">
                    <h1>Weather</h1>
                </div>

                <div className="weather__input">
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required autoFocus placeholder="Enter a Country..." />
                    <button type="submit" onClick={retrieveWeather}>Search</button>
                </div>


                <div className="weather__details">
                    {(typeof weather.main !== "undefined") ? (
                        <div>
                            {/* needs a single div to render data */}
                            <div className="weather__details__location">

                                <div className="weather__details__location--info">
                                    <img alt="icon" height="35px" src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} />
                                    <h1>{weather.main.temp}°</h1>

                                    <div className="weather__details__location--info--time_loc">
                                        <p> {weather.name}, <span style={{ fontSize: "18px" }}> {moment().format("HH:mm A")}</span></p>
                                        <p style={{ fontSize: "18px" }}> {moment().format("MMMM DD, YYYY")}</p>
                                    </div>

                                </div>

                                <div className="weather__details__location--main">
                                    <div>
                                        <p>Sunrise <i className="fa fa-sun-o fa-spin" /><span> {moment.unix(weather.sys.sunrise).format("HH:mm A")}</span></p>
                                    </div>
                                    <div>
                                        <p>Sunset <i className="fa fa-sun-o fa-spin" /><span> {moment.unix(weather.sys.sunset).format("HH:mm A")}</span></p>
                                    </div>
                                    <div>
                                        <p>Feels like: {weather.main.feels_like}</p>
                                        <p>Maximum temperature: {weather.main.temp_max}</p>
                                        <p>Minimum temperature: {weather.main.temp_min}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : ('')}
                </div>

            </section>
        </div>
    )
}
