import { createContext, useContext, useEffect, useState } from "react"

const Context = createContext()

const DayDividerProvider = ({ children }) => {
   const [state, setState] = useState('')
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const daysAll = ['mon', 'tue', 'wed', 'thue', 'fri', 'sat', 'sun']
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const daysInNumber = [1, 2, 3, 4, 5, 6, 7]
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const daysOdd = [1, 3, 5]
   // eslint-disable-next-line react-hooks/exhaustive-deps
   const daysEven = [2, 4, 6]


   
   useEffect(() => {
       if (state === daysInNumber.join()) {
           setState('Har kuni')
       } else if (state === daysOdd.join()) {
           setState('Toq kuni')
       } else if (state === daysEven.join()) {
           setState('Juft kuni')
       } else if (state.length) {
        const days = state.split(',').map(i => i.length && daysAll[i - 1])
        if (days.join().length) {
            setState(days.join(' '))
        }
        }
   },[daysAll, daysEven, daysInNumber, daysOdd, state])

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


const useDayDivider = (setterOnly) => {
    const { state, setState } = useContext(Context)
    return setterOnly ? [setState] : [state, setState]
 }

const dayDivider = (state) => {
   const daysAll = ['mon', 'tue', 'wed', 'thue', 'fri', 'sat', 'sun']
   const daysInNumber = [1, 2, 3, 4, 5, 6, 7]
   const daysOdd = [1, 3, 5]
   const daysEven = [2, 4, 6]
    if (state === daysInNumber.join()) {
        return 'Har kuni'
    } else if (state === daysOdd.join()) {
        return 'Toq kuni'
    } else if (state === daysEven.join()) {
        return 'Juft kuni'
    } else if (state?.length) {
        const days = state.split(',').map(i => i.length && daysAll[i - 1])
        if (days.join().length) {
            return days.join(' ')
        }
    }
}


export { DayDividerProvider, useDayDivider, dayDivider }