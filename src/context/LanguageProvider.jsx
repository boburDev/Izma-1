import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext()

const LangProvider = ({ children }) => {
  const [state, setState] = useState(localStorage.getItem("lang") || 'ru')

  useEffect(() => {
    if (state) {
      localStorage.setItem("lang", state)
    } else {
      localStorage.setItem("lang", "ru")
    }
  }, [state])

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

const useLang = (setterOnly) => {
  const { state, setState } = useContext(Context)
  return setterOnly ? [setState] : [state, setState]
}

export { LangProvider, useLang }
