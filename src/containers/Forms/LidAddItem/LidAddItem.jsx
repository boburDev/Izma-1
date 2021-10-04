import './LidAddItem.scss'
import { useRef } from 'react'
const LidAddItem = ({ columns, setColumns, onClose, formNum, defaultInfo, boxId}) => {
   const itemName = useRef()
   // const boardIn = useRef()


   const handleSub = async (e) => {
      e.preventDefault()

      if(defaultInfo) {
         let obj = columns.find(el => el.id === boxId)
         obj.name = itemName.current.value
      }else {
         columns.push({
            id: 'aorrij',
            name: itemName.current.value,
            boxStatus: formNum,
            items: []
         })
      }

      let form = document.querySelector('#formItems')
      form.reset()

      setColumns(columns)
      onClose()
   }
   return (
      <div className={`form1`}>
         <div className="form1-header">
            <h2>Bo’lim yaratish</h2>

            <div className="closeBox" onClick={() => onClose()}>
               <span></span>
            </div>
         </div>
         <form id="formItems" onSubmit={handleSub}>
            <label htmlFor="Nomi">Nomi</label>
            {
               defaultInfo !== undefined ?
               <input type="text" ref={itemName} defaultValue={defaultInfo}/>
               :
               <input type="text" ref={itemName} />
            }
            <div className="box" style={{ display: 'flex', justifyContent: 'space-between' }}>
               <button type="submit" >Yaratish</button>
            </div>
         </form>
      </div>
   )
}

export default LidAddItem