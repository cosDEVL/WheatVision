import React, { useState } from 'react'

import styles from '../styles/components/Tooltip.module.css';

function Tooltip({ infoText, children }) {

    const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
        className={styles.tooltipContainer}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
    >

        {!children ? <span className='tooltipKey'>?</span> : children}

        {showTooltip && (
            <div className={styles.tooltip}>
                <span className={styles.tooltipText}>{infoText}</span>
            </div>
        )}
      
    </div>
  )
}

export default Tooltip
