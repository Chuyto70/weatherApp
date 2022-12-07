
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { calltoApi } from '../api/calltoApi'
import './App.css'
import { FeaturesInfo } from './components/FeaturesInfo'
import { MainInfo } from './components/MainInfo'
import { LoadingComponent } from './components/miniComponents/LoadingComponent'
import { useWeather } from './hooks/useWeather'
import { onChecking } from './store/reducers/weatherSlice'

 const App = ()=> {

  const { getCurrentLatLon,getCurrentWeatherFarenheit } = useWeather()
  const dispatch = useDispatch()
  const {isLoading} = useSelector(state=>state.weather)
  const {city,currentWeather} = useSelector(state=>state.weather) 

  useEffect(() => {
    getCurrentLatLon(city)
    
  }, [city]);
  
  
  if(isLoading){
    return <LoadingComponent/>
  }
  return (
    <div className="App">
      
      <MainInfo />
      <FeaturesInfo/>
        
      
    </div>
  )
}

export default App
