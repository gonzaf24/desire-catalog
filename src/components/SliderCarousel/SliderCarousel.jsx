import React from 'react';
import PropTypes from 'prop-types';

import './SliderCarousel.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const SliderCarousel = ({ className, id }) => {
  const classComponent = [SliderCarousel, className].join(' ').trim();

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      SliderCarousel component
    </div>
  );
};

SliderCarousel.propTypes = propTypes;
SliderCarousel.defaultProps = defaultProps;

export default SliderCarousel;
