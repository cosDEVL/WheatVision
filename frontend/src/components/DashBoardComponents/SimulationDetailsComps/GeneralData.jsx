import React from 'react';
import Tooltip from '../../Tooltip';

import styles from '../../../styles/components/DashboardComponents/SimulationDetailsComps/GeneralData.module.css';

// Un sotto-componente per renderizzare ogni campo informazione
// Renderizza una singola riga di dati
const InfoField = ({ label, value, unit = '', infoText }) => {
        return (
            <section className={styles.infoField}>
                <div>
                    <span className={styles.sectionTitle}>{label}</span>
                    <Tooltip infoText={infoText} />
                </div>
                {value !== null && (
                    <span className={styles.sectionValue}>{value} {unit}</span>
                )}
            </section>
        )
    }


function GeneralData({ simName, generalData }) {

    if (!simName && !generalData) return null;

    const sowingInfo = [
        { label: 'Densità', key: 'Density', unit: 'piante/m³', infoText: "Indica il numero di semi germinabili per metro quadro. Puo' variare tra 300 e 500 semi." }, // Unità corretta da ton/m3
        { label: 'Peso di mille', key: 'TKW', unit: 'g', infoText: "Indica il peso di mille semi il quale dipende dalla varieta' del seme. Generalmente si aggira tra 35 e 60 grammi." },
        { label: 'Germinabilità', key: 'Germinability', unit: '%', infoText: "Indica la percentuale con cui un seme puo' dare origine alla pianta." },
        { label: 'Dose di semina', key: 'SowingRate', unit: 'kg/ha', infoText: 'Indica il numero di semi piantati in un ettaro di coltivazione.' }
    ];

    return (
        <div className={styles.generalDataCard}>
            <h2 className={styles.cardTitle}>{simName}</h2>
            <div className={styles.info}>
                {sowingInfo.map(field => {
                    return (
                        <InfoField
                            key={field.key}
                            label={field.label}
                            value={generalData[field.key]}
                            unit={field.unit}
                            infoText={field.infoText}
                        />
                    )
                })}
            </div>
        </div>
  )
}

export default GeneralData;
