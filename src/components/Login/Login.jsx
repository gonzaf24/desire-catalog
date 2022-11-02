import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useLocation } from 'wouter'
import useUser from '../../hooks/useUser'
import PropTypes from 'prop-types';

import './Login.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onLogin: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  onLogin: undefined,
};

const Login = ({ className, id, onLogin }) => {
  const classComponent = ['Login', className].join(' ').trim();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { isLoginLoading, hasLoginError, login, isLogged } = useUser()
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation()

  useEffect(() => {
    if (isLogged) {
      setLocation('/admin')
      onLogin && onLogin()
    }
  }, [isLogged, onLogin])

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ username, password })
  }

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      { isLoginLoading && <strong>Checkeando credenciales...</strong> }
      { !isLoginLoading && (
        <form className="LoginForm" onSubmit={ handleSubmit }>
          <label className='LoginLabel'>
            username
            <input
              className='LoginInput'
              placeholder="Username"
              value={ username }
              onChange={ (e) => setUsername(e.target.value) }
            />
          </label>

          <label className='LoginLabel'>
            password
            <input
              className='LoginInput'
              placeholder="Password"
              type="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </label>

          <Button className="LoginButton" type="submit">
            Login
          </Button>
        </form>
      ) }
      { hasLoginError && <strong>Credenciales inválidas.</strong> }
    </div>
  );
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;

export default Login;