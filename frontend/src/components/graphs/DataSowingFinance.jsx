import React from 'react';
import '../graphs/styles/dataSowingFinanceStyles.css'

function DataSowingFinance({ formDataSelected, sowingData, financeData }) {

    

  return (
    <div className='static-info'>
        <span className='sim-name'>{formDataSelected.nomeSimulazione}</span>
        <div className='sowing-info-card card'>
              <span className='section-title'>Informazioni di semina</span>
              <section>
                <span>Periodo di semina</span>
                <span>{formDataSelected.periodoSemina}</span>
              </section>

              <section>
                <span>Ettari di coltivazione</span>
                <span>{formDataSelected.ettariColtivazione} ha</span>
              </section>

              <section>
                <span>Densità</span>
                <span>{sowingData?.density} ton/m<sup>3</sup></span>
              </section>

              <section>
                <span>TKW</span>
                <span>{sowingData?.tkw} g</span>
              </section>

              <section>
                <span>Germinabilità</span>
                <span>{sowingData?.germinability} %</span>
              </section>
               
              <section>
                <span>Dose di semina</span>
                <span>{sowingData?.sowingRate} ton/ha</span>
              </section>
            </div>
            <div className='finance-info-card card'>
              <span className='section-title'>Informazioni finanziarie</span>
              <section>
                <span>Tipo di frumento</span>
                <span>{financeData?.wheatType}</span>
              </section>
              <section>
                <span>Prezzo della semente per ettaro</span>
                <span>{financeData?.wheatSeedPricePerHectares} €/ha</span>
              </section>
              <section>
                <span>Prezzo totale delle sementi</span>
                <span>{financeData?.wheatSeedPriceTotal} €</span>
              </section>
              <section>
                <span>Prezzo di vendita del frumento per tonnellata</span>
                <span>{financeData?.durumWheatPricePerTons} €/ton</span>
              </section>
              <section>
                <span>Prezzo di vendita frumento totale</span>
                <span>{financeData?.durumWheatPriceTotal} €</span>
              </section>
            </div>
    </div>
  )
}

export default DataSowingFinance