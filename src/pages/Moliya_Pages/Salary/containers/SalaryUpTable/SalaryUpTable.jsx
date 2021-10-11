import './SalaryUpTable.scss'
import { CHECK_TEACHER, TEACHER_SALARY_TYPE, SUBSCRIP_SALARY } from '../SalaryUp/query'
import { useQuery, useSubscription } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useLang } from '../../../../../context/LanguageProvider'
import Language from '../../../../../lang/index'

const SalaryUpTable = (props) => {
   const [data, setData] = useState([])
   const [someArr, setSomeArr] = useState([])
   const [salary, setSalary] = useState([])
   const [lang] = useLang()

   const {data: teachSalary} = useQuery(TEACHER_SALARY_TYPE)
   const {data: checkSumm} = useQuery(CHECK_TEACHER, {variables: {text: 'text'}})

   useSubscription(SUBSCRIP_SALARY, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               colleguagesSalary: () => { }
            }
         })
      },
   })

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
         title: Language[lang].finance.secondSettingsSalary.teacher,
         dataIndex: 'teacher',
         key: 'teacher',
      },
      {
         title: Language[lang].finance.secondSettingsSalary.methodCount,
         dataIndex: 'discountsdew',
         key: 'discountsdew',
      },
      {
         title: Language[lang].navigation.allPayments,
         dataIndex: 'Jamit',
         key: 'Jamit',
      },
      {
         title: Language[lang].finance.select.salary,
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
                           <h5 className="information" key={i}>{title.title}</h5>
                     ))
                  }
               </div>

               <div className="main_infor">
                  {
                     someArr.map((item, i) => (
                        <div key={i} className="information">
                           <h5>{item.teacher}</h5>
                           <h5>{item.discount}</h5>
                           <h5>{item.allPay}</h5>
                           <h5>{item.salary}</h5>
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







