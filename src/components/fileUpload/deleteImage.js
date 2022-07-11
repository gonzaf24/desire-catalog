import React, { Fragment, useState } from 'react';
import "../../styles/uploadFile.style.css"
import useImage from '../../hooks/useImage';
import { formatFileNameToShow } from '../../utils/formatters';
import { MdDeleteForever } from 'react-icons/md';
import AlertDismissible from '../alertDismissible.component';
import AlertConfirm from '../alertConfirm.component';
import { Spinner } from 'react-bootstrap';

export const DeleteFile = ({ disabled, srcImage, onSuccesDeleted }) => {

  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { deleteImageHook } = useImage()
  const [typeError, setTypeError] = useState("succes");
  const [showAlert, setShowAlert] = useState(false);
  const [messageError, setMessageError] = useState('');
  const [confirmMessage] = useState("Seguro quieres eliminar la imagen?");

  const callbackCloseError = (param) => {
    setShowAlert(false);
  }

  const callbackCancelDelete = (param) => {
    setShowConfirm(false);
  }

  const callbackConfirmDelete = async (param) => {
    setIsDeleting(true)
    setShowConfirm(false)
    await onDeleteImage(srcImage)
  }

  const onDeleteImage = async (e) => {
    try {
      await deleteImageHook(formatFileNameToShow(srcImage))
        .then((element) => {
          onSuccesDeleted(srcImage)
          setIsDeleting(false);
          return element;
        })
        .catch((error) => {
          setIsDeleting(false);
          setShowAlert(true);
          setMessageError(error.message)
          setTypeError("danger")
        })
    } catch (error) {
      setIsDeleting(false);
      console.log("error upload file ", error)
    }
  };

  return <Fragment>
    {isDeleting
      ? <div><Spinner animation="grow" className='spinner-upload' /></div>
      : <MdDeleteForever className='delete-item-group' onClick={() => setShowConfirm(true)} />}
    <AlertDismissible show={showAlert} msg={messageError} callbackCloseError={callbackCloseError} type={typeError} />
    <AlertConfirm show={showConfirm} msg={confirmMessage} callbackCancel={callbackCancelDelete} callbackConfirm={callbackConfirmDelete} type={"succes"} />
  </Fragment>
}