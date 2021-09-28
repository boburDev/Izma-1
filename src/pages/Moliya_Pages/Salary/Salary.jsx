import SalaryBottom from "./containers/SalaryBottom/SalaryBottom"
import SalaryUp from "./containers/SalaryUp/SalaryUp"
import './Salary.scss'
import moment from "moment"
import { DatePicker } from "antd"

const Salary = () => {
   const { RangePicker } = DatePicker;
   return (
      <>
         <div className="izma__finance-salary">
            <SalaryUp />
            <div className="izma__finance-salary-up-dates-line-up"></div>
            <div className="izma__finance-salary-up-dates" style={{ width: "350px" }}>
               <p className="izma__finance-allpayment-up-dates-btn-text">
                  Sana bo'yicha
               </p>
               <RangePicker
                  defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                  separator
                  className={"range_picker"}
                  suffixIcon
                  format={"DD-MM-YYYY"}
                  placeholder={["08/01/2021", "08/01/2021"]}
               />
               <button className="izma__finance-salary-up-dates-btn">
                  Filtr
               </button>
            </div>
            <div className="izma__finance-salary-up-dates-line"></div>
            <SalaryBottom />
         </div>
      </>
   )
}

export default Salary