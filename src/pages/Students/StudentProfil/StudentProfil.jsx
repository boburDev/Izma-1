import './StudentProfil.scss'
import StudentsProfileLeft from '../containers/StudentProfileLeft/StudentProfileLeft'
import StudentsProfileRight from '../containers/StudnetProfileRight/StudentProfileRight'
import StudentsProfileHistory from '../containers/StudentProfileHistory/StudentProfileHistory'
import TeacherProfileRight from '../../Teachers/containers/TeacherProfileRight/TeacherProfileRight'
import TeacherProfileLeft from '../../Teachers/containers/TeacherProfileLeft/TeacherProfileLeft'
import TeacherProfileCenter from '../../Teachers/containers/TeacherProfileCenter/TeacherProfileCenter'
import TeacherProfileHistory from '../../Teachers/containers/TeacherProfileHistory/TeacherProfileHistory'
import { useState } from 'react'
import { useLoader } from '../../../context/Loader'
import Loader from '../../../components/Loader/Loader'
import { useName1 } from '../../../context/NameProvider'
import { Modal } from 'antd'
import Check from '../../../components/Check/Check'
import { useCheck } from '../../../context/CheckProvider'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'
import { useNavbar } from '../../../context/NavbarProvider'
import { useEffect } from 'react'


const StudentProfile = ({ role }) => {
   const [setNavbarP] = useNavbar(true)
   const [peopleName] = useName1()
   const [toggleState, setToggleState] = useState(1);
   const [loading] = useLoader()
   const [checkOpen] = useCheck()
   const toggleTab = (index) => {
      setToggleState(index);
   };


   useEffect(() => {
      setNavbarP('/dashboard/students')
   }, [])
   
   const [, setIsModalVisibleY] = useState(false)
   const [lang] = useLang();

   const handleOkY = () => {
      setIsModalVisibleY(false)
   }

   const handleCancelY = () => {
      setIsModalVisibleY(false)
   }

   return (
      <>
         <div className="izma__students-profile-content">
            {
               loading ? <Loader /> : <></>
            }
            <div className="izma__students-profile-inner-headings">
               <h2 className="izma__finance-payment-inner-heading">
                  {peopleName && peopleName}
               </h2>
               <p className="izma__finance-payment-inner-title">

                  {
                     role === 'student' ? <>{Language[lang].students.studentInfoTitle.title}</> : <>{Language[lang].teachers.teacher.profileTeacher}</>
                  }

               </p>
            </div>

            <div className="izma__history-inner-tabs">
               <div className="bloc-tabs">
                  <button
                     className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                     onClick={() => toggleTab(1)}
                  >
                     {Language[lang].teachers.teacherInfoDetail.archiveProfile}
                  </button>
                  <button
                     className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                     onClick={() => toggleTab(2)}
                  >
                     {Language[lang].teachers.teacherInfoDetail.history}
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
                                 <StudentsProfileLeft />
                                 <StudentsProfileRight />
                              </>
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

                  <div>
                     <Modal className="check-modal" footer={null} visible={checkOpen && checkOpen.check} onOk={handleOkY} onCancel={handleCancelY}>
                        <Check
                           handleCancelY={handleCancelY}
                           handleOkY={handleOkY}
                        />
                     </Modal>
                  </div>

               </div>
            </div>

         </div>
      </>
   )
}

export default StudentProfile