import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types';
import { FaPlay } from 'react-icons/fa'
import { HiPlusSm } from 'react-icons/hi'
import Mode1 from '../../images/mode-1.png'
import Mode2 from '../../images/mode-2.png'
import Mode1Active from '../../images/mode-1-active.png'
import Mode2Active from '../../images/mode-2-active.png'
import { useProduct, useOpenToggle } from '../../hooks/'
import { OverlayArticle, CardArticleList, LoaderSkeleton } from '../../components'
import Dropdown from 'react-bootstrap/Dropdown'

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
  const [isMode1Active, setIsMode1Active] = useState(false)
  const { getProductByCategoryHook } = useProduct()
  const [categoryNamePage, setCategoryNamePage] = useState('')
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

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      <div>
        <section className="CategoryContainerIconsShow">
          <Dropdown className="CategoryFilterWrapper">
            <Dropdown.Toggle className="CategoryFilterContent" >
              <FaPlay className="CategoryRotate90" />
              <span className="CategoryFilterSize">FILTRO</span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={ ordenarBaratos }>
                <HiPlusSm />
                BARATOS PRIMERO
              </Dropdown.Item>
              <Dropdown.Item onClick={ ordenarFechaCreacion }>
                <HiPlusSm />
                NUEVOS PRIMERO
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <h1 className="CategoryTitle"> { categoryNamePage } </h1>
          <div className="CategoryIconsWrapper">
            { isMode1Active && (
              <>
                <img alt="" className="CategoryModelIconShow" src={ Mode1Active } width={ 5 } />
                <img alt="" className="CategoryModelIconShowActive" src={ Mode2 } width={ 5 } onClick={ () => setIsMode1Active(false) } />
              </>
            ) }
            { !isMode1Active && (
              <>
                <img alt="" className="CategoryModelIconShowActive" src={ Mode1 } width={ 5 } onClick={ () => setIsMode1Active(true) } />
                <img alt="" className="CategoryModelIconShow" src={ Mode2Active } width={ 5 } />
              </>
            ) }
          </div>
        </section>
        { isLoading ? (
          <LoaderSkeleton />
        ) : (
          <CardArticleList
            isMode1Active={ isMode1Active }
            productsList={ productsList }
            onClickArticle={ onClickProduct }
          />
        ) }
      </div>

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
