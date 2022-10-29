import React, { useState, useEffect } from 'react'
import '../../../styles/categoryOverlay.style.css'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import useCategory from '../../../hooks/useCategory'
import AlertDismissible from '../../alertDismissible.component'
import PropTypes from 'prop-types'
import Modal from '../../../containers/Modal/Modal'
import AnastassaLogo from '../../../images/logo-anastassa.jpg'

const propTypes = {
   categoryToEdit: PropTypes.shape({
      categoryName: PropTypes.string,
      discount: PropTypes.bool,
      id: PropTypes.string,
      idName: PropTypes.string,
      isActive: PropTypes.bool,
      newCategory: PropTypes.bool,
      position: PropTypes.number,
      type: PropTypes.string,
   }),
   isLoading: PropTypes.bool,
   isOpenModal: PropTypes.bool,
   onCloseModal: PropTypes.func,
   onSuccessEditCategory: PropTypes.func,
}

const defaultProps = {
   categoryToEdit: {
      categoryName: '',
      discount: false,
      id: '',
      idName: '',
      isActive: false,
      newCategory: false,
      position: 0,
      type: '',
   },
   isLoading: false,
   isOpenModal: false,
   onCloseModal: undefined,
   onSuccessEditCategory: undefined,
}

export const EditCategoryOverlay = ({
   onSuccessEditCategory,
   isOpenModal,
   categoryToEdit,
   isLoading,
   onCloseModal,
}) => {
   const { editCategoryHook } = useCategory()
   const [name, setName] = useState('')
   const [categoryType, setCategoryType] = useState('')
   const [activeCategory, setActiveCategory] = useState(true)
   const [isNewCategory, setIsNewCategory] = useState(true)
   const [hasDiscountCategory, setHasDiscountCategory] = useState(true)
   const [position, setPosition] = useState(0)
   const [typeError, setTypeError] = useState('succes')
   const [showAlert, setShowAlert] = useState(false)
   const [messageError, setMessageError] = useState('')

   useEffect(() => {
      if (categoryToEdit) {
         setName(categoryToEdit.categoryName)
         setCategoryType(categoryToEdit.type)
         setActiveCategory(categoryToEdit.isActive)
         setIsNewCategory(categoryToEdit.newCategory)
         setHasDiscountCategory(categoryToEdit.discount)
         setPosition(categoryToEdit.position)
      }
   }, [categoryToEdit])

   function validateForm() {
      let isValid = true
      if (position === '' || position < 0) {
         isValid = false
      }
      if (name === '') {
         isValid = false
      }
      return isValid
   }

   const callbackCloseError = (param) => {
      setShowAlert(param)
      onCloseModal()
   }

   async function handleSubmit(event) {
      try {
         event.preventDefault()
         const categoryToPersist = {
            idName: categoryToEdit.idName,
            categoryName: name,
            type: categoryType,
            isActive: activeCategory,
            newCategory: isNewCategory,
            discount: hasDiscountCategory,
            position: position,
            id: categoryToEdit.id,
         }

         const categoryEdited = await editCategoryHook(categoryToPersist)
            .then((element) => {
               return element
            })
            .catch((error) => {
               console.log('el error ', error.message)
               setShowAlert(true)
               setMessageError(error.message)
               setTypeError('danger')
            })
         if (categoryEdited) {
            onSuccessEditCategory()
            onCloseModal();
         }
      } catch (error) {
         console.log('error nueva categoria', error)
      }
   }

   return (
      <Modal
         header={
            <>
               <img alt="www.anastassa.com" className="main-logo" src={ AnastassaLogo } />
               <span className="title-new-category">EDITAR CATEGORIA</span>
            </>
         }
         isLoading={ isLoading }
         isOpen={ isOpenModal }
         onClose={ onCloseModal }
         onHide={ onCloseModal }
      >
         <section className="category-overlay-section">
               <Form className="mt-5" onSubmit={ handleSubmit }>
                  <FloatingLabel
                     className="mt-4"
                     controlId="floatingSelect"
                     label="Tipo de categoria"
                  >
                     <Form.Select
                        aria-label="Floating label select example"
                        value={ categoryType }
                        onChange={ (e) => {
                           setCategoryType(e.target.value)
                        } }
                     >
                        <option value="MUJER">MUJER</option>
                        <option value="HOMBRE">HOMBRE</option>
                        <option value="OFERTAS-1">OFERTAS-1</option>
                        <option value="OFERTAS-2">OFERTAS-2</option>
                     </Form.Select>
                  </FloatingLabel>

                  <FloatingLabel
                     className="mt-4"
                     controlId="floatingInput"
                     label="Nombre categoria"
                  >
                     <Form.Control
                        placeholder="Nombre de la categoria"
                        type="text"
                        value={ name.toUpperCase() }
                        onChange={ (e) => {
                           setName(e.target.value.toUpperCase())
                        } }
                     />
                  </FloatingLabel>

                  <Form.Check
                     checked={ activeCategory }
                     className="form-check-st"
                     id="custom-switch-1"
                     label="Activo"
                     type="switch"
                     onChange={ (e) => {
                        setActiveCategory(e.target.checked)
                     } }
                  />

                  <Form.Check
                     checked={ isNewCategory }
                     className="form-check-st"
                     id="custom-switch-2"
                     label="Es nuevo"
                     type="switch"
                     onChange={ (e) => {
                        setIsNewCategory(e.target.checked)
                     } }
                  />

                  <Form.Check
                     checked={ hasDiscountCategory }
                     className="form-check-st"
                     id="custom-switch-3"
                     label="Descuentos"
                     type="switch"
                     onChange={ (e) => {
                        setHasDiscountCategory(e.target.checked)
                     } }
                  />

                  <FloatingLabel
                     className="mt-4"
                     controlId="floatingInput"
                     label="Posicion"
                  >
                     <Form.Control
                        placeholder="Posicion del de categoria en el catalogo"
                        type="number"
                        value={ position }
                        onChange={ (e) => {
                           setPosition(e.target.value)
                        } }
                     />
                  </FloatingLabel>

                  <section className="mt-4 buttons-container">
                     <Button
                        className="submitbutton"
                        variant="secondary"
                     onClick={ () => onCloseModal() }
                     >
                     Cancelar
                     </Button>

                     <Button
                        className="submitbutton"
                        disabled={ !validateForm() }
                        type="submit"
                     >
                        Guardar cambios
                     </Button>
                  </section>
               </Form>
            </section>

            <AlertDismissible
               callbackCloseError={ callbackCloseError }
               msg={ messageError }
               show={ showAlert }
               type={ typeError }
            />
      </Modal>
   )
}

EditCategoryOverlay.propTypes = propTypes
EditCategoryOverlay.defaultProps = defaultProps

export default EditCategoryOverlay
