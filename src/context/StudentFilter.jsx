import React, { createContext, useContext, useState } from 'react'
const Context = createContext()

const StudentFilterProvider = ({ children }) => {


   const opt = {
      credit: false,
      sales: false
  }

   const [state, setState] = useState(opt)
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

const useStudentFilter = (setterOnly) => {
   const { state, setState } = useContext(Context)
   return setterOnly ? [setState] : [state, setState]
}

export {
   StudentFilterProvider,
   useStudentFilter
}