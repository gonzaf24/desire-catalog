import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CardArticle from '../CardArticle/CardArticle';

import './CardArticleList.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isMode1ViewActive: PropTypes.bool,
  productsList: PropTypes.array,
  onClickArticle: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  isMode1ViewActive: false,
  productsList: [],
  onClickArticle: undefined,
};

const CardArticleList = ({ className, id, isMode1ViewActive, onClickArticle, productsList }) => {
  const classComponent = ['CardArticleList', className].join(' ').trim();
  const [listOfProducts, setlistOfProducts] = useState([])

  useEffect(() => {
    setlistOfProducts(productsList)
  }, [productsList])


  return (
    <article className={ classComponent } id={ id }>
      <section>
        <div className='CardArticleListWrapper'>
          { listOfProducts.length > 0 &&
            listOfProducts.map((prenda, index) => {
              return prenda.isActive ? (
                <CardArticle
                  key={ index }
                  article={ prenda }
                  isMode1ViewActive={ isMode1ViewActive }
                  onClickArticle={ (e) => onClickArticle(e, prenda) }
                />
              ) : null
            }) }
        </div>
      </section>
    </article>
  );
};

CardArticleList.propTypes = propTypes;
CardArticleList.defaultProps = defaultProps;

export default CardArticleList;