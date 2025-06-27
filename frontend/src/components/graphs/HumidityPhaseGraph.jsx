import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

function HumidityPhaseGraph({ duration, humidityPhase }) {

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
                      label: "Umidità %",
                      data: humidityPhase,
                      backgroundColor: 'rgba(99, 148, 255, 0.5)',
                  }
              ]
          })
  
  
      }, [humidityPhase]);
  
      
  
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
                            max: 100
                        }
                    }
              }}
              />
          )}
      </div>
    )
}

export default HumidityPhaseGraph
