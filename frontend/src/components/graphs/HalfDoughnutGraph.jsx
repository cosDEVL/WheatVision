import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

function HalfDoughnutGraph({ theoricalData, simulatedData }) {

    const [graphPrecipData, setGraphPrecipData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        setGraphPrecipData({
            labels: [
              "Precipitazioni Richieste",
              "Precipitazioni Simulate"
            ],
            datasets: [
              {
                label: "mm",
                data: [
                  theoricalData.theoreticalPrecipitations,
                  simulatedData.simulatedPrecipitations
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
              }
            ]
          })
    }, [theoricalData, simulatedData])
    

  return (
    <div className='round-graph'>
        {graphPrecipData.datasets.length > 0 && (
            <Doughnut 
            data = {graphPrecipData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: 'top',
                }
              },
              rotation: 270,   // Gira di 180° per ottenere l'effetto "mezzo cerchio"
              circumference: 180, // Solo metà del cerchio
              elements: {
                arc: {
                  hoverOffset: 100
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

export default HalfDoughnutGraph