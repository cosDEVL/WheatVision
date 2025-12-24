import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";

import styles from '../../../../styles/components/DashboardComponents/SimulationDetailsComps/graphs/CombinedPhaseGraphs.module.css';

function CombinedPhaseGraphs({ phase }) {
  const [graphPhase, setGraphPhase] = useState({
    labels: [],
    datasets: [],
  });

  const [label, setLabel] = useState([]);

  useEffect(() => {
    let datesArray = [];

    const startDate = new Date(phase.duration.startDate);
    const endDate = new Date(phase.duration.endDate);

    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      const formatData = (date) => date.toISOString().split("T")[0];

      datesArray.push(formatData(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    setLabel(datesArray);
  }, [phase]);

  useEffect(() => {
    setGraphPhase({
      labels: label,
      datasets: [
        {
          type: "line",
          label: "Temperatura °C",
          data: phase.tempSimulated,
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          borderColor: "rgba(255, 99, 132, 0.5)",
          pointStyle: "circle",
          pointRadius: 5,
          pointHoverRadius: 8,
        },
        {
          type: "bar",
          label: "Umidità %",
          data: phase.humiditySimulated,
          backgroundColor: "rgba(99, 148, 255, 0.5)",
        },
        {
          type: "bar",
          label: "Precipitazioni mm",
          data: phase.precipSimulated,
          backgroundColor: "rgba(3, 41, 124, 0.5)",
        },
      ],
    });
  }, [phase, label]);

  console.log(label)

  return (
    <div className={styles.combinedCanvas}>
      {graphPhase.datasets.length > 0 && (
        <Chart
          type="bar"
          data={graphPhase}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
            },
            scales: {
              y: {
                min: -15,
                max: 100,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default CombinedPhaseGraphs;
