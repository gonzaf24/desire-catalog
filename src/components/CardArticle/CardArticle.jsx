import React, { useRef, useState } from 'react';
import Slider from 'react-slick'
import { HiOutlineArrowsExpand } from 'react-icons/hi'
import PropTypes from 'prop-types'
import { useIntersection } from '../../hooks/useIntersectionObserver'
import './CardArticle.css';

const propTypes = {
  article: PropTypes.shape({
    description: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    precioUY: PropTypes.string,
  }),
  className: PropTypes.string,
  id: PropTypes.string,
  isMode1Active: PropTypes.bool,
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
  isMode1Active: false,
  onClickArticle: undefined,
};


const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
}

const CardArticle = ({ className, id, article, onClickArticle, isMode1Active }) => {
  const classComponent = className ? 'CardArticle '.concat(className) : 'CardArticle';
  let classModelActive = !isMode1Active ? classComponent : classComponent.concat(' CardArticleSingle');

  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef();

  useIntersection(imgRef, () => {
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
          <Slider { ...settings } id="slider">
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
          </Slider>
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