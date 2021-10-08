import SalaryBottom from "./containers/SalaryBottom/SalaryBottom"
import SalaryUp from "./containers/SalaryUp/SalaryUp"
import './Salary.scss'
import moment from "moment"
import { DatePicker } from "antd"
import { useLang } from "../../../context/LanguageProvider"
import Language from '../../../lang/index'

const Salary = () => {
   const { RangePicker } = DatePicker;
   const [lang] = useLang()
   return (
      <>
         <div className="izma__finance-salary">
            <SalaryUp />
            <div className="izma__finance-salary-up-dates-line-up"></div>
            <div className="izma__finance-salary-up-dates">
               <p className="izma__finance-allpayment-up-dates-btn-text">
               {Language[lang].finance.secondSettingsSalary.byDate}
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
               {Language[lang].finance.secondSettingsSalary.filter}
               </button>
            </div>
            <div className="izma__finance-salary-up-dates-line"></div>
            <SalaryBottom />
         </div>
      </>
   )
}

export default Salary