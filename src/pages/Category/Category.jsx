import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { useProduct, useOpenToggle } from '../../hooks/'
import { OverlayArticle, CardArticleList, LoaderSkeleton, Filter } from '../../components'

import './Category.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  params: PropTypes.shape({
    category: PropTypes.string,
  }),
};

const defaultProps = {
  className: '',
  id: undefined,
  params: {
    category: '',
  },
};

const Category = ({ className, id, params }) => {
  const classComponent = ['Category', className].join(' ').trim();
  const [productsList, setProductsList] = useState([])
  const [productSelected, setProductSelected] = useState()
  const { getProductByCategoryHook } = useProduct()
  const [categoryNamePage, setCategoryNamePage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isMode1ViewActive, setIsMode1ViewActive] = useState(false)

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
      return new Date(a.dateCreated) - new Date(b.dateCreated)
    })
    setProductsList(outList)
    setTimeout(() => {
      setIsLoading(false)
    }, 300)
  }

  useEffect(() => {
    async function exect() {
      setIsLoading(true)
      setProductsList(await getProductByCategoryHook(params.category))
      let nameAux
      if (params.category.indexOf('MUJER-') === 0) {
        nameAux = params.category.replace('MUJER-', '')
        setCategoryNamePage(nameAux)
        setIsLoading(false)
      } else {
        nameAux = params.category.replace('HOMBRE-', '')
        setCategoryNamePage(nameAux)
        setIsLoading(false)
      }
    }
    exect()
  }, [getProductByCategoryHook, params.category])

  const handleModelView = (isMode1ViewActive) => {
    setIsMode1ViewActive(!isMode1ViewActive)
  }

  return (
    <div className={ classComponent } id={ id } >
      <Filter
        categoryNamePage={ categoryNamePage }
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

Category.propTypes = propTypes;
Category.defaultProps = defaultProps;

export default Category;
