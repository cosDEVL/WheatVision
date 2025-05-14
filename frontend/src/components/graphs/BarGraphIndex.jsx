import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';

import './styles/barGraphStyle.css';


function BarGraphIndex({ theoricalData, simulatedData }) {

  const [graphIndexData, setGraphIndexData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    if (theoricalData && simulatedData) {
      setGraphIndexData({
        labels: [
          "Indice di accestimento",
          "N.Spighette per spighe",
          "N.Cariossidi per spighetta"
        ],
        datasets: [
          {
            label: 'Valore Teorico',
            data: [
              theoricalData.tilleringIndex || 0,
              theoricalData.spikeletsIndex || 0,
              theoricalData.seedsIndex || 0
            ],
            backgroundColor: '#8884d8'
          },
          {
            label: 'Valore Simulato',
            data: [
              simulatedData.tilleringIndex || 0,
              simulatedData.spikeletsIndex || 0,
              simulatedData.seedsIndex || 0
            ],
            backgroundColor: '#82ca9d'
          }
        ]
      });
    }
  }, [theoricalData, simulatedData]); // <-- Si aggiorna solo quando questi cambiano

  return (
    <div className='bar-graph'>
      {graphIndexData.datasets.length > 0 && ( // <-- così eviti errori se vuoto
        <Bar 
          data={graphIndexData} 
          options={{ 
            responsive: true, 
            plugins: { 
              legend: { position: 'top' } 
            },
            maintainAspectRatio: false,
            animation: {
              duration: 0
            }
          }}
        />
      )}
    </div>
  );
}

export default BarGraphIndex;
