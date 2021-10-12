import './LidAddItem2.scss'
import { useRef, useState } from 'react'
import DropSearch from '../../../components/DropSearch/DropSearch'
import { TimePicker, DatePicker } from 'antd'
import moment from 'moment';
import { useQuery } from '@apollo/client'
import { COURSES } from '../../../Querys/Courses_Query'
import { TEACHER_FILTERS } from '../../../Querys/FilterSoha'

const format = 'HH:mm';

const LidAddItem2 = ({ setActive1, active1, refresh, setRefresh, onClose, defaultInfo }) => {
   const itemName = useRef(defaultInfo?.name)
   const [startDate, setStartDate] = useState('')
   const [time, setTime] = useState(defaultInfo?.courseTime)
   const [courseName, setCourseName] = useState(defaultInfo?.courseID)
   const [teacherName, setTeacherName] = useState(defaultInfo?.teachID)
   const [day, setDay] = useState(defaultInfo?.courseDays)
   console.log(startDate, time, courseName, teacherName, day)




   const { data: courses } = useQuery(COURSES)
   const { data: teachers } = useQuery(TEACHER_FILTERS)

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


   const handleSub = async (e) => {
      // e.preventDefault()
      // createBox({
      //    variables: {
      //       boxName: itemName.current.value,
      //       status: 3,
      //       courseID: courseName.id,
      //       courseName: courseName.name,
      //       teachID: teacherName.Id,
      //       teachName: teacherName.name,
      //       courseDays: day.id,
      //       courseTime: time
      //    }
      // })
      // document.getElementById('formLIdAddRes2').reset()
      onClose()
   }

   console.log(defaultInfo)
   return (
      <div className={`form2 ${active1 ? 'active' : ''}`} id="formLIdAddRes2">
         <div className="form2-header">
            <h2>Guruh yaratish</h2>

            <div className="closeBox" onClick={() => onClose()}>
               <span></span>
            </div>
         </div>
         <form action="" id="formLid1" onSubmit={handleSub}>
            <div className="row">
               <label htmlFor="Nomi">Nomi</label>
               <input autoComplete="off" type="text" ref={itemName} defaultValue={defaultInfo?.name}/>
            </div>
            <div className="row">
               <label htmlFor="Nomi">Kursni tanlash</label>
               <DropSearch
                  pInput="Kursni tanlang"
                  arr={courses && courses?.courses}
                  fnc={setCourseName}
                  defolt={defaultInfo?.courseID}
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">O’qituvchini tanlang</label>
               <DropSearch
                  pInput="O’qituvchini tanlang"
                  fnc={setTeacherName}
                  arr={teachers && teachers?.colleagues}
                  defolt={defaultInfo?.teachID}
                  teach={true}
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Kunlar</label>
               <DropSearch
                  pInput="Kunlarni tanlang"
                  fnc={setDay}
                  arr={daysArr}
                  defolt={defaultInfo?.courseDays}
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Darsning boshlanish vaqti</label>
               <TimePicker onChange={e => setTime(e.format('HH:mm'))} defaultValue={moment(defaultInfo?.courseTime, format)} format={format} />
            </div>
            <div className="row">
               <label htmlFor="">Guruh boshlanish sanasi</label>
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
            <button type="submit" >Yaratish</button>
         </form>
      </div>
   )

}

export default LidAddItem2