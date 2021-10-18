import './PaymentGroups.scss'
import FinanceCostsImg from '../../../assets/Icons/008-dollar.svg'
import TTable from '../../../components/Table/TTable'
import { GROUPS_COURSES } from '../../../Querys/Finance_All'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { useLang } from '../../../context/LanguageProvider'
import Language from '../../../lang/index'
import axios from 'axios'

const PaymentGroups = ({ api = true}) => {
	
	// const {data: GrCrTchh} = useQuery(GROUPS_COURSES)
	const [GrCrTch, setGrCrTch] = useState([])
	const [state,setState] = useState([])
	const [lang] = useLang()

	// console.log(GrCrTchh)

	const route = api ? 'http://localhost:4000' : 'https://api.triiipple.uz'

	useEffect(()=>{
		;(async()=>{
			try {
				const res = await axios.get(route + '/courses', {
				headers: {
					'Authorization': localStorage.getItem('token')
				}
				})
				// console.log(res.data)
				setGrCrTch(res.data)
			} catch (error) {
				console.log(error)
			}
		})()
	},[route])



	useEffect(() => {
		const grDataArr = []

		// console.log(GrCrTch.length !== 0 && GrCrTch)
		
		GrCrTch.length && GrCrTch.map(item => {
			item.groups.map(sub => {
				let sale = 0
				let count = []
				sub.students.map((st) => {
					sale += Number(st.groupSale)
					if (st.groupStatus !== 2) {
						count.push(st)
					}
					return ''
				})
				
				const grData = {
					groups: sub?.name,
					teachers: sub?.teacher,
					courses: item?.name,
					price: item?.price,
					sale: sale,
					notStatus_2_count: count.length
				}
				
				grDataArr.push(grData)
				return 's'
			})
			
			return 't'
		})
		setState(grDataArr)
	}, [GrCrTch]);
	
	
	// console.log(GrCrTch)
	
	return (
		<>
		<div className="izma__finance-payment-groups">
		<div className="izma__finance-payment-groups-headings">
		<h3 className="izma__finance-payment-groups-heading">
		{Language[lang].finance.paymentGroup.paymentGroupTitle}
		</h3>
		<h4 className="izma__finance-payment-groups-title">
		{Language[lang].finance.financeTitle} | {Language[lang].finance.paymentGroup.paymentGroupTitle}
		</h4>
		</div>
		<div className="izma__finance-payment-right-tabs-second-up">
		<p className="izma__finance-payment-right-tabs-second-text">
		{Language[lang].finance.paymentGroup.incomeForPeriod} 2021.08.01 - 2021.08.31: 750,000 so'm
		</p>
		<img className='izma__finance-payment-right-tabs-second-img' src={FinanceCostsImg} alt="" />
		</div>
	
		
		<div className="izma__finance-payment-groups-table-wrapper">
		<h4 className="izma__finance-payment-groups-table-wrapper-heading">
			{Language[lang].finance.orderInfoGroup.orderInfoTitle}
		</h4>
		<TTable arr={state} block={"financeGroupHash"} />
		</div>
		
		
		</div>
		</>
		
		)
	}
	
	
	export default PaymentGroups;
	