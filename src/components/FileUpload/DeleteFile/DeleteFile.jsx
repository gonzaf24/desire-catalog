import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useImage } from '../../../hooks'
import { Spinner } from 'react-bootstrap'
import { MdDeleteForever } from 'react-icons/md'
import { formatFileNameToShow } from '../../../utils/formatters'
import { AlertDismissible, AlertConfirm } from '../../../components'

import './DeleteFile.css';

const propTypes = {
  srcImage: PropTypes.string,
  onSuccesDeleted: PropTypes.func,
};

const defaultProps = {
  srcImage: '',
  onSuccesDeleted: undefined,
};

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
    <>
      { isDeleting ? (
        <div>
          <Spinner animation="grow" className="DeleteFileSpinner" />
        </div>
      ) : (
        <MdDeleteForever
            className="DeleteFileItemGroup"
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
    </>
  );
};

DeleteFile.propTypes = propTypes;
DeleteFile.defaultProps = defaultProps;

export default DeleteFile;