import { useEffect, useState } from 'react'
import './FinanceTable.scss'
import { useQuery } from '@apollo/client'
import TTable from '../../../../../components/Table/TTable'
import { FINANCE_STUDENT_TABLE } from '../../../../../Querys/Finance_All'
import Check from '../../../../../components/Check/CheckById'
import { Modal } from 'antd'

const FinanceTable = () => {
   const [data,setData] = useState([])
   const { data: finanveStudents } = useQuery(FINANCE_STUDENT_TABLE)
   const [state,setState] = useState('')

   useEffect(()=>{
      if (finanveStudents && finanveStudents.financeStudentsList) {
         setData(finanveStudents && finanveStudents.financeStudentsList)
      }
   },[finanveStudents])



   return (
      <div className="izma__finance-table" >
         <Modal className="check-modal" footer={null} visible={state !== '' && state}>
               <Check
                  id={state !== '' && state}
                  setId={setState}
               />
            </Modal>


         <TTable setEditId={setState} arr={data} block={'financeHash'} />
      </div>
   )
}

export default FinanceTable