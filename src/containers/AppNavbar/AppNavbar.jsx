import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Navbar } from '../../components';

import './AppNavbar.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const AppNavbar = ({ className, id }) => {
  const classComponent = ['AppNavbar', className].join(' ').trim();
  const [showMenu, setShowMenu] = useState(false)

  const onShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      <Navbar showMenu={ showMenu } onShowMenu={ onShowMenu } />
      <Menu showMenu={ showMenu } onShowMenu={ onShowMenu } />
    </div>
  );
};

AppNavbar.propTypes = propTypes;
AppNavbar.defaultProps = defaultProps;

export default AppNavbar;
