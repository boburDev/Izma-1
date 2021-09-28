import './TeacherProfileRight.scss'
// import ArrowImg from '../../assets/Icons/arrow.svg'
import { useEvent } from '../../../../context/EventProvider'
import { GROUP_INFO } from './query'
import { useQuery } from '@apollo/client'
const TeacherProfileRight = () => {

   const [groupId] = useEvent()


   const { data: group } = useQuery(GROUP_INFO, {
      variables: { groupID: groupId && groupId }
   })

   console.log(group)

   return (
      <>
         {
            group && <div className="izma__teachers-profile-right">
               <div className="izma__teachers-profile-right-wrapper">
                  <p className="izma__teachers-profile-right-wrapper-id">
                     12798
                  </p>
                  <div className="izma__teachers-profile-right-wrapper-title">
                     {group.byGroupID.name}
                  </div>
                  <div className="izma__teachers-profile-right-wrapper-time-wrapper">
                     <p className="izma__teachers-profile-right-wrapper-text">
                        Boshlash:
                     </p>
                     <p className="izma__teachers-profile-right-wrapper-time">
                        {group.byGroupID.time}
                     </p>
                  </div>
                  {
                     group.byGroupID.students.map((i, key) => <div key={key} id={i.id} className="izma__teachers-profile-right-wrapper-name-wrapper">
                        <p className="izma__teachers-profile-right-wrapper-name-wrapper-name">
                           {i.name}
                        </p>
                        <p className="izma__teachers-profile-right-wrapper-name-wrapper-phone">
                           {
                              i.mainPhone.map((i, key) => <>+{i.phone} <br /></>)
                           }
                        </p>
                     </div>)
                  }

               </div>
            </div>
         }
      </>
   )
}

export default TeacherProfileRight