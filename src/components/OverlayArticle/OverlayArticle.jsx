import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BiCopy } from 'react-icons/bi'
import { TiMinus } from 'react-icons/ti'
import { MdIosShare } from 'react-icons/md'
import { isMobile } from 'react-device-detect'
import { Modal } from '../../containers'
import { SliderCarousel } from '../../components'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'

import './OverlayArticle.css';

const propTypes = {
  articleToShow: PropTypes.shape({
    description: PropTypes.string,
    id: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    precioUY: PropTypes.string,
  }),
  className: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpenModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
};

const defaultProps = {
  articleToShow: {
    description: '',
    photos: [],
    id: '',
    precioUY: '',
  },
  className: '',
  id: undefined,
  isLoading: false,
  isOpenModal: false,
  onCloseModal: undefined,
};

const OverlayArticle = ({ id, className, isOpenModal, isLoading, onCloseModal, articleToShow }) => {
  const classComponent = ['OverlayArticle', className].join(' ').trim();

  const [copied, setCopied] = useState(false)
  const [article, setArticle] = useState(articleToShow)
  const [urlCopied, setUrlCopied] = useState('')

  useEffect(() => {
    const url = window.location.host + '/product/' + articleToShow.id
    setUrlCopied(url);
  }, []);

  const onCopyLink = async () => {
    setCopied(false)
    setCopied(true)
    const url = window.location.host + '/product/' + articleToShow.id
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
      setUrlCopied(window.location.host + '/product/' + articleToShow.id)
    }
  }, [articleToShow, isOpenModal])

  const onCloseLocal = () => {
    onCloseModal()
    setArticle(null)
  }

  return (
    <Modal
      className={ classComponent }
      id={ id }
      isLoading={ isLoading }
      isOpen={ isOpenModal }
      onClose={ onCloseLocal }
      onHide={ onCloseLocal }
    >
      { article && (
        <>
          <div className="OverlayArticlWrapper-1">
            <SliderCarousel>
              { article.photos.map((imagen, index) => {
                return (
                  <section key={ index } className="OverlayArticleSection">
                    <img
                      alt=""
                      className="OverlayArticleImgCard"
                      src={ imagen }
                    />
                  </section>
                )
              }) }
            </SliderCarousel>
          </div>
          <div className="OverlayArticlWrapper-2">
            <div className="OverlayArticleShared">
              <span className='OverlayArticleFontW800'>REF. { article.ref }</span>
              <div className="OverlayArticleLinkCopy">
                <FacebookShareButton size={ 25 } url={ urlCopied }>
                  <FacebookIcon round={ true } size={ 25 } />
                </FacebookShareButton>
                <WhatsappShareButton size={ 25 } url={ urlCopied }>
                  <WhatsappIcon round={ true } size={ 25 } />
                </WhatsappShareButton>
                { isMobile && <MdIosShare size={ 25 } onClick={ handleShare } /> }
                <div className='OverlayArticleLinkCopyCop' onClick={ async () => onCopyLink() }>
                  <BiCopy className={ copied ? 'OverlayArticleBiCopy' : 'OverlayArticleBiCopied' } size={ 25 } />
                  <span className={ copied ? 'OverlayArticleIconCopy' : 'OverlayArticleIconCopied' }          >
                    copy-link
                  </span>
                </div>
              </div>
            </div>
            { article.precioUY != 0 && <span className="OverlayArticlePrice">
              { article.precioUY } $U
            </span>
            }
            <span className="OverlayArticleItem">
              { article.detail && article.detail }
            </span>
            { article.sizes && article.sizes.length > 0 && (
              <section className="OverlayArticleItem">
                <span className="OverlayArticleFontW800">Talles</span>
                <div className='OverlayArticlePillWrapper'>
                  { article.sizes.map((el, index) => (
                    <span key={ index } className="OverlayArticleWrapperPill">
                      { el.trim().toUpperCase() }
                    </span>
                  )) }
                </div>
              </section>
            ) }
            { article.colors && article.colors.length > 0 && (
              <section className="OverlayArticleItem">
                <span className="OverlayArticleFontW800">Colores</span>
                <div className='OverlayArticlePillWrapper'>
                  { article.colors.map((el, index) =>
                    el ? (
                      <span key={ index } className="OverlayArticleWrapperPill">
                        { el.trim().toUpperCase() }
                      </span>
                    ) : null,
                  ) }
                </div>
              </section>
            ) }
            { article.sizesDescriptions &&
              article.sizesDescriptions.length > 0 && (
                <section className="OverlayArticleDetailProduct">
                  <span className="OverlayArticleFontW800">Detalles</span>
                  { article.sizesDescriptions.map((element, index) => {
                    return (
                      <span key={ index } className="OverlayArticleFlexCenter">
                        <TiMinus className="OverlayArticleMarginRight5" />
                        { element.data } { element.description }
                      </span>
                    )
                  }) }
                </section>
              ) }
          </div>
          <span className={ copied ? 'OverlayArticleUrlActive' : 'OverlayArticleCopyUrl' } id="copy-id" >
            link copiado
          </span>
        </>
      ) }
    </Modal>
  );
};

OverlayArticle.propTypes = propTypes;
OverlayArticle.defaultProps = defaultProps;

export default OverlayArticle;