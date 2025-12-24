import React from 'react';

import GeneralData from './SimulationDetailsComps/GeneralData';
import YieldFinanceData from './SimulationDetailsComps/YieldFinanceData';
import DaysPrecipData from './SimulationDetailsComps/DaysPrecipData';
import PhaseData from './SimulationDetailsComps/PhaseData';
import GraphComponent from './SimulationDetailsComps/GraphComponent';
import LoadingSpinner from '../LoadingSpinner';
import Tooltip from '../Tooltip';

import styles from '../../styles/components/DashboardComponents/SimulationDetails.module.css';

function SimulationDetails({ isLoading, simSelected }) {

    if (isLoading) {
    return <LoadingSpinner text="Caricamento dettagli simulazione..." />;
  }

  if (!simSelected) {
    return (
      <div className={styles.noSimSelected}>
        <span>Selezionare una simulazione dalla lista per vederne i dettagli.</span>
      </div>
    );
  }




  return (
    <div className={styles.detailsPage}>

      <div className={`${styles.generalInfo} ${styles.detailsSection}`}>
        <span className={styles.sectionTitle}>Informazioni generali</span>
        <div className={styles.cardSection}>
          <GeneralData simName={simSelected.SimulationName} generalData={simSelected.GeneralData} />
          <YieldFinanceData yieldDataCalc={simSelected.CalculatedData} yieldDataSim={simSelected.SimulatedData} financialData={simSelected.FinancialData} />
        </div>
      </div>

      <div className={`${styles.comparisonData} ${styles.detailsSection}`}>
        <span className={styles.sectionTitle}>Componenti di semina</span>
        <div className={styles.cardSection}>
          <div className={styles.duration}>
            <DaysPrecipData phase={simSelected.PhaseSimulationData} theoreticalPrecip={simSelected.CalculatedData.CalculatedPrecipitations} simulatedPrecip={simSelected.SimulatedData.SimulatedPrecipitations} />
          </div>
          <div className={styles.yieldComponents}>
            <GraphComponent infoData={"Indici di semina"} dataset={[
              {label: "Numero di Spighe/Pianta",         calculatedValue: simSelected.CalculatedData.TilleringIndex, simulatedValue: simSelected.SimulatedData.TilleringIndex, infoText: 'Indice di accestimento, il quale indica quante spighe si sono formate per pianta'},
              {label: "Numero di Spighette/Spiga",      calculatedValue: simSelected.CalculatedData.SpikeletsIndex, simulatedValue: simSelected.SimulatedData.SpikeletsIndex, infoText: 'Indica quante spighette si sono formate per spiga.'},
              {label: "Numero di Cariossidi/Spighetta", calculatedValue: simSelected.CalculatedData.SeedsIndex,     simulatedValue: simSelected.SimulatedData.SeedsIndex, infoText: 'Indica il numero di cariossidi, o semi, che si sono riempiti nella spighetta.'},
            ]} />
            <GraphComponent infoData={"Fertilizzanti"} dataset={[
              {label: "Azoto",    calculatedValue: simSelected.CalculatedData.CalculatedNutrients.Nitrogen,   simulatedValue: simSelected.SimulatedData.SimulatedNutrients.Nitrogen, infoText: "L'azoto nel grano duro serve per aumentarne la resa produttiva e la qualità della granella"},
              {label: "Fosforo",  calculatedValue: simSelected.CalculatedData.CalculatedNutrients.Phosphorus, simulatedValue: simSelected.SimulatedData.SimulatedNutrients.Phosphorus, infoText: "Il fosforo serve a promuovere la germinazione dei semi e lo sviluppo di un apparato radicale vigoroso, che aumenta l'assorbimento di acqua e nutrienti, favorendo una rapida crescita iniziale della pianta."},
              {label: "Potassio", calculatedValue: simSelected.CalculatedData.CalculatedNutrients.Potassium,  simulatedValue: simSelected.SimulatedData.SimulatedNutrients.Potassium, infoText: "Il potassio è fondamentale per la fotosintesi, il trasporto degli zuccheri, la qualità e la quantità del prodotto, e per la resistenza agli stress ambientali come siccità e freddo."},
            ]} />
          </div>
        </div>
      </div>

      <div className={`${styles.phaseView} ${styles.detailsSection}`}>
        <div className={styles.section}>
           <span className={styles.sectionTitle} >Fasi Fenologiche</span>
          <Tooltip infoText={"Questo grafico mostra i dati ambientali (temperatura, umidita' e precipitazioni) registrati per ogni fase fenologica."} />
        </div>
       <PhaseData phaseData={simSelected.PhaseSimulationData} />
      </div>

    </div>
  )
}

export default SimulationDetails
