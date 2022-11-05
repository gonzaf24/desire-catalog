import React, { Fragment } from 'react'
import { AnastassaLogo } from '../../images'
import { Modal as ModalBoostrap } from 'react-bootstrap'
import { BiX } from 'react-icons/bi'
import PropTypes from 'prop-types'
import './Modal.css'

const propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
   className: PropTypes.string,
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
   className: '',
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
   header = <Fragment />,
   size = 'md',
   className = '',
}) => {
   const classComponent = ['Modal', className].join(' ').trim();

   return (
      <ModalBoostrap
         aria-labelledby="Modal"
         centered
         className={ classComponent }
         id={ id }
         show={ isOpen }
         size={ size }
         onHide={ onHide }
      >
         { (header || onClose) && (
            <ModalBoostrap.Header className="ModalHeader">
               <img alt="www.anastassa.com" className="ModalLogo" src={ AnastassaLogo } />
               { header }
               { onClose && (
                  <BiX className="ModalCloseIcon" size={ 75 } onClick={ onClose } />
               ) }
            </ModalBoostrap.Header>
         ) }
         { children && (
            <ModalBoostrap.Body className="ModalBody">
               { isLoading && (
                  <div className="ModalLoaderContainer">

                  </div>
               ) }
               { !isLoading && children }
            </ModalBoostrap.Body>
         ) }
         { footer && (
            <ModalBoostrap.Footer className="ModalFooter">
               { footer }
            </ModalBoostrap.Footer>
         ) }
      </ModalBoostrap>
   )
}

Modal.propTypes = propTypes
Modal.defaultProps = defaultProps

export default Modal
