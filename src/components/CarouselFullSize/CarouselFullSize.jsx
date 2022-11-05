import React from 'react';
import PropTypes from 'prop-types';
import { BiX } from 'react-icons/bi';
import { SliderCarousel } from '../../components'

import './CarouselFullSize.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  imgSrcArray: PropTypes.arrayOf(PropTypes.string),
  setShowCarouselFullSizeImages: PropTypes.func,
  show: PropTypes.bool,
};

const defaultProps = {
  className: '',
  id: undefined,
  imgSrcArray: [],
  setShowCarouselFullSizeImages: undefined,
  show: false,
};

const CarouselFullSize = ({ className, id, show, imgSrcArray, setShowCarouselFullSizeImages, }) => {
  const classComponent = ['CarouselFullSize', className].join(' ').trim();

  return (
    show && (
      <div className={ classComponent } id={ id }>
        <section className="CarouselFullSizeOverlay">
          <BiX
            className="CarouselFullSizeCloseButton"
            size={ 50 }
            onClick={ () => setShowCarouselFullSizeImages(false) }
          />
          <SliderCarousel>
            { imgSrcArray &&
              imgSrcArray.map((imagen, index) => {
                return (
                  <img
                    key={ index }
                    alt=""
                    className="CarouselFullSizeImageCard"
                    src={ imagen }
                  />
                )
              }) }
          </SliderCarousel>
        </section>
      </div>
    )
  );
};

CarouselFullSize.propTypes = propTypes;
CarouselFullSize.defaultProps = defaultProps;

export default CarouselFullSize;