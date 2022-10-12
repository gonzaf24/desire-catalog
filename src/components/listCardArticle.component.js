import React, { useState, useEffect } from 'react';
import "../styles/lino.style.css"
import "../styles/listCardArticle.style.css"
import CardArticle from './cardArticle.component';

export const ListCardArticle = ({ isMode1Active, onClickArticle, productsList }) => {

  const [listOfProducts, setlistOfProducts] = useState([]);

  useEffect(() => {
    setlistOfProducts(productsList)
  }, [productsList]);

  return <article className='card-main'>
    <div className={ isMode1Active ? "grid-main " : "grid-main grid-main-double-active" }>
      { listOfProducts.length > 0 && listOfProducts.map((prenda, index) => {
        return prenda.isActive ? <CardArticle key={ index } article={ prenda } onClickArticle={ () => onClickArticle(prenda) } /> : null
      }) }
    </div>
  </article>
}

export default ListCardArticle;