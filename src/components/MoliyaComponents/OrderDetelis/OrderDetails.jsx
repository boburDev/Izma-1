import { useQuery } from '@apollo/client'
import { COURSES_INFO } from '../../../Querys/Finance_All'
import './OrderDetails.scss'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'

const OrderDetails = () => {
   
   const { data: infoCourse } = useQuery(COURSES_INFO)

   const someArr = []
   let total = 0
   const [lang] = useLang()

   infoCourse && infoCourse.courses.map(course => {

       let countStudent = 0

       const cr = course.groups.map(group => countStudent += group.studentsCount )
       const data = {
           title: course.name,
           price: Number(countStudent) * course.price
       }
       someArr.push(data)
       return cr
   })

   someArr && someArr.map(i => total += i.price)


   return (
      <div className="orderDetails">
         <div className="heading">
            <h1>{Language[lang].finance.orderInfoGroup.orderInfoTitle}</h1>
         </div>

         <div className="main_order">
            <div className="main_heading">
               <h1>{Language[lang].finance.orderInfoGroup.courses}</h1>
               <h1>{Language[lang].finance.orderInfoGroup.currency}</h1>
            </div>

            <div className="main_infor">
               {
                  someArr.map((item, i) => (
                     <div key={i} className="information">
                        <p>{item.title}</p>
                        <span>{item.price}</span>
                     </div>
                  ))
               }
            </div>

            <div className="total_nfo">
               <div className="sub_price">
                  <span>Total</span>
                  <span>{total}</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default OrderDetails