import React, { useState, useEffect } from 'react'
import { FaPlay } from 'react-icons/fa'
import { HiPlusSm } from 'react-icons/hi'
import Mode1 from '../../images/mode-1.png'
import Mode2 from '../../images/mode-2.png'
import Mode1Active from '../../images/mode-1-active.png'
import Mode2Active from '../../images/mode-2-active.png'
import Dropdown from 'react-bootstrap/Dropdown'
import { useProduct, useOpenToggle } from '../../hooks'
import { LoaderSkeleton, CardArticleList, OverlayArticle } from '../../components'
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
  const [isMode1Active, setIsMode1Active] = useState(false)
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


  return (
    <div
      className={ classComponent }
      id={ id }
    >
      <div >
        <section className="HomeContainerIcons">
          <Dropdown className="HomeFilterWrapper">
            <Dropdown.Toggle className="HomeFilterContent">
              <FaPlay className="HomeRotate90" />
              <span className="HomeFilterSize">FILTRO</span>
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
          <h1 className="HomeTitle"> HOME </h1>
          <div className="HomeIconsWrapper">
            { isMode1Active && (
              <>
                <img alt="" className="HomeModelIconShow" src={ Mode1Active } width={ 5 } />
                <img alt="" className="HomeModelIconShowActive" src={ Mode2 } width={ 5 } onClick={ () => setIsMode1Active(false) } />
              </>
            ) }
            { !isMode1Active && (
              <>
                <img alt="" className="HomeModelIconShowActive" src={ Mode1 } width={ 5 } onClick={ () => setIsMode1Active(true) } />
                <img alt="" className="HomeModelIconShow" src={ Mode2Active } width={ 5 } />
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

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default Home;
