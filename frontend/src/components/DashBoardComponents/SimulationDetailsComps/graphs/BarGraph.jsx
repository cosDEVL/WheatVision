import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from '../../../../styles/components/DashboardComponents/SimulationDetailsComps/graphs/BarGraph.module.css';

function BarGraph({ label, calculatedValue, simulatedValue }) {


    const graph = {
        labels: [label],
            datasets: [{
              label: "Valore Teorico",
              data: [calculatedValue],
              backgroundColor: 'rgba(255, 99, 132, 1)'
              },
              {
              label: "Valore Simulato",
              data: [simulatedValue],
              backgroundColor: 'rgba(54, 162, 235, 1)'
            }]
    };

  return (
    <div className={styles.barCanvas}>
        <Bar
            data={graph}
            options={{
              responsive: true,
              maintainAspectRatio: false
            }}
            
        />
    </div>
  )
}

export default BarGraph;
