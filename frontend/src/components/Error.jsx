import React from 'react';

import styles from '../styles/components/Error.module.css';

function Error({ errorType, error }) {
  return (
    <div>
        <div className={styles.error}>
            <span className={styles.errorHeader}>{errorType}</span>
            <span className={styles.errorMessage}>Errore: {error}</span>
        </div>
    </div>
  )
}

export default Error
