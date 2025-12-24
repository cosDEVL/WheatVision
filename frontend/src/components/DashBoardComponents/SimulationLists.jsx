import React from 'react'
import SimulationCard from './SimulationCard'


import styles from '../../styles/components/SimulationLists.module.css'

function SimulationLists({ formData, simSelected, onSelect, onDeleteSim, onDeleteAll, onNewSim, onCloseList }) {
  return (
    <div className={styles.bgShadow}>
      <div className={styles.formLists}>
      <div className={styles.btns}>
        <div>
          <button className={styles.newSim} onClick={onNewSim}>Nuova Simulazione</button>
          <button className={styles.deleteSim} onClick={onDeleteAll}>Cancella Tutto</button>
        </div>
        <button className={styles.exitBtn} onClick={onCloseList}>CHIUDI</button>
      </div>
        

        <div className={styles.list}>
          {formData.map((form) => (
            <SimulationCard 
                key={form._id}
                form={form}
                isSelected={simSelected === form.nomeSimulazione}
                onSelect={() => onSelect(form.nomeSimulazione)}
                onDelete={(e) => onDeleteSim(form.nomeSimulazione, e)}
            />
          ))}
        </div>
    </div>
    </div>
  )
}

export default SimulationLists
