

import CloceBtn from '../../../assets/Icons/Group 26.svg'



import './StudentAdd.scss'
import PhoneInput from "react-phone-input-2";
import { useState } from 'react'

import Plus from '../../../assets/Icons/plus.png'
import Minus from '../../../assets/Icons/minus.png'
import { Input, Space, DatePicker } from 'antd';
import moment from 'moment'
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import 'antd/dist/antd.css'
import { FOR_EDIT_STUDENT, GROUPS } from './query';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router';
import DropSearch from '../../../components/DropSearch/DropSearch';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import PasswordInput from '../../../components/PasswordInput/PasswordInput';



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

   // const [UpdateStudents] = useMutation(UPDATE_STUDENT)
   const { data: forEdit } = useQuery(FOR_EDIT_STUDENT, { variables: { id: studentID } })
   const { data: Groups } = useQuery(GROUPS, { variables: { teacherID: [], courseID: [] } })

   // console.log(forEdit)

   const [stPhoneNum, setStPhoneNum] = useState({ number: null })
   const [stName, setStName] = useState(null)
   const [stBirth, setStBirth] = useState(null)
   const [stGender, setStGender] = useState(null)
   const [stTextInfo, setStTextInfo] = useState(null)
   const [stTg, setStTg] = useState()
   const [stGroup, setStGroup] = useState('')
   const [stPassword, setStPassword] = useState(null)

   console.log(stName)


   return (
      <div className="form-wrapper">
         <div className="top-place">
            <h1 className="place-name">Tahrirlash</h1>
            <button className="x-btn" onClick={onCloseF} >
               <img src={CloceBtn} alt="img" />
            </button>
         </div>

         <form onSubmit={(e) => {
            e.preventDefault()

            const data = {
               mainPhone: (stPhoneNum.number && [stPhoneNum]) || ([forEdit && { number: forEdit.student.mainPhone[0].phone }]),
               name: (stName) || (forEdit && forEdit.student.name),
               birthday: stBirth || (forEdit && forEdit.student.birthday),
               password: stPassword,
               gender: (stGender - 0) || (forEdit && forEdit.student.gender - 0),
               photo: 'null',
               groupID: stGroup ? stGroup : [],
               comment: stTextInfo,
               newNumber: fieldInput,
               parentNumber: fieldParents,
               telegram: [{ telegram: stTg }],
               address: [{ address: 'null' }]
            }

            console.log(data)
            // UpdateStudents({ variables: data })
         }}>
            <div className="form-input">
               <label htmlFor="">Telefon</label>
               <PhoneNumberInput
                  setPhone={setStPhoneNum}
               />

            </div>

            <div className="form-input">
               <label htmlFor="name">Ism</label>
               <input type="text" name="" id="name" className="new-input" defaultValue={forEdit && forEdit.student.name} onChange={e => setStName(e.target.value)} />
            </div>
            <div className="form_group">
               <label htmlFor="date" className="form_label">To’g’ilgan sana</label>

               <DatePicker
                  className='date__picker lid-edit-date'
                  // value={moment(stBirth, "YYYY-MM-DD")}
                  defaultValue={forEdit && moment(forEdit.student.birthday, "YYYY-MM-DD")}
                  onChange={(value, dateString) => {
                     setStBirth(dateString)
                  }}
                  // onChange={(e) => console.log(e.day)}
                  // defaultPickerValue={forEdit && forEdit.student.birthday}
                  placeholder={"Kun-Oy-Yil"}
                  // forEdit && moment(forEdit.student.birthday, "YYYY-MM-DD")
                  //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                  format={"DD-MM-YYYY"}
               />
            </div>
            <div className="form-input">
               <label htmlFor="date">Jinsi</label>
               <div className="gender">
                  <input type="radio" name="gender" id="" checked={forEdit && forEdit.student.gender === 1 ? 'checked' : false} value={1} onChange={e => setStGender(e.target.value)} />
                  <span>Erkak</span>

                  <input type="radio" name="gender" id="" checked={forEdit && forEdit.student.gender === 2 ? 'checked' : false} value={2} onChange={e => setStGender(e.target.value)} />
                  <span>Ayol</span>
               </div>
            </div>
            <div className="form-input">
               <label htmlFor="group">Guruhni tanlang</label>
               <DropSearch
                  arr={Groups && Groups.groups}
                  pInput={'Variantlarni tanlang'}
                  fnc={setStGroup}
               />
            </div>
            <div className="form-input">
               <label htmlFor="group">Komment</label>
               <textarea className="comment" name="" id="" cols="30" rows="10" value={forEdit && forEdit.student.comment} onChange={e => setStTextInfo(e.target.value)}></textarea>
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
                        <div className="number">
                           <span>+998</span>
                           <PhoneInput
                              className="phone_number"
                              country={"uz"}
                              inputStyle={{
                                 width: "100%",
                                 padding: "13px 10px 13px 44px",
                                 background: "#F7F9FB",
                                 border: "2px solid #EDF2F8",
                                 boxSizing: "border-box",
                                 bordeRadius: "7px",
                                 fontSize: "16px"
                              }}
                              specialLabel={false}
                              disableDropdown={true}
                              countryCodeEditable={false}
                              areaCodes={{
                                 uz: ["+998"],
                              }}
                              masks={{ uz: "(..) ...-..-.." }}
                              prefix="+"
                              onChange={number => {
                                 if (number.length === 12) {
                                    setInputField([...fieldInput, { number }])
                                 }
                              }}
                           />
                        </div>
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
                  <input type="text" name="" id="" autoComplete="off" className="user_name" value={forEdit && forEdit.student.telegram[0].telegram} onChange={e => setStTg(e.target.value)} />
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
