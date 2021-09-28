import { useQuery } from '@apollo/client'
import { useParams } from 'react-router'
import { BY_COURSE_ID } from '../../../../../Querys/Courses_Query'
import './CoursesInner_Tab3.scss'
const CoursesInner_Tab3 = () => {

   const { courseID } = useParams()

   const { data } = useQuery(BY_COURSE_ID, {
      variables: { courseID }
   })

   return (
      <>
         {
            data && data.byCourseID.map((e, i) => (
               <div key={i} className="izma__courses-tabs1">
                  {
                     e.groups && e.groups.map((g, i) => (
                        <ul key={i} className="izma__courses-tabs3-message">
                           <li className="izma__courses-tabs3-message-list-item">
                              <div className="izma__courses-tabs3-message-list-item-left">
                                 <p className="izma__courses-tabs3-message-text courses__tabs3-id">
                                    id:{g.name}
                                 </p>
                                 <p className="izma__courses-tabs3-message-text courses__tabs3-name">
                                    {g.teacher}
                                 </p>
                              </div>
                              <div className="izma__courses-tabs3-message-list-item-right">
                                 <p className="izma__courses-tabs3-message-text izma__courses-tabs3-message-text-date">
                                    {g.time}
                                 </p>
                                 <p className="izma__courses-tabs3-message-text">
                                    TTS
                                 </p>
                              </div>
                           </li>
                        </ul>
                     ))
                  }
               </div>
            ))
         }
      </>
   )
}
export default CoursesInner_Tab3