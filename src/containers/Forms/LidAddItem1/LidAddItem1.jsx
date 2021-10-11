import './LidAddItem1.scss'
import { useRef , useState } from 'react'
// import request from '../../../services'
import DropSearch from '../../../components/DropSearch/DropSearch'
import { TimePicker } from 'antd'
import moment from 'moment';
import { COURSES, TEACHER_FILTERS } from '../../../Querys/FilterSoha'
import { useMutation, useQuery } from '@apollo/client'
import { NEW_BOX } from '../../../pages/Lids/query'

const format = 'HH:mm';

const LidAddItem1 = ({ setActive1, active1, refresh, setRefresh, onClose }) => {
   const itemName = useRef()
   const [time, setTime] = useState('')
   const [courseName, setCourseName] = useState()
   const [teacherName, setTeacherName] = useState()
   const [day, setDay] = useState()

    const [createBox] = useMutation(NEW_BOX)
   

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
      e.preventDefault()
      createBox({ variables: {
         boxName: itemName.current.value, 
         status: 3,
         courseID: courseName.id,
         courseName: courseName.name,
         teachID: teacherName.Id,
         teachName: teacherName.name,
         courseDays: day.id,
         courseTime: time
      } })
      onClose()
   }
   return (
      <div className={`form2 ${active1 ? 'active' : ''}`} id="formLIdAddRes">
         <div className="form2-header">
            <h2>Yaratishni o’rnatish</h2>

            <div className="closeBox" onClick={() => onClose()}>
               <span></span>
            </div>
         </div>
         <form action="" id="formLid1" onSubmit={handleSub}>
            <div className="row">
               <label htmlFor="Nomi">Nomi</label>
               <input autoComplete="off"  type="text" ref={itemName} />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Kursni tanlash</label>
               <DropSearch
                  pInput="Kursni tanlang"
                  arr={courses && courses?.courses}
                  fnc={setCourseName}
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">O’qituvchini tanlang</label>
               <DropSearch
                  pInput="O’qituvchini tanlang"
                  fnc={setTeacherName}
                  arr={teachers && teachers?.colleagues}
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Kunlar</label>
               <DropSearch
                  pInput="Kunlarni tanlang"
                  fnc={setDay}
                  arr={daysArr}
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Darsning boshlanish vaqti</label>
               <TimePicker onChange={e => setTime(e.format('HH:mm'))} defaultValue={moment('00:00', format)} format={format} />
            </div>
            <button type="submit" >Yaratish</button>
         </form>
      </div>
   )
}

export default LidAddItem1