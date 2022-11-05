import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'wouter';
import { BiCopy } from 'react-icons/bi';
import { TiMinus } from 'react-icons/ti';
import { MdIosShare } from 'react-icons/md'
import { isMobile } from 'react-device-detect';
import { useProduct } from '../../hooks';
import { LoaderSkeleton, SliderCarousel } from '../../components';
import { FacebookIcon, FacebookShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share';

import './Product.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};

const defaultProps = {
  className: '',
  id: undefined,
  params: {
    id: '',
  },
};

const Product = ({ className, id, params }) => {
  const classComponent = ['Product', className].join(' ').trim();
  const [isLoading, setIsLoading] = useState(true);
  const { getProductByIdHook } = useProduct();
  const [productToShow, setProductToShow] = useState(null);
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
        setProductToShow(productToShow);
        const url = window.location.href;
        setUrlCopied(url);
        setIsLoading(false);
      } catch (error) {
        setProductToShow({});
        setIsLoading(false);
      }
    }
    exect();
  }, [getProductByIdHook, params.id]);


  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Anastassa - ${productToShow.description}`,
          text: `${productToShow.detail}`,
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
    <div
      className={ classComponent }
      id={ id }
    >
      { isLoading ? (
        <LoaderSkeleton size={ 1 } />
      ) : Object.keys(productToShow).length > 0 ? (
        <article className="ProductOverlayWrapperItem">
          <div className="ProductCardWpr1">
              <SliderCarousel>
              { productToShow.photos.map((imagen, index) => {
                return (
                  <img
                    key={ index }
                    alt=""
                    className="ProductImgCardOverlay"
                    src={ imagen }
                  />
                );
              }) }
              </SliderCarousel>
          </div>
          <div className="ProductCardWpr2">
            <div className="ProductItem">
              <span>REF. { productToShow.ref }</span>
              <div className="ProductLinksCopyContainer">
                <FacebookShareButton size={ 25 } url={ urlCopied }>
                  <FacebookIcon round={ true } size={ 25 } />
                </FacebookShareButton>
                <WhatsappShareButton size={ 25 } url={ urlCopied }>
                  <WhatsappIcon round={ true } size={ 25 } />
                </WhatsappShareButton>
                { isMobile && <MdIosShare size={ 25 } onClick={ handleShare } /> }
                <div className='ProductCopyLinkWarpperCopy' onClick={ async () => onCopyLink() }>
                  <BiCopy className={ copied ? 'ProductCopySvgActive' : 'ProductCopySvg' } size={ 25 } />
                  <span className={ copied ? 'ProductCopyLinkTextActive' : 'ProductCopyLinkText' }                      >
                    copy-link
                  </span>
                </div>
              </div>
            </div>
            <span className="ProductItemPrice">
              { productToShow.precioUY } $U
            </span>
            <span className="ProductItem">
              { productToShow.description && productToShow.description }
            </span>
            <span className="ProductItem">
              { productToShow.detail && productToShow.detail }
            </span>
            { productToShow.sizes && productToShow.sizes.length > 0 && (
              <section className="ProductItem">
                <span >Talles</span>
                <div className='ProductPillItemWrapper'>
                  { productToShow.sizes.map((el, index) => (
                    <span key={ index } className="ProductPillItem">
                      { el.trim() }{ ' ' }
                    </span>
                  )) }
                </div>
              </section>
            ) }
            { productToShow.colors && productToShow.colors.length > 0 && (
              <section className="ProductItem">
                <span >Colores</span>
                <div className='ProductPillItemWrapper'>
                  { productToShow.colors.map((el, index) => (
                    <span key={ index } className="ProductPillItem">
                      { el.trim() }{ ' ' }
                    </span>
                  )) }
                </div>
              </section>
            ) }
            { productToShow.sizesDescriptions &&
              productToShow.sizesDescriptions.length > 0 && (
                <section className="ProductDetails">
                  <span >Detalles</span>
                  <div className='ProductPillItemWrapper'>
                    { productToShow.sizesDescriptions.map((element, index) => (
                      <span key={ index } className="ProductDetailWrapper">
                        <TiMinus />
                        <span>{ element.data } { element.description }</span>
                      </span>
                    )) };
                  </div>
                </section>
              ) }
          </div>
          <h6>info@anastassa.com</h6>
        </article>
      ) : (
        <div className="ProductNotExist">
          <span className="ProductNotExistText">
            El artículo que buscas no existe.
          </span>
          <Link to="/">
            <span className="ProductBtnGoHome">ir a Home</span>
          </Link>
        </div>
      ) }

      <span className={ copied ? 'ProductCopyLinkUrlActive' : 'ProductCopyLinkUrl' } >
        link copiado
      </span>
    </div>
  );
};

Product.propTypes = propTypes;
Product.defaultProps = defaultProps;

export default Product;
