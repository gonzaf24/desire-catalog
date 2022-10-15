import React, { useState, useEffect, useRef } from 'react'
import '../styles/menu.style.css'
import useCategory from '../hooks/useCategory'
import { Link } from 'wouter'

import PropTypes from 'prop-types'


const propTypes = {
   showMenu: PropTypes.bool,
   onShowMenu: PropTypes.func,
}

const defaultProps = {
   showMenu: false,
   onShowMenu: undefined,
}
export const Menu = ({ showMenu, onShowMenu }) => {
   const [womanList, setWomanList] = useState([])
   const [mensList, setMensList] = useState([])
   const { getCategorysHook } = useCategory()
   const menuRef = useRef()

   useEffect(() => {
      async function exect() {
         const categorys = await getCategorysHook()
         setWomanList(
            categorys.filter((e) => {
               return e.type === 'MUJER' && e.isActive === true
            }),
         )
         setMensList(
            categorys.filter((e) => {
               return e.type === 'HOMBRE' && e.isActive === true
            }),
         )
      }
      exect()
   }, [getCategorysHook, showMenu])

   useEffect(() => {
      const onBodyClick = (event) => {
         if (!(menuRef.current && menuRef.current.contains(event.target))) {
            if (showMenu) {
               onShowMenu()
            }
         }
      }
      document.body.addEventListener('click', onBodyClick)
      return () => {
         document.body.removeEventListener('click', onBodyClick)
      }
   }, [onShowMenu, showMenu])

   return (
      <section
         ref={ menuRef }
         className={ !showMenu ? 'menu-container' : 'menu-container-show' }
      >
         { womanList.length > 0 && (
            <>
               <span className="menu-title">MUJER</span>
               <section className="menu-subtitle-container">
                  { womanList.map((element, index) => {
                     return (
                        <Link
                           key={ index }
                           to={ `/category/${element.idName}` }
                           onClick={ onShowMenu }
                        >
                           <span className="menu-subtitle cursor">
                              { element.categoryName }
                           </span>
                        </Link>
                     )
                  }) }
               </section>
            </>
         ) }
         { mensList.length > 0 && (
            <>
               <span className="menu-title">HOMBRE</span>
               <section className="menu-subtitle-container">
                  { mensList.map((element, index) => {
                     return (
                        <Link
                           key={ index }
                           to={ `/category/${element.idName}` }
                           onClick={ onShowMenu }
                        >
                           <span className="menu-subtitle cursor">
                              { element.categoryName }
                           </span>
                        </Link>
                     )
                  }) }
               </section>
            </>
         ) }
      </section>
   )
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

export default Menu
