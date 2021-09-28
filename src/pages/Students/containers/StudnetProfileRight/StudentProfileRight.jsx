import './StudentProfileRight.scss'
import StudentsProfileTable from '../StudentProfileTable/StudentProfileTable'
import { useQuery, useSubscription } from '@apollo/client'
import { useParams } from 'react-router'
import { STUDENT_GROUPS, SUBSCRIPTION_GROUPS } from './query';
import { Link } from 'react-router-dom';



const StudentsProfileRight = () => {

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

   return (
      <>
         <div className="izma__students-payment-inner-left-section">
            <h3 className="izma__students-payment-inner-left-section-heading">
               Guruhlar
            </h3>
            <div className="izma__students-payment-inner-left-section-center-wrapper ">

               {Group && !Group.studentGroups.length && <>Hozirda Guruhlar va Kurslar yo'q</>}


               {Group && Group.studentGroups.map(item => (

                  // {console.log(item) }
                  <div key={item.id} className="izma__students-payment-inner-left-section-center-wrapper-left izma__students-payment-inner-left-section-center-wrapper-lefts">
                     <Link to={`/groupsInner/${item.id}`}>
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
               ))}


            </div>
            <h3 className="izma__students-payment-inner-left-section-bottom-heading">
               To'lovlar
            </h3>
            <StudentsProfileTable />  
         </div>
      </>
   )
}
export default StudentsProfileRight