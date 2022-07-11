import React, { useState, useEffect } from 'react';
import { Button, FloatingLabel, Form, FormControl, InputGroup, ListGroup } from 'react-bootstrap';
import "../../../styles/productOverlay.style.css"
import { BiX } from 'react-icons/bi';
import { MdDeleteForever } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { ImImage } from "react-icons/im";
import useProduct from '../../../hooks/useProduct';
import useImage from '../../../hooks/useImage';
import useCategory from '../../../hooks/useCategory';
import AlertDismissible from '../../alertDismissible.component';
import { UploadFile } from '../../fileUpload/fileUpload';
import { formatFileNameToShow } from '../../../utils/formatters';
import ShowFullSizeImage from '../../showFullSizeImage';
import AlertConfirm from '../../alertConfirm.component';

export const EditProductOverlay = ({ show, callbackShowEditProduct, onSuccessEditProduct, productToEdit }) => {

  const { editProductHook } = useProduct()
  const { deleteImageHook } = useImage()
  const { getCategorysHook } = useCategory()
  const [referenceId, setReferenceId] = useState(productToEdit.ref);
  const [categoryName, setCategoryName] = useState(productToEdit.nameCategory);
  const [description, setDescription] = useState(productToEdit.description);
  const [detail, setDetail] = useState(productToEdit.detail);
  const [colors, setColors] = useState(productToEdit.colors);
  const [colorDescription, setColorDescription] = useState('');
  const [sizes, setSizes] = useState(productToEdit.sizes);
  const [sizeDescription, setSizeDescription] = useState('');
  const [sizesDescriptions, setSizesDescriptions] = useState(productToEdit.sizesDescriptions);
  const [sizesDescr1, setSizesDescr1] = useState('');
  const [sizesDescr2, setSizesDescr2] = useState('');
  const [photos, setPhotos] = useState(productToEdit.photos);
  const [deletedPhotos, setDeletedPhotos] = useState([]);
  const [activeProduct, setActiveProduct] = useState(productToEdit.isActive);
  const [isNewProduct, setIsNewProduct] = useState(productToEdit.newProduct);
  const [discountProduct, setDiscountProduct] = useState(productToEdit.discount);
  const [position, setPosition] = useState(productToEdit.position);
  const [priceUY, setPriceUY] = useState(productToEdit.precioUY);
  const [priceES, setPriceES] = useState(productToEdit.priceES);
  const [priceUSD, setPriceUSD] = useState(productToEdit.precioUSD);
  const [typeError, setTypeError] = useState("succes");
  const [showAlert, setShowAlert] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [showUpload, setShowUpload] = useState(false);
  const [showFullSizeImage, setShowFullSizeImage] = useState(false);
  const [imgSrcFullSize, setImgSrcFullSize] = useState();
  const [showConfirm, setShowConfirm] = useState(false);
  const [srcImageToDelete, setSrcImageToDelete] = useState();


  function validateForm() {
    let isValid = true;
    if (categoryName === null || categoryName === 'Selecciona una categoria' || categoryName === '') {
      isValid = false;
    }
    if (referenceId === null || referenceId === '') {
      isValid = false;
    }
    if (position === null || position === '' || position < 0) {
      isValid = false;
    }
    return isValid;
  }

  const callbackCloseError = (param) => {
    setShowAlert(param);
    callbackShowEditProduct(false)
  }

  const onAddToColors = (element) => {
    let colorsCopy = [...colors];
    colorsCopy.push(element)
    setColors(colorsCopy);
    setColorDescription("");
  }

  const onAddToSizes = (element) => {
    let sizesCopy = [...sizes];
    sizesCopy.push(element)
    setSizes(sizesCopy);
    setSizeDescription("");
  }

  const onAddToSizesDescriptions = (element1, element2) => {
    let objAux = { "data": element1, "description": element2 }
    let sizesDescriptionsCopy = [...sizesDescriptions];
    sizesDescriptionsCopy.push(objAux)
    setSizesDescriptions(sizesDescriptionsCopy);
    setSizesDescr1("");
    setSizesDescr2("")
  }

  const onRemoveFromColors = (element) => {
    const colorsOut = colors.filter(el => el !== element);
    setColors(colorsOut);
  }

  const onRemoveFromSizes = (element) => {
    const sizesOut = sizes.filter(el => el !== element);
    setSizes(sizesOut);
  }

  const onRemoveFromSizesDescriptions = (element) => {
    const sizesDescriptionsOut = sizesDescriptions.filter(el => el !== element);
    setSizesDescriptions(sizesDescriptionsOut);
  }

  const onShowImageFullSize = (srcImg) => {
    setImgSrcFullSize(srcImg)
    setShowFullSizeImage(true)
  }

  const callbackShowUploadFile = (param) => {
    setShowUpload(param)
  }

  const onSuccesUpload = async (imgUploaded) => {
    const arrayAuxPhotos = [...photos];
    arrayAuxPhotos.push(imgUploaded);
    setPhotos(arrayAuxPhotos);
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
    setShowConfirm(true);
    setSrcImageToDelete(imgSrc);
  }

  const callbackCancelDelete = (param) => {
    setShowConfirm(false);
  }

  const callbackConfirmDelete = async (param) => {
    setShowConfirm(false);
    let deletePhotosArrayAux = [...deletedPhotos];
    deletePhotosArrayAux.push(srcImageToDelete);
    setDeletedPhotos(deletePhotosArrayAux);
    let arrayAuxPhotos = photos.filter((el) => el !== srcImageToDelete)
    setPhotos(arrayAuxPhotos);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const ProductToUpdate = {
        "id": productToEdit.id,
        "ref": referenceId,
        "nameCategory": categoryName,
        "description": description,
        "detail": detail,
        "colors": colors,
        "sizes": sizes,
        "photos": photos,
        "sizesDescriptions": sizesDescriptions,
        "isActive": activeProduct,
        "newProduct": isNewProduct,
        "discount": discountProduct,
        "position": position,
        "precioUY": priceUY,
        "precioES": priceES,
        "precioUSD": priceUSD,
      }

      const productCreated = await editProductHook(ProductToUpdate)
        .then(async (element) => {
          deletedPhotos.length > 0 && deletedPhotos.forEach(async (elementos) => {
            await deleteImageHook(formatFileNameToShow(elementos))
              .then((element) => {
                console.log("eliminado ok ", element)
                return element;
              })
              .catch((error) => {
                console.log("error al eliminar foto ", error)
              })
          });
          return element;
        })
        .catch((error) => {
          console.log("el error ", error.message)
          setShowAlert(true);
          setMessageError(error.message)
          setTypeError("danger")
        })
      if (productCreated) {
        setShowAlert(true);
        setMessageError(`Producto editado!`)
        setTypeError("succes")
        onSuccessEditProduct();
      }
    } catch (error) {
      console.log("error nueva categoria", error)
    }
  }


  useEffect(() => {
    const exect = async () => {
      const categorysOut = await getCategorysHook();
      setCategoryList(categorysOut);
    }
    exect();
  }, [getCategorysHook, show])

  return show && <div className="product-overlay-container">
    <section className="product-overlay-section">
      <span className='title-new-product'>EDITAR PRODUCTO</span>
      <BiX className="close-overlay-product" onClick={() => callbackShowEditProduct(false)} size={50} />
      <Form onSubmit={handleSubmit} className='mt-5'>

        <FloatingLabel controlId="floatingSelect" label="Categoria" className='mt-4'>
          <Form.Select aria-label="Floating label select example"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          >
            <option>Selecciona una categoria</option>
            {categoryList.map((el, index) => {
              return <option key={index} value={el.idName}>{el.idName}</option>
            })}
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Referencia #"
          className="mt-4 mb-3"
        >
          <Form.Control type="text" placeholder="Pon aqui un numero de referencia # de la prenda"
            value={referenceId.toUpperCase()}
            onChange={(e) => {
              setReferenceId(e.target.value.toUpperCase());
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          controlId="floatingInput"
          label="Descripcion"
          className="mt-4 mb-3"
        >
          <Form.Control type="text" placeholder="Pon aqui una descripcion de la prenda"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </FloatingLabel>

        <div className="form-floating mt-4 mb-3">
          <textarea className="form-control"
            placeholder="Pon aqui el detalle de la prenda"
            id="floatingTextarea3"
            style={{ height: "100px" }}
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}></textarea>
          <label htmlFor="floatingTextarea3">Detalles</label>
        </div>

        <InputGroup className='mt-4'>
          <FormControl
            placeholder="Colores"
            aria-label="Lista de colores disponibles para la prenda."
            value={colorDescription}
            onChange={(e) => {
              setColorDescription(e.target.value);
            }}
          />
          <Button variant="outline-primary" onClick={() => onAddToColors(colorDescription)}>
            <FaPlus />
          </Button>
        </InputGroup>

        <ListGroup horizontal>
          {colors.map((el, index) => {
            return <ListGroup.Item key={index} className='item-group'>
              {el}
              <MdDeleteForever className='delete-item-group' onClick={() => onRemoveFromColors(el)} />
            </ListGroup.Item>
          })}
        </ListGroup>

        <InputGroup className='mt-4'>
          <FormControl
            placeholder="Talles"
            aria-label="Lista de talles disponibles para la prenda."
            value={sizeDescription}
            onChange={(e) => {
              setSizeDescription(e.target.value);
            }}
          />
          <Button variant="outline-primary" onClick={() => onAddToSizes(sizeDescription)}>
            <FaPlus />
          </Button>
        </InputGroup>

        <ListGroup horizontal>
          {sizes.map((el, index) => {
            return <ListGroup.Item key={index} className='item-group'>
              {el}
              <MdDeleteForever className='delete-item-group' onClick={() => onRemoveFromSizes(el)} />
            </ListGroup.Item>
          })}
        </ListGroup>

        <InputGroup className='mt-4'>
          <FormControl
            placeholder="Desc. talle"
            aria-label="Lista de talles disponibles para la prenda."
            value={sizesDescr1}
            onChange={(e) => {
              setSizesDescr1(e.target.value);
            }}
          />
          <FormControl
            placeholder="Valor desc."
            aria-label="Lista de talles disponibles para la prenda."
            value={sizesDescr2}
            onChange={(e) => {
              setSizesDescr2(e.target.value);
            }}
          />
          <Button variant="outline-primary" onClick={() => onAddToSizesDescriptions(sizesDescr1, sizesDescr2)}>
            <FaPlus />
          </Button>
        </InputGroup>

        <ListGroup >
          {sizesDescriptions.map((el, index) => {
            return <ListGroup.Item key={index} className='item-group'>{el.data}:{el.description}
              <MdDeleteForever className='delete-item-group' onClick={() => onRemoveFromSizesDescriptions(el)} />
            </ListGroup.Item>
          })}
        </ListGroup>

        <InputGroup className='mt-4'>
          <FormControl
            placeholder="Fotos"
            aria-label="Lista de fotos de la prenda."
            disabled
          />
          <UploadFile disabled={categoryName === '' || categoryName === 'Selecciona una categoria' ? true : false} categoryName={categoryName} onSuccesUpload={onSuccesUpload} />
        </InputGroup>
        <ListGroup >
          {photos.map((el, index) => {
            return <ListGroup.Item key={index} className='d-flex justify-content-between item-group'>
              <ImImage className='delete-item-group' onClick={() => onShowImageFullSize(el)} />
              {formatFileNameToShow(el)}
              <MdDeleteForever className='delete-item-group' onClick={() => onDeletePhoto(el)} />
            </ListGroup.Item>
          })}
        </ListGroup>

        <FloatingLabel
          className='mt-4'
          controlId="floatingInput"
          label="Precio UY $U"
        >
          <Form.Control type="number" placeholder="Precio en pesos uruguayos"
            value={priceUY}
            onChange={(e) => {
              setPriceUY(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          className='mt-4'
          controlId="floatingInput"
          label="Precio ES €"
        >
          <Form.Control type="number" placeholder="Precio en euros"
            value={priceES}
            onChange={(e) => {
              setPriceES(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          className='mt-4'
          controlId="floatingInput"
          label="Precio USD $"
        >
          <Form.Control type="number" placeholder="Precio en dolares"
            value={priceUSD}
            onChange={(e) => {
              setPriceUSD(e.target.value);
            }}
          />
        </FloatingLabel>

        <Form.Check
          className='form-check-st'
          type="switch"
          id="custom-switch"
          label="Activo"
          value={activeProduct}
          checked={activeProduct}
          onChange={(e) => {
            setActiveProduct(e.target.checked);
          }}
        />

        <Form.Check
          className='form-check-st'
          type="switch"
          id="custom-switch"
          label="Es nuevo"
          value={isNewProduct}
          checked={isNewProduct}
          onChange={(e) => {
            setIsNewProduct(e.target.checked);
          }}
        />

        <FloatingLabel
          className='mt-4'
          controlId="floatingInput"
          label="Descuento"
        >
          <Form.Control type="text" placeholder="Descuento a mostrar"
            value={discountProduct}
            onChange={(e) => {
              setDiscountProduct(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel
          className='mt-4'
          controlId="floatingInput"
          label="Posicion"
        >
          <Form.Control type="number" placeholder="Posicion del producto dentro de su categoria en el catalogo"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
        </FloatingLabel>

        <section className='mt-4 buttons-container'>
          <Button
            variant='secondary'
            className="submitbutton"
            onClick={() => callbackShowEditProduct(false)}
          >
            Cerrar
          </Button>

          <Button
            className="submitbutton"
            type="submit"
            disabled={!validateForm()}
          >
            Guardar cambios
          </Button>
        </section>

      </Form>
    </section>

    {showUpload && <UploadFile show={showUpload} callbackShowUploadFile={callbackShowUploadFile} categoryName={categoryName} onSuccesUpload={onSuccesUpload} />}
    <AlertDismissible show={showAlert} msg={messageError} callbackCloseError={callbackCloseError} type={typeError} />
    <ShowFullSizeImage show={showFullSizeImage} imgSrc={imgSrcFullSize} setShowFullSizeImage={setShowFullSizeImage} />
    <AlertConfirm show={showConfirm} msg={"Seguro quieres eliminar la imagen?"} callbackCancel={callbackCancelDelete} callbackConfirm={callbackConfirmDelete} type={"succes"} />
  </div>
}

export default EditProductOverlay;