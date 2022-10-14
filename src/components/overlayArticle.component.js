import React, { useEffect, useState } from 'react';
import "../styles/overlayArticle.style.css"
import Slider from 'react-slick';
import { BiCopy } from 'react-icons/bi';
import { TiMinus } from 'react-icons/ti';
import AnastassaLogo from "../images/logo-anastassa.jpg";
import Modal from '../containers/Modal/Modal';

export const OverlayArticle = ({ isOpenModal = false, isLoading = false,
  onCloseModal, articleToShow = undefined }) => {
  const [copied, setCopied] = useState(false);
  const [article, setArticle] = useState();

  const onCopyLink = () => {
    setCopied(false);
    setCopied(true);
    const url = window.location.host + "/item/" + articleToShow.id;
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopied(false)
    }, 500);
  }

  useEffect(() => {
    setArticle(articleToShow);
  }, [articleToShow]);

  const onCloseLocal = () => {
    onCloseModal();
    setArticle(null);
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
  };

  return <Modal
    isOpen={ isOpenModal }
    isLoading={ isLoading }
    onClose={ onCloseLocal }
    onHide={ onCloseLocal }
    header={ <><img src={ AnastassaLogo } alt='www.anastassa.com' className='main-logo' /><></></> }>
    { article &&
      <>
        <div className='card-wpr-1' >
          <Slider { ...settings }>
            { article.photos.map((imagen, index) => {
              return <section key={ index } className='article-section'><img src={ imagen } alt='' className='img-card-article-overlay' /></section>
            }) }
          </Slider>
          <div className='link-copy-wrapper' onClick={ onCopyLink }>
            <BiCopy className={ copied ? 'copy-svg color-copy-active' : 'copy-svg color-copy' } size={ 25 } />
            <span className={ copied ? 'copy-link-text color-copy-active' : 'copy-link-text color-copy' } >copy-link</span>
          </div>
        </div>
        <div className='card-wpr-2'>
          <span className='article-item'>REF. { article.ref } </span>
          <span className='article-item price-style'>{ article.precioUY } $U</span>
          <span className='article-item'>{ article.detail && article.detail }</span>
          { article.sizes && article.sizes.length > 0 && <section className='article-item'>
            <span className='mb-2'>Talles</span>
            <div>{ article.sizes.map((el, index) => <span key={ index } className='pill-wrapper' >{ el.trim().toUpperCase() } </span>) }
            </div>
          </section>
          }
          { article.colors && article.colors.length > 0 && <section className='article-item'>
            <span className='mb-2'>Colores</span>
            <div>{ article.colors.map((el, index) => el ? <span key={ index } className='pill-wrapper'>{ el.trim().toUpperCase() } </span> : null) }
            </div>
          </section>
          }
          { article.sizesDescriptions && article.sizesDescriptions.length > 0 && <section className='details-product'>
            <span className='mb-2'>Detalles</span>
            { article.sizesDescriptions.map((element, index) => {
              return <span key={ index } className='flex-center'> <TiMinus className='mr-5p' />{ element.data } { element.description } </span>
            }) }
          </section>
          }
        </div>
        <span id="copy-id" className={ copied ? 'copy-link-url-active' : 'copy-link-url' }>link copiado</span>
      </>
    }
  </Modal >

}
