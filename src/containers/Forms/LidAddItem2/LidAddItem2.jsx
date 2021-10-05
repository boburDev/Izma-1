import './LidAddItem2.scss'
import { useRef , useState } from 'react'
import request from '../../../services'
import DropSearch from '../../../components/DropSearch/DropSearch'
import { TimePicker, DatePicker } from 'antd'
import moment from 'moment';

const format = 'HH:mm';

const LidAddItem2 = ({ setActive1, active1, refresh, setRefresh, onClose }) => {
   const itemName = useRef()
   const [time, setTime] = useState('')
   const [startDate, setStartDate] = useState()
   console.log(startDate)
   // const boardIn = useRef()


   const handleSub = async () => {
      
      await request.post(`/item`, {
         itemName: itemName.current.value,
         boardIn: 3,
         time: time
      });
      setRefresh(!refresh)
   }
   return (
      <div className={`form2 ${active1 ? 'active' : ''}`}>
         <div className="form2-header">
            <h2>Yangi guruh qo'shish</h2>

            <div className="closeBox" onClick={() => onClose()}>
               <span></span>
            </div>
         </div>
         <form action="" onSubmit={handleSub}>
            <div className="row">
               <label htmlFor="Nomi">Nomi</label>
               <input type="text" ref={itemName} />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Kursni tanlash</label>
               <DropSearch
                  pInput="Kursni tanlang"
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">O’qituvchini tanlang</label>
               <DropSearch
                  pInput="O’qituvchini tanlang"
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Kunlar</label>
               <DropSearch
                  pInput="Kunlarni tanlang"
               />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Darsning boshlanish vaqti</label>
               <TimePicker onChange={e => setTime(e.format('HH:mm'))} defaultValue={moment('00:00', format)} format={format} />
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