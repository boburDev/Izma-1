import './GroupEdit.scss'
import CloseBtn from '../../../assets/Icons/Group 26.svg'
import { TimePicker, DatePicker } from 'antd'
import moment from 'moment';
import { COURSES } from '../../../Querys/Courses_Query';
import { TEACHER_FILTERS } from '../../../Querys/FilterSoha';
import { ROOMS, UPDATE_GROUP } from '../../../Querys/Group_Query';
import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import DropSearch from '../../../components/DropSearch/DropSearch';
import { useSnackbar } from 'notistack';
import { useLang } from '../../../context/LanguageProvider';
import Language from '../../../lang/index'

const format = 'HH:mm';

const GroupEdit = ({ onClose, dataForEdit }) => {

   const [lang] = useLang()

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
         courseID: courseID.id || dataForEdit.courseId,
         teacherID: teacherID.Id || dataForEdit.teacherID,
         days: days.id === 'boshqa' ? selectedDate.sort().join() : (days.id || dataForEdit.days),
         roomID: roomID.id || dataForEdit.roomId,
         time,
         startDate,
         endDate
      }

      updateGroup({
         variables: data
      })

      onClose()
      handleClick()

      
      document.getElementById('groupEditRes').reset()
   }

   const daysArr = [
      {
         name: Language[lang].groups.addNewGroups.oddDays,
         id: '1,3,5',
      },
      {
         name: Language[lang].groups.addNewGroups.evenDays,
         id: '2,4,6',
      },
      {
         name: Language[lang].groups.addNewGroups.weekends,
         id: '7',
      },
      {
         name: Language[lang].groups.addNewGroups.everyDay,
         id: '1,2,3,4,5,6,7',
      },
      {
         name: Language[lang].groups.addNewGroups.other,
         id: 'boshqa',
      }
   ]

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

   const { enqueueSnackbar } = useSnackbar();

   const handleClick = () => {
      const message = 'O`zgartirildi'
      enqueueSnackbar(message, {
         variant: 'success',
      });

   };

   return (
      <div className="groupForm">
         <div className="inner">
            <div className="top_group">
               <h3>{Language[lang].groups.addNewGroups.addNewGroupTitle}</h3>
               <button onClick={onClose}><img src={CloseBtn} alt="img" /></button>
            </div>
            <div className="form_wrapper">
               <form action="" id="groupEditRes" >
                  <div className="form_inputs">
                     <label htmlFor="">{Language[lang].groups.addNewGroups.name}</label>
                     <input autoComplete="off"  defaultValue={name} onKeyUp={e => setName(e.target.value)} type="text" name="" id="" />
                  </div>
                  <div className="form_inputs">
                     <label htmlFor="">{Language[lang].groups.addNewGroups.course}</label>
                     <DropSearch
                        arr={courses && courses.courses}
                        pInput={Language[lang].groups.addNewGroups.chooseVariant}
                        fnc={setCourseID}
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
                        pInput={Language[lang].groups.addNewGroups.chooseVariant}
                        fnc={setDays}
                     />
                  </div>

                  {
                           days.id === 'boshqa' &&  <div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="mon">{Language[lang].home.graph2.days[0]}
                              <input autoComplete="off"  value="1" onChange={SelectDate} style={{marginLeft: '2px'}} type="checkbox" id="mon" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="tue">{Language[lang].home.graph2.days[1]}
                              <input autoComplete="off"  onChange={SelectDate} value="2" style={{marginLeft: '2px'}} type="checkbox" id="tue" /></label>
                           </div> 
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="wed">{Language[lang].home.graph2.days[2]}
                              <input autoComplete="off"  onChange={SelectDate} value="3" style={{marginLeft: '2px'}} type="checkbox" id="wed" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="thu">{Language[lang].home.graph2.days[3]}
                              <input autoComplete="off"  onChange={SelectDate} value="4" style={{marginLeft: '2px'}} type="checkbox" id="thu" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="fri">{Language[lang].home.graph2.days[4]}
                              <input autoComplete="off"  onChange={SelectDate} value="5" style={{marginLeft: '2px'}} type="checkbox" id="fri" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="sut">{Language[lang].home.graph2.days[5]}
                              <input autoComplete="off"  onChange={SelectDate} value="6" style={{marginLeft: '2px'}} type="checkbox" id="sut" /></label>
                           </div>
                           <div>
                           <label style={{display: 'flex', alignItems: 'center'}} htmlFor="sun">{Language[lang].home.graph2.days[6]}
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
                        <TimePicker onChange={e => setTime(e.format('HH:mm'))} defaultValue={time && moment(time, format)} format={format} />
                     </div>
                  </div>
                  <div className="form_group">
                     <label>{Language[lang].groups.addNewGroups.startGroupDate}</label>

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
                     <label>{Language[lang].groups.addNewGroups.endGroupDate}</label>

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
                  <button onClick={handleGroup}>{Language[lang].groups.addNewGroups.save}</button>
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