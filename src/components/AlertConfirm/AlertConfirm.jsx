import React from 'react';
import PropTypes from 'prop-types';

import './AlertConfirm.css';
import { Button } from 'react-bootstrap';

const propTypes = {
  callbackCancel: PropTypes.func,
  callbackConfirm: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  msg: PropTypes.string,
  show: PropTypes.bool,
  type: PropTypes.string,
};

const defaultProps = {
  callbackCancel: undefined,
  callbackConfirm: undefined,
  className: '',
  id: undefined,
  msg: '',
  show: false,
  type: 'danger',
};

const AlertConfirm = ({ className, id, show, msg, callbackCancel, callbackConfirm, type }) => {
  const classComponent = ['AlertConfirm', className].join(' ').trim();

  return show && (
    <div className={ classComponent } id={ id }>
      <section
        className={
          type === 'succes'
            ? 'AlertConfirmSucces'
            : 'AlertConfirmError'
        }
      >
        { msg }
        <hr />
        <div className="AlertConfirmFooter">
          <Button onClick={ () => { callbackCancel() } }  >
            CANCELAR
          </Button>
          <Button onClick={ () => { callbackConfirm() } }   >
            CONFIRMAR
          </Button>
        </div>
      </section>
    </div>
  )
};

AlertConfirm.propTypes = propTypes;
AlertConfirm.defaultProps = defaultProps;

export default AlertConfirm;