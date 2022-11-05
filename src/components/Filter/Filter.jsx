import React, { useState } from 'react'
import PropTypes from 'prop-types';
import { FaPlay } from 'react-icons/fa'
import { HiPlusSm } from 'react-icons/hi'
import Dropdown from 'react-bootstrap/Dropdown'
import { ModelView1, ModelView2, ModelView1Active, ModelView2Active } from '../../images'

import './Filter.css';

const propTypes = {
  categoryNamePage: PropTypes.string,
  className: PropTypes.string,
  handleModelView: PropTypes.func,
  id: PropTypes.string,
  ordenarBaratos: PropTypes.func,
  ordenarFechaCreacion: PropTypes.func,
};

const defaultProps = {
  categoryNamePage: '',
  className: '',
  handleModelView: () => { },
  id: undefined,
  ordenarBaratos: () => { },
  ordenarFechaCreacion: () => { },
};


const Filter = ({ className, id, ordenarBaratos, ordenarFechaCreacion, categoryNamePage, handleModelView }) => {
  const classComponent = ['Filter', className].join(' ').trim();
  const [isMode1ViewActive, setIsMode1ViewActive] = useState(false)

  const handleCLick = () => {
    setIsMode1ViewActive(!isMode1ViewActive)
    handleModelView(isMode1ViewActive)
  }

  return (
    <section
      className={ classComponent }
      id={ id }    >

      <Dropdown className="FilterFilterWrapper">
        <Dropdown.Toggle className="FilterFilterContent" >
          <FaPlay className="FilterRotate90" />
          <span className="FilterFilterSize">FILTRO</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={ ordenarBaratos }>
            <HiPlusSm />
            BARATOS PRIMERO
          </Dropdown.Item>
          <Dropdown.Item onClick={ ordenarFechaCreacion }>
            <HiPlusSm />
            NUEVOS PRIMERO
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <h1 className="FilterTitle"> { categoryNamePage } </h1>
      <div className="FilterIconsWrapper">
        { isMode1ViewActive && (
          <>
            <img alt="" className="FilterModelIconShow" src={ ModelView1Active } width={ 5 } />
            <img alt="" className="FilterModelIconShowActive" src={ ModelView2 } width={ 5 } onClick={ handleCLick } />
          </>
        ) }
        { !isMode1ViewActive && (
          <>
            <img alt="" className="FilterModelIconShowActive" src={ ModelView1 } width={ 5 } onClick={ handleCLick } />
            <img alt="" className="FilterModelIconShow" src={ ModelView2Active } width={ 5 } />
          </>
        ) }
      </div>
    </section >
  );
};

Filter.propTypes = propTypes;
Filter.defaultProps = defaultProps;

export default Filter;
