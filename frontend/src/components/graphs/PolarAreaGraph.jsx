import React, { useState, useEffect } from 'react';
import { PolarArea } from 'react-chartjs-2';

function PolarAreaGraph({ simulatedData }) {

    const [graphPhasePrecipData, setGraphPhasePrecipData] = useState({
        labels: [],
        datasets: []
    })

    const [dates, setDates] = useState(null);

    

    useEffect(() => {

      const dateRanges = [];
      const precipPerPhase = [];
      let labelPhase = [
          "Germinazione",
          "Accestimento",
          "Levata",
          "Spigatura e Fioritura",
          "Maturazione"
      ];
        
        simulatedData.simulation.forEach((phase) => {
            dateRanges.push(`Data inizio: ${phase.duration.startDate}\nData fine: ${phase.duration.endDate}`);
        })

        setDates(dateRanges);

        simulatedData.simulation.forEach((phase) => {
            precipPerPhase.push(phase.precipitationSum);
        })
    
        setGraphPhasePrecipData({
            labels: labelPhase,
            datasets: [
            {
                label: "mm",
                data: precipPerPhase,
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
                ]
            },
            ]
        })
    }, [simulatedData])

  return (
    <>
        <PolarArea 
          data = {graphPhasePrecipData}
          options={{
            responsive: true,
            plugins: {
              tooltip: {
                callbacks: {
                  afterTitle: function(tooltipItems) {
                    const index = tooltipItems[0].dataIndex;
                    return dates[index];
                  }
                }
              }
            },
            elements: {
              arc: {
                hoverOffset: 20
              }
            }
          }}
        />
    </>
  )
}

export default PolarAreaGraph