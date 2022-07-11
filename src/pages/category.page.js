import React, { useState, useEffect, Fragment } from 'react';
import '../styles/lino.style.css'
import { FaPlay } from "react-icons/fa";
import { HiPlusSm } from "react-icons/hi";
import { OverlayArticle } from '../components/overalyArticle.component';
import Mode1 from "../images/mode-1.png";
import Mode2 from "../images/mode-2.png";
import Mode1Active from "../images/mode-1-active.png";
import Mode2Active from "../images/mode-2-active.png";
import useProduct from '../hooks/useProduct';
import ListCardArticle from '../components/listCardArticle.component';
import Loading from '../components/loader.component';
import Dropdown from 'react-bootstrap/Dropdown';

export const Category = ({ params }) => {

  const [showOverlayArticle, setShowOverlayArticle] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [productSelected, setProductSelected] = useState();
  const [isMode1Active, setIsMode1Active] = useState(false);
  const { getProductByCategoryHook } = useProduct();
  const [categoryNamePage, setCategoryNamePage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onClickProduct = (product) => {
    setProductSelected(product);
    setShowOverlayArticle(true);
  }

  const ordenarBaratos = async () => {
    setIsLoading(true)
    const outList = productsList.sort((a, b) => a.precioUY - b.precioUY);
    setProductsList(outList)
    setTimeout(() => {
      setIsLoading(false)
    }, 300);
  }

  const ordenarFechaCreacion = async () => {
    setIsLoading(true);
    const outList = productsList.sort((a, b) => { return new Date(a.dateCreated) - new Date(b.dateCreated) });
    setProductsList(outList)
    setTimeout(() => {
      setIsLoading(false)
    }, 300);
  }

  useEffect(() => {
    async function exect() {
      setIsLoading(true)
      setProductsList(await getProductByCategoryHook(params.category));
      let nameAux
      if (params.category.indexOf("MUJER-") === 0) {
        nameAux = params.category.replace("MUJER-", "")
        setCategoryNamePage(nameAux)
        setIsLoading(false)
      } else {
        nameAux = params.category.replace("HOMBRE-", "")
        setCategoryNamePage(nameAux)
        setIsLoading(false)
      }
    }
    exect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProductByCategoryHook, params.category, productSelected]);

  return <Fragment>
    <section className='lino-container'>
      <section className='container-icons-show'>
        <Dropdown className="fliter-wrapper">
          <Dropdown.Toggle className='filtros-content' id="prueba" >
            <FaPlay className='rotate90' /><span className='ml-2 fw-2'>FILTRO</span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={ordenarBaratos}><HiPlusSm />BARATOS PRIMERO</Dropdown.Item>
            <Dropdown.Item onClick={ordenarFechaCreacion}><HiPlusSm />NUEVOS PRIMERO</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <h1 className='h1-title-span'> {categoryNamePage} </h1>
        <div className='icons-wrapper'>
          {isMode1Active && <>
            <img src={Mode1Active} width={5} alt='' className='icon-card-show' />
            <img src={Mode2} width={5} alt='' className='icon-card-show icon-active' onClick={() => setIsMode1Active(false)} />
          </>}
          {!isMode1Active && <>
            <img src={Mode1} width={5} alt='' className='icon-card-show icon-active' onClick={() => setIsMode1Active(true)} />
            <img src={Mode2Active} width={5} alt='' className='icon-card-show' />
          </>}
        </div>
      </section>
      {isLoading
        ? <Loading size={"xl"} />
        : <ListCardArticle isMode1Active={isMode1Active} onClickArticle={onClickProduct} productsList={productsList} />
      }
    </section >
    <OverlayArticle showOverlay={showOverlayArticle} articleToShow={productSelected} setShowOverlayArticle={setShowOverlayArticle} />
  </Fragment>
}

export default Category;