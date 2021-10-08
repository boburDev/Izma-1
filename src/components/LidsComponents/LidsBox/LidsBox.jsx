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
import { useEffect, useRef } from 'react'
import LidAddForm from '../../../containers/Forms/LidAddForm/LidAddForm';
import LidAddItem from '../../../containers/Forms/LidAddItem/LidAddItem';
import { Drawer } from 'antd';
import { useMutation } from '@apollo/client';
import { DELETE_BOX } from '../../../pages/Lids/query';

const LidsBox = ({ column, columnId, isVisible, columns, setColumns, groupCreate, sorov }) => {

   const [form1, setForm1] = useState()
   const [menu, setMenu] = useState()
   const [defaultInfo, setDefaultInfo] = useState('')
   const [active, setActive] = useState(false)
   const [openEdit, setOpenEdit] = useState(false)

   const [deleteBox] = useMutation(DELETE_BOX)

   const closeEdit = () => {
      setOpenEdit(false)
   }
   const useOutsideAlerter = (ref) => {
      useEffect(() => {
         function handleClickOutside(event) {
            let coun = 0
            event.path && event.path.map(el => {
               if (el.className === 'boxmenu active' || el.className === 'lidItem-top-right') {
                  coun++
               }
               return ''
            })

            
            if(coun === 0) {
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
      <Droppable droppableId={columnId} key={columnId}>
         {(provided, snapshot) => {
            return (
               <div className="lidListWrapper">
                  <Drawer
                     placement="right"
                     closable={false}
                     onClose={closeEdit}
                     visible={openEdit}
                  >
                     <LidAddItem
                        onClose={closeEdit}
                        setColumns={setColumns}
                        columns={columns}
                        defaultInfo={defaultInfo}
                        boxId={column.id}
                        formNum={column.boxStatus}

                     />
                  </Drawer>
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
                           <div className={`boxmenu ${menu ? 'active' : ''}`} ref={wrapperRef}>
                              <span
                                 onClick={() => {
                                    setMenu(false)
                                    setDefaultInfo(column?.name)
                                    setOpenEdit(true)
                                 }}
                              ><img src={Edit} alt=""/>Tahrirlash</span>
                              {
                                 groupCreate ?
                                 <span
                                       onClick={() => {
                                          groupCreate(true)
                                          setMenu(false)
                                       }}
                                 ><img src={Add} alt="" />Guruh yaratish</span>
                                  :
                                 <>
                                   {
                                      sorov ? 
                                      <span><img src={Add} alt="" />Formaga havolani nusxalash</span>
                                        :
                                      <></>
                                   }
                                 </>
                              }
                              <span onClick={() =>{
                                 setMenu(false)
                                 setForm1(true)
                              }}><img src={Link} alt="" />So’rov qo’shish</span>
                              <span
                                 onClick={() => {
                                    deleteBox({ variables: { boxID: column.id } })
                                 }}
                              ><img src={Delete} alt="" />O’chirish</span>
                           </div>
                        </div>
                     </div>
                     <div className={`lidItem-center ${column.items.length ? '' : 'not'}`}
                        style={{
                           minHeight: isVisible ? '0' : ''
                        }}
                     >
                        <div className="lidItem-center-form"
                           style={{
                              display: form1 ? '' : 'none'
                           }}
                        >
                           <LidAddForm
                              setAdd={setForm1}
                              // formId={1}
                              columns={columns}
                              setColumns={setColumns}
                              itemId={column.id}
                              formId={column.boxStatus}
                           />
                        </div>
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

