import React from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick'

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


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
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
