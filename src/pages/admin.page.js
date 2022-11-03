import React, { useEffect } from 'react'
import '../styles/admin.style.css'
import { useLocation } from 'wouter'
import { Tab, Tabs } from 'react-bootstrap'
import { useCategory } from '../hooks/index'
import { CategoryTable, ProductTable } from '../components/index';
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
         <h1 className="h1-title-admin mb-2">ADMINISTRACION</h1>
         <Tabs
            className="mb-2 admin-tabs"
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
   )
}

Admin.propTypes = propTypes
Admin.defaultProps = defaultProps

export default Admin
