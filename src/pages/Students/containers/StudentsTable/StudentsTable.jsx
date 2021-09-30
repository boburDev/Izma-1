import {  Drawer } from 'antd';
import Table from '../../../../components/Table/Table'
import { connect } from "react-redux";
import DeleteImg from '../../../../assets/Icons/delete-border.svg'
import DollarImg from '../../../../assets/Icons/dollar-border.svg'
// import { setMainTableData, setRowId, setValues } from '../../ActionRedux/IzmaActions';
import { Link } from 'react-router-dom'
import './StudentsTable.scss'
import { useEffect, useState } from 'react';
import FinanceAddPaymentForm from '../../../../containers/Finances/FinancesForm/FinanceAddPaymentForm/financeAddPaymentForm';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { ALL_STUDENTS, DELETE_STUDENT, SUBSCRIPTION, STUDENT_ON_KEY_UP, FIND_SALE, FILTER_COURSE, STUDENT_COUNT, ALL_STUDENTSs  } from '../../../../Querys/Table_Query';
import { Modal } from 'antd';
import Check from '../../../../components/Check/Check';
// import { useCourse } from '../filterSoha/context'
import { useCheck } from '../../../../context/CheckProvider'
import { useStudentData } from '../../../../context/StudentTableProvider';
import { useStudentPay } from '../../../../context/StudentPay';
import { useStudentFilter } from '../../../../context/StudentFilter';
import { useCourseFilter } from '../../../../context/CourseFilterProvider';


const StudentsTable = ({ setRowId, setValues, studentSearch = '' }) => {

   const [truFalse] = useStudentFilter()
   const [courseFilter] = useCourseFilter()
   const [setData] = useStudentData(true)
   const [studentID] = useStudentPay()

   const { data: Allstudents } = useQuery(ALL_STUDENTS, { variables: { page: 1, count: 10 } })
   const { data: AllstudentsCrediters } = useQuery(ALL_STUDENTSs)

   const [userData, setUserData] = useState([])

   const { data: ddd } = useQuery(STUDENT_ON_KEY_UP, { variables: { name: (studentSearch.length > 0) && studentSearch } })
   const { data: countSt } = useQuery(STUDENT_COUNT, { variables: { count: 10 } })

   const [getID] = useMutation(DELETE_STUDENT)

   // getID({variables: {studentID: 'id'}})

   const {data: findSale} = useQuery(FIND_SALE)
   const {data: fCourse} = useQuery(FILTER_COURSE, {variables: {courseID: courseFilter}})

   useEffect(()=>{

      const filterCourseArr = []
    
      if (courseFilter.length) {
        fCourse && fCourse.byCourseIDFilter.map(cs => {
          const groups = cs.groups.map(gr => {
            const student = gr.students.map((st) => {
              return filterCourseArr.push({...st, groups: [gr]})
            })
            return student
          })
          return groups
        })
      }
    
    
      const studID = findSale && findSale.findSale.map((i) => {
        return { ID: i.studentid, name: i.name, phoneNumber: [{number: i.stphone}], groups: [{name: i.groupname, teacher: i.teacher, time: i.time}]}
      })
      
      const searchedStudent = ddd && ddd.studentOnKeyup
      
       if (Allstudents && Allstudents.students) {
          const users = Allstudents && Allstudents.students
          
          
         if (truFalse.credit) {
         const userss = AllstudentsCrediters && AllstudentsCrediters.students
         const filterStatus = userss.filter(item => item.status === 4)
         setUserData(filterStatus)
        }
        else if (searchedStudent) {
    
         setUserData(searchedStudent)
        } 
        else if(filterCourseArr.length) {
         setUserData(filterCourseArr)
        } 
        else if (truFalse.sales) {
    
         setUserData(studID)
        } 
        else {
    
         setUserData(users)
        }
      }
    },[Allstudents, studentSearch, ddd, truFalse, findSale, fCourse, courseFilter])



   

   const [visible, setVisible] = useState(false)
   // const [course] = useCourse()
   const [checkOpen] = useCheck()


   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };


  
   useEffect(() => {
      
   setData({
      studentData: userData,
      pagination: countSt
   })
   }, [countSt, userData])




   useSubscription(SUBSCRIPTION, {

      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               students: () => { }
            }
         })
      },
   })



   const [isModalVisible, setIsModalVisibleY] = useState(false);

   const handleOkY = () => {
      setIsModalVisibleY(false);
   };

   const handleCancelY = () => {
      setIsModalVisibleY(false);
   };


   return (
      <>
      {
         loading ? <></> : 'id'
      }
         <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
         >
            <FinanceAddPaymentForm studenID={studentID} onClose={onClose} />
         </Drawer>
         <div className="sa">
            <Table block="studentHash" showDrawer={showDrawer} />
         </div>

         <div>
            <Modal className="check-modal" footer={null} visible={checkOpen && checkOpen.check} onOk={handleOkY} onCancel={handleCancelY}>
               <Check
                  handleCancelY={handleCancelY}
                  handleOkY={handleOkY}
               />
            </Modal>
         </div>
      </>
   )
}



export default StudentsTable