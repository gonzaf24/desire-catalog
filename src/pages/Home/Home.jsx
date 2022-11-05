import React, { useState, useEffect } from 'react'
import { useProduct, useOpenToggle } from '../../hooks'
import { LoaderSkeleton, CardArticleList, OverlayArticle, Filter } from '../../components'
import PropTypes from 'prop-types';

import './Home.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const Home = ({ className, id }) => {
  const classComponent = ['Home', className].join(' ').trim();
  const { getProductsHook } = useProduct()
  const [productsList, setProductsList] = useState()
  const [productSelected, setProductSelected] = useState()
  const [isMode1ViewActive, setIsMode1ViewActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    isOpen: isOpenModal,
    open: openModal,
    close: onCloseModal,
  } = useOpenToggle(false)

  const onClickProduct = (e, product) => {
    e.preventDefault();
    setIsLoading(true)
    setProductSelected(product)
    openModal()
    setIsLoading(false)
  }

  const ordenarBaratos = async () => {
    setIsLoading(true)
    const outList = productsList.sort((a, b) => a.precioUY - b.precioUY)
    setProductsList(outList)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  const ordenarFechaCreacion = async () => {
    setIsLoading(true)
    const outList = productsList.sort((a, b) => {
      return new Date(b.dateCreated) - new Date(a.dateCreated)
    })
    setProductsList(outList)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  useEffect(() => {
    async function exect() {
      setIsLoading(true)
      const products = await getProductsHook()
      const outList = products.sort((a, b) => {
        return new Date(b.dateCreated) - new Date(a.dateCreated)
      })
      setProductsList(outList)
      setTimeout(() => {
        setIsLoading(false)
      }, 300)
    }
    exect()
  }, [getProductsHook])

  const handleModelView = (isMode1ViewActive) => {
    setIsMode1ViewActive(!isMode1ViewActive)
  }

  return (
    <div className={ classComponent } id={ id }    >
      <Filter
        categoryNamePage={ 'HOME' }
        handleModelView={ handleModelView }
        ordenarBaratos={ ordenarBaratos }
        ordenarFechaCreacion={ ordenarFechaCreacion }
      />
      { isLoading ? (
        <LoaderSkeleton />
      ) : (
        <CardArticleList
          isMode1ViewActive={ isMode1ViewActive }
          productsList={ productsList }
          onClickArticle={ onClickProduct }
        />
      ) }
      <OverlayArticle
        articleToShow={ productSelected }
        isLoading={ isLoading }
        isOpenModal={ isOpenModal }
        onCloseModal={ onCloseModal }
      />
    </div>
  );
};

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
