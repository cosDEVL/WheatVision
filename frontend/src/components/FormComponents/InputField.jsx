import React from 'react'
import Tooltip from '../Tooltip';

import styles from '../../styles/components/FormComponents/inputField.module.css';

// Un componente generico per qualsiasi tipo di campo del form
function InputField({ label, name, type = 'text', value, onChange, infoText, children, ...props }) {

    const commonProps = {
        id: name,
        name: name,
        value: value,
        onChange: onChange,
        autoComplete: 'off',
        ...props
    };

  return (
    <div className={`${styles.inputField} ${type === 'select' ? styles.select : ''}`}>
        <label htmlFor={name}>
            <span className={styles.labelInput}>{label}</span> 
        </label>
        {infoText && <Tooltip infoText={infoText}> <span className='tooltip-key' style={{color: "#f0f7ff", cursor:"pointer"}}>?</span> </Tooltip>}
        
        {type === 'select' ? (
            <select {...commonProps}>
                {children}
            </select>
        ) : (
            <input type={type} {...commonProps} />
        )}
    </div>
  )
}

export default InputField
