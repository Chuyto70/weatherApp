import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useWeather } from '../hooks/useWeather'
import './FeaturesInfo.css'
import { CardsComponents } from './miniComponents/CardsComponents'
import { WeekTime } from './miniComponents/WeekTime'

export const FeaturesInfo = () => {
const { forecast ,forecastF, currentWeather, currentWeatherF, farenheit } = useSelector(state=>state.weather)

  return (
    <>
        {
          farenheit
          ?<CardsComponents forecast={forecastF} weather={currentWeatherF} />
          :<CardsComponents forecast={forecast} weather={currentWeather} />
        }
    </>
  )
}
