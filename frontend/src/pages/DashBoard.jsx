import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

import LoadingSpinner from "../components/LoadingSpinner";

import Navbar from "../components/Navbar";
import Form from "./Form";
import SimulationDetails from "../components/DashBoardComponents/SimulationDetails";
import SimulationLists from "../components/DashBoardComponents/SimulationLists";

import "../styles/loadingSpinners.css";
import styles from "../styles/pages/Dashboard.module.css";
import Error from "../components/Error";

function DashBoard() {
  const apiUrl = `http://${window.location.hostname}:8000`;

  //----- STATI -------

  // Stati per la UI
  const [openForm, setOpenForm] = useState(false);
  const [openFormList, setOpenFormList] = useState(true);

  // Stati per il caricamento
  const [loadingForm, setLoadingForm] = useState(true);
  const [loadingData, setLoadingData] = useState(false);

  // Stati per i dati
  const [formData, setFormData] = useState([]);
  const [simSelected, setSimSelected] = useState(null);

  // Stato per i dati della simulazione selezionata
  const [simulationDetails, setSimulationDetails] = useState(null);

  // Stato per gli errori
  const [errorType, setErrorType] = useState("");
  const [error, setError] = useState("");

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


  //------ Funzioni di Fetch ---------

  // Funzione per caricare la lista di tutte le simulazioni
  const fetchFormData = useCallback(async () => {
    setLoadingForm(true);

    try {
      const res = await axios.get(`${apiUrl}/api/report/simulationFormReport`);
      setFormData(res.data.reverse());
    } catch (error) {

      errorManager("Errore nel caricamento delle simulazioni!", error);

      console.error("Errore nel caricamento delle simulazioni:", error);
    } finally {
      setLoadingForm(false);
    }
  }, [apiUrl]);

  // Funzione per caricare i dettagli di una simulazione selezionata
  const fetchSimulationData = async (simulationId) => {
    if (!simulationId) return;

    setLoadingData(true);
    setOpenFormList(false);

    try {
      const res = await axios.get(
        `${apiUrl}/api/report/simulationID/${simulationId}`
      );
      setSimulationDetails(res.data.simulationData);
    } catch (error) {

      errorManager(`Errore nel caricamento dei dati della simulazione '${simulationId}'!`, error);
      console.error(`Errore nel caricamento dei dati della simulazione ${simulationId}:`,error);
      setSimulationDetails(null);
    } finally {
      setLoadingData(false);
    }
  };

  //-------- USE EFFECT ----------

  // Esegue il fetch della lista delle simulazioni
  useEffect(() => {
    fetchFormData();
  }, [fetchFormData]);

  // Esegue il fetch dei dettagli della simulazione selezionata
  useEffect(() => {
    fetchSimulationData(simSelected);
  }, [simSelected]);

  //--------- HANDLERS -----------

  // Handler per l'eliminazione di una simulazione dal database
  const handleDeleteReport = async (simName, e) => {
    e.stopPropagation();

    if (window.confirm("Conferma di voler eliminare la simulazione?")) {
      try {
        await axios.delete(`${apiUrl}/api/report/deleteReport/${simName}`);

        if (simSelected === simName) {
          setSimSelected(null);
          setSimulationDetails(null);
        }

        setFormData((prevData) =>
          prevData.filter((form) => form.nomeSimulazione !== simName)
        );
      } catch (error) {

        errorManager(`Errore nell'eliminazione della simulazione '${simName}'!`, error);
        console.error(
          `Errore nell'eliminazione della simulazione ${simName}:`,
          error
        );
      }
    }
  };

  // Handler per l'eliminazione di tutte le simulazioni dal database
  const handleDeleteAllReport = async () => {
    if (window.confirm("Conferma di voler eliminare tutte le simulazioni?")) {
      try {
        await axios.delete(`${apiUrl}/api/report/deleteAllReports`);

        setSimSelected(null);
        setSimulationDetails(null);

        setFormData([]);
      } catch (error) {
        errorManager(`Errore nell'eliminazione delle simulazioni!`, error);
        console.error(`Errore nell'eliminazione delle simulazioni:`, error);
      }
    }
  };

  // Handler per l'apertura del Form
  const handleNewSimReq = () => {
    if (!openForm) {
      setOpenForm(true);
      setOpenFormList(false);
    }
  };

  // Handler per la selezione di una simulazione
  const handleSimSelection = (simName) => {
    if (!openForm) setSimSelected(simName);
  };

  const handleCloseList = () => {
    if(openFormList) setOpenFormList(!openFormList);
  }

  // ------ RENDER ---------

  if (loadingForm) {
    return (
      <>
        <Navbar />
        <LoadingSpinner text="Caricamento dati..." />
      </>
    );
  }

  return (
    <>
      <Navbar />
      {error && <Error errorType={errorType} error={error} />}

      <div className={styles.mainPage}>
        {openForm && (
          <Form
            onSubmitSuccess={fetchFormData}
            newSimSelected={setSimSelected}
            onCloseForm={() => setOpenForm(false)}
            onError={(type, error) => errorManager(type, error)}
          />
        )}

        <div className={styles.dbData}>
          {formData.length > 0 ? (
            <>
              <div className={styles.btns}>
                <button className={`${styles.listBtn} ${styles.btn}`} onClick={() => setOpenFormList(!openFormList)}>
                  Apri Lista simulazioni
                </button>
                <button className={`${styles.newSimBtn} ${styles.btn}`} onClick={() => handleNewSimReq()}>
                  Nuova Simulazione
                </button>
              </div>

              {openFormList && (
                <SimulationLists
                  formData={formData}
                  simSelected={simSelected}
                  onSelect={handleSimSelection}
                  onDeleteSim={handleDeleteReport}
                  onDeleteAll={handleDeleteAllReport}
                  onNewSim={handleNewSimReq}
                  onCloseList={handleCloseList}
                />
              )}

              <SimulationDetails
                isLoading={loadingData}
                simSelected={simulationDetails}
              />
            </>
          ) : (
            <div className={styles.noSimDetected}>
              <span>Nessuna simulazione presente nel DataBase!</span>
              <span>
                Clicca per creare una{" "}
                <button className={`${styles.newSimBtn} ${styles.btn}`} onClick={handleNewSimReq}>
                  Nuova Simulazione
                </button>
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default DashBoard;
