import React, { useEffect } from 'react'
import '../styles/admin.style.css'
import { useLocation } from 'wouter'
import { Tab, Tabs } from 'react-bootstrap'
import useCategory from '../hooks/useCategory'
import MainTableProducts from '../components/admin/product/mainTableProducts.component'
import MainTableCategorys from '../components/admin/category/mainTableCategorys.component'
import PropTypes from 'prop-types'

const propTypes = {
   onAdmin: PropTypes.func,
}

const defaultProps = {
   onAdmin: undefined
}

export const Admin = ({ onAdmin }) => {
   const [setLocation] = useLocation()
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
      <div className="admin-container">
         <h1 className="h1-title-admin mb-5">ADMINISTRACION</h1>
         <Tabs
            className="mb-5"
            defaultActiveKey="productos"
            fill
            id="admin-tab-table"
         >
            <Tab eventKey="productos" title="PRODUCTOS">
               <MainTableProducts />
            </Tab>
            <Tab eventKey="categorias" title="CATEGORIAS">
               <MainTableCategorys />
            </Tab>
         </Tabs>
      </div>
   )
}

Admin.propTypes = propTypes
Admin.defaultProps = defaultProps

export default Admin
