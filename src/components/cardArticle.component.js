import React, { useRef, useState } from 'react'
import '../styles/cardArticle.style.css'
import Slider from 'react-slick'
import { HiOutlineArrowsExpand } from 'react-icons/hi'
import PropTypes from 'prop-types'
import { useIntersection } from '../hooks/useIntersectionObserver'

const propTypes = {
   article: PropTypes.shape({
      description: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.string),
      precioUY: PropTypes.string,
   }),
   isMode1Active: PropTypes.bool,
   onClickArticle: PropTypes.func,
}

const defaultProps = {
   article: {
      description: '',
      photos: [],
      precioUY: '',
   },
   isMode1Active: false,
   onClickArticle: undefined,
}

const settings = {
   dots: false,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   swipeToSlide: true,
}

export function CardArticle({ article, onClickArticle, isMode1Active }) {

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
      <section className={ !isMode1Active ? 'card-container' : 'card-container card-container-single' }>
         <div ref={ imgRef } className="card-wpr-1">
            { isInView && (
               <Slider { ...settings } id="slider">
                  { article.photos.map((imagen, index) => {
                     return (
                        <section key={ index } className="section-article">
                           <img alt="" className="img-card-article" src={ imagen } onClick={ handleClickArticle } />
                        </section>
                     )
                  }) }
               </Slider>
            ) }
            <HiOutlineArrowsExpand
               className="expand-button"
               size={ 35 }
               onClick={ handleClickArticle }
            />
         </div>
         <div
            className="card-wpr-2-portada cursor"
            onClick={ handleClickArticle }
         >
            <span className="price-card">{ `${article.precioUY} $U` }</span>
            <span className="article-item-portada">{ article.description }</span>
         </div>
      </section>
   )
}

CardArticle.propTypes = propTypes
CardArticle.defaultProps = defaultProps

export default CardArticle
