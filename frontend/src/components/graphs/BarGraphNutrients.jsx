import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import './styles/barGraphStyle.css';

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
                  theoricalData.CalculatedNutrients.Nitrogen,
                  theoricalData.CalculatedNutrients.Phosphorus,
                  theoricalData.CalculatedNutrients.Potassium,
                ],
                backgroundColor: '#8884d8'
              },
              {
                label: 'Valore Simulato',
                data: [
                  simulatedData.SimulatedNutrients.Nitrogen,
                  simulatedData.SimulatedNutrients.Phosphorus,
                  simulatedData.SimulatedNutrients.Potassium,
                ],
                backgroundColor: '#82ca9d'
              }
            ]
          })
    }, [theoricalData, simulatedData])
    

  return (
    <div className='general-info-canvas'>
      <h4>Confronto Nutrienti teorici/simulati</h4>
        {graphNutrientsData.datasets.length > 0 && (
           <div className="bar-graph canvas">
             <Bar 
              data={graphNutrientsData} 
              options={{ 
                responsive: true, 
                plugins: { 
                  legend: { position: 'top' } 
                },
                maintainAspectRatio: false,
                animation: {
                  duration: 0
                }
              }} />
           </div>
        )}
    </div>
    )
}

export default BarGraphNutrients