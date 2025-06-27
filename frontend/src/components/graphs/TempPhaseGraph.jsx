import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2';

import './styles/tempPhaseGraphStyles.css'

function TempPhaseGraph({ duration, tempPhase }) {

    const [graphPhase, setGraphPhase] = useState({
        labels: [],
        datasets: []
    });

    console.log(duration)
    
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
                    label: "Temperatura °C",
                    data: tempPhase,
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    borderColor: 'rgba(255, 99, 132, 0.5)',
                    pointStyle: "circle",
                    pointRadius: 5,
                    pointHoverRadius: 8,
                }
            ]
        })


    }, [tempPhase]);

    

  return (
    <div className='phase-canvas'>
        {graphPhase.datasets.length > 0 && (
            <Line
                data={graphPhase}
                options={{ 
                maintainAspectRatio: false,
                plugins: { 
                    legend: { position: 'top' }
                },
                scales: {
                        y: {
                            min: -10,
                            max: 50
                        }
                    }
            }}
            />
        )}
    </div>
  )
}

export default TempPhaseGraph
