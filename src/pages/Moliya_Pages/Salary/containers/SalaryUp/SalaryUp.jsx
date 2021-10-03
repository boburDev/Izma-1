import './SalaryUp.scss'
import { Settings } from '../../../../../assets/Icons/icons'
import SalaryUpTable from '../SalaryUpTable/SalaryUpTable'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { COLLEGUES, CREATE_SALARY, CREATE_SALARY_FOR_ALL } from './query'

const SalaryUp = () => {

   const [salary,setSalary] = useState(0)
   const [salary2,setSalary2] = useState(0)
   const [salaryType, setSalaryType] = useState('1')
   const [salaryType2, setSalaryType2] = useState('1')
   const [collegueId,setCollegueId] = useState('')
   const [data, setData] = useState([])

   const { data: collegues } = useQuery(COLLEGUES)
   const [setSalaryCollegue] = useMutation(CREATE_SALARY) 
   const [setSalaryForAll] = useMutation(CREATE_SALARY_FOR_ALL) 

   useEffect(() => {
   if (collegues && collegues.all_colleagues) {
      setData(collegues && collegues.all_colleagues)
   }
   }, [collegues])

      function updateFixedSalary() {

         setSalaryForAll({variables: {
            salary: salary - 0,
            type: salaryType - 0
         }})

      }

      function updateSlary() {

         setSalaryCollegue({variables: {
            id: collegueId,
            salary: salary2 - 0,
            type: salaryType2 - 0,
         }})

      }



   return (
      <div className="harajatlar_wrapper">
         <div className="izma__finance-costs-headings">
      <h3 className="izma__finance-costs-heading">
      Ish haqi
      </h3>
      <h4 className="izma__finance-costs-title">
      Moliya | Ish haqi
      </h4>
      </div>
         <div className="inner">
               <div className="harj_top">
                  <div className="img_icon"><Settings/></div>
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
                           <input onKeyUp={e => setSalary(e.target.value)} type="text" />
                           <select onChange={e => setSalaryType(e.target.value)}>
                              <option value="1">Naqt</option>
                              <option value="2">Foiz</option>
                           </select>
                     </div>
                     <button onClick={updateFixedSalary}>Saqlash</button>
                  </div>
               </div>

               <div className="unknown_block">
                  <h1 className="numb">2</h1>
                  <p className="text">Ba'zi o'qituvchilar uchun individual hisoblashni belgilashingiz mumkin</p>
               </div>

               <div className="inputs_wrap another_two">
                  <div className="select_two">
                     <label htmlFor="">O'qituvchini tanlang</label>
                     <select onChange={e => setCollegueId(e.target.value)}>
                           <option selected disabled>Choose</option>
                           {
                              data?.map(i => {
                                 if (i.status !== 'CEO') {
                                       return <option value={i.Id}>{i.name}</option>
                                 }
                                 return ""
                              })
                           }
                     </select>
                  </div>
                  <div>
                     <label htmlFor="">Xarajat qiymati</label>
                     <div className="input_items">
                           <div className="inputs">
                              <input type="text"
                              onKeyUp={e => setSalary2(e.target.value)} />
                              <select onChange={e => setSalaryType2(e.target.value)}>
                                 <option value="1">Naqt</option>
                                 <option value="2">Foiz</option>
                              </select>
                           </div>
                           <button onClick={updateSlary}>Saqlash</button>
                     </div>
                  </div>

               </div>
               
               <div className="izma__finance-salary-bootom-dates-line-up"></div>
               <SalaryUpTable/>
         </div>
         
      </div>
   )
}

export default SalaryUp