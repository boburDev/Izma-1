import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { TEACHER_FILTERS } from '../../../../Querys/FilterSoha'
import { useTeacher } from '../../../../context/TeacherProvider'
import './FilterTeachers.scss'

import FilterTeachersChecked from '../../../../components/Groups/FilterTeachers_Checked/FilterTeachers_Checked'

const FilterTeachers = () => {

   const { data: teachers } = useQuery(TEACHER_FILTERS)
   const [state, setState] = useState([])
   const [teacher, setTeacher] = useTeacher()

   setTeacher(state)

   return (
      <div className="filterDebtors">
         {
            teachers && teachers.colleagues.map((e, i) => (
               <FilterTeachersChecked
                  key={i}
                  nameSoha={e.name}
                  id={e.Id}
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