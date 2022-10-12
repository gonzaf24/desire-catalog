import React, { useState } from 'react';
import "../styles/overlayArticle.style.css"
import Slider from 'react-slick';
import { BiX, BiCopy } from 'react-icons/bi';
import { TiMinus } from 'react-icons/ti';
import AnastassaLogo from "../images/logo-anastassa.jpg";
import { useLocation } from "wouter"

export const OverlayArticle = ({ showOverlay, setShowOverlayArticle, articleToShow }) => {
  const [copied, setCopied] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();

  const onCopyLink = () => {
    setCopied(false);
    setCopied(true);
    const url = window.location.host + "/item/" + articleToShow.id;
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopied(false)
    }, 500);
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true
  };

  return showOverlay && <section className='overlay-article-container'>
    <article className="overlay-article-wrapper">
      <div className='card-logo-contanier'>
        <div className='card-logo-wrapper'>
          <img src={ AnastassaLogo } alt='www.anastassa.com' className='main-logo' />
        </div>
        <BiX className="close-overlay-button" onClick={ () => setShowOverlayArticle(false) } size={ 50 } />
      </div>
      <div className='card-wpr-1' >
        <Slider { ...settings } id='slider'>
          { articleToShow.photos.map((imagen, index) => {
            return <img key={ index } src={ imagen } alt='' className='img-card-article-overlay' />
          }) }
        </Slider>
        <div className='link-copy-wrapper' onClick={ () => onCopyLink() }>
          <BiCopy className={ copied ? 'copy-svg color-copy-active' : 'copy-svg color-copy' } size={ 25 } />
          <span className={ copied ? 'copy-link-text color-copy-active' : 'copy-link-text color-copy' } >copy-link</span>
        </div>
      </div>
      <div className='card-wpr-2'>
        <span className='article-item'>REF. { articleToShow.ref } </span>
        <span className='article-item price-style'>{ articleToShow.precioUY } $U</span>
        {/*         <span className='article-item'>{ articleToShow.description && articleToShow.description }</span>
 */}        <span className='article-item'>{ articleToShow.detail && articleToShow.detail }</span>
        { articleToShow.sizes && articleToShow.sizes.length > 0 && <section className='article-item'>
          <span className='mb-2'>Talles</span>
          <div>{ articleToShow.sizes.map((el, index) => <span key={ index } className='pill-wrapper' >{ el.trim().toUpperCase() } </span>) }
          </div>
        </section>
        }
        { articleToShow.colors && articleToShow.colors.length > 0 && <section className='article-item'>
          <span className='mb-2'>Colores</span>
          <div>{ articleToShow.colors.map((el, index) => el ? <span key={ index } className='pill-wrapper'>{ el.trim().toUpperCase() } </span> : null) }
          </div>
        </section>
        }
        { articleToShow.sizesDescriptions && articleToShow.sizesDescriptions.length > 0 && <section className='details-product'>
          <span className='mb-2'>Detalles</span>
          { articleToShow.sizesDescriptions.map((element, index) => {
            return <span key={ index } className='flex-center'> <TiMinus className='mr-5p' />{ element.data } { element.description } </span>
          }) }
        </section>
        }
      </div>
    </article>
    <span id="copy-id" className={ copied ? 'copy-link-url-active' : 'copy-link-url' }>link copiado</span>
  </section >


}
