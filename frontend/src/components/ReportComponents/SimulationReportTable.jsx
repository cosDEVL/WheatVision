import React from 'react';

import styles from '../../styles/components/ReportComponents/SimulationReportTable.module.css';

// Questo componente riceve una singola simulazione e la trasforma in una tabella.
function SimulationReportTable({ simulation }) {
    
    // Estrazione dati per pulizia
    const { simulationForm: formData, simulationData: simData } = simulation;
    const { CalculatedData, SimulatedData, FinancialData, PhaseSimulationData } = simData[0];

    console.log(PhaseSimulationData)

    return (
        <table key={formData._id}>
            <thead>
                <tr>
                    <th colSpan={8}>{formData.nomeSimulazione}</th>
                </tr>
            </thead>
            <tbody>
                {/* Sezione: Simulation Form Data */}
                <tr className={styles.sectionTable}>
                    <td colSpan={8}>Simulation Form Data</td>
                </tr>
                <tr className={styles.sectionHeader}>
                    <td>Periodo di semina</td>
                    <td>Ettari di coltivazione [ha]</td>
                    <td>Densità [piante/mq]</td>
                    <td>TKW [q]</td>
                    <td>Germinabilità [%]</td>
                    <td colSpan={3}>Nutrienti (Azoto/Fosforo/Potassio) [kg/ha]</td>
                </tr>
                <tr className={styles.sectionContent}>
                    <td>{formData.periodoSemina}</td>
                    <td>{formData.ettariColtivazione}</td>
                    <td>{formData.densita}</td>
                    <td>{formData.pesoDiMille}</td>
                    <td>{formData.germinabilita}</td>
                    <td colSpan={3}>{`${formData.azoto} | ${formData.fosforo} | ${formData.potassio}`}</td>
                </tr>

                {/* Sezione: Dati della resa teorica */}
                <tr className={styles.sectionTable}>
                    <td colSpan={8}>Dati della resa teorica</td>
                </tr>
                <tr className={styles.sectionHeader}>
                    <td>Resa per ettaro [ton/ha]</td>
                    <td>Indice di accestimento [n.Spighe/Pianta]</td>
                    <td>Indice di spighette [n.Spighette/Spiga]</td>
                    <td>Indice di semi [n.Cariossidi/Spighetta]</td>
                    <td>Precipitazioni totali richieste [mm]</td>
                    <td colSpan={3}>Nutrienti richiesti (A/F/P) [kg/ha]</td>
                </tr>
                <tr className={styles.sectionContent}>
                    <td>{CalculatedData.YieldCalculatedPerHectares}</td>
                    <td>{CalculatedData.TilleringIndex}</td>
                    <td>{CalculatedData.SpikeletsIndex}</td>
                    <td>{CalculatedData.SeedsIndex}</td>
                    <td>{CalculatedData.CalculatedPrecipitations}</td>
                    <td colSpan={3}>{`${CalculatedData.CalculatedNutrients.Nitrogen} | ${CalculatedData.CalculatedNutrients.Phosphorus} | ${CalculatedData.CalculatedNutrients.Potassium}`}</td>
                </tr>

                {/* Sezione: Dati della resa simulata */}
                <tr className={styles.sectionTable}>
                    <td colSpan={8}>Dati della resa simulata</td>
                </tr>
                <tr className={styles.sectionHeader}>
                    <td>Resa per ettaro [ton/ha]</td>
                    <td>Indice di accestimento [n.Spighe/Pianta]</td>
                    <td>Indice di spighette [n.Spighette/Spiga]</td>
                    <td>Indice di semi [n.Cariossidi/Spighetta]</td>
                    <td>Precipitazioni totali [mm]</td>
                    <td>Nutrienti (A/F/P) [kg/ha]</td>
                    <td colSpan={2}>Peso ettolitrico [kg/hl]</td>
                </tr>
                <tr className={styles.sectionContent}>
                    <td>{SimulatedData.YieldSimulated.PerHectares}</td>
                    <td>{SimulatedData.TilleringIndex}</td>
                    <td>{SimulatedData.SpikeletsIndex}</td>
                    <td>{SimulatedData.SeedsIndex}</td>
                    <td>{SimulatedData.SimulatedPrecipitations}</td>
                    {/* BUG CORRETTO: Mostro Azoto, Fosforo e Potassio invece di 3 volte Azoto */}
                    <td>{`${SimulatedData.SimulatedNutrients.Nitrogen} | ${SimulatedData.SimulatedNutrients.Phosphorus} | ${SimulatedData.SimulatedNutrients.Potassium}`}</td>
                    <td colSpan={2}>{SimulatedData.HectolitreWeight}</td>
                </tr>

                {/* Sezione: Dati delle fasi simulate */}
                <tr className={styles.sectionTable}>
                    <td colSpan={8}>Dati delle fasi simulate</td>
                </tr>
                <tr className={styles.sectionHeader}>
                    <td>Fase fenologica</td>
                    <td>Data di inizio/fine</td>
                    <td>Durata [n.Giorni]</td>
                    <td>Temperatura media</td>
                    <td colSpan={2}>Umidità media</td>
                    <td colSpan={2}>Precipitazioni simulate</td>
                </tr>
                {PhaseSimulationData.map((phase) => (
                    <tr className={styles.sectionContent} key={phase.phase}>
                        <td>{phase.phase}</td>
                        <td>{`${phase.duration.startDate} / ${phase.duration.endDate}`}</td>
                        <td>{phase.duration.days}</td>
                        <td>{phase.tempMean}</td>
                        <td colSpan={2}>{phase.humidityMean}</td>
                        <td colSpan={2}>{phase.precipSum}</td>
                    </tr>
                ))}
                
                {/* Sezione: Dati finanziari */}
                <tr className={styles.sectionTable}>
                    <td colSpan={8}>Dati finanziari della simulazione</td>
                </tr>
                <tr className={styles.sectionHeader}>
                    <td colSpan={2}>Tipo di frumento</td>
                    <td colSpan={3}>Prezzo di vendita del frumento per ton. [€/ton]</td>
                    <td colSpan={3}>Prezzo di vendita del frumento totale [€]</td>
                </tr>
                <tr className={styles.sectionContent}>
                    <td colSpan={2}>{FinancialData.WheatType}</td>
                    <td colSpan={3}>{`${FinancialData.WheatPrice.PerTons[0]} - ${FinancialData.WheatPrice.PerTons[1]}`}</td>
                    <td colSpan={3}>{`${FinancialData.WheatPrice.Total[0]} - ${FinancialData.WheatPrice.Total[1]}`}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default SimulationReportTable;