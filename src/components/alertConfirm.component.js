import React from 'react'
import '../styles/alertDismissible.style.css'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'


const propTypes = {
   callbackCancel: PropTypes.func,
   callbackConfirm: PropTypes.func,
   msg: PropTypes.string,
   show: PropTypes.bool,
   type: PropTypes.string,
}

const defaultProps = {
   callbackCancel: undefined,
   callbackConfirm: undefined,
   msg: '',
   show: false,
   type: 'danger',
}

export const AlertConfirm = ({ show, msg, callbackCancel, callbackConfirm, type, }) => {
   return (
      show && (
         <div className="alert-overlay-container">
            <section
               className={
                  type === 'succes'
                     ? 'alert-overlay-section-succes'
                     : 'alert-overlay-section'
               }
            >
               { msg }
               <hr />
               <div className="d-flex justify-content-between">
                  <Button
                     onClick={ () => {
                        callbackCancel()
                     } }
                  >
                     { ' ' }
                     CANCELAR
                  </Button>
                  <Button
                     onClick={ () => {
                        callbackConfirm()
                     } }
                  >
                     { ' ' }
                     CONFIRMAR
                  </Button>
               </div>
            </section>
         </div>
      )
   )
}

AlertConfirm.propTypes = propTypes
AlertConfirm.defaultProps = defaultProps

export default AlertConfirm
