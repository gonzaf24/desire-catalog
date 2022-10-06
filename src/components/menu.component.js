import React, { useState, useEffect } from 'react';
import "../styles/menu.style.css"
import useCategory from '../hooks/useCategory';
import { Link } from 'wouter';

export const Menu = ({ showMenu, onShowMenu }) => {

  const [womanList, setWomanList] = useState([]);
  const [mensList, setMensList] = useState([]);
  const { getCategorysHook } = useCategory();

  useEffect(() => {
    async function exect() {
      const categorys = await getCategorysHook();
      setWomanList(categorys.filter((e) => { return e.type === "MUJER" && e.isActive === true }))
      setMensList(categorys.filter((e) => { return e.type === "HOMBRE" && e.isActive === true }))
    }
    exect()
  }, [getCategorysHook, showMenu]);


  return <section className={ !showMenu ? 'menu-container' : 'menu-container-show' } >
    <span className='menu-title'>MUJER</span>
    <section className='menu-subtitle-container'>
      { womanList.map((element, index) => {
        return <Link key={ index } to={ `/category/${element.idName}` } onClick={ () => onShowMenu() }>
          <span className='menu-subtitle cursor'>
            { element.categoryName }
          </span>
        </Link>
      }) }
    </section>
    <span className='menu-title'>HOMBRE</span>
    <section className='menu-subtitle-container'>
      { mensList.map((element, index) => {
        return <Link key={ index } to={ `/category/${element.idName}` } onClick={ () => onShowMenu() }>
          <span className='menu-subtitle cursor' >
            { element.categoryName }
          </span>
        </Link>
      }) }
    </section>
  </section >
}

export default Menu;