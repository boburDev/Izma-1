import './XarajatlarForm.scss'


import { Form, Input, DatePicker, Select } from "antd";
import { Option } from "antd/lib/mentions";

const XarajatlarForm = () => {
   // const [value, setValue] = useState(1);

   // const onChange = e => {
   //     console.log('radio checked', e.target.value);
   //     setValue(e.target.value);
   // };
   return (
      <>
         <div className="izma__finance-cost__form-bolim">
            <Form className="izma__finance-cost__form-bolim-form" style={{ width: 300 }}>
               <div className="izma__finance-cost__form-bolim-form-up">
                  <h3 className='izma__finance-cost__form-bolim-form-heading' >Yangi xarajatlar</h3>
               </div>

               <div className="form_group izma__finance-cost__form-bolim-form-center" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>Nomi</label>
                  <Input className={"section_name_input"} name={"nomi"} />
               </div>

               <div className="form_group">
                  <label>Қабул қилинган сана</label>

                  <DatePicker
                     className='date__picker'
                     // onChange={(value, dateString) => {
                     //   const v = {
                     //     target: {
                     //       name: "sana",
                     //       value: dateString,
                     //     },
                     //   };
                     //   handleChange(v);
                     // }}
                     placeholder={"Kun-Oy-Yil"}
                     //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                     format={"DD-MM-YYYY"}
                  />
               </div>
               <div className="form_group" style={{ width: 300 }}>
                  <label>Turkum</label>
                  <Select

                     defaultValue="Boshqalar">
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
                  <Input className={"section_name_input"} name={"nomi"} />
               </div>
               <div className="form_group" style={{ width: "100%" }}>
                  <label className='izma__finance-cost__form-bolim-form-label'>Sum</label>
                  <Input className={"section_name_input"} name={"nomi"} />
               </div>

            </Form>
            <button className="izma__finance-cost__form-bolim-form-button">
               Yarating
            </button>
         </div>
      </>
   )
}
export default XarajatlarForm