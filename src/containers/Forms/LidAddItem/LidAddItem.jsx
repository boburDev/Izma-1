import './LidAddItem.scss'
import { useRef, useState } from 'react'
import request from '../../../services'
const LidAddItem = ({ active, setActive, setRefresh, ind, refresh, onClose }) => {
   const itemName = useRef()
   const boardIn = useRef()


   const handleSub = async (e) => {
      e.preventDefault()
      await request.post(`/item`, {
         itemName: itemName.current.value,
         boardIn: ind
      });
      setRefresh(!refresh)
      onClose()
   }
   return (
      <div className={`form1 ${active ? 'active' : ''}`}>
         <div className="form1-header">
            <h2>Bo’lim yaratish</h2>

            <div className="closeBox" onClick={() => onClose()}>
               <span></span>
            </div>
         </div>
         <form action="" onSubmit={handleSub}>
            <label htmlFor="Nomi">Nomi</label>
            <input type="text" ref={itemName} />
            <div className="box" style={{ display: 'flex', justifyContent: 'space-between' }}>
               <button type="submit" >Yaratish</button>
            </div>
         </form>
      </div>
   )
}

export default LidAddItem