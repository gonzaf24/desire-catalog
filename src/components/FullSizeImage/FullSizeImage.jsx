import React from 'react';
import PropTypes from 'prop-types';

import './FullSizeImage.css';
import { BiX } from 'react-icons/bi';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  imgSrc: PropTypes.string,
  setShowFullSizeImage: PropTypes.func,
  show: PropTypes.bool,
};

const defaultProps = {
  className: '',
  id: undefined,
  imgSrc: '',
  setShowFullSizeImage: undefined,
  show: false,
};

const FullSizeImage = ({ className, id, show, imgSrc, setShowFullSizeImage }) => {
  const classComponent = className ? ['FullSizeImage', className] : ['FullSizeImage'];

  return (
    show && (
      <div className={ classComponent } id={ id }>
        <section className="FullSizeImageOverlay">
          <BiX
            className="FullSizeImageCloseButton"
            size={ 50 }
            onClick={ () => setShowFullSizeImage(false) }
          />
          <img alt="" className="FullSizeImageFullImage" src={ imgSrc } />
        </section>
      </div>
    )
  );
};

FullSizeImage.propTypes = propTypes;
FullSizeImage.defaultProps = defaultProps;

export default FullSizeImage;