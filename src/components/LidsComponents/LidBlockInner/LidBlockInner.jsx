import './LidBlockInner.scss'
import MenuIcon from '../../../assets/Icons/menu.svg'
import Edit from '../../../assets/Icons/edit.svg'
import Delete from '../../../assets/Icons/delete.svg'
import { useState } from 'react'

const LidBlockInner = ({
   board,
   item,
   info,
   dragStartHandler,
   dragOverHandler,
   dragLeaveHandler,
   dragEndHandler,
   dropHandler,
   setEdit
}) => {

   const [menu, setMenu] = useState()
   return (
      <div className="block-inner"
         onDragStart={(e) => dragStartHandler(e, board, item, info)}
         onDragOver={(e) => dragOverHandler(e, item)}
         onDragLeave={e => dragLeaveHandler(e)}
         onDragEnd={(e) => dragEndHandler(e)}
         onDrop={(e) => dropHandler(e, board, item, info)}

         draggable={true}>

         <div className="block-inner-user">
            <span className='span'>{info.userName} / {info.userNumber}</span>

        
            <div className="menuWrapper">
               <button className="block-inner-user-button" onClick={() => setMenu(!menu)}><img src={MenuIcon} alt="" /></button>
               <div className={`boxmenu ${menu ? 'active' : ''}`}>
                  <span onClick={() => {
                     setMenu(false)
                     setEdit(true)
                  }}><img src={Edit} alt="" /> Tahrirlash</span>
                  <span><img src={Delete} alt="" /> O’chirish</span>
               </div>
            </div>
         </div>
         <span className={`block-inner-comment ${info?.userComment ? 'hasComment' : ''}`}>
            {info.userComment}
         </span>

      </div>
   )
}

export default LidBlockInner