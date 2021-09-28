import './FilterTeachersChecked.scss'

import { useState } from 'react'

const FilterTeachersChecked = ({ nameSoha, id, state, setState }) => {
   const [filterSoha, setFilterSoha] = useState(false)


   const handleClick = (e) => {
      setFilterSoha(!filterSoha)

      let index = state.indexOf(e.target.id)

      if (index === -1) {
         setState([...state, e.target.id])
      } else {
         for (var i = 0; i < state.length; i++) {
            if (state[i] === e.target.id) {
               state.splice(i, 1);
            }
         }
      }
   }

   return (
      <div
         className={`filterName  ${filterSoha ? 'checked' : ' '}`}
         onClick={handleClick}
         id={id}
      >
         <span>{nameSoha}</span>
      </div>
   )
}

export default FilterTeachersChecked