import React from 'react';
import { Spinner } from 'react-bootstrap';
import "../styles/loader.style.css"

export const Loader = ({ size }) => {
  return <div className='loader-container'>
    <Spinner className='loader-wrapper' animation="grow" variant="dark" size='xl' />
  </div>
}

export default Loader;