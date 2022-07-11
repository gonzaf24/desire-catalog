import React, { useEffect } from 'react';
import "../styles/admin.style.css"
import { useLocation } from "wouter"
import { Tab, Tabs } from 'react-bootstrap';
import useCategory from '../hooks/useCategory';
import MainTableProducts from '../components/admin/product/mainTableProducts.component';
import MainTableCategorys from '../components/admin/category/mainTableCategorys.component';

export const Admin = ({ onAdmin }) => {
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation();
  const { isLogged } = useCategory()

  useEffect(() => {
    const exect = async () => {
      if (!isLogged) {
        setLocation('/404-NOT-FOUND')
        onAdmin && onAdmin()
      }
    }
    exect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLogged, onAdmin])

  return <div className='admin-container'>
    <h1 className='h1-title-admin mb-5'>ADMINISTRACION</h1>
    <Tabs
      defaultActiveKey="productos"
      id="admin-tab-table"
      className="mb-5"
      fill
    >
      <Tab eventKey="productos" title="PRODUCTOS">
        <MainTableProducts />
      </Tab>
      <Tab eventKey="categorias" title="CATEGORIAS">
        <MainTableCategorys />
      </Tab>
    </Tabs>
  </div >
}

export default Admin;