import React, { createContext, useContext, useState, useEffect } from 'react'
const Context = createContext()

const LoginProvider = ({ children }) => {

   const [state, setState] = useState({
      token: window.localStorage.getItem('token')
   })

   useEffect(() => {
      if (!localStorage.getItem('token') && state.token) {
         console.log(state.token)
         window.localStorage.setItem('token', state.token)
         window.localStorage.setItem('hashtag', state.hashtag)
      }
   }, [state])

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

const useLogin = (setterOnly) => {
   const { state, setState } = useContext(Context)
   return setterOnly ? [setState] : [state, setState]
}

export {
   LoginProvider,
   useLogin
}