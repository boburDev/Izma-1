import { useEffect, useState } from 'react'
import './FinanceTable.scss'
import { useQuery } from '@apollo/client'
import TTable from '../../../../../components/Table/TTable'
import { FINANCE_STUDENT_TABLE } from '../../../../../Querys/Finance_All'

const FinanceTable = () => {
   const [data,setData] = useState([])
   const { data: finanveStudents } = useQuery(FINANCE_STUDENT_TABLE)

   useEffect(()=>{
      if (finanveStudents && finanveStudents.financeStudentsList) {
         setData(finanveStudents && finanveStudents.financeStudentsList)
      }
   },[finanveStudents])

   return (
      <div className="izma__finance-table" >
         <TTable arr={data} block={'financeHash'} />
      </div>
   )
}

export default FinanceTable