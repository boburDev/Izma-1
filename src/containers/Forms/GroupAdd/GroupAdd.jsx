import './GroupAdd.scss'
import CloseBtn from '../../../assets/Icons/Group 26.svg'
import { TimePicker, DatePicker } from 'antd'
import moment from 'moment';
import { COURSES, TEACHER_FILTERS } from '../../../Querys/FilterSoha';
import { CREATE_GROUP, ROOMS } from '../../../Querys/Group_Query';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import DropSearch from '../../../components/DropSearch/DropSearch';

const format = 'HH:mm';

const GroupAdd = ({ onClose }) => {

   const [name, setName] = useState('')
   const [courseID, setCourseID] = useState('')
   const [teacherID, setTeacherID] = useState('')
   const [days, setDays] = useState('')
   const [roomID, setRoomID] = useState('')
   const [time, setTime] = useState('')
   const [startDate, setStartDate] = useState('')
   const [endDate, setEndDate] = useState('')

   const [selectedDate, setselectedDate] = useState([])

   const { data: teachers } = useQuery(TEACHER_FILTERS)
   const { data: courses } = useQuery(COURSES)
   const { data: rooms } = useQuery(ROOMS)
   
   const [createGroup] = useMutation(CREATE_GROUP, {
      update: (cache, data) => {
         // console.log(data)
      }
   })

   const handleGroup = (e) => {
      e.preventDefault()
      const data = {
         name,
         courseID,
         teacherID,
         days: days === 'boshqa' ? selectedDate.join() : days,
         roomID,
         time,
         startDate,
         endDate
      }

      createGroup({
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

  

   const daysArr = [
      {
         name: 'Toq kunlar',
         id: 'odd',
      },
      {
         name: 'Juft kunlar',
         id: 'even',
      },
      {
         name: 'Dam olish kuni',
         id: 'sat',
      },
      {
         name: 'Har kuni',
         id: 'every',
      },
      {
         name: 'Boshqa',
         id: 'boshqa',
      }
   ]


   



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
                     <input onKeyUp={e => setName(e.target.value)} type="text" name="" id="" />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">Kurs tanlash</label>
                     <DropSearch
                        fnc={setCourseID}
                        arr={courses && courses.courses}
                        pInput={'Variantlarni tanlang'}
                     />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">O'qituvchini tanlang</label>
                     <DropSearch
                        arr={teachers && teachers.colleagues}
                        pInput={'Variantlarni tanlang'}
                        fnc={setTeacherID}
                     />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">Kunlar</label>
                     <DropSearch
                        arr={daysArr && daysArr}
                        fnc={setDays}
                        pInput={'Variantlarni tanlang'}
                     />
                     
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
                     <DropSearch
                        arr={rooms && rooms.rooms}
                        pInput={'Variantlarni tanlang'}
                        fnc={setRoomID}
                     />
                  </div>

                  <div className="form-input">

                     <div className="izma__clock-time-wrapper">
                        <label className="izma__clock-time-label">
                           Darsning boshlanish vaqti
                        </label>
                        <TimePicker onChange={e => setTime(e.format('HH:mm'))} defaultValue={moment('00:00', format)} format={format} />
                     </div>
                  </div>
                  <div className="form_group">
                     <label>Guruh boshlanish sanasi</label>

                     <DatePicker
                        className='date__picker'
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

export default GroupAdd

