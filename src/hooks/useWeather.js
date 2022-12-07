
import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calltoApi, calltoApiWeather } from '../../api/calltoApi'
import { onChangeInput, onChecking, onSetCurrentForecast, onSetCurrentForecastF, onSetCurrentWeather, onSetCurrentWeatherF, onSetF, onSetLatLon } from '../store/reducers/weatherSlice'
import Swal from 'sweetalert2'

export const useWeather = () => {
     const dispatch =  useDispatch()
    const {location, currentWeatherF,forecastF, forecast   ,currentWeather, isLoading} = useSelector(state=>state.weather)
  
    const getCurrentPosition = async ({lat, lon}) => {
        
        try {
       
        dispatch(onSetLatLon([{lat, lon}]))
        const {data:weather }= await calltoApiWeather.get(`weather?lat=${lat}&lon=${lon}&appid=f30a155f2006f62d4f43ad680d729076&units=metric`)
        
        dispatch(onSetCurrentWeather(weather))


        const uri = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=f30a155f2006f62d4f43ad680d729076&cnt=5&units=metric`
        const {data:forecast} = await axios.get(uri)

        dispatch(onSetCurrentForecast(forecast))
        } catch (error) {
            
            Swal.fire('No lo ubicamos =(', 'Intente de otra manera', 'error')
            dispatch(onSetCurrentForecast(forecast))
            dispatch(onSetCurrentWeather(currentWeather))
          
             console.log(error)
        }
        
    } 
    const getCurrentLatLon = async(city) => {

        try {
                  const {data:loca} =  await calltoApi.get(`direct?q=${city}&limit=1&appid=f30a155f2006f62d4f43ad680d729076`)
                  
                  dispatch(onSetLatLon(loca))
                  
                  
                  const {data:weather }= await calltoApiWeather.get(`weather?lat=${loca[0].lat}&lon=${loca[0].lon}&appid=f30a155f2006f62d4f43ad680d729076&units=metric`)
              
                  dispatch(onSetCurrentWeather(weather))

                  const uri = `https://api.openweathermap.org/data/2.5/forecast?lat=${loca[0].lat}&lon=${loca[0].lon}&appid=f30a155f2006f62d4f43ad680d729076&cnt=5&units=metric`

                const {data:forecast} = await axios.get(uri)
                dispatch(onSetCurrentForecast(forecast))
                    
        } catch (error) {
            
            Swal.fire('No lo ubicamos =(', 'Intente de otra manera', 'error')
                
            dispatch(onSetLatLon(currentWeather.coord))
            dispatch(onSetCurrentForecast(forecast))
            dispatch(onSetCurrentWeather(currentWeather))
            
            console.log(error)
            
        }
    }


    const getCurrentWeatherFarenheit = async () => {

        try {
            if(!currentWeatherF.weather || (currentWeatherF.name !== currentWeather.name)){
            dispatch(onChecking())
            const {data:weatherF }= await calltoApiWeather.get(`weather?lat=${location[0].lat}&lon=${location[0].lon}&appid=f30a155f2006f62d4f43ad680d729076&units=imperial`)

            dispatch(onSetCurrentWeatherF(weatherF))

            const uri = `https://api.openweathermap.org/data/2.5/forecast?lat=${location[0].lat}&lon=${location[0].lon}&appid=f30a155f2006f62d4f43ad680d729076&cnt=5&units=imperial`

            const {data:forecast} = await axios.get(uri)
            dispatch(onSetCurrentForecastF(forecast))
        }else{
             dispatch(onSetCurrentWeatherF(currentWeatherF))
             dispatch(onSetCurrentForecastF(forecastF))
             
        }
            
        } catch (error) {
            console.log(error)
        }

        


        
        
        
        
    }
   


    return{

        /* Properties */



        /*Methods*/ 
        getCurrentLatLon,
        getCurrentWeatherFarenheit,
        getCurrentPosition
    }
}

