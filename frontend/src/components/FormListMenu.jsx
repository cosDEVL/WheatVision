import React from 'react';

import './styles/formListStyles.css';

function FormListMenu({ simSelected, setSimSelected, formDataSelected, formData, handleDeleteReport }) {
  return (
    <div className='form-menu'>

        <div className="list">
            {formData.map((form) => {
                        return (
                          <div key={form._id} id={form.nomeSimulazione} className={simSelected === form.nomeSimulazione ? "card selected-card" : "card"} onClick={() => setSimSelected(form.nomeSimulazione)}>
                            <section>
                              <span>Nome della simulazione:</span>
                              <span>{form.nomeSimulazione}</span>
                            </section>
                            <section>
                              <span>Periodo di semina:</span>
                              <span>{form.periodoSemina}</span>
                            </section>
                            <section>
                              <span>Ettari di coltivazione:</span>
                              <span>{form.ettariColtivazione} ha</span>
                            </section>
                            <section>
                              <span>Densità di piante:</span>
                              <span>{form.densita} piante/m<sup>3</sup></span>
                            </section>
                            <section>
                              <span>TKW:</span>
                              <span>{form.pesoDiMille} g</span>
                            </section>
                            <section>
                              <span>Germinabilità del seme:</span>
                              <span>{form.germinabilita}%</span>
                            </section>
                            <section>
                              <span>Dose di Azoto:</span>
                              <span>{form.azoto} kg/ha</span>
                            </section>
                            <section>
                              <span>Dose di Fosforo:</span>
                              <span>{form.fosforo} kg/ha</span>
                            </section>
                            <section>
                              <span>Dose di Potassio:</span>
                              <span>{form.potassio} kg/ha</span>
                            </section>

                            <button onClick={(e) => handleDeleteReport(form.nomeSimulazione, e)}>Cancella Report</button>
                          </div>
                        )}
                      )}
        </div>
    </div>
  )
}

export default FormListMenu
