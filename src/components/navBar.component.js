import React from 'react';
import "../styles/navbar.style.css"
import { useRoute, Link } from 'wouter'
import { BiMenu, BiX } from 'react-icons/bi';
import { useLocation } from "wouter"
import { FaPowerOff } from 'react-icons/fa';
import AnastassaLogo from "../images/logo-anastassa.jpg";
import useUser from '../hooks/useUser'

export const NavBar = ({ showMenu, onShowMenu }) => {
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();
  const { isLogged, logout } = useUser();
  const [match] = useRoute("/login");

  const handleClick = e => {
    //e.preventDefault()
    logout()
  }

  const renderLoginButtons = ({ isLogged }) => {
    return isLogged
      && <Link to='/' onClick={handleClick} className="log-out-container">
        <FaPowerOff></FaPowerOff>
        <span>logout</span>
      </Link>
  }

  const content = match
    ? null
    : renderLoginButtons({ isLogged })

  return <section className='navbar-container'>
    {!showMenu
      ? <BiMenu className="icon-menu menu-burguer" onClick={() => onShowMenu()} size={50} />
      : <BiX className="icon-menu icon-close-menu" onClick={() => onShowMenu()} size={50} />
    }
    <div className='logo-wrapper' onClick={() => setLocation('/')}>
      <img src={AnastassaLogo} alt='www.anastassa.com' className='main-logo' />
    </div>
    <div className='right-menu'>
      {content}
    </div>
  </section>

}

export default NavBar;