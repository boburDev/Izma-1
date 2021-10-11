import { useState, useEffect, memo } from 'react'
import Close from '../../../../assets/Icons/Group 26.svg'
import { Drawer } from 'antd'
import StudentEdit from '../../../../containers/Forms/StudentAdd/StudentEdit'
import FinanceRepaymentForm from '../../../../containers/Finances/FinancesForm/FinanceRepaymeynForm/FinanceRepaymeynForm'
import FinanceAddPaymentForm from '../../../../containers/Finances/FinancesForm/FinanceAddPaymentForm/financeAddPaymentForm'
import { ONE_STUDENT, DELETE_STUDENT, GROUPS, SELECT_STUDENT_GROUP, CHECK_CASH, /*UPDATE_COMMENT, *//* HAS_STUDENT*/ } from './query'
import { SUBSCRIPTION_STUDENT, SUBSCRIPTION_CASH, FILIAL, STATUS_3_4, UPDATE_STATUS_4, SUBSCRIPTION_ST_EDIT } from './query'
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import StudentProlifeLeftCheck from '../../../../components/StudentComponents/StudentFilterCheck/StudentFilterCheck'
import { Redirect, useParams } from 'react-router'
import './StudentProfileLeft.scss'
// import { useLoader } from '../../../../context/Loader'
import { Modal } from 'antd'
import Modal1 from '../../../../components/Modal/Modal'
import { useName1 } from '../../../../context/NameProvider'
import { useLang } from '../../../../context/LanguageProvider'
import Language from '../../../../lang/index'
import { useGroup } from '../../../../context/NameProvider'

const StudentsProfileLeft = () => {
  const [groupName] = useGroup()
  const [groupAdd, setGroupAdd] = useState()
  const [groupAddDate, setGroupAddDate] = useState()
  const [setPeopleName] = useName1(true)
  const [lang] = useLang();

  // console.log(Language[lang].students)

  const [openSms, setOpenSms] = useState(false)
  // const [state, setState] = useState([])
  // const [userInput, setUserInput] = useState('')
  const [visibleF, setVisibleF] = useState(false)
  const [deleteStudent, setDeleteStudent] = useState()
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isModalVisibleD, setIsModalVisibleD] = useState(false)


  const { studentID } = useParams()

  const { data: oneStudent } = useQuery(ONE_STUDENT, { variables: { id: studentID } })
  const { data: Groups } = useQuery(GROUPS, { variables: { teacherID: [], courseID: [] } })
  const { data: checkCash } = useQuery(CHECK_CASH, { variables: { stID: studentID } })
  const { data: filial } = useQuery(FILIAL)
  //  const [has, {data: hasStud}] = useLazyQuery(HAS_STUDENT)
   

  const [CheckBalanc] = useMutation(STATUS_3_4)
  //  const [UpdateComment] = useMutation(UPDATE_COMMENT)
  const [SetStudentGroup] = useMutation(SELECT_STUDENT_GROUP)
  const [setStatus_3] = useMutation(UPDATE_STATUS_4)
  const [delStudent, { data: frRedirect }] = useMutation(DELETE_STUDENT)

  useEffect(() => {
    if (groupAdd && groupAddDate && !isModalVisibleD) {
     SetStudentGroup({variables: {idGroup: groupAdd.id, idStudent: studentID, startAt: groupAddDate}})
    }
  }, [groupAdd, groupAddDate, studentID, SetStudentGroup, isModalVisibleD])

  useSubscription(SUBSCRIPTION_STUDENT, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
      cache.modify({
        fields: {
          students: () => { }
        }
      })
    },
  })

  useSubscription(SUBSCRIPTION_ST_EDIT, {
    onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
      cache.modify({
        fields: {
          student: () => { }
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

  console.log(checkCash && (checkCash.studentCash.cashAmount - 0) < 0)

  useEffect(() => {

    if (checkCash && (checkCash.studentCash.cashAmount - 0) < 0) {
      CheckBalanc({
        variables: {
          stID: studentID,
          status: 4
        }
      })
    } else {
      setStatus_3({
        variables: {
          status: 3,
          stID: studentID
        }
      })
    }
  }, [CheckBalanc, checkCash, setStatus_3, studentID])


  //  const [gr, setGr] = useState([])

  

  // console.log(oneStudent)

  const showDrawerF = () => {
    setVisibleF(true)
  }

  const onCloseF = () => {
    setVisibleF(false)
  }

  //  const [ comme, setComme ] = useState('')

  const [visible, setVisible] = useState(false)
  const showDrawer = () => {
    setVisible(true)
  }
  const onClose = () => {
    setVisible(false)
  }
  const [visibleS, setVisibleS] = useState(false)
  const showDrawerS = () => {
    setVisibleS(true)
  }
  const onCloseS = () => {
    setVisibleS(false)
  }



  //  const showModal = () => {
  //    setIsModalVisible(true)

  //  }


  //  const handleOk = (e) => {
  //    e.preventDefault()
  //    UpdateComment({variables: {stID: studentID, stComment: comme}})
  //    setIsModalVisible(false)
  //  }

  //  const handleCancel = () => {
  //    setIsModalVisible(false)
  //  }



  //  const showModalD = () => {
  //    setIsModalVisibleD(true)

  //  }


  //  const handleOkD = () => {
  //    setIsModalVisibleD(false)
  //  }

  //  const handleCancelD = () => {
  //    setIsModalVisibleD(false)
  //  }
  const [names, setNames] = useState([])

  useEffect(() => {

  }, [names])

  useEffect(() => {
   oneStudent && setPeopleName(oneStudent.student.name)
  }, [oneStudent, setPeopleName])
  //  const [ namesFind, setNamesFind ] = useState([])


  //  const onSearch = (searchText) => {
  //     const s = names.filter(i => i.value.toLowerCase().includes(searchText.toLowerCase()))
  //     // console.log(s)

  //     if (s.length) {
  //        setNamesFind(s)
  //     } else {
  //        setNamesFind([])
  //     }
  //  }



  const [isModalVisibleY, setIsModalVisibleY] = useState(false)

  const showModalY = () => {
    setIsModalVisibleY(true)
  }


  const handleOkY = () => {
    setIsModalVisibleY(false)
  }

  const handleCancelY = () => {
    setIsModalVisibleY(false)
  }


  useEffect(() => {
    const guruh = Groups && Groups.groups.map((i, index) => {
      return { id: i.id, text: i.name, value: i.name, key: index + 1 }
    })
    setNames(guruh)
  }, [Groups])
  


  // useEffect(() => {

  //   if (Groups && Groups.groups) {
  //     setGr(Groups && Groups.groups)
  //   }

  // }, [Groups])

  if (frRedirect && frRedirect.deleteStudent.id) return <Redirect to='/students' />

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

      <Modal1
        myModal={deleteStudent}
        setMymodal={setDeleteStudent}
        title={Language[lang].students.groups.deledeteStudent}
        text={oneStudent && oneStudent.student.name + 'ni o`chirishni hohlaysizmi ?'}
        block={'delete'}
        setInfo={delStudent}
        info={{ variables: { studentID } }}
        redir={`/students`}
      />

      <Modal1
        myModal={isModalVisible}
        setMymodal={setIsModalVisible}
        title={Language[lang].groups.additionalOption.addNewNote}
        block={'addComment'}
      />

      <div className={`izma__students-payment-inner-left-wrapper ${openSms ? 'active' : ''}`}>
        <div className="izma__students-payment-inner-left-up">
          <div className="izma__finance-payment-inner-boxses-wrapper">
            <button className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-blue" onClick={() => setIsModalVisible(true)} ></button>
            <button className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-green" onClick={showDrawerF} ></button>
            <button onClick={() => setOpenSms(!openSms)} className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-orange"></button>
            <button className="izma__finance-payment-inner-left-up-box izma__finance-payment-inner-left-up-box-red" onClick={() => {
              setDeleteStudent(true)
            }}></button>
          </div>
          <div className="izma__students-payment-inner-left-up-left">
            <div className="izma__finance-payment-inner-left-up-box-black"></div>
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
                {Language[lang].students.studentsInfo.studentPhoneNumber}
              </p>
              <p className="izma__students-payment-inner-left-center-number-number izma__students-payment-inner-left-center-number-number-wrapper">
                {oneStudent && oneStudent.student.phoneNumber[0] && "+" + oneStudent.student.phoneNumber[0].phone}
                {oneStudent && !oneStudent.student.phoneNumber[0] && <></>}
              </p>
            </div>

            <div className="izma__students-payment-inner-left-center-balans izma__students-payment-inner-left-center-number-wrapper">
              <p className="izma__students-payment-inner-left-center-balans-text izma__students-payment-inner-left-center-text">
              {Language[lang].students.studentsInfo.studentBalance}
              </p>
              <p className="izma__students-payment-inner-left-center-balans-balans izma__students-payment-inner-left-center-number-number-wrapper">
                {checkCash && new Intl.NumberFormat().format(checkCash.studentCash.cashAmount) + ' сум'}
                {!checkCash && '0 сум'}
              </p>
            </div>

            <div className="izma__students-payment-inner-left-center-role izma__students-payment-inner-left-center-number-wrapper">
              <p className="izma__students-payment-inner-left-center-role-text izma__students-payment-inner-left-center-text">
              {Language[lang].students.studentsInfo.role}
              </p>
              <p className="izma__students-payment-inner-left-center-role-role izma__students-payment-inner-left-center-role-role-wrapper">
                Student
              </p>
            </div>

            <div className="izma__students-payment-inner-left-center-filial izma__students-payment-inner-left-center-number-wrapper">
              <p className="izma__students-payment-inner-left-center-filial-text izma__students-payment-inner-left-center-text">
              {Language[lang].students.studentsInfo.fillial}
              </p>
              <p className="izma__students-payment-inner-left-center-filial-filial izma__students-payment-inner-left-center-role-role-wrapper">
                {filial && filial.byBranchID.branchName}
              </p>
            </div>

          </div>
          <div className="izma__finance-payment-inner-left-bottom">
            <Modal1
              block={`addGroupStudent`}
              title={Language[lang].groups.additionalOption.addToGroupStudent}
              myModal={isModalVisibleD}
              setMymodal={setIsModalVisibleD}
              setInfo={setGroupAdd}
              groups={Groups && Groups?.groups}
              setInfo2={setGroupAddDate}
            />
            <button className="izma__finance-payment-inner-left-btn izma__finance-payment-inner-drive" onClick={() => {
             
              setIsModalVisibleD(true)
            }} >
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

      <Drawer
        placement="right"
        closable={false}
        onClose={setOpenSms}
        visible={openSms}
      >
        <div className={`student-sendSms`}>
          <div className="sms-heading">
            <h1>{Language[lang].students.sendMessageToStudent.title}</h1>
            <button onClick={() => setOpenSms(false)}><img src={Close} alt="" /></button>
          </div>

          <div className="sms-content">
            <p>{Language[lang].students.sendMessageToStudent.message}</p>
          </div>
        </div>
      </Drawer>




    </>
  )
}

export default memo (StudentsProfileLeft)