import './Xarajatlar.scss'
import FinanceCostsImg from '../../../assets/Icons/finance-dolor-icon.svg'
import { DatePicker, } from "antd"
import moment from 'moment'
import DeleteImg from '../../../assets/Icons/settings-delete.svg'
import XarajatlarForm from './containers/XarajatlarForm/XarajatlarForm'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { FINANCE_STUDENT_FILTER } from '../../../Querys/Finance_All'

const Xarajatlar = () => {
   const [dateFilter, setDateFilter] = useState([])
	const [dateFilterDefaultData,setDateFilterDefaultData] = useState({})
	const [dateFilterValue, setDateFilterValue] = useState({})
	const { RangePicker } = DatePicker
   const [amount,setAmount] = useState(0)
   
	const { data: filterCost } = useQuery(FINANCE_STUDENT_FILTER, {
		variables: Object.keys(dateFilterValue).length ? dateFilterValue : dateFilterDefaultData
	})

   useEffect(()=>{
		const date = new Date()
		
		const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
		const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`
		const year = date.getFullYear()
		
		setDateFilterDefaultData({
			startDate: `${year}-${month}-01`,
			endDate: `${year}-${month}-${day}`
		})
	},[])

   useEffect(()=>{
      if (filterCost && filterCost.financeStudentsFilter) {
         setAmount(filterCost && filterCost.financeStudentsFilter)
      }

   },[filterCost])


   const x = [
      { id: 1, name: "Qog'oz", date: '06.08.2021', type: 'Канцелярия', receiver: "INVEST qog'oz", price: '30 000', actions: '.', },
      { id: 2, name: "Qog'oz", date: '06.08.2021', type: 'Канцелярия', receiver: "INVEST qog'oz", price: '30 000', actions: '.', },
   ]


   return (
      <div className="dwBox">
         <div className="dw">
            <div className="izma__finance-costs">
               <div className="izma__finance-costs-headings">
                  <h3 className="izma__finance-costs-heading">
                     Xarajatlar
                  </h3>
                  <h4 className="izma__finance-costs-title">
                     Moliya | Xarajatlar
                  </h4>
               </div>
               <div className="izma__finance-allpayment-up-dates-texts">
                  <p className="izma__finance-allpayment-up-dates-text">
                     Sanadan boshlab
                  </p>
                  <p className="izma__finance-allpayment-up-dates-text izma__finance-allpayment-up-dates-text-s">
                     Sana bo'yicha
                  </p>
               </div>

               <div className="izma__finance-allpayment-up-dates" style={{ width: "350px" }}>
               <RangePicker
                  onChange={(e, t) => {
                     setDateFilter(t)
                  }}
                     separator
                     className={"range_picker"}
                     suffixIcon
                     format={"YYYY-MM-DD"}
                     placeholder={["2021-08-01", "2021-08-30"]}
                  />
                  <button onClick={()=>{
                        if (dateFilter.length) {
                        setDateFilterValue({
                              startDate: dateFilter[0],
                              endDate: dateFilter[1]
                           })
                        }
                  }}
                  className="izma__finance-allpayment-up-dates-btn">
                  Filtr
                  </button>
                  </div>


               <div className="izma__finance-costs-right-tabs-second-up">
                  <div className="izma__finance-costs-right-tabs-second-line"></div>
                  <p className="izma__finance-costs-right-tabs-second-text">
                     Davr uchun tushgan pul: {amount} UZS
                  </p>
                  <img className='izma__finance-costs-right-tabs-second-img' src={FinanceCostsImg} alt="" />
               </div>


            </div>
            <div className="izma__finance__costs" >

            </div>
         </div>
         <div className="ds">
            <XarajatlarForm />
         </div>
      </div>
   )
}



export default Xarajatlar
