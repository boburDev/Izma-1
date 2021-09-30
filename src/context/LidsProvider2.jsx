import React, { createContext, useContext, useState } from 'react'
const Context = createContext()

const LidsProvider2 = ({ children }) => {

   const [state, setState] = useState([])

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

const useLidsFunc2 = (setterOnly) => {
   const { state, setState } = useContext(Context)
   return setterOnly ? [setState] : [state, setState]
}

export {
   LidsProvider2,
   useLidsFunc2
}