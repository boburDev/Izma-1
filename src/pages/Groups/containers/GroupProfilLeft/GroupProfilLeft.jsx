import { useEffect, useRef } from 'react'
import './GroupProfilLeft.scss'
import { useState } from 'react'
import { useParams } from 'react-router'
import { Link, NavLink, Redirect } from 'react-router-dom'
import GroupEdit from '../../../../containers/Forms/GroupEdit/GroupEdit';
import { Drawer } from 'antd'
import {  Modal, AutoComplete, DatePicker } from 'antd'
import  Modal1  from '../../../../components/Modal/Modal'
import { useMutation, useQuery, useSubscription } from '@apollo/client'
import { useLang } from '../../../../context/LanguageProvider'
import Language from '../../../../lang/index'
import { useNavbar } from '../../../../context/NavbarProvider'
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
   SUBSCRIPTION_GROUP_INFO,
   DOES_ACTIVE,
   ATTANDANCE_STUDENT,
   CHANGE_ST_GROUP
} from '../../../../Querys/GroupTabs'
import { useDayDivider } from '../../../../context/DayDividerProvider'
import {
   DELETE_FROM_GROUP,
   UPDATE_CASH,
   STATUS_3_4,
   HISTORY_PAYMENT,
   SUBSCRIPTION_GROUPS,
   HAS_STUDENT,
   UPDATE_GR_STATUS,
   SUBSCRIPTION_ADD_STUDENT,
} from '../../../../Querys/GroupTabs'
import { CHECK_CASH } from '../../../../Querys/FinanceAddPayForm_Query'
import Trash from '../../../../assets/trash.png'
import FinanceAddPaymentForm from '../../../../containers/Finances/FinancesForm/FinanceAddPaymentForm/financeAddPaymentForm'
import Check from '../../../../components/Check/Check'
import StudentAddGroup from '../../../../containers/Forms/StudentAdd/StudentAddGroup';
import { SUBSCRIPTION_CASH } from '../../../Students/containers/StudentProfileLeft/query'
import { GROUPS } from '../../../../Querys/Group_Query'
import { useGroup } from '../../../../context/NameProvider'
import { useDavomat } from '../../../../context/DavomatProvider'
import { COURSE_SUBSCRIPTION } from '../../../../Querys/Courses_Query'


const GroupProfilLeft = (prop) => {
   const [setGroupName] = useGroup(true)
   const [dayDivide, setDayDivide] = useDayDivider()
   const [userInput, setUserInput] = useState('')
   const [selectedUser, setSelectedUser] = useState('')
   const [startedDate, setStartedDate] = useState('')
   const [dataUser, setDataUser] = useState([])
   const [staatus, settStatus] = useState()
   const [stID, setStID] = useState()
   const [idName, setIdName] = useState()
   const [onKeyUp, setOnKeyUp] = useState('')
   const [stGrId, setStGrId] = useState('')
   const [lang] = useLang()
   const [setNavbarP] = useNavbar(true)
   const [addStudent, setAddStudent] = useState()
   const [studentAddGroup, setStudentAddGroup] = useState('')
   const [dateAddGroup, setDateAddGroup] = useState('')
   const [dataGroup, setDataGroup] = useState()
   const [grStudent, setGrStudent] = useState([])
   const [payment, setPayment] = useState(false)
   const [paymentStatus, setPaymentStatus] = useState(false)
   const [activator, setActivator] = useState(false)
   const [attanStud, setAttanStud] = useState(false)
   const [activatorr, setActivatorr] = useState(false)
   const [setStudents] = useDavomat(true)

   useEffect(() => {
      setNavbarP('/dashboard/groups/groupsProfil/')
   }, [setNavbarP])
   
   const { groupID } = useParams()

   const { data: Groups } = useQuery(GROUPS, { variables: { teacherID: [], courseID: [] } })

   const { data: groups } = useQuery(BY_GROUP_ID, {
      variables: { groupID }
   })

 
   const { data: grStudents } = useQuery(GROUP_STUDENTS, {
      variables: { grID: groupID }
   })


   useEffect(() => {

      if (grStudents && grStudents.findStudByGrId) {
         setGrStudent(grStudents.findStudByGrId)
         setStudents(grStudents.findStudByGrId)
      }

   }, [grStudents, setStudents])

   useEffect(() => {

      if (groups?.byGroupID) {
         setDataGroup(groups?.byGroupID)
      }

   }, [groups])


   useEffect(() => {
      if (groups && groups.byGroupID) {
         setDayDivide(groups.byGroupID.days)
         prop.studData(groups && groups.byGroupID.students)
      }
   }, [groups, setDayDivide, prop])

  



   const { data: checkCache } = useQuery(CHECK_CASH, {
      variables: { stID: selectedUser }
   })

   const { data: hasStud } = useQuery(HAS_STUDENT, { variables: { stID: stID, grID: groupID } })
   const { data: setStatus_6 } = useQuery(SET_STATUS_6, { variables: { stID: selectedUser } })


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
   const [AddStudentToGroup, {data: added_student}] = useMutation(SELECT_STUDENT_GROUP)
   const [StudentAttan] = useMutation(ATTANDANCE_STUDENT)
   const [SetStatus_6] = useMutation(STATUS_6)
   const [DelFromGroup] = useMutation(DELETE_FROM_GROUP)
   const [UpdatePayment, { data: forStatus }] = useMutation(UPDATE_CASH)
   const [SetStatus_4] = useMutation(STATUS_3_4)
   const [SetStatus3_4] = useMutation(UPDATE_GR_STATUS)
   const [SetStatus_5] = useMutation(UPDATE_GR_STATUS)
   const [Activated] = useMutation(DOES_ACTIVE)
   const [ChangeStGroup] = useMutation(CHANGE_ST_GROUP)

   function useOutsideAlerter(ref) {
      useEffect(() => {
         /**
          * Alert if clicked on outside of element
          */
         function handleClickOutside(event) {

            if (ref.current && !ref.current.contains(event.target)) {
               console.log(ref.current.contains(event.target))
               console.log(ref.current, event.target)
               setDElActive(false)
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
   
   useEffect(() => {
      if (attanStud && added_student?.createStudentGroup) {
         StudentAttan({variables: {
            stID: added_student.createStudentGroup.studentID,
            groupID: added_student.createStudentGroup.groupID,
            startDate: added_student.createStudentGroup.studentAddTime,
            endDate: dataGroup?.endDate
         }})
         setAttanStud(false)
      }
   }, [added_student, StudentAttan, dataGroup, attanStud])

   useEffect(() => {

      if (studentAddGroup?.id && dateAddGroup && stGrId && activatorr) {
         ChangeStGroup({variables: {
            currentGrId: groupID,
            stGrId: stGrId,
            grID: studentAddGroup?.id,
            addTime: dateAddGroup
         }})

         StudentAttan({variables: {
            stID: selectedUser,
            groupID: studentAddGroup?.id,
            startDate: dateAddGroup,
            endDate: null
         }})

         setActivatorr(false)
      }

   }, [studentAddGroup?.id, dateAddGroup, ChangeStGroup, stGrId, activatorr, StudentAttan, dataGroup, selectedUser, groupID])
   
   const wrapperRef = useRef(null);
   useOutsideAlerter(wrapperRef);

   useEffect(() => {

      if (payment && forStatus?.updateCash?.cashAmount) {
         console.log('status_#_$')
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
         setPayment(false)
      }

   }, [forStatus, SetStatus3_4, SetStatus_4, groupID, selectedUser, payment])

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

   useSubscription(SUBSCRIPTION_CASH, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
        cache.modify({
          fields: {
            studentCash: () => { }
          }
        })
      },
    })

   useSubscription(COURSE_SUBSCRIPTION, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               byGroupID: () => { }
            }
         })
      },
   })

   const [isModalVisible, setIsModalVisible] = useState(false)
   const [isModalDelete, setIsModalDelete] = useState(false)

   const handleDelete = () => {
      deletGroup({
         variables: {
            id: groupID
         }
      })
   }


   const rrr = () => {

      let backCash = (checkCache && checkCache.studentCash.cashAmount) - (groups && groups.byGroupID.price)
      UpdatePayment({ variables: { stID: selectedUser, cashAmm: String(backCash) } })
   
      const test = Number(checkCache && checkCache.studentCash.cashAmount) <= Number(groups && groups.byGroupID.price)
   
      const data = {
         credit: test ? (checkCache && checkCache.studentCash.cashAmount) : (groups && groups.byGroupID.price),
         studentID: selectedUser,
         debit: backCash < 0 ? String(backCash) : null
      }
      HistoryPay({ variables: data })
      console.log('payed')
   }   

   useEffect(() => {
         
         if (staatus === 5 && paymentStatus) {
            SetStatus3_4({
               variables: {
                  status: (checkCache && checkCache.studentCash.cashAmount - 0) < 0 ? 4 : 3,
                  stID: selectedUser,
                  grID: groupID
               }
            })
            setPaymentStatus(false)
         }
   }, [SetStatus3_4, checkCache, groupID, paymentStatus, selectedUser, staatus])


   useEffect(() => {

      if (grStudent.length > 0 && activator) {
         let sorted = [{grID: groupID},]
         grStudent.map(i => i.groupStatus === 2 && sorted.push({id: i.id, status: i.groupStatus}))
         Activated({variables: {needID: sorted}})
         setActivator(false)
         console.log('once')
      }
   }, [grStudent, Activated, activator, groupID])

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

   const filtered = grStudent?.filter(opt => opt.name.toLowerCase().startsWith(onKeyUp.toLowerCase()))

   if (delData && delData) return <Redirect to='/dashboard/groups' />

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
            <Modal1
               block="delete"
               title="Guruhni o'chirish"
               text={dataGroup?.name + 'ni o`chirishni hohlaysizmi ?'}
               setInfo={handleDelete}
               setMymodal={setIsModalDelete}
               myModal={isModalDelete}
               redir={`/groups`}
               snake={delData}
            />
            <Modal1
               block="addGroupStudent"
               title={Language[lang].groups.additionalOption.addToGroupStudent}
               myModal={addStudent}
               setMymodal={setAddStudent}
               groups={Groups && Groups?.groups}
               setInfo={setStudentAddGroup}
               info={studentAddGroup}
               setInfo2={setDateAddGroup}
               submit={setActivatorr}
            />
            <div className="izma__groups-attendance-left-up-wrapper">
               <p className="izma__groups-attendance-left-up-id">
                  {dataGroup?.name}
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
                     <GroupEdit dataForEdit={dataGroup && dataGroup} onClose={onClose} />
                  </Drawer>
                  <button onClick={() => setIsModalDelete(true)} className="izma__groups-attendance-left-up-btn-del">
                     
                     <img src={Trash} alt="" />
                  </button>

               </div>
            </div>

            {dataGroup &&
               <div className="izma__groups-attendance-left-center-wrapper">
                  <h4 className="izma__groups-attendance-left-center-heading">
                     {dataGroup?.courseName} | {dataGroup?.teacher}
                  </h4>
                  <div className="izma__groups-attendance-left-center-prices-wrapper">
                     <p className="izma__groups-attendance-left-center-prices-text">
                        {Language[lang].groups.groupInfo.price}
                     </p>
                     <p className="izma__groups-attendance-left-center-prices-number">
                     {dataGroup?.price} UZS
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-time-wrapper">
                     <p className="izma__groups-attendance-left-center-time-text">
                        {Language[lang].groups.groupInfo.time}
                     </p>
                     <p className="izma__groups-attendance-left-center-time-number">
                        {dayDivide} ??? {dataGroup?.time}
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-room-wrapper">
                     <p className="izma__groups-attendance-left-center-room-text">
                     {Language[lang].groups.groupInfo.room}
                     </p>
                     <p className="izma__groups-attendance-left-center-room-number">
                        Room #{dataGroup?.rooms}
                     </p>
                  </div>

                  <div className="izma__groups-attendance-left-center-communicate-wrapper">
                     <p className="izma__groups-attendance-left-center-communicate-text">
                     {Language[lang].groups.groupInfo.traningDates}
                     </p>
                     <p className="izma__groups-attendance-left-center-communicate-number">
                        {dataGroup?.startDate} ??? {dataGroup?.endDate}
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

                  <button onClick={() => setActivator(true)}>active</button>

                  <br />
                  <br />
                  <div className="izma__groups-attendance-left-bottom-wrapper">
                     {
                        filtered && filtered.map((s, i) => <div key={i} className="izma__groups-attendance-left-bottom">
                        <div className="colorBox">
                        {s.groupStatus === 2 && <div className="izma__groups-attendance-left-bottom-box-white"></div>}
                        {s.groupStatus === 3 && <div className="izma__groups-attendance-left-bottom-box"></div>}
                        {s.groupStatus === 4 && <div className="izma__groups-attendance-left-bottom-box-red"></div>}
                        {s.groupStatus === 5 && <div className="izma__groups-attendance-left-bottom-box-orange"></div>}
                        </div>
                        <NavLink className="izma__groups-attendance-left-bottom-heading" to={`/dashboard/studentProfile/${s.id}`} onClick={() => setNavbarP(s.id)}>
                              {s.name}
                        </NavLink>
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
                                 setStGrId(s.stGrId)
                              }}>
                                 <span></span>
                           </button>





                              <div style={{ zIndex: 10000, position: 'absolute' }} className={`open_del ${delActive === s.id ? 'active' : ''}`}  >

                              {(s.groupStatus === 3 || s.groupStatus === 4) && <Link to="#" className="del_link" onClick={() => {
                                 SetStatus_5({
                                    variables: {
                                       status: 5, stID: selectedUser, grID: groupID
                                    }
                                 })
                                 setDElActive(false)
                              }}>{Language[lang].groups.additionalOption.freeze}</Link>}

                              {(s.groupStatus === 2 || s.groupStatus === 5) && <Link to="#" className="del_link" onClick={() => {
                                 s.groupStatus === 5 && setPaymentStatus(true)
                                 s.groupStatus === 2 && rrr()
                                 s.groupStatus === 2 && setPayment(true)
                                    setDElActive(false)
                              }} >{Language[lang].groups.activate.activateTitle}</Link>}
                              <Link to="#" className="del_link" onClick={() => {
                                 showFinanceDrawer()
                                 setDElActive(false)
                              }}>{Language[lang].groups.activate.payment}</Link>
                              <Link to="#" className="del_link" onClick={showNote}>{Language[lang].groups.activate.addNewNote}</Link>
                              <Link to="#" className="del_link"
                                 onClick={() => {
                                    setDElActive(false)
                                    setAddStudent(true)
                                    setGroupName([groups && groups?.byGroupID])
                                 }}
                              >{Language[lang].groups.activate.changeGroupStudent}</Link>
                              <Link to="#" className="del_link--red" onClick={() => {
                                    setDElActive(false)
                                 if (setStatus_6 && setStatus_6.setStatus_6.length === 1) {

                                    SetStatus_6({
                                       variables: {
                                          status: 6, stID: selectedUser
                                       }
                                    })
                                 }
                                 if (s.groupStatus === 2) {
                                    
                                    SetStatus_6({
                                       variables: {
                                          status: 7, stID: selectedUser
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
                     </div>)
                     }

                  </div>
               </div>

            }


         </div>

         <Modal animation={false} footer={null} title={Language[lang].groups.newStudent} visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
            <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
               <label className='izma__courses__form-bolim-form-label'>{Language[lang].groups.selectStudent}</label>
               <AutoComplete
                  animation={false}
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
                  animation={false}
                  className='date__picker'
                  onChange={(value, dateString) => setStartedDate(dateString)}
                  placeholder={Language[lang].teachers.addNewUser.date}
                  // format={"DD-MM-YYYY"}
                  format={"YYYY-MM-DD"}
                  disabledDate={(current) => {
                     // let customDate = groups.byGroupID.endDate
                     // return current && current < moment(customDate, "DD-MM-YYYY")
                  }}
               />
               {hasStud && hasStud.hasStudent && <>Siz tanlagan o'quvchi guruhga qo'shilgan</>}
            </div>
            <div>
               <button onClick={() => {

                  if (hasStud && !hasStud.hasStudent) {
                     setAttanStud(true)
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