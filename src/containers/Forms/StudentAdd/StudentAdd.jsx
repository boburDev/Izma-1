import './StudentAdd.scss'
import CloceBtn from '../../../assets/Icons/Group 26.svg'
import { useState, useEffect } from 'react'
import Plus from '../../../assets/Icons/plus.png'
import Minus from '../../../assets/Icons/minus.png'
import { DatePicker } from 'antd';
import 'antd/dist/antd.css'
import { ADD_NEW_STUDENTS, GROUPS, NEW_CASH } from '../../../Querys/Students_Query';
import { useMutation, useQuery } from '@apollo/client';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import DropSearch from '../../../components/DropSearch/DropSearch';
import PasswordInput from '../../../components/PasswordInput/PasswordInput'
import { useSnackbar } from 'notistack';
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider'
import moment from 'moment'


const StudentAdd = ({ onCloseF }) => {

   const [lang] = useLang();

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

   const { enqueueSnackbar } = useSnackbar();
   const [stPhoneNum, setStPhoneNum] = useState('')
   const [stName, setStName] = useState('')
   const [stBirth, setStBirth] = useState('')
   const [stGender, setStGender] = useState()
   const [stTextInfo, setStTextInfo] = useState('')
   const [stTg, setStTg] = useState('')
   const [stGroup, setStGroup] = useState(null)
   const [stPassword, setStPassword] = useState('')
   
   const [AddNewSudents, { data: checkStudent }] = useMutation(ADD_NEW_STUDENTS)
   const [newCash] = useMutation(NEW_CASH)
   

   useEffect(() => {
      const message = Language[lang].students.studentCreated.title
      const handleClick = () => {
      enqueueSnackbar(message, {
         variant: 'success',
      });

   };

      if (checkStudent && checkStudent.createStudent.id) {
         newCash({
            variables: {
               stID: checkStudent && checkStudent.createStudent.id,
               cashAmm: '0'
            }
         })

         handleClick()
      }
   }, [checkStudent, newCash, enqueueSnackbar, lang])

   const handleClick2 = (message) => {
      enqueueSnackbar(message, {
         variant: 'error',
      });

   };



   const { data: dataGroups } = useQuery(GROUPS, { variables: { teacherID: [], courseID: [] } })

   const hadleSubm = () => {
      if (stName && stGender) {

         const data = {
            mainPhone: [stPhoneNum.length === 12 ? { number: stPhoneNum } : { number: null }],
            name: stName,
            birthday: stBirth,
            password: stPassword,
            gender: stGender - 0,
            groupID: [{ groupID: stGroup?.id || null }],
            comment: stTextInfo,
            newNumber: fieldInput,
            parentNumber: fieldParents,
            telegram: [{ telegram: (stTg !== '@') ? stTg : null }],
         }

         AddNewSudents({ variables: data })
         setStBirth('')
         document.getElementById('studentFormRes').reset()
      }
   }

   return (
      <div className="form-wrapper s">
         <div className="top-place">
            <h1 className="place-name">{Language[lang].students.addNewStudent.addStudent}</h1>
            <button className="x-btn" onClick={onCloseF} >
               <img src={CloceBtn} alt="img" />
            </button>
         </div>

         <form onSubmit={(e) => {
            e.preventDefault()
            hadleSubm()
         }} id="studentFormRes">
            <div className="form-input">
               <label htmlFor="">{Language[lang].students.editStudentInfo.phoneNumber}</label>
               <PhoneNumberInput setPhone={setStPhoneNum} />

            </div>

            <div className="form-input">
               <label htmlFor="name">{Language[lang].students.id.fullName}</label>
               <input autoComplete="off"  type="text" name="" id="name" className="new-input" onChange={e => setStName(e.target.value)} required />
            </div>
            <div className="form_group" id='sty'>
               <label htmlFor="date" className="form_label">{Language[lang].students.editStudentInfo.birthday}</label>

               <DatePicker
                  className='date__picker lid-edit-date'
                  defaultPickerValue={stBirth !== "" ? moment(moment().format("DD-MM-YYYY"), "DD-MM-YYYY") : stBirth}
                  onChange={(value, dateString) => {
                     setStBirth(dateString)
                  }}
                  placeholder={Language[lang].teachers.addNewUser.date}
                  format={"DD-MM-YYYY"}

               />
            </div>
            <div className="form-input">
               <label htmlFor="date">{Language[lang].students.editStudentInfo.genderTitle}</label>
               <div className="genders">
                  <div className="gen_one">
                     <input required autoComplete="off"  value={1} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="men" />
                     <label htmlFor="men"></label>
                     <span>{Language[lang].students.editStudentInfo.gender[0]}</span>
                  </div>
                  <div className="gen_one">
                     <input required autoComplete="off"  value={2} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="women" />
                     <label htmlFor="women"></label>
                     <span>{Language[lang].students.editStudentInfo.gender[1]}</span>
                  </div>
               </div>
            </div>
            <div className="form-input">
               <label htmlFor="group">{Language[lang].students.addNewStudentTitle.selectGroup}</label>
               <DropSearch
                  arr={dataGroups && dataGroups.groups}
                  pInput={Language[lang].groups.addNewGroups.chooseVariant}
                  fnc={setStGroup}
                  notReq={true}
               />
            </div>
            <div className="form-input">
               <label htmlFor="group">{Language[lang].students.addNewStudentTitle.comment}</label>
               <textarea className="comment" name="" id="" cols="30" rows="10" onChange={e => setStTextInfo(e.target.value)}></textarea>
            </div>

            <div className="many-input">
               {
                  fieldInput.map((item, index) => (
                     <div className="form-input" key={index}>
                        <div className="buttosn">
                           <label htmlFor="">{Language[lang].students.addNewStudentTitle.secondaryPhone}</label>
                           <div className="bla-bla">
                              <button
                                 type="button"
                                 className={`remadd_btn alone ${fieldInput.length === 1 ? 'active' : ''}`}
                                 onClick={(e) => {
                                    e.preventDefault()
                                    removeField(index)
                                 }}
                              ><img src={Minus} alt="" /></button>
                              <button
                                 type='button'
                                 className="remadd_btn"
                                 onClick={(e) => {
                                    e.preventDefault()
                                    addNewField()
                                 }}
                              ><img src={Plus} alt="" /></button>
                           </div>
                        </div>
                        <PhoneNumberInput setParents={setInputField} parents={fieldInput} />
                     </div>
                  ))

               }
            </div>

            <div className="many-input">
               {
                  fieldParents.map((item, index) => (
                     <div className="form-inpun" key={index}>
                        <div className="buttosn">
                           <label htmlFor="">{Language[lang].students.addNewStudentTitle.parentPhoneNumber}</label>
                           <div className="bla-bla">
                              <button
                                 className={`remadd_btnTwo aloneTwo ${fieldParents.length === 1 ? 'active' : ' '}`}
                                 onClick={() => removeFieldTwo(index)}
                              ><img src={Minus} alt="" /></button>
                              <button
                                 className="remadd_btnTwo"
                                 onClick={() => addNewFieldTwo()}
                              ><img src={Plus} alt="" /></button>
                           </div>
                        </div>
                        <PhoneNumberInput setParents={setParents} parents={fieldParents} />

                     </div>
                  ))
               }
            </div>

            <div className="form-input alone">
               <label htmlFor="">{Language[lang].students.addNewStudentTitle.telegramUsername}</label>
               <div className="numberTwo">
                  <span>@</span>
                  <input   type="text" name="" autoComplete="off" className="user_name" onChange={e => setStTg('@' + e.target.value)} />
               </div>
            </div>

            <div className="form-input">
               <label htmlFor="">{Language[lang].students.addNewStudentTitle.password}</label>
               <PasswordInput setPassword={setStPassword} />
            </div>

            <button className="create-btn" onClick={() => {
               if (stName.length <= 0) {
                  handleClick2(`Ism va Familiyani kiriting !`)
               } else if (!stGender) {
                  handleClick2(`Jinsini tanlang !`)
               }
               (stName && stGender) && onCloseF()

            }}>{Language[lang].students.addNewStudentTitle.save}</button>
         </form>
      </div>
   )
}

export default StudentAdd
