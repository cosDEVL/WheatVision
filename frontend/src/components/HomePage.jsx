
import { useNavigate } from 'react-router-dom';
import './styles/homePageStyles.css';
import './styles/mediaQR-1024/homePageStyle-1024.css';
import './styles/mediaQR-768/homePageStyle-768.css';
import './styles/mediaQR-480/homePageStyle-480.css';


import './styles/generalStyles/htmlStyles.css'
import './styles/generalStyles/font&colors.css'
  
function HomePage() {

  const navigate = useNavigate();


  return (
    <>
      <div className="home-page">

        <div className='home-page-side'>
          <div className='hp-title'>
            <h1>WheatVision</h1>
            <h3>Da una semplice simulazione,<br/>una visione completa.</h3>
          </div>

          <div className='hp-links'>
            <p>Qui potrai simulare la coltivazione del grano duro e osservare come il risultato sia influenzato dai valori dati in Input</p>
            <button onClick={() => navigate('/dashboard')}>Vai alla DashBoard</button>
            <button onClick={() => navigate('/report')}>Vai al Report delle simlazioni</button>
          </div>
        </div>

      </div>

      <div className="home-page-smDevice">

          <div className="home-page-bg">
            <div className='hp-title'>
              <h1>WheatVision</h1>
              <h3>Da una semplice simulazione,<br/>una visione completa.</h3>
            </div>
          </div>
          

          <div className='hp-links'>
            <p>Qui potrai simulare la coltivazione del grano duro e osservare come il risultato sia influenzato dai valori dati in Input</p>
            <button onClick={() => navigate('/dashboard')}>Vai alla DashBoard</button>
            <button onClick={() => navigate('/report')}>Vai al Report delle simlazioni</button>
          </div>

      </div>
    </>
  )
}

export default HomePage