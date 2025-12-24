import React from 'react';

import styles from '../../../styles/components/DashboardComponents/SimulationDetailsComps/YieldFinanceData.module.css';

function YieldFinanceData({ yieldDataCalc, yieldDataSim, financialData }) {

    console.log(financialData);

    const formatFinancialData = (arrayValue) => {
        return `${arrayValue[0]} - ${arrayValue[1]}`;
    } 

    return (
        <div className={styles.yieldFinanceCard}>

            <div className={`${styles.yieldData} ${styles.box}`}>
                <div className={styles.partOne}>
                    <h4 className={styles.dataTitle}>Resa Teorica</h4>
                    <div className={styles.dataResults}>
                        <section className={styles.dataSection}>
                            <span className={styles.subTitle}>Per Ettaro [Ton/Ha]</span>
                            <span className={styles.dataValue}>{yieldDataCalc.YieldCalculatedPerHectares}</span>
                        </section>
                    </div>
                </div>
                <div className={styles.partTwo}>
                    <h4 className={styles.dataTitle}>Resa simulata</h4>
                    <div className={styles.dataResults}>
                        <section className={styles.dataSection}>
                            <span className={styles.subTitle}>Per Ettaro [Ton/Ha]</span>
                            <span className={styles.dataValue}>{yieldDataSim.YieldSimulated.PerHectares}</span>
                        </section>
                        <section className={styles.dataSection}>
                            <span className={styles.subTitle}>Totale [Ton]</span>
                            <span className={styles.dataValue}>{yieldDataSim.YieldSimulated.Total}</span>
                        </section>
                    </div>
                </div>
            </div>

            <div className={`${styles.financialData} ${styles.box}`}>

                <div className={styles.partOne}>
                    <h4 className={styles.dataTitle}>Valore Qualitativo</h4>
                    <div className={styles.dataResults}>
                        <section className={styles.dataSection}>
                            <span className={styles.subTitle}>Peso Ettolitrico [hl]</span>
                            <span className={styles.dataValue}>{yieldDataSim.HectolitreWeight} </span>
                        </section>
                        <section className={styles.dataSection}>
                            <span className={styles.subTitle}>Tipo di frumento</span>
                            <span className={styles.dataValue}>{financialData.WheatType} </span>
                        </section>
                    </div>
                </div>
                <div className={styles.partTwo}>
                    <h4 className={styles.dataTitle}>Valore Economico</h4>
                    <div className={styles.dataResults}>
                        <section className={styles.dataSection}>
                            <span className={styles.subTitle}>Per Tonnellate [€/ton]</span>
                            <span className={styles.dataValue}>{formatFinancialData(financialData.WheatPrice.PerTons)}</span>
                        </section>
                        <section className={styles.dataSection}>
                            <span className={styles.subTitle}>Totale [€]</span>
                            <span className={styles.dataValue}>{formatFinancialData(financialData.WheatPrice.Total)}</span>
                        </section>
                    </div>
                </div>
            </div>

        </div>
  )
}

export default YieldFinanceData;
