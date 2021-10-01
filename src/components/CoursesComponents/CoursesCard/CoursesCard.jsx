import CoursesImg from '../../../assets/Icons/courses.svg'
import { Link } from "react-router-dom";
import './CoursesCard.scss'
import { useQuery, useSubscription } from '@apollo/client';
import { COURSES, COURSE_SUBSCRIPTION } from '../../../Querys/Courses_Query';
import { useLoader } from '../../../context/Loader';
import { useEffect } from 'react';

const CoursesCard = () => {
   const [setLoading] = useLoader(true)

   const { data: courses, loading } = useQuery(COURSES)
   useEffect(() => {
      setLoading(loading)
   }, [loading])
   useSubscription(COURSE_SUBSCRIPTION, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               courses: () => {}
            }
         })
      },
   })



   return (
      <>
         <div className="izma__courses-card">
            {
               courses && courses.courses.map((e, i) => (
                  <Link key={i} to={`/coursesInner/${e.id}`}>
                     <div key={i} className="izma__courses-card-wrapper">
                        <img src={CoursesImg} alt="course img" className="izma__courses-card-img" />
                        <div className="izma__courses-card-wrapper-bottom">
                           <p className="izma__courses-card-wrapper-bottom-name">
                              {e.name}
                           </p>
                           <p className="izma__courses-card-wrapper-bottom-price">
                              {e.price} UZS
                           </p>
                        </div>
                     </div>
                  </Link>
               ))
            }
         </div>
      </>
   )
}

export default CoursesCard