import React from 'react'
import '../styles/alertDismissible.style.css'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const propTypes = {
   callbackCloseError: PropTypes.func,
   msg: PropTypes.string,
   show: PropTypes.bool,
   type: PropTypes.string,
}

const defaultProps = {
   callbackCloseError: undefined,
   msg: '',
   show: false,
   type: 'danger',
}

export const AlertDismissible = ({ show, msg, callbackCloseError, type }) => {
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
               <Button
                  onClick={ () => {
                     callbackCloseError(false)
                  } }
               >
                  Cerrar
               </Button>
            </section>
         </div>
      )
   )
}

AlertDismissible.propTypes = propTypes
AlertDismissible.defaultProps = defaultProps

export default AlertDismissible
