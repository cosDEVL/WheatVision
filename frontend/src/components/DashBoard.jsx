import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BarGraphIndex from './graphs/BarGraphIndex';
import BarGraphNutrients from './graphs/BarGraphNutrients';
import HalfDoughnutGraph from './graphs/HalfDoughnutGraph';
import PolarAreaGraph from './graphs/PolarAreaGraph';
import FullDoughnutGraph from './graphs/FullDoughnutGraph';
import BarGraphTempHum from './graphs/BarGraphTempHum';
import DataSowingFinance from './graphs/DataSowingFinance';

import Navbar from './Navbar';

import './styles/dashboardStyles.css'
import './styles/loadingSpinners.css'

import Form from './Form';

function DashBoard() {

  const apiUrl = `http://${window.location.hostname}:8000`;

  const[openForm, setOpenForm] = useState(false);
  const[openFormList, setOpenFormList] = useState(true);
  

  const [loadingForm, setLoadingForm] = useState(true);
  const [loadingData, setLoadingData] = useState(true);

  console.log(loadingData);

  const [formData, setFormData] = useState([]);

  const [formDataSelected, setFormDataSelected] = useState(null);
  const [sowingData, setSowingData] = useState(null);
  const [theoricalData, setTheoricalData] = useState(null);
  const [simulatedData, setSimulatedData] = useState(null);
  const [financeData, setFinanceData] = useState(null);


  function fetchFromData() {
    axios.get(`${apiUrl}/api/report/simulationFormReport`)
    .then((res) => {
      setFormData(res.data);
    }).then(() => setLoadingForm(false))
    .catch((err) => {
      console.log(err);
      setLoadingForm(false);
    });
  }

  useEffect(() => {
    fetchFromData();
  }, []);

  function handleDeleteReport(nomeSimulazione, e) {
    e.stopPropagation(); // <-- blocca il click sul div

    if (window.confirm("sei sicuro?")) {
      axios.delete(`${apiUrl}/api/report/deleteReport/${nomeSimulazione}`)
      .then(() => {

          setFormDataSelected(null);
          setSowingData(null);
          setTheoricalData(null);
          setSimulatedData(null);
          setFinanceData(null);

        setFormData(prevData => prevData.filter(form => form.nomeSimulazione !== nomeSimulazione));
      })
      .catch((err) => console.log(err));
    }
  }

  function handleDataRequest(nomeSimulazione) {
    
    if ((formDataSelected === null) || (nomeSimulazione !== formDataSelected.nomeSimulazione) ) {
      setOpenFormList(false);
      
      setLoadingData(true);
      
      axios.get(`${apiUrl}/api/report/simulationID/${nomeSimulazione}`)
      .then((res) => {
        const simData = res.data;
        setFormDataSelected(simData.formInfo);
        setSowingData(simData.sowingInfo);
        setTheoricalData(simData.theoreticalSowingData);
        setSimulatedData(simData.simulatedSowingData);
        setFinanceData(simData.financeData);

      })
      .then(() => setLoadingData(false))
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });

    }
    
  }


  return (
    <div className='dashboard-page'>

      <Navbar />

      {openForm && (

          <div className='form-window'>
            <Form onSubmitSuccess={fetchFromData} onCloseForm={() => setOpenForm(false)} />
            <span className='close-form' onClick={() => setOpenForm(false)}>&#x2716;</span>
          </div>

        
      )}

      {loadingForm ? (
        <div className='loading-dashboard-forms'>
          <span className="loader"></span>
          <span className='text'>Caricamento dati...</span>
        </div>
      ) : (
        <div className='dashboard-data'>
          {formData.length > 0 ? (
            <>
              <button className='open-form-list' onClick={() => setOpenFormList(true)}>&#9658;</button>
              {openFormList && (
                <>
                  <div className='form-cards'>
                    
                    <button className='new-sim-btn' onClick={() => {
                        if(openForm === false) {
                          setOpenForm(true); 
                          setOpenFormList(false);
                        }
                      }}>Nuova Simulazione</button>
                    {formData.map((form) => {
                      return (
                        <div className='card' key={form._id} id={form.nomeSimulazione} onClick={() => {
                              if(openForm === false) {
                                handleDataRequest(form.nomeSimulazione);
                              }
                            }}>
                          <section>
                            <span>Nome della simulazione:</span>
                            <span>{form.nomeSimulazione}</span>
                          </section>
                          <section>
                            <span>Periodo di semina:</span>
                            <span>{form.periodoSemina}</span>
                          </section>
                          <section>
                            <span>Ettari di coltivazione:</span>
                            <span>{form.ettariColtivazione} ha</span>
                          </section>
                          <section>
                            <span>Densità di piante:</span>
                            <span>{form.densita} piante/m<sup>3</sup></span>
                          </section>
                          <section>
                            <span>TKW:</span>
                            <span>{form.pesoDiMille} g</span>
                          </section>
                          <section>
                            <span>Germinabilità del seme:</span>
                            <span>{form.germinabilita}%</span>
                          </section>
                          <section>
                            <span>Dose di Azoto:</span>
                            <span>{form.azoto} kg/ha</span>
                          </section>
                          <section>
                            <span>Dose di Fosforo:</span>
                            <span>{form.fosforo} kg/ha</span>
                          </section>
                          <section>
                            <span>Dose di Potassio:</span>
                            <span>{form.potassio} kg/ha</span>
                          </section>

                          <button onClick={(e) => handleDeleteReport(form.nomeSimulazione, e)}>Cancella Report</button>
                        </div>
                      )}
                    )}
                    <button className='close-form-list' onClick={() => setOpenFormList(false)}>&#9668;</button>
                  </div>
                </>
              )}

              <>
                {formDataSelected ? (
                  <div className='data-result' onClick={() => setOpenFormList(false)}>
                    <span id='sticky-sim-name' className='sticky-sim-name'>{formDataSelected.nomeSimulazione}</span>
                    {
                      loadingData ? (
                        <div className='loading-dashboard-forms'>
                          <span className="loader"></span>
                          <span className='text'>Caricamento dati...</span>
                        </div>
                      ) : (
                      <div className='dashboard-result'>
                        
                        {theoricalData && simulatedData && sowingData && financeData && (
                          <>
                            
                            <div className='general-info'>
                              <DataSowingFinance formDataSelected={formDataSelected} sowingData={sowingData} financeData={financeData} />
                            </div>

                            <div className="graphs">
                              <div className='index-bar bar-graph graph'>
                                <h2>Indici di semina</h2>
                                <BarGraphIndex theoricalData={theoricalData} simulatedData={simulatedData} />
                              </div>

                              <div className='nutrients-bar bar-graph graph'>
                                <h2>Info N-P-K</h2>
                                <BarGraphNutrients theoricalData={theoricalData} simulatedData={simulatedData} />
                              </div>

                              <div className='precip-doughnut doughnut-graph graph'>
                                <h2>Info Precipitazioni</h2>
                                <HalfDoughnutGraph theoricalData={theoricalData} simulatedData={simulatedData} /> 
                              </div>

                              <div className='precip-reg-doughnut doughnut-graph graph'>
                                <h2>Precipitazioni registrate per fasi</h2>
                                <PolarAreaGraph simulatedData={simulatedData} />
                              </div>

                              <div className='temp-hum-bar bar-graph graph'>
                                <h2>Temperatura e umidità medie registrate per fase</h2>
                                <BarGraphTempHum simulatedData={simulatedData} />
                              </div>

                              <div className='duration-doughnut doughnut-graph graph'>
                                <h2>Durata di ogni fase</h2>
                                <FullDoughnutGraph simulatedData={simulatedData} />
                              </div>
                            </div>

                          </>
                        )}
                      </div>
                    )}

                  </div>
                ) : (
                  <div className='no-sim-selected-page'>
                    <span>Selezionare una simulazione</span>
                  </div>
                )}

              </>
            </>
          ) : (
            <div className="no-data-page">
              <span>Nessuna Simulazione presente nel Database</span>
              <span>Clicca a fianco per una <button className='new-sim-btn' onClick={() => setOpenForm(true)}>Nuova Simulazione</button></span>
            </div>
          )}
          
          

        </div>
      )
      
      }

    </div>
  )
}

export default DashBoard