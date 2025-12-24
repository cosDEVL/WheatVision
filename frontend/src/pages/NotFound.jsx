import React from 'react'
import { useNavigate } from 'react-router';

import styles from '../styles/pages/NotFound.module.css';

function NotFound() {

    const navigate = useNavigate();

  return (
    <div className={styles.notFoundPage}>
      <span className={styles.notFoundMessage}>Pagina non trovata...</span>
      
      <div className={styles.pagesList}>
        <span className={styles.text}>Pagine disponibili:</span>
        <div className={styles.btns}>
            <button className={styles.btn} onClick={() => navigate('/')}>HomePage</button>
            <button className={styles.btn} onClick={() => navigate('/dashboard')}>DashBoard</button>
            <button className={styles.btn} onClick={() => navigate('/report')}>Report</button>
        </div>
      </div>
      
    </div>
  )
}

export default NotFound
