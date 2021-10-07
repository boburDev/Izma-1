import './SalaryUpTable.scss'
import { CHECK_TEACHER, TEACHER_SALARY_TYPE } from '../SalaryUp/query'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'


const SalaryUpTable = (props) => {
   const [data, setData] = useState([])
   const [someArr, setSomeArr] = useState([])
   const [salary, setSalary] = useState([])

   const {data: teachSalary} = useQuery(TEACHER_SALARY_TYPE)
   const {data: checkSumm} = useQuery(CHECK_TEACHER, {variables: {text: 'text'}})


   useEffect(() => {
      if (teachSalary?.colleguagesSalary && checkSumm?.checksCollegues) {
         setData(teachSalary?.colleguagesSalary)
         setSalary(checkSumm?.checksCollegues)

         data.length && props.info(data)
      }

   }, [teachSalary, checkSumm, data, props])

   useEffect(() => {

      if (data.length) {
         const newData = data.map(i => {
            const allPayment = salary.filter(p => p.id === i.teacherID)
            const data = {
               teacher: i.teacherName,
               discount: i.type === 1 ? i.amount + ' Sum' : i.amount + '% Foizga',
               allPay: allPayment[0].summa,
               salary: (i.type === 2 && allPayment[0].summa !== 0 && Math.ceil(allPayment[0].summa / 100 * i.amount, 1)) || (i.type === 1 && i.amount + ' Sum') || 0
            }
            return data
         })
         setSomeArr(newData)
      }

   }, [data, salary])

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
      {
         title: 'Jami to\'lov',
         dataIndex: 'Jamit',
         key: 'Jamit',
      },
      {
         title: 'Oylik maosh',
         dataIndex: 'maosh',
         key: 'maosh',
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
                           <span >{item.allPay}</span>
                           <span >{item.salary}</span>
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







