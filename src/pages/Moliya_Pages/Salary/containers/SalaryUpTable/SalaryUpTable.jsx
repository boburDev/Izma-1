import './SalaryUpTable.scss'
import { TEACHER_SALARY_TYPE } from '../SalaryUp/query'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'


const SalaryUpTable = () => {
   const [data, setData] = useState([])
   const [someArr, setSomeArr] = useState([])

   const {data: teachSalary} = useQuery(TEACHER_SALARY_TYPE)

   useEffect(() => {
      if (teachSalary && teachSalary.colleguagesSalary) {
         setData(teachSalary && teachSalary.colleguagesSalary)
      }

   }, [teachSalary])


   useEffect(() => {

      if (data.length) {
         const newData = data.map(i => {
            const data = {
               teacher: i.teacherName,
               discount: i.type === 1 ? i.amount + ' Sum' : i.amount + '% Foizga'
            }
            return data
         })
         setSomeArr(newData)
      }

   }, [data])

   const columns = [
      {
         title: "O'qituvchi",
         dataIndex: 'teacher',
         key: 'teacher',
      },
      {
         title: 'Hisoblash usuli',
         dataIndex: 'discountsdew',
         key: 'discountsdew',
      },

   ];
   return (
      <>

         <div className="izma__costs-table">
            <div className="main_order">
               <div className="main_heading">
                  {
                     columns.map((title, i) => (
                        <div key={i} className="information">
                           <h5>{title.title}</h5>
                        </div>
                     ))
                  }
               </div>

               <div className="main_infor">
                  {
                     someArr.map((item, i) => (
                        <div key={i} className="information">
                           <p>{item.teacher}</p>
                           <span >{item.discount}</span>
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
      </>
   )
}

export default SalaryUpTable;







