import './TeacherAdd.scss'
import Closebtn from '../../../assets/Icons/Group 26.svg'
import { DatePicker } from 'antd';
import { useSnackbar } from 'notistack';
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
   const { enqueueSnackbar } = useSnackbar()

   const [newTeacher] = useMutation(NEW_TEACHER)

   const handleTeacher = (e) => {
      setVisible(false)

      const data = {
            name,
            phoneNumber: phone,
            birthDay,
            gender: parseInt(gender),
            password,
            comment,
            status: 5
         }

      newTeacher({
         variables: data
      })
      document.getElementById('teacherFormRes').reset()
      handleClick()
      onClose()

   }

   function onChange(date, dateString) {
      setBirthDay(dateString)
   }

   const handleClick = () => {
      const message = 'O`qituvchi yaratildi'
      enqueueSnackbar(message, {
         variant: 'success',
      });

   };


   return (
      <div className="form_teacher">
         <div className="teacher_top">
            <h1 className="name">Yangi foydalanuvchi qo’shish</h1>
            <button onClick={onClose}><img src={Closebtn} alt="" /></button>
         </div>

         <div className="forms">
            <form action="" id="teacherFormRes" onSubmit={(e) => {
               e.preventDefault()
               handleTeacher()
            }}>
               <div className="form_one">
                  <label htmlFor="">Telefon</label>
                  <PhoneNumberInput
                     setPhone={setPhone}
                  />
               </div>

               <div className="form_one">
                  <label htmlFor="name">Ism</label>
                  <input autoComplete="off"  required onKeyUp={e => setName(e.target.value)} type="text" name="name" id="name" />
               </div>
               <div className="form_group" id='sty2'>
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
                        <input autoComplete="off"  value={1} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="men" />
                        <label htmlFor="men"></label>
                        <span>Erkak</span>
                     </div>
                     <div className="gen_one">
                        <input autoComplete="off"  value={2} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="women" />
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
                  <input autoComplete="off"  type="file" name="" id="file" />
               </div>
               <div className="form_one">
                  <label htmlFor="">Parol</label>
                  <PasswordInput setPassword={setPassword}/>
               </div>

               <button type="submit" className="cre_btn">Yarating</button>
            </form>
         </div>
      </div>
   )
}

export default TeacherAdd