import React, { useState, useEffect } from 'react'
import '../styles/CategoryPage.style.css'
import '../styles/listCardArticle.style.css'
import CardArticle from './cardArticle.component'
import PropTypes from 'prop-types'

const propTypes = {
   isMode1Active: PropTypes.bool,
   productsList: PropTypes.array,
   onClickArticle: PropTypes.func,
}

const defaultProps = {
   isMode1Active: false,
   productsList: [],
   onClickArticle: undefined,
}

export const ListCardArticle = ({ isMode1Active, onClickArticle, productsList, }) => {

   const [listOfProducts, setlistOfProducts] = useState([])

   useEffect(() => {
      setlistOfProducts(productsList)
   }, [productsList])

   return (
      <article className='card-main'>
         <section>
            <div className='grid-main'>
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
   )
}

ListCardArticle.propTypes = propTypes
ListCardArticle.defaultProps = defaultProps

export default ListCardArticle
