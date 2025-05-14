import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

import './styles/roundGraphStyle.css'

function FullDoughnutGraph({ simulatedData }) {

    const [graphDaysCount, setGraphDaysCount] = useState({
        labels: [],
        datasets: []
    })

    const [dates, setDates] = useState(null);
    

    useEffect(() => {

        const dateRanges = [];
        const daysPerPhase = [];
        let labelPhase = [
            "Germinazione",
            "Accestimento",
            "Levata",
            "Spigatura e Fioritura",
            "Maturazione"
        ];

        simulatedData.simulation.forEach((phase) => {
            dateRanges.push(`Data inizio: ${phase.duration.startDate}\nData fine: ${phase.duration.endDate}`);
        })
        setDates(dateRanges);

        simulatedData.simulation.forEach((phase) => {
            daysPerPhase.push(phase.duration.days);
        })

        setGraphDaysCount({
            labels: labelPhase,
            datasets: [
            {
                label: "Giorni",
                data: daysPerPhase,
                backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
                'rgba(54, 162, 235, 0.5)',
                'rgba(255, 206, 86, 0.5)',
                'rgba(75, 192, 192, 0.5)',
                'rgba(153, 102, 255, 0.5)'
                ]
            }
            ]
        })

    }, [simulatedData])
    

  return (
    <div className='round-graph'>
        {graphDaysCount.datasets.length > 0 && (
            <Doughnut 
                data = {graphDaysCount}
                options={{
                responsive: true,
                plugins: {
                    legend: {
                    position: 'top',
                    },
                    tooltip: {
                    callbacks: {
                        afterTitle: function(tooltipItems) {
                        const index = tooltipItems[0].dataIndex;
                        return dates[index];
                        }
                    }
                    }
                },
                elements: {
                    arc: {
                    hoverOffset: 50
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

export default FullDoughnutGraph