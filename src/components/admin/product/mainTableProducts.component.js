
import React, { useState, useEffect } from 'react';
import "../../../styles/admin.style.css"
import { Button, Form, InputGroup, Spinner, Table } from 'react-bootstrap';
import { BsImages } from "react-icons/bs";
import { MdDeleteForever } from "react-icons/md";
import { AiTwotoneEdit } from "react-icons/ai";
import { TbSortAscending } from "react-icons/tb";
import { TiPlus } from "react-icons/ti";
import { HiRefresh } from "react-icons/hi";
import useProduct from '../../../hooks/useProduct';
import EditProductOverlay from '../../../components/admin/product/editProductOverlay.component'
import ProductOverlay from './newProductOverlay.component';
import AlertDismissible from '../../alertDismissible.component';
import ShowCarouselFullSizeImages from '../../showCarouselFullSizeImages';

export const MainTableProducts = () => {

  const { getProductsHook, deleteProductHook } = useProduct()
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [selectedSearch, setSelectedSearch] = useState('');
  const [textSearchProduct, setTextSearchProduct] = useState('');
  const [selectedProduct, setSelectedProduct] = useState();
  const [showCarouselFullSizeImages, setShowCarouselFullSizeImages] = useState(false);
  const [arrayImages, setArrayImages] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [showNewProductOverlay, setShowNewProductOverlay] = useState(false);
  const [showEditProductOverlay, setShowEditProductOverlay] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [messageError, setMessageError] = useState();
  const [typeError, setTypeError] = useState("succes");

  const onDeleteProduct = async (idProduct) => {
    try {
      const isDeleted = await deleteProductHook(idProduct)
      if (isDeleted) {
        setShowAlert(true);
        setMessageError("Producto/item eliminado.")
        setTypeError('succes')
      }
    } catch (error) {
      console.log("error ", error)
    }
  }

  const onSuccessEditProduct = async () => {
    const productsOut = await getProductsHook();
    setProductsList(productsOut)
  }

  const refreshTable = async () => {
    const productsOut = await getProductsHook();
    setProductsList(productsOut)
    setTextSearchProduct('');
    console.log("!mmmm")
    console.log(" TextSearchProduct : ", textSearchProduct)
  }

  const onSuccessNewProduct = async () => {
    const productsOut = await getProductsHook();
    setProductsList(productsOut)
  }

  const onEditProduct = async (element) => {
    setSelectedProduct(element)
    setShowEditProductOverlay(true)
  }

  const onShowFullSizeCarouselImages = (arrayImages) => {
    setArrayImages(arrayImages)
    setShowCarouselFullSizeImages(true)
  }

  const orderSortProductList = async (type) => {
    setIsLoadingProducts(true);
    setProductsList(sortList(productsList, type))
    setTimeout(() => {
      setIsLoadingProducts(false)
    }, 500);
  }

  async function searchText() {
    setIsLoadingProducts(true);
    let outList = productsList.filter((element) => {
      const fieltToSearch = element[selectedSearch]
      return fieltToSearch.toLowerCase().includes(textSearchProduct);
    })
    setProductsList(outList)
    setTimeout(() => {
      setIsLoadingProducts(false)
    }, 500);
  }

  const callbackCloseError = (param) => {
    setShowAlert(param);
  }

  const sortList = (list, field) => {
    const outListAux = list.sort((a, b) => {
      if (a[field] < b[field]) {
        return -1;
      }
      if (a[field] > b[field]) {
        return 1;
      }
      return 0;
    })
    return outListAux;
  }

  useEffect(() => {
    const exect = async () => {
      const productsOut = await getProductsHook();
      setProductsList(productsOut)
    }
    exect();
  }, [showAlert, showNewProductOverlay, showEditProductOverlay, getProductsHook])

  return <div className="">
    <div className='bar-wrapper'>
      <Button className='flex-gap-button-icon mr-10p' onClick={() => setShowNewProductOverlay(true)}> <TiPlus /> PRODUCTO</Button>
      <InputGroup>
        <Form.Select aria-label="Default select example" className='select-search'
          value={selectedSearch}
          onChange={(e) => {
            setSelectedSearch(e.target.value);
          }}
        >
          <option>BUSCAR POR</option>
          <option value="ref">REF.</option>
          <option value="nameCategory">NOMBRE CAT.</option>
          <option value="description">DESC. PRODUCTO</option>
        </Form.Select>
        <Form.Control
          value={textSearchProduct}
          placeholder="Texto a buscar"
          aria-label="Aqui el texto a buscar en los productos."
          onChange={(e) => setTextSearchProduct(e.target.value.trim().toLowerCase())}
        />
        <Button
          disabled={(selectedSearch === 'BUSCAR POR' || selectedSearch === '') || (textSearchProduct === '') ? true : false}
          variant={(selectedSearch === 'BUSCAR POR' || selectedSearch === '') || (textSearchProduct === '') ? "outline-secondary" : "primary"}
          onClick={() => searchText()}
        >
          BUSCAR
        </Button>
        <Button variant='primary' onClick={() => refreshTable()}>
          <HiRefresh />
        </Button>
      </InputGroup>
    </div>
    <section>
      <Table striped className="admin-table-id" bordered hover responsive size='sm'>
        <thead>
          <tr>
            <th>#</th>
            <th>Ref.<TbSortAscending className='ascending-icon' onClick={() => orderSortProductList('ref')} /></th>
            <th>Nombre Cat.<TbSortAscending className='ascending-icon' onClick={() => orderSortProductList('nameCategory')} /></th>
            <th>Desc. Producto<TbSortAscending className='ascending-icon' onClick={() => orderSortProductList('description')} /></th>
            <th>Activo<TbSortAscending className='ascending-icon' onClick={() => orderSortProductList('isActive')} /></th>
            <th>Prod. Nuevo<TbSortAscending className='ascending-icon' onClick={() => orderSortProductList('newProduct')} /></th>
            <th>Descuento<TbSortAscending className='ascending-icon' onClick={() => orderSortProductList('discount')} /></th>
            <th>Posición<TbSortAscending className='ascending-icon' onClick={() => orderSortProductList('position')} /></th>
            <th className='center'>Fotos</th>
            <th className='center'>Editar</th>
            <th className='center'>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingProducts
            ? <tr><td colSpan="11" className='center'> <Spinner className='spinner' animation="grow" variant="dark" size='xl' /></td></tr>
            : productsList && productsList.length > 0 ? productsList.map((el, index) => {
              return <tr key={index}>
                <td>{index}</td>
                <td>{el.ref}</td>
                <td>{el.nameCategory}</td>
                <td>{el.description}</td>
                <td>{el.isActive ? "SI" : "NO"}</td>
                <td>{el.newProduct ? "SI" : "NO"}</td>
                <td>{el.discount}</td>
                <td>{el.position}</td>
                <td className='center'>{el.photos.length > 0 && <BsImages className='icon-admin' onClick={() => onShowFullSizeCarouselImages(el.photos)} />}</td>
                <td className='center'><AiTwotoneEdit className='icon-admin' onClick={() => onEditProduct(el)} /></td>
                <td className='center'><MdDeleteForever className='icon-admin' onClick={() => onDeleteProduct(el.id)} /></td>
              </tr>
            })
              : <tr><td colSpan="11" className='center'><section> No hay datos.</section></td></tr>
          }
        </tbody>
      </Table >
    </section>

    {showEditProductOverlay && <EditProductOverlay show={showEditProductOverlay} callbackShowEditProduct={setShowEditProductOverlay} onSuccessEditProduct={onSuccessEditProduct} productToEdit={selectedProduct} />}
    {showNewProductOverlay && <ProductOverlay show={showNewProductOverlay} callbackShowProduct={setShowNewProductOverlay} onSuccessNewProduct={onSuccessNewProduct} />}
    {showCarouselFullSizeImages && <ShowCarouselFullSizeImages show={showCarouselFullSizeImages} imgSrcArray={arrayImages} setShowCarouselFullSizeImages={setShowCarouselFullSizeImages} />}
    {showAlert && <AlertDismissible show={showAlert} msg={messageError} callbackCloseError={callbackCloseError} type={typeError} />}

  </div >
}

export default MainTableProducts;