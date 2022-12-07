import React from 'react'
import './WeekTime.css'
export const WeekTime = ({title, image, maxGrd,minGrd, gradeMetric}) => {
  return (
    <>
      <div className='weekTimeCard'>
        <p> {title} </p>
        <img width='62px' src={image} alt={title} />
        <div className='footerGrades'>
        <small>{maxGrd}°{gradeMetric}</small>
        <small>{minGrd}°{gradeMetric}</small>
        </div>
      </div>
    </>
  )
}


