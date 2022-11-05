import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'wouter'
import { useLocation } from 'wouter'
import { useUser } from '../../hooks'
import { BiMenu, BiX } from 'react-icons/bi'
import { FaPowerOff } from 'react-icons/fa'
import { AnastassaLogo } from '../../images'

import './Navbar.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  showMenu: PropTypes.bool,
  onShowMenu: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  showMenu: false,
  onShowMenu: undefined,
};

const Navbar = ({ className, id, showMenu, onShowMenu }) => {
  const classComponent = ['Navbar', className].join(' ').trim();
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation()
  const { isLogged, logout } = useUser()

  return (
    <section className={ classComponent } id={ id }>
      { !showMenu ? (
        <BiMenu
          className="NavbarIconMenu"
          size={ 75 }
          onClick={ onShowMenu }
        />
      ) : (
        <BiX
          className="NavbarIconClose"
          size={ 75 }
          onClick={ onShowMenu }
        />
      ) }
      <Link className="NavbarWrapperLogo" to="/">
        <img
          alt="www.anastassa.com"
          className="NavbarMainLogo"
          src={ AnastassaLogo }
        />
      </Link>
      <div className="NavbarRightMenu">
        { isLogged && (
          <Link className="NavbarLogoutContainer" to="/" onClick={ logout }>
            <FaPowerOff></FaPowerOff>
            <span>logout</span>
          </Link>
        ) }
      </div>
    </section>
  );
};

Navbar.propTypes = propTypes;
Navbar.defaultProps = defaultProps;

export default Navbar;