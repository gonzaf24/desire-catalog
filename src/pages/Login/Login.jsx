import React from 'react';
import { Login as LoginComponent } from '../../components'
import PropTypes from 'prop-types';

import './Login.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const Login = ({ className, id }) => {
  const classComponent = ['Login', className].join(' ').trim();

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      <span className="LoginTitle">Login</span>
      <LoginComponent />
    </div>
  );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;
