import React, { useEffect, useState } from 'react'

function MeteoGeneralData({ monthSelected }) {

    const [temp, setTemp] = useState({
        tempMean: null,
        tempMin: null,
        tempMax: null
    })

    const [humidity, setHumidity] = useState({
        humidityMean: null,
        humidityMin: null,
        humidityMax: null
    })

    const [precipSum, setPrecipSum] = useState(null)

    useEffect(() => {

        const meanTemp = monthSelected.meanTemp.reduce((a,b) => a + b, 0) / monthSelected.meanTemp.length;
        const minTemp = Math.min(...monthSelected.meanTemp);
        const maxTemp = Math.max(...monthSelected.meanTemp);

        const meanHumidity = monthSelected.meanHumidity.reduce((a,b) => a + b, 0) / monthSelected.meanHumidity.length;
        const minHumidity = Math.min(...monthSelected.meanHumidity);
        const maxHumidity = Math.max(...monthSelected.meanHumidity);

        const precipitationSum = monthSelected.precipitationSum.reduce((a,b) => a + b, 0);

        setTemp({
            tempMean: meanTemp.toFixed(2),
            tempMin: minTemp.toFixed(2),
            tempMax: maxTemp.toFixed(2)
        });

        setHumidity({
            humidityMean: meanHumidity.toFixed(2),
            humidityMin: minHumidity.toFixed(2),
            humidityMax: maxHumidity.toFixed(2)
        });

        setPrecipSum(precipitationSum.toFixed(2))

    }, [monthSelected])

  return (
    <div className='general-data'>
        <h4>Dati Meteo del mese selezionato - <span>{monthSelected.month} [{monthSelected.startDate}/{monthSelected.endDate}]</span></h4>
        <div className="month-data">
            <div className="temperature">
                <span className="section-title">Temperatura Media</span>
                <span className="section-info">{temp.tempMean} °C</span>
                <span className="section-title">Temperatura Massima</span>
                <span className="section-info">{temp.tempMax} °C</span>
                <span className="section-title">Temperatura Minima</span>
                <span className="section-info">{temp.tempMin} °C</span>
            </div>

            <div className="humidity">
                <span className="section-title">Umidità Media</span>
                <span className="section-info">{humidity.humidityMean} %</span>
                <span className="section-title">Umidità Massima</span>
                <span className="section-info">{humidity.humidityMax} %</span>
                <span className="section-title">Umidità Minima</span>
                <span className="section-info">{humidity.humidityMin} %</span>
            </div>

            <div className="precipitations">
                <span className="section-title">Precipitazioni totali</span>
                <span className="section-info">{precipSum} mm</span>
            </div>
            
        </div>
        
    </div>
  )
}

export default MeteoGeneralData
