import './LidsItem.scss'
import { Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';
import MenuIcon from '../../../assets/Icons/menu.svg'
import Edit from '../../../assets/Icons/edit.svg'
import Delete from '../../../assets/Icons/delete.svg'
import { useEffect, useRef } from 'react'
import LidsEdit from '../../../containers/Forms/LidEdit/LidEdit';
import { Drawer } from 'antd';
import { useMutation } from '@apollo/client';
import { DELETE_LEAD } from '../../../pages/Lids/query';

const LidsItem = ({ item, index, columns, setColumns }) => {
   const [menu, setMenu] = useState()

   const [deleteLead] = useMutation(DELETE_LEAD)

   function useOutsideAlerter(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setMenu(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }
   
   
   
   const wrapperRef = useRef(null);
   useOutsideAlerter(wrapperRef);

   const [openEdit, setOpenEdit] = useState()

   const closeEdit = () => {
     setOpenEdit(false)
   }



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
                     <Drawer
                        placement="right"
                        closable={false}
                        onClose={closeEdit}
                        visible={openEdit}
                     >
                        <LidsEdit
                           setEdit={setOpenEdit}
                           edit={openEdit}
                           columns={columns}
                           setColumns={setColumns}
                           item={item}
                        />
                     </Drawer>
                     <span className='span'>{item.name} / {item.phone} / </span>
                     <div className="menuWrapper" >
                        <button className="lidList-inner-user-button" onClick={() => setMenu(!menu)}><img src={MenuIcon} alt="" /></button>
                        <div className={`boxmenu ${menu ? 'active' : ''}`} ref={wrapperRef}>
                           <span onClick={() => {
                              setMenu(false)
                              setOpenEdit(true)
                           }}><img src={Edit} alt="" /> Tahrirlash</span>
                           <span onClick={() => {
                              deleteLead({variables: {leadID: item.id}})
                              setOpenEdit(false)
                              setMenu(false)
                              }}><img src={Delete} alt=""/> O’chirish</span>
                        </div>
                     </div>
                     <span className={`lidList-inner-comment ${item?.comment ? 'hasComment' : ''}`}>
                        {item.comment && item.comment.substring(0, 40)+'...'}
                     </span>
                  </div>
               </div>
            );
         }}
      </Draggable>
   )
}

export default LidsItem
