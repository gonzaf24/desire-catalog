import { useCallback, useContext, useState } from 'react'
import Context from '../context/UserContext'
import loginService from '../services/login'
import { useLocation } from "wouter"

export default function useUser() {
  const { jwt, setJWT } = useContext(Context)
  const [state, setState] = useState({ loading: false, error: false })
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();

  const login = useCallback(({ username, password }) => {
    setState({ loading: true, error: false })
    loginService({ username, password })
      .then(jwt => {
        window.sessionStorage.setItem('jwt', jwt)
        setState({ loading: false, error: false })
        setJWT(jwt)
        //console.log("aki jwt ", jwt)
        setLocation('/admin')
      })
      .catch(err => {
        window.sessionStorage.removeItem('jwt')
        setState({ loading: false, error: true })
        console.error(err)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setJWT])

  const logout = useCallback(() => {
    window.sessionStorage.removeItem('jwt')
    setJWT(null)
  }, [setJWT])

  return {
    isLogged: Boolean(jwt),
    isLoginLoading: state.loading,
    hasLoginError: state.error,
    login,
    logout
  }
} 