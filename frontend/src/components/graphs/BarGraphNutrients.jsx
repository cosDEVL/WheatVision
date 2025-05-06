import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

function BarGraphNutrients({ theoricalData, simulatedData }) {

    const [graphNutrientsData, setGraphNutrientsData] = useState({
        labels: [],
        datasets: []
    })

    useEffect(() => {
        setGraphNutrientsData({
            labels: [
              "Dose di azoto [kg/ha]",
              "Dose di fosforo [kg/ha]",
              "Dose di potassio [kg/ha]",
            ],
            datasets: [
              {
                label: 'Valore Teorico',
                data: [
                  theoricalData.theoreticalNitrogen,
                  theoricalData.theoreticalPhosphorus,
                  theoricalData.theoreticalPotassium,
                ],
                backgroundColor: '#8884d8'
              },
              {
                label: 'Valore Simulato',
                data: [
                  simulatedData.simulatedNitrogen,
                  simulatedData.simulatedPhosphorus,
                  simulatedData.simulatedPotassium,
                ],
                backgroundColor: '#82ca9d'
              }
            ]
          })
    }, [theoricalData, simulatedData])
    

  return (
    <>
        {graphNutrientsData.datasets.length > 0 && (
            <Bar 
            data={graphNutrientsData} 
            options={{ 
              responsive: true, 
              plugins: { 
                legend: { position: 'top' } 
              }
            }} />
        )}
    </>
    )
}

export default BarGraphNutrients