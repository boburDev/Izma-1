import './TeacherProfileRight.scss'
// import ArrowImg from '../../assets/Icons/arrow.svg'
import { useEvent } from '../../../../context/EventProvider'
import { GROUP_INFO } from './query'
import { useQuery } from '@apollo/client'
import { Drawer } from 'antd';
import { Link } from 'react-router-dom';
const TeacherProfileRight = () => {

   const [groupId] = useEvent()
   const [setGroupId] = useEvent(true)


   const closeForm = () => {
      setGroupId(undefined)
   }

   const { data: group } = useQuery(GROUP_INFO, {
      variables: { groupID: groupId && groupId }
   })

   // console.log(group);
   return (
      <>

         <Drawer
            placement="right"
            closable={false}
            onClose={closeForm}
            visible={groupId}
         >

            {group &&
               <div className="izma__teachers-profile-right-wrapper">
                  <div className="izma_teachers-profile-right-wrapper-header">
                     <span className="izma__teachers-profile-right-wrapper-id">
                        12798
                     </span>

                     <div className="burger" onClick={() => closeForm()}>
                        <span></span>
                     </div>
                  </div>

                  <div className="izma__teachers-profile-right-wrapper-title">
                  <span>{group.byGroupID.name}</span> <button>{group.byGroupID.students.length}</button>
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
                        <Link to={`/studentProfile/${i.id}`} className="izma__teachers-profile-right-wrapper-name-wrapper-name">
                           {i.name}
                        </Link>
                        <p className="izma__teachers-profile-right-wrapper-name-wrapper-phone">
                           {
                              i.mainPhone.map((i, key) => <>+{i.phone} <br /></>)
                           }
                        </p>
                     </div>)
                  }

               </div>}

         </Drawer>


      </>
   )
}

export default TeacherProfileRight