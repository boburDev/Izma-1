import './StudentProfileRight.scss'
import StudentsProfileTable from '../StudentProfileTable/StudentProfileTable'
import { useQuery, useSubscription } from '@apollo/client'
import { useParams } from 'react-router'
import { STUDENT_GROUPS, SUBSCRIPTION_GROUPS } from './query';
import { Link } from 'react-router-dom';
import { useLang } from '../../../../context/LanguageProvider';
import Language from '../../../../lang/index'
import { useGroup } from '../../../../context/NameProvider';
import { useNavbar } from '../../../../context/NavbarProvider';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
   Pagination
} from 'swiper/core';
import { useEffect } from 'react';
SwiperCore.use([Pagination])



const    StudentsProfileRight = () => {
   const [setNavbarP] = useNavbar(true)
   const [lang] = useLang();
   const [setGroupName] = useGroup(true)

   const { studentID } = useParams()

   const { data: Group } = useQuery(STUDENT_GROUPS, { variables: { studentID } })

   useSubscription(SUBSCRIPTION_GROUPS, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               studentGroups: () => { }
            }
         })
      },
   })

  useEffect(() => {
     setGroupName(Group && Group.studentGroups)
  }, [Group, setGroupName])
   

   return (
      <>
         <div className="izma__students-payment-inner-left-section">
            <h3 className="izma__students-payment-inner-left-section-heading">
               {Language[lang].home.blocks.groups}
            </h3>
            <div className="izma__students-payment-inner-left-section-center-wrapper ">

               {Group && !Group.studentGroups.length && <>{Language[lang].students.studentCreated.notGroup}</>}

               <Swiper
                  slidesPerView={1} spaceBetween={10}
                  modules={Pagination}
                  pagination={true}
                  centeredSlides={true}
                  grabCursor={true}
                  breakpoints={{
                     "640": {
                        "slidesPerView": 1,
                        "spaceBetween": 10
                     },
                     "768": {
                        "slidesPerView": 1,
                        "spaceBetween": 10
                     },
                     "1024": {
                        "slidesPerView": 1,
                        "spaceBetween": 30
                     }
                  }} className="mySwiper"
               >

                  {Group && Group.studentGroups.map(item => (
                     <SwiperSlide key={item.name}>
                        <div key={item.id} className="izma__students-payment-inner-left-section-center-wrapper-left izma__students-payment-inner-left-section-center-wrapper-lefts">
                           <Link to={`/groups/groupsProfil/${item.id}`} onClick={() => setNavbarP(item.id)}>
                              <div className="izma__students-payment-inner-left-section-center-wrapper-inner-left">
                                 <p className="izma__students-payment-inner-left-section-center-wrapper-left-id">
                                    {item.name}
                                 </p>
                                 <p className="izma__students-payment-inner-left-section-center-wrapper-left-name">
                                    {item.courseName && item.courseName}
                                    {!item.courseName && 'Hozircha kurs tanlanmagan'}
                                 </p>
                              </div>
                              <div className="izma__students-payment-inner-left-section-center-wrapper-inner-right">
                                 <p className="izma__students-payment-inner-left-section-center-wrapper-left-date">
                                    {item.time}
                                 </p>
                                 <p className="izma__students-payment-inner-left-section-center-wrapper-left-days">
                                    {item.days}
                                 </p>
                              </div>
                           </Link>
                        </div>
                     </SwiperSlide>
                  ))}
               </Swiper>

               


            </div>
            <h3 className="izma__students-payment-inner-left-section-bottom-heading">
               {Language[lang].students.payment.paymentTitle}
            </h3>
            <StudentsProfileTable />  
         </div>
      </>
   )
}
export default StudentsProfileRight