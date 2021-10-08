import './CoursesInner_Tab1.scss'
import { useHistory, useParams } from 'react-router'
import { useQuery } from '@apollo/client'
import { BY_COURSE_ID } from '../../../../../Querys/Courses_Query'
import { useLang } from '../../../../../context/LanguageProvider'
import Language from '../../../../../lang/index'

const CoursesInner_Tab1 = () => {

   const history = useHistory()
   const [lang] = useLang()

   const { courseID } = useParams()

   const { data: onlineLessons } = useQuery(BY_COURSE_ID, {
      variables: { courseID }
   })

   // console.log(onlineLessons)

   const toLesson = () => {
      history.push('/coursesAddLesson')
   }
   return (
      <>
         <div className="izma__courses-tabs1">
            <button className="izma__courses-tabs1-button" onClick={toLesson} >
               {Language[lang].courses.addLesson.addLessonTitle}
            </button>
            {
               onlineLessons && onlineLessons.byCourseID.map((e, i) => (
                  <ol key={i} className="izma__courses-tabs1-message-list">
                     <li className="izma__courses-tabs1-message-list-item">
                        {
                           e.onlineLessons && e.onlineLessons.map((m, i) => (
                              <p key={i} className="izma__courses-tabs1-message-text">
                                 {m.title}
                              </p>
                           ))
                        }
                        <span className="izma__courses-tabs1-message-date">
                           09.08.2021
                        </span>
                     </li>
                  </ol>
               ))
            }
         </div>
      </>
   )
}
export default CoursesInner_Tab1