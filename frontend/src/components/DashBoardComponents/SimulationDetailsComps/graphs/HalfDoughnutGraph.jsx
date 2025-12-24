import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';

import styles from '../../../../styles/components/DashboardComponents/SimulationDetailsComps/graphs/HalfDoughnutGraph.module.css';

function HalfDoughnutGraph({ theoreticalPrecip, simulatedPrecip }) {

    const [graphPrecipData, setGraphPrecipData] = useState({
        labels: [],
        datasets: []
    })
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
                  theoreticalPrecip,
                  simulatedPrecip
                ],
                backgroundColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1
              }
            ]
          })
    }, [theoreticalPrecip, simulatedPrecip])
    

  return (
    <>
        {graphPrecipData.datasets.length > 0 && (
          <div className={styles.doughnutCanvas}>
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
    </>
  )
}

export default HalfDoughnutGraph