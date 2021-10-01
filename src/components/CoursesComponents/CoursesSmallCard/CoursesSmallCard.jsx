import CoursesImg from '../../../assets/Icons/courses.svg'
import './CoursesSmallCard.scss'
import { ALL_DEGREES, SUBSCRIPTION_DEGREE } from '../../../Querys/Degree';
import { useQuery, useSubscription } from '@apollo/client'
import { useParams } from 'react-router';



const CoursesSmallCard = () => {

   const { courseID } = useParams()

   const { data: allDegree } = useQuery(ALL_DEGREES, { variables: { courseID } })


   useSubscription(SUBSCRIPTION_DEGREE, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
        cache.modify({
          fields: {
              subCourses: () => {}
          }
        })
      },
    })

   return (
      <>
         <div className="izma__courses-card-small">
            {allDegree && allDegree.subCourses.map(item => (

               <div key={item.id} className="izma__courses-card-small izma__courses-card-small-wrapper" >
                  <img src={CoursesImg} alt="course img" className="izma__courses-card-small-img" />
                  <div className="izma__courses-card-small-wrapper-bottom">
                     <p className="izma__courses-card-small-wrapper-bottom-name">
                        {item.name}
                     </p>
                     <p className="izma__courses-card-small-wrapper-bottom-price">
                        {item.price && item.price + ' UZS'}
                        {!item.price && '0 UZS'}
                     </p>
                  </div>
               </div>
            ))}
         </div>
      </>
   )
}
export default CoursesSmallCard