

import CloceBtn from '../../../assets/Icons/Group 26.svg'



import './StudentAdd.scss'
import { useState } from 'react'

import Plus from '../../../assets/Icons/plus.png'
import Minus from '../../../assets/Icons/minus.png'
import { DatePicker } from 'antd';
import moment from 'moment'
import 'antd/dist/antd.css'
import { FOR_EDIT_STUDENT, UPDATE_STUDENT } from './query';
import { useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';
import { useSnackbar } from 'notistack';


const StudentsEditForm = ({ onCloseF }) => {

   const [fieldInput, setInputField] = useState([
       {
           number: null
       }
   ])


   const [fieldParents, setParents] = useState([
       {
           number: null
       }
   ])


   const addNewField = () => {
       setInputField([...fieldInput, { number: null }])
   }

   const removeField = (index) => {
       const values = [...fieldInput]
       values.splice(index, 1)
       setInputField(values)
   }

   const addNewFieldTwo = () => {
       setParents([...fieldParents, { number: null }])
   }

   const removeFieldTwo = (index) => {
       const valuesTwo = [...fieldParents]
       valuesTwo.splice(index, 1)
       setParents(valuesTwo)
   }



   setTimeout(function addActiveInput() {
       if (fieldInput.length <= 1) {
           document.querySelector('.alone').classList.add('active')
       } else {
           document.querySelector('.alone').classList.remove('active')
       }
   }, 100)

   setTimeout(function addActiveInputTwo() {
       if (fieldParents.length <= 1) {
           document.querySelector('.aloneTwo').classList.add('active')
       } else {
           document.querySelector('.aloneTwo').classList.remove('active')
       }
   }, 100)

   const { studentID } = useParams()

   const [UpdateStudents] = useMutation(UPDATE_STUDENT)
   const {data: forEdit} = useQuery(FOR_EDIT_STUDENT, {variables: {id: studentID}})


   const [stPhoneNum, setStPhoneNum] = useState(null)
   const [stName, setStName] = useState(null)
   const [stBirth, setStBirth] = useState(null)
   const [stGender, setStGender] = useState(null)
   const [stTextInfo, setStTextInfo] = useState('')
   const [stTg, setStTg] = useState()
   const [stPassword, setStPassword] = useState(null)

    const { enqueueSnackbar } = useSnackbar();

    const handleClick = () => {
        const message = 'O`zgartirildi'
        enqueueSnackbar(message, {
            variant: 'success',
        });

    };

   return (
       <div className="form-wrapper">
           <div className="top-place">
               <h1 className="place-name">Tahrirlash</h1>
               <button className="x-btn" onClick={onCloseF} >
                   <img src={CloceBtn} alt="img" />
               </button>
           </div>

           <form id="studenEditFormRes" onSubmit={(e) => {
               e.preventDefault()

               if(forEdit && forEdit) {
               const data = {
                   studentID: studentID,
                   mainPhone: (stPhoneNum && [{number: stPhoneNum}]) || ([{number: forEdit && forEdit.student.mainPhone[0]?.phone}]),
                   name: (stName) || (forEdit && forEdit.student.name),
                   birthday: stBirth || (forEdit && forEdit.student.birthday),
                   password: stPassword,
                   gender: (stGender - 0) || (forEdit && forEdit.student.gender - 0),
                   comment: stTextInfo,
                   newNumber: fieldInput,
                   parentNumber: fieldParents,
                   telegram: [{ telegram: (stTg && stTg) || (forEdit && forEdit.student.telegram[0]?.telegram) }],
                   address: [{ address: 'null' }]
               }

               UpdateStudents({ variables: data })
                   handleClick()
                   document.getElementById('studenEditFormRes').reset()
           }
           }}>
               <div className="form-input">
               <label htmlFor="">Telefon</label>
               <PhoneNumberInput
                  setPhone={setStPhoneNum}
                  placeholder={forEdit && forEdit.student.mainPhone[0]?.phone}
               />

            </div>

               <div className="form-input">
                   <label htmlFor="name">Ism</label>
                   <input autoComplete="off"  type="text" name="" id="name" className="new-input" defaultValue={forEdit && forEdit.student.name} onChange={e => setStName(e.target.value)} />
               </div>
               <div className="form_group">
                   <label htmlFor="date" className="form_label">To’g’ilgan sana</label>

                   <DatePicker
                       className='date__picker lid-edit-date'
                       defaultPickerValue={forEdit && forEdit.student.birthday &&  moment(forEdit.student.birthday, 'DD-MM-YYYY')}
                       onChange={(value, dateString) => {
                           setStBirth(dateString)
                       }}
                       placeholder={forEdit && forEdit.student.birthday}
                       format={"DD-MM-YYYY"}
                   />
               </div>
               <div className="form-input">
                   <label htmlFor="date">Jinsi</label>
                   <div className="genders">
                       <div className="gen_one">
                           <input autoComplete="off"  value={1} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="men" />
                           <label htmlFor="men"></label>
                           <span>Erkak</span>
                       </div>
                       <div className="gen_one">
                           <input autoComplete="off"  value={2} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="women" />
                           <label htmlFor="women"></label>
                           <span>Ayol</span>
                       </div>
                   </div>
               </div>
               <div className="form-input">
                   <label htmlFor="group">Komment</label>
                   <textarea className="comment" name="" id="" cols="30" rows="10" defaultValue={forEdit && forEdit.student.comment} onChange={e => setStTextInfo(e.target.value)}></textarea>
               </div>

               <div className="many-input">
                   {
                       fieldInput.map((item, index) => (
                           <div className="form-input" key={index}>
                               <div className="buttosn">
                                   <label htmlFor="">Ikkilamchi Telefon</label>
                                   <div className="bla-bla">
                                       <button
                                           className="remadd_btn alone"
                                           onClick={() => removeField(index)}
                                       ><img src={Minus} alt="" /></button>
                                       <button
                                           className="remadd_btn"
                                           onClick={() => addNewField()}
                                       ><img src={Plus} alt="" /></button>
                                   </div>
                               </div>
                               <PhoneNumberInput
                                 setParents={setInputField}
                                 parents={fieldInput}
                              />
                           </div>
                       ))

                   }
               </div>

               <div className="many-input">
                   {
                       fieldParents.map((item, index) => (
                           <div className="form-inpun" key={index}>
                               <div className="buttosn">
                                   <label htmlFor="">Ota-onalar telefoni</label>
                                   <div className="bla-bla">
                                       <button
                                           className="remadd_btnTwo aloneTwo"
                                           onClick={() => removeFieldTwo(index)}
                                       ><img src={Minus} alt="" /></button>
                                       <button
                                           className="remadd_btnTwo"
                                           onClick={() => addNewFieldTwo()}
                                       ><img src={Plus} alt="" /></button>
                                   </div>
                               </div>
                               <PhoneNumberInput
                                 setParents={setParents}
                                 parents={fieldParents}
                              />
                           </div>
                       ))
                   }
               </div>

               <div className="form-input alone">
                   <label htmlFor="">Telegram user name</label>
                   <div className="numberTwo">
                       <span>@</span>
                       <input autoComplete="off"  type="text" name="" id="" autoComplete="off" className="user_name" defaultValue={forEdit && forEdit.student.telegram[0]?.telegram} onChange={e => setStTg(e.target.value)} />
                   </div>
               </div>

               <div className="form-input">
                   <label htmlFor="">Parol</label>
                   <PasswordInput
                     setPassword={setStPassword}
                  />
               </div>

               <button className="create-btn" onClick={onCloseF}>O'zgartirish</button>
           </form>
       </div>
   )
}

export default StudentsEditForm