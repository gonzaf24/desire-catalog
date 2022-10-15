import React from 'react'
import '../styles/fullSizeImageOverlay.style.css'
import { BiX } from 'react-icons/bi'
import Slider from 'react-slick'
import PropTypes from 'prop-types'


const propTypes = {
   imgSrcArray: PropTypes.arrayOf(PropTypes.string),
   setShowCarouselFullSizeImages: PropTypes.func,
   show: PropTypes.bool,
}

const defaultProps = {
   imgSrcArray: [],
   setShowCarouselFullSizeImages: undefined,
   show: false,
}

export const ShowCarouselFullSizeImages = ({
   show,
   imgSrcArray,
   setShowCarouselFullSizeImages,
}) => {

   var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
   }

   return (
      show && (
         <div className="alert-overlay-container">
            <section className="overlay-section-img-full-size">
               <BiX
                  className="close-button-full-size"
                  size={ 50 }
                  onClick={ () => setShowCarouselFullSizeImages(false) }
               />
               <Slider { ...settings } id="sliderCrousel">
                  { imgSrcArray &&
                     imgSrcArray.map((imagen, index) => {
                        return (
                           <img
                              key={ index }
                              alt=""
                              className="img-card-article"
                              src={ imagen }
                           />
                        )
                     }) }
               </Slider>
            </section>
         </div>
      )
   )
}

ShowCarouselFullSizeImages.propTypes = propTypes
ShowCarouselFullSizeImages.defaultProps = defaultProps

export default ShowCarouselFullSizeImages
