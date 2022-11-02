import React, { Fragment, useState } from 'react'
import '../../styles/uploadFile.style.css'
import { Button, Spinner } from 'react-bootstrap'
import { FaPlus } from 'react-icons/fa'
import useImage from '../../hooks/useImage'
// eslint-disable-next-line no-undef
window.Buffer = window.Buffer || require('buffer').Buffer
import PropTypes from 'prop-types'

const propTypes = {
   categoryName: PropTypes.string,
   disabled: PropTypes.bool,
   onSuccesUpload: PropTypes.func,
}

const defaultProps = {
}

const UploadFile = ({ disabled, categoryName, onSuccesUpload }) => {
   const { newImageHook /* , isLoginLoadinUpload, hasUploadError */ } =
      useImage()
   const [isUploading, setIsUploading] = useState(false)

   const onSelectFile = async (e) => {
      try {
         setIsUploading(true)
         e.preventDefault()
         if (e.target.files && e.target.files.length > 0) {
            let file = e.target.files[0]
            const name = e.target.files[0].name
            const lastDot = name.lastIndexOf('.')
            const ext = name.substring(lastDot + 1)
            let hora = new Date()
            let fileName = `${categoryName}-${hora.getTime()}.${ext}`
            const result = await newImageHook(file, fileName)
            onSuccesUpload(result.imagePath)
            setIsUploading(false)
         }
      } catch (error) {
         setIsUploading(false)
         console.log('error upload file ', error)
      }
   }

   return (
      <Button disabled={ disabled } id="btn-update" variant="outline-primary">
         { isUploading ? (
            <Spinner animation="grow" className="spinner-upload" />
         ) : (
            <Fragment>
               <label className="label-upload" htmlFor="file-upload">
                  <FaPlus className="faplus-color" />
               </label>
               <input
                     accept="image/*"
                     id="file-upload"
                     style={ { display: 'none' } }
                     type="file"
                  onChange={ onSelectFile }
               />
            </Fragment>
         ) }
      </Button>
   )
}

UploadFile.propTypes = propTypes
UploadFile.defaultProps = defaultProps

export default UploadFile