import './SettingsArchiveForm.scss'
import CloceBtn from '../../../assets/Icons/Group 26.svg'
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import { useState } from 'react'
import { CREATE_COLLEAGUE } from './query'
import { useMutation } from '@apollo/client';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider';
import { useSnackbar } from 'notistack';

const SettingsArchiveForm = ({ onClose }) => {

   const [value, setValue] = useState()
   const [phone, setPhone] = useState('')
   const [name, setName] = useState()
   const [date, setDate] = useState('')
   const [gender, setGender] = useState()
   const [password, setPassword] = useState('')
   const [lang] = useLang()


   const onChange = e => {
      setValue(e.target.value);
   };

   const [newColleague] = useMutation(CREATE_COLLEAGUE)

   const { enqueueSnackbar } = useSnackbar();



   const handleClick2 = (message) => {
      enqueueSnackbar(message, {
         variant: 'error',
      });

   };


   function createColleague() {
      if(name && gender && value) {
         const data = {
            name: name,
            phoneNumber: phone,
            gender: gender - 0,
            password: password,
            status: value,
            birthday: date
         }
         newColleague({
            variables: data
         })
         onClose()
         document.getElementById('archiveFormRes').reset()
      }else if(!name){
         handleClick2('F.I.O bo`lishi shart')
      }else if(!gender) {
         handleClick2('Jinsi bo`lishi shart')
      }else if(!value) {
         handleClick2('Roli bo`lishi shart')
      }else {
         handleClick2('Formani to`liq to`ldiring ')
      }
   }


   return (
      <>
         <div className="izma__settings-archive-form-wrapper">
            <div className="top-place">
               <h1 className="place-name">{Language[lang].teachers.teacher.title}</h1>
               <button className="x-btn" onClick={onClose} >
                  <img src={CloceBtn} alt="img" />
               </button>
            </div>

            <form action="" onSubmit={(e) => e.preventDefault()} id="archiveFormRes">
               <div className="form-input">
                  <label htmlFor="">{Language[lang].teachers.addNewUser.phoneNumber}</label>
                  <PhoneNumberInput
                     setPhone={setPhone}
                  />
               </div>

               <div className="form-input">
                  <label htmlFor="name">{Language[lang].teachers.addNewUser.fullName}</label>
                  <input required autoComplete="off"  onKeyUp={e => setName(e.target.value)} type="text" name="" id="name" className="input-izma" />
               </div>
               <div className="form_group">
                  <label htmlFor="date" className="form_label">{Language[lang].teachers.addNewUser.birthday}</label>

                  <DatePicker
                     className='date__picker lid-edit-date'
                     onChange={(value, dateString) => setDate(dateString)}
                     placeholder={Language[lang].teachers.addNewUser.date}
                     format={"DD-MM-YYYY"}
                  />
               </div>
               <div className="form_one">
                  <label htmlFor="name">{Language[lang].students.editStudentInfo.genderTitle}</label>

                  <div className="genders">
                     <div className="gen_one">
                        <input required autoComplete="off"  value={1} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="men" />
                        <label htmlFor="men"></label>
                        <span>{Language[lang].students.editStudentInfo.gender[0]}</span>
                     </div>
                     <div className="gen_one">
                        <input required autoComplete="off"  value={2} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="women" />
                        <label htmlFor="women"></label>
                        <span>{Language[lang].students.editStudentInfo.gender[1]}</span>
                     </div>
                  </div>
               </div>

               <div className="form_one">
                  <span className="file">{Language[lang].settings.editable.photo}</span>
                  <label htmlFor="file" className="choose_file">{Language[lang].settings.editable.photoNotChoosen}</label>
                  <input autoComplete="off"  type="file" name="" id="file" />
               </div>
               <div className="form_one">
                  <label htmlFor="">{Language[lang].settings.editable.password}</label>
                  <PasswordInput
                     setPassword={setPassword}
                  />
               </div>

               <div>
                  <Radio.Group className="izma__settings-checkbox-wrapper" onChange={onChange}>
                     <Radio  value={1}>{Language[lang].settings.editable.leader}</Radio>
                     <Radio  value={3}>{Language[lang].settings.editable.adminstrator}</Radio>
                     <Radio  value={5}>{Language[lang].settings.editable.teacher}</Radio>
                     <Radio  value={2}>{Language[lang].settings.editable.marketolog}</Radio>
                     <Radio  value={4}>{Language[lang].settings.editable.accountant}</Radio>
                  </Radio.Group>
               </div>

               <button className="create-btn" onClick={() => {
                  createColleague()
               }}>{Language[lang].courses.editCourse.create}</button>
            </form>
         </div>
      </>
   )
}

export default SettingsArchiveForm