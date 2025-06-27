import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

function HalfDoughnutGraph({ theoricalData, simulatedData }) {

    const [graphPrecipData, setGraphPrecipData] = useState({
        labels: [],
        datasets: []
    })

    console.log(simulatedData)

    useEffect(() => {
        setGraphPrecipData({
            labels: [
              "Precipitazioni Totali Richieste",
              "Precipitazioni Totali Simulate"
            ],
            datasets: [
              {
                label: "mm",
                data: [
                  theoricalData.CalculatedPrecipitations,
                  simulatedData.SimulatedPrecipitations
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
              }
            ]
          })
    }, [theoricalData.CalculatedPrecipitations, simulatedData.SimulatedPrecipitations])
    

  return (
    <div className="general-info-canvas">
      <h4>Confronto Precipitazioni teoriche/simulate</h4>
        {graphPrecipData.datasets.length > 0 && (
          <div className='round-graph canvas'>
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
                clip: {
                  top: false,
                  right: 10,
                  bottom: false,
                  left: 10

                },
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
          </div>
        )}
    </div>
  )
}

export default HalfDoughnutGraph