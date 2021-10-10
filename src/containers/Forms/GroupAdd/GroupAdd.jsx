import './GroupAdd.scss'
import CloseBtn from '../../../assets/Icons/Group 26.svg'
import { TimePicker, DatePicker } from 'antd'
import moment from 'moment';
import { COURSES, TEACHER_FILTERS } from '../../../Querys/FilterSoha';
import { CREATE_GROUP, ROOMS } from '../../../Querys/Group_Query';
import { useMutation, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import DropSearch from '../../../components/DropSearch/DropSearch';
import { useSnackbar } from 'notistack';
import { useLang } from '../../../context/LanguageProvider';
import Language from '../../../lang/index'

const format = 'HH:mm';

const GroupAdd = ({ onClose }) => {


   const [lang] = useLang();

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
   
   const [createGroup, {data: added}] = useMutation(CREATE_GROUP)
  
   
  
   const handleClick2 = () => {
      const message = 'Formani to`liq to`ldiring !'
      enqueueSnackbar(message, {
         variant: 'error',
      });

   };


   const handleGroup = (e) => {
      if (name && courseID?.id && teacherID?.Id && (days?.id || selectedDate) && roomID?.id && time && startDate && endDate) {
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

         createGroup({
            variables: data
         })
         onClose()
         
      }else {
         handleClick2()
      }
   }

   const { enqueueSnackbar } = useSnackbar();
   useEffect(() => {
      const handleClick = () => {
         const message = Language[lang].groups.addNewGroups.successfullyAdded
         enqueueSnackbar(message, {
            variant: 'success',
         });

      };
      if (added?.createGroup?.id) {
         handleClick()
         document.getElementById('grouFormRes').reset()
         setTime('')
         setEndDate('')
         setStartDate('')
      }
   }, [added, enqueueSnackbar, lang])

   
   
   
  

   

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


  
   



   return (
      <div className="groupForm">
         <div className="inner">
            <div className="top_group">
               <h3>{Language[lang].groups.addNewGroups.addNewGroupTitle}</h3>
               <button onClick={onClose}><img src={CloseBtn} alt="img" /></button>
            </div>
            <div className="form_wrapper">
               <form action="" id="grouFormRes" onSubmit={(e) =>{
                  e.preventDefault()
                  handleGroup()
               }}>
                  <div className="form_inputs">
                     <label htmlFor="">{Language[lang].groups.addNewGroups.name}</label>
                     <input autoComplete="off"   required onKeyUp={e => setName(e.target.value)} type="text" name="" id="" />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">{Language[lang].groups.addNewGroups.selectCourse}</label>
                     <DropSearch
                        fnc={setCourseID}
                        arr={courses && courses.courses}
                        pInput={Language[lang].groups.addNewGroups.chooseVariant}
                     />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">{Language[lang].groups.addNewGroups.selectTeacher}</label>
                     <DropSearch
                        arr={teachers && teachers.colleagues}
                        pInput={Language[lang].groups.addNewGroups.chooseVariant}
                        fnc={setTeacherID}
                     />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">{Language[lang].groups.addNewGroups.days}</label>
                     <DropSearch
                        arr={daysArr && daysArr}
                        fnc={setDays}
                        pInput={Language[lang].groups.addNewGroups.chooseVariant}
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
                     <label htmlFor="">{Language[lang].groups.addNewGroups.selectRoom}</label>
                     <DropSearch
                        arr={rooms && rooms.rooms}
                        pInput={Language[lang].groups.addNewGroups.chooseVariant}
                        fnc={setRoomID}
                     />
                  </div>

                  <div className="form-input">

                     <div className="izma__clock-time-wrapper">
                        <label className="izma__clock-time-label">
                        {Language[lang].groups.addNewGroups.startTimeLesson}
                        </label>
                        <TimePicker required onChange={e => setTime(e.format('HH:mm'))} defaultValue={moment('00:00', format)} format={format} 
                           value={time !== "" ? moment(time) : moment('00:00', format)}
                        />
                     </div>
                  </div>
                  <div className="form_group">
                     <label>{Language[lang].groups.addNewGroups.startGroupDate}</label>

                     <DatePicker
                        className='date__picker'
                        onChange={(value, dateString) => {
                           setStartDate(dateString)
                        }} 
                        required
                        placeholder={Language[lang].teachers.addNewUser.date}
                        value={startDate !== "" ? moment(startDate) : ""}
                        format={"DD-MM-YYYY"}
                     />
                  </div>
                  <div className="form_group">
                     <label>{Language[lang].groups.addNewGroups.endGroupDate}</label>

                     <DatePicker
                        className='date__picker'
                        onChange={(value, dateString) => {
                           setEndDate(dateString)
                        }}
                        required
                        placeholder={Language[lang].teachers.addNewUser.date}
                        value={endDate !== "" ? moment(endDate) : ""}
                        format={"DD-MM-YYYY"}
                     />
                  </div>
                  <button type="submit" >{Language[lang].groups.addNewGroups.save}</button>
               </form>
            </div>
         </div>
      </div>
   )
}

export default GroupAdd

