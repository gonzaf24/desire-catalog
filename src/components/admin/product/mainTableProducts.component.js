import React, { useState, useEffect } from 'react'
import '../../../styles/admin.style.css'
import { Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap'
import { BsImages } from 'react-icons/bs'
import { MdDeleteForever } from 'react-icons/md'
import { AiTwotoneEdit } from 'react-icons/ai'
import { TbSortAscending } from 'react-icons/tb'
import { TiPlus } from 'react-icons/ti'
import { HiRefresh } from 'react-icons/hi'
import useProduct from '../../../hooks/useProduct'
import EditProductOverlay from '../../../components/admin/product/editProductOverlay.component'
import NewProductOverlay from './newProductOverlay.component'
import AlertDismissible from '../../alertDismissible.component'
import ShowCarouselFullSizeImages from '../../showCarouselFullSizeImages'
import AlertConfirm from '../../alertConfirm.component'
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import useOpenToggle from '../../../hooks/useOpenToggle'

export const MainTableProducts = () => {
   const { getProductsHook, deleteProductHook } = useProduct()
   const [isLoading, setIsLoading] = useState(false)
   const [isLoadingProducts, setIsLoadingProducts] = useState(false)
   const [selectedSearch, setSelectedSearch] = useState('')
   const [textSearchProduct, setTextSearchProduct] = useState('')
   const [selectedProduct, setSelectedProduct] = useState()
   const [showCarouselFullSizeImages, setShowCarouselFullSizeImages] = useState(false)
   const [arrayImages, setArrayImages] = useState([])
   const [productsList, setProductsList] = useState([])
   const [showAlert, setShowAlert] = useState(false)
   const [messageError, setMessageError] = useState()
   const [typeError, setTypeError] = useState('succes')
   const [showAlertConfirm, setShowAlertConfirm] = useState(false)
   const [idDeleteProduct, setIdDeleteProduct] = useState()
   const [detailsInTable, setDetailsInTable] = useState(false)
   const [editInTable, setEditInTable] = useState(true)
   const [deleteInTable, setDeleteInTable] = useState(true)
   const [photosInTable, setPhotosInTable] = useState(true)
   const [positionInTable, setPositionInTable] = useState(false)
   const [activeInTable, setActiveInTable] = useState(true)
   const [prodNuevoInTable, setProdNuevoInTable] = useState(false)
   const [discountInTable, setDiscountInTable] = useState(true)
   const [priceUYInTable, setPriceUYInTable] = useState(true)
   const [priceESInTable, setPriceESInTable] = useState(false)
   const [priceUSDInTable, setPriceUSDInTable] = useState(false)

   const onDeleteProduct = (idProduct) => {
      setIdDeleteProduct(idProduct)
      setShowAlertConfirm(true)
   }

   const {
      isOpen: isOpenModal,
      open: openModal,
      close: onCloseModal,
   } = useOpenToggle(false)

   const {
      isOpen: isOpenModalEditProduct,
      open: openModalEditProduct,
      close: onCloseModalEditProduct,
   } = useOpenToggle(false)

   const confirmDeleteProduct = async () => {
      try {
         const isDeleted = await deleteProductHook(idDeleteProduct)
         if (isDeleted) {
            setShowAlert(true)
            setMessageError('Producto/item eliminado.')
            setTypeError('succes')
            setIdDeleteProduct()
         }
         setShowAlertConfirm(false)
      } catch (error) {
         console.log('error ', error)
      }
   }

   const cancelDeleteProduct = () => {
      setIdDeleteProduct()
      setShowAlertConfirm(false)
   }

   const onSuccessEditProduct = async () => {
      const productsOut = await getProductsHook()
      setProductsList(productsOut)
   }

   const refreshTable = async () => {
      const productsOut = await getProductsHook()
      setProductsList(productsOut)
      setTextSearchProduct('')
      return productsOut
   }

   const onSuccessNewProduct = async () => {
      setIsLoading(true);
      const productsOut = await getProductsHook()
      setProductsList(productsOut)
      setIsLoading(false);
   }

   const onEditProduct = async (product) => {
      setSelectedProduct(product)
      openModalEditProduct()
   }

   const onShowFullSizeCarouselImages = (arrayImages) => {
      setArrayImages(arrayImages)
      setShowCarouselFullSizeImages(true)
   }

   const orderSortProductList = async (type) => {
      setIsLoadingProducts(true)
      setProductsList(sortList(productsList, type))
      setTimeout(() => {
         setIsLoadingProducts(false)
      }, 500)
   }

   const orderSortProductListNumber = async (type) => {
      setIsLoadingProducts(true)
      setProductsList(sortListNumber(productsList, type))
      setTimeout(() => {
         setIsLoadingProducts(false)
      }, 500)
   }

   async function searchText() {
      setIsLoadingProducts(true)
      const tableToSearchIn = await refreshTable()
      let outList = tableToSearchIn.filter((element) => {
         const fieltToSearch = element[selectedSearch]
         return fieltToSearch
            .toLowerCase()
            .includes(textSearchProduct.trim().toLowerCase())
      })
      setProductsList(outList)
      setTimeout(() => {
         setIsLoadingProducts(false)
      }, 500)
   }

   const callbackCloseError = (param) => {
      setShowAlert(param)
   }

   const sortList = (list, field) => {
      const outListAux = list.sort((a, b) => {
         if (a[field] < b[field]) {
            return -1
         }
         if (a[field] > b[field]) {
            return 1
         }
         return 0
      })
      return outListAux
   }

   const sortListNumber = (list, field) => {
      const outListAux = list.sort((a, b) => {
         return a[field] - b[field]
      })
      return outListAux
   }

   useEffect(() => {
      const exect = async () => {
         const productsOut = await getProductsHook()
         setProductsList(productsOut)
      }
      exect()
   }, [
      showAlert,
      getProductsHook,
   ])

   return (
      <div className="">
         <div className="bar-wrapper mb-4">
            <Button
               className="flex-gap-button-icon mr-10p"
               onClick={ () => openModal() }
            >
               <TiPlus /> PRODUCTO
            </Button>
            <InputGroup className='input-group-product-admin'>
               <Form.Select
                  aria-label="Default select example"
                  className="select-search"
                  value={ selectedSearch }
                  onChange={ (e) => {
                     setSelectedSearch(e.target.value)
                  } }
               >
                  <option>BUSCAR POR</option>
                  <option value="ref">REF.</option>
                  <option value="nameCategory">NOMBRE CAT.</option>
                  <option value="description">DESC. PRODUCTO</option>
               </Form.Select>
               <Form.Control
                  aria-label="Aqui el texto a buscar en los productos."
                  placeholder="Texto a buscar"
                  value={ textSearchProduct }
                  onChange={ (e) => setTextSearchProduct(e.target.value) }
               />
               <Button
                  className="refreshTable"
                  disabled={
                     selectedSearch === 'BUSCAR POR' ||
                        selectedSearch === '' ||
                        textSearchProduct === ''
                        ? true
                        : false
                  }
                  variant={
                     selectedSearch === 'BUSCAR POR' ||
                        selectedSearch === '' ||
                        textSearchProduct === ''
                        ? 'outline-secondary'
                        : 'primary'
                  }
                  onClick={ () => searchText() }
               >
                  BUSCAR
               </Button>
               <Button
                  className="refreshTable"
                  variant="primary"
                  onClick={ () => refreshTable() }
               >
                  <HiRefresh />
                  Refrescar Tabla
               </Button>
            </InputGroup>
         </div>
         <div className="bar-wrapper mb-4">
            <InputGroup>
               <Form.Check
                  className="mr-10"
                  id={ 'chck1' }
                  label={ 'Detalle' }
                  type={ 'checkbox' }
                  value={ detailsInTable }
                  onChange={ () => setDetailsInTable(!detailsInTable) }
               />

               <Form.Check
                  checked={ activeInTable }
                  className="mr-10"
                  id={ 'chck4' }
                  label={ 'Activo' }
                  type={ 'checkbox' }
                  value={ activeInTable }
                  onChange={ () => setActiveInTable(!activeInTable) }
               />

               <Form.Check
                  checked={ prodNuevoInTable }
                  className="mr-10"
                  id={ 'chck5' }
                  label={ 'ProdNuevo' }
                  type={ 'checkbox' }
                  value={ prodNuevoInTable }
                  onChange={ () => setProdNuevoInTable(!prodNuevoInTable) }
               />

               <Form.Check
                  checked={ discountInTable }
                  className="mr-10"
                  id={ 'chck6' }
                  label={ 'Descuento' }
                  type={ 'checkbox' }
                  value={ discountInTable }
                  onChange={ () => setDiscountInTable(!discountInTable) }
               />

               <Form.Check
                  checked={ priceUYInTable }
                  className="mr-10"
                  id={ 'chck3' }
                  label={ 'Precio UY' }
                  type={ 'checkbox' }
                  value={ priceUYInTable }
                  onChange={ () => setPriceUYInTable(!priceUYInTable) }
               />

               <Form.Check
                  checked={ priceESInTable }
                  className="mr-10"
                  id={ 'chck31' }
                  label={ 'Precio ES' }
                  type={ 'checkbox' }
                  value={ priceESInTable }
                  onChange={ () => setPriceESInTable(!priceESInTable) }
               />

               <Form.Check
                  checked={ priceUSDInTable }
                  className="mr-10"
                  id={ 'chck32' }
                  label={ 'Precio USD' }
                  type={ 'checkbox' }
                  value={ priceUSDInTable }
                  onChange={ () => setPriceUSDInTable(!priceUSDInTable) }
               />

               <Form.Check
                  checked={ positionInTable }
                  className="mr-10"
                  id={ 'chck411' }
                  label={ 'Posición' }
                  type={ 'checkbox' }
                  value={ positionInTable }
                  onChange={ () => setPositionInTable(!positionInTable) }
               />

               <Form.Check
                  checked={ photosInTable }
                  className="mr-10"
                  id={ 'chck41' }
                  label={ 'Fotos' }
                  type={ 'checkbox' }
                  value={ photosInTable }
                  onChange={ () => setPhotosInTable(!photosInTable) }
               />

               <Form.Check
                  checked={ editInTable }
                  className="mr-10"
                  id={ 'chck21' }
                  label={ 'Editar' }
                  type={ 'checkbox' }
                  value={ editInTable }
                  onChange={ () => setEditInTable(!editInTable) }
               />

               <Form.Check
                  checked={ deleteInTable }
                  className="mr-10"
                  id={ 'chck311' }
                  label={ 'Eliminar' }
                  type={ 'checkbox' }
                  value={ deleteInTable }
                  onChange={ () => setDeleteInTable(!deleteInTable) }
               />

               <ReactHTMLTableToExcel
                  buttonText="Exportar a Excel"
                  className="export-excel"
                  filename={ `Productos-Anastassa-${new Date().getTime()}` }
                  sheet="tablexls"
                  table="productTableId"
               />
            </InputGroup>
         </div>

         <section>
            <Table
               bordered
               className="admin-table-id"
               hover
               id="productTableId"
               responsive
               size="sm"
               striped
            >
               <thead>
                  <tr>
                     <th>#</th>
                     <th>
                        Ref.
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortProductListNumber('ref') }
                        />
                     </th>
                     <th>
                        Nombre Cat.
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortProductList('nameCategory') }
                        />
                     </th>
                     <th>
                        Desc. Producto
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortProductList('description') }
                        />
                     </th>
                     { detailsInTable && (
                        <th>
                           Detalle Prod.
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () =>
                                 orderSortProductList('description')
                              }
                           />
                        </th>
                     ) }
                     { activeInTable && (
                        <th>
                           Activo
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () => orderSortProductList('isActive') }
                           />
                        </th>
                     ) }
                     { prodNuevoInTable && (
                        <th>
                           Prod. Nuevo
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () => orderSortProductList('newProduct') }
                           />
                        </th>
                     ) }
                     { priceUYInTable && (
                        <th>
                           Precio UY
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () =>
                                 orderSortProductListNumber('precioUY')
                              }
                           />
                        </th>
                     ) }
                     { priceESInTable && (
                        <th>
                           Precio ES
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () =>
                                 orderSortProductListNumber('precioES')
                              }
                           />
                        </th>
                     ) }
                     { priceUSDInTable && (
                        <th>
                           Precio USD
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () =>
                                 orderSortProductListNumber('precioUSD')
                              }
                           />
                        </th>
                     ) }
                     { discountInTable && (
                        <th>
                           Descuento
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () => orderSortProductList('discount') }
                           />
                        </th>
                     ) }
                     { positionInTable && (
                        <th>
                           Posición
                           <TbSortAscending
                              className="ascending-icon"
                              onClick={ () => orderSortProductList('position') }
                           />
                        </th>
                     ) }
                     { photosInTable && <th className="center">Fotos</th> }
                     { editInTable && <th className="center">Editar</th> }
                     { deleteInTable && <th className="center">Eliminar</th> }
                  </tr>
               </thead>
               <tbody>
                  { isLoadingProducts ? (
                     <tr>
                        <td className="center" colSpan="11">
                           { ' ' }
                           <Spinner
                              animation="grow"
                              className="spinner"
                              size="xl"
                              variant="dark"
                           />
                        </td>
                     </tr>
                  ) : productsList && productsList.length > 0 ? (
                     productsList.map((el, index) => {
                        return (
                           <tr key={ index }>
                              <td>{ index }</td>
                              <td>{ el.ref }</td>
                              <td>{ el.nameCategory }</td>
                              <td>{ el.description }</td>
                              { detailsInTable && <td>{ el.detail }</td> }
                              { activeInTable && (
                                 <td>{ el.isActive ? 'SI' : 'NO' }</td>
                              ) }
                              { prodNuevoInTable && (
                                 <td>{ el.newProduct ? 'SI' : 'NO' }</td>
                              ) }
                              { priceUYInTable && <td>{ el.precioUY }</td> }
                              { priceESInTable && <td>{ el.precioES }</td> }
                              { priceUSDInTable && <td>{ el.precioUSD }</td> }
                              { discountInTable && <td>{ el.discount }</td> }
                              { positionInTable && <td>{ el.position }</td> }
                              { photosInTable && (
                                 <td className="center">
                                    { el.photos.length > 0 && (
                                       <BsImages
                                          className="icon-admin"
                                          onClick={ () =>
                                             onShowFullSizeCarouselImages(
                                                el.photos,
                                             )
                                          }
                                       />
                                    ) }
                                 </td>
                              ) }
                              { editInTable && (
                                 <td className="center">
                                    <AiTwotoneEdit
                                       className="icon-admin"
                                       onClick={ () => onEditProduct(el) }
                                    />
                                 </td>
                              ) }
                              { deleteInTable && (
                                 <td className="center">
                                    <MdDeleteForever
                                       className="icon-admin"
                                       onClick={ () => onDeleteProduct(el.id) }
                                    />
                                 </td>
                              ) }
                           </tr>
                        )
                     })
                  ) : (
                     <tr>
                        <td className="center" colSpan="11">
                           <section> No hay datos.</section>
                        </td>
                     </tr>
                  ) }
               </tbody>
            </Table>
         </section>

         <EditProductOverlay
            isLoading={ isLoading }
            isOpenModal={ isOpenModalEditProduct }
            productToEdit={ selectedProduct }
            onCloseModal={ onCloseModalEditProduct }
            onSuccessEditProduct={ onSuccessEditProduct }
         />

         <NewProductOverlay
            isLoading={ isLoading }
            isOpenModal={ isOpenModal }
            onCloseModal={ onCloseModal }
            onSuccessNewProduct={ onSuccessNewProduct }
         />

         { showCarouselFullSizeImages && (
            <ShowCarouselFullSizeImages
               imgSrcArray={ arrayImages }
               setShowCarouselFullSizeImages={ setShowCarouselFullSizeImages }
               show={ showCarouselFullSizeImages }
            />
         ) }
         { showAlert && (
            <AlertDismissible
               callbackCloseError={ callbackCloseError }
               msg={ messageError }
               show={ showAlert }
               type={ typeError }
            />
         ) }
         { showAlertConfirm && (
            <AlertConfirm
               callbackCancel={ cancelDeleteProduct }
               callbackConfirm={ confirmDeleteProduct }
               msg={ '¿Seguro que deseas eliminar el Producto?' }
               show={ showAlertConfirm }
            />
         ) }
      </div>
   )
}

export default MainTableProducts
