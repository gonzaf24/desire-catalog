import React from 'react'
import Login from '../components/Login'
import '../styles/login.style.css'

export default function LoginPage() {
   return (
      <section className="login-container-all">
         <span className="h1-title-login pb-4 pt-4">Login</span>
         <Login />
      </section>
   )
}
