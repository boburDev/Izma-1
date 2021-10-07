import './FinanceRepaymeynForm.scss'
import CloseBtn from '../../../../assets/Icons/Group 26.svg'
import { Form, Input, } from "antd";

const FinanceRepaymentForm = ({ onCloseS }) => {
   return (
      <>
         <div className="izma__lidlar__form-bolim">
            <Form className="izma__lidlar__form-bolim-form" id="formFinanRes" style={{ width: 400 }}>
               <div className="izma__lidlar__form-bolim-form-up">
                  <h3 className='izma__lidlar__form-bolim-form-heading' >Qaytgan to'lov</h3>
                  <button className="izma__lidlar__form-bolim-form-close-btn" onClick={onCloseS} >

                     <img className="izma__lidlar__form-bolim-form-img" src={CloseBtn} alt="img" />
                  </button>
               </div>

               <div className="form_group izma__lidlar__form-bolim-form-center" style={{ width: "100%" }}>
                  <label className='izma__lidlar__form-bolim-form-label'>Sum</label>
                  <Input autoComplete="off"  className={"section_name_input"} type='number' name={"nomi"} />
               </div>
            </Form>
            <button onClick={() => {
               document.getElementById('formFinanRes').reset()
               onCloseS()
               }} className="izma__lidlar__form-bolim-form-button">
               Yarating
            </button>
         </div>
      </>
   )
}
export default FinanceRepaymentForm