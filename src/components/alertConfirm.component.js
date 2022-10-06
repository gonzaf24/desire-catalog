

import React from 'react';
import "../styles/alertDismissible.style.css"
import { Button } from 'react-bootstrap';

export const AlertConfirm = ({ show, msg, callbackCancel, callbackConfirm, type }) => {

  return show && <div className="alert-overlay-container">
    <section className={ type === "succes" ? "alert-overlay-section-succes" : "alert-overlay-section" }>
      { msg }
      <hr />
      <div className="d-flex justify-content-between">
        <Button onClick={ () => { callbackCancel() } }> CANCELAR</Button>
        <Button onClick={ () => { callbackConfirm() } }> CONFIRMAR</Button>
      </div>
    </section>
  </div >
}

export default AlertConfirm;