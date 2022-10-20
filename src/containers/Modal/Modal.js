import React from 'react'
import { Modal as ModalBoostrap } from 'react-bootstrap'
import { BiX } from 'react-icons/bi'
import Loader from '../../components/loader.component'
import PropTypes from 'prop-types'
import './Modal.css'

const propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
   footer: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
   header: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
   id: PropTypes.string,
   isLoading: PropTypes.bool,
   isOpen: PropTypes.bool,
   size: PropTypes.string,
   onClose: PropTypes.func,
   onHide: PropTypes.func,
}

const defaultProps = {
   children: undefined,
   footer: undefined,
   header: undefined,
   id: undefined,
   isLoading: false,
   isOpen: false,
   size: 'md',
   onClose: undefined,
   onHide: undefined,
}

const Modal = ({
   children,
   id,
   isOpen = false,
   onHide,
   onClose,
   footer = undefined,
   isLoading = false,
   header = undefined,
   size = 'md',
}) => {
   return (
      <ModalBoostrap
         aria-labelledby="modal-center"
         centered
         className="ModalContainer"
         id={ id }
         show={ isOpen }
         size={ size }
         onHide={ onHide }
      >
         { (header || onClose) && (
            <ModalBoostrap.Header className="Header">
               { header }
               { onClose && (
                  <BiX className="CloseIcon" size={ 75 } onClick={ onClose }></BiX>
               ) }
            </ModalBoostrap.Header>
         ) }
         { children && (
            <ModalBoostrap.Body className="Body">
               { isLoading && (
                  <div className="LoaderContainer">
                     <Loader size={ 'xl' } />
                  </div>
               ) }
               { !isLoading && children }
            </ModalBoostrap.Body>
         ) }
         { footer && (
            <ModalBoostrap.Footer className="Footer">
               { footer }
            </ModalBoostrap.Footer>
         ) }
      </ModalBoostrap>
   )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal
