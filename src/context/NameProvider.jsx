import React, { createContext, useContext, useState } from 'react'
const Context = createContext()

const NameProvider = ({ children }) => {

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

const useName1 = (setterOnly) => {
   const { state, setState } = useContext(Context)
   return setterOnly ? [setState] : [state, setState]
}

export {
   NameProvider,
   useName1
}