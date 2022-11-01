import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import './CardArticleList.css';
import CardArticle from '../CardArticle/CardArticle';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isMode1Active: PropTypes.bool,
  productsList: PropTypes.array,
  onClickArticle: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  isMode1Active: false,
  productsList: [],
  onClickArticle: undefined,
};

const CardArticleList = ({ className, id, isMode1Active, onClickArticle, productsList }) => {
  const classComponent = className ? ['CardArticleList', className] : ['CardArticleList'];
  const [listOfProducts, setlistOfProducts] = useState([])

  useEffect(() => {
    setlistOfProducts(productsList)
  }, [productsList])


  return (
    <article className={ classComponent } id={ id }>
      <section>
        <div className='CardArticleWrapper'>
          { listOfProducts.length > 0 &&
            listOfProducts.map((prenda, index) => {
              return prenda.isActive ? (
                <CardArticle
                  key={ index }
                  article={ prenda }
                  isMode1Active={ isMode1Active }
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