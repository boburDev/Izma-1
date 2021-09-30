import './Finance.scss'
import FinanceDollarImg from '../../../assets/Icons/finance-dolor-icon.svg'
import FinanceTable from './containers/FinanceTable/FinanceTable';
import FinanceGrafig from '../../../components/MoliyaComponents/FinanceGrafig/FinanceGrafig';
import { DatePicker, } from "antd";
import moment from 'moment';

const Finance = () => {
   const { RangePicker } = DatePicker;
   return (
      <>
         <div className="izma__finance-allpaymet">
            <h1 className="izma__finance-allpaymet-heading">
               Finance
            </h1>
            <div className="izma__finance-allpaymet-up">
               <div className="izma__finance-allpaymet-up-left">
                  <div className="izma__finance-allpayment-up-wrapper">
                     <p className="izma__finance-allpayment-up-text">
                        Talabalar balansi bo'yicha jami: 1,100,000 so'm
                     </p>
                     <img className="izma__finance-allpayment-up-img" src={FinanceDollarImg} alt="dollar img" />
                  </div>

                  <div className="izma__finance-allpayment-up-wrapper">
                     <p className="izma__finance-allpayment-up-text">
                        Davr uchun tushumlar 2021.08.01 - 2021.08.31: 1,100,000 so'm
                     </p>
                     <img className="izma__finance-allpayment-up-img" src={FinanceDollarImg} alt="dollar img" />
                  </div>
                  <div className="izma__finance-allpayment-up-dates-texts">
                     <p className="izma__finance-allpayment-up-dates-text">
                        Sanadan boshlab
                     </p>
                     <p className="izma__finance-allpayment-up-dates-text izma__finance-allpayment-up-dates-text-s">
                        Sana bo'yicha
                     </p>
                  </div>
                  <div className="izma__finance-allpayment-up-dates" style={{ width: "350px" }}>
                     <RangePicker
                        defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                        separator
                        className={"range_picker"}
                        suffixIcon
                        format={"DD-MM-YYYY"}
                        placeholder={["08/01/2021", "08/01/2021"]}
                     />
                     <button className="izma__finance-allpayment-up-dates-btn">
                        Filtr
                     </button>
                  </div>


               </div>
               <div className="izma__finance-allpaymet-up-right">
                  <FinanceGrafig />
               </div>
            </div>
            {/* <FinanceTable /> */}
         </div>
      </>
   )
}
export default Finance