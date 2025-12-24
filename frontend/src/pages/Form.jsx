import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

import InputField from '../components/FormComponents/InputField';

import styles from '../styles/pages/Form.module.css'
import Error from '../components/Error';

  const initialFormState = {
    nomeSimulazione: '',
    periodoSemina: '',
    ettariColtivazione: '',
    densita: '',
    pesoDiMille: '',
    germinabilita: '',
    azoto: '',
    fosforo: '',
    potassio: ''
  };

function Form({ onSubmitSuccess, newSimSelected, onCloseForm, onError }) {
  
  const apiUrl = `http://${window.location.hostname}:8000`;

  //stato form
  const [formInput, setFormInput] = useState(initialFormState);

  //stati per gestire il caricamento e gli errori
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  //Unico gestore per tutti i campi del form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormInput(prevInput => ({
      ...prevInput,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      
      const res = await axios.post(`${apiUrl}/api/simulation/startSimulation`, formInput);
      console.log('Risposta server:', res.data);

      newSimSelected(formInput.nomeSimulazione);

      setFormInput(initialFormState);
      if (onSubmitSuccess) onSubmitSuccess();
      if (onCloseForm) onCloseForm();


    } catch (error) {
      onError("Errore durante l'invio del form...", error);
      console.error("Errore durante l'invio del form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className={styles.bgShadow}>
      <div className={styles.formWindow}>
        <div className={styles.header}>
          <h4>Modulo di simulazione</h4>
          <button type="button" onClick={onCloseForm} disabled={isSubmitting}>CHIUDI</button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.moduleSection}>
            
            <div className={styles.formSection}>
              <span className={styles.sectionTitle}>Informazioni Generali</span>
              <div>
                <InputField label="Nome della simulazione" name="nomeSimulazione" value={formInput.nomeSimulazione} onChange={handleInputChange} required />
                <InputField label="Periodo di semina" name="periodoSemina" type="date" value={formInput.periodoSemina} onChange={handleInputChange} infoText={"Indica la data di partenza della simulazione. La scelta di questa data sara' presa in considerazione anche per la generazione dei dati climatici."} min="2021-10-01" max="2023-12-31" required />
                <InputField label="Ettari di coltivazione" name="ettariColtivazione" type="number" value={formInput.ettariColtivazione} onChange={handleInputChange} infoText={"Indica quanti ettari predisporre per la simulazione"} min={0} required />
              </div>
            </div>

            <div className={styles.formSection}>
              <span className={styles.sectionTitle}>Informazioni di semina</span>
              <div>
                <InputField label="Densità" name="densita" type="select" value={formInput.densita} onChange={handleInputChange} infoText={"Indica il numero di semi germinabili per metro quadro. Puo' variare tra 300 e 500 semi."} required>
                  <option value="" disabled>Seleziona un valore</option>
                  <option value={300}>300</option>
                  <option value={350}>350</option>
                  <option value={400}>400</option>
                  <option value={450}>450</option>
                  <option value={500}>500</option>
                </InputField>
                <InputField label="Peso di mille semi" name="pesoDiMille" type="number" value={formInput.pesoDiMille} onChange={handleInputChange} infoText={"Indica il peso di mille semi il quale dipende dalla varieta' del seme. Generalmente si aggira tra 35 e 60 grammi."} min={30} max={60} required />
                <InputField label="Germinabilità" name="germinabilita" type="number" value={formInput.germinabilita} onChange={handleInputChange} infoText={"Indica la percentuale con cui un seme puo' dare origine alla pianta."} min={80} max={100} required />
              </div>
            </div>

            <div className={styles.formSection}>
              <span className={styles.sectionTitle}>Fertilizzanti</span>
              <div>
                <InputField label="Dose di Azoto" name="azoto" type="number" value={formInput.azoto} onChange={handleInputChange} infoText={"L'azoto nel grano duro serve per aumentarne la resa produttiva e la qualità della granella"} min={0} required />
                <InputField label="Dose di Fosforo" name="fosforo" type="number" value={formInput.fosforo} onChange={handleInputChange} infoText={"Il fosforo serve a promuovere la germinazione dei semi e lo sviluppo di un apparato radicale vigoroso, che aumenta l'assorbimento di acqua e nutrienti, favorendo una rapida crescita iniziale della pianta."} min={0} required />
                <InputField label="Dose di Potassio" name="potassio" type="number" value={formInput.potassio} onChange={handleInputChange} infoText={"Il potassio è fondamentale per la fotosintesi, il trasporto degli zuccheri, la qualità e la quantità del prodotto, e per la resistenza agli stress ambientali come siccità e freddo."} min={0} required />
              </div>
            </div>

          </div>

          <div className='submit-button'>
            <button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Salvataggio...' : 'Submit Form'}
            </button>
          </div>
          
        </form>
      </div>
    </div>
  )
}

export default Form
