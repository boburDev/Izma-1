import './StudentAdd.scss'



import CloceBtn from '../../../assets/Icons/Group 26.svg'
// import { AutoComplete } from 'antd';
import { memo, useEffect, useState } from 'react'

import 'antd/dist/antd.css'
import { ADD_NEW_STUDENTS_GROUP, NEW_CASH } from '../../../Querys/Students_Query';
import { useMutation } from '@apollo/client';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import { useParams } from 'react-router';
import { useLang } from '../../../context/LanguageProvider';
import Language from '../../../lang/index'


const StudentAddGroup = ({ onCloseF }) => {

   const { groupID } = useParams()
   const [lang] = useLang()

   const [stPhoneNum, setStPhoneNum] = useState('')
   const [stName, setStName] = useState('')
   const [stGender, setStGender] = useState()
   const [access, setAccess] = useState(false)


   const [AddNewSudents, { data: checkStudent }] = useMutation(ADD_NEW_STUDENTS_GROUP)
   const [newCash] = useMutation(NEW_CASH)

   useEffect(() => {

      if (checkStudent && checkStudent.createStudent.id && stGender !== '' && setStName !== '' && access === true) {
         newCash({
            variables: {
               stID: checkStudent && checkStudent.createStudent.id,
               cashAmm: '0'
            }
         })
         setStGender('')
         setStName('')
         setAccess(false)
      }
   }, [access, checkStudent, newCash, stGender])



   return (
      <div className="form-wrapper">
         <div className="top-place">
            <h1 className="place-name">{Language[lang].teachers.teacher.title}</h1>
            <button className="x-btn" onClick={onCloseF} >
               <img src={CloceBtn} alt="img" />
            </button>
         </div>

         <form id="settingFormRes2" onSubmit={(e) => {
            e.preventDefault()

            if (stName && stGender) {

               const data = {
                  mainPhone: [stPhoneNum.length === 12 ? {number: stPhoneNum} : { number: null }],
                  name: stName,
                  gender: stGender - 0,
                  groupID: [{groupID}],
               }

               // console.log(stPhoneNum.number.length)
               AddNewSudents({ variables: data })
               setAccess(true)
               e.target.reset()
            }

            document.getElementById('settingFormRes2').reset()
         }}>
            <div className="form-input">
               <label htmlFor="">{Language[lang].groups.individualPrice.phoneNumber}</label>
               <PhoneNumberInput setPhone={setStPhoneNum} />

            </div>

            <div className="form-input">
               <label htmlFor="name">{Language[lang].groups.attendance.fullName}</label>
               <input autoComplete="off"  type="text" name="" id="name" className="new-input" onChange={e => setStName(e.target.value)} required />
            </div>
           
            <div className="form-input">
               <label htmlFor="date">{Language[lang].students.editStudentInfo.genderTitle}</label>
               <div className="genders">
                  <div className="gen_one">
                     <input autoComplete="off" value={1} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="men" />
                     <label htmlFor="men"></label>
                     <span>{Language[lang].students.editStudentInfo.gender[0]}</span>
                  </div>
                  <div className="gen_one">
                     <input autoComplete="off" value={2} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="women" />
                     <label htmlFor="women"></label>
                     <span>{Language[lang].students.editStudentInfo.gender[1]}</span>
                  </div>
               </div>
            </div>

            <button className="create-btn" onClick={() => {
               (stName && stGender) && onCloseF()
            }}>{Language[lang].courses.editCourse.create}</button>
         </form>
      </div>
   )
}

export default memo (StudentAddGroup)
