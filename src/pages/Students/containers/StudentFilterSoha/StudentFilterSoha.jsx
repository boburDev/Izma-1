import './StudentFilterSoha.scss'
import StudentFilterCheck from '../../../../components/StudentComponents/StudentFilterCheck/StudentFilterCheck'
import { useQuery } from '@apollo/client'
import { COURSES } from '../../../../Querys/FilterSoha'
import { useState } from 'react'
import { useCourse } from '../../../../context/CourseProvider'
import {useCourseFilter} from '../../../../context/CourseFilterProvider'
import { useEffect } from 'react'

const StudentFilterSoha = () => {
   const [setCourseFilter] = useCourseFilter(true)
   const { data: courses } = useQuery(COURSES)
   const [state, setState] = useState([])


   useEffect(() => {
      setCourseFilter(state);
   }, [state])
   



   return (
      <div className="filterSoha">
         {
            courses && courses.courses.map((e, i) => (
                  <StudentFilterCheck
                     key={`${i}`}
                     nameSoha={e?.name}
                     id={e?.id}
                     setState={setState}
                     state={state}

                  />
            ))
         }
      </div>
   )
}

export default StudentFilterSoha