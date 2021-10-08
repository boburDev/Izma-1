import { useEffect } from 'react'
import './GroupProfilLeft.scss'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Link, Redirect } from 'react-router-dom'
import GroupEdit from '../../../../containers/Forms/GroupEdit/GroupEdit';
import { Drawer } from 'antd'
import {  Modal, AutoComplete, DatePicker } from 'antd'
import  Modal1  from '../../../../components/Modal/Modal'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useLang } from '../../../../context/LanguageProvider'
import Language from '../../../../lang/index'
import {
   BY_GROUP_ID,
   DELETE_GROUP,
   GET_STUDENTS,
   SELECT_STUDENT_GROUP,
   STATUS_6,
   SET_STATUS_6,
   SUBSCRIPTION_STATUS,
   GROUP_STUDENTS,
   NEW_SUB_STUDENT,
   SUBSCRIPTION_GROUP_INFO
} from '../../../../Querys/GroupTabs'
import { useDayDivider } from '../../../../context/DayDividerProvider'
import {
   DELETE_FROM_GROUP,
   CHECK_CASH,
   UPDATE_CASH,
   STATUS_3_4,
   HISTORY_PAYMENT,
   SUBSCRIPTION_GROUPS,
   HAS_STUDENT,
   UPDATE_GR_STATUS,
   SUBSCRIPTION_ADD_STUDENT,
   // SUBSCRIPTION_CASH
} from '../../../../Querys/GroupTabs'
import Trash from '../../../../assets/trash.png'
import FinanceAddPaymentForm from '../../../../containers/Finances/FinancesForm/FinanceAddPaymentForm/financeAddPaymentForm'
import Check from '../../../../components/Check/Check'
import StudentAddGroup from '../../../../containers/Forms/StudentAdd/StudentAddGroup';
import { useDavomat } from '../../../../context/DavomatProvider'
import moment from 'moment'
const GroupProfilLeft = (prop) => {
   const [setGroupStudents] = useDavomat(true)
   const [dayDivide, setDayDivide] = useDayDivider()
   const [userInput, setUserInput] = useState('')
   const [selectedUser, setSelectedUser] = useState()
   const [startedDate, setStartedDate] = useState('')
   const [dataUser, setDataUser] = useState([])
   const [staatus, settStatus] = useState()
   const [stID, setStID] = useState()
   const [idName, setIdName] = useState()
   const [onKeyUp, setOnKeyUp] = useState('')
   const [lang] = useLang()

   const [payment, setPayment] = useState(false)

   const { groupID } = useParams()

   const { data: groups } = useQuery(BY_GROUP_ID, {
      variables: { groupID }
   })

   const { data: grStudents } = useQuery(GROUP_STUDENTS, {
      variables: { grID: groupID }
   })


   useEffect(() => {
      setGroupStudents({
         students: grStudents && grStudents.findStudByGrId,
         groups: groups && groups.byGroupID
      })
      if (groups && groups.byGroupID) {
         setDayDivide(groups.byGroupID.days)
      }
   }, [grStudents, setGroupStudents, groups, setDayDivide])


   prop.studData(groups && groups.byGroupID.students)

   const { data: checkCache } = useQuery(CHECK_CASH, {
      variables: { stID: selectedUser }
   })

   const { data: hasStud } = useQuery(HAS_STUDENT, { variables: { stID: stID, grID: groupID } })
   const { data: setStatus_6 } = useQuery(SET_STATUS_6, { variables: { stID: selectedUser } })

   // const [cashCheck, {data: forCheck}] = useLazyQuery(CHECK_CASH_GROUP)



   const { data: students } = useQuery(GET_STUDENTS, {
      variables: { name: userInput }
   })

   useEffect(() => {
      if (students && students.studentOnKeyup) {
         const users = students.studentOnKeyup.map(i => {
            return { key: i.id, value: i.name, text: i.name }
         })
         setDataUser(users)
      }
   }, [students])

   const [deletGroup, { data: delData }] = useMutation(DELETE_GROUP)

   const [HistoryPay] = useMutation(HISTORY_PAYMENT)
   const [AddStudentToGroup] = useMutation(SELECT_STUDENT_GROUP)
   const [SetStatus_6] = useMutation(STATUS_6)
   const [DelFromGroup] = useMutation(DELETE_FROM_GROUP)
   const [UpdatePayment, { data: forStatus }] = useMutation(UPDATE_CASH)
   const [SetStatus_4] = useMutation(STATUS_3_4)
   const [SetStatus3_4] = useMutation(UPDATE_GR_STATUS)
   const [SetStatus_5] = useMutation(UPDATE_GR_STATUS)


   useEffect(() => {


      if (forStatus && forStatus.updateCash.cashAmount) {
         SetStatus_4({
            variables: {
               stID: selectedUser,
               status: (forStatus.updateCash.cashAmount - 0) < 0 ? 4 : 3
            }
         })

         SetStatus3_4({
            variables: {
               status: (forStatus.updateCash.cashAmount - 0) < 0 ? 4 : 3,
               stID: selectedUser,
               grID: groupID
            }
         })

         window.location.reload(true)
      }

   }, [forStatus, SetStatus3_4, SetStatus_4, groupID, selectedUser])



   useSubscription(SUBSCRIPTION_GROUPS, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               studentGroups: () => { }
            }
         })
      },
   })

   useSubscription(NEW_SUB_STUDENT, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               findStudByGrId: () => { }
            }
         })
      },
   })

   useSubscription(SUBSCRIPTION_STATUS, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               grStatus: () => { }
            }
         })
      },
   })

   useSubscription(SUBSCRIPTION_ADD_STUDENT, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               findStudByGrId: () => { }
            }
         })
      },
   })

   useSubscription(SUBSCRIPTION_GROUP_INFO, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               byGroupID: () => { }
            }
         })
      },
   })

   // useSubscription(SUBSCRIPTION_CASH, {
   //    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
   //       cache.modify({
   //          fields: {
   //             studentCash: () => {}
   //          }
   //       })
   //    },
   // })

   const [isModalVisible, setIsModalVisible] = useState(false)
   const [isModalDelete, setIsModalDelete] = useState(false)

   const handleDelete = () => {
      deletGroup({
         variables: {
            id: groupID
         }
      })
   }

   useEffect(() => {

      const paymentt = () => {

         if (staatus !== 5) {

            let backCash = (checkCache && checkCache.studentCash.cashAmount) - (groups && groups.byGroupID.price)
            UpdatePayment({ variables: { stID: selectedUser, cashAmm: String(backCash) } })

            const test = Number(checkCache && checkCache.studentCash.cashAmount) <= Number(groups && groups.byGroupID.price)

            const data = {
               credit: test ? (checkCache && checkCache.studentCash.cashAmount) : (groups && groups.byGroupID.price),
               studentID: selectedUser,
               debit: backCash < 0 ? String(backCash) : null
            }

            HistoryPay({ variables: data })
         } else {
            SetStatus3_4({
               variables: {
                  status: (checkCache && checkCache.studentCash.cashAmount - 0) < 0 ? 4 : 3,
                  stID: selectedUser,
                  grID: groupID
               }
            })
         }

      }
      payment && paymentt()
      payment && setPayment(false)

   }, [payment, HistoryPay, SetStatus3_4, UpdatePayment, checkCache, groupID, groups, selectedUser, staatus])

   const showModal = () => {
      setIsModalVisible(true)
   }

   const handleOk = () => {
      setIsModalVisible(false)
   }

   const handleCancel = () => {
      setIsModalVisible(false)
   }

   const [delActive, setDElActive] = useState(false)
   const [visible, setVisible] = useState(false)

   const showDrawer = () => {
      setVisible(true)
   }

   const onClose = () => {
      setVisible(false)
   }


   const [visibleFiance, setVisibleFiance] = useState(false)
   const [visibleStudent, setVisibleStudent] = useState(false)

   const showFinanceDrawer = () => {
      setVisibleFiance(true)
   }

   const showStudentDrawer = () => {
      setVisibleStudent(true)
   }

   const closeFinanceDrawer = () => {
      setVisibleFiance(false)
   }

   const closeStudentDrawer = () => {
      setVisibleStudent(false)
   }


   const [noteModal, setNoteModal] = useState(false)

   const showNote = () => {
      setNoteModal(true)
   }

   const NoteOk = () => {
      setNoteModal(false)
   }

   const NoteCancel = () => {
      setNoteModal(false)
   }


   const [checkModal, setCheckModal] = useState(false)

   const showCheck = () => {
      setCheckModal(true)
   }

   const CheckOk = () => {
      setCheckModal(false)
   }

   const CheckCancel = () => {
      setCheckModal(false)
   }

   const filtered = grStudents && grStudents.findStudByGrId.filter(opt => opt.name.toLowerCase().startsWith(onKeyUp.toLowerCase()))

   if (delData && delData) return <Redirect to='/groups' />



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
                  <button onClick={() => setIsModalDelete(true)} className="izma__groups-attendance-left-up-btn-del">
                     <Modal1
                        block="delete"
                        title="Guruhni o'chirish"
                        text={groups && groups.byGroupID.name + 'ni o`chirishni hohlaysizmi ?'}
                        setInfo={handleDelete}
                        setMymodal={setIsModalDelete}
                        myModal={isModalDelete}
                        redir={`/groups`}
                     />
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
                        {Language[lang].groups.groupInfo.price}
                     </p>
                     <p className="izma__groups-attendance-left-center-prices-number">
                        {groups.byGroupID.price} UZS
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-time-wrapper">
                     <p className="izma__groups-attendance-left-center-time-text">
                        {Language[lang].groups.groupInfo.time}
                     </p>
                     <p className="izma__groups-attendance-left-center-time-number">
                        {dayDivide} ・ {groups.byGroupID.time}
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-room-wrapper">
                     <p className="izma__groups-attendance-left-center-room-text">
                     {Language[lang].groups.groupInfo.room}
                     </p>
                     <p className="izma__groups-attendance-left-center-room-number">
                        Room #{groups.byGroupID.rooms}
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-communicate-wrapper">
                     <p className="izma__groups-attendance-left-center-communicate-text">
                     {Language[lang].groups.groupInfo.traningDates}
                     </p>
                     <p className="izma__groups-attendance-left-center-communicate-number">
                        {groups.byGroupID.startDate} — {groups.byGroupID.endDate}
                     </p>
                     <br />
                     <input
                     autoComplete="off"
                        type="text"
                        placeholder={Language[lang].groups.groupInfo.search}
                        onChange={e => setOnKeyUp(e.target.value)} />
                  </div>
                  <div className="izma__students-content-line"></div>

                  <button className="izma__groups-attendance-left-bottom-button" onClick={showModal} ></button>

                  <button className="izma__groups-attendance-left-bottom-button-add" onClick={showStudentDrawer} >
                  </button>

                  <br />
                  <br />
                  <div className="izma__groups-attendance-left-bottom-wrapper">
                     {
                        filtered && filtered.map((s, i) => (
                           <div key={i} className="izma__groups-attendance-left-bottom">
                                 {s.groupStatus === 2 && <div className="izma__groups-attendance-left-bottom-box-white"></div>}
                                 {s.groupStatus === 3 && <div className="izma__groups-attendance-left-bottom-box"></div>}
                                 {s.groupStatus === 4 && <div className="izma__groups-attendance-left-bottom-box-red"></div>}
                                 {s.groupStatus === 5 && <div className="izma__groups-attendance-left-bottom-box-orange"></div>}
                                 <Link to={`/studentProfile/${s.id}`}>
                                    <h5 className="izma__groups-attendance-left-bottom-heading">
                                       {s.name}
                                    </h5>
                                 </Link>
                                 <p className="izma__groups-attendance-left-bottom-phone">
                                    {
                                       s.studentPhone.map((i, key) => <span key={key}> +{i.phone}<br /> </span>)
                                    }
                                 </p>

                                 <div style={{ position: 'relative', marginLeft: 'auto' }}>
                                    <button
                                       className="izma__groups-attendance-left-bottom-btn" onClick={() => {
                                          if (delActive) {
                                             setDElActive(false)
                                          } else {
                                             setDElActive(s.id)
                                          }
                                          setSelectedUser(s.id)
                                          settStatus(s.groupStatus)
                                          setIdName({ studentID: s.id, studentName: s.name })
                                       }}>
                                          <span></span>
                                    </button>





                                    <div style={{ zIndex: 10000, position: 'absolute' }}
                                       className={`open_del ${delActive === s.id ? 'active' : ''}`} onClick={() => setDElActive(false)}>

                                       {(staatus === 3 || staatus === 4) && <Link to="#" className="del_link" onClick={() => {
                                          SetStatus_5({
                                             variables: {
                                                status: 5, stID: selectedUser, grID: groupID
                                             }
                                          })
                                       }}>{Language[lang].groups.additionalOption.freeze}</Link>}

                                       {(staatus === 2 || staatus === 5) && <Link to="#" className="del_link" onClick={() => setPayment(true)} >{Language[lang].groups.activate.activateTitle}</Link>}
                                       <Link to="#" className="del_link" onClick={showFinanceDrawer}>{Language[lang].groups.activate.payment}</Link>
                                       <Link to="#" className="del_link" onClick={showNote}>{Language[lang].groups.activate.addNewNote}</Link>
                                       <Link to="#" className="del_link">{Language[lang].groups.activate.changeGroupStudent}</Link>
                                       <Link to="#" className="del_link--red" onClick={() => {

                                          if (setStatus_6 && setStatus_6.setStatus_6.length === 1) {

                                             SetStatus_6({
                                                variables: {
                                                   status: 6, stID: selectedUser
                                                }
                                             })
                                          }

                                          DelFromGroup({
                                             variables: {
                                                grID: groupID, stID: selectedUser
                                             }
                                          })

                                       }}>{Language[lang].groups.exitToGroup}</Link>
                                    </div>



                                 </div>
                              </div>
                        ))
                     }

                  </div>
               </div>

            }


         </div>

         <Modal footer={null} title={Language[lang].groups.newStudent} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
               <label className='izma__courses__form-bolim-form-label'>{Language[lang].groups.selectStudent}</label>
               <AutoComplete
                  options={userInput.length && dataUser}
                  onSearch={e => setUserInput(e)}
                  onSelect={(v, o) => {
                     setStID(o.key)
                  }}
                  className={"section_name_input"} name={"nomi"} placeholder={Language[lang].groups.searchByNameOrNumber} />

            </div>
            <div className="form_group">
               <label>{Language[lang].finance.startDay}</label>
               {
                  // groups.byGroupID.endDate
               }
               <DatePicker
                  className='date__picker'
                  onChange={(value, dateString) => setStartedDate(dateString)}
                  placeholder={Language[lang].teachers.addNewUser.date}
                  format={"DD-MM-YYYY"}
                  disabledDate={(current) => {
                     let customDate = groups.byGroupID.endDate
                     return current && current < moment(customDate, "DD-MM-YYYY")
                  }}
               />
               {hasStud && hasStud.hasStudent && <>Siz tanlagan o'quvchi guruhga qo'shilgan</>}
            </div>
            <div>
               <button onClick={() => {

                  if (hasStud && !hasStud.hasStudent) {
                     AddStudentToGroup({ variables: { idGroup: groupID, idStudent: stID, startAt: startedDate } })
                  }
                  handleOk()
               }} className={"btn btn-submit izma__group__modal"}>
                  {Language[lang].groups.send}
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
               groupID={groupID}
            />
         </Drawer>

         <Drawer
            closable={false}
            placement="right" onClose={closeStudentDrawer} visible={visibleStudent}>
            <StudentAddGroup
               onCloseF={closeStudentDrawer}
               stGroup={groupID}
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