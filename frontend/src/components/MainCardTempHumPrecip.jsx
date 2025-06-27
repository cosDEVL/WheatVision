import React, { useState } from 'react';

import HalfDoughnutGraph from './graphs/HalfDoughnutGraph';

import TempPhaseGraph from './graphs/TempPhaseGraph';
import HumidityPhaseGraph from './graphs/HumidityPhaseGraph';
import PrecipPhaseGraph from './graphs/PrecipPhaseGraph';

import './styles/MainCardTempHumPrecip.css';

function MainCardTempHumPrecip({ phaseInfo}) {

    const [selectedPhase, setSelectedPhase] = useState(phaseInfo[0]);

    const [graphSelected, setGraphSelected] = useState("temperature");

    const graphs = {
      "temperature": <TempPhaseGraph duration={selectedPhase.duration} tempPhase={selectedPhase.tempSimulated} />,
      "humidity": <HumidityPhaseGraph duration={selectedPhase.duration} humidityPhase={selectedPhase.humiditySimulated} />,
      "precipitations": <PrecipPhaseGraph duration={selectedPhase.duration} precipPhase={selectedPhase.precipSimulated} />
    }


  return (
    <div className="phase-card">
      <h4>Analisi fasi Fenologiche</h4>
      <div className='main'>
        <div className='primary-data'>
          <div className='side-phase-list'>
              {phaseInfo && (
                  phaseInfo.map(p => {
                      return (
                        <button key={p.phase} className="selected-phase select-box" onClick={()=>setSelectedPhase(p)} disabled={selectedPhase === p ? true : false}>
                          {p.phase}
                        </button>
                      )
                  })
              )}
          </div>
          <div className='phase-graph'>
            <div className="graph-type">
              <button className='temp-graph' onClick={() => setGraphSelected("temperature")} disabled={graphSelected === "temperature" ? true : false}>Temperatura</button>
              <button className='humidity-graph' onClick={() => setGraphSelected("humidity")} disabled={graphSelected === "humidity" ? true : false}>Umidità</button>
              <button className='precip-graph' onClick={() => setGraphSelected("precipitations")} disabled={graphSelected === "precipitations" ? true : false}>Precipitazioni</button>
            </div>
              <div className="graph-selected">
                {graphSelected && graphs[`${graphSelected}`]}
              </div>
          </div>
        </div>
        <div className='secondary-data'>
          <div className="mean-values">
            <h4>Medie dell'intera fase</h4>
            <p>Data di inizio/fine fase</p>
            <span>{selectedPhase.duration.startDate} / {selectedPhase.duration.endDate} [{selectedPhase.duration.days} giorni]</span>
            <p></p>
            <span></span>
            <p>Temperatura media</p>
            <span>{selectedPhase.tempMean} °C</span>
            <p>Umidità media</p>
            <span>{selectedPhase.humidityMean} %</span>
            <p>Precipitazioni Totali</p>
            <span>{selectedPhase.precipitationSum} mm</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainCardTempHumPrecip
