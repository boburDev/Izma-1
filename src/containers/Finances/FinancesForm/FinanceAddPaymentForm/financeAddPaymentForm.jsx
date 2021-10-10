import './financeAddPaymentForm.scss'
import CloseBtn from '../../../../assets/Icons/Group 26.svg'
import { Form, DatePicker } from "antd"
import { Radio, Input } from 'antd'
import { useEffect, useState } from 'react'
import TextArea from "antd/lib/input/TextArea"
import { CHECK_CASH, NEW_CASH, UPDATE_CASH, HISTORY_PAYMENT, STATUS_3_4, STUDENT_GROUPS, CREATE_CHECK, SUBSCRIPTION_CHECK, UPDATE_GR_STATUS, COUNT } from '../../../../Querys/FinanceAddPayForm_Query'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import DropSearch from '../../../../components/DropSearch/DropSearch'
import { useCheck } from '../../../../context/CheckProvider'
import moment from 'moment'
import { useLang } from '../../../../context/LanguageProvider'
import Language from '../../../../lang/index'

const FinanceAddPaymentForm = ({ onClose, studenID, groupID = '' }) => {
	const [payType, setPayType] = useState(1)
	const [ammountt, setAmmoun] = useState('')
	const [payedData, setPayedData] = useState("")
	const [comment, setComment] = useState(null)
	const [names, setNames] = useState([])
	const [data, setData] = useState({})
	const [setCheck] = useCheck(true)
	const [lang] = useLang()

	const [groups, setGroups] = useState()

	// const InputVal = ({ initialValue = "", isNumber }) => {
	// 	const [value, updateValue] = useState(initialValue);

	// 	const update = (val) => {
	// 		if (isNumber) {
	// 			val = val.replace(/,/g, "");
	// 			const x = Number(val);

	// 			updateValue(x.toLocaleString());
	// 		} else {
	// 			updateValue(val);
	// 		}
	// 	};

	// 	return (
	// 		//   <input type="text" value={value} className='input' onChange={e => update(e.target.value)} />
	// 		<input defaultValue={ammountt}
	// 			autoComplete="off" className={"section_name_input"} name={"nomi"}
	// 			onChange={e => update(e.target.value)}
	// 			value={value}
	// 			// onKeyUp={e => {
	// 			// 	setAmmoun((e.target.value)
	// 			// 	// .replace(/\s/g, '')
	// 			// 	)
	// 			// 	// let money = new Intl.NumberFormat().format((e.target.value).replace(/\s/g, ''))
	// 			// 	// if (money === '0') {
	// 			// 	// 	e.target.value = ''
	// 			// 	// } else {
	// 			// 	// 	e.target.value = money
	// 			// 	// }
	// 			// }}
	// 			type="text" />
	// 	);
	// };



	useEffect(() => {

	}, [names])


	useSubscription(SUBSCRIPTION_CHECK, {
		onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
			cache.modify({
				fields: {
					checksCounts: () => { }
				}
			})
		},
	})

	const someFunc = () => {
		setPayedData("")
		setAmmoun('')
		// onClose()
	}

	const { data: forCheck } = useQuery(CHECK_CASH, {
		variables: { stID: studenID && (studenID.studentID || studenID.studentId) }
	})

	const { data: stGroups } = useQuery(STUDENT_GROUPS, {
		variables: { id: studenID && (studenID.studentID || studenID.studentId) }
	})

	const { data: count } = useQuery(COUNT)
	

	const [newCash] = useMutation(NEW_CASH)
	const [newHistoryPay] = useMutation(HISTORY_PAYMENT)
	const [updateCash, { data: payment }] = useMutation(UPDATE_CASH)
	const [CheckBalanc] = useMutation(STATUS_3_4)
	const [newCheck] = useMutation(CREATE_CHECK)
	const [SetStatus3_4] = useMutation(UPDATE_GR_STATUS)


	const test = ((forCheck && Number(forCheck.studentCash.cashAmount) <= 0) && (payment && Number(payment.updateCash.cashAmount) > -1))


	useEffect(() => {
		setGroups(stGroups)
	}, [stGroups])

	if (test) {
		CheckBalanc({
			variables: {
				stID: studenID && (studenID.studentID || studenID.studentId),
				status: 3
			}
		})
		SetStatus3_4({ variables: { status: 3, stID: (studenID.studentID || studenID.studentId) } })
	}


	if (forCheck && forCheck.studentCash.cashAmount < '0') {
		localStorage.setItem(studenID && (studenID.studentID || studenID.studentId), JSON.stringify(forCheck && forCheck.studentCash.cashAmount))
	}

	if (forCheck && forCheck.studentCash.cashAmount >= '0') {
		localStorage.removeItem(studenID && (studenID.studentID || studenID.studentId))
	}

	useEffect(() => {
		if (stGroups && stGroups.student && stGroups.student.groups) {
			if (groupID !== '') {
				for (const i of stGroups.student.groups) {
					if (i.id === groupID) {
						setData(i)
					}
				}
			} else {
				setNames(stGroups.student.groups)
			}
		}
	}, [stGroups, groupID])

	const onChange = e => {
		setPayType(e.target.value)
	}

	function formOnSubmit(e) {
		e.preventDefault()
		if (payedData !== '' && payedData.payed.length > 0) {
			const cache = {
				stID: (studenID.studentID || studenID.studentId),
				stName: studenID.studentName,
				cashAmm: ammountt,
				comment: comment,
				type: payType,
				payed: payedData.payed,
				payed_at: payedData.payed_at,
			}

			const upCash = {
				stID: (studenID.studentID || studenID.studentId),
				cashAmm: String((ammountt - 0) + (forCheck && forCheck.studentCash.cashAmount - 0)),
				comment: comment,
				type: payType,
				payed: payedData.payed
			}

			if (!forCheck) {
				newCash({ variables: cache })
			}
			if (forCheck) {
				updateCash({ variables: upCash })
			}

			const historyPay = {
				debit: ammountt,
				comment: comment,
				paymentType: payType,
				studentID: (studenID.studentID || studenID.studentId),
				payedAt: payedData.payed
			}

			if (localStorage.getItem(studenID && (studenID.studentID || studenID.studentId))) {

				const credit = String(-(JSON.parse(localStorage.getItem(studenID && (studenID.studentID || studenID.studentId)))))

				if (Number(credit) >= Number(ammountt)) {

					newHistoryPay({
						variables: {
							debit: ammountt,
							credit: ammountt,
							comment: comment,
							paymentType: payType,
							studentID: (studenID.studentID || studenID.studentId),
							payedAt: payedData.payed
						}
					})

				} else {
					newHistoryPay({
						variables: {
							debit: ammountt,
							credit: credit,
							comment: comment,
							paymentType: payType,
							studentID: (studenID.studentID || studenID.studentId),
							payedAt: payedData.payed
						}
					})
				}
				//   setCredit(credit)
			} else {
				newHistoryPay({
					variables: historyPay
				})
			}

			someFunc()

			const ddd = {
				checkNumber: count && count.checksCounts + 1,
				studentId: cache.stID,
				paymentType: cache.type === 1 ? 'Naqt pul'
					: cache.type === 2 ?
						'UZCARD' : 'Bank hisobi',
				paymentAmount: cache.cashAmm - 0,
				paymentTime: cache.payed_at,
				teachId: data.teacherID,
				teacherName: data.teacher,
				groupId: data.id,
				groupName: data.name,
				studentName: cache.stName,
				comments: cache.comment
			}

			newCheck({
				variables: ddd
			})

			setCheck({
				check: true,
				checkData: {
					...cache,
					...data,
					count: count && count.checksCounts + 1
				}
			})

			setAmmoun('')
			setPayedData("")
			setComment('')
		}


	}




	return (
		<>
			<div className="izma__courses__form-bolim">
				<Form onSubmitCapture={formOnSubmit}
				className="izma__courses__form-bolim-form"
				style={{ width: 400 }} 
				id="financeFormRes">
					<div className="izma__courses__form-bolim-form-up">
						<h3 className='izma__courses__form-bolim-form-heading' >{Language[lang].students.recordPayment.recordPaymentTitle}</h3>
						<button className="izma__courses__form-bolim-form-close-btn" onClick={onClose} >
							<img className="izma__courses__form-bolim-form-img" src={CloseBtn} alt="img" />
						</button>
					</div>
					<div className="izma__courses__form-bolim-line"></div>

					<div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
						<label className='izma__courses__form-bolim-form-label'>{Language[lang].students.recordPayment.fullName}</label>
						<Input autoComplete="off" className={"section_name_input"} name={"nomi"} value={studenID && studenID.studentName} />
					</div>
					<div className="form_group">
						<p className='izma__finance-form-radio-heading'>{Language[lang].students.recordPayment.paymentType}</p>
						<Radio.Group onChange={onChange} className='izma__finance-form-radio' value={payType}>

							<Radio value={1}>{Language[lang].students.recordPayment.cash}</Radio>
							<Radio value={2}>{Language[lang].students.recordPayment.card}</Radio>
							<Radio value={3}>{Language[lang].students.recordPayment.bankAccount}</Radio>
						</Radio.Group>
					</div>
					<div className="form_group" style={{ width: "100%" }}>
						<label className='izma__courses__form-bolim-form-label'>{Language[lang].students.recordPayment.amount}</label>
						{/* <Input initialValue={''} isNumber={true} /> */}
						<input defaultValue={ammountt}
						autoComplete="off" className={"section_name_input"} name={"nomi"}
							onKeyUp={e => {
								setAmmoun(e.target.value)
							}}
							 type="text" />

						{
							(groupID === '') && <>
								<label className='izma__courses__form-bolim-form-label'>{Language[lang].courses.courseName.groups}</label>
								<DropSearch
									arr={groups && groups.student.groups}
									pInput={Language[lang].groups.addNewGroups.chooseVariant}
									fnc={setData}
								/>
							</>
						}
					</div>
					<div className="form_group">
						<label>{Language[lang].students.recordPayment.AcceptedDate}</label>

						<DatePicker
							defaultPickerValue={payedData !== "" ? moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY") : payedData}
							className='date__picker'
							onChange={(value, dateString) => setPayedData({
								payed: dateString,
								payed_at: value._d
							})
							}
							placeholder={Language[lang].students.recordPayment.date}
							format={"DD-MM-YYYY"}

						/>
					</div>

					<div className="form_group izma__form__teaxtarea" style={{ width: 400 }}>
						<label>{Language[lang].students.recordPayment.comment}</label>
						<TextArea
							className={"section_name_input"}
							name={"description"}
							autoSize
							onChange={e => setComment(e.target.value)}
							value={comment}
						/>
					</div>
					<button className="izma__courses__form-bolim-form-button" type="submit">{Language[lang].students.recordPayment.save}</button>
				</Form>
			</div>



		</>
	)
}
export default FinanceAddPaymentForm