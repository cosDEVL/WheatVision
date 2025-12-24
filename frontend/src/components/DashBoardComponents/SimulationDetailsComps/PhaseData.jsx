import React, { useState, useEffect } from 'react';
import CombinedPhaseGraphs from './graphs/CombinedPhaseGraphs';

import styles from '../../../styles/components/DashboardComponents/SimulationDetailsComps/PhaseData.module.css';

function PhaseData({ phaseData }) {

  const [phaseSelected, setPhaseSelected] = useState(phaseData[0]);

  const handleSelect = (value) => {
    for (let i = 0; i < phaseData.length; i++) {
      if (phaseData[i].phase === value) {
        
        setPhaseSelected(phaseData[i]);
        break;
      }
    }
  }

    const [phaseInfo, setPhaseInfo] = useState({
      temp: {
        mean: null,
        min: null, 
        max: null
      },
      humidity:{
        mean: null,
        min: null, 
        max: null
      },
      precipSum: null
    })
  
    useEffect(() => {
      const meanTemp =
        phaseSelected.tempSimulated.reduce((a, b) => a + b, 0) /
        phaseSelected.tempSimulated.length;
      const minTemp = Math.min(...phaseSelected.tempSimulated);
      const maxTemp = Math.max(...phaseSelected.tempSimulated);
      
      const meanHumidity =
        phaseSelected.humiditySimulated.reduce((a, b) => a + b, 0) /
        phaseSelected.humiditySimulated.length;
      const minHumidity = Math.min(...phaseSelected.humiditySimulated);
      const maxHumidity = Math.max(...phaseSelected.humiditySimulated);
  
      const precipitationSum = phaseSelected.precipSimulated.reduce(
        (a, b) => a + b,
        0
      );

      setPhaseInfo({
        temp: {
        mean: meanTemp.toFixed(2),
        min: minTemp.toFixed(2), 
        max: maxTemp.toFixed(2)
      },
      humidity: {
        mean: meanHumidity.toFixed(2),
        min: minHumidity.toFixed(2), 
        max: maxHumidity.toFixed(2)
      },
      precipSum: precipitationSum.toFixed(2)
      })
  
    }, [phaseSelected]);

  return (
    <div className={styles.phaseCard}>
      <section className={styles.phaseSelector}>
        <div className={styles.field}>
          <label htmlFor='phase-name'>
            <span className={styles.fieldLabel}>Selezionare la fase da analizzare</span>
          </label>
          <select name="phase-name" id="phase-name" value={phaseSelected.phase} onChange={(e) => handleSelect(e.target.value)}>
            {phaseData.map(phase => {
              return (
                <option value={phase.phase}>{phase.phase}</option>
              )
            })}
          </select>
        </div>
        <div className={styles.phasePeriod}>
          <section className={styles.label}>
            <span className={styles.labelTitle}>Data di inizio/fine fase</span>
            <span className={styles.labelValue}>{phaseSelected.duration.startDate}/{phaseSelected.duration.endDate}</span>
          </section>
          <section className={styles.label}>
            <span className={styles.labelTitle}>Durata della fase</span>
            <span className={styles.labelValue}>{phaseSelected.duration.days} Giorni</span>
          </section>
        </div>
      </section>

      <div className={styles.phaseSelected}>
        <section className={styles.phaseGraph}>
          <CombinedPhaseGraphs phase={phaseSelected} />
        </section>

        <section className={styles.phaseInfo}>
          <div className={styles.info}>
            <section>
              <span className={styles.sectionTitle}>Temperatura Media</span>
              <span className={styles.sectionValue}>{phaseInfo.temp.mean} °C</span>
            </section>
            <section>
              <span className={styles.sectionTitle}>Temperatura Massima</span>
              <span className={styles.sectionValue}>{phaseInfo.temp.max} °C</span>
            </section>
            <section>
              <span className={styles.sectionTitle}>Temperatura Minima</span>
              <span className={styles.sectionValue}>{phaseInfo.temp.min} °C</span>
            </section>
          </div>

          <div className={styles.info}>
            <section>
              <span className={styles.sectionTitle}>Umidità Media</span>
              <span className={styles.sectionValue}>{phaseInfo.humidity.mean} %</span>
            </section>

            <section>
              <span className={styles.sectionTitle}>Umidità Massima</span>
              <span className={styles.sectionValue}>{phaseInfo.humidity.max} %</span>
            </section>

            <section>
              <span className={styles.sectionTitle}>Umidità Minima</span>
              <span className={styles.sectionValue}>{phaseInfo.humidity.min} %</span>
            </section>
          </div>

          <div className={styles.info}>
            <section>
              <span className={styles.sectionTitle}>Precipitazioni totali</span>
              <span className={styles.sectionValue}>{phaseInfo.precipSum} mm</span>
            </section>
          </div>
        </section>
      </div>
    </div>
  )
}

export default PhaseData
