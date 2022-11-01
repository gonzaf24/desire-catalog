import React from 'react';
import PropTypes from 'prop-types';

import './AlertDismissible.css';
import { Button } from 'react-bootstrap';

const propTypes = {
  callbackCloseError: PropTypes.func,
  className: PropTypes.string,
  id: PropTypes.string,
  msg: PropTypes.string,
  show: PropTypes.bool,
  type: PropTypes.string,
};

const defaultProps = {
  callbackCloseError: undefined,
  className: '',
  id: undefined,
  msg: '',
  show: false,
  type: 'danger',
};

const AlertDismissible = ({ className, id, show, msg, callbackCloseError, type }) => {
  const classComponent = className ? ['AlertDismissible', className] : ['AlertDismissible'];

  return show && (
    <div className={ classComponent } id={ id } >
      <section
        className={
          type === 'succes'
            ? 'AlertDismissibleSucces'
            : 'AlertDismissibleError'
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
    </div >
  );
};

AlertDismissible.propTypes = propTypes;
AlertDismissible.defaultProps = defaultProps;

export default AlertDismissible;