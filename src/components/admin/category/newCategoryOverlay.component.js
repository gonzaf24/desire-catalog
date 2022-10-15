import React, { useState } from 'react'
import '../../../styles/categoryOverlay.style.css'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import { BiX } from 'react-icons/bi'
import useCategory from '../../../hooks/useCategory'
import AlertDismissible from '../../alertDismissible.component'
import PropTypes from 'prop-types'


const propTypes = {
   callbackShowCategory: PropTypes.func,
   show: PropTypes.bool,
}

const defaultProps = {
   callbackShowCategory: undefined,
   show: false,
}

export const NewCategoryOverlay = ({ show, callbackShowCategory }) => {
   const { newCategoryHook } = useCategory()
   const [name, setName] = useState('')
   const [categoryType, setCategoryType] = useState('MUJER')
   const [activeCategory, setActiveCategory] = useState(true)
   const [isNewCategory, setIsNewCategory] = useState(false)
   const [hasDiscountCategory, setHasDiscountCategory] = useState(false)
   const [position, setPosition] = useState(0)
   const [typeError, setTypeError] = useState('succes')
   const [showAlert, setShowAlert] = useState(false)
   const [messageError, setMessageError] = useState()

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
   }

   async function handleSubmit(event) {
      try {
         event.preventDefault()
         const categoryToRegister = {
            idName: `${categoryType}-${name}`,
            categoryName: name,
            type: categoryType,
            isActive: activeCategory,
            newCategory: isNewCategory,
            discount: hasDiscountCategory,
            position: position,
         }
         const categoryCreated = await newCategoryHook(categoryToRegister)
            .then((element) => {
               return element
            })
            .catch((error) => {
               console.log('el error ', error.message)
               setShowAlert(true)
               setMessageError(error.message)
               setTypeError('danger')
            })
         if (categoryCreated) {
            setShowAlert(true)
            setMessageError(
               `Creada nueva categoria ${categoryCreated.categoryName}`,
            )
            setTypeError('succes')
            callbackShowCategory(false)
         }
      } catch (error) {
         console.log('error nueva categoria', error)
      }
   }

   return (
      show && (
         <div className="category-overlay-container">
            <section className="category-overlay-section">
               <BiX
                  className="close-overlay-category"
                  size={ 50 }
                  onClick={ () => callbackShowCategory(false) }
               />
               <span className="title-new-category">NUEVA CATEGORIA</span>
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
                     id="custom-switch"
                     label="Activo"
                     type="switch"
                     value={ activeCategory }
                     onChange={ () => {
                        setActiveCategory(!activeCategory)
                     } }
                  />

                  <Form.Check
                     checked={ isNewCategory }
                     className="form-check-st"
                     id="custom-switch1"
                     label="Es nuevo"
                     type="switch"
                     value={ isNewCategory }
                     onChange={ () => {
                        setIsNewCategory(!isNewCategory)
                     } }
                  />

                  <Form.Check
                     checked={ hasDiscountCategory }
                     className="form-check-st"
                     id="custom-switch2"
                     label="Descuentos"
                     type="switch"
                     value={ hasDiscountCategory }
                     onChange={ () => {
                        setHasDiscountCategory(!hasDiscountCategory)
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

                  <div style="height:20px"></div>

                  <section className="mt-4 buttons-container">
                     <Button
                        className="submitbutton"
                        variant="secondary"
                        onClick={ () => callbackShowCategory(false) }
                     >
                        Cancelar
                     </Button>

                     <Button
                        className="submitbutton"
                        disabled={ !validateForm() }
                        type="submit"
                     >
                        Crear categoria
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
         </div>
      )
   )
}

NewCategoryOverlay.propTypes = propTypes
NewCategoryOverlay.defaultProps = defaultProps

export default NewCategoryOverlay
