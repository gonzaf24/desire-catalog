import React, { useState, useEffect } from 'react'
import {
   Button,
   FloatingLabel,
   Form,
   FormControl,
   InputGroup,
   ListGroup,
} from 'react-bootstrap'
import '../../../styles/productOverlay.style.css'
import { MdDeleteForever } from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'
import { ImImage } from 'react-icons/im'
import useProduct from '../../../hooks/useProduct'
import useImage from '../../../hooks/useImage'
import useCategory from '../../../hooks/useCategory'
import AlertDismissible from '../../alertDismissible.component'
import UploadFile from '../../fileUpload/fileUpload'
import { formatFileNameToShow } from '../../../utils/formatters'
import ShowFullSizeImage from '../../showFullSizeImage'
import AlertConfirm from '../../alertConfirm.component'
import PropTypes from 'prop-types'
import Modal from '../../../containers/Modal/Modal'
import AnastassaLogo from '../../../images/logo-anastassa.jpg'
import { BiUpArrowAlt, BiDownArrowAlt } from 'react-icons/bi'


const propTypes = {
   isLoading: PropTypes.bool,
   isOpenModal: PropTypes.bool,
   productToEdit: PropTypes.shape({
      colors: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
      detail: PropTypes.string,
      discount: PropTypes.string,
      id: PropTypes.string,
      isActive: PropTypes.bool,
      name: PropTypes.string,
      nameCategory: PropTypes.string,
      newProduct: PropTypes.bool,
      photos: PropTypes.arrayOf(PropTypes.string),
      position: PropTypes.number,
      precioUSD: PropTypes.string,
      precioUY: PropTypes.string,
      price: PropTypes.number,
      priceES: PropTypes.number,
      ref: PropTypes.string,
      sizes: PropTypes.arrayOf(PropTypes.string),
      sizesDescriptions: PropTypes.arrayOf(PropTypes.string),
      stock: PropTypes.number,

   }),
   onCloseModal: PropTypes.func,
   onSuccessEditProduct: PropTypes.func,
}

const defaultProps = {
   productToEdit: {
      colors: [],
      description: '',
      detail: '',
      discount: '',
      id: '',
      isActive: false,
      name: '',
      nameCategory: '',
      newProduct: false,
      photos: [],
      position: 0,
      precioUSD: '',
      precioUY: '',
      price: 0,
      priceES: 0,
      ref: '',
      sizes: [],
      sizesDescriptions: [],
      stock: 0,
   },
   isLoading: false,
   isOpenModal: false,
   onCloseModal: undefined,
   onSuccessEditProduct: undefined,
}

export const EditProductOverlay = ({
   isOpenModal,
   isLoading,
   onCloseModal,
   onSuccessEditProduct,
   productToEdit,
}) => {

   const { editProductHook } = useProduct()
   const { deleteImageHook } = useImage()
   const { getCategorysHook } = useCategory()
   const [referenceId, setReferenceId] = useState(productToEdit.ref)
   const [categoryName, setCategoryName] = useState(productToEdit.nameCategory)
   const [description, setDescription] = useState(productToEdit.description)
   const [detail, setDetail] = useState(productToEdit.detail)
   const [colors, setColors] = useState(productToEdit.colors)
   const [colorDescription, setColorDescription] = useState('')
   const [sizes, setSizes] = useState(productToEdit.sizes)
   const [sizeDescription, setSizeDescription] = useState('')
   const [sizesDescriptions, setSizesDescriptions] = useState(productToEdit.sizesDescriptions)
   const [sizesDescr1, setSizesDescr1] = useState('')
   const [sizesDescr2, setSizesDescr2] = useState('')
   const [photos, setPhotos] = useState(productToEdit.photos)
   const [deletedPhotos, setDeletedPhotos] = useState([])
   const [activeProduct, setActiveProduct] = useState(productToEdit.isActive)
   const [isNewProduct, setIsNewProduct] = useState(productToEdit.newProduct)
   const [discountProduct, setDiscountProduct] = useState(productToEdit.discount)
   const [position, setPosition] = useState(productToEdit.position)
   const [priceUY, setPriceUY] = useState(productToEdit.precioUY)
   const [priceES, setPriceES] = useState(productToEdit.priceES)
   const [priceUSD, setPriceUSD] = useState(productToEdit.precioUSD)
   const [typeError, setTypeError] = useState('succes')
   const [showAlert, setShowAlert] = useState(false)
   const [messageError, setMessageError] = useState('')
   const [categoryList, setCategoryList] = useState([])
   const [showUpload, setShowUpload] = useState(false)
   const [showFullSizeImage, setShowFullSizeImage] = useState(false)
   const [imgSrcFullSize, setImgSrcFullSize] = useState()
   const [showConfirm, setShowConfirm] = useState(false)
   const [srcImageToDelete, setSrcImageToDelete] = useState()

   useEffect(() => {
      if (productToEdit) {
         setReferenceId(productToEdit.ref)
         setCategoryName(productToEdit.nameCategory)
         setDescription(productToEdit.description)
         setDetail(productToEdit.detail)
         setColors(productToEdit.colors)
         setSizes(productToEdit.sizes)
         setSizesDescriptions(productToEdit.sizesDescriptions)
         setPhotos(productToEdit.photos)
         setActiveProduct(productToEdit.isActive)
         setIsNewProduct(productToEdit.newProduct)
         setDiscountProduct(productToEdit.discount)
         setPosition(productToEdit.position)
         setPriceUY(productToEdit.precioUY)
         setPriceES(productToEdit.priceES)
         setPriceUSD(productToEdit.precioUSD)
      }
   }, [productToEdit]);

   function validateForm() {
      let isValid = true
      if (
         categoryName === null ||
         categoryName === 'Selecciona una categoria' ||
         categoryName === ''
      ) {
         isValid = false
      }
      if (referenceId === null || referenceId === '') {
         isValid = false
      }
      if (position === null || position === '' || position < 0) {
         isValid = false
      }
      return isValid
   }

   const callbackCloseError = (param) => {
      setShowAlert(param)
      onCloseModal()
   }

   const onAddToColors = (element) => {
      let colorsCopy = [...colors]
      colorsCopy.push(element)
      setColors(colorsCopy)
      setColorDescription('')
   }

   const onAddToSizes = (element) => {
      let sizesCopy = [...sizes]
      sizesCopy.push(element)
      setSizes(sizesCopy)
      setSizeDescription('')
   }

   const onAddToSizesDescriptions = (element1, element2) => {
      let objAux = { data: element1, description: element2 }
      let sizesDescriptionsCopy = [...sizesDescriptions]
      sizesDescriptionsCopy.push(objAux)
      setSizesDescriptions(sizesDescriptionsCopy)
      setSizesDescr1('')
      setSizesDescr2('')
   }

   const onRemoveFromColors = (element) => {
      const colorsOut = colors.filter((el) => el !== element)
      setColors(colorsOut)
   }

   const onRemoveFromSizes = (element) => {
      const sizesOut = sizes.filter((el) => el !== element)
      setSizes(sizesOut)
   }

   const onRemoveFromSizesDescriptions = (element) => {
      const sizesDescriptionsOut = sizesDescriptions.filter(
         (el) => el !== element,
      )
      setSizesDescriptions(sizesDescriptionsOut)
   }

   const onShowImageFullSize = (srcImg) => {
      setImgSrcFullSize(srcImg)
      setShowFullSizeImage(true)
   }

   const callbackShowUploadFile = (param) => {
      setShowUpload(param)
   }

   const onSuccesUpload = async (imgUploaded) => {
      const arrayAuxPhotos = [...photos]
      arrayAuxPhotos.push(imgUploaded)
      setPhotos(arrayAuxPhotos)
   }

   /*   const onSuccesDeleted = async (src) => {
      let arrayAuxPhotos = photos.filter((el) => el !== src)
      setPhotos(arrayAuxPhotos);
    }
  
    const onDeleteImage = async (src) => {
      await deleteImageHook(formatFileNameToShow(src))
        .then((element) => {
          let arrayAuxPhotos = photos.filter((el) => el !== src)
          setPhotos(arrayAuxPhotos);
          return element;
        })
        .catch((error) => {
          setShowAlert(true);
          setMessageError(error.message)
          setTypeError("danger")
        })
    }
   */

   const onDeletePhoto = (imgSrc) => {
      setShowConfirm(true)
      setSrcImageToDelete(imgSrc)
   }

   const callbackCancelDelete = () => {
      setShowConfirm(false)
   }

   const callbackConfirmDelete = async () => {
      setShowConfirm(false)
      let deletePhotosArrayAux = [...deletedPhotos]
      deletePhotosArrayAux.push(srcImageToDelete)
      setDeletedPhotos(deletePhotosArrayAux)
      let arrayAuxPhotos = photos.filter((el) => el !== srcImageToDelete)
      setPhotos(arrayAuxPhotos)
   }

   async function handleSubmit(event) {
      try {
         event.preventDefault()
         const ProductToUpdate = {
            id: productToEdit.id,
            ref: referenceId,
            nameCategory: categoryName,
            description: description,
            detail: detail,
            colors: colors,
            sizes: sizes,
            photos: photos,
            sizesDescriptions: sizesDescriptions,
            isActive: activeProduct,
            newProduct: isNewProduct,
            discount: discountProduct,
            position: position,
            precioUY: priceUY,
            precioES: priceES,
            precioUSD: priceUSD,
         }

         const productCreated = await editProductHook(ProductToUpdate)
            .then(async (element) => {
               deletedPhotos.length > 0 &&
                  deletedPhotos.forEach(async (elementos) => {
                     await deleteImageHook(formatFileNameToShow(elementos))
                        .then((element) => {
                           console.log('eliminado ok ', element)
                           return element
                        })
                        .catch((error) => {
                           console.log('error al eliminar foto ', error)
                        })
                  })
               return element
            })
            .catch((error) => {
               console.log('el error ', error.message)
               setShowAlert(true)
               setMessageError(error.message)
               setTypeError('danger')
            })
         if (productCreated) {
            onSuccessEditProduct()
            onCloseModal()
         }
      } catch (error) {
         console.log('error nueva categoria', error)
      }
   }

   const swapDownPhotos = (array, a) => {
      const arrayAux = [...array];
      const b = (a + 1);
      [arrayAux[a], arrayAux[b]] = [arrayAux[b], arrayAux[a]]
      setPhotos(arrayAux)
   }

   const swapUpPhotos = (array, a) => {
      const arrayAux = [...array];
      let b = (a - 1);
      [arrayAux[b], arrayAux[a]] = [arrayAux[a], arrayAux[b]]
      setPhotos(arrayAux)
   }

   const handleSwap = (array, a) => {

      if (a === array.length - 1) {
         swapUpPhotos(array, a)
      }
      else {
         swapDownPhotos(array, a)
      }
   }

   useEffect(() => {
      const exect = async () => {
         const categorysOut = await getCategorysHook()
         setCategoryList(categorysOut)
      }
      exect()
   }, [])


   return (
      <Modal
         className="modal-admin"
         header={
            <>
               <img alt="www.anastassa.com" className="main-logo-modal" src={ AnastassaLogo } />
               <span className="title-new-category">EDITAR PRODUCTO</span>
            </>
         }
         id="modal-new-product"
         isLoading={ isLoading }
         isOpen={ isOpenModal }
         onClose={ onCloseModal }
         onHide={ onCloseModal }
      >
         <section className="product-overlay-section">
            <Form className='form-new-product' onSubmit={ handleSubmit }>
               <FloatingLabel
                  className="mt-4"
                  controlId="floatingSelect"
                  label="Categoria"
               >
                  <Form.Select
                     aria-label="Floating label select example"
                     value={ categoryName }
                     onChange={ (e) => {
                        setCategoryName(e.target.value)
                     } }
                  >
                     <option>Selecciona una categoria</option>
                     { categoryList.map((el, index) => {
                        return (
                           <option key={ index } value={ el.idName }>
                              { el.idName }
                           </option>
                        )
                     }) }
                  </Form.Select>
               </FloatingLabel>

               <FloatingLabel
                  className="mt-4 mb-3"
                  controlId="floatingInput"
                  label="Referencia #"
               >
                  <Form.Control
                     placeholder="Pon aqui un numero de referencia # de la prenda"
                     type="text"
                     value={ referenceId.toUpperCase() }
                     onChange={ (e) => {
                        setReferenceId(e.target.value.toUpperCase())
                     } }
                  />
               </FloatingLabel>

               <FloatingLabel
                  className="mt-4 mb-3"
                  controlId="floatingInput"
                  label="Descripcion"
               >
                  <Form.Control
                     placeholder="Pon aqui una descripcion de la prenda"
                     type="text"
                     value={ description }
                     onChange={ (e) => {
                        setDescription(e.target.value)
                     } }
                  />
               </FloatingLabel>

               <div className="form-floating mt-4 mb-3">
                  <textarea
                     className="form-control"
                     id="floatingTextarea3"
                     placeholder="Pon aqui el detalle de la prenda"
                     style={ { height: '100px' } }
                     value={ detail }
                     onChange={ (e) => {
                        setDetail(e.target.value)
                     } }
                  ></textarea>
                  <label htmlFor="floatingTextarea3">Detalle</label>
               </div>

               <InputGroup className="mt-4">
                  <FormControl
                     aria-label="Lista de colores disponibles para la prenda."
                     placeholder="Colores"
                     value={ colorDescription }
                     onChange={ (e) => {
                        setColorDescription(e.target.value.toUpperCase())
                     } }
                  />
                  <Button
                     disabled={ !colorDescription }
                     variant="outline-primary"
                     onClick={ () => onAddToColors(colorDescription) }
                  >
                     <FaPlus />
                  </Button>
               </InputGroup>

               <ListGroup horizontal>
                  { colors.map((el, index) => {
                     return (
                        <ListGroup.Item key={ index } className="item-group">
                           { el }
                           <MdDeleteForever
                              className="delete-item-group"
                              onClick={ () => onRemoveFromColors(el) }
                           />
                        </ListGroup.Item>
                     )
                  }) }
               </ListGroup>

               <InputGroup className="mt-4">
                  <FormControl
                     aria-label="Lista de talles disponibles para la prenda."
                     placeholder="Talles"
                     value={ sizeDescription }
                     onChange={ (e) => {
                        setSizeDescription(e.target.value.toUpperCase())
                     } }
                  />
                  <Button
                     disabled={ !sizeDescription }
                     variant="outline-primary"
                     onClick={ () => onAddToSizes(sizeDescription) }
                  >
                     <FaPlus />
                  </Button>
               </InputGroup>

               <ListGroup horizontal>
                  { sizes.map((el, index) => {
                     return (
                        <ListGroup.Item key={ index } className="item-group">
                           { el }
                           <MdDeleteForever
                              className="delete-item-group"
                              onClick={ () => onRemoveFromSizes(el) }
                           />
                        </ListGroup.Item>
                     )
                  }) }
               </ListGroup>

               <InputGroup className="mt-4">
                  <FormControl
                     aria-label=""
                     placeholder="Descripcion"
                     value={ sizesDescr1 }
                     onChange={ (e) => {
                        setSizesDescr1(e.target.value.toUpperCase())
                     } }
                  />
                  <FormControl
                     aria-label=""
                     placeholder="Valor"
                     value={ sizesDescr2 }
                     onChange={ (e) => {
                        setSizesDescr2(e.target.value)
                     } }
                  />
                  <Button
                     disabled={ !sizesDescr1 || !sizesDescr2 }
                     variant="outline-primary"
                     onClick={ () =>
                        onAddToSizesDescriptions(sizesDescr1, sizesDescr2)
                     }
                  >
                     <FaPlus />
                  </Button>
               </InputGroup>

               <ListGroup>
                  { sizesDescriptions.map((el, index) => {
                     return (
                        <ListGroup.Item key={ index } className="item-group">
                           { `${el.data} :   ${el.description}` }
                           <MdDeleteForever
                              className="delete-item-group"
                              onClick={ () =>
                                 onRemoveFromSizesDescriptions(el)
                              }
                           />
                        </ListGroup.Item>
                     )
                  }) }
               </ListGroup>

               <InputGroup className="mt-4">
                  <FormControl
                     aria-label="Lista de fotos de la prenda."
                     disabled
                     placeholder="Fotos"
                  />
                  <UploadFile
                     categoryName={ categoryName }
                     disabled={
                        categoryName === '' ||
                           categoryName === 'Selecciona una categoria'
                           ? true
                           : false
                     }
                     onSuccesUpload={ onSuccesUpload }
                  />
               </InputGroup>
               <ListGroup>
                  { photos.map((el, index) => {
                     return (

                        <ListGroup.Item
                           key={ index }
                           className="d-flex justify-content-between item-group"
                        >
                           { photos.length > 1 &&
                              <>
                              <div title='Mover foto arriba/abajo' onClick={ () => handleSwap(photos, index) }>
                                 { index === photos.length - 1 ? <BiUpArrowAlt className='cursor' /> : <BiDownArrowAlt className='cursor' /> }
                              </div>
                              { index }
                              </>
                           }

                           <ImImage
                              className="delete-item-group"
                              onClick={ () => onShowImageFullSize(el) }
                           />
                           { formatFileNameToShow(el) }
                           <MdDeleteForever
                              className="delete-item-group"
                              title='Eliminar foto'
                              onClick={ () => onDeletePhoto(el) } 
                           />
                        </ListGroup.Item>
                     )
                  }) }
               </ListGroup>

               <FloatingLabel
                  className="mt-4"
                  controlId="floatingInput"
                  label="Precio UY $U"
               >
                  <Form.Control
                     placeholder="Precio en pesos uruguayos"
                     type="number"
                     value={ priceUY }
                     onChange={ (e) => {
                        setPriceUY(e.target.value)
                     } }
                  />
               </FloatingLabel>

               <FloatingLabel
                  className="mt-4"
                  controlId="floatingInput"
                  label="Precio ES €"
               >
                  <Form.Control
                     placeholder="Precio en euros"
                     type="number"
                     value={ priceES }
                     onChange={ (e) => {
                        setPriceES(e.target.value)
                     } }
                  />
               </FloatingLabel>

               <FloatingLabel
                  className="mt-4"
                  controlId="floatingInput"
                  label="Precio USD $"
               >
                  <Form.Control
                     placeholder="Precio en dolares"
                     type="number"
                     value={ priceUSD }
                     onChange={ (e) => {
                        setPriceUSD(e.target.value)
                     } }
                  />
               </FloatingLabel>

               <Form.Check
                  checked={ activeProduct }
                  className="form-check-st"
                  id="custom-switch"
                  label="Activo"
                  type="switch"
                  value={ activeProduct }
                  onChange={ (e) => {
                     setActiveProduct(e.target.checked)
                  } }
               />

               <Form.Check
                  checked={ isNewProduct }
                  className="form-check-st"
                  id="custom-switch"
                  label="Es nuevo"
                  type="switch"
                  value={ isNewProduct }
                  onChange={ (e) => {
                     setIsNewProduct(e.target.checked)
                  } }
               />

               <FloatingLabel
                  className="mt-4"
                  controlId="floatingInput"
                  label="Descuento"
               >
                  <Form.Control
                     placeholder="Descuento a mostrar"
                     type="text"
                     value={ discountProduct }
                     onChange={ (e) => {
                        setDiscountProduct(e.target.value)
                     } }
                  />
               </FloatingLabel>

               <FloatingLabel
                  className="mt-4"
                  controlId="floatingInput"
                  label="Posicion"
               >
                  <Form.Control
                     placeholder="Posicion del producto dentro de su categoria en el catalogo"
                     type="number"
                     value={ position }
                     onChange={ (e) => {
                        setPosition(e.target.value)
                     } }
                  />
               </FloatingLabel>

               <section className="mt-4 buttons-container">
                  <Button
                     className="submitbutton"
                     variant="secondary"
                     onClick={ () => onCloseModal() }
                  >
                     Cerrar
                  </Button>

                  <Button
                     className="submitbutton"
                     disabled={ !validateForm() }
                     type="submit"
                  >
                     Guardar cambios
                  </Button>
               </section>
            </Form>
         </section>

         { showUpload && (
            <UploadFile
               callbackShowUploadFile={ callbackShowUploadFile }
               categoryName={ categoryName }
               show={ showUpload }
               onSuccesUpload={ onSuccesUpload }
            />
         ) }
         <AlertDismissible
            callbackCloseError={ callbackCloseError }
            msg={ messageError }
            show={ showAlert }
            type={ typeError }
         />
         <ShowFullSizeImage
            imgSrc={ imgSrcFullSize }
            setShowFullSizeImage={ setShowFullSizeImage }
            show={ showFullSizeImage }
         />
         <AlertConfirm
            callbackCancel={ callbackCancelDelete }
            callbackConfirm={ callbackConfirmDelete }
            msg={ 'Seguro quieres eliminar la imagen?' }
            show={ showConfirm }
            type={ 'succes' }
         />
      </Modal>
   )
}

EditProductOverlay.propTypes = propTypes
EditProductOverlay.defaultProps = defaultProps

export default EditProductOverlay
