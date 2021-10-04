import './LidAddItem.scss'
import { useRef } from 'react'
const LidAddItem = ({ columns, setColumn,  onClose }) => {
   const itemName = useRef()
   // const boardIn = useRef()


   const handleSub = async (e) => {
      e.preventDefault()
      
      onClose()
   }
   return (
      <div className={`form1}`}>
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