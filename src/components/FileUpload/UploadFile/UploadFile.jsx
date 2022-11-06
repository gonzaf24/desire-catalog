import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Spinner } from 'react-bootstrap'
import { useImage } from '../../../hooks'
// eslint-disable-next-line no-undef
window.Buffer = window.Buffer || require('buffer').Buffer

import './UploadFile.css';
import { FaPlus } from 'react-icons/fa'

const propTypes = {
  categoryName: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  onSuccesUpload: PropTypes.func,
};

const defaultProps = {
  className: '',
  id: 'btn-update',
  disabled: false,
  categoryName: '',
  onSuccesUpload: undefined,
};

const UploadFile = ({ className, id, disabled, categoryName, onSuccesUpload }) => {
  const classComponent = ['UploadFile', className].join(' ').trim();
  const hiddenFileInput = React.useRef(null);
  const { newImageHook } = useImage()
  const [isUploading, setIsUploading] = useState(false)

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

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
    <Button
      className={ classComponent }
      disabled={ disabled }
      id={ id } 
      variant='outline-primary'
      onClick={ handleClick }>
      { isUploading ? (
        <Spinner animation="grow" className="UploadFileSpinner" />
      ) : (
          <Fragment>
            <FaPlus />
            <input
              ref={ hiddenFileInput }
              accept="image/*"  
              id="file-upload" 
              style={ { display: 'none' } }
              type="file"
              onChange={ onSelectFile }
            />
        </Fragment>
      ) }
    </Button>
  );
};

UploadFile.propTypes = propTypes;
UploadFile.defaultProps = defaultProps;

export default UploadFile;