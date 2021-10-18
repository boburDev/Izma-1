// import { useQuery } from '@apollo/client'
// import { COURSES_INFO } from '../../../Querys/Finance_All'
import './OrderDetails.scss'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'
import { useState, useEffect, memo } from 'react'
import axios from 'axios'

const OrderDetails = ({ api = true }) => {
   
   // const { data: infoCourse } = useQuery(COURSES_INFO)
   const [infoCourse, setInfoCourse] = useState([])
   const route = api ? 'http://localhost:4000' : 'https://api.triiipple.uz'

	useEffect(()=>{
		;(async()=>{
			try {
				const res = await axios.get(route + '/courses', {
				headers: {
					'Authorization': localStorage.getItem('token')
				}
				})
				setInfoCourse(res.data)
			} catch (error) {
				console.log(error)
			}
		})()
	},[route])

   const someArr = []
   let total = 0
   const [lang] = useLang()

   infoCourse && infoCourse.map(course => {

      let countStudent = []
      let allSales = 0

      course.groups.map(group => {
         group.students.map(st => {
            st.groupStatus !== 2 && countStudent.push(st)
            allSales += Number(st.groupSale)
            return ''
         })
         return ''
      })

      const data = {
         title: course.name,
         price: countStudent.length * Number(course.price),
         allSales: allSales && 0
      }

      someArr.push(data)
      console.log('allSales', allSales)
      return ''
   })
      
   someArr && someArr.map(i => total += i.price)

   return (
      <div className="orderDetails">
         <div className="heading">
            <h1>{Language[lang].finance.orderInfoGroup.orderInfoTitle}</h1>
         </div>

         <div className="main_order">
            <div className="main_heading">
               <h1>{Language[lang].finance.orderInfoGroup.courses}</h1>
               <h1>{Language[lang].finance.orderInfoGroup.currency}</h1>
            </div>

            <div className="main_infor">
               {
                  someArr.map((item, i) => (
                     <div key={i} className="information">
                        <p>{item.title}</p>
                        <span>{new Intl.NumberFormat().format(item.price)}</span>
                     </div>
                  ))
               }
            </div>

            <div className="total_nfo">
               <div className="sub_price">
                  <span>Total</span>
                  <span>{new Intl.NumberFormat().format(total)}</span>
               </div>
            </div>
         </div>
      </div>
   )
}

export default memo (OrderDetails)