import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Context = React.createContext({})

const propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
   ]),
}

const defaultProps = {
   children: undefined,
}

export function UserContextProvider({ children }) {
   const [jwt, setJWT] = useState(() => window.sessionStorage.getItem('jwt'))

   return (
      <Context.Provider
         value={ {
            jwt,
            setJWT,
         } }
      >
         { children }
      </Context.Provider>
   )
}


UserContextProvider.propTypes = propTypes
UserContextProvider.defaultProps = defaultProps

export default Context
