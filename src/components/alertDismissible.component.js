import React from 'react';
import "../styles/alertDismissible.style.css"
import { Button } from 'react-bootstrap';

export const AlertDismissible = ({ show, msg, callbackCloseError, type }) => {

  return show && <div className="alert-overlay-container">
    <section className={ type === "succes" ? "alert-overlay-section-succes" : "alert-overlay-section" }>
      { msg }
      <hr />
      <Button onClick={ () => { callbackCloseError(false) } }> Cerrar</Button>
    </section>
  </div >
}

export default AlertDismissible;
