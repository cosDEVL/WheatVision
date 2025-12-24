import React from 'react';
import BarGraph from './graphs/BarGraph';

import styles from '../../../styles/components/DashboardComponents/SimulationDetailsComps/GraphComponent.module.css';
import Tooltip from '../../Tooltip';

const GraphSection = ({ label, calculatedValue, simulatedValue, infoText }) => {

    return (
        <section className={styles.sectionGraph}>
            <div className={styles.title}>
                <span className={styles.sectionTitle}>{label}</span>
                <Tooltip infoText={infoText} />
            </div>
            <div className={styles.canvas}>
                <BarGraph label={label} calculatedValue={calculatedValue} simulatedValue={simulatedValue} />
            </div>
            <div className={styles.detailedInfo}>
                <section>
                    <span className={styles.label}>Valore Teorico</span>
                    <span className={styles.value}>{calculatedValue}</span>
                </section>
                <section>
                    <span className={styles.label}>Valore Simulato</span>
                    <span className={styles.value}>{simulatedValue}</span>
                </section>
            </div>
        </section>
    )
}

function GraphComponent({ infoData, dataset }) {
  return (
    <div className={styles.graphCard}>
      <span className={styles.cardTitle}>{infoData}</span>
      <div className={styles.collection}>
        {dataset.map(field => {

            return (
                <GraphSection
                    label={field.label}
                    calculatedValue={field.calculatedValue}
                    simulatedValue={field.simulatedValue}
                    infoText={field.infoText}
                />
            )
        })}
      </div>
    </div>
  )
}

export default GraphComponent;
