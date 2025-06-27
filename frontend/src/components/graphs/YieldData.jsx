import React from 'react';

import './styles/yieldDataStyles.css'

function YieldData({calculatedData, simulatedData}) {

  return (
    <div className='yield-data'>
      <h4>Confronto dati teorici/simulati</h4>
      <div className="yield-comparison">
        <div className="calculated-data data">
            <span className='div-title'>Dati teorici</span>
            <div className="nutrients">
                <section>
                    <span className="section-title">Azoto</span>
                    <span className="section-info">{calculatedData.CalculatedNutrients.Nitrogen} kg/ha</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Fosforo</span>
                    <span className="section-info">{calculatedData.CalculatedNutrients.Phosphorus} kg/ha</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Potassio</span>
                    <span className="section-info">{calculatedData.CalculatedNutrients.Potassium} kg/ha</span>
                </section>
                
            </div>
            <div className="precipitations">
                <span className="section-title">Precipitazioni</span>
                <span className="section-info">{calculatedData.CalculatedPrecipitations} mm</span>
            </div>
            <div className="index">
                <section>
                    <span className="section-title">Indice di accestimento</span>
                    <span className="section-info">{calculatedData.TilleringIndex}</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Numero di spighette/spiga</span>
                    <span className="section-info">{calculatedData.SpikeletsIndex}</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Numero di cariossidi/spiga</span>
                    <span className="section-info">{calculatedData.SeedsIndex}</span>
            </section>
                </div>
               
            <div className="yield">
                <span className="section-title">Resa/Ettaro</span>
                <span className="section-info">{calculatedData.YieldCalculatedPerHectares} ton/ha</span>
            </div>
        </div>

        <div className="simulated-data data">
            <span className='div-title'>Dati simulati</span>
            <div className="nutrients">
                <section>
                    <span className="section-title">Azoto</span>
                    <span className="section-info">{simulatedData.SimulatedNutrients.Nitrogen} kg/ha</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Fosforo</span>
                    <span className="section-info">{simulatedData.SimulatedNutrients.Phosphorus} kg/ha</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Potassio</span>
                    <span className="section-info">{simulatedData.SimulatedNutrients.Potassium} kg/ha</span>
                </section>
                
            </div>
            <div className="precipitations">
                <span className="section-title">Precipitazioni</span>
                <span className="section-info">{simulatedData.SimulatedPrecipitations} mm</span>
            </div>
            <div className="index">
                <section>
                  <span className="section-title">Indice di accestimento</span>
                    <span className="section-info">{simulatedData.TilleringIndex}</span>  
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Numero di spighette/spiga</span>
                    <span className="section-info">{simulatedData.SpikeletsIndex}</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Numero di cariossidi/spiga</span>
                    <span className="section-info">{simulatedData.SeedsIndex}</span>
                </section>
                
            </div>
            <div className="yield">
                <section>
                    <span className="section-title">Resa/Ettaro</span>
                    <span className="section-info">{simulatedData.YieldSimulated.PerHectares} ton/ha</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Resa totale</span>
                    <span className="section-info">{simulatedData.YieldSimulated.Total} ton</span>
                </section>
                <div className="border"></div>
                <section>
                    <span className="section-title">Peso ettolitrico</span>
                    <span className="section-info">{simulatedData.HectolitreWeight} ha/l</span>
                </section>
                
            </div>
        </div>
      </div>
    </div>
  )
}

export default YieldData
