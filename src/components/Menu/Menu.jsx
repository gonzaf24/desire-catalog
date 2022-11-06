import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'wouter'
import { useCategory } from '../../hooks'

import './Menu.css'

const propTypes = {
   showMenu: PropTypes.bool,
   onShowMenu: PropTypes.func,
}

const defaultProps = {
   showMenu: false,
   onShowMenu: undefined,
}

export const Menu = ({ showMenu, onShowMenu }) => {
   const menuRef = useRef()
   const [womanList, setWomanList] = useState([])
   const [mensList, setMensList] = useState([])
   const { getCategorysHook } = useCategory()
   const muenuClassName = !showMenu ? 'MenuContainer' : 'MenuContainerShow'

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
      <section ref={ menuRef } className={ muenuClassName } >
         { womanList.length > 0 && (
            <section className="MenuSubtitleContainer">
               <span className="MenuTitle">MUJER</span>
               { womanList.map((element, index) => {
                  return (
                     <Link key={ index } to={ `/category/${element.idName}` } onClick={ onShowMenu } >
                        <span className="MenuSubtitle">
                           { element.categoryName }
                        </span>
                     </Link>
                  )
               }) }
            </section>
         ) }
         { mensList.length > 0 && (
            <section className="MenuSubtitleContainer">
               <span className="MenuTitle">HOMBRE</span>
               { mensList.map((element, index) => {
                  return (
                     <Link key={ index } to={ `/category/${element.idName}` } onClick={ onShowMenu } >
                        <span className="MenuSubtitle">
                           { element.categoryName }
                        </span>
                     </Link>
                  )
               }) }
            </section>
         ) }
         <h6>info@anastassa.com</h6>
      </section>
   )
}

Menu.propTypes = propTypes
Menu.defaultProps = defaultProps

export default Menu
