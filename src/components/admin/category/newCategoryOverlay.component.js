import React, { useState } from 'react';
import "../../../styles/categoryOverlay.style.css"
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { BiX } from 'react-icons/bi';
import useCategory from '../../../hooks/useCategory';
import AlertDismissible from '../../alertDismissible.component';

export const NewCategoryOverlay = ({ show, callbackShowCategory }) => {

  const { newCategoryHook } = useCategory()
  const [name, setName] = useState('');
  const [categoryType, setCategoryType] = useState('MUJER');
  const [activeCategory, setActiveCategory] = useState(true);
  const [isNewCategory, setIsNewCategory] = useState(false);
  const [hasDiscountCategory, setHasDiscountCategory] = useState(false);
  const [position, setPosition] = useState(0);
  const [typeError, setTypeError] = useState("succes");
  const [showAlert, setShowAlert] = useState(false);
  const [messageError, setMessageError] = useState();

  function validateForm() {
    let isValid = true;
    if (position === '' || position < 0) {
      isValid = false;
    }
    if (name === '') {
      isValid = false;
    }
    return isValid;
  }

  const callbackCloseError = (param) => {
    setShowAlert(param);
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const categoryToRegister = {
        "idName": `${categoryType}-${name}`,
        "categoryName": name,
        "type": categoryType,
        "isActive": activeCategory,
        "newCategory": isNewCategory,
        "discount": hasDiscountCategory,
        "position": position
      }
      const categoryCreated = await newCategoryHook(categoryToRegister)
        .then((element) => {
          return element;
        })
        .catch((error) => {
          console.log("el error ", error.message)
          setShowAlert(true);
          setMessageError(error.message)
          setTypeError("danger")
        })
      if (categoryCreated) {
        setShowAlert(true);
        setMessageError(`Creada nueva categoria ${categoryCreated.categoryName}`)
        setTypeError("succes")
        //callbackShowCategory(false)
      }
    } catch (error) {
      console.log("error nueva categoria", error)
    }
  }

  return show && <div className="category-overlay-container">
    <section className="category-overlay-section">
      <BiX className="close-overlay-category" onClick={() => callbackShowCategory(false)} size={50} />
      <span className='title-new-category'>NUEVA CATEGORIA</span>
      <Form onSubmit={handleSubmit} className='mt-5'>

        <FloatingLabel controlId="floatingSelect" label="Tipo de categoria" className='mt-4'>
          <Form.Select aria-label="Floating label select example"
            value={categoryType}
            onChange={(e) => {
              setCategoryType(e.target.value);
            }}
          >
            <option value="MUJER">MUJER</option>
            <option value="HOMBRE">HOMBRE</option>
            <option value="OFERTAS-1">OFERTAS-1</option>
            <option value="OFERTAS-2">OFERTAS-2</option>
          </Form.Select>
        </FloatingLabel>

        <FloatingLabel
          className='mt-4'
          controlId="floatingInput"
          label="Nombre categoria"
        >
          <Form.Control type="text" placeholder="Nombre de la categoria"
            value={name.toUpperCase()}
            onChange={(e) => {
              setName(e.target.value.toUpperCase());
            }}
          />
        </FloatingLabel>

        <Form.Check
          className='form-check-st'
          type="switch"
          id="custom-switch"
          label="Activo"
          value={activeCategory}
          checked={activeCategory}
          onChange={(e) => {
            setActiveCategory(!activeCategory);
          }}
        />

        <Form.Check
          className='form-check-st'
          type="switch"
          id="custom-switch1"
          label="Es nuevo"
          value={isNewCategory}
          checked={isNewCategory}
          onChange={(e) => {
            setIsNewCategory(!isNewCategory);
          }}
        />

        <Form.Check
          className='form-check-st'
          type="switch"
          id="custom-switch2"
          label="Descuentos"
          value={hasDiscountCategory}
          checked={hasDiscountCategory}
          onChange={(e) => {
            setHasDiscountCategory(!hasDiscountCategory);
          }}
        />

        <FloatingLabel
          className='mt-4'
          controlId="floatingInput"
          label="Posicion"
        >
          <Form.Control type="number" placeholder="Posicion del de categoria en el catalogo"
            value={position}
            onChange={(e) => {
              setPosition(e.target.value);
            }}
          />
        </FloatingLabel>

        <div styles="height:20px"></div>

        <section className='mt-4 buttons-container'>
          <Button
            variant='secondary'
            className="submitbutton"
            onClick={() => callbackShowCategory(false)}
          >
            Cancelar
          </Button>

          <Button
            className="submitbutton"
            type="submit"
            disabled={!validateForm()}
          >
            Crear categoria
          </Button>
        </section>

      </Form>
    </section>

    <AlertDismissible show={showAlert} msg={messageError} callbackCloseError={callbackCloseError} type={typeError} />
  </div>

}

export default NewCategoryOverlay;