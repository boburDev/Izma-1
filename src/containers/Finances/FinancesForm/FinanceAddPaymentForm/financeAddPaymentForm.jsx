import './financeAddPaymentForm.scss'
import CloseBtn from '../../../../assets/Icons/Group 26.svg'
import { Form, Input,  DatePicker, AutoComplete, } from "antd";
import { useEffect, useState } from 'react';
import { Radio } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { CHECK_CASH, NEW_CASH, UPDATE_CASH, HISTORY_PAYMENT, STATUS_3_4, STUDENT_GROUPS, CREATE_CHECK, SUBSCRIPTION_CHECK, UPDATE_GR_STATUS, COUNT } from '../../../../Querys/FinanceAddPayForm_Query';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import DropSearch from '../../../../components/DropSearch/DropSearch';
import { useCheck } from '../../../../context/CheckProvider';


const FinanceAddPaymentForm = ({ onClose, studenID }) => {
  
  const [payType, setPayType] = useState(1)
  const [ammountt, setAmmoun] = useState()
  const [payedData, setPayedData] = useState('')
  const [comment, setComment] = useState(null)
  const [names, setNames] = useState([])
  const [data, setData] = useState({})
  const [setCheck] = useCheck(true)

  const [groups, setGroups] = useState()


  useSubscription(SUBSCRIPTION_CHECK, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
      cache.modify({
        fields: {
          checksCounts: () => {}
        }
      })
    },
  })

  const someFunc = ()=>{
    onClose()
  }

  const {data: forCheck} = useQuery(CHECK_CASH, {
		variables: {stID: studenID && studenID.studentID}
	})

  const {data: stGroups} = useQuery(STUDENT_GROUPS, {
		variables: {id: studenID && studenID.studentID}
	})

  const { data: count } = useQuery(COUNT)

  const [newCash] = useMutation(NEW_CASH)
  const [newHistoryPay] = useMutation(HISTORY_PAYMENT)
  const [updateCash, {data: payment}] = useMutation(UPDATE_CASH)
  const [CheckBalanc] = useMutation(STATUS_3_4)
  const [newCheck] = useMutation(CREATE_CHECK)
  const [SetStatus3_4] = useMutation(UPDATE_GR_STATUS)


  const test = ((forCheck && Number(forCheck.studentCash.cashAmount) <= 0) && (payment && Number(payment.updateCash.cashAmount) > -1))


  useEffect(() => {
    setGroups(stGroups)
	console.log(stGroups);
  }, [stGroups])

  if (test) {
	CheckBalanc({variables: {
	  stID: studenID && studenID.studentID,
	  status: 3
	}})

  	SetStatus3_4({variables: {status: 3, stID: studenID.studentID}})
  }


  if (forCheck && forCheck.studentCash.cashAmount < '0') {
	localStorage.setItem(studenID && studenID.studentID, JSON.stringify(forCheck && forCheck.studentCash.cashAmount))
  }

  if (forCheck && forCheck.studentCash.cashAmount >= '0') {
	localStorage.removeItem(studenID && studenID.studentID)
  }

  useEffect(()=>{
    if (stGroups && stGroups.student && stGroups.student.groups){
        setNames(stGroups.student.groups)
    }
}, [stGroups])
  
  const onChange = e => {
    setPayType(e.target.value);
  };

  console.log(names)

    return (
        <>
        <div className="izma__courses__form-bolim">
        <Form className="izma__courses__form-bolim-form"  style={{ width: 400 }}>
        <div className="izma__courses__form-bolim-form-up">
                    <h3 className='izma__courses__form-bolim-form-heading' >To’lov qo’shish</h3>
                    <button className="izma__courses__form-bolim-form-close-btn" onClick={onClose} >
                        <img className="izma__courses__form-bolim-form-img" src={CloseBtn} alt="img"  />
                    </button>
                </div>
                <div className="izma__courses__form-bolim-line"></div>

          <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
            <label className='izma__courses__form-bolim-form-label'>Ism</label>
            <Input className={"section_name_input"}  name={"nomi"} value={studenID && studenID.studentName} />
          </div>
          <div className="form_group">
          <p className='izma__finance-form-radio-heading'>To'lov usuli</p>
          <Radio.Group onChange={onChange} className='izma__finance-form-radio' value={payType}>
          
      <Radio value={1}>Naqt pul</Radio>
      <Radio value={2}>UZCARD</Radio>
      <Radio value={3}>Bank hisobi</Radio>
    </Radio.Group>
          </div>
          <div className="form_group" style={{ width: "100%" }}>
            <label className='izma__courses__form-bolim-form-label'>Miqdor</label>
            <Input className={"section_name_input"}  name={"nomi"} onChange={e => setAmmoun(e.target.value)}/>
              <label className='izma__courses__form-bolim-form-label'>Group</label>
              <DropSearch
                arr={groups && groups.student.groups}
                pInput={'Variantlarni tanlang'}
                fnc={setData}
              />
          </div>
          <div className="form_group">
          <label>Қабул қилинган сана</label>
       
          <DatePicker
          className='date__picker'
            onChange={(value, dateString) => setPayedData({
            payed: dateString,
            payed_at: value._d
            
          })
        }
            placeholder={"Kun-Oy-Yil"}
            format={"DD-MM-YYYY"}/>
          </div>
          <div className="form_group izma__form__teaxtarea" style={{ width: 400 }}>
            <label>Izoh</label>
            <TextArea
              className={"section_name_input"}
              name={"description"}
              autoSize
              onChange={e => setComment(e.target.value)}
            />
          </div>
        </Form>
          <button className="izma__courses__form-bolim-form-button" onClick={() => {
            
            const cache = {
              stID: studenID.studentID,
              stName: studenID.studentName,
              cashAmm: ammountt,
              comment: comment,
              type: payType,
              payed: payedData.payed,
              payed_at: payedData.payed_at,
            }

            const upCash = {
              stID: studenID.studentID,
              cashAmm: String((ammountt - 0) + (forCheck && forCheck.studentCash.cashAmount - 0)),
              comment: comment,
              type: payType,
              payed: payedData.payed
            }
            
            if (!forCheck) {
              newCash({variables: cache})
            }
            if(forCheck){
              updateCash({variables: upCash}) 
            }

            const historyPay = {
              debit: ammountt,
              comment: comment,
              paymentType: payType,
              studentID: studenID.studentID,
              payedAt: payedData.payed
            }

            if (localStorage.getItem(studenID && studenID.studentID)) {
    
              const credit = String(-(JSON.parse(localStorage.getItem(studenID && studenID.studentID))))

              if (Number(credit) >= Number(ammountt)) {
                
                newHistoryPay({variables: {
                  debit: ammountt,
                  credit: ammountt,
                  comment: comment,
                  paymentType: payType,
                  studentID: studenID.studentID,
                  payedAt: payedData.payed
                }})
				
              } else {
                newHistoryPay({variables: {
                  debit: ammountt,
                  credit: credit,
                  comment: comment,
                  paymentType: payType,
                  studentID: studenID.studentID,
                  payedAt: payedData.payed
                }})
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
            teacherName: data.teacher,
            groupId: data.key,
            groupName: data.value,
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
		      }}>
		Yarating
		</button>
		</div>
		
		
		
		</>
	)
}
	export default FinanceAddPaymentForm