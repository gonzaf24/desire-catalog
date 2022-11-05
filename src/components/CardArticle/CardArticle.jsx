import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types'
import { useIntersectionObserver } from '../../hooks'
import { SliderCarousel } from '../../components'
import { HiOutlineArrowsExpand } from 'react-icons/hi'

import './CardArticle.css';

const propTypes = {
  article: PropTypes.shape({
    description: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    precioUY: PropTypes.string,
  }),
  className: PropTypes.string,
  id: PropTypes.string,
  isMode1ViewActive: PropTypes.bool,
  onClickArticle: PropTypes.func,
};

const defaultProps = {
  article: {
    description: '',
    photos: [],
    precioUY: '',
  },
  className: '',
  id: undefined,
  isMode1ViewActive: false,
  onClickArticle: undefined,
};


const CardArticle = ({ className, id, article, onClickArticle, isMode1ViewActive }) => {
  const classComponent = ['CardArticle', className].join(' ').trim()
  const classModelActive = !isMode1ViewActive ? classComponent : [classComponent, 'CardArticleSingle'].join(' ');

  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useIntersectionObserver(imgRef, () => {
    setIsInView(true);
  });

  const handleClickArticle = (e) => {
    if (onClickArticle) {
      onClickArticle(e, article)
    }
  }

  return (
    <section className={ classModelActive } id={ id }>
      <div ref={ imgRef } className="CardArticleWrapper">
        { isInView && (
          <SliderCarousel>
            { article.photos.map((imagen, index) => {
              return (
                <section key={ index } className="CardArticleSection">
                  <img alt="" className="CardArticleImage" src={ imagen } onClick={ handleClickArticle } />
                  <HiOutlineArrowsExpand
                    className="CardArticleExpandButton"
                    size={ 35 }
                    onClick={ handleClickArticle }
                  />
                </section>
              )
            }) }
          </SliderCarousel>
        ) }

      </div>
      <div
        className="CardArticlePortada"
        onClick={ handleClickArticle }
      >
        { article.precioUY != 0 ? <span className="CardArticlePrice">{ `${article.precioUY} $U` }</span> : <span className="CardArticlePrice"></span> }
        <span className="CardArticleItem">{ article.description }</span>
      </div>
    </section>
  );
};

CardArticle.propTypes = propTypes;
CardArticle.defaultProps = defaultProps;

export default CardArticle;