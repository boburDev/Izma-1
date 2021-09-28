import './SalaryUp.scss'
import { Settings } from '../../../../../assets/Icons/icons'
import SalaryUpTable from '../SalaryUpTable/SalaryUpTable'

const SalaryUp = () => {
   return (
      <div className="harajatlar_wrapper">
         <div className="izma__finance-costs-headings">
            <h3 className="izma__finance-costs-heading">
               Xarajatlar
            </h3>
            <h4 className="izma__finance-costs-title">
               Moliya | Xarajatlar
            </h4>
         </div>
         <div className="inner">
            <div className="harj_top">
               <div className="img_icon"><Settings /></div>
               <h3>Ish haqi kalkulyatorini sozlash</h3>
            </div>

            <div className="unknown_block">
               <h1 className="numb">1</h1>
               <p className="text">Barcha o'qituvchilar uchun standart xarajatlarni belgilash parametrlarini ko'rsating</p>
            </div>

            <div className="inputs_wrap another">
               <label htmlFor="">Xarajat qiymati</label>
               <div className="input_items">
                  <div className="inputs">
                     <input type="text" name="" id="" />
                     <select name="" id="">
                        <option value="">one</option>
                        <option value="">one</option>
                        <option value="">one</option>
                     </select>
                  </div>
                  <button>Saqlash</button>
               </div>
            </div>

            <div className="unknown_block">
               <h1 className="numb">2</h1>
               <p className="text">Ba'zi o'qituvchilar uchun individual hisoblashni belgilashingiz mumkin</p>
            </div>

            <div className="inputs_wrap another_two">
               <div className="select_two">
                  <label htmlFor="">O'qituvchini tanlang</label>
                  <select name="" id="">
                     <option value="">one</option>
                     <option value="">one</option>
                     <option value="">one</option>
                  </select>
               </div>
               <div>
                  <label htmlFor="">Xarajat qiymati</label>
                  <div className="input_items">
                     <div className="inputs">
                        <input type="text" name="" id="" />
                        <select name="" id="">
                           <option value="">one</option>
                           <option value="">one</option>
                           <option value="">one</option>
                        </select>
                     </div>
                     <button>Saqlash</button>
                  </div>
               </div>

            </div>

            <div className="izma__finance-salary-bootom-dates-line-up"></div>
            <SalaryUpTable />
         </div>

      </div>
   )
}

export default SalaryUp