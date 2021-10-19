import './LidsBox.scss'
import LidsItem from '../LidsItem/LidsItem';
import { Droppable } from 'react-beautiful-dnd';
import MenuIcon from '../../../assets/Icons/menu.svg'
import Arrow from '../../../assets/Icons/arrowLid.svg'
import Edit from '../../../assets/Icons/edit.svg'
import Delete from '../../../assets/Icons/delete.svg'
import Add from '../../../assets/Icons/add.svg'
import LidArrow from '../../../assets/Icons/lidArrow.svg'
import Link from '../../../assets/Icons/link.svg'
import { useState } from 'react';
import { useEffect, useRef } from 'react'
import LidAddForm from '../../../containers/Forms/LidAddForm/LidAddForm';
import LidAddItem from '../../../containers/Forms/LidAddItem/LidAddItem';
import { Drawer } from 'antd';
import { useMutation } from '@apollo/client';
import { DELETE_BOX } from '../../../pages/Lids/query';
import { useSnackbar } from 'notistack';
import LidAddItem1 from '../../../containers/Forms/LidAddItem1/LidAddItem1';
import LidAddItem2 from '../../../containers/Forms/LidAddItem2/LidAddItem2';
import { dayDivider } from '../../../context/DayDividerProvider';

const LidsBox = ({ column, columnId, isVisible, columns, setColumns, groupCreate, sorov }) => {

   const [form1, setForm1] = useState()
   const [menu, setMenu] = useState()
   const [defaultInfo, setDefaultInfo] = useState('')
   const [active, setActive] = useState(false)
   const [openEdit, setOpenEdit] = useState(false)
   const [openEdit2, setOpenEdit2] = useState(false)
   const [openEdit3, setOpenEdit3] = useState(false)

   const [deleteBox] = useMutation(DELETE_BOX)

   const closeEdit = () => {
      setOpenEdit(false)
   }
   const closeEdit2 = () => {
      setOpenEdit2(false)
   }
   const closeEdit3 = () => {
      setOpenEdit3(false)
   }

  

   
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
   const { enqueueSnackbar } = useSnackbar();
   const handleClick = () => {
      const message = 'Link nusxalandi'
      enqueueSnackbar(message, {
         variant: 'success',
      });

   };




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
                  <Drawer
                     placement="right"
                     closable={false}
                     onClose={closeEdit2}
                     visible={openEdit2}
                  >
                     <LidAddItem1
                        onClose={closeEdit2}
                        setColumns={setColumns}
                        columns={columns}
                        defaultInfo={defaultInfo}
                        boxId={column.id}
                        formNum={column.boxStatus}

                     />
                  </Drawer>
                  <Drawer
                     placement="right"
                     closable={false}
                     onClose={closeEdit3}
                     visible={openEdit3}
                  >
                     <LidAddItem2
                        onClose={closeEdit3}
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
                           {
                              groupCreate ?
                              <h2>
                                 <span>{column?.name}</span>
                                 <span>{column?.courseName}</span>
                                 <span>{column?.teachName}</span>
                                 <span>{dayDivider(column?.courseDays)}</span>
                                 <span>{column?.courseTime}</span>
                              </h2>
                                 :
                              <h2>{column.name}</h2>
                           }
                        </div>
                        <div className="lidItem-top-right">
                           <button onClick={() => setActive(!active)} className={`arrow ${active ? 'active' : ''}`}><img src={Arrow} alt="" /></button>
                           <button onClick={() => setMenu(!menu)}><img src={MenuIcon} alt="" /></button>
                           <div className={`boxmenu ${menu ? 'active' : ''}`} 
                           style={{
                              bottom: !groupCreate && !sorov ? '-103px' :'' 
                           }}
                           ref={wrapperRef}>
                              <span
                                 onClick={() => {
                                    setMenu(false)
                                    column.boxStatus < 3 ? setDefaultInfo(column?.name) : setDefaultInfo(column)
                                    column.boxStatus < 3 ? setOpenEdit(true) : setOpenEdit2(true)
                                    
                                 }}
                              ><img src={Edit} alt=""/>Tahrirlash</span>
                              {
                                 groupCreate ?
                                 <span
                                       onClick={() => {
                                          setMenu(false)
                                          setDefaultInfo(column)
                                          setOpenEdit3(true)
                                       }}
                                    ><img src={LidArrow} alt="" />Guruh yaratish</span>
                                  :
                                 <>
                                   {
                                      sorov ? 
                                      <span
                                       onClick={() => {
                                                   navigator.clipboard.writeText(`http://localhost:3000/${localStorage.getItem('hashtag')}/entry/lead/boxId=${column.id}`)
                                       setMenu(false)
                                       handleClick()
                                       }}
                                      ><img src={Link} alt="" />Formaga havolani nusxalash</span>
                                        :
                                      <></>
                                   }
                                 </>
                              }
                              <span onClick={() =>{
                                 setMenu(false)
                                 setForm1(true)
                              }}><img src={Add} alt="" />So’rov qo’shish</span>
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
                                 columns={columns}
                                 setColumns={setColumns}
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

