import './LidsBox.scss'
import LidsItem from '../LidsItem/LidsItem';
import { Droppable } from 'react-beautiful-dnd';
import MenuIcon from '../../../assets/Icons/menu.svg'
import Arrow from '../../../assets/Icons/arrowLid.svg'
import Edit from '../../../assets/Icons/edit.svg'
import Delete from '../../../assets/Icons/delete.svg'
import Add from '../../../assets/Icons/add.svg'
import Link from '../../../assets/Icons/link.svg'
import { useState } from 'react';

const LidsBox = ({ column, columnId, isVisible }) => {

   
   const [menu, setMenu] = useState()

   const [active, setActive] = useState(false)
   return (
      <Droppable droppableId={columnId} key={columnId}>
         {(provided, snapshot) => {
            return (
               <div className="lidListWrapper">

                  <div
                     className={`lidItem ${active ? 'active' : ''}`}
                     {...provided.droppableProps}
                     ref={provided.innerRef}
                     style={{
                        background: isVisible
                           ? "transparent"
                           : "#fff",
                           boxShadow: isVisible ? 'none' : '',
                           marginTop: isVisible ? '0' : '',
                           marginBottom: isVisible ? '0' : ''
                     }}
                  >
                     <div className="lidItem-top"
                        style={{
                           display: isVisible ? 'none' : ''
                        }}
                     >
                        <div className="lidItem-top-left">
                           <h2>{column.name}</h2>
                        </div>
                        <div className="lidItem-top-right">
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
                     <div className={`lidItem-center ${column.items.length ? '' : 'not'}`}
                        style={{
                           minHeight: isVisible ? '0' : ''
                        }}
                     >
                        {column.items.map((item, index) => {
                           return (
                              <LidsItem
                                 item={item}
                                 index={index}
                                 key={index}
                              />
                           );
                        })}
                     </div>
                     <div className="lidItem-bottom"
                        style={{
                          display: isVisible ? 'none' : ''
                        }}
                     >
                        <h5>Ilovalar: <span>{column.items.length}</span></h5>
                     </div>
                     {provided.placeholder}
                  </div>
               </div>
            );
         }}
      </Droppable>
   )
}

export default LidsBox

