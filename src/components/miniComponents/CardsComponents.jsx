import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useWeather } from '../../hooks/useWeather'
import { onSetF } from '../../store/reducers/weatherSlice'
import { WeekTime } from './WeekTime'

export const CardsComponents = ({weather, forecast}) => {
  
  const {getCurrentWeatherFarenheit} = useWeather()
  const {farenheit} = useSelector(state=>state.weather)
  const dispatch = useDispatch()
  const forecastDays = forecast.list
  const fRef = useRef()
  const cRef = useRef()
  
  const handleGrades = (e) => {
  
     if (cRef.current.classList[1] && !fRef.current.classList[1]) {
        getCurrentWeatherFarenheit()
        
        fRef.current.classList.add(cRef.current.classList[1])
        cRef.current.classList.remove(cRef.current.classList[1])
        
     }else{

      cRef.current.classList.add(fRef.current.classList[1])
      dispatch(onSetF())
      fRef.current.classList.remove(fRef.current.classList[1])
      
     }
      
  }
  return (
    <>
      <div className='mainFeatures '>
        <div className='gradesContainer'>
            <button ref={cRef} className={`centigrades ${farenheit ? ' ' : 'activeGrades'}`} onClick={handleGrades}>°C</button>
            <button ref={fRef} className={`farenheit ${farenheit ? 'activeGrades' : ' '}`} onClick={handleGrades}>°F</button>
        </div>
        
        <div className="mainContentWeek animate__animated animate__backInDown animate__fast">

          {
           forecastDays?.map(element=>{
            const actualDate = new Date(element.dt_txt).toLocaleDateString('en-us', {weekday:'short', day:'numeric' ,month:'short',hour12:true, hour:'numeric'})
            

           return  <WeekTime key={element.dt} title={actualDate} 
          image={`https://openweathermap.org/img/wn/${ element.weather[0].icon }@4x.png`}  
          gradeMetric={farenheit ? 'F' : 'C'}
          maxGrd={Math.round(element.main.temp_max)}
          minGrd={Math.round(element.main.temp_min)}
          />
           }

             
           )
          }
         
        </div>
         <div className="hightlightsContainer animate__animated animate__backInDown">
          <h2>Today's Hightlights</h2>

          <div className="hightlightsContent">

            <div className='hightlightsMainStyles'>
                <h3>Wind status</h3>
                <h1>{Math.round(weather.wind.speed) }<small>mph</small></h1>
                <div className='footerWind'>
                  <button className='wind'>
                  <i className='fa fa-location-arrow'></i>
                </button>
                <p>WSW</p>
                </div>
                
            </div>

             <div className='hightlightsMainStyles'>
                <h3>Humidity</h3>
                <h1>{weather.main.humidity}<small>%</small></h1>
                <div className='percentageContent'>
                 
                  <div className='percentageIndicators'>
                     <small>0</small><small>50</small><small>100</small>
                  </div>
                  <progress id="file" max="100" value={weather.main.humidity}> 70% </progress>
                </div>
              
            </div>

             <div className='hightlightsMainStyles hightlightsSecondLine'>
                <h3>Visibility</h3>
                <h1>{weather.visibility}<small>mtrs</small></h1>
            </div>

            <div className='hightlightsMainStyles hightlightsSecondLine'>
                <h3>Air Pressure</h3>
                <h1>{weather.main.pressure}<small>mb</small></h1>
            </div>

          </div>
         </div>
      </div>
    </>
  )
}

