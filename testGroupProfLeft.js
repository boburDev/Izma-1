import './GroupProfilLeft.scss'
import { useState } from 'react'
import { useParams } from 'react-router';
import { Link } from 'react-router-dom'
import GroupEdit from '../../../../containers/Forms/GroupEdit/GroupEdit';
import { Drawer } from 'antd';
import { Modal, AutoComplete, DatePicker } from 'antd';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import {
   BY_GROUP_ID, DELETE_GROUP, GET_STUDENTS, SELECT_STUDENT_GROUP, STATUS_5_6, DELETE_FROM_GROUP,
   CHECK_CASH, UPDATE_CASH, STATUS_3_4, HISTORY_PAYMENT, SUBSCRIPTION_GROUPS, SUBSCRIPTION_STUDENT
} from '../../../../Querys/GroupTabs';
import confirm from 'antd/lib/modal/confirm';
import { useEffect } from 'react';
import Trash from '../../../../assets/trash.png'
import FinanceAddPaymentForm from '../../../../containers/Finances/FinancesForm/FinanceAddPaymentForm/financeAddPaymentForm'
import Check from '../../../../components/Check/Check'

const GroupProfilLeft = (prop) => {

   const newNoteStyle = {
      width: '100%',
      outline: 'none',
      height: '100px',
      resize: 'none',
      padding: '10px 20px',
      background: '#F7F9FB',
      border: '2px solid #EDF2F8',
      boxSizing: 'border-box',
      borderRadius: '7px',
   }


   const [userInput, setUserInput] = useState('')
   const [selectedUser, setSelectedUser] = useState()
   const [startedDate, setStartedDate] = useState('')
   const [dataUser, setDataUser] = useState([])
   const [staatus, settStatus] = useState()
   const [stID, setStID] = useState()
   const [idName, setIdName] = useState()



   const { groupID } = useParams()

   const { data: groups } = useQuery(BY_GROUP_ID, {
      variables: { groupID }
   })

   prop.studData(groups && groups.byGroupID.students)

   const { data: checkCache } = useQuery(CHECK_CASH, {
      variables: { stID: selectedUser }
   })

   const payment = () => {
      let backCash = (checkCache && checkCache.studentCash.cashAmount) - (groups && groups.byGroupID.price)
      UpdatePayment({ variables: { stID: selectedUser, cashAmm: String(backCash) } })

      const data = { credit: checkCache && checkCache.studentCash.cashAmount, studentID: selectedUser }
      HistoryPay({ variables: data })

   }

   const { data: students } = useQuery(GET_STUDENTS, {
      variables: { name: userInput }
   })

   useEffect(() => {
      if (students && students.studentOnKeyup) {
         const users = students.studentOnKeyup.map(i => {
            return { key: i.id, value: i.name, text: i.name }
         })
         console.log();
         setDataUser(users)
      }
   }, [students])


   const [deletGroup, { data: delData }] = useMutation(DELETE_GROUP)

   const [HistoryPay] = useMutation(HISTORY_PAYMENT)
   const [AddStudentToGroup] = useMutation(SELECT_STUDENT_GROUP)
   const [SetStatus_5_6] = useMutation(STATUS_5_6)
   const [DelFromGroup] = useMutation(DELETE_FROM_GROUP)
   const [UpdatePayment, { data: forStatus }] = useMutation(UPDATE_CASH)
   const [SetStatus3_4] = useMutation(STATUS_3_4)

   if (forStatus && forStatus.updateCash.cashAmount) {
      SetStatus3_4({
         variables: {
            stID: selectedUser,
            status: (forStatus.updateCash.cashAmount - 0) < 0 ? 4 : 3
         }
      })
   }

   useSubscription(SUBSCRIPTION_GROUPS, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               byGroupID: () => { }
            }
         })
      },
   })

   useSubscription(SUBSCRIPTION_STUDENT, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               students: () => { }
            }
         })
      },
   })

   const [isModalVisible, setIsModalVisible] = useState(false);

   const handleDelete = () => {
      if (confirm('Are you sure you want to save this thing into the database?')) {
         deletGroup({
            variables: {
               id: groupID
            }
         })
      } else {
         console.log('Thing was not saved to the database.');
      }
   }


   const showModal = () => {
      setIsModalVisible(true);
   };

   const handleOk = () => {
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };

   const [delActive, setDElActive] = useState(false)
   const [visible, setVisible] = useState(false);

   const showDrawer = () => {
      setVisible(true);
   };

   const onClose = () => {
      setVisible(false);
   };


   const [visibleFiance, setVisibleFiance] = useState(false);

   const showFinanceDrawer = () => {
      setVisibleFiance(true);
   };
   const closeFinanceDrawer = () => {
      setVisibleFiance(false);
   };


   const [noteModal, setNoteModal] = useState(false);

   const showNote = () => {
      setNoteModal(true);
   };

   const NoteOk = () => {
      setNoteModal(false);
   };

   const NoteCancel = () => {
      setNoteModal(false);
   };


   const [checkModal, setCheckModal] = useState(false)

   const showCheck = () => {
      setCheckModal(true);
   };

   const CheckOk = () => {
      setCheckModal(false);
   };

   const CheckCancel = () => {
      setCheckModal(false);
   };

   // if (delData && delData) return <Redirect to='/groups' />


   return (
      <>
         <div className="izma__groups-attendance-left-section">
            <div className="izma__groups-attendance-left-up-wrapper">
               <p className="izma__groups-attendance-left-up-id">
                  {groups && groups.byGroupID.name}
               </p>
               <div className="izma__groups-attendance-boxses">
                  <button className="izma__groups-attendance-left-up-btn-edit" onClick={showDrawer}>

                  </button>
                  <Drawer
                     placement="right"
                     closable={false}
                     onClose={onClose}
                     visible={visible}
                  >
                     <GroupEdit dataForEdit={groups && groups.byGroupID} onClose={onClose} />
                  </Drawer>
                  <button onClick={handleDelete} className="izma__groups-attendance-left-up-btn-del">
                     <img src={Trash} alt="" />
                  </button>

               </div>
            </div>
            {groups && groups.byGroupID &&
               <div className="izma__groups-attendance-left-center-wrapper">
                  <h4 className="izma__groups-attendance-left-center-heading">
                     {groups.byGroupID.courseName} | {groups.byGroupID.teacher}
                  </h4>
                  <div className="izma__groups-attendance-left-center-prices-wrapper">
                     <p className="izma__groups-attendance-left-center-prices-text">
                        Narx:
                     </p>
                     <p className="izma__groups-attendance-left-center-prices-number">
                        {groups.byGroupID.price} UZS
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-time-wrapper">
                     <p className="izma__groups-attendance-left-center-time-text">
                        Vaqt:
                     </p>
                     <p className="izma__groups-attendance-left-center-time-number">
                        {groups.byGroupID.days} ・ {groups.byGroupID.time}
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-room-wrapper">
                     <p className="izma__groups-attendance-left-center-room-text">
                        Xonalar:
                     </p>
                     <p className="izma__groups-attendance-left-center-room-number">
                        Room #{groups.byGroupID.rooms}
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-communicate-wrapper">
                     <p className="izma__groups-attendance-left-center-communicate-text">
                        Mashg'ulotlar sanalari:
                     </p>
                     <p className="izma__groups-attendance-left-center-communicate-number">
                        {/* {groups.byGroupID.startDate} — {groups.byGroupID.endDate} */}
                     </p>
                  </div>
                  <div className="izma__students-content-line"></div>

                  <div className="izma__groups-attendance-left-bottom-wrapper">
                     {
                        groups.byGroupID.students && groups.byGroupID.students.map((s, i) => (
                           <>
                              <div key={i} className="izma__groups-attendance-left-bottom">
                                 {s.status === 2 && <div className="izma__groups-attendance-left-bottom-box-white"></div>}
                                 {s.status === 3 && <div className="izma__groups-attendance-left-bottom-box"></div>}
                                 {s.status === 4 && <div className="izma__groups-attendance-left-bottom-box-red"></div>}
                                 {s.status === 5 && <div className="izma__groups-attendance-left-bottom-box-orange"></div>}
                                 <h5 className="izma__groups-attendance-left-bottom-heading">
                                    {s.name}
                                 </h5>
                                 <p className="izma__groups-attendance-left-bottom-phone">
                                    {
                                       s.mainPhone.map((i) => <>+{i.phone}<br /></>)
                                    }
                                 </p>
                                 <button
                                    style={{ marginLeft: 'auto' }}
                                    className="izma__groups-attendance-left-bottom-btn" onClick={() => {
                                       setDElActive(!delActive)
                                       setSelectedUser(s.id)
                                       settStatus(s.status)
                                       setIdName({ studentID: s.id, studentName: s.name })
                                    }}>

                                 </button>

                              </div>
                           </>
                        ))
                     }
                     <div className={`open_del ${delActive ? 'active' : ''}`} >

                        {(staatus === 3 || staatus === 4) && <Link to="#" className="del_link" onClick={() => {
                           SetStatus_5_6({
                              variables: {
                                 stID: selectedUser, status: 5
                              }
                           })
                        }}>Muzlash</Link>}

                        {(staatus === 2 || staatus === 5) && <Link to="#" className="del_link" onClick={payment} >Faollashtirish</Link>}
                        <Link to="#" className="del_link" onClick={showFinanceDrawer}>To’lov</Link>
                        <Link to="#" className="del_link" onClick={showNote}>Yangi eslatma qo’shish</Link>
                        <Link to="#" className="del_link">Talabani guruhga o’tkazing</Link>
                        <Link to="#" className="del_link--red" onClick={() => {
                           SetStatus_5_6({
                              variables: {
                                 stID: selectedUser, status: 6
                              }
                           })

                           DelFromGroup({
                              variables: {
                                 grID: groupID, stID: selectedUser
                              }
                           })

                        }}>Guruhdan olib tashlash</Link>
                     </div>
                     <button className="izma__groups-attendance-left-bottom-button" onClick={showModal} ></button>
                  </div>
               </div>

            }

         </div>

         <Modal footer={null} title="Yangi talaba" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
               <label className='izma__courses__form-bolim-form-label'>Talabani tanlang</label>
               <AutoComplete
                  options={userInput.length && dataUser}
                  onSearch={e => setUserInput(e)}
                  onSelect={(v, o) => {
                     setStID(o.key)
                  }}
                  className={"section_name_input"} name={"nomi"} placeholder='Ism yoki telefon orqali topish' />

            </div>
            <div className="form_group">
               <label>Sanadan boshlab</label>
               <DatePicker
                  className='date__picker'
                  onChange={(value, dateString) => setStartedDate(dateString)}
                  placeholder={"Kun-Oy-Yil"}
                  //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                  format={"DD-MM-YYYY"}
               />
            </div>
            <div >
               <button onClick={() => {
                  AddStudentToGroup({ variables: { idGroup: groupID, idStudent: stID, startAt: startedDate } })
                  handleOk()
               }} className={"btn btn-submit izma__group__modal"}>
                  Yuborish
               </button>
            </div>
         </Modal>

         <Drawer
            closable={false}
            placement="right" onClose={closeFinanceDrawer} visible={visibleFiance}>
            <FinanceAddPaymentForm
               onClose={closeFinanceDrawer}
               showCheck={showCheck}
               studenID={idName}
            />
         </Drawer>

         <div className="new-remember-note">
            <Modal style={{ width: '600px !important' }} className="note-modal" title="Yangi eslatma qo'shing" visible={noteModal} onOk={NoteOk} onCancel={NoteCancel}>
               <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="10"
                  style={newNoteStyle}
               ></textarea>
            </Modal>
         </div>

         <Modal visible={checkModal} onOk={CheckOk} onCancel={CheckCancel}>
            <div className="new-remember-note">
               <Check
               />
            </div>
         </Modal>
      </>
   )
}
export default GroupProfilLeft