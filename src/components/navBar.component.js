import React from 'react'
import '../styles/navbar.style.css'
import { useRoute, Link } from 'wouter'
import { BiMenu, BiX } from 'react-icons/bi'
import { useLocation } from 'wouter'
import { FaPowerOff } from 'react-icons/fa'
import AnastassaLogo from '../images/logo-anastassa.jpg'
import useUser from '../hooks/useUser'

import PropTypes from 'prop-types'


const propTypes = {
   showMenu: PropTypes.bool,
   onShowMenu: PropTypes.func,
}

const defaultProps = {
   showMenu: false,
   onShowMenu: undefined,
}

export const NavBar = ({ showMenu, onShowMenu }) => {
   // eslint-disable-next-line no-unused-vars
   const [location, setLocation] = useLocation()
   const { isLogged, logout } = useUser()
   const [match] = useRoute('/login')

   const handleClick = () => {
      //e.preventDefault()
      logout()
   }

   const renderLoginButtons = ({ isLogged }) => {
      return (
         isLogged && (
            <Link className="log-out-container" to="/" onClick={ handleClick }>
               <FaPowerOff></FaPowerOff>
               <span>logout</span>
            </Link>
         )
      )
   }

   const content = match ? null : renderLoginButtons({ isLogged })

   return (
      <section className="navbar-container">
         { !showMenu ? (
            <BiMenu
               className="icon-menu menu-burguer"
               size={ 75 }
               onClick={ onShowMenu }
            />
         ) : (
            <BiX
               className="icon-menu icon-close-menu"
               size={ 75 }
               onClick={ onShowMenu }
            />
         ) }
         <Link className="logo-wrapper" to="/">
            <img
               alt="www.anastassa.com"
               className="main-logo"
               src={ AnastassaLogo }
            />
         </Link>
         <div className="right-menu">{ content }</div>
      </section>
   )
}

NavBar.propTypes = propTypes
NavBar.defaultProps = defaultProps

export default NavBar
