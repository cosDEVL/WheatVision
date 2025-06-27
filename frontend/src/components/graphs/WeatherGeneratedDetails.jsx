import React, { useState } from 'react';
import TempPhaseGraph from './TempPhaseGraph';
import HumidityPhaseGraph from './HumidityPhaseGraph';
import PrecipPhaseGraph from './PrecipPhaseGraph';
import MeteoGeneralData from './MeteoGeneralData';

import './styles/weatherDetailsStyles.css';


function WeatherGeneratedDetails({ weatherGenerated }) {

    const [monthSelected, setMonthSelected] = useState(weatherGenerated[0]);

    console.log(monthSelected);
  return (
    <div className='weather-section'>
      <h3>Analisi - Simulazione Meteo</h3>
      <div className="meteo-simulated">
        <section className="month-selector">
            {weatherGenerated.map((month) => {
                return (
                    <button onClick={() => setMonthSelected(month)} disabled={month.month === monthSelected.month ? true : false}>{month.month}</button>
                )
            })}
        </section>
        <section className="meteo-general-data">
            <MeteoGeneralData monthSelected={monthSelected} />
        </section>
        <section className="month-graphs">

            <TempPhaseGraph 
                duration={{
                    startDate: monthSelected.startDate,
                    endDate: monthSelected.endDate
                }} 
                tempPhase={
                    monthSelected.meanTemp
                }
            />

            <HumidityPhaseGraph 
                duration={{
                    startDate: monthSelected.startDate,
                    endDate: monthSelected.endDate
                }} 
                humidityPhase={
                    monthSelected.meanHumidity
                }
            />

            <PrecipPhaseGraph 
                duration={{
                    startDate: monthSelected.startDate,
                    endDate: monthSelected.endDate
                }} 
                precipPhase={
                    monthSelected.precipitationSum
                }
            />

        </section>
      </div>
    </div>
  )
}

export default WeatherGeneratedDetails
