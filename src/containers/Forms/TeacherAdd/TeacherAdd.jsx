import './TeacherAdd.scss'
import Closebtn from '../../../assets/Icons/Group 26.svg'
import PhoneInput from "react-phone-input-2";
import { Input, Space, DatePicker } from 'antd';

import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { useMutation } from '@apollo/client';
import { NEW_TEACHER } from '../../../Querys/Teacher_Query';
import { useState } from 'react';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';

const TeacherAdd = ({ onClose, setVisible }) => {

   const [name, setName] = useState("")
   const [birthDay, setBirthDay] = useState("")
   const [phone, setPhone] = useState("")
   const [gender, setGender] = useState(0)
   const [password, setPassword] = useState("")
   const [comment, setComment] = useState("")
   // const [ photo, setPhoto ] = useState("")

   const [newTeacher] = useMutation(NEW_TEACHER, {
      update: (cache, data) => {
         console.log(data)
      }
   })

   const handleTeacher = (e) => {
      setVisible(false)
      e.preventDefault()
      // console.log({
      //     name,
      //     phoneNumber: phone,
      //     birthDay,
      //     gender: parseInt(gender),
      //     password,
      //     comment,
      //     status: 5
      // })

      newTeacher({
         variables: {
            name,
            phoneNumber: phone,
            birthDay,
            gender: parseInt(gender),
            password,
            comment,
            status: 5
         }
      })
      onClose()

   }

   function onChange(date, dateString) {
      setBirthDay(dateString)
   }


   return (
      <div className="form_teacher">
         <div className="teacher_top">
            <h1 className="name">Yangi foydalanuvchi qo’shish</h1>
            <button onClick={onClose}><img src={Closebtn} alt="" /></button>
         </div>

         <div className="forms">
            <form action="">
               <div className="form_one">
                  <label htmlFor="">Telefon</label>
                  <PhoneNumberInput
                     setPhone={setPhone}
                  />
               </div>

               <div className="form_one">
                  <label htmlFor="name">Ism</label>
                  <input onKeyUp={e => setName(e.target.value)} type="text" name="name" id="name" />
               </div>
               <div className="form_group">
                  <label htmlFor="date" className="form_label">To’g’ilgan sana</label>

                  <DatePicker
                     className='date__picker lid-edit-date'
                     onChange={onChange}
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
                  <label htmlFor="comment">Komment</label>
                  <textarea onKeyUp={e => setComment(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
               </div>

               <div className="form_one">
                  <span className="file">Foto</span>
                  <label htmlFor="file" className="choose_file">Hech qanday fayl tanlanmadi</label>
                  <input type="file" name="" id="file" />
               </div>
               <div className="form_one">
                  <label htmlFor="">Parol</label>
                  <PasswordInput setPassword={setPassword}/>
               </div>

               <button onClick={handleTeacher} className="cre_btn">Yarating</button>
            </form>
         </div>
      </div>
   )
}

export default TeacherAdd