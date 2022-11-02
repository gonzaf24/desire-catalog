import React, { useState } from 'react'
import useImage from '../../hooks/useImage'
import { formatFileNameToShow } from '../../utils/formatters'
import { MdDeleteForever } from 'react-icons/md'
import { AlertDismissible, AlertConfirm } from '../../index'
import { Spinner } from 'react-bootstrap'
import PropTypes from 'prop-types'
import './DeleteFile.css';

const propTypes = {
  className: PropTypes.string,
  id: PropTypes.string,
  srcImage: PropTypes.string,
  onSuccesDeleted: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: undefined,
  srcImage: '',
  onSuccesDeleted: undefined,
};

const DeleteFile = ({ className, id, srcImage, onSuccesDeleted }) => {
  const classComponent = [DeleteFile, className].join(' ').trim();
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
    <div className={ classComponent } id={ id }>
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
    </div>
  );
};

DeleteFile.propTypes = propTypes;
DeleteFile.defaultProps = defaultProps;

export default DeleteFile;