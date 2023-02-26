import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.css'
import axios from 'axios'

export default function Home() {

  const apiKey = 'd84ba8d519366eaa2a6a6175b10e3e81';
  const units = "metric";
  const location = "vancouver";
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=${units}&appid=${apiKey}`;

  const [data, setData] = useState();
  const grabWeather = useRef(false);
  

  const fetchWeather = async () => {
    const response = await axios.get(url);
    console.log(response);

    console.log(response.data.list);
    const arrayOfDays = [];

    let weatherData = response.data.list.map((weather, index) =>{
      console.log(parseInt(weather.dt_txt.substr(8,2),10))
      let num = parseInt(weather.dt_txt.substr(8,2),10)

      if (num !== arrayOfDays.find(element => element === num)){
        arrayOfDays.push(num);
        console.log("here");
        console.log(response.data.list[index]);

        var month ='';
        var icon ='';

        if (weather.dt_txt.substr(5,2) == 1){
          month = "January";
        } else if (weather.dt_txt.substr(5,2) == 2){
          month = "February";
        } else if (weather.dt_txt.substr(5,2) == 3){
          month = "March";
        } else if (weather.dt_txt.substr(5,2) == 4){
          month = "April";
        } else if (weather.dt_txt.substr(5,2) == 5){
          month = "May";
        } else if (weather.dt_txt.substr(5,2) == 6){
          month = "June";
        } else if (weather.dt_txt.substr(5,2) == 7){
          month = "July";
        } else if (weather.dt_txt.substr(5,2) == 8){
          month = "August";
        } else if (weather.dt_txt.substr(5,2) == 9){
          month = "September";
        } else if (weather.dt_txt.substr(5,2) == 10){
          month = "October";
        } else if (weather.dt_txt.substr(5,2) == 11){
          month = "November";
        } else if (weather.dt_txt.substr(5,2) == 12){
          month = "December";
        }

        if(weather.weather[0].main == "Clouds"){
          icon = '/icons/Broken-Clouds.svg'
        } else if(weather.weather[0].main == "Clear"){
          icon = '/icons/Clear-Sky.svg'
        } else if(weather.weather[0].main == "Atmosphere"){
          icon = '/icons/Mist.svg'
        } else if(weather.weather[0].main == "Rain"){
          icon = '/icons/Rain.svg'
        } else if(weather.weather[0].main == "Drizzle"){
          icon = '/icons/Shower-Rain.svg'
        } else if(weather.weather[0].main == "Snow"){
          icon = '/icons/Snow.svg'
        } else if(weather.weather[0].main == "Thunderstorm"){
          icon = '/icons/Thunderstrom.svg'
        } else if(weather.weather[0].temp >= 25 && weather.weather[0].main == "Clear"){
          icon = 'icons/sun.svg'
        }

        function getWeatherTypeClass(weatherType) {
          let weatherClass = '';
        
          if (weatherType === 'Clear') {
            weatherClass = styles.clear;
          } else if (weatherType === 'Clouds') {
            weatherClass = styles.clouds;
          } else if (weatherType === 'Rain' || weatherType === 'Drizzle') {
            weatherClass = styles.rain;
          } else if (weatherType === 'Thunderstorm') {
            weatherClass = styles.thunderstorm;
          } else if (weatherType === 'Snow') {
            weatherClass = styles.snow;
          } else if (weatherType === 'Atmosphere'){
            weatherClass = styles.atmosphere;
          }
        
          return weatherClass;
        }

        var now = new Date(weather.dt_txt);
        var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",]
        var day = days[now.getDay()]

        return (
          <div className={`${styles.card} ${getWeatherTypeClass(weather.weather[0].main)}`} key={index}>
            <h1> {day} </h1>
            <div> {month} {weather.dt_txt.substr(8,2)}, {weather.dt_txt.substr(0,4)}</div>
            <Image 
              src={icon}
              alt={icon}
              width={250}
              height={250}
              priority/>

              <div className={styles.temp}>
               <h2>{weather.main.temp.toFixed(1)}°</h2>
              </div>

              <p>{weather.weather[0].main}</p>
            
          </div>
        )
      }
    })
    console.log(arrayOfDays);
    setData(weatherData);
  }

  // useEffect(() => {
  //   if(grabWeather.current === true){
  //     fetchWeather()
  //   }

    return () => {
      grabWeather.current = true;
    }

  }, []);

  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;

  return (
    <div className={styles.container}>

      <Head>
        <title>20Fourcast</title>
        <meta name="description" content="Weather app using OpenWeatherAPI" />
        <link rel="icon" href="/Logo.svg" />
      </Head>

      <div className={styles.main}>

    
        <div className={styles.header}>
          <a href='https://port.sofiasirianni.ca'
            target="_blank">
            <p>By:{''} Sofia</p>
          </a>
          <p>{date}</p>
        </div>
          <Image
            src='/Logo.svg'
            alt="Weather Logo"
            width={200}
            height={200}
            priority />
          <h1>The Weather in Vancouver, BC</h1>

        <div className={styles.grid}>
          {data}
        </div>
      </div>
    </div>
  )
}
