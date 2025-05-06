import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/homePageStyles.css'
import Form from './Form';
  
function HomePage() {

  const navigate = useNavigate();

  const [openForm, setOpenForm] = useState(false);

  return (
    <div className="home-page">

      {openForm && (
        <>
          <Form />
          <span className='close-form' onClick={() => setOpenForm(false)}>&#x2716;</span>
        </>
        
        )}

      <div className='home-page-side'>
        <div className='hp-project-title'>
          <h1>WheatVision</h1>
          <h3>Da una semplice simulazione,<br/>una visione completa.</h3>
        </div>

        <div className='hp-project-title-mobile'>
          <div className='hp-bg-mobile'>
            <div className="hp-title-mobile">
              <h1>WheatVision</h1>
              <h3>Da una semplice simulazione, una visione completa.</h3>
            </div>
          </div>
        </div>

        <div className='hp-navbar'>
          <p>Qui potrai simulare la coltivazione del grano duro e osservare come il risultato sia influenzato dai valori dati in Input</p>
          <button onClick={() => setOpenForm(true)}>Avvia una nuova simulazione</button>
          <button onClick={() => navigate('/dashboard')}>Vai alla DashBoard</button>
          <button onClick={() => navigate('/report')}>Vai al Report delle simlazioni</button>
        </div>
      </div>
    </div>
  )
}

export default HomePage