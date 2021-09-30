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
import { ALL_STUDENTS, DELETE_STUDENT, SUBSCRIPTION, STUDENT_ON_KEY_UP, STUDENT_COUNT, FIND_SALE, FILTER_COURSE } from '../../../../Querys/Table_Query';
import { Modal } from 'antd';
import Check from '../../../../components/Check/Check';
// import { useCourse } from '../filterSoha/context'
import { useCheck } from '../../../../context/CheckProvider'
import { useStudentData } from '../../../../context/StudentTableProvider';
import { useStudentPay } from '../../../../context/StudentPay';
import { useStudentFilter } from '../../../../context/StudentFilter';
import { useCourseFilter } from '../../../../context/CourseFilterProvider';
import { useLoader } from '../../../../context/Loader';
import { usePagination } from '../../../../context/Pagination';


<<<<<<< HEAD
const StudentsTable = ({ setRowId, setValues, studentSearch }) => {
   const [page] = usePagination()
=======
const StudentsTable = ({ studentSearch }) => {
>>>>>>> e33527c5a42bce0f4aca9a7d0f0d0dfc5f321555
   const [deb] = useStudentFilter()
   const [courseFilter] = useCourseFilter()
   const [setData] = useStudentData(true)
   const [studentID] = useStudentPay()
   const [setLoading] = useLoader(true) 
   const { data: students, loading } = useQuery(ALL_STUDENTS, {
      variables: {
         page: page?.page,
         count: +page?.count
      }
   })

   console.log(page?.page);
   console.log(page?.count);




   const { data: ddd } = useQuery(STUDENT_ON_KEY_UP, { variables: { name: studentSearch } })
   const { data: countSt } = useQuery(STUDENT_COUNT, { variables: { count: +page?.count } })
   const [getID] = useMutation(DELETE_STUDENT)

   useEffect(() => {

      const searchedStudent = ddd && ddd.studentOnKeyup.map((i, index) => {
         return { ID: i.id, id: index + 1, name: i.name, phoneNumber: i.mainPhone, date: i.groups, status: i.status }
      })

      if (students && students.students) {
         const users = students && students.students.map((i, index) => {
            return { ID: i.id, id: index + 1, name: i.name, phoneNumber: i.mainPhone, date: i.groups, status: i.status }
         })



         if (deb) {
            const filterStatus = users.filter(item => item.status === 4)
            setUserData(filterStatus)
         }
         else if (searchedStudent) {

            setUserData(searchedStudent)
         } else {

            setUserData(users)
         }

      }

   }, [students, deb, studentSearch, ddd])



   
   

   const [visible, setVisible] = useState(false)
   const [userData, setUserData] = useState([])
   // const [course] = useCourse()
   const [checkOpen] = useCheck()


   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };


   useEffect(() => {
      setLoading(loading)
   }, [loading])

   
   useEffect(() => {
   setData({
      studentData: students,
      pagination: countSt
   })
   }, [countSt, students])




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