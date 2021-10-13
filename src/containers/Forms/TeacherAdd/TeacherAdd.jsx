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
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider';


const TeacherAdd = ({ onClose, setVisible }) => {

   const [name, setName] = useState("")
   const [birthDay, setBirthDay] = useState("")
   const [phone, setPhone] = useState("")
   const [gender, setGender] = useState(0)
   const [password, setPassword] = useState("")
   const [comment, setComment] = useState("")
   // const [ photo, setPhoto ] = useState("")
   const { enqueueSnackbar } = useSnackbar()

   const [lang] = useLang()



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
      setBirthDay('')
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
      <div className="form_teacher s">
         <div className="teacher_top">
            <h1 className="name">{Language[lang].teachers.teacher.title}</h1>
            <button onClick={onClose}><img src={Closebtn} alt="" /></button>
         </div>

         <div className="forms">
            <form action="" id="teacherFormRes" onSubmit={(e) => {
               e.preventDefault()
               handleTeacher()
            }}>
               <div className="form_one">
                  <label htmlFor="">{Language[lang].teachers.addNewUser.phoneNumber}</label>
                  <PhoneNumberInput
                     setPhone={setPhone}
                  />
               </div>

               <div className="form_one">
                  <label htmlFor="name">{Language[lang].teachers.addNewUser.fullName}</label>
                  <input autoComplete="off"  required onKeyUp={e => setName(e.target.value)} type="text" name="name" id="name" />
               </div>
               <div className="form_group" id='sty2'>
                  <label htmlFor="date" className="form_label">{Language[lang].teachers.addNewUser.birthday}</label>

                  <DatePicker
                     className='date__picker lid-edit-date'
                     onChange={onChange}
                     placeholder={Language[lang].teachers.addNewUser.date}
                     format={"DD-MM-YYYY"}
                     value={birthDay !== "" ? birthDay : ""}
                  />
               </div>

               <div className="form_one">
                  <label htmlFor="name">{Language[lang].teachers.addNewUser.genderTitle}</label>

                  <div className="genders">
                     <div className="gen_one">
                        <input required autoComplete="off"  value={1} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="men" />
                        <label htmlFor="men"></label>
                        <span>{Language[lang].teachers.addNewUser.gender[0]}</span>
                     </div>
                     <div className="gen_one">
                        <input required autoComplete="off"  value={2} onChange={e => setGender(e.target.value)} type="radio" name="gender" id="women" />
                        <label htmlFor="women"></label>
                        <span>{Language[lang].teachers.addNewUser.gender[1]}</span>
                     </div>
                  </div>
               </div>
               <div className="form_one">
                  <label htmlFor="comment">{Language[lang].teachers.addNewUser.comment}</label>
                  <textarea onKeyUp={e => setComment(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
               </div>

               <div className="form_one">
                  <span className="file">{Language[lang].teachers.addNewUser.photo}</span>
                  <label htmlFor="file" className="choose_file">{Language[lang].teachers.editTeacherInfo.fileNotChoosen}</label>
                  <input autoComplete="off"  type="file" name="" id="file" />
               </div>
               <div className="form_one">
                  <label htmlFor="">{Language[lang].teachers.addNewUser.password}</label>
                  <PasswordInput setPassword={setPassword}/>
               </div>

               <button type="submit" className="cre_btn">{Language[lang].teachers.addNewUser.save}</button>
            </form>
         </div>
      </div>
   )
}

export default TeacherAdd