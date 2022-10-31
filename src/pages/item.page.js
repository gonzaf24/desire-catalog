import React, { useState, useEffect } from 'react';
import '../styles/overlayArticle.style.css';
import useProduct from '../hooks/useProduct';
import Slider from 'react-slick';
import { BiCopy } from 'react-icons/bi';
import { TiMinus } from 'react-icons/ti';
import { MdIosShare } from 'react-icons/md'
import { Link } from 'wouter';
import PropTypes from 'prop-types'
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';
import { isMobile } from 'react-device-detect';
import { LoaderSkeleton } from '../components';

const propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
}

const defaultProps = {
  params: {
    id: '',
  },
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
};

export const Item = ({ params }) => {

  const [isLoading, setIsLoading] = useState(true);
  const { getProductByIdHook } = useProduct();
  const [articleToShow, setArticleToShow] = useState(null);
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState('');

  const onCopyLink = () => {
    setCopied(false);
    setCopied(true);
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setTimeout(() => {
      setCopied(false);
    }, 500);
  };

  useEffect(() => {
    async function exect() {
      try {
        setIsLoading(true);
        const productToShow = await getProductByIdHook(params.id);
        setArticleToShow(productToShow);
        const url = window.location.href;
        setUrlCopied(url);
        setIsLoading(false);
      } catch (error) {
        setArticleToShow({});
        setIsLoading(false);
      }
    }
    exect();
  }, [getProductByIdHook, params.id]);


  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Anastassa - ${articleToShow.description}`,
          text: `${articleToShow.detail}`,
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

  return (
    <section className="overlay-article-container-item-page">
        { isLoading ? (
        <LoaderSkeleton size={ 1 } />
        ) : Object.keys(articleToShow).length > 0 ? (
          <article className="overlay-article-wrapper-item">
              <div className="card-wpr-1">
                <Slider { ...settings } id="slider">
                  { articleToShow.photos.map((imagen, index) => {
                    return (
                      <img
                        key={ index }
                        alt=""
                        className="img-card-article-overlay"
                        src={ imagen }
                      />
                    );
                  }) }
                </Slider>
              </div>
              <div className="card-wpr-2">
                <div className="article-item">
                  <span>REF. { articleToShow.ref }</span>
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
                      <span className={ copied ? 'copy-link-text color-copy-active' : 'copy-link-text color-copy' }                      >
                        copy-link
                      </span>
                    </div>
                  </div>
                </div>
                <span className="article-item-price">
                  { articleToShow.precioUY } $U
                </span>
                <span className="article-item">
                  { articleToShow.description && articleToShow.description }
                </span>
                <span className="article-item">
                  { articleToShow.detail && articleToShow.detail }
                </span>
                { articleToShow.sizes && articleToShow.sizes.length > 0 && (
                  <section className="article-item">
                    <span className="mb-2">Talles</span>
                    <div>
                      { articleToShow.sizes.map((el, index) => (
                        <span key={ index } className="pill-wrapper">
                          { el.trim() }{ ' ' }
                        </span>
                      )) }
                    </div>
                  </section>
                ) }
                { articleToShow.colors && articleToShow.colors.length > 0 && (
                  <section className="article-item">
                    <span className="mb-2">Colores</span>
                    <div>
                      { articleToShow.colors.map((el, index) => (
                        <span key={ index } className="pill-wrapper">
                          { el.trim() }{ ' ' }
                        </span>
                      )) }
                    </div>
                  </section>
                ) }
                { articleToShow.sizesDescriptions &&
                  articleToShow.sizesDescriptions.length > 0 && (
                    <section className="details-product">
                      <span className="mb-2">Detalles</span>
                      { articleToShow.sizesDescriptions.map((element, index) => {
                        return (
                          <span key={ index } className="flex-center">
                            { ' ' }
                            <TiMinus className="mr-5p" />
                            { element.data } { element.description }{ ' ' }
                          </span>
                        );
                      }) }
                  </section>
                  ) }
              </div>
              <h6>info@anastassa.com</h6>
          </article>
          ) : (
            <div className="article-not-exist">
                <span className="txt-article-not-exist mb-4">
                  El artículo que buscas no existe.
                </span>
              <Link to="/">
                  <span className="btn-go-home">ir a Home</span>
            </Link>
          </div>
        ) }

      <span className={ copied ? 'copy-link-url-active' : 'copy-link-url' } id="copy-id"   >
        link copiado
      </span>
    </section>
  );
};

Item.propTypes = propTypes
Item.defaultProps = defaultProps

export default Item;
