
import React, { useEffect } from 'react'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWeather } from '../hooks/useWeather'
import { onChangeInput, onSetF } from '../store/reducers/weatherSlice'
import './MainInfo.css'

export const MainInfo = () => {
  const {currentWeather, isLoading, currentWeatherF, farenheit} = useSelector(state=>state.weather)

    const actualDate = new Date()
    const options = { weekday:'short', day:'numeric', month:'short'}
    const mainDate = actualDate.toLocaleDateString('en-us', options)
    const icon = isLoading ? '../src/assets/Clear.png' : `https://openweathermap.org/img/wn/${ currentWeather.weather[0].icon }@4x.png` 
    const inputRef = useRef()
    const dispatch = useDispatch()
    const {getCurrentPosition} = useWeather()


   useEffect(() => {

    if(inputRef.current){
  
      inputRef.current.addEventListener('keypress', (e) => {
        
        if(e.code === "Enter"){
          
          dispatch(onChangeInput(inputRef.current.value))
        }
      })
    }
    
   }, []);


   const handleCurrentLocationButton = () => {

    if(navigator){

      navigator.geolocation.getCurrentPosition((e)=>{
        console.log(e.coords);
        getCurrentPosition({lat:e.coords.latitude, lon: e.coords.longitude })
      })
    }
   }
  

  return (
    <div className='mainInfo '>
      <div className='contentMain animate__animated animate__backInDown animate__faster'>
        
       <div className='inputArea'>
            <input type="text" placeholder='Search for places' ref={inputRef} />
            <button onClick={handleCurrentLocationButton}>
                <img  className='locationImg' src="../src/assets/location.svg" alt="" />
            </button>
        </div>


        <div className='currentWeather'>
          <img src={icon} alt="" />
        </div>

        <div className='currentGrades'>

          {
            farenheit
              ? (<><h1>{Math.round(currentWeatherF.main.temp) }</h1> <small>°F</small></> )
              :(<><h1>{Math.round(currentWeather.main.temp) }</h1> <small>°C</small></> )
          }
          
          
        </div>
       
        <div className='currentStatus'>
          <h1>{currentWeather.weather[0].main}</h1>
         
        </div>

        <div className='currentDate center'>
         <p>Today  •  {mainDate}</p>
         
        </div>

         <div className='currentLocation center'>
          <i className='fa fa-map-marker' aria-hidden="true"></i>
          <p>{currentWeather.name}</p>
         
        </div>
      </div>
        
    </div>
  )
}
