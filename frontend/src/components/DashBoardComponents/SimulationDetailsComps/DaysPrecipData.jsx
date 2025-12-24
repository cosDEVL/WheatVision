import React from 'react';
import HalfDoughnutGraph from './graphs/HalfDoughnutGraph';

import styles from '../../../styles/components/DashboardComponents/SimulationDetailsComps/DaysPrecipData.module.css';

const DurationField = ({ label, value }) => {
  return (
    <section>
      <span className={styles.label}>{label}</span>
      {value !== null && (
        <span className={styles.value}>{value}</span>
      )}
    </section>
  )
}

function DaysPrecipData({ phase, theoreticalPrecip, simulatedPrecip }) {

  const startDate = phase.at(0).duration.startDate;
  const endDate = phase.at(-1).duration.endDate;

  console.log(startDate, endDate)

  const totalDays = phase.reduce((acc, value) => acc + value.duration.days, 0);
  console.log(phase)

  const durationInfo = [
    { label: "Data di inizio coltivazione", value: startDate },
    { label: "Data di fine coltivazione", value: endDate },
    { label: "Giorni totali di coltivazione", value: totalDays },

  ];

  

  return (
    <div className={styles.durationCard}>
      <div className={styles.durationInfo}>
        <span className={styles.sectionTitle}>Durata della coltivazione</span>
        {durationInfo.map(field => {
          return (
            <DurationField 
              label={field.label}
              value={field.value}
            />
            )
          }
        )}
      </div>
      <div className={styles.precipComparison}>
          <span className={styles.sectionTitle}>Analisi Precipitazioni</span>
          <div className={styles.canvas}>
              <HalfDoughnutGraph theoreticalPrecip={theoreticalPrecip} simulatedPrecip={simulatedPrecip} />
          </div>
          <div className={styles.moreInfo}>
              <section>
                  <span className={styles.label}>Valore Teorico</span>
                  <span className={styles.value}>{theoreticalPrecip} mm</span>
              </section>
              <section>
                  <span className={styles.label}>Valore Simulato</span>
                  <span className={styles.value}>{simulatedPrecip} mm</span>
              </section>
          </div>
      </div>
    </div>
  )
}

export default DaysPrecipData;
