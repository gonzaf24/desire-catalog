import React, { useState, useEffect } from "react";
import { Button } from 'react-bootstrap';
import { useLocation } from "wouter"
import useUser from '../hooks/useUser'
import '../styles/login.style.css'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isLoginLoading, hasLoginError, login, isLogged } = useUser()
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();

  useEffect(() => {
    if (isLogged) {
      setLocation('/admin')
      onLogin && onLogin()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, onLogin])

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ username, password })
  };

  return (
    <div className='login-container'>
      {isLoginLoading && <strong>Checkeando credenciales...</strong>}
      {!isLoginLoading &&
        <form className='form' onSubmit={handleSubmit}>
          <label>
            username
            <input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </label>

          <label>
            password
            <input
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>

          <Button type='submit' className='btn mt-4'>Login</Button>
        </form>
      }
      {
        hasLoginError && <strong>Credenciales inválidas.</strong>
      }
    </div>
  );
}
