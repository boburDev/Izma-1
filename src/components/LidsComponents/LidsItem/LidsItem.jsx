import './LidsItem.scss'
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import MenuIcon from '../../../assets/Icons/menu.svg'
import Edit from '../../../assets/Icons/edit.svg'
import Delete from '../../../assets/Icons/delete.svg'
import { useEffect, useRef } from 'react'

const LidsItem = ({ item, index }) => {
   const [menu, setMenu] = useState()
   const useOutsideAlerter = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            let coun = 0
            event.path && event.path.map(el => {
               if (el.className === 'boxmenu active') {
                  coun++
               }
               return ''
            })


            if (coun === 0) {
               setMenu(false)
            }

         }
         document.addEventListener("mousedown", handleClickOutside);

         return () => {
            document.removeEventListener("mousedown", handleClickOutside);
         };
      }, [ref])
   }

   const wrapperRef = useRef(null);
   useOutsideAlerter(wrapperRef);
   return (
      <Draggable
         key={item.id}
         draggableId={item.id}
         index={index}
      >
         {(provided, snapshot) => {
            return (
               <div
                  className="lidList-inner"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}

                  style={{
                     userSelect: "none",
                     backgroundColor: snapshot.isDragging
                        ? "#E7E7EC"
                        : "#E7E7EC",
                     color: "white",
                     ...provided.draggableProps.style
                  }}
               >
                  <div className="lidList-inner-user">
                     <span className='span'>{item.userName} / {item.userNumber}</span>
                     <div className="menuWrapper" >
                        <button className="lidList-inner-user-button" onClick={() => setMenu(!menu)}><img src={MenuIcon} alt="" /></button>
                        <div className={`boxmenu ${menu ? 'active' : ''}`} ref={wrapperRef}>
                           <span onClick={() => {
                              setMenu(false)
                              // setEdit(true)
                           }}><img src={Edit} alt="" /> Tahrirlash</span>
                           <span><img src={Delete} alt="" /> O’chirish</span>
                        </div>
                     </div>
                     <span className={`lidList-inner-comment ${item?.userComment ? 'hasComment' : ''}`}>
                        {item.userComment}
                     </span>
                  </div>
               </div>
            );
         }}
      </Draggable>
   )
}

export default LidsItem
