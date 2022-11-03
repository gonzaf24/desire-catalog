import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Modal } from '../../../containers/index'
import { useCategory } from '../../../hooks/index'
import { AlertDismissible } from '../../index'
import { Button, FloatingLabel, Form } from 'react-bootstrap'
import './NewCategory.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpenModal: PropTypes.bool,
  onCloseModal: PropTypes.func,
  onSuccessCreatedCategory: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  isLoading: false,
  isOpenModal: false,
  onCloseModal: undefined,
  onSuccessCreatedCategory: undefined,
};

const NewCategory = ({ className, id, isOpenModal, isLoading, onCloseModal, onSuccessCreatedCategory }) => {
  const classComponent = ['NewCategory', className].join(' ').trim();
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
        setTypeError('succes');
        onSuccessCreatedCategory();
        onCloseModal();
      }
    } catch (error) {
      console.log('error nueva categoria', error)
    }
  }
  return (
    <Modal
      className={ classComponent }
      header={ <span >NUEVA CATEGORIA</span> }
      id={ id }
      isLoading={ isLoading }
      isOpen={ isOpenModal }
      onClose={ onCloseModal }
      onHide={ onCloseModal }
    >
      <section className="NewCategorySection">
        <Form onSubmit={ handleSubmit }>
          <FloatingLabel
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
            className="NewCategoryFormCheck"
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
            className="NewCategoryFormCheck"
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
            className="NewCategoryFormCheck"
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

          <section className="NewCategoryButtonsContainer">
            <Button
              className="submitbutton"
              variant="secondary"
              onClick={ onCloseModal }
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

    </Modal>
  );
};

NewCategory.propTypes = propTypes;
NewCategory.defaultProps = defaultProps;

export default NewCategory;