import React from "react";
import '../styles/errorPage.style.css'
import { useLocation } from "wouter"

export default function ErrorPage() {
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();

  return (
    <section className='error-container'>
      <div className='box-container-error'>
        <span className='number-error'>404</span>
        <span className='upss'>Upss!</span>
        <span className='text-error'>La pagina que buscas no existe.</span>
      </div>
      <span className='ir-al-home cursor' onClick={ () => setLocation('/') }>ir a Home</span>
    </section>
  );
}
