import { createContext, useContext, useState } from "react"

const Context = createContext()

const DavomatProvider = ({ children }) => {
  const [state, setState] = useState([])

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

const useDavomat = (setterOnly) => {
  const { state, setState } = useContext(Context)
  return setterOnly ? [setState] : [state, setState]
}

export { DavomatProvider, useDavomat }