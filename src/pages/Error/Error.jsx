import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'wouter'

import './Error.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const Error = ({ className, id }) => {
  const classComponent = ['Error', className].join(' ').trim();
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation()

  return (
    <section
      className={ classComponent }
      id={ id }>
      <div className="ErrorBoxContainer">
        <span className="ErrorNumber">404</span>
        <span className="ErrorUpss">Upss!</span>
        <span className="ErrorText">La pagina que buscas no existe.</span>
      </div>
      <span className="ErrorGoHome" onClick={ () => setLocation('/') }>
        ir a Home
      </span>
    </section>
  );
};

Error.propTypes = propTypes;
Error.defaultProps = defaultProps;

export default Error;
