import { createSlice } from '@reduxjs/toolkit'
const initialState = {
       isLoading:true,
       city: 'London',
       farenheit :false, 
       currentWeather:{
         },
       
       currentWeatherF:{

       },  
       forecast:{},
       location:{},
       forecastF:{}

      }
export const weatherSlice = createSlice({
     name: 'weather',
     initialState,
     reducers: {
     onChecking: (state) => {
       state.isLoading = true
       state.farenheit = false     
     },
     onChangeInput:(state, {payload})=>{
      state.isLoading = true
      state.farenheit = false
      state.city = payload
      
     }
     ,
     onSetF:(state) =>{
      state.farenheit = false 
     },
     onSetLatLon: (state, {payload}) => {
        state.isLoading = true
        state.farenheit = false
        state.location = payload
     },
     onSetCurrentWeather: (state, {payload}) => {
          state.isLoading = false
          state.currentWeather = payload
     },
     onSetCurrentForecast: (state, {payload}) =>{
        state.isLoading = false
        state.forecast = payload
     },
     onSetCurrentWeatherF:(state, {payload})=>{
      state.isLoading = false 
      state.currentWeatherF = payload
      state.farenheit = true
     },
     onSetCurrentForecastF:(state, {payload})=>{
        state.forecastF = payload 
        state.isLoading= false
     },
     


  },
})
export const {onSetF, onChecking,onSetLatLon,onSetCurrentWeather, onSetCurrentForecast,onChangeInput,onSetCurrentWeatherF,onSetCurrentForecastF} = weatherSlice.actions