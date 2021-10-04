import './LidAddItem1.scss'
import { useRef } from 'react'
import request from '../../../services'


const LidAddItem1 = ({ setActive1, active1, refresh, setRefresh, onClose }) => {
   const itemName = useRef()
   // const boardIn = useRef()


   const handleSub = async () => {
      await request.post(`/item`, {
         itemName: itemName.current.value,
         boardIn: 3
      });
      setRefresh(!refresh)
   }
   return (
      <div className={`form2 ${active1 ? 'active' : ''}`}>
         <div className="form2-header">
            <h2>Yaratishni o’rnatish</h2>

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
               <input type="text" ref={itemName} />
            </div>
            <div className="row">
               <label htmlFor="Nomi">O’qituvchini tanlang</label>
               <input type="text" ref={itemName} />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Kunlar</label>
               <input type="text" ref={itemName} />
            </div>
            <div className="row">
               <label htmlFor="Nomi">Darsning boshlanish vaqti</label>
               <input type="text" ref={itemName} />
            </div>
            <button type="submit" >Yaratish</button>
         </form>
      </div>
   )
}

export default LidAddItem1