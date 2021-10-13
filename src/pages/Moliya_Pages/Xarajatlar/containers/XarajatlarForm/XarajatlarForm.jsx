import './XarajatlarForm.scss'
import { Form, Input, DatePicker, Select } from "antd";
import { NEW_HARAJAT } from '../../../../../Querys/Finance_All'
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useLang } from '../../../../../context/LanguageProvider';
import Language from '../../../../../lang/index'
const { Option } = Select

const XarajatlarForm = () => {

   const [name, setName] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [buyer,setBuyer] = useState('')
    const [sum, setSum] = useState(0)
    const [lang] = useLang()
    
	const [newCost] = useMutation(NEW_HARAJAT)

   return (
      <>
         <div className="izma__finance-cost__form-bolim">
            <Form id="xarajatFormRes" className="izma__finance-cost__form-bolim-form" style={{ width: 300 }}>
               <div className="izma__finance-cost__form-bolim-form-up">
                  <h3 className='izma__finance-cost__form-bolim-form-heading' >{Language[lang].finance.newCosts.newCostsTitle}</h3>
               </div>

               <div className="form_group izma__finance-cost__form-bolim-form-center" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>{Language[lang].finance.newCosts.name}</label>
                  <Input autoComplete="off"  onKeyUp={e => setName(e.target.value)} className={"section_name_input"} name={"nomi"} />
               </div>

               <div className="form_group">
                  <label>{Language[lang].finance.newCosts.recievedDate}</label>

                  <DatePicker
                     className='date__picker'
					 onChange={(value) => setSelectedDate(value._d)}
                     placeholder={Language[lang].teachers.addNewUser.date}
                     format={"DD-MM-YYYY"}
                  />
               </div>
               <div className="form_group" style={{ width: 300 }}>
                  <label>{Language[lang].finance.newCosts.type}</label>
                  <Select onSelect={e => setSelectValue(e)} defaultValue={Language[lang].home.tabels.others}>
                     <Option value={"Выбрать"}>{Language[lang].finance.select.selectTitle}</Option>
                     <Option value={"Административный расход"}>{Language[lang].finance.select.administrativeExpenses}</Option>
                     <Option value={"Аренда"}>{Language[lang].finance.select.rent}</Option>
                     <Option value={"Зарплаты"}>{Language[lang].finance.select.salary}</Option>
                     <Option value={"Инвестиции"}>{Language[lang].finance.select.invest}</Option>
                     <Option value={"Канцелярия"}>{Language[lang].finance.select.tools}</Option>
                     <Option value={"Налоги"}>{Language[lang].finance.select.taxes}</Option>
                     <Option value={"Хозяйственный расходы"}>{Language[lang].finance.select.operatingExpenses}</Option>
                  </Select>
               </div>

               <div className="form_group" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>{Language[lang].finance.newCosts.recipient}</label>
                  <Input autoComplete="off"  onKeyUp={e => setBuyer(e.target.value)}
				  className={"section_name_input"} name={"nomi"} />
               </div>
               <div className="form_group" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>{Language[lang].finance.newCosts.currency}</label>
                  <input type="text" autoComplete="off" 
                  onKeyUp={e => {
                     setSum(e.target.value)
                  }}    
				  className={"section_name_input"} name={"nomi"} />
               </div>

            </Form>
            <button onClick={()=>{
            if (name.length &&
                selectValue.length &&
                buyer.length &&
                sum) {
                    newCost({
                        variables:{
                            name,
                            buyer,
                            paymentAmount: sum,
                            type: selectValue,
                            createdAt: selectedDate
                        }
                    })
                    // window.location.reload()
                }
               document.getElementById('xarajatFormRes').reset()
        }}
			className="izma__finance-cost__form-bolim-form-button">
               {Language[lang].courses.editCourse.create}
            </button>
         </div>
      </>
   )
}
export default XarajatlarForm