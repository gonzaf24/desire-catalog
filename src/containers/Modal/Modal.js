import React from 'react';
import { Modal as ModalBoostrap } from 'react-bootstrap';
import { BiX } from 'react-icons/bi';
import Loader from '../../components/loader.component';

import "./Modal.css"

const Modal = ({
  children, id, isOpen = false, onHide, onClose, footer = undefined,
  isLoading = false, header = undefined, size = 'md',
}) => {

  return (
    <ModalBoostrap
      aria-labelledby="modal-center"
      centered
      className={ !header ? 'Empty' : 'Modal' }
      id={ id }
      show={ isOpen }
      size={ size }
      onHide={ onHide }
    >
      { (header || onClose) && (
        <ModalBoostrap.Header className='Header'>
          { header }
          { onClose && (
            <BiX className='CloseIcon' onClick={ onClose } size={ 75 }></BiX>
          ) }
        </ModalBoostrap.Header>
      )
      }
      {
        children && (
          <ModalBoostrap.Body className='Body'>
            { isLoading && (
              <div className='LoaderContainer'>
                <Loader size={ "xl" } />
              </div>
            ) }
            { !isLoading && children }
          </ModalBoostrap.Body>
        )
      }
      {
        footer && (
          <ModalBoostrap.Footer className='Footer'>
            { footer }
          </ModalBoostrap.Footer>
        )
      }
    </ModalBoostrap >
  );
};

export default Modal;
