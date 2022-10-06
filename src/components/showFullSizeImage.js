import React from 'react';
import { BiX } from 'react-icons/bi';
import "../styles/fullSizeImageOverlay.style.css"

export const ShowFullSizeImage = ({ show, imgSrc, setShowFullSizeImage }) => {

  return show && <div className="alert-overlay-container">
    <section className='overlay-section-img-full-size' >
      <BiX className="close-button-full-size" onClick={ () => setShowFullSizeImage(false) } size={ 50 } />
      <img src={ imgSrc } alt="" className='img-full-size' />
    </section>
  </div >
}

export default ShowFullSizeImage;