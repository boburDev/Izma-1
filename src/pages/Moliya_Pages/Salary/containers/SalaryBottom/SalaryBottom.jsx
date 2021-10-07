import '../SalaryUpTable/SalaryUpTable.scss'
import { CHECK_TEACHER } from '../SalaryUp/query'
import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import TTable from '../../../../../components/Table/TTable'

const SalaryBottom = () => {

   const {data: checkSumm} = useQuery(CHECK_TEACHER, {variables: {text: 'text'}})
   const [salaries, setSalaries] = useState([])

   useEffect(() => {


      if (checkSumm && checkSumm.checksCollegues) {
         console.log(checkSumm.checksCollegues)
         setSalaries(checkSumm.checksCollegues)
      }

   }, [checkSumm])



   return (
      <>
         <div className="izma__finance-salary-bottom-wrapper">
            <div className="izma__finance__salary-table" >
               <TTable arr={salaries} block={"settingsHashRooms"} />
            </div>
         </div>
      </>
   )
}


export default SalaryBottom
