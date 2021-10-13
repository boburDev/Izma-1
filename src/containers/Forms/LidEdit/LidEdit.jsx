import { useEffect, useState } from 'react'
import DropSearch from '../../../components/DropSearch/DropSearch'
import LidHistoryBlock from '../../../components/LidsComponents/LidHistoryBlock/LidHistoryBlock'
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput'
import { DatePicker } from 'antd'
import './LidEdit.scss'
import { useMutation, useQuery } from '@apollo/client'
import { COURSES } from '../../../Querys/Courses_Query'
import { UPDATE_LEAD } from '../../../pages/Lids/query'
import { useLidsFunc } from '../../../context/LidsProvider'

const LidsEdit = ({ setEdit, edit, item }) => {
   const { data: courses } = useQuery(COURSES)
   const [columns] = useLidsFunc()
   const [setColumns] = useLidsFunc(true)
   const [phone, setPhone] = useState(item?.phone)
   const [stBirth, setStBirth] = useState(item?.birthday)
   const [course, setCourse] = useState(item?.courseID)
   const [comment, setComment] = useState(item?.comment)
   const [stGender, setStGender] = useState(item?.gender)
   const [useName, setUserName] = useState(item?.name)
   const [updateLead] = useMutation(UPDATE_LEAD)

 


   const handleSubmit = () => {
      let box = columns.find(el => el.id === item.leadBoxID)
      let items = [...box.items]
      let itemOr = JSON.parse(JSON.stringify(items))
      let obj = itemOr.find(el => el.id === item.id)
      obj.name = useName
      obj.phone = phone
      obj.comment = comment
      box.items = itemOr
      let arr = [...columns]
      setColumns(arr)

      updateLead({
         variables: {
            leadID: item.id,
            leadBoxID: item.leadBoxID,
            phone: phone,
            name: useName,
            birthday: stBirth,
            gender: +stGender,
            comment: comment,
            courseID: course.id,
            teachID: null,
            index: null

         }
      })
      setEdit(false)
   }
   useEffect(() => {

   }, [phone, stBirth, comment, stGender])
   return (
      <div className={`lidsedit ${edit ? 'active' : ''}`}>
         <div className="lidsedit-header">
            <h2>So'rovni tahrirlash</h2>

            <div className="closeBox" onClick={() => setEdit(false)}>
               <span></span>
            </div>
         </div>
         <div className="lidsedit-body">
            <div className="lidsedit-body-left">
               <form action="" id="formLIdAddRes31" onSubmit={(e) => {
                  e.preventDefault()
                  handleSubmit()
               }}>
                  <div className="row">
                     <label htmlFor="Nomi">Kurs</label>
                     <DropSearch
                        pInput={`Kurs nomi`}
                        fnc={setCourse}
                        arr={courses && courses.courses}
                        defolt={item && item.courseID}
                        notReq={true}
                     // defolt={`8981ecca-2dc5-4364-b567-2c8c33cfe49b`}

                     />
                  </div>
                  <div className="row">
                     <label htmlFor="Nomi">Ism</label>
                     <input autoComplete="off" type="text"
                        defaultValue={item?.name}
                        onKeyUp={(e) => setUserName(e.target.value)}
                     />
                  </div>
                  <div className="row">
                     <label htmlFor="Nomi">Telefon</label>
                     <PhoneNumberInput
                        setPhone={setPhone}
                        parents={item?.phone}

                     />
                  </div>
                  <div className="row" id="sty3">
                     <label htmlFor="Nomi">Tugingan kun</label>
                     <DatePicker
                        className='date__picker lid-edit-date'
                        onChange={(value, dateString) => {
                           setStBirth(dateString)
                        }}
                        placeholder={"Kun-Oy-Yil"}
                        format={"DD-MM-YYYY"}
                     />
                  </div>
                  <div className="form-input">
                     <label htmlFor="date">Jinsi</label>
                     <div className="genders">
                        <div className="gen_one">
                           <input autoComplete="off" value={1} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="men" />
                           <label htmlFor="men"></label>
                           <span>Erkak</span>
                        </div>
                        <div className="gen_one">
                           <input autoComplete="off" value={2} onChange={e => setStGender(e.target.value)} type="radio" name="gender" id="women" />
                           <label htmlFor="women"></label>
                           <span>Ayol</span>
                        </div>
                     </div>
                  </div>
                  <div className="form_one">
                     <label htmlFor="comment">Komment</label>
                     <textarea defaultValue={item?.comment} onKeyUp={e => setComment(e.target.value)} name="" id="" cols="30" rows="10"></textarea>
                  </div>
                  <button type="submit" >Saqlash</button>
               </form>
            </div>

            <div className="lidsedit-body-right">
               <h2>Tarix</h2>

               <div className="lidsedit-body-right-list">
                  <LidHistoryBlock />
                  <LidHistoryBlock />
                  <LidHistoryBlock />
                  <LidHistoryBlock />
               </div>
            </div>
         </div>
      </div>
   )
}

export default LidsEdit