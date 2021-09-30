import './PaymentGroups.scss'
import FinanceCostsImg from '../../../assets/Icons/008-dollar.svg'
import TTable from '../../../components/Table/TTable'
import { GROUPS_COURSES } from '../../../Querys/Finance_All'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'

const PaymentGroups = () => {
	
	const {data: GrCrTch} = useQuery(GROUPS_COURSES)
	const [state,setState] = useState([])
	useEffect(() => {
		const grDataArr = []
		
		GrCrTch && GrCrTch.courses.map(item => {
			const t = item.groups.map((sub, i) => {
				let price = '0'
				const s = sub.students.map((st) => {
					
					const arr = []
					if (st.status !== 2) {
						arr.push(st)
					}
					price = arr.length ? arr.length * item.price : '0'
					return price
				})
				
				const grData = {
					stCount: sub.students.length, groups: sub.name, teachers: sub.teacher, courses: item.name, price: `${price}`
				}
				
				grDataArr.push(grData)
				return s
			})
			
			return t
		})
		setState(grDataArr)
	}, [GrCrTch]);
	
	
	
	return (
		<>
		<div className="izma__finance-payment-groups">
		<div className="izma__finance-payment-groups-headings">
		<h3 className="izma__finance-payment-groups-heading">
		To’lovlar guruhi
		</h3>
		<h4 className="izma__finance-payment-groups-title">
		Moliya /to’lov guruhi
		</h4>
		</div>
		<div className="izma__finance-payment-right-tabs-second-up">
		<p className="izma__finance-payment-right-tabs-second-text">
		Davr uchun tushumlar 2021.08.01 - 2021.08.31: 750,000 so'm
		</p>
		<img className='izma__finance-payment-right-tabs-second-img' src={FinanceCostsImg} alt="" />
		</div>
	
		
		<div className="izma__finance-payment-groups-table-wrapper">
		<h4 className="izma__finance-payment-groups-table-wrapper-heading">
		Order Details
		</h4>
		<TTable arr={state} block={"financeGroupHash"} />
		</div>
		
		
		</div>
		</>
		
		)
	}
	
	
	export default PaymentGroups;
	