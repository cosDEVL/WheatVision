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
              theoricalData.TilleringIndex || 0,
              theoricalData.SpikeletsIndex || 0,
              theoricalData.SeedsIndex || 0
            ],
            backgroundColor: '#8884d8'
          },
          {
            label: 'Valore Simulato',
            data: [
              simulatedData.TilleringIndex || 0,
              simulatedData.SpikeletsIndex || 0,
              simulatedData.SeedsIndex || 0
            ],
            backgroundColor: '#82ca9d'
          }
        ]
      });
    }
  }, [theoricalData, simulatedData]); // <-- Si aggiorna solo quando questi cambiano

  return (
    <div className='general-info-canvas'>
      <h4>Confronto Indici di semina teorici/simulati</h4>
      {graphIndexData.datasets.length > 0 && ( // <-- così eviti errori se vuoto
        <div className='bar-graph canvas'>
          
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
        </div>
      )}
    </div>
  );
}

export default BarGraphIndex;
