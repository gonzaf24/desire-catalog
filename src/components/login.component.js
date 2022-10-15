import React, { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { useLocation } from 'wouter'
import useUser from '../hooks/useUser'
import '../styles/login.style.css'
import PropTypes from 'prop-types'

const propTypes = {
   onLogin: PropTypes.func,
}

const defaultProps = {
   onLogin: undefined,
}

const Login = ({ onLogin }) => {
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
      <div className="login-container">
         { isLoginLoading && <strong>Checkeando credenciales...</strong> }
         { !isLoginLoading && (
            <form className="form" onSubmit={ handleSubmit }>
               <label>
                  username
                  <input
                     placeholder="username"
                     value={ username }
                     onChange={ (e) => setUsername(e.target.value) }
                  />
               </label>

               <label>
                  password
                  <input
                     placeholder="password"
                     type="password"
                     value={ password }
                     onChange={ (e) => setPassword(e.target.value) }
                  />
               </label>

               <Button className="btn mt-4" type="submit">
                  Login
               </Button>
            </form>
         ) }
         { hasLoginError && <strong>Credenciales inválidas.</strong> }
      </div>
   )
}

Login.propTypes = propTypes
Login.defaultProps = defaultProps

export default Login
