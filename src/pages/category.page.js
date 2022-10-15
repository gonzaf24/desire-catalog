import React, { useState, useEffect, Fragment } from 'react'
import '../styles/lino.style.css'
import { FaPlay } from 'react-icons/fa'
import { HiPlusSm } from 'react-icons/hi'
import OverlayArticle from '../components/overlayArticle.component'
import Mode1 from '../images/mode-1.png'
import Mode2 from '../images/mode-2.png'
import Mode1Active from '../images/mode-1-active.png'
import Mode2Active from '../images/mode-2-active.png'
import useProduct from '../hooks/useProduct'
import ListCardArticle from '../components/listCardArticle.component'
import Loader from '../components/loader.component'
import Dropdown from 'react-bootstrap/Dropdown'
import useOpenToggle from '../hooks/useOpenToggle'
import PropTypes from 'prop-types'

const propTypes = {
   params: PropTypes.shape({
      category: PropTypes.string,
   }),
}

const defaultProps = {
   params: {
      category: '',
   },
}

export const Category = ({ params }) => {
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

   const onClickProduct = (product) => {
      setProductSelected(product)
      openModal()
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
   }, [getProductByCategoryHook, params.category, productSelected])

   return (
      <Fragment>
         <section>
            <section className="container-icons-show">
               <Dropdown className="fliter-wrapper">
                  <Dropdown.Toggle className="filtros-content" id="prueba">
                     <FaPlay className="rotate90" />
                     <span className="ml-2 fw-2">FILTRO</span>
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
               <h1 className="h1-title-span"> { categoryNamePage } </h1>
               <div className="icons-wrapper flex-center">
                  { isMode1Active && (
                     <>
                        <img alt="" className="icon-card-show" src={ Mode1Active } width={ 5 } />
                        <img alt="" className="icon-card-show icon-active" src={ Mode2 } width={ 5 } onClick={ () => setIsMode1Active(false) } />
                     </>
                  ) }
                  { !isMode1Active && (
                     <>
                        <img alt="" className="icon-card-show icon-active" src={ Mode1 } width={ 5 } onClick={ () => setIsMode1Active(true) } />
                        <img alt="" className="icon-card-show" src={ Mode2Active } width={ 5 } />
                     </>
                  ) }
               </div>
            </section>
            { isLoading ? (
               <Loader size={ 'xl' } />
            ) : (
               <ListCardArticle
                  isMode1Active={ isMode1Active }
                  productsList={ productsList }
                  onClickArticle={ onClickProduct }
               />
            ) }
         </section>

         <OverlayArticle
            articleToShow={ productSelected }
            isOpenModal={ isOpenModal }
            onCloseModal={ onCloseModal }
         />
      </Fragment>
   )
}

Category.propTypes = propTypes
Category.defaultProps = defaultProps

export default Category
