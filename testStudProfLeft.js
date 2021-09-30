import { useState } from 'react';
import Close from '../../../../assets/Icons/Group 26.svg'
import { Drawer, Modal, Input, Select, DatePicker } from 'antd';
import { Option } from "antd/lib/mentions";
import StudentEdit from '../../../../containers/Forms/StudentAdd/StudentEdit';
import FinanceRepaymentForm from '../../../../containers/Finances/FinancesForm/FinanceRepaymeynForm/FinanceRepaymeynForm';
import FinanceAddPaymentForm from '../../../../containers/Finances/FinancesForm/FinanceAddPaymentForm/financeAddPaymentForm'
import { ONE_STUDENT, DELETE_STUDENT, GROUPS, SELECT_STUDENT_GROUP, CHECK_CASH, UPDATE_COMMENT } from './query';
import { SUBSCRIPTION_STUDENT, SUBSCRIPTION_CASH, FILIAL } from './query';
import { useQuery, useMutation } from '@apollo/client';
import StudentProlifeLeftCheck from '../../../../components/StudentComponents/StudentFilterCheck/StudentFilterCheck'
import { Redirect, useParams } from 'react-router';
import { useSubscription } from '@apollo/client';
import './StudentProfileLeft.scss'
import { useLoader } from '../../../../context/Loader';
import { useEffect } from 'react';


const StudentsProfileLeft = (prop) => {
   const [setLoading] = useLoader(true)

   const [openSms, setOpenSms] = useState(false)

   const [visibleF, setVisibleF] = useState(false);

   const { studentID } = useParams()

   const { data: oneStudent } = useQuery(ONE_STUDENT, { variables: { id: studentID } })
   const { data: Groups } = useQuery(GROUPS, { variables: { teacherID: [], courseID: [] } })
   const { data: checkCash } = useQuery(CHECK_CASH, { variables: { stID: studentID } })
   const { data: filial } = useQuery(FILIAL)

   useEffect(() => {
      if(oneStudent && Groups && checkCash && filial) {
         setLoading(false)
      }else {
         setLoading(true)
      }
   }, [oneStudent, Groups, checkCash, filial])

   const [UpdateComment] = useMutation(UPDATE_COMMENT)
   const [SetStudentGroup] = useMutation(SELECT_STUDENT_GROUP)
   const [delStudent, { data: frRedirect }] = useMutation(DELETE_STUDENT)

   useSubscription(SUBSCRIPTION_STUDENT, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               students: () => { }
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



   const [grID, setGrID] = useState()
   const [createAt, setCreateAt] = useState()

   oneStudent && prop.stName(oneStudent.student.name)

   const showDrawerF = () => {
      setVisibleF(true);
   };

   const onCloseF = () => {
      setVisibleF(false);
   };

   const [comme, setComme] = useState('')


   const { TextArea } = Input;
   const [visible, setVisible] = useState(false);

   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };
   const [visibleS, setVisibleS] = useState(false);
   const showDrawerS = () => {
      setVisibleS(true);
   };
   const onCloseS = () => {
      setVisibleS(false);
   };


   const [isModalVisible, setIsModalVisible] = useState(false);

   const showModal = () => {
      setIsModalVisible(true);

   };


   const handleOk = (e) => {
      e.preventDefault()
      UpdateComment({ variables: { stID: studentID, stComment: comme } })
      setIsModalVisible(false);
   };

   const handleCancel = () => {
      setIsModalVisible(false);
   };
   const [isModalVisibleD, setIsModalVisibleD] = useState(false);

   const showModalD = () => {
      setIsModalVisibleD(true);

   };


   const handleOkD = () => {
      setIsModalVisibleD(false);
   };

   //  const showModalD = () => {
   //    setIsModalVisibleD(true);

   //  };


   //  const handleOkD = () => {
   //    setIsModalVisibleD(false);
   //  };

   //  const handleCancelD = () => {
   //    setIsModalVisibleD(false);
   //  };



   const [isModalVisibleY, setIsModalVisibleY] = useState(false);

   const showModalY = () => {
      setIsModalVisibleY(true);
   };


   const handleOkY = () => {
      setIsModalVisibleY(false);
   };

   const handleCancelY = () => {
      setIsModalVisibleY(false);
   };
   const handleCancelD = () => {
      setIsModalVisibleD(false);
   };

   if (frRedirect && frRedirect) return <Redirect to='/student' />

   return (
      <>
         <Drawer
            placement="right"
            closable={false}
            onClose={onCloseF}
            visible={visibleF}
         >
            <StudentEdit onCloseF={onCloseF} />
         </Drawer>

         <div className={`izma__students-payment-inner-left-wrapper ${openSms ? 'active' : ''}`}>

            <div className="izma__students-payment-inner-left-up">
               <div className="izma__finance-payment-inner-boxses-wrapper">
                  <div className="izma__finance-payment-inner-left-up-box-black"></div>
                  <button className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-blue" onClick={showModal} >
                  </button>
                  <button className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-green" onClick={showDrawerF} ></button>
                  <button onClick={() => setOpenSms(!openSms)} className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-orange"></button>
                  <button className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-red" onClick={() => {
                     delStudent({ variables: { studentID } })
                  }}></button>
               </div>
               <div className="izma__students-payment-inner-left-up-left">
                  <p className="izma__students-payment-inner-left-up-left-name">
                     {oneStudent && oneStudent.student.name}
                  </p>
                  <p className="izma__students-payment-inner-left-up-left-id">
                     (id: 26043)
                  </p>
               </div>
               <div className="izma__students-payment-inner-left-centerizma__students-payment-inner-left-center">
                  <div className="izma__students-payment-inner-left-center-number izma__students-payment-inner-left-center-number-wrapper">
                     <p className="izma__students-payment-inner-left-center-number-text izma__students-payment-inner-left-center-text">
                        Telefon :
                     </p>
                     <p className="izma__students-payment-inner-left-center-number-number izma__students-payment-inner-left-center-number-number-wrapper">
                        {oneStudent && oneStudent.student.phoneNumber[0] && oneStudent.student.phoneNumber[0].phone}
                        {oneStudent && !oneStudent.student.phoneNumber[0] && <>Telefon kiritilmagan</>}
                     </p>
                  </div>

                  <div className="izma__students-payment-inner-left-center-balans izma__students-payment-inner-left-center-number-wrapper">
                     <p className="izma__students-payment-inner-left-center-balans-text izma__students-payment-inner-left-center-text">
                        Balans:
                     </p>
                     <p className="izma__students-payment-inner-left-center-balans-balans izma__students-payment-inner-left-center-number-number-wrapper">
                        {checkCash && checkCash.studentCash.cashAmount + ' сум'}
                        {!checkCash && '0 сум'}
                     </p>
                  </div>

                  <div className="izma__students-payment-inner-left-center-role izma__students-payment-inner-left-center-number-wrapper">
                     <p className="izma__students-payment-inner-left-center-role-text izma__students-payment-inner-left-center-text">
                        Rollar:
                     </p>
                     <p className="izma__students-payment-inner-left-center-role-role izma__students-payment-inner-left-center-role-role-wrapper">
                        Student
                     </p>
                  </div>

                  <div className="izma__students-payment-inner-left-center-filial izma__students-payment-inner-left-center-number-wrapper">
                     <p className="izma__students-payment-inner-left-center-filial-text izma__students-payment-inner-left-center-text">
                        Filiallar:
                     </p>
                     <p className="izma__students-payment-inner-left-center-filial-filial izma__students-payment-inner-left-center-role-role-wrapper">
                        {filial && filial.byBranchID.branchName}
                     </p>
                  </div>

               </div>
               <div className="izma__finance-payment-inner-left-bottom">
                  <button className="izma__finance-payment-inner-left-btn izma__finance-payment-inner-drive" onClick={showModalD} >
                  </button>
                  <button className="izma__finance-payment-inner-left-btn izma__finance-payment-inner-card" onClick={showDrawer} >
                  </button>
                  <button className="izma__finance-payment-inner-left-btn izma__finance-payment-inner-refresh" onClick={showDrawerS} >
                  </button>
               </div>
            </div>

         </div>
         <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
         >
            <FinanceAddPaymentForm
               studenID={{ studentID, studentName: oneStudent && oneStudent.student.name }}
               onClose={onClose}
               showModalY={showModalY}
            />
         </Drawer>

         <Modal footer={null} visible={isModalVisible} title="Yangi eslatma qo'shing" onOk={handleOk} onCancel={handleCancel}>
            <div className="form_group izma__courses__form-bolim-form-center" style={{ width: "100%" }}>
               <label className='izma__courses__form-bolim-form-label'>Comment</label>
               <TextArea onChange={e => setComme(e.target.value)} rows={4} />

            </div>
            <div >
               <button onClick={handleOk} className={"btn btn-submit izma__group__modal"}>
                  Saqlash
               </button>
            </div>
         </Modal>
         <Modal footer={null} visible={isModalVisibleD} title="Talabani guruhga qo'shish" onOk={handleOkD} onCancel={handleCancelD}>
            <div className="form_group" style={{ width: "100%" }}>
               <Select
                  defaultValue="Guruhni tanlang"
                  onChange={(e) => setGrID(e)}
               >
                  {Groups && Groups.groups.map((item) => {
                     // {oneStudent && oneStudent.student.groups.map(gName => (
                     return <Option key={item.id} value={item.id} >{/* (item.name !== gName.name) &&  */item.name}</Option>
                     // ))}
                  })}
               </Select>
            </div>
            <div className="form_group">
               <label>Sanadan boshlab</label>

               <DatePicker
                  className='date__picker'
                  onChange={(value, dateString) => {
                     setCreateAt(dateString)
                  }}
                  placeholder={"Kun-Oy-Yil"}
                  //   value={values.sana ? moment(values.sana, "YYYY-MM-DD") : undefined}
                  format={"DD-MM-YYYY"}
               />
            </div>
            <div >
               <button onClick={() => {
                  handleOkD()
                  const rr = { idGroup: grID, idStudent: studentID, startAt: createAt }
                  SetStudentGroup({ variables: rr })
               }} className={"btn btn-submit izma__group__modal"}>
                  Saqlash
               </button>
            </div>
         </Modal>
         <Drawer
            placement="right"
            closable={false}
            onClose={onCloseS}
            visible={visibleS}
         >
            <FinanceRepaymentForm onClose={onCloseS} onCloseS={onCloseS} />
         </Drawer>



         <div >
            <Modal className="check-modal" footer={null} visible={isModalVisibleY} onOk={handleOkY} onCancel={handleCancelY}>
               <StudentProlifeLeftCheck
                  handleCancelY={handleCancelY}
                  handleOkY={handleOkY}
               />
            </Modal>
         </div>

         <div className={`student-sendSms  ${openSms ? 'active' : ''}`}>
            <div className="sms-heading">
               <h1>Talabaga SMS yuboring</h1>
               <button onClick={() => setOpenSms(false)}><img src={Close} alt="" /></button>
            </div>

            <div className="sms-content">
               <p>Sizning o'quv markazingiz uchun faollashtrilmagan !</p>
            </div>
         </div>

      </>
   )
}

export default StudentsProfileLeft