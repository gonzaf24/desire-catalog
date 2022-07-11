import React, { useState, useEffect } from 'react';
import "../../../styles/categoryOverlay.style.css"
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { BiX } from 'react-icons/bi';
import useCategory from '../../../hooks/useCategory';
import AlertDismissible from '../../alertDismissible.component';

export const EditCategoryOverlay = ({ show, callbackShowCategory, onSuccessEditCategory, categoryToEdit }) => {

  const { editCategoryHook } = useCategory()
  const [name, setName] = useState("");
  const [categoryType, setCategoryType] = useState("");
  const [activeCategory, setActiveCategory] = useState(true);
  const [isNewCategory, setIsNewCategory] = useState(true);
  const [hasDiscountCategory, setHasDiscountCategory] = useState(true);
  const [position, setPosition] = useState(0);
  const [typeError, setTypeError] = useState("succes");
  const [showAlert, setShowAlert] = useState(false);
  const [messageError, setMessageError] = useState("");

  useEffect(() => {
    if (categoryToEdit) {
      setName(categoryToEdit.categoryName);
      setCategoryType(categoryToEdit.type);
      setActiveCategory(categoryToEdit.isActive);
      setIsNewCategory(categoryToEdit.newCategory);
      setHasDiscountCategory(categoryToEdit.discount);
      setPosition(categoryToEdit.position);
    }
  }, [categoryToEdit, show]);

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
    callbackShowCategory(false)
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      const categoryToPersist = {
        "idName": categoryToEdit.idName,
        "categoryName": name,
        "type": categoryType,
        "isActive": activeCategory,
        "newCategory": isNewCategory,
        "discount": hasDiscountCategory,
        "position": position,
        "id": categoryToEdit.id,
      }

      const categoryEdited = await editCategoryHook(categoryToPersist)
        .then((element) => {
          return element;
        })
        .catch((error) => {
          console.log("el error ", error.message)
          setShowAlert(true);
          setMessageError(error.message)
          setTypeError("danger")
        })
      if (categoryEdited) {
        setShowAlert(true);
        setMessageError(`Categoría editada!.`)
        setTypeError("succes")
        onSuccessEditCategory();

      }
    } catch (error) {
      console.log("error nueva categoria", error)
    }
  }

  return show && <div className="category-overlay-container">
    <section className="category-overlay-section">
      <BiX className="close-overlay-category" onClick={() => callbackShowCategory(false)} size={50} />
      <span className='title-new-category'>EDITAR CATEGORIA</span>
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
          id="custom-switch-1"
          label="Activo"
          checked={activeCategory}
          onChange={(e) => {
            setActiveCategory(e.target.checked);
          }}
        />

        <Form.Check
          className='form-check-st'
          type="switch"
          id="custom-switch-2"
          label="Es nuevo"
          checked={isNewCategory}
          onChange={(e) => {
            setIsNewCategory(e.target.checked);
          }}
        />

        <Form.Check
          className='form-check-st'
          type="switch"
          id="custom-switch-3"
          label="Descuentos"
          checked={hasDiscountCategory}
          onChange={(e) => {
            setHasDiscountCategory(e.target.checked);
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
            Cerrar
          </Button>

          <Button
            className="submitbutton"
            type="submit"
            disabled={!validateForm()}
          >
            Guardar cambios
          </Button>
        </section>

      </Form>
    </section>

    <AlertDismissible show={showAlert} msg={messageError} callbackCloseError={callbackCloseError} type={typeError} />
  </div>

}

export default EditCategoryOverlay;