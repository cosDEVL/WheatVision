import { useNavigate } from 'react-router-dom';

import styles from '../styles/pages/Homepage.module.css';

function HomePage() {

  const navigate = useNavigate();


  return (
      <div className={styles.homepage}>

        <div className={styles.overlay}>
          <div className={styles.hpMenu}>
            <h1>WheatVision</h1>

            <div className={styles.hpLinks}>
              <button onClick={() => navigate('/dashboard')}>DashBoard</button>
              <button onClick={() => navigate('/report')}>Tabelle simulazioni</button>
            </div>
          </div>
          
        </div>

      </div>
  )
}

export default HomePage;