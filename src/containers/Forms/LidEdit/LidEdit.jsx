import { useEffect, useState } from 'react'
import DropSearch from '../../../components/DropSearch/DropSearch'
import LidHistoryBlock from '../../../components/LidsComponents/LidHistoryBlock/LidHistoryBlock'
import PhoneNumberInput from '../../../components/PhoneNumberInput/PhoneNumberInput'
import { DatePicker } from 'antd'
import './LidEdit.scss'
import { /*useMutation,*/ useQuery } from '@apollo/client'
import { COURSES } from '../../../Querys/Courses_Query'
// import { UPDATE_LEAD } from '../../../pages/Lids/query'

const LidsEdit = ({ setEdit, edit, item, columns, setColumns }) => {
   const { data: courses } = useQuery(COURSES)
   const [phone, setPhone] = useState()
   const [stBirth, setStBirth] = useState('')
   const [course, setCourse] = useState('')
   console.log(course)
   const [comment, setComment] = useState('')
   const [stGender, setStGender] = useState()
   // const [updateLead] = useMutation(UPDATE_LEAD)
   // updateLead({variables: {leadID: id,  leadBoxID: id, phone: ''}})

   const handleSubmit = () => {
      
      let box = columns.find(el => el.id === item.leadBoxID)
      let lid = box.items.find(el => el.id === item.id)
      console.log(lid)
      
   }
   useEffect(() => {

   }, [phone, stBirth, comment, stGender])
   return (
      <div className={`lidsedit ${edit ? 'active' : ''}`}>
         <button onClick={handleSubmit}>Helo</button>
         <div className="lidsedit-header">
            <h2>So'rovni tahrirlash</h2>

            <div className="closeBox" onClick={() => setEdit(false)}>
               <span></span>
            </div>
         </div>
         <div className="lidsedit-body">
            <div className="lidsedit-body-left">
               <form action="formLIdAddRes3" id="" onSubmit={(e) => {
                  e.preventDefault()
                  document.getElementById('formLIdAddRes3').reset()
               }}>
                  <div className="row">
                     <label htmlFor="Nomi">Kurs</label>
                     <DropSearch
                       pInput={`Kurs nomi`}
                       fnc={setCourse}
                        arr={courses && courses.courses}
                       defolt={item && item.courseID}
                        // defolt={`8981ecca-2dc5-4364-b567-2c8c33cfe49b`}

                     />
                  </div>
                  <div className="row">
                     <label htmlFor="Nomi">Ism</label>
                     <input autoComplete="off"  type="text" defaultValue={item?.name} />
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