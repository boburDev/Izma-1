import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { TEACHER_FILTERS } from '../../../Querys/FilterSoha'
import { useTeacher } from '../../../context/TeacherProvider'
import './FilterTeachers.scss'

import FilterTeachersChecked from '../FilterTeachersChecked/FilterTeachersChecked'

const FilterTeachers = () => {

   const { data: teachers } = useQuery(TEACHER_FILTERS)
   const [state, setState] = useState([])
   const [teacher, setTeacher] = useTeacher()
   const [arr, setArr] = useState()

   

   useEffect(() => {
      setArr(teachers)
   }, [teachers])

   

   if (state.length) {
      setTeacher(state)
   }





   return (
      <div className="filterDebtors">
         {
            arr && arr.colleagues.map((e, i) => (
               <FilterTeachersChecked
                  key={i}
                  nameSoha={e.name}
                  id={e.id}
                  state={state}
                  setState={setState}
                  teacher={teacher}

               />
            ))
         }
      </div>
   )
}

export default FilterTeachers