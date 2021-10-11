import React, { createContext, useContext, useState } from 'react'
const Context = createContext()

const NameProvider = ({ children }) => {
   const [group, setGroup] = useState()
   const [userStatus, setUserStatus] = useState()
   const [state, setState] = useState()

   const value = {
      state,
      setState,
      group,
      setGroup,
      userStatus,
      setUserStatus
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
const useGroup = (gr) => {
   const { group, setGroup } = useContext(Context)
   return gr ? [setGroup] : [group, setGroup]
}
const useUserStatus = (gr) => {
   const { userStatus, setUserStatus } = useContext(Context)
   return gr ? [setUserStatus] : [userStatus, setUserStatus]
}

export {
   NameProvider,
   useName1,
   useGroup,
   useUserStatus
}