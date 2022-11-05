import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'wouter'
import { Tab, Tabs } from 'react-bootstrap'
import { useCategory } from '../../hooks'
import { CategoryTable, ProductTable } from '../../components';

import './Admin.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  onAdmin: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  onAdmin: undefined
};

const Admin = ({ className, id, onAdmin }) => {
  const classComponent = ['Admin', className].join(' ').trim();

  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation()
  const { isLogged } = useCategory()

  useEffect(() => {
    const exect = async () => {
      if (!isLogged) {
        setLocation('/404-NOT-FOUND')
        onAdmin && onAdmin()
      }
    }
    exect()
  }, [isLogged, onAdmin])

  return (
    <div
      className={ classComponent }
      id={ id }
    >
      <h1 className="AdminTitle">ADMINISTRACION</h1>
      <Tabs
        className="AdminTabs"
        defaultActiveKey="productos"
        fill
        id="admin-tab-table"
      >
        <Tab eventKey="productos" title="PRODUCTOS">
          <ProductTable />
        </Tab>
        <Tab eventKey="categorias" title="CATEGORIAS">
          <CategoryTable />
        </Tab>
      </Tabs>
    </div>
  );
};

Admin.propTypes = propTypes;
Admin.defaultProps = defaultProps;

export default Admin;
