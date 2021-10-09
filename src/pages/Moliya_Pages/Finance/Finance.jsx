import './Finance.scss'
import FinanceDollarImg from '../../../assets/Icons/finance-dolor-icon.svg'
import FinanceTable from './containers/FinanceTable/FinanceTable'
import FinanceGrafig from '../../../components/MoliyaComponents/FinanceGrafig/FinanceGrafig'
import { DatePicker, } from "antd"
import { useEffect, useState } from 'react'

import { FINANCE_STUDENT, FINANCE_STUDENT_FILTER } from '../../../Querys/Finance_All'
import { useQuery } from '@apollo/client'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'


const Finance = () => {
   const { RangePicker } = DatePicker
   const [date,setDate] = useState('')
   console.log(date, 111)
   const [amont,setAmount] = useState(0)
   const [amontFilter,setAmountFilter] = useState(0)
   const [dateFilterDefaultData,setDateFilterDefaultData] = useState({})
   const [dateFilter, setDateFilter] = useState([])
   const [dateFilterValue, setDateFilterValue] = useState({})

   const { data: financeStudent } = useQuery(FINANCE_STUDENT)
   const [lang] = useLang()

   

    
   const { data: financeStudentFilter } = useQuery(FINANCE_STUDENT_FILTER, {
      variables: Object.keys(dateFilterValue).length ? dateFilterValue : dateFilterDefaultData
  })

  useEffect(()=>{
      if (financeStudent && financeStudent.financeStudents) {
         setAmount(financeStudent && financeStudent.financeStudents)
      }
  },[financeStudent])
  
  useEffect(()=>{
     if (financeStudentFilter && financeStudentFilter.financeStudentsFilter) {
      setAmountFilter(financeStudentFilter && financeStudentFilter.financeStudentsFilter)
     }else {
      setAmountFilter(0)
     }
  },[financeStudentFilter])

  console.log(amontFilter)
   useEffect(()=>{
      const date = new Date()

      const day = date.getDate() > 9 ? date.getDate() : `0${date.getDate()}`
      const month = (date.getMonth() + 1) > 9 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`
      const year = date.getFullYear()

      setDateFilterDefaultData({
          startDate: `${year}-${month}-01`,
          endDate: `${year}-${month}-${day}`
      })
      setDate(`${year}.${month}.01 - ${year}.${month}.${day}`)
  },[])

   return (
      <>
         <div className="izma__finance-allpaymet">
            <h1 className="izma__finance-allpaymet-heading">
               {Language[lang].finance.financeTitle}
            </h1>
            <div className="izma__finance-allpaymet-up">
               <div className="izma__finance-allpaymet-up-left">
                  <div className="izma__finance-allpayment-up-wrapper">
                     <p className="izma__finance-allpayment-up-text">
                        {Language[lang].finance.countStudentOverSum} {amont || 0} so'm
                     </p>
                     <img className="izma__finance-allpayment-up-img" src={FinanceDollarImg} alt="dollar img" />
                  </div>

                  <div className="izma__finance-allpayment-up-wrapper">
                     <p className="izma__finance-allpayment-up-text">
                        {Language[lang].finance.receiptsForPeriod} {amontFilter || 0} so'm
                     </p>
                     <img className="izma__finance-allpayment-up-img" src={FinanceDollarImg} alt="dollar img" />
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


               </div>
               <div className="izma__finance-allpaymet-up-right">
                  <FinanceGrafig />
               </div>
            </div>
            <FinanceTable />
         </div>
      </>
   )
}
export default Finance