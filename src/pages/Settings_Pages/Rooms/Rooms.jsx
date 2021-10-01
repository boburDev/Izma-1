import React, { useEffect, useState } from 'react'
import './Rooms.scss'
import {  Button, Input } from 'antd';
import { ROOMS, CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM } from './query'
import { useMutation, useQuery } from '@apollo/client'
import TTable from '../../../components/Table/TTable'
import Modal from '../../../components/Modal/Modal'


const Rooms = () => {
   const [rooms,setRooms] = useState([])
   const [isModalVisible, setIsModalVisible] = useState(false)
   const [isEditModalVisible, setEditIsModalVisible] = useState(false)
   const [roomName, setRoomName] = useState('')
   const [getId, setGetId] = useState('')

   const { data: Srooms } = useQuery(ROOMS)
   const [newRoom] = useMutation(CREATE_ROOM)
   const [UpdateRoom] = useMutation(UPDATE_ROOM)
   const [deleteRoom] = useMutation(DELETE_ROOM)

   useEffect(()=>{
      if (Srooms && Srooms.rooms) {
         setRooms(Srooms && Srooms.rooms)
      }
   },[Srooms])

   const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
   const showEditModal = (id) => {
      setGetId(id)
      setEditIsModalVisible(true)
   }

   const handleOkk = () => {
      newRoom({
         variables: {
            name: roomName
         }
      })
      setRoomName('')
      setIsModalVisible(false)
   }


   const handleEditCancel = () => {
      setEditIsModalVisible(false)
   }


   const updateRoom = () => {
      UpdateRoom({
         variables: {
            ID: getId,
            name: roomName
         }
      })
      setEditIsModalVisible(false)
   }


   const DeleteRoom = (id) => {
      deleteRoom({
         variables: {
            ID: id
         }
      })
   }

   return (
      <>
         <div className="izma__settings-employees-inner">
            <div className="izma__settings-employees-inner-up">
               <h3 className="izma__settings-employees-inner-up-heading">
                  Xonalar
               </h3>
               <button className="izma__settings-archive-up-button" onClick={showModal} >
                  Yangi xona qo’shing
               </button>
               </div>
            <div className="izma__settings-employees-inner-button">
               <TTable arr={rooms} block={"settingsHashRooms"} setInfo={setRoomName} deleteRoom={DeleteRoom} setID={showEditModal} openModal={setEditIsModalVisible}/>
            </div>
         </div>

         <Modal
            block={`roomAdd`}
            title={`Yangi xona yaratish`}
            setMymodal={handleCancel}
            myModal={isModalVisible}
            setInfo={setRoomName}
            submitOK={handleOkk}
         />
         <Modal
            block={`roomEdit`}
            title={`Xonani tahrirlash`}
            setMymodal={setEditIsModalVisible}
            myModal={isEditModalVisible}
            setInfo={setRoomName}
            info={roomName}
            uptRoom={updateRoom}
         />


		 {/* <Modal visible={isModalVisible} footer={null} onCancel={handleCancel}>
                  <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
                     <label className='izma__courses__form-bolim-form-label'>Xona nomi</label>
                     <Input
                     defaultValue={roomName}
                     className={"section_name_input"}
                     onKeyUp={e => setRoomName(e.target.value)} name={"nomi"} />

                  </div>
                  <div>
                     <button onClick={handleCancel} className={"btn btn-submit izma__group__modal"}>
                        Saqlash
                     </button>
                  </div>
               </Modal> */}

               {/* <Modal footer={null} visible={isEditModalVisible} onOk={updateRoom} onCancel={handleEditCancel}>
                  <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
				  <label className='izma__courses__form-bolim-form-label'>Xonani tahrirlash</label>
				  <Input defaultValue={roomName} className={"section_name_input"} onKeyUp={e => setEditRoomName(e.target.value)} name={"nomi"} />
				  
                  </div>
                  <div >
				  <button onClick={updateRoom}
				  className={"btn btn-submit izma__group__modal"}>
				  Saqlash
				  </button>
                  </div>
				</Modal> */}
      </>
   )
}


export default Rooms