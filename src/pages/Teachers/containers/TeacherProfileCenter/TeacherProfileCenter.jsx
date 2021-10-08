import './TeacherProfileCenter.scss'
import { useParams } from 'react-router'
import { groups } from './query'
import { useQuery } from '@apollo/client'
import { useEvent } from '../../../../context/EventProvider'
import { useLang } from '../../../../context/LanguageProvider'
import Language from '../../../../lang/index'

const TeacherProfileCenter = () => {

   const { collegueID } = useParams()
   const [setGroupId] = useEvent(true)
   const [lang] = useLang()

   const { data: group } = useQuery(groups, {
      variables: { teacherID: [collegueID], dd: [] }
   })

   return (
      <>
         <div className="izma__teachers-profile-certer">
            <h4 className="izma__teachers-profile-certer-heading">
               {group && group.groups.length ? <>{Language[lang].groups.groupsTitle}</> : null}
            </h4>
            {
               group && group.groups && group.groups.map((i, key) => <div
                  id={i.id}
                  key={key}>

                  <div className="izma__teachers-profile-certer-box" onClick={e => setGroupId(e.target.id)}
                     id={i.id}
                     style={{ marginBottom: '10px', marginTop: '10px' }}>
                     <div id={i.id} className="izma__teachers-profile-certer-box-left">
                        <div id={i.id} className="izma__teachers-profile-certer-box-left-id">
                           <span> 12798</span>
                        </div>
                        <div id={i.id} className="izma__teachers-profile-certer-box-left-title">
                           {i.name.toUpperCase()}
                        </div>
                     </div>
                     <div id={i.id} className="izma__teachers-profile-certer-box-right">
                        <span id={i.id} className="izma__teachers-profile-certer-box-right-date">
                           {i.startDate}
                        </span>
                        <span id={i.id} className="izma__teachers-profile-certer-box-right-time">
                           {i.time}
                        </span>
                        <button id={i.id} className="izma__teachers-profile-certer-box-right-number">
                           {i.students.length}
                        </button>
                     </div>
                  </div>
               </div>)
            }
         </div>
      </>
   )
}

export default TeacherProfileCenter


