import { useState } from 'react'
import LidBlockInner from '../LidBlockInner/LidBlockInner'
import './LidBlock.scss'
import MenuIcon from '../../../assets/Icons/menu.svg'
import Arrow from '../../../assets/Icons/arrowLid.svg'
import Edit from '../../../assets/Icons/edit.svg'
import Delete from '../../../assets/Icons/delete.svg'
import Add from '../../../assets/Icons/add.svg'
import Link from '../../../assets/Icons/link.svg'
const LidBlock = ({
   board,
   item,
   dragOverHandler,
   dragLeaveHandler,
   dragEndHandler,
   dropCardHandler,
   dragStartHandler,
   dropHandler,
   setEdit,
   isBlock

}) => {
   const [menu, setMenu] = useState()


   const [active, setActive] = useState(false)
   return (
      <>
         {
            (item.id == 1 || item.id == 4 || item.id == 7) &&  isBlock ?
               <div className={`block${active ? 'active' : ''}`}>
                  <div className="block-center"
                     onDragOver={(e) => dragOverHandler(e, item)}
                     onDragLeave={e => dragLeaveHandler(e)}
                     onDragEnd={(e) => dragEndHandler(e)}
                     onDrop={(e) => dropCardHandler(e, board, item)}
                  >
                     {
                        item.lists.map(el => (
                           <LidBlockInner
                              info={el}
                              board={board}
                              item={item}
                              dragStartHandler={dragStartHandler}
                              dragOverHandler={dragOverHandler}
                              dragLeaveHandler={dragLeaveHandler}
                              dragEndHandler={dragEndHandler}
                              dropHandler={dropHandler}
                              setEdit={setEdit}
                           />
                        ))
                     }
                  </div>
               </div> 
                  :
               <>
                  {
                     item.id == 1 || item.id == 4 || item.id == 7 ?
                     <>
                           
                     </> :

                        <div className={`block${active ? 'active' : ''}`}>
                           <div className="block-top">
                              <div className="block-top-left">
                                 <h4>{item.title}</h4>
                              </div>

                              <div className="block-top-right">
                                 <button onClick={() => setActive(!active)} className={`arrow ${active ? 'active' : ''}`}><img src={Arrow} alt="" /></button>
                                 <button onClick={() => setMenu(!menu)}><img src={MenuIcon} alt="" /></button>
                                 <div className={`boxmenu ${menu ? 'active' : ''}`}>
                                    <span><img src={Edit} alt="" />Tahrirlash</span>
                                    <span><img src={Add} alt="" />Formaga havolani nusxalash</span>
                                    <span><img src={Link} alt="" />So’rov qo’shish</span>
                                    <span><img src={Delete} alt="" />O’chirish</span>
                                 </div>
                              </div>
                           </div>
                           <div className="block-center"
                              onDragOver={(e) => dragOverHandler(e, item)}
                              onDragLeave={e => dragLeaveHandler(e)}
                              onDragEnd={(e) => dragEndHandler(e)}
                              onDrop={(e) => dropCardHandler(e, board, item)}
                           >
                              {
                                 item.lists.map(el => (
                                    <LidBlockInner
                                       info={el}
                                       board={board}
                                       item={item}
                                       dragStartHandler={dragStartHandler}
                                       dragOverHandler={dragOverHandler}
                                       dragLeaveHandler={dragLeaveHandler}
                                       dragEndHandler={dragEndHandler}
                                       dropHandler={dropHandler}
                                       setEdit={setEdit}
                                    />
                                 ))
                              }
                           </div>

                           <div className="block-bottom">
                              <h5>Ilovalar: <span>{item.lists.length}</span></h5>
                           </div>
                     </div>
                  }
               </>
         }
      </>
   )
}

export default LidBlock