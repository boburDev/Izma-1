import './GroupAdd.scss'
import CloseBtn from '../../../assets/Icons/Group 26.svg'
import { TimePicker, DatePicker } from 'antd'
import moment from 'moment';
import { COURSES, TEACHER_FILTERS } from '../../../Querys/FilterSoha';
import { CREATE_GROUP, ROOMS } from '../../../Querys/Group_Query';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import DropSearch from '../../../components/DropSearch/DropSearch';
import { useSnackbar } from 'notistack';

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
   
   const [createGroup] = useMutation(CREATE_GROUP)

   const handleGroup = (e) => {
      e.preventDefault()
      const data = {
         name,
         courseID: courseID.id,
         teacherID: teacherID.Id,
         days: days.id === 'boshqa' ? selectedDate.sort().join() : days.id,
         roomID: roomID.id,
         time,
         startDate,
         endDate
      }

      // console.log(data)
      createGroup({
         variables: data
      })
      document.getElementById('grouFormRes').reset()
      onClose()
      handleClick()
   }

   function SelectDate(e) {
      if (e.target.checked) {
         setselectedDate([e.target.value, ...selectedDate])
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
         id: '1,3,5',
      },
      {
         name: 'Juft kunlar',
         id: '2,4,6',
      },
      {
         name: 'Dam olish kuni',
         id: '7',
      },
      {
         name: 'Har kuni',
         id: '1,2,3,4,5,6,7',
      },
      {
         name: 'Boshqa',
         id: 'boshqa',
      }
   ]

   const { enqueueSnackbar } = useSnackbar();

   const handleClick = () => {
      const message = 'Guruh qo`shildi'
      enqueueSnackbar(message, {
         variant: 'success',
      });

   };

   



   return (
      <div className="groupForm">
         <div className="inner">
            <div className="top_group">
               <h3>Yangi guruh qo’shish</h3>
               <button onClick={onClose}><img src={CloseBtn} alt="img" /></button>
            </div>
            <div className="form_wrapper">
               <form action="" id="grouFormRes" onSubmit={(e) =>{
                  e.preventDefault()

                  handleGroup()
                  document.getElementById('grouFormRes').reset()
               }}>
                  <div className="form_inputs">
                     <label htmlFor="">Nomi</label>
                     <input autoComplete="off"   required onKeyUp={e => setName(e.target.value)} type="text" name="" id="" />
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
                           days.id === 'boshqa' &&  <div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="mon">Dushanba
                              <input autoComplete="off"  value="1" onChange={SelectDate} style={{marginLeft: '2px'}} type="checkbox" id="mon" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="tue">Seshanba
                              <input autoComplete="off"  onChange={SelectDate} value="2" style={{marginLeft: '2px'}} type="checkbox" id="tue" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="wed">Chorshanba
                              <input autoComplete="off"  onChange={SelectDate} value="3" style={{marginLeft: '2px'}} type="checkbox" id="wed" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="thu">Payshanba
                              <input autoComplete="off"  onChange={SelectDate} value="4" style={{marginLeft: '2px'}} type="checkbox" id="thu" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="fri">Juma
                              <input autoComplete="off"  onChange={SelectDate} value="5" style={{marginLeft: '2px'}} type="checkbox" id="fri" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="sut">Shanba
                              <input autoComplete="off"  onChange={SelectDate} value="6" style={{marginLeft: '2px'}} type="checkbox" id="sut" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="sun">Yakshanba
                              <input autoComplete="off"  onChange={SelectDate} value="7" style={{marginLeft: '2px'}} type="checkbox" id="sun" /></label>
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
                        <TimePicker required onChange={e => setTime(e.format('HH:mm'))} defaultValue={moment('00:00', format)} format={format} />
                     </div>
                  </div>
                  <div className="form_group">
                     <label>Guruh boshlanish sanasi</label>

                     <DatePicker
                        className='date__picker'
                        onChange={(value, dateString) => {
                           setStartDate(dateString)
                        }} 
                        required
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
                        required
                        placeholder={"Kun-Oy-Yil"}
                        //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                        format={"DD-MM-YYYY"}
                     />
                  </div>
                  <button type="submit" >Yarating</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default GroupAdd

