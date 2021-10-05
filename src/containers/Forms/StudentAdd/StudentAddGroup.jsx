import './StudentAdd.scss'



import CloceBtn from '../../../assets/Icons/Group 26.svg'
// import { AutoComplete } from 'antd';
import { useState } from 'react'

import 'antd/dist/antd.css'
import { ADD_NEW_STUDENTS_GROUP, NEW_CASH } from '../../../Querys/Students_Query';
import { useMutation } from '@apollo/client';
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput';
import { useParams } from 'react-router';



const StudentAddGroup = ({ onCloseF }) => {

   const { groupID } = useParams()

   const [stPhoneNum, setStPhoneNum] = useState('')
   const [stName, setStName] = useState('')
   const [stGender, setStGender] = useState()


   const [AddNewSudents, { data: checkStudent }] = useMutation(ADD_NEW_STUDENTS_GROUP)
   const [newCash] = useMutation(NEW_CASH)

   if (checkStudent && checkStudent.createStudent.id) {
      newCash({
         variables: {
            stID: checkStudent && checkStudent.createStudent.id,
            cashAmm: '0'
         }
      })
   }



   return (
      <div className="form-wrapper">
         <div className="top-place">
            <h1 className="place-name">Yangi foydalanuvchi qo’shish</h1>
            <button className="x-btn" onClick={onCloseF} >
               <img src={CloceBtn} alt="img" />
            </button>
         </div>

         <form onSubmit={(e) => {
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
            }
         }}>
            <div className="form-input">
               <label htmlFor="">Telefon</label>
               <PhoneNumberInput setPhone={setStPhoneNum} />

            </div>

            <div className="form-input">
               <label htmlFor="name">Ismmmmm</label>
               <input type="text" name="" id="name" className="new-input" onChange={e => setStName(e.target.value)} required />
            </div>
           
            <div className="form-input">
               <label htmlFor="date">Jinsi</label>
               <div className="gender">
                  <input type="radio" name="gender" id="" value={1} onChange={e => setStGender(e.target.value)} required />
                  <span>Erkak</span>

                  <input type="radio" name="gender" id="" value={2} onChange={e => setStGender(e.target.value)} required />
                  <span>Ayol</span>
               </div>
            </div>

            <button className="create-btn" onClick={() => {
               (stName && stGender) && onCloseF()
            }}>Yarating</button>
         </form>
      </div>
   )
}

export default StudentAddGroup
