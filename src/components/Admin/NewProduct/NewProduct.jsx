import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { FaPlus } from 'react-icons/fa'
import { ImImage } from 'react-icons/im'
import { Modal } from '../../../containers/index'
import { MdDeleteForever } from 'react-icons/md'
import { formatFileNameToShow } from '../../../utils/formatters'
import { useProduct, useImage, useCategory } from '../../../hooks/index'
import { AlertDismissible, AlertConfirm, FullSizeImage, UploadFile } from '../../index'
import { Button, FloatingLabel, Form, FormControl, InputGroup, ListGroup, } from 'react-bootstrap'

import './NewProduct.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpenModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onSuccessNewProduct: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: 'NewProductID',
  onSuccessNewProduct: undefined,
  isLoading: false,
  isOpenModal: false,
  onCloseModal: undefined,
};

const NewProduct = ({
  className,
  id,
  onSuccessNewProduct,
  isOpenModal,
  isLoading,
  onCloseModal, }) => {
  const classComponent = [NewProduct, className].join(' ').trim();
  const { newProductHook } = useProduct()
  const { deleteImageHook } = useImage()
  const { getCategorysHook } = useCategory()
  const [referenceId, setReferenceId] = useState('')
  const [categoryName, setCategoryName] = useState('')
  const [description, setDescription] = useState('')
  const [detail, setDetail] = useState('')
  const [colors, setColors] = useState([])
  const [colorDescription, setColorDescription] = useState('')
  const [sizes, setSizes] = useState([])
  const [sizeDescription, setSizeDescription] = useState('')
  const [sizesDescriptions, setSizesDescriptions] = useState([])
  const [sizesDescr1, setSizesDescr1] = useState('')
  const [sizesDescr2, setSizesDescr2] = useState('')
  const [photos, setPhotos] = useState([])
  const [deletedPhotos, setDeletedPhotos] = useState([])
  const [activeProduct, setActiveProduct] = useState(true)
  const [isNewProduct, setIsNewProduct] = useState(false)
  const [discountProduct, setDiscountProduct] = useState(0)
  const [position, setPosition] = useState(0)
  const [priceUY, setPriceUY] = useState(0)
  const [priceES, setPriceES] = useState(0)
  const [priceUSD, setPriceUSD] = useState(0)
  const [typeError, setTypeError] = useState('succes')
  const [showAlert, setShowAlert] = useState(false)
  const [messageError, setMessageError] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const [showUpload, setShowUpload] = useState(false)
  const [showFullSizeImage, setShowFullSizeImage] = useState(false)
  const [imgSrcFullSize, setImgSrcFullSize] = useState()
  const [showConfirm, setShowConfirm] = useState(false)
  const [srcImageToDelete, setSrcImageToDelete] = useState()

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

  const closeOverlay = () => {
    photos.length > 0 &&
      photos.forEach(async (elementos) => {
        await deleteImageHook(formatFileNameToShow(elementos))
          .then((element) => {
            console.log('eliminado ok ', element)
            return element
          })
          .catch((error) => {
            console.log('error al eliminar foto ', error)
          })
      })
    onCloseModal();
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      const ProductToRegister = {
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
      const productCreated = await newProductHook(ProductToRegister)
        .then((element) => {
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
          //console.log("el error ", error.message)
          setShowAlert(true)
          setMessageError(error.message)
          setTypeError('danger')
        })
      if (productCreated) {
        setShowAlert(true)
        setMessageError('Creado nuevo producto/item !')
        setTypeError('succes')
        onSuccessNewProduct()
        setPhotos([])
      }
    } catch (error) {
      console.log('error nueva categoria', error)
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
      className={ classComponent }
      header={ <span >NUEVO PRODUCTO</span> }
      id={ id }
      isLoading={ isLoading }
      isOpen={ isOpenModal }
      onClose={ onCloseModal }
      onHide={ onCloseModal }
    >
      <section className="NewProductSection">
        <Form className='NewProductForm' onSubmit={ handleSubmit }>
          <FloatingLabel
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
              id="floatingTextarea2"
              placeholder="Pon aqui el detalle de la prenda"
              style={ { height: '100px' } }
              value={ detail }
              onChange={ (e) => {
                setDetail(e.target.value)
              } }
            ></textarea>
            <label htmlFor="floatingTextarea2">Detalle</label>
          </div>

          <InputGroup className="mt-4">
            <FormControl
              aria-label="Lista de colores disponibles para la prenda."
              placeholder="Colores 1"
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
                <ListGroup.Item key={ index } className="NewProductItemGroup">
                  { el }
                  <MdDeleteForever
                    className="NewProductDeleteItem"
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
                <ListGroup.Item key={ index } className="NewProductItemGroup">
                  { el }
                  <MdDeleteForever
                    className="NewProductDeleteItem"
                    onClick={ () => onRemoveFromSizes(el) }
                  />
                </ListGroup.Item>
              )
            }) }
          </ListGroup>

          <InputGroup className="mt-4">
            <FormControl
              aria-label="Lista de talles disponibles para la prenda."
              placeholder="Desc"
              value={ sizesDescr1 }
              onChange={ (e) => {
                setSizesDescr1(e.target.value.toUpperCase())
              } }
            />
            <FormControl
              aria-label="Lista de talles disponibles para la prenda."
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
                <ListGroup.Item key={ index } className="NewProductItemGroup">
                  { `${el.data} :   ${el.description}` }
                  <MdDeleteForever
                    className="NewProductDeleteItem"
                    onClick={ () =>
                      onRemoveFromSizesDescriptions(el)
                    }
                  />
                </ListGroup.Item>
              )
            }) }
          </ListGroup>

          <InputGroup className="mt-4">

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
            { photos &&
              photos.length > 0 &&
              photos.map((el, index) => {
                return (
                  <ListGroup.Item
                    key={ index }
                    className="d-flex justify-content-between NewProductItemGroup"
                  >
                    <ImImage
                      className="NewProductDeleteItem"
                      onClick={ () => onShowImageFullSize(el) }
                    />
                    { formatFileNameToShow(el) }
                    <MdDeleteForever
                      className="NewProductDeleteItem"
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
            className="NewProductFormCheck"
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
            className="NewProductFormCheck"
            id="custom-switch-1"
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

          <section className="NewProductButtonsContainer">
            <Button
              variant="secondary"
              onClick={ () => closeOverlay() }
            >
              Cerrar
            </Button>

            <Button
              disabled={ !validateForm() }
              type="submit"
            >
              Crear producto
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
      <FullSizeImage
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
  );
};

NewProduct.propTypes = propTypes;
NewProduct.defaultProps = defaultProps;

export default NewProduct;