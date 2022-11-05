import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick'
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io'; 

import './SliderCarousel.css';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  children: undefined,
  className: '',
  id: undefined,
};

// eslint-disable-next-line react/prop-types
function SampleNextArrow({ onClick }) {
  return (
    <IoIosArrowForward className='SliderCarouselNextArrow' onClick={ onClick } />

  );
}

// eslint-disable-next-line react/prop-types
function SamplePrevArrow({ onClick }) {
  return (
    <IoIosArrowBack className='SliderCarouselPrevArrow' onClick={ onClick } />
  );
}


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />
}

const SliderCarousel = ({ className, id, children }) => {
  const classComponent = ['SliderCarousel', className].join(' ').trim();

  return (
    <Slider { ...settings } className={ classComponent } id={ id }>
      { children }
    </Slider>
  );
};

SliderCarousel.propTypes = propTypes;
SliderCarousel.defaultProps = defaultProps;

export default SliderCarousel;
