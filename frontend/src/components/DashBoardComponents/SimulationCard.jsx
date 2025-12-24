import React from 'react'

import styles from '../../styles/components/Card.module.css'

function SimulationCard({ form, isSelected, onSelect, onDelete }) {
  return (
    <div
        id={form.nomeSimulazione}
        className={isSelected ? `${styles.cardSelected} ${styles.card}`: styles.card}
        onClick={onSelect}
    >
        <section className={styles.cardSection}>
            <span>Nome della simulazione:</span>
            <span>{form.nomeSimulazione}</span>
        </section>
        <section className={styles.cardSection}>
            <span>Periodo di semina:</span>
            <span>{form.periodoSemina}</span>
        </section>
        <section className={styles.cardSection}>
            <span>Ettari di coltivazione:</span>
            <span>{form.ettariColtivazione} ha</span>
        </section>
        <section className={styles.cardSection}>
            <span>Densità di piante:</span>
            <span>{form.densita} piante/m<sup>3</sup></span>
        </section>
        <section className={styles.cardSection}>
            <span>Peso di mille semi:</span>
            <span>{form.pesoDiMille} g</span>
        </section>
        <section className={styles.cardSection}>
            <span>Germinabilità del seme:</span>
            <span>{form.germinabilita}%</span>
        </section>
        <section className={styles.cardSection}>
            <span>Dose di Azoto:</span>
            <span>{form.azoto} kg/ha</span>
        </section>
        <section className={styles.cardSection}>
            <span>Dose di Fosforo:</span>
            <span>{form.fosforo} kg/ha</span>
        </section>
        <section className={styles.cardSection}>
            <span>Dose di Potassio:</span>
            <span>{form.potassio} kg/ha</span>
        </section>

        <button onClick={onDelete}>Cancella Report</button>
    </div>
  )
}

export default SimulationCard;
