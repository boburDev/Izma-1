import './XarajatlarForm.scss'
import { Form, Input, DatePicker, Select } from "antd";
import { NEW_HARAJAT } from '../../../../../Querys/Finance_All'
import { useState } from 'react';
import { useMutation } from '@apollo/client';
const { Option } = Select

const XarajatlarForm = () => {

   const [name, setName] = useState('')
    const [selectValue, setSelectValue] = useState('')
    const [selectedDate, setSelectedDate] = useState('')
    const [buyer,setBuyer] = useState('')
    const [sum, setSum] = useState(0)
    
	const [newCost] = useMutation(NEW_HARAJAT)

   return (
      <>
         <div className="izma__finance-cost__form-bolim">
            <Form className="izma__finance-cost__form-bolim-form" style={{ width: 300 }}>
               <div className="izma__finance-cost__form-bolim-form-up">
                  <h3 className='izma__finance-cost__form-bolim-form-heading' >Yangi xarajatlar</h3>
               </div>

               <div className="form_group izma__finance-cost__form-bolim-form-center" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>Nomi</label>
                  <Input onKeyUp={e => setName(e.target.value)} className={"section_name_input"} name={"nomi"} />
               </div>

               <div className="form_group">
                  <label>Қабул қилинган сана</label>

                  <DatePicker
                     className='date__picker'
					 onChange={(value) => setSelectedDate(value._d)}
                     placeholder={"Kun-Oy-Yil"}
                     format={"DD-MM-YYYY"}
                  />
               </div>
               <div className="form_group" style={{ width: 300 }}>
                  <label>Turkum</label>
                  <Select onSelect={e => setSelectValue(e)} defaultValue="Boshqalar">
                     <Option value={"Выбрать"}>Выбрать</Option>
                     <Option value={"Административный расход"}>Административный расход</Option>
                     <Option value={"Аренда"}>Аренда</Option>
                     <Option value={"Зарплаты"}>Зарплаты</Option>
                     <Option value={"Инвестиции"}>Инвестиции</Option>
                     <Option value={"Канцелярия"}>Канцелярия</Option>
                     <Option value={"Налоги"}>Налоги</Option>
                     <Option value={"Хозяйственный расходы"}>Хозяйственный расходы</Option>
                  </Select>
               </div>

               <div className="form_group" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>Oluvchi</label>
                  <Input onKeyUp={e => setBuyer(e.target.value)}
				  className={"section_name_input"} name={"nomi"} />
               </div>
               <div className="form_group" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>Sum</label>
                  <Input onKeyUp={e => setSum(e.target.value - 0)} type="number"
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
        }}
			className="izma__finance-cost__form-bolim-form-button">
               Yarating
            </button>
         </div>
      </>
   )
}
export default XarajatlarForm