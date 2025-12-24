import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import SimulationReportTable from '../components/ReportComponents/SimulationReportTable';
import LoadingSpinner from '../components/LoadingSpinner';

import styles from '../styles/pages/Report.module.css';
import Error from '../components/Error';

  

function Report() {

   

    const apiUrl = `http://${window.location.hostname}:8000`;

    const [simulationsData, setSimulationsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Stato per gli errori
    const [errorType, setErrorType] = useState("");
    const [error, setError] = useState(null);

    //------ Funzione per la gestione degli errori ---------
    const errorManager = (type, error) => {
        setErrorType(type);
        if (error.code === "ERR_NETWORK") setError("Connessione al Database non riuscita... Ricaricare la pagina!");
        else setError(error.message);

        setTimeout(() => {
            setErrorType("");
            setError("");
        }, 5000)
    }

    const fetchReports = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const res = await axios.get(`${apiUrl}/api/report/fullReport`);
            setSimulationsData(res.data);
        } catch (err) {
            errorManager("Errore nel caricamento dei report...", err);
            console.error("Errore nel caricamento dei report:", err);
        } finally {
            setIsLoading(false);
        }
    }, [apiUrl]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    const handleDelete = async () => {
        if (window.confirm("Sei sicuro di voler cancellare tutti i report? L'azione è irreversibile.")) {
            try {
                await axios.delete(`${apiUrl}/api/report/deleteAllReports`);
                setSimulationsData([]);
            } catch (err) {
                errorManager("Errore nella cancellazione dei report...", err);
                console.error("Errore nella cancellazione dei report:", err);
            }
        }
    };

    return (
        <>
            <Navbar />

            {isLoading && <LoadingSpinner text='Caricamento tabelle di simulazione in corso...' />}
            {error && <Error errorType={errorType} error={error} />}


            <div className={styles.reportPage}>
                <div className={styles.header}>
                    <h1>Tabelle di simulazione</h1>
                    {simulationsData.length > 0 ?(
                        <>
                            <button onClick={handleDelete} disabled={isLoading}>
                                Delete all reports
                            </button>
                            <p className={styles.reportIntro}>Qui è possibile visionare le tabelle contenenti i dati relativi alle varie simulazioni.</p>
                        </>
                    ) : <p className={styles.noSimFound}>Nessun report di simulazione trovato nel database.</p>}
                </div>
                
                
                {simulationsData.map((sim) => (
                    <div className={styles.table}>
                        <SimulationReportTable key={sim.simulationForm._id} simulation={sim} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Report;