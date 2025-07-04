import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import './styles/barGraphWideStyle.css';

function BarGraphTempHum({ simulatedData }) {

  const [graphPhaseTempHumData, setGraphPhaseTempHumData] = useState({
    labels: [],
    datasets: []
  })

  const tempPerPhase = [];
  const humidityPerPhase = [];
  const dateRanges = [];
  let labelPhase = [
    "Germinazione",
    "Accestimento",
    "Levata",
    "Spigatura e Fioritura",
    "Maturazione"
];

  useEffect(() => {
    simulatedData.PhaseInfo.forEach((phase) => {
      dateRanges.push(`Data inizio: ${phase.duration.startDate}\nData fine: ${phase.duration.endDate}`);
    })
  
    simulatedData.PhaseInfo.forEach((phase) => {
      tempPerPhase.push(phase.tempMean);
      humidityPerPhase.push(phase.humidityMean)
    })
  
    setGraphPhaseTempHumData({
      labels: labelPhase,
      datasets: [
        {
          label: "Temperatura °C",
          data: tempPerPhase,
          backgroundColor: 'rgba(255, 99, 132, 0.5)'
        },
        {
          label: "Umidità %",
          data: humidityPerPhase,
          backgroundColor: 'rgba(75, 192, 192, 0.5)'
        }
      ]
    })
  }, [simulatedData])

  return (
    <div className='bar-graph-wide'>
        {graphPhaseTempHumData.datasets.length > 0 && (
          <Bar 
            data={graphPhaseTempHumData} 
            options={{ 
              responsive: true, 
              plugins: { 
                legend: { position: 'top' } ,
                tooltip: {
                  callbacks: {
                    afterTitle: function(tooltipItems) {
                      const index = tooltipItems[0].dataIndex;
                      return dateRanges[index];
                    }
                  }
                }
              },
              maintainAspectRatio: false,
              animation: {
                duration: 0
              }
            }} 
          />
        )}
    </div>
  )
}

export default BarGraphTempHum