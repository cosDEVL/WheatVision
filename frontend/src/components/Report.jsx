import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from './Navbar';
import './styles/reportStyles.css'

function Report() {

    const apiUrl = `http://${window.location.hostname}:8000`;

    const [simulationsData, setSimulationsData] = useState([]);


    const [deleted, setDeleted] = useState(true);
    const [search, setSearch] = useState(true);

useEffect(() => {

    if (deleted) {
        setDeleted(false);
        if (search) {
            
            axios.get(`${apiUrl}/api/report/fullReport`)
            .then((res) => setSimulationsData(res.data))
            .catch((err) => console.log(err));
        
            
        }
    }

}, [deleted,search]);

console.log(simulationsData);

function handleDelete() {
    if (window.confirm("sei sicuro?")) {
        axios.delete(`${apiUrl}/api/report/deleteAllReports`)
        .then(() => {
            setSimulationsData([]);

            setSearch(false);
            setDeleted(true);
        })
        .catch((err) => console.log(err));
    }
}

  return (
    <>
         <Navbar />

        <div className='report-page'>

            <div className="header-page">
                <h1>Tabelle di simulazione</h1>
                <button onClick={() => handleDelete()}>Delete all reports</button>
            </div>
            <p>Qui sarà possibile visionare le tabelle contenenti i dati relativi alle varie simulazioni.</p>
            
            

                    {
                        simulationsData.map((sim) => {

                            const formData = sim.simulationForm;
                            const theoreticalData = sim.theoreticalSowingData;
                            const simulatedData = sim.simulatedSowingData;
                            const financeData = sim.financeData;

                            return (
                                <table key={formData._id}>
                                    <thead>
                                        <tr>
                                            <th colSpan={8}>{formData.nomeSimulazione}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className='section'>
                                            <td colSpan={7}>Simulation Form Data</td>
                                        </tr>
                                        <tr className='header'>
                                            <td>Periodo di semina</td>
                                            <td>Ettari di coltivazione [ha]</td>
                                            <td>Densità [piante/mq]</td>
                                            <td>TKW [q]</td>
                                            <td>Germinabilità [%]</td>
                                            <td colSpan={2}>Nutrienti (Azoto/Fosforo/Potassio) [kg/ha]</td>
                                        </tr>
                                        <tr className='content'>
                                            <td>{formData.periodoSemina}</td>
                                            <td>{formData.ettariColtivazione}</td>
                                            <td>{formData.densita}</td>
                                            <td>{formData.pesoDiMille}</td>
                                            <td>{formData.germinabilita}</td>
                                            <td colSpan={2}>{`${formData.azoto} | ${formData.fosforo} | ${formData.potassio}`}</td>
                                        </tr>
                                        
                                        <tr className='section'>
                                            <td colSpan={7}>Dati della resa teorica</td>
                                        </tr>
                                        <tr className='header'>
                                            <td>Resa per ettaro [ton/ha]</td>
                                            <td>Indice di accestimento [n.Spighe/Pianta]</td>
                                            <td>Indice di spighette [n.Spighette/Spiga]</td>
                                            <td>Indice di semi [n.Cariossidi/Spighetta]</td>
                                            <td>Precipitazioni totali richieste [mm]</td>
                                            <td colSpan={2}>Nutrienti richiesti (Azoto/Fosforo/Potassio) [kg/ha]</td>
                                        </tr>
                                        <tr className='content'>
                                            <td>{theoreticalData.yieldCalculatedPerHectares}</td>
                                            <td>{theoreticalData.tilleringIndex}</td>
                                            <td>{theoreticalData.spikeletsIndex}</td>
                                            <td>{theoreticalData.seedsIndex}</td>
                                            <td>{theoreticalData.theoreticalPrecipitations}</td>
                                            <td colSpan={2}>{`${theoreticalData.theoreticalNitrogen} | ${theoreticalData.theoreticalPhosphorus} | ${theoreticalData.theoreticalPotassium}`}</td>
                                        </tr>

                                        <tr className='section'>
                                            <td colSpan={7}>Dati della resa simulata</td>
                                        </tr>
                                        <tr className='header'>
                                            <td>Resa per ettaro [ton/ha]</td>
                                            <td>Indice di accestimento [n.Spighe/Pianta]</td>
                                            <td>Indice di spighette [n.Spighette/Spiga]</td>
                                            <td>Indice di semi [n.Cariossidi/Spighetta]</td>
                                            <td>Precipitazioni totali richieste [mm]</td>
                                            <td>Nutrienti richiesti (Azoto/Fosforo/Potassio) [kg/ha]</td>
                                            <td>Peso ettolitrico [kg/hl]</td>
                                        </tr>
                                        <tr className='content'>
                                            <td>{simulatedData.yieldSimulatedPerHectares}</td>
                                            <td>{simulatedData.tilleringIndex}</td>
                                            <td>{simulatedData.spikeletsIndex}</td>
                                            <td>{simulatedData.seedsIndex}</td>
                                            <td>{simulatedData.simulatedPrecipitations}</td>
                                            <td>{`${simulatedData.simulatedNitrogen} | ${simulatedData.simulatedPhosphorus} | ${simulatedData.simulatedPotassium}`}</td>
                                            <td>{simulatedData.hectolitreWeight}</td>
                                        </tr>
                                        <tr className='section'>
                                            <td colSpan={7}>Dati delle fasi simulate</td>
                                        </tr>
                                        <tr className='header'>
                                            <td>Fase fenologica</td>
                                            <td>Data di inizio/fine</td>
                                            <td>Durata [n.Giorni]</td>
                                            <td>Temperatura media</td>
                                            <td>Umidità media</td>
                                            <td colSpan={2}>Precipitazioni simulate</td>
                                        </tr>
                                        {
                                            simulatedData.simulation.map((phase) => {
                                                return (
                                                    <tr className='content' key={phase.duration.startDate}>
                                                        <td>{phase.phase}</td>
                                                        <td>{`${phase.duration.startDate} / ${phase.duration.endDate}`}</td>
                                                        <td>{phase.duration.days}</td>
                                                        <td>{phase.tempMean}</td>
                                                        <td>{phase.humidityMean}</td>
                                                        <td colSpan={2}>{phase.precipitationSum}</td>
                                                    </tr>
                                                )
                                            })
                                        }

                                        <tr className='section'>
                                            <td colSpan={7}>Dati finanziari della simulazione</td>
                                        </tr>
                                        <tr className='header'>
                                            <td colSpan={2}>Tipo di frumento</td>
                                            <td>Prezzo della semente per ettaro [€/ha]</td>
                                            <td>Prezzo totale delle sementi [€]</td>
                                            <td>Prezzo di vendita del frumento per ton. [€/ton]</td>
                                            <td colSpan={2}>Prezzo di vendita del frumento totale [€]</td>
                                        </tr>
                                        <tr className='content'>
                                            <td colSpan={2}>{financeData.wheatType}</td>
                                            <td>{financeData.wheatSeedPricePerHectares}</td>
                                            <td>{financeData.wheatSeedPriceTotal}</td>
                                            <td>{financeData.durumWheatPricePerTons}</td>
                                            <td colSpan={2}>{financeData.durumWheatPriceTotal}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )
                        })
                    }

            <div className="nothing"></div> 

        </div>

        
    </>
  )
}

export default Report