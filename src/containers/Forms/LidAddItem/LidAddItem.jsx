import './LidAddItem.scss'
import { useRef } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOX, UPDATE_BOX_NAME } from '../../../pages/Lids/queryy'
const LidAddItem = ({ columns, setColumns, onClose, formNum, defaultInfo, boxId}) => {
   const itemName = useRef()

   const [createBox] = useMutation(CREATE_BOX)
   const [updateBoxName] = useMutation(UPDATE_BOX_NAME)
  
   const handleSub = async (e) => {
      e.preventDefault()
      if(defaultInfo) {
         updateBoxName({ variables: { boxID: boxId, boxName: itemName.current.value, status: formNum}})
      }else {
         createBox({ variables: { boxName: itemName.current.value, status: formNum } })
      }

      document.getElementById('formItems').reset()

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
                  <input autoComplete="off"  type="text" ref={itemName} defaultValue={defaultInfo}/>
               :
                  <input autoComplete="off"  type="text" ref={itemName} />
            }
            <div className="box" style={{ display: 'flex', justifyContent: 'space-between' }}>
               <button type="submit" >Yaratish</button>
            </div>
         </form>
      </div>
   )
}

export default LidAddItem