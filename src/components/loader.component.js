import React from 'react'
import { Spinner } from 'react-bootstrap'
import '../styles/loader.style.css'
import PropTypes from 'prop-types'

const propTypes = {
   size: PropTypes.string,
}

const defaultProps = {
   size: 'lg',
}

export const Loader = ({ size }) => {
   return (
      <div className="loader-container">
         <Spinner
            animation="grow"
            className="loader-wrapper"
            size={ size }
            variant="dark"
         />
      </div>
   )
}

Loader.propTypes = propTypes
Loader.defaultProps = defaultProps

export default Loader
