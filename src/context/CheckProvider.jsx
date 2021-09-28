import { createContext, useContext, useState } from "react"

const Context = createContext()

const CheckProvider = ({ children }) => {
   const [state, setState] = useState({
      checkData: {},
      check: false
   })

   const value = {
      state,
      setState,
   }
   return (
      <Context.Provider value={value}>
         <Context.Consumer>{() => children}</Context.Consumer>
      </Context.Provider>
   )
}

const useCheck = (setterOnly) => {
   const { state, setState } = useContext(Context)
   return setterOnly ? [setState] : [state, setState]
}

export { CheckProvider, useCheck }