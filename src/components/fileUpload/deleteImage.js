import React, { Fragment, useState } from 'react'
import '../../styles/uploadFile.style.css'
import useImage from '../../hooks/useImage'
import { formatFileNameToShow } from '../../utils/formatters'
import { MdDeleteForever } from 'react-icons/md'
import AlertDismissible from '../alertDismissible.component'
import AlertConfirm from '../alertConfirm.component'
import { Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'


const propTypes = {
   srcImage: PropTypes.string,
   onSuccesDeleted: PropTypes.func,
}

const defaultProps = {
   srcImage: '',
   onSuccesDeleted: undefined,
}

const DeleteFile = ({ srcImage, onSuccesDeleted }) => {
   const [isDeleting, setIsDeleting] = useState(false)
   const [showConfirm, setShowConfirm] = useState(false)
   const { deleteImageHook } = useImage()
   const [typeError, setTypeError] = useState('succes')
   const [showAlert, setShowAlert] = useState(false)
   const [messageError, setMessageError] = useState('')
   const [confirmMessage] = useState('Seguro quieres eliminar la imagen?')

   const callbackCloseError = () => {
      setShowAlert(false)
   }

   const callbackCancelDelete = () => {
      setShowConfirm(false)
   }

   const callbackConfirmDelete = async () => {
      setIsDeleting(true)
      setShowConfirm(false)
      await onDeleteImage(srcImage)
   }

   const onDeleteImage = async () => {
      try {
         await deleteImageHook(formatFileNameToShow(srcImage))
            .then((element) => {
               onSuccesDeleted(srcImage)
               setIsDeleting(false)
               return element
            })
            .catch((error) => {
               setIsDeleting(false)
               setShowAlert(true)
               setMessageError(error.message)
               setTypeError('danger')
            })
      } catch (error) {
         setIsDeleting(false)
         console.log('error upload file ', error)
      }
   }

   return (
      <Fragment>
         { isDeleting ? (
            <div>
               <Spinner animation="grow" className="spinner-upload" />
            </div>
         ) : (
            <MdDeleteForever
               className="delete-item-group"
               onClick={ () => setShowConfirm(true) }
            />
         ) }
         <AlertDismissible
            callbackCloseError={ callbackCloseError }
            msg={ messageError }
            show={ showAlert }
            type={ typeError }
         />
         <AlertConfirm
            callbackCancel={ callbackCancelDelete }
            callbackConfirm={ callbackConfirmDelete }
            msg={ confirmMessage }
            show={ showConfirm }
            type={ 'succes' }
         />
      </Fragment>
   )
}

DeleteFile.propTypes = propTypes
DeleteFile.defaultProps = defaultProps

export default DeleteFile