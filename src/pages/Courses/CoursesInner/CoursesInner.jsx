
import './CoursesInner.scss'
import CoursesImg from '../../../assets/Icons/courses.svg'
import CoursesTabs1 from '../containers/CoursesInner_Tabs/CoursesInner_Tab1/CoursesInner_Tab1';
import CoursesTabs2 from '../containers/CoursesInner_Tabs/CoursesInner_Tab2/CoursesInner_Tab2';
import CoursesTabs3 from '../containers/CoursesInner_Tabs/CoursesInner_Tab3/CoursesInner_Tab3';
import CoursesFormMain from '../containers/CoursesFormMain/CoursesFormMain';
import { useState, useEffect} from 'react';
import { Drawer, } from 'antd';
import { useParams, Redirect } from 'react-router-dom';
import { BY_COURSE_ID, DELETE_BY_COURSE_ID, COURSE_SUBSCRIPTION } from '../../../Querys/Courses_Query';
import { useQuery, useMutation, useSubscription } from '@apollo/client';
import { useLoader } from '../../../context/Loader';

const CoursesInner = () => {
   const [setLoading] = useLoader(true)

   const { courseID } = useParams()
   const { data: courses, loading } = useQuery(BY_COURSE_ID, {
      variables: { courseID }
   })

   useSubscription(COURSE_SUBSCRIPTION, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               courses: () => {}
            }
         })
      },
   })

   useEffect(() => {
      setLoading(loading)
   }, [loading])



   const [Delete_course, { data: deleted_data }] = useMutation(DELETE_BY_COURSE_ID)


   const [visible, setVisible] = useState(false);

   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };

   const [toggleState, setToggleState] = useState(1);

   const toggleTab = (index) => {
      setToggleState(index);
   };

   if (deleted_data) return <Redirect to='/courses' />
   return (
      <>
         {
            courses && courses.byCourseID.map((e, i) => (
               <div key={i} className="izma__courses__inner-content">
                  <div className="izma__courses__inner-content-up">
                     <h2 className="izma__courses__inner-content-up-heading">
                        {e.name}
                     </h2>
                     <h3 className="izma__courses__inner-content-up-title">
                        Kurslar
                     </h3>
                  </div>
                  <div className="izma__students-content-center">
                     <div className="izma__students-content-line">

                     </div>
                  </div>
                  <div className="izma__courses__inner-content-bottom">
                     <div className="izma__courses-card-wrappers"   >
                        <img src={CoursesImg} alt="course img" className="izma__courses-card-img" />
                        <div className="izma__courses-card-wrapper-bottom">
                           <p className="izma__courses-card-wrapper-bottom-name">
                              {e.name}
                           </p>
                           <div className="izma__courses-card-wrapper-bottom-wrapper">
                              <p className="izma__courses-card-wrapper-bottom-prices">
                                 {e.price} UZS
                              </p>
                              <div className="izma__courses-card-wrapper-bottom-btn-wrapper">
                                 <button className='izma__courses-card-wrapper-bottom-btn-wrapper-btn izma__courses-card-wrapper-bottom-btn-wrapper-btn-edit' onClick={showDrawer}>

                                 </button>
                                 <button className='izma__courses-card-wrapper-bottom-btn-wrapper-btn izma__courses-card-wrapper-bottom-btn-wrapper-btn-del' onClick={() => {
                                    Delete_course({ variables: { id: courseID } })
                                 }}>

                                 </button>
                              </div>
                           </div>
                           <Drawer
                              placement="right"
                              closable={false}
                              onClose={onClose}
                              visible={visible}
                           >
                              <CoursesFormMain onClose={onClose} />
                           </Drawer>
                        </div>
                     </div>
                     <div className="izma__groups-inner-tabs">
                        <div className="bloc-tabs">
                           <button
                              className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                              onClick={() => toggleTab(1)}
                           >
                              Online darslar va materiallar
                           </button>
                           <button
                              className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                              onClick={() => toggleTab(2)}
                           >
                              Darajalar
                           </button>
                           <button
                              className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                              onClick={() => toggleTab(3)}
                           >
                              Guruhlar
                           </button>

                        </div>

                        <div className="content-tabs">
                           <div
                              className={toggleState === 1 ? "content  active-content" : "content"}
                           >
                              <CoursesTabs1 />

                           </div>

                           <div
                              className={toggleState === 2 ? "content  active-content" : "content"}
                           >
                              <CoursesTabs2 />

                           </div>

                           <div
                              className={toggleState === 3 ? "content  active-content" : "content"}
                           >

                              <CoursesTabs3 />

                           </div>

                        </div>
                     </div>

                  </div>
               </div>
            ))
         }
      </>
   )
}

export default CoursesInner