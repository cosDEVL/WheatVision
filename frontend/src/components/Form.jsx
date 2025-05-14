import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import './styles/formStyles.css';
import './styles/mediaQR-1024/formStyle-1024.css';
import './styles/mediaQR-768/formStyle-768.css';

function Form({ onSubmitSuccess, onCloseForm }) {

    const apiUrl = `http://${window.location.hostname}:8000`;

    const navigate = useNavigate();

    const [formInput, setFormInput] = useState({
        nomeSimulazione: '',
        periodoSemina: '',
        ettariColtivazione: '',
        densita: '',
        pesoDiMille: '',
        germinabilita: '',
        azoto: '',
        fosforo: '',
        potassio: ''
    })

    const initialState = {
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

    function handleSubmit(e) {
        e.preventDefault();
        
        console.log(formInput);

        axios.post(`${apiUrl}/api/simulation/form`, formInput)
        .then((res) => {
            console.log(res);
            setFormInput(initialState);
            if(onSubmitSuccess) onSubmitSuccess();
            if(onCloseForm) onCloseForm();
        })
        .catch((err) => console.log(err));

        

        navigate('/dashboard');
    }

  return (
        <div className="form-side">

            <form onSubmit={handleSubmit}>

                <div className="header">
                    <h4>Modulo di simulazione</h4>
                    <button onClick={() => onCloseForm()} className='close-btn'>&#10539;</button>
                </div>

                <div className="module-section">
                    <div className="section section-one">
                        <div className='inputField'>
                            <label htmlFor="nomeSimulazione"><p>Nome della simulazione</p></label>
                            <input type="text" id='nomeSimulazione' name='nomeSimulazione' autoComplete='off' required value={formInput.nomeSimulazione} onChange={(e) => setFormInput({...formInput, nomeSimulazione: e.target.value})}/>
                        </div>
                        <div className='inputField'>
                            <label htmlFor="periodoSemina"><p>Periodo di semina</p></label>
                            <input type="date" id='periodoSemina' name='periodoSemina' autoComplete='off' min={"2021-10-01"} max={"2023-12-31"} required value={formInput.periodoSemina} onChange={(e) => setFormInput({...formInput, periodoSemina: e.target.value})}/>
                        </div>
                        <div className='inputField'>
                            <label htmlFor="ettariColtivazione"><p>Ettari di coltivazione</p></label>
                            <input type="number" id='ettariColtivazione' name='ettariColtivazione' autoComplete='off' min={0} required value={formInput.ettariColtivazione} onChange={(e) => setFormInput({...formInput, ettariColtivazione: e.target.value})}/>
                        </div>
                    </div>

                    <div className="section section-two">
                        <div className='inputField  select'>
                            <label htmlFor="densita"><p>Densità</p></label>
                            <select name="densita" id="densita" required value={formInput.densita} onChange={(e) => setFormInput({...formInput, densita: e.target.value})}>
                                <option value="" selected disabled hidden>Seleziona un valore</option>
                                <option value={250}>250</option>
                                <option value={300}>300</option>
                                <option value={350}>350</option>
                                <option value={400}>400</option>
                                <option value={450}>450</option>
                                <option value={500}>500</option>
                            </select>
                        </div>
                        
                        <div className='inputField'>
                            <label htmlFor="pesoDiMille"><p>TKW</p></label>
                            <input type="number" id='pesoDiMille' name='pesoDiMille' autoComplete='off' min={30} max={60} required value={formInput.pesoDiMille} onChange={(e) => setFormInput({...formInput, pesoDiMille: e.target.value})}/>
                        </div>
                        <div className='inputField'>
                            <label htmlFor="germinabilita"><p>Germinabilità</p></label>
                            <input type="number" id='germinabilita' name='germinabilita' autoComplete='off' min={80} max={100} required value={formInput.germinabilita} onChange={(e) => setFormInput({...formInput, germinabilita: e.target.value})}/>
                        </div>
                    </div>

                    <div className="section section-three">
                        <div className='inputField'>
                            <label htmlFor="azoto"><p>Dose di Azoto</p></label>
                            <input type="number" id='azoto' name='azoto' autoComplete='off' min={0} required value={formInput.azoto} onChange={(e) => setFormInput({...formInput, azoto: e.target.value})}/>
                        </div>
                        <div className='inputField'>
                            <label htmlFor="fosforo"><p>Dose di Fosforo</p></label>
                            <input type="number" id='fosforo' name='fosforo' autoComplete='off' min={0} required value={formInput.fosforo} onChange={(e) => setFormInput({...formInput, fosforo: e.target.value})}/>
                        </div>
                        <div className='inputField'>
                            <label htmlFor="potassio"><p>Dose di Potassio</p></label>
                            <input type="number" id='potassio' name='potassio' autoComplete='off' min={0} required value={formInput.potassio} onChange={(e) => setFormInput({...formInput, potassio: e.target.value})}/>
                        </div>
                    </div>
                </div>

                <div className='submit-button'>
                    <button type='submit'>Submit Form</button>
                </div>
            </form>
        </div>
  )
}

export default Form