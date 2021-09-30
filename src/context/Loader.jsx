import React, { createContext, useContext, useState } from 'react'
const Context = createContext()

const LoaderProvider = ({ children }) => {

   const [state, setState] = useState()

   const value = {
      state,
      setState
   }

   return (
      <Context.Provider value={value}>
         <Context.Consumer>
            {
               () => children
            }
         </Context.Consumer>
      </Context.Provider>
   )
}

const useLoader = (setterOnly) => {
   const { state, setState } = useContext(Context)
   return setterOnly ? [setState] : [state, setState]
}

export {
   LoaderProvider,
   useLoader
}