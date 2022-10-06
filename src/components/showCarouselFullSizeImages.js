import React from 'react';
import "../styles/fullSizeImageOverlay.style.css"
import { BiX } from 'react-icons/bi';
import Slider from 'react-slick';

export const ShowCarouselFullSizeImages = ({ show, imgSrcArray, setShowCarouselFullSizeImages }) => {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true
  };

  return show && <div className="alert-overlay-container">
    <section className='overlay-section-img-full-size' >
      <BiX className="close-button-full-size" onClick={ () => setShowCarouselFullSizeImages(false) } size={ 50 } />
      <Slider { ...settings } id='sliderCrousel'>
        { imgSrcArray && imgSrcArray.map((imagen, index) => {
          return <img key={ index } src={ imagen } alt='' className='img-card-article' />
        }) }
      </Slider>
    </section>
  </div >
}

export default ShowCarouselFullSizeImages;