import './StudentProfil.scss'
import StudentsProfileLeft from '../containers/StudentProfileLeft/StudentProfileLeft'
import StudentsProfileRight from '../containers/StudnetProfileRight/StudentProfileRight'
import StudentsProfileHistory from '../containers/StudentProfileHistory/StudentProfileHistory'


import TeacherProfileRight from '../../Teachers/containers/TeacherProfileRight/TeacherProfileRight'
import TeacherProfileLeft from '../../Teachers/containers/TeacherProfileLeft/TeacherProfileLeft'
import TeacherProfileCenter from '../../Teachers/containers/TeacherProfileCenter/TeacherProfileCenter'
import TeacherProfileHistory from '../../Teachers/containers/TeacherProfileHistory/TeacherProfileHistory'
import { useState } from 'react'

const StudentProfile = ({ role }) => {
   const [toggleState, setToggleState] = useState(1);
   const [studentName, setStName] = useState()

   const toggleTab = (index) => {
      setToggleState(index);
   };

   return (
      <>
         <div className="izma__students-profile-content">
            <div className="izma__students-profile-inner-headings">
               <h2 className="izma__finance-payment-inner-heading">
                  {studentName && studentName}
               </h2>
               <p className="izma__finance-payment-inner-title">

                  {
                     role === 'student' ? <>Talabalar | Profile | menu.1902</> : <>O’qituvchi | Profile</>
                  }

               </p>
            </div>

            <div className="izma__history-inner-tabs">
               <div className="bloc-tabs">
                  <button
                     className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                     onClick={() => toggleTab(1)}
                  >
                     Profile
                  </button>
                  <button
                     className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                     onClick={() => toggleTab(2)}
                  >
                     Tarix
                  </button>


               </div>

               <div className="content-tabs">
                  <div
                     className={toggleState === 1 ? "content  active-content" : "content"}
                  >
                     <div className="izma__students-profile-center-wrapper">


                        {
                           role === 'student' ?
                              <>
                                 <StudentsProfileLeft stName={stname => setStName(stname)} />
                                 <StudentsProfileRight /></>
                              :
                              <>
                                 <TeacherProfileLeft />
                                 <TeacherProfileCenter />
                                 <TeacherProfileRight />
                              </>
                        }


                     </div>

                  </div>

                  <div
                     className={toggleState === 2 ? "content  active-content" : "content"}
                  >

                     {
                        role === 'student' ?
                           <>
                              <StudentsProfileHistory />
                           </>
                           :
                           <>
                              <TeacherProfileHistory />
                           </>
                     }

                  </div>



               </div>
            </div>

         </div>
      </>
   )
}

export default StudentProfile