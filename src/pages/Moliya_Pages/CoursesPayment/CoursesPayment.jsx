import './CoursesPayment.scss'
import FinanceCostsImg from '../../../assets/Icons/008-dollar.svg'
import OrderDetails from '../../../components/MoliyaComponents/OrderDetelis/OrderDetails'

const CoursesPayment = () => {
   


    
    


   return (
      <>
         <div className="izma__finance-payment-groups">
            <div className="izma__finance-payment-groups-headings">
               <h3 className="izma__finance-payment-groups-heading">
                  Kurs To’lovlari
               </h3>
            </div>
            <div className="izma__finance-payment-right-tabs-second-up">
               <p className="izma__finance-payment-right-tabs-second-text">
                  Davr uchun tushumlar 2021.10.01 - 2021.10.01: 0 so'm
               </p>
               <img className='izma__finance-payment-right-tabs-second-img' src={FinanceCostsImg} alt="" />
            </div>

            <OrderDetails />
         </div>
      </>

   )
}

export default CoursesPayment
