import './financeAddPaymentForm.scss'
import CloseBtn from '../../../../assets/Icons/Group 26.svg'
import { Form, Input,  DatePicker } from "antd";
import { useEffect, useState } from 'react';
import { Radio } from 'antd';
import TextArea from "antd/lib/input/TextArea";
import { CHECK_CASH, NEW_CASH, UPDATE_CASH, HISTORY_PAYMENT, STATUS_3_4, STUDENT_GROUPS } from '../../../../Querys/Finance_Query';
import { useMutation, useQuery } from '@apollo/client';
import DropSearch from '../../../../components/DropSearch/DropSearch';

const FinanceAddPaymentForm = ({ onClose, studenID }) => {
  
  const [payType, setPayType] = useState(1);
  const [ammountt, setAmmoun] = useState()
  const [payedData, setPayedData] = useState()
  const [comment, setComment] = useState(null)
  // const [credit, setCredit] = useState(null)
  const [data, setData] = useState({})
  const [check,setCheck] = useState()
  const [groups, setGroups] = useState()
  const someFunc = ()=>{
    onClose()
  }

  const {data: forCheck} = useQuery(CHECK_CASH, {variables: {stID: studenID && studenID.studentId}})
  const {data: stGroups} = useQuery(STUDENT_GROUPS, {variables: {id: studenID && studenID.studentId}})
  const [newCash] = useMutation(NEW_CASH)
  const [newHistoryPay] = useMutation(HISTORY_PAYMENT)
  const [updateCash, {data: payment}] = useMutation(UPDATE_CASH)
  const [CheckBalanc] = useMutation(STATUS_3_4)

  const test = ((forCheck && forCheck.studentCash.cashAmount < '0') && (payment && payment.updateCash.cashAmount > -1))


  useEffect(() => {
    setGroups(stGroups)
  }, [stGroups])
  if (test) {
    CheckBalanc({variables: {
      stID: studenID && studenID.studentID,
      status: 3
    }})
    // setCredit(-(forCheck && forCheck.studentCash.cashAmount))
  }

  const onSelect = ({ key, text }) => {
	setData({
		key, text,
		data: {
			stID: studenID.studentID,
			cashAmm: ammountt,
			comment: comment,
			type: payType,
			payed: payedData,
			studenName: studenID && studenID.studentName,
			teacherName: stGroups.student.groups[0].teacher
		}
	  })
  };

  const [ names, setNames ] = useState([])

  console.log(names)

  useEffect(()=>{
    if (stGroups && stGroups.student){
        const guruh = stGroups.student.groups.map(item =>{
            return {
                key: item.id,
                value: item.name,
                text: item.name
            }
        })
		
        setNames(guruh)
    }
    // stGroups && stGroups.student.groups
}, [stGroups])

  
  const onChange = e => {
    setPayType(e.target.value);
  };
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
                fnc={onSelect}
              />
              
          </div>
          <div className="form_group">
          <label>Қабул қилинган сана</label>
       
          <DatePicker
          className='date__picker'
                onChange={(value, dateString) => {
                  setPayedData(dateString)
                }}
                placeholder={"Kun-Oy-Yil"}
            //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
              format={"DD-MM-YYYY"}
              />
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
              cashAmm: ammountt,
              comment: comment,
              type: payType,
              payed: payedData
            }

            const upCash = {
              stID: studenID.studentID,
              cashAmm: String((ammountt - 0) + (forCheck && forCheck.studentCash.cashAmount - 0)),
              comment: comment,
              type: payType,
              payed: payedData
            }
            
            if (!forCheck) {
              newCash({variables: cache})
            }
            if(forCheck){
              updateCash({variables: upCash}) 
            }

            const historyPay = {
              debit: ammountt,
              // credit: credit,
              comment: comment,
              paymentType: payType,
              studentID: studenID.studentID,
              payedAt: payedData
            }

            newHistoryPay({
              variables: historyPay
            })

            someFunc()
			console.log(check)
			setCheck({
				checkData: data,
				check: true
			  })
          }}>
          Yarating
          </button>
        </div>

        

        </>
    )
}
export default FinanceAddPaymentForm