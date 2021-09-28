import { Table } from 'antd';
import { useState } from 'react';
import './Rooms.scss'
import EditImg from '../../../assets/Icons/settings-edit.svg'
import DeleteImg from '../../../assets/Icons/settings-delete.svg'
import { Modal, Input } from 'antd';
import { ROOMS, CREATE_ROOM, DELETE_ROOM, UPDATE_ROOM } from './query'
import { useMutation, useQuery } from '@apollo/client';

const Rooms = ({ setMainTableData, mainTableData, data, values, setRowId, setValues }) => {

   const [isModalVisible, setIsModalVisible] = useState(false);
   const [isEditModalVisible, setEditIsModalVisible] = useState(false);
   const [roomName, setRoomName] = useState('');
   const [editRoomName, setEditRoomName] = useState('');
   const [getId, setGetId] = useState('')


   const { data: rooms } = useQuery(ROOMS)

   const [newRoom] = useMutation(CREATE_ROOM)

   const [UpdateRoom] = useMutation(UPDATE_ROOM)

   const [deleteRoom] = useMutation(DELETE_ROOM)

   const showModal = () => {
      setIsModalVisible(true);
   };

   const showEditModal = (e) => {
      setGetId(e.target.id)
      setEditIsModalVisible(true);
   };

   const handleOk = (e) => {
      newRoom({
         variables: {
            name: roomName
         }
      })
      setRoomName('')
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   const handleEditCancel = () => {
      setEditIsModalVisible(false);
   };


   const updateRoom = () => {
      UpdateRoom({
         variables: {
            ID: getId,
            name: editRoomName
         }
      })
      setEditIsModalVisible(false);
   };

   // useEffect(() => {
   //    const room = rooms && rooms.rooms && rooms.rooms.map((i, index) => {
   //       return { id: i.id, name: i.room, Id: index + 1 }
   //    })
   //    setMainTableData(room)
   // }, [setMainTableData, rooms]);

   const onRowClicked = (item) => {
      return {
         onClick: () => {
            setRowId(item.id);
            setValues(item);

         },
      };
   };

   const DeleteRoom = function (e) {
      deleteRoom({
         variables: {
            ID: e.target.id
         }
      })
   }

   const columns = [
      {
         title: 'id',
         dataIndex: 'Id',
         key: 'Id',
      },
      {
         title: "Ism",
         dataIndex: 'name',
         key: 'Id',
      },
      {
         title: 'Tahrirlash',
         dataIndex: 'edit',
         key: 'Id',
         width: "20px",
         render: (text, record, index) =>
            <img key={index}
               id={record.id}
               onClick={showEditModal}
               className="izma__table-settings-delete-btn" src={EditImg} alt="edit img" />
      },
      {
         title: 'Amallar',
         dataIndex: 'actions',
         key: 'Id',
         width: "20px",
         render: (text, record, index) =>
            <img
               id={record.id}
               key={index}
               onClick={DeleteRoom}
               className="izma__table-settings-delete-btn"
               src={DeleteImg}
               alt="delete img" />
      },

   ];
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
               <Modal footer={null} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                  <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
                     <label className='izma__courses__form-bolim-form-label'>Xona nomi</label>
                     <Input defaultValue={roomName} className={"section_name_input"} onKeyUp={e => setRoomName(e.target.value)} name={"nomi"} />

                  </div>
                  <div >
                     <button onClick={handleOk} className={"btn btn-submit izma__group__modal"}>
                        Saqlash
                     </button>
                  </div>
               </Modal>

               <Modal footer={null} visible={isEditModalVisible} onOk={updateRoom} onCancel={handleEditCancel}>
                  <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
                     <label className='izma__courses__form-bolim-form-label'>Xonani tahrirlash</label>
                     <Input defaultValue={roomName} className={"section_name_input"} onKeyUp={e => setEditRoomName(e.target.value)} name={"nomi"} />

                  </div>
                  <div >
                     <button onClick={updateRoom} className={"btn btn-submit izma__group__modal"}>
                        Saqlash
                     </button>
                  </div>
               </Modal>
            </div>
            <div className="izma__settings-employees-inner-button">
               <Table
                  className="izma__table__home"
                  columns={columns}
                  pagination={false}
                  onRow={onRowClicked}
                  dataSource={mainTableData} />
            </div>
         </div>
      </>
   )
}


export default Rooms;
