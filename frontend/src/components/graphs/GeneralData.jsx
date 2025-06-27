import React, { useState } from 'react';

import './styles/infoCardStyles.css'

function GeneralData({ formData, generalData, financialData, simulatedData }) {

  const [seeMoreSowingOne, setSeeMoreSowingOne] = useState(false);
  const [seeMoreSowingTwo, setSeeMoreSowingTwo] = useState(false);
  const [seeMoreNutrientsInfo, setSeeMoreNutrientsInfo] = useState(false);
  const [seeMoreFinanceInfo, setSeeMoreFinanceInfo] = useState(true);

  return (
    <div className='general-data info-card'>
        <h2 className="card-title">{formData.nomeSimulazione} - Informazioni Generali</h2>

        <div className="info">
            <div className='sowing-date'>
                <p className='section-title'>Informazioni di semina pt.1 {!seeMoreSowingOne ? <button onClick={() => setSeeMoreSowingOne(!seeMoreSowingOne)}>show less</button> : <button  onClick={() => setSeeMoreSowingOne(!seeMoreSowingOne)}>show more</button>}</p>
                {!seeMoreSowingOne && (
                  <>
                    <section>
                      <span className='section-subtitle'>Periodo di semina</span>
                      <span className='section-info'>{formData?.periodoSemina}</span>
                    </section>
                    
                    <section>
                      <span className='section-subtitle'>Ettari di coltivazione</span>
                      <span className='section-info'>{formData?.ettariColtivazione} ha</span>
                    </section>
                  </>
                )}
                
                
            </div>

              <div className='sowing-info'>
                <p className='section-title'>Informazioni di semina pt.2 {!seeMoreSowingTwo ? <button onClick={() => setSeeMoreSowingTwo(!seeMoreSowingTwo)}>show less</button> : <button  onClick={() => setSeeMoreSowingTwo(!seeMoreSowingTwo)}>show more</button>}</p>
                {!seeMoreSowingTwo && (
                  <>
                    <section>
                      <span className='section-subtitle'>Densità</span>
                      <span className='section-info'>{generalData?.Density} ton/m<sup>3</sup></span>
                    </section>
                    
                    <section>
                      <span className='section-subtitle'>TKW</span>
                      <span className='section-info'>{generalData?.TKW} g</span>
                    </section>
                    
                    <section>
                      <span className='section-subtitle'>Germinabilità</span>
                      <span className='section-info'>{generalData?.Germinability * 100} %</span>
                    </section>
                    
                    <section>
                      <span className='section-subtitle'>Dose di semina</span>
                      <span className='section-info'>{generalData?.SowingRate} ton/ha</span>
                    </section>
                  </>
                )}
                
                
              </div>

              <div className='nutrients-info'>
                <p className='section-title'>Informazioni nutrizionali {!seeMoreNutrientsInfo ? <button onClick={() => setSeeMoreNutrientsInfo(!seeMoreNutrientsInfo)}>show less</button> : <button onClick={() => setSeeMoreNutrientsInfo(!seeMoreNutrientsInfo)}>show more</button>}</p>
                {!seeMoreNutrientsInfo && (
                  <>
                    <section>
                      <span className='section-subtitle'>Dose di Azoto</span>
                      <span className='section-info'>{simulatedData.SimulatedNutrients.Nitrogen} kg/ha</span>
                    </section>
                    
                    <section>
                      <span className='section-subtitle'>Dose di Fosforo</span>
                      <span className='section-info'>{simulatedData.SimulatedNutrients.Phosphorus} kg/ha</span>
                    </section>
                    
                    <section>
                      <span className='section-subtitle'>Dose di Potassio</span>
                      <span className='section-info'>{simulatedData.SimulatedNutrients.Potassium} kg/ha</span>
                    </section>
                  </>
                )}
                
                
              </div>

              <div className="financial-info">
                <p className='section-title'>Performance Finanziaria {!seeMoreFinanceInfo ? <button onClick={() => setSeeMoreFinanceInfo(!seeMoreFinanceInfo)}>show less</button> : <button onClick={() => setSeeMoreFinanceInfo(!seeMoreFinanceInfo)}>show more</button>}</p>
                {!seeMoreFinanceInfo && (
                  <>
                    <section>
                      <span>Tipo di frumento</span>
                      <span>{financialData?.WheatType}</span>
                    </section>
                    <section>
                        <span>Prezzo della semente per ettaro</span>
                        <span>{financialData?.WheatSeedPrice.PerHectares} €/ha</span>
                    </section>
                    <section>
                        <span>Prezzo totale delle sementi</span>
                        <span>{financialData?.WheatSeedPrice.Total} €</span>
                    </section>
                    <section>
                        <span>Prezzo di vendita del frumento per tonnellata</span>
                        <span>{financialData?.DurumWheatPrice.PerTons} €/ton</span>
                    </section>
                    <section>
                        <span>Prezzo di vendita frumento totale</span>
                        <span>{financialData?.DurumWheatPrice.Total} €</span>
                    </section>
                  </>
                )}
                
              </div>
        </div>
    </div>
  )
}

export default GeneralData
