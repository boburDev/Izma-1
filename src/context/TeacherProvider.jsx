import React, { createContext, useContext, useState } from 'react'
const Context = createContext()

const TeacherProvider = ({ children }) => {

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

const useTeacher = (setterOnly) => {
   const { state, setState } = useContext(Context)
   return setterOnly ? [setState] : [state, setState]
}

export {
   TeacherProvider,
   useTeacher
}