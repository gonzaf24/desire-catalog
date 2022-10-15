import React, { useState, useEffect } from 'react'
import '../../../styles/admin.style.css'
import { useLocation } from 'wouter'
import { Button, Spinner, Table } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
import { AiTwotoneEdit } from 'react-icons/ai'
import { TbSortAscending } from 'react-icons/tb'
import { TiPlus } from 'react-icons/ti'
import useCategory from '../../../hooks/useCategory'
import EditCategoryOverlay from '../../../components/admin/category/EditCategoryOverlay.component'
import NewCategoryOverlay from '../../../components/admin/category/newCategoryOverlay.component'
import AlertDismissible from '../../alertDismissible.component'
import AlertConfirm from '../../alertConfirm.component'

export const MainTableCategorys = () => {
   // eslint-disable-next-line no-unused-vars
   const [location, setLocation] = useLocation()
   const { getCategorysHook, deleteCategoryHook } = useCategory()
   const [typeError, setTypeError] = useState('succes')
   const [showAlert, setShowAlert] = useState(false)
   const [showAlertConfirm, setShowAlertConfirm] = useState(false)
   const [messageError, setMessageError] = useState()
   const [categoryList, setCategoryList] = useState([])
   const [showNewCategoryOverlay, setShowNewCategoryOverlay] = useState(false)
   const [showEditCategoryOverlay, setShowEditCategoryOverlay] = useState(false)
   const [selectedCategory, setSelectedCategory] = useState()
   const [isSortingCategorys, setIsSortingCategorys] = useState(false)
   const [idDeleteCategory, setIdDeleteCategory] = useState()

   const onDeleteCategory = (idCategory) => {
      setIdDeleteCategory(idCategory)
      setShowAlertConfirm(true)
   }

   const confirmDeleteCategory = async () => {
      try {
         const isDeleted = await deleteCategoryHook(idDeleteCategory)
         if (isDeleted) {
            setShowAlertConfirm(false)
            setShowAlert(true)
            setMessageError('Categoria eliminada.')
            setTypeError('succes')
            setIdDeleteCategory()
         }
      } catch (error) {
         console.log('error ', error)
      }
   }

   const cancelDeleteCategory = () => {
      setIdDeleteCategory()
      setShowAlertConfirm(false)
   }

   const onEditCategory = async (element) => {
      setSelectedCategory(element)
      setShowEditCategoryOverlay(true)
   }

   const callbackCloseError = (param) => {
      setShowAlert(param)
   }

   const onSuccessEditCategory = async () => {
      const categorysOut = await getCategorysHook()
      setCategoryList(categorysOut)
   }

   useEffect(() => {
      const exect = async () => {
         const categorysOut = await getCategorysHook()
         setCategoryList(categorysOut)
      }
      exect()
   }, [
      showNewCategoryOverlay,
      showAlert,
      showEditCategoryOverlay,
      getCategorysHook,
   ])

   const sortList = (list, field) => {
      const outListAux = list.sort((a, b) => {
         if (a[field] < b[field]) {
            return -1
         }
         if (a[field] > b[field]) {
            return 1
         }
         return 0
      })
      return outListAux
   }

   const orderSortCategoryList = async (type) => {
      setIsSortingCategorys(true)
      setCategoryList(sortList(categoryList, type))
      setTimeout(() => {
         setIsSortingCategorys(false)
      }, 500)
   }

   return (
      <div className="">
         <div className="bar-wrapper">
            <Button
               className="flex-gap-button-icon"
               onClick={ () => setShowNewCategoryOverlay(true) }
            >
               <TiPlus /> CATEGORIA
            </Button>
         </div>

         <section>
            <Table
               bordered
               className="admin-table-id"
               hover
               responsive
               size="sm"
            >
               <thead>
                  <tr>
                     <th>#</th>
                     <th>
                        Nombre Cat.
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortCategoryList('categoryName') }
                        />
                     </th>
                     <th>
                        Tipo
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortCategoryList('type') }
                        />
                     </th>
                     <th>
                        Activo
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortCategoryList('isActive') }
                        />
                     </th>
                     <th>
                        Cat. Nueva
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortCategoryList('newCategory') }
                        />
                     </th>
                     <th>
                        Descuento
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortCategoryList('discount') }
                        />
                     </th>
                     <th>
                        Posición
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortCategoryList('position') }
                        />
                     </th>
                     <th>
                        Id
                        <TbSortAscending
                           className="ascending-icon"
                           onClick={ () => orderSortCategoryList('id') }
                        />
                     </th>
                     <th className="center">Editar</th>
                     <th className="center">Eliminar</th>
                  </tr>
               </thead>
               <tbody>
                  { isSortingCategorys ? (
                     <tr>
                        <td className="center" colSpan="10">
                           <Spinner
                              animation="grow"
                              className="spinner"
                              size="xl"
                              variant="dark"
                           />
                        </td>
                     </tr>
                  ) : (
                     categoryList.map((el, index) => {
                        return (
                           <tr key={ index }>
                              <td>{ index }</td>
                              <td>{ el.categoryName }</td>
                              <td>{ el.type }</td>
                              <td>{ el.isActive ? 'SI' : 'NO' }</td>
                              <td>{ el.newCategory ? 'SI' : 'NO' }</td>
                              <td>{ el.discount ? 'SI' : 'NO' }</td>
                              <td>{ el.position }</td>
                              <td>{ el.id }</td>
                              <td className="center">
                                 <AiTwotoneEdit
                                    className="icon-admin"
                                    onClick={ () => onEditCategory(el) }
                                 />
                              </td>
                              <td className="center">
                                 <MdDeleteForever
                                    className="icon-admin"
                                    onClick={ () => onDeleteCategory(el.id) }
                                 />
                              </td>
                           </tr>
                        )
                     })
                  ) }
               </tbody>
            </Table>
         </section>
         { showEditCategoryOverlay && (
            <EditCategoryOverlay
               callbackShowCategory={ setShowEditCategoryOverlay }
               categoryToEdit={ selectedCategory }
               show={ showEditCategoryOverlay }
               onSuccessEditCategory={ onSuccessEditCategory }
            />
         ) }
         { showNewCategoryOverlay && (
            <NewCategoryOverlay
               callbackShowCategory={ setShowNewCategoryOverlay }
               show={ showNewCategoryOverlay }
            />
         ) }
         { showAlert && (
            <AlertDismissible
               callbackCloseError={ callbackCloseError }
               msg={ messageError }
               show={ showAlert }
               type={ typeError }
            />
         ) }
         { showAlertConfirm && (
            <AlertConfirm
               callbackCancel={ cancelDeleteCategory }
               callbackConfirm={ confirmDeleteCategory }
               msg={ '¿Seguro que deseas eliminar la Categoria?' }
               show={ showAlertConfirm }
            />
         ) }
      </div>
   )
}

export default MainTableCategorys
