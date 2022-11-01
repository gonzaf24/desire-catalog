import React, { Fragment, useEffect, useState } from 'react'
import '../styles/overlayArticle.style.css'
import Slider from 'react-slick'
import { BiCopy } from 'react-icons/bi'
import { TiMinus } from 'react-icons/ti'
import { MdIosShare } from 'react-icons/md'
import AnastassaLogo from '../images/logo-anastassa.jpg'
import Modal from '../containers/Modal/Modal'
import PropTypes from 'prop-types'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { isMobile } from 'react-device-detect';

const propTypes = {
   articleToShow: PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.string,
      photos: PropTypes.arrayOf(PropTypes.string),
      precioUY: PropTypes.string,
   }),
   isLoading: PropTypes.bool,
   isOpenModal: PropTypes.bool,
   onCloseModal: PropTypes.func,
}

const defaultProps = {
   isOpenModal: false,
   isLoading: false,
   onCloseModal: undefined,
   articleToShow: {
      description: '',
      photos: [],
      id: '',
      precioUY: '',
   },
}

const settingsArticle = {
   dots: true,
   infinite: true,
   speed: 500,
   slidesToShow: 1,
   slidesToScroll: 1,
   swipeToSlide: true,
}

const OverlayArticle = ({ isOpenModal, isLoading, onCloseModal, articleToShow, }) => {
   const [copied, setCopied] = useState(false)
   const [article, setArticle] = useState(articleToShow)
   const [urlCopied, setUrlCopied] = useState('')

   useEffect(() => {
      const url = window.location.host + '/item/' + articleToShow.id
      setUrlCopied(url);
   }, []);

   const onCopyLink = async () => {
      setCopied(false)
      setCopied(true)
      const url = window.location.host + '/item/' + articleToShow.id
      setUrlCopied(url);
      await navigator.clipboard.writeText(url)
      setTimeout(() => {
         setCopied(false)
      }, 500)
   }

   const handleShare = () => {
      if (navigator.share) {
         navigator
            .share({
               title: `Anastassa - ${article.description}`,
               text: `${article.detail}`,
               url: urlCopied,
            })
            .then(() => {
               console.log('Successfully shared');
            })
            .catch(error => {
               console.error('Something went wrong sharing the blog', error);
            });
      }
   }

   useEffect(() => {
      if (isOpenModal) {
         setArticle(articleToShow)
         setUrlCopied(window.location.host + '/item/' + articleToShow.id)
      }
   }, [articleToShow, isOpenModal])

   const onCloseLocal = () => {
      onCloseModal()
      setArticle(null)
   }

   return (
      <Modal
         header={
            <><img alt="www.anastassa.com" className="main-logo-modal" src={ AnastassaLogo } /><Fragment></Fragment></>
         }
         isLoading={ isLoading }
         isOpen={ isOpenModal }
         onClose={ onCloseLocal }
         onHide={ onCloseLocal }
      >
         { article && (
            <>
               <div className="card-wpr-1">
                  <Slider { ...settingsArticle }>
                     { article.photos.map((imagen, index) => {
                        return (
                           <section key={ index } className="article-section">
                              <img
                                 alt=""
                                 className="img-card-article-overlay"
                                 src={ imagen }
                              />
                           </section>
                        )
                     }) }
                  </Slider>
               </div>
               <div className="card-wpr-2">
                  <div className="article-item">
                     <span>REF. { article.ref }</span>
                     <div className="links-copy-constainer">
                        <FacebookShareButton size={ 25 } url={ urlCopied }>
                           <FacebookIcon round={ true } size={ 25 } />
                        </FacebookShareButton>
                        <WhatsappShareButton size={ 25 } url={ urlCopied }>
                           <WhatsappIcon round={ true } size={ 25 } />
                        </WhatsappShareButton>
                        { isMobile && <MdIosShare size={ 25 } onClick={ handleShare } /> }
                        <div className='copy-link-warpper-cop' onClick={ async () => onCopyLink() }>
                           <BiCopy className={ copied ? 'copy-svg color-copy-active' : 'copy-svg color-copy' } size={ 25 } />
                           <span className={ copied ? 'copy-link-text color-copy-active' : 'copy-link-text color-copy' }          >
                              copy-link
                           </span>
                        </div>
                     </div>
                  </div>
                  { article.precioUY != 0 && <span className="article-item-price">
                     { article.precioUY } $U
                  </span> 
                  }
                  <span className="article-item">
                     { article.detail && article.detail }
                  </span>
                  { article.sizes && article.sizes.length > 0 && (
                     <section className="article-item">
                        <span className="mb-2">Talles</span>
                        <div>
                           { article.sizes.map((el, index) => (
                              <span key={ index } className="pill-wrapper">
                                 { el.trim().toUpperCase() }{ ' ' }
                              </span>
                           )) }
                        </div>
                     </section>
                  ) }
                  { article.colors && article.colors.length > 0 && (
                     <section className="article-item">
                        <span className="mb-2">Colores</span>
                        <div>
                           { article.colors.map((el, index) =>
                              el ? (
                                 <span key={ index } className="pill-wrapper">
                                    { el.trim().toUpperCase() }{ ' ' }
                                 </span>
                              ) : null,
                           ) }
                        </div>
                     </section>
                  ) }
                  { article.sizesDescriptions &&
                     article.sizesDescriptions.length > 0 && (
                        <section className="details-product">
                           <span className="mb-2">Detalles</span>
                           { article.sizesDescriptions.map((element, index) => {
                              return (
                                 <span key={ index } className="flex-center">
                                    { ' ' }
                                    <TiMinus className="mr-5p" />
                                    { element.data } { element.description }{ ' ' }
                                 </span>
                              )
                           }) }
                     </section>
                     ) }
               </div>
               <span className={ copied ? 'copy-link-url-active' : 'copy-link-url' } id="copy-id" >
                  link copiado
               </span>
            </>
         ) }
      </Modal>
   )
}

OverlayArticle.propTypes = propTypes
OverlayArticle.defaultProps = defaultProps

export default OverlayArticle;
