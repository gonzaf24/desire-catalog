import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import { Button, Spinner, Table } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
import { AiTwotoneEdit } from 'react-icons/ai'
import { TbSortAscending } from 'react-icons/tb'
import { TiPlus } from 'react-icons/ti'
import useCategory from '../../../../hooks/useCategory'
import EditCategory from '../EditCategory'
import NewCategory from '../NewCategory'
import AlertDismissible from '../../../AlertDismissible'
import AlertConfirm from '../../../AlertConfirm'
import useOpenToggle from '../../../../hooks/useOpenToggle'
import PropTypes from 'prop-types'

import './CategoryTable.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
};

const defaultProps = {
  className: '',
  id: undefined,
};

const CategoryTable = ({ className, id }) => {
  const classComponent = [CategoryTable, className].join(' ').trim();
  // eslint-disable-next-line no-unused-vars
  const [location, setLocation] = useLocation()
  const { getCategorysHook, deleteCategoryHook } = useCategory()
  const [typeError, setTypeError] = useState('succes')
  const [showAlert, setShowAlert] = useState(false)
  const [showAlertConfirm, setShowAlertConfirm] = useState(false)
  const [messageError, setMessageError] = useState()
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState()
  const [isSortingCategorys, setIsSortingCategorys] = useState(false)
  const [idDeleteCategory, setIdDeleteCategory] = useState()
  const [isLoading, setIsLoading] = useState(false)

  const onDeleteCategory = (idCategory) => {
    setIdDeleteCategory(idCategory)
    setShowAlertConfirm(true)
  }

  const {
    isOpen: isOpenModalEdit,
    open: openModalEdit,
    close: onCloseModalEdit,
  } = useOpenToggle(false)

  const {
    isOpen: isOpenModal,
    open: openModal,
    close: onCloseModal,
  } = useOpenToggle(false)

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
    openModalEdit();
  }

  const callbackCloseError = (param) => {
    setShowAlert(param)
  }

  const onSuccesCategory = async () => {
    setIsLoading(true)
    const categorysOut = await getCategorysHook()
    setCategoryList(categorysOut)
    setIsLoading(false)
  }

  useEffect(() => {
    const exect = async () => {
      const categorysOut = await getCategorysHook()
      setCategoryList(categorysOut)
    }
    exect()
  }, [
    showAlert,
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
    <div className={ classComponent } id={ id }>
      <div className="CategoryTableWrapper">
        <Button
          className="CategoryTableButtonIcon"
          onClick={ () => openModal() }
        >
          <TiPlus /> CATEGORIA
        </Button>
      </div>

      <section>
        <Table
          bordered
          className="CategoryTableAdminTable"
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
                  className="CategoryTableAscendingIcon"
                  onClick={ () => orderSortCategoryList('categoryName') }
                />
              </th>
              <th>
                Tipo
                <TbSortAscending
                  className="CategoryTableAscendingIcon"
                  onClick={ () => orderSortCategoryList('type') }
                />
              </th>
              <th>
                Activo
                <TbSortAscending
                  className="CategoryTableAscendingIcon"
                  onClick={ () => orderSortCategoryList('isActive') }
                />
              </th>
              <th>
                Cat. Nueva
                <TbSortAscending
                  className="CategoryTableAscendingIcon"
                  onClick={ () => orderSortCategoryList('newCategory') }
                />
              </th>
              <th>
                Descuento
                <TbSortAscending
                  className="CategoryTableAscendingIcon"
                  onClick={ () => orderSortCategoryList('discount') }
                />
              </th>
              <th>
                Posición
                <TbSortAscending
                  className="CategoryTableAscendingIcon"
                  onClick={ () => orderSortCategoryList('position') }
                />
              </th>
              <th>
                Id
                <TbSortAscending
                  className="CategoryTableAscendingIcon"
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
                    className="CategoryTableSpinner"
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
                        className="CategoryTableIconAdmin"
                        onClick={ () => onEditCategory(el) }
                      />
                    </td>
                    <td className="center">
                      <MdDeleteForever
                        className="CategoryTableIconAdmin"
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
      <EditCategory
        categoryToEdit={ selectedCategory }
        isLoading={ isLoading }
        isOpenModal={ isOpenModalEdit }
        onCloseModal={ onCloseModalEdit }
        onSuccessEditCategory={ onSuccesCategory }
      />

      <NewCategory
        isLoading={ isLoading }
        isOpenModal={ isOpenModal }
        onCloseModal={ onCloseModal }
        onSuccessCreatedCategory={ onSuccesCategory }
      />

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
  );
};

CategoryTable.propTypes = propTypes;
CategoryTable.defaultProps = defaultProps;

export default CategoryTable;