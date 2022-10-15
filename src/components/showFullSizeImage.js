import React from 'react'
import { BiX } from 'react-icons/bi'
import '../styles/fullSizeImageOverlay.style.css'

import PropTypes from 'prop-types'


const propTypes = {
   imgSrc: PropTypes.string,
   setShowFullSizeImage: PropTypes.func,
   show: PropTypes.bool,
}

const defaultProps = {
   imgSrc: '',
   setShowFullSizeImage: undefined,
   show: false,
}

export const ShowFullSizeImage = ({ show, imgSrc, setShowFullSizeImage }) => {
   return (
      show && (
         <div className="alert-overlay-container">
            <section className="overlay-section-img-full-size">
               <BiX
                  className="close-button-full-size"
                  size={ 50 }
                  onClick={ () => setShowFullSizeImage(false) }
               />
               <img alt="" className="img-full-size" src={ imgSrc } />
            </section>
         </div>
      )
   )
}

ShowFullSizeImage.propTypes = propTypes
ShowFullSizeImage.defaultProps = defaultProps

export default ShowFullSizeImage
