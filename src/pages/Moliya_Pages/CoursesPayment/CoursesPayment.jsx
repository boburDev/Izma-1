import './CoursesPayment.scss'
import FinanceCostsImg from '../../../assets/Icons/008-dollar.svg'
import OrderDetails from '../../../components/MoliyaComponents/OrderDetelis/OrderDetails'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'

const CoursesPayment = ({ api }) => {
   
   const [lang] = useLang()
 
   return (
      <>
         <div className="izma__finance-payment-groups">
            <div className="izma__finance-payment-groups-headings">
               <h3 className="izma__finance-payment-groups-heading">
                  {Language[lang].finance.paymentCourses.paymentCoursesTitle}
               </h3>
            </div>
            <div className="izma__finance-payment-right-tabs-second-up">
               <p className="izma__finance-payment-right-tabs-second-text">
                {Language[lang].finance.paymentCourses.incomeForPeriod} 2021.10.01 - 2021.10.01: 0 so'm
               </p>
               <img className='izma__finance-payment-right-tabs-second-img' src={FinanceCostsImg} alt="" />
            </div>

            <OrderDetails api={ api } />
         </div>
      </>

   )
}

export default CoursesPayment
