import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import './styles/tempPhaseGraphStyles.css'

function PrecipPhaseGraph({ duration, precipPhase }) {

    const [graphPhase, setGraphPhase] = useState({
        labels: [],
        datasets: []
    });

    let labelPhase = [];
      
          const startDate = new Date(duration.startDate);
          const endDate = new Date(duration.endDate);
      
          let currentDate = new Date(startDate);
      
          while(currentDate < endDate) {
      
              const formatData = (date) => `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${(date.getDate()).toString().padStart(2, '0')}`;
      
              labelPhase.push(formatData(currentDate))
              currentDate.setDate(currentDate.getDate() + 1);
      
          }
      
          useEffect(() => {
      
              setGraphPhase({
                  labels: labelPhase,
                  datasets: [
                      {
                          label: "Precipitazioni mm",
                          data: precipPhase,
                          backgroundColor: 'rgba(3, 41, 124, 0.5)',
                      }
                  ]
              })
      
      
          }, [precipPhase]);

  return (
    <div className='phase-canvas'>
              {graphPhase.datasets.length > 0 && (
                  <Bar
                      data={graphPhase}
                      options={{ 
                        plugins: { 
                            legend: { position: 'top' }
                        },
                        scales: {
                            y: {
                                min: 0,
                                max: 70
                            }
                        }
                  }}
                  />
              )}
          </div>
  )
}

export default PrecipPhaseGraph
