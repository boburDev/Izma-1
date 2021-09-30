import './CoursesPayment.scss'
import FinanceCostsImg from '../../../assets/Icons/008-dollar.svg'
import OrderDetails from '../../../components/MoliyaComponents/OrderDetelis/OrderDetails'



// import FinanceDollarImg from '../../../assets/Icons/finance-dolor-icon.svg'
// import FinanceAllpaymentsTable from '../financeAllpaymentsTable/financeAllpaymentsTable'
// import FinanceGraph from '../financeGraph/financeGraph'
import { DatePicker, } from "antd"
import { FINANCE_STUDENT, FINANCE_STUDENT_FILTER } from '../../../Querys/Finance_All'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const CoursesPayment = () => {
   

   const { RangePicker } = DatePicker
    const [date,setDate] = useState('')
    const [dateFilterDefaultData,setDateFilterDefaultData] = useState({})
    const [dateFilter, setDateFilter] = useState([])
    const [dateFilterValue, setDateFilterValue] = useState({})

    const { data: financeStudent } = useQuery(FINANCE_STUDENT)
    


    useEffect(()=>{
        const date = new Date()

        const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
        const month = (date.getMonth() + 1) >= 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`
        console.log(date.getMonth());
        const year = date.getFullYear()

        setDateFilterDefaultData({
            startDate: `${year}-${month}-01`,
            endDate: `${year}-${month}-${day}`
        })
        setDate(`${year}.${month}.01 - ${year}.${month}.${day}`)
    },[])


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
                  Davr uchun tushumlar {date}: 750,000 so'm
               </p>
               <img className='izma__finance-payment-right-tabs-second-img' src={FinanceCostsImg} alt="" />
            </div>

            <div className="izma__finance-payment-groups-center">
               <div className="izma__finance-payment-groups-center-id-wrappers">
                  <div className="izma__finance-payment-groups-center-id-text">
                     ID
                  </div>
                  <div className="izma__finance-payment-groups-center-id-number">
                     13119
                  </div>
               </div>

               <div className="izma__finance-payment-groups-center-date-wrappers">
                  <div className="izma__finance-payment-groups-center-date-text">
                     Sanadan boshlab
                  </div>
                  <div className="izma__finance-payment-groups-center-date-number">
                     27/07/2020
                  </div>
               </div>

               <div className="izma__finance-payment-groups-center-price-wrappers">
                  <div className="izma__finance-payment-groups-center-price-text">
                     Summa
                  </div>
                  <div className="izma__finance-payment-groups-center-price-number">
                     $40.10
                  </div>
               </div>

               <div className="izma__finance-payment-groups-center-payment-wrappers">
                  <div className="izma__finance-payment-groups-center-payment-text">
                     Pul o’tkazish turi
                  </div>
                  <div className="izma__finance-payment-groups-center-payment-number">
                     payment/sum
                  </div>
               </div>

            </div>


            <OrderDetails />


         </div>
      </>

   )
}

export default CoursesPayment
