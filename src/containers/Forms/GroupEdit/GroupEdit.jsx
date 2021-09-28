import './GroupEdit.scss'
import CloseBtn from '../../../assets/Icons/Group 26.svg'
import { TimePicker, DatePicker } from 'antd'
import moment from 'moment';
import { COURSES } from '../../../Querys/Courses_Query';
import { TEACHER_FILTERS } from '../../../Querys/FilterSoha';
import { ROOMS, UPDATE_GROUP } from '../../../Querys/Group_Query';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';

const format = 'HH:mm';

const GroupEdit = ({ onClose, dataForEdit }) => {


   const [name, setName] = useState(dataForEdit.name)
   const [courseID, setCourseID] = useState(dataForEdit.courseId)
   const [teacherID, setTeacherID] = useState(dataForEdit.teacherID)
   const [days, setDays] = useState(dataForEdit.days)
   const [roomID, setRoomID] = useState(dataForEdit.roomId)
   const [time, setTime] = useState(dataForEdit.time)
   const [startDate, setStartDate] = useState(dataForEdit.startDate)
   const [endDate, setEndDate] = useState(dataForEdit.endDate)

   const [selectedDate, setselectedDate] = useState([])

   const { data: teachers } = useQuery(TEACHER_FILTERS)
   const { data: courses } = useQuery(COURSES)
   const { data: rooms } = useQuery(ROOMS)


   const [updateGroup] = useMutation(UPDATE_GROUP)


   const handleGroup = (e) => {
      e.preventDefault()
      const data = {
         groupID: dataForEdit.id,
         name,
         courseID,
         teacherID,
         days: days === 'boshqa' ? selectedDate.join() : days,
         roomID,
         time,
         startDate,
         endDate
      }

      updateGroup({
         variables: data
      })
      onClose()
   }

   function SelectDate(e) {
      if (e.target.checked) {
         setselectedDate([e.target.id, ...selectedDate])
      } else {
         for (var i = 0; i < selectedDate.length; i++) {
            if (selectedDate[i] === e.target.id) {
               selectedDate.splice(i, 1);
            }
         }
      }
   }

   // console.log(days)

   // console.log(selectedDate)

   return (
      <div className="groupForm">
         <div className="inner">
            <div className="top_group">
               <h3>Yangi guruh qo’shish</h3>
               <button onClick={onClose}><img src={CloseBtn} alt="img" /></button>
            </div>
            <div className="form_wrapper">
               <form action="">
                  <div className="form_inputs">
                     <label htmlFor="">Nomi</label>
                     <input defaultValue={name} onKeyUp={e => setName(e.target.value)} type="text" name="" id="" />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">Kurs tanlash</label>
                     <select onChange={e => {
                        setCourseID(e.target.value)
                     }} name="" id="">
                        <option style={{ "display": "none" }}>Choose course</option>
                        {
                           courses && courses.courses.map((e, i) => (

                              <option selected={e.id === courseID} key={i} value={e.id}>{e.name}</option>
                           ))
                        }
                     </select>
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">O'qituvchini tanlang</label>
                     <select name="" id="" onChange={e => setTeacherID(e.target.value)}>
                        <option style={{ "display": "none" }}>Choose teacher</option>
                        {
                           teachers && teachers.colleagues.map((e, i) => (
                              <option selected={e.id === teacherID} key={i} value={e.id}>{e.name}</option>
                           ))
                        }
                     </select>
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">Kunlar</label>
                     <select onChange={e => setDays(e.target.value)} name="" id="">
                        <option style={{ "display": "none" }}>Choose days</option>
                        <option selected={days === 'odd'} value="odd">Toq kunlar</option>
                        <option selected={days === 'even'} value="even">Juft kunlar</option>
                        <option selected={days === 'sat'} value="sat">Dam olish kuni</option>
                        <option selected={days === 'every'} value="every">Har kuni</option>
                        <option selected={days === 'boshqa'} value="boshqa">Boshqa</option>
                     </select>
                  </div>

                  {
                     days === 'boshqa' && <div>
                        <div>
                           <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="mon">Dushanba
                              <input value="mon" onChange={SelectDate} style={{ marginLeft: '2px' }} type="checkbox" id="mon" /></label>
                        </div>
                        <div>
                           <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="tue">Seshanba
                              <input onChange={SelectDate} value="tue" style={{ marginLeft: '2px' }} type="checkbox" id="tue" /></label>
                        </div>
                        <div>
                           <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="wed">Chorshanba
                              <input onChange={SelectDate} value="wed" style={{ marginLeft: '2px' }} type="checkbox" id="wed" /></label>
                        </div>
                        <div>
                           <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="thu">Payshanba
                              <input onChange={SelectDate} value="thu" style={{ marginLeft: '2px' }} type="checkbox" id="thu" /></label>
                        </div>
                        <div>
                           <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="fri">Juma
                              <input onChange={SelectDate} value="fri" style={{ marginLeft: '2px' }} type="checkbox" id="fri" /></label>
                        </div>
                        <div>
                           <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="sut">Shanba
                              <input onChange={SelectDate} value="sut" style={{ marginLeft: '2px' }} type="checkbox" id="sut" /></label>
                        </div>
                        <div>
                           <label style={{ display: 'flex', alignItems: 'center' }} htmlFor="sun">Yakshanba
                              <input onChange={SelectDate} value="sun" style={{ marginLeft: '2px' }} type="checkbox" id="sun" /></label>
                        </div>
                        <br />
                     </div>
                  }

                  <div className="form_inputs">
                     <label htmlFor="">Xonani tanlang</label>
                     <select onChange={e => setRoomID(e.target.value)} name="" id="">
                        <option style={{ "display": "none" }}>Choose room</option>
                        {
                           rooms && rooms.rooms.map((e, i) => (
                              <option selected={roomID === e.id} key={i} value={e.id}>{e.room}</option>
                           ))
                        }
                     </select>
                  </div>

                  <div className="form-input">

                     <div className="izma__clock-time-wrapper">
                        <label className="izma__clock-time-label">
                           Darsning boshlanish vaqti
                        </label>
                        <TimePicker onChange={e => setTime(e.format('HH:mm'))} defaultValue={time && moment(time, format)} format={format} />
                     </div>
                  </div>
                  <div className="form_group">
                     <label>Guruh boshlanish sanasi</label>

                     <DatePicker
                        className='date__picker'
                        defaultValue={moment(startDate, "YYYY-MM-DD")}
                        onChange={(value, dateString) => {
                           setStartDate(dateString)
                        }}
                        placeholder={"Kun-Oy-Yil"}
                        //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                        format={"DD-MM-YYYY"}
                     />
                  </div>
                  <div className="form_group">
                     <label>Guruh tugash sanasi</label>

                     <DatePicker
                        className='date__picker'
                        defaultValue={moment(endDate, "YYYY-MM-DD")}

                        onChange={(value, dateString) => {
                           setEndDate(dateString)
                        }}
                        placeholder={"Kun-Oy-Yil"}
                        //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                        format={"DD-MM-YYYY"}
                     />
                  </div>
                  <button onClick={handleGroup}>Yarating</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default GroupEdit









// import './groupsEditForm.scss'
// import CloseBtn from '../../../assets/Icons/Group 26.svg'
// import { TimePicker, DatePicker } from 'antd'
// import moment from 'moment';

// const format = 'HH:mm';


// const GroupEditForm = ({onClose})=>{
//     return (
//         <div className="groupForm">
//             <div className="inner">
//                 <div className="top_group">
//                     <h3>Yangi foydalanuvchi qo’shish</h3>
//                     <button onClick={onClose}><img src={CloseBtn} alt="img" /></button>
//                 </div>
//                 <div className="form_wrapper">
//                     <form action="">
//                         <div className="form_inputs">
//                             <label htmlFor="">Nomi</label>
//                             <input type="text" name="" id="" />
//                         </div>
//                         <div className="form_inputs">
//                             <label htmlFor="">Kurs tanlash</label>
//                             <select name="" id="">
//                                 <option value="">one</option>
//                                 <option value="">two</option>
//                                 <option value="">thre</option>
//                             </select>
//                         </div>
//                         <div className="form_inputs">
//                             <label htmlFor="">O'qituvchini tanlang</label>
//                             <select name="" id="">
//                                 <option value="">one</option>
//                                 <option value="">two</option>
//                                 <option value="">thre</option>
//                             </select>
//                         </div>
//                         <div className="form_inputs">
//                             <label htmlFor="">Kunlar</label>
//                             <select name="" id="">
//                                 <option value="">one</option>
//                                 <option value="">two</option>
//                                 <option value="">thre</option>
//                             </select>
//                         </div>
//                         <div className="form_inputs">
//                             <label htmlFor="">Xonani tanlang</label>
//                             <select name="" id="">
//                                 <option value="">one</option>
//                                 <option value="">two</option>
//                                 <option value="">thre</option>
//                             </select>
//                         </div>

// <div className="form-input">

//                 <div className="izma__clock-time-wrapper">
//                     <label  className="izma__clock-time-label">
//                     Darsning boshlanish vaqti
//                     </label>
//                 <TimePicker defaultValue={moment('00:00', format)} format={format} />
//                 </div>
//                 </div>
//                 <div className="form_group">
//           <label>Guruh boshlanish sanasi</label>

//           <DatePicker
//           className='date__picker'
//                 // onChange={(value, dateString) => {
//                 //   const v = {
//                 //     target: {
//                 //       name: "sana",
//                 //       value: dateString,
//                 //     },
//                 //   };
//                 //   handleChange(v);
//                 // }}
//                 placeholder={"Kun-Oy-Yil"}
//             //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
//               format={"DD-MM-YYYY"}
//               />
//           </div>
//           <div className="form_group">
//           <label>Guruh tugash sanasi</label>

//           <DatePicker
//           className='date__picker'
//                 // onChange={(value, dateString) => {
//                 //   const v = {
//                 //     target: {
//                 //       name: "sana",
//                 //       value: dateString,
//                 //     },
//                 //   };
//                 //   handleChange(v);
//                 // }}
//                 placeholder={"Kun-Oy-Yil"}
//             //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
//               format={"DD-MM-YYYY"}
//               />
//           </div>
//                         <button onClick={onClose}> Yarating</button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default GroupEditForm