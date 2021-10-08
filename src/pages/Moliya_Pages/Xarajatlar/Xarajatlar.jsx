import './Xarajatlar.scss'
import FinanceCostsImg from '../../../assets/Icons/finance-dolor-icon.svg'
import { DatePicker, } from "antd"
import XarajatlarForm from './containers/XarajatlarForm/XarajatlarForm'
import { useEffect, useState } from 'react'
import { useQuery, useSubscription } from '@apollo/client'
import { FILTER_DATA, HARAJATLAR, SUBSCRIP_HARAJAT } from '../../../Querys/Finance_All'
import TTable from '../../../components/Table/TTable'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'

const Xarajatlar = () => {
   const [dateFilter, setDateFilter] = useState([])
	const [dateFilterDefaultData,setDateFilterDefaultData] = useState({})
	const [dateFilterValue, setDateFilterValue] = useState({})
	const { RangePicker } = DatePicker
   const [amount,setAmount] = useState(0)
   const [cost,setCost] = useState([])
   const [lang] = useLang()
   
	const { data: filterCost } = useQuery(FILTER_DATA, {
		variables: Object.keys(dateFilterValue).length ? dateFilterValue : dateFilterDefaultData
	})

   const { data: costs } = useQuery(HARAJATLAR)

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
      if (filterCost && filterCost.harajatlarFilter && filterCost.harajatlarFilter.sum) {
         setAmount(filterCost && filterCost.harajatlarFilter.sum)
      }

   },[filterCost])

   useEffect(()=>{
      if (costs && costs.harajatlar) {
         setCost(costs && costs.harajatlar)
      }
   },[costs])

   useSubscription(SUBSCRIP_HARAJAT, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               harajatlar: () => { }
            }
         })
      },
   })

   return (
      <div className="dwBox">
         <div className="dw">
            <div className="izma__finance-costs">
               <div className="izma__finance-costs-headings">
                  <h3 className="izma__finance-costs-heading">
                     {Language[lang].finance.costs.costsTitle}
                  </h3>
                  <h4 className="izma__finance-costs-title">
                     {Language[lang].finance.costs.financeCost}
                  </h4>
               </div>
               <div className="izma__finance-allpayment-up-dates-texts">
                  <p className="izma__finance-allpayment-up-dates-text">
                     {Language[lang].finance.startDay}
                  </p>
                  <p className="izma__finance-allpayment-up-dates-text izma__finance-allpayment-up-dates-text-s">
                  {Language[lang].finance.endDay}
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
                  {Language[lang].finance.filter.filterTitle}
                  </button>
                  </div>


               <div className="izma__finance-costs-right-tabs-second-up">
                  <div className="izma__finance-costs-right-tabs-second-line"></div>
                  <p className="izma__finance-costs-right-tabs-second-text">
                     {Language[lang].finance.costsForPeriod.costsForPeriodTitle} {amount} UZS
                  </p>
                  <img className='izma__finance-costs-right-tabs-second-img' src={FinanceCostsImg} alt="" />
               </div>


            </div>
            <div className="izma__finance__costs" >
				<TTable arr={cost} block={"financeCostHash"} />
            </div>
         </div>
         <div className="ds">
            <XarajatlarForm />
         </div>
      </div>
   )
}



export default Xarajatlar
