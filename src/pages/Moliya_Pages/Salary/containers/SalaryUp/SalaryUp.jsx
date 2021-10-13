import './SalaryUp.scss'
import { Settings } from '../../../../../assets/Icons/icons'
import SalaryUpTable from '../SalaryUpTable/SalaryUpTable'
import { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { COLLEGUES, CREATE_SALARY, CREATE_SALARY_FOR_ALL } from './query'
import { useLang } from '../../../../../context/LanguageProvider'
import Language from '../../../../../lang/index'

const SalaryUp = () => {

   const [salary,setSalary] = useState(0)
   const [salary2,setSalary2] = useState(0)
   const [salaryType, setSalaryType] = useState('1')
   const [salaryType2, setSalaryType2] = useState('1')
   const [collegueId,setCollegueId] = useState('')
   const [data, setData] = useState([])
   const [lang] = useLang()

   const [info, setInfo] = useState([])
   const [infoo, setInfoo] = useState([])

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
            salary: salary - 0 || infoo?.amount,
            type: salaryType - 0 || infoo?.amount
         }})

      }

      function updateSlary() {

         setSalaryCollegue({variables: {
            id: collegueId,
            salary: salary2 - 0,
            type: salaryType2 - 0,
         }})

      }

      useEffect(() => {
         setInfoo(...info.filter(i => i.teacherID === collegueId))

      }, [info, collegueId])



   return (
      <div className="harajatlar_wrapper">
         <div className="izma__finance-costs-headings">
      <h3 className="izma__finance-costs-heading">
      {Language[lang].finance.salary.salaryTitle}  
      </h3>
      <h4 className="izma__finance-costs-title">
         {Language[lang].finance.financeTitle} | {Language[lang].finance.salary.salaryTitle}
      </h4>
      </div>
         <div className="inner">
               <div className="harj_top">
                  <div className="img_icon"><Settings/></div>
                  <h3>{Language[lang].finance.salary.settingsSalaryCalculator}</h3>
               </div>

               <div className="unknown_block">
                  <h1 className="numb">1</h1>
                  <p className="text">{Language[lang].finance.firstSettingsSalary.firstSettingsSalaryTitle}</p>
               </div>

               <div className="inputs_wrap another">
                  <label htmlFor="">{Language[lang].finance.firstSettingsSalary.optionExpances}</label>
                  <div className="input_items">
                     <div className="inputs">
                     <input autoComplete="off"  
                        onKeyUp={e => {
                           setSalary(e.target.value)
                        }} type="text" />
                           <select onChange={e => setSalaryType(e.target.value)}>
                              <option value="1">{Language[lang].finance.firstSettingsSalary.cash}</option>
                              <option value="2">{Language[lang].finance.secondSettingsSalary.procent}</option>
                           </select>
                     </div>
                     <button onClick={updateFixedSalary}>{Language[lang].finance.firstSettingsSalary.save}</button>
                  </div>
               </div>

               <div className="unknown_block">
                  <h1 className="numb">2</h1>
                  <p className="text">{Language[lang].finance.secondSettingsSalary.secondSettingsSalaryTitle}</p>
               </div>

               <div className="inputs_wrap another_two">
                  <div className="select_two">
                     <label htmlFor="">{Language[lang].finance.secondSettingsSalary.chooseTeacher}</label>
                     <select onChange={e => setCollegueId(e.target.value)} >
                           <option key="1d2" selected disabled value="">{Language[lang].finance.secondSettingsSalary.choose}</option>
                           {
                              data?.map(i => {
                                 if (i.status !== 'CEO') {
                                       return <option key={i.id} value={i.Id}>{i.name}</option>
                                 }
                                 return ""
                              })
                           }
                     </select>
                  </div>
               <div className="another_three">
                     <label htmlFor="">{Language[lang].finance.secondSettingsSalary.optionExpances}</label>
                     <div className="input_items">
                           <div className="inputs">
                        <input autoComplete="off" type="text" defaultValue={infoo?.amount} onKeyUp={e => {
                              setSalary2(e.target.value)
                           }} />
                              <select onChange={e => setSalaryType2(e.target.value)}>
                                 <option selected={infoo?.type === 1} value="1">{Language[lang].finance.firstSettingsSalary.cash}</option>
                                 <option selected={infoo?.type === 2} value="2">{Language[lang].finance.secondSettingsSalary.procent}</option>
                              </select>
                           </div>
                     </div>
                  </div>
                           <button onClick={updateSlary}>{Language[lang].finance.firstSettingsSalary.save}</button>

               </div>
               
               <div className="izma__finance-salary-bootom-dates-line-up"></div>
               <SalaryUpTable info={(e) => setInfo(e)}/>
         </div>
         
      </div>
   )
}

export default SalaryUp