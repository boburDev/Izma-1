import './SettingsArchiveForm.scss'
import CloceBtn from '../../../assets/Icons/Group 26.svg'
import { Radio } from 'antd';
import { DatePicker } from 'antd';
import { useState } from 'react'
import { CREATE_COLLEAGUE } from './query'
import { useMutation } from '@apollo/client';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';

const SettingsArchiveForm = ({ onClose }) => {

   const [value, setValue] = useState('')
   const [phone, setPhone] = useState('')
   const [name, setName] = useState('')
   const [date, setDate] = useState('')
   const [gender, setGender] = useState('')
   const [password, setPassword] = useState('')


   const onChange = e => {
      setValue(e.target.value);
   };

   const [newColleague] = useMutation(CREATE_COLLEAGUE)


   function createColleague() {
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
      document.getElementById('archiveFormRes').reset()
   }


   return (
      <>
         <div className="izma__settings-archive-form-wrapper">
            <div className="top-place">
               <h1 className="place-name">Yangi foydalanuvchi qo’shish</h1>
               <button className="x-btn" onClick={onClose} >
                  <img src={CloceBtn} alt="img" />
               </button>
            </div>

            <form action="" onSubmit={(e) => e.preventDefault()} id="archiveFormRes">
               <div className="form-input">
                  <label htmlFor="">Telefon</label>
                  <PhoneNumberInput
                     setPhone={setPhone}
                  />
               </div>

               <div className="form-input">
                  <label htmlFor="name">Ism</label>
                  <input onKeyUp={e => setName(e.target.value)} type="text" name="" id="name" className="input-izma" />
               </div>
               <div className="form_group">
                  <label htmlFor="date" className="form_label">To’g’ilgan sana</label>

                  <DatePicker
                     className='date__picker lid-edit-date'
                     onChange={(value, dateString) => setDate(dateString)}
                     placeholder={"Kun-Oy-Yil"}
                     format={"DD-MM-YYYY"}
                  />
               </div>
               <div className="form_one">
                  <label htmlFor="name">Jinsi</label>

                  <div className="genders">
                     <div className="gen_one">
                        <input value={1} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="men" />
                        <label htmlFor="men"></label>
                        <span>Erkak</span>
                     </div>
                     <div className="gen_one">
                        <input value={2} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="women" />
                        <label htmlFor="women"></label>
                        <span>Ayol</span>
                     </div>
                  </div>
               </div>

               <div className="form_one">
                  <span className="file">Foto</span>
                  <label htmlFor="file" className="choose_file">Hech qanday fayl tanlanmadi</label>
                  <input type="file" name="" id="file" />
               </div>
               <div className="form_one">
                  <label htmlFor="">Parol</label>
                  <PasswordInput
                     setPassword={setPassword}
                  />
               </div>

               <div>
                  <Radio.Group
                     className="izma__settings-checkbox-wrapper" onChange={onChange}>
                     <Radio value={1}>CEO</Radio>
                     <Radio value={3}>Adminstrator</Radio>
                     <Radio value={5}>Teacher</Radio>
                     <Radio value={2}>Marketer</Radio>
                     <Radio value={4}>Cashier</Radio>
                  </Radio.Group>
               </div>

               <button className="create-btn" onClick={() => {
                  onClose()
                  createColleague()
               }}>Yarating</button>
            </form>
         </div>
      </>
   )
}

export default SettingsArchiveForm