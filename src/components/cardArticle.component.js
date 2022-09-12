import React from 'react';
import "../styles/cardArticle.style.css"
import Slider from 'react-slick';
import { HiOutlineArrowsExpand } from "react-icons/hi";

export const CardArticle = ({ article, onClickArticle }) => {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true
  };

  return <section className='card-container' /* style={{ maxWidth: 300 }}  */>
    <div className='card-wpr-1' >
      <Slider {...settings} id='slider'>
        {article.photos.map((imagen, index) => {
          return <img key={index} src={imagen} alt='' className='img-card-article' onClick={() => onClickArticle(article)} />
        })}
      </Slider>
      <HiOutlineArrowsExpand size={35} className="expand-button" onClick={() => onClickArticle(article)} />
    </div>
    <div className='card-wpr-2-portada cursor' onClick={() => onClickArticle(article)}>
      <span className='price-card'>{article.precioUY + " $U"}</span>
      <span className='article-item-portada' >{article.description}</span>
    </div>
  </section>
}

export default CardArticle;