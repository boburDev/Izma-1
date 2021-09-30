import {  Drawer } from 'antd'
import Table from '../../../../components/Table/Table'
import './StudentsTable.scss'
import { useEffect, useState } from 'react';
import FinanceAddPaymentForm from '../../../../containers/Finances/FinancesForm/FinanceAddPaymentForm/financeAddPaymentForm';
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { ALL_STUDENTS, DELETE_STUDENT, SUBSCRIPTION, STUDENT_ON_KEY_UP, STUDENT_COUNT, ALL_STUDENTSs, FILTER_COURSE, FIND_SALE } from '../../../../Querys/Table_Query';
import { Modal } from 'antd';
import Check from '../../../../components/Check/Check';
// import { useCourse } from '../filterSoha/context'
import { useCheck } from '../../../../context/CheckProvider'
import { useStudentData } from '../../../../context/StudentTableProvider'
import { useStudentPay } from '../../../../context/StudentPay'
import { useStudentFilter } from '../../../../context/StudentFilter'
import { useCourseFilter } from '../../../../context/CourseFilterProvider'
import { useLoader } from '../../../../context/Loader'
import { usePagination } from '../../../../context/Pagination'


const StudentsTable = ({ setRowId, setValues, studentSearch='' }) => {
   const [page] = usePagination()
   const [truFalse] = useStudentFilter()
   const [course] = useCourseFilter()
   const [setData] = useStudentData(true)
   const [studentID] = useStudentPay()
   const [setLoading] = useLoader(true)
   const [userData, setUserData] = useState([])


   const { data: Allstudents, loading } = useQuery(ALL_STUDENTS, {
      variables: {
         page: page?.page,
         count: +page?.count
      }
   })
 
   const {data: Allstudentss} = useQuery(ALL_STUDENTSs)

   const { data: countSt } = useQuery(STUDENT_COUNT, { variables: { count: +page?.count } })


   const {data: findSale} = useQuery(FIND_SALE)
   const {data: ddd} = useQuery(STUDENT_ON_KEY_UP, {variables: {name: (studentSearch.length > 0) && studentSearch}})
   const {data: fCourse} = useQuery(FILTER_COURSE, {variables: {courseID: course}})

   const [getID] = useMutation(DELETE_STUDENT)


   useEffect(()=>{

      const filterCourseArr = []
    
      if (course.length) {
        fCourse && fCourse.byCourseIDFilter.map(cs => {
          const groups = cs.groups.map(gr => {
            const student = gr.students.map((st) => filterCourseArr.push({ ...st, groups: [gr] }))
            return student
          })
          return groups
        })
      }
    
    
      const studID = findSale && findSale.findSale.map(i => {
        return { ID: i.studentid, name: i.name, mainPhone: [{number: i.stphone}], groups: [{name: i.groupname, teacher: i.teacher, time: i.time}]}
      })

      const searchedStudent = ddd && ddd.studentOnKeyup
      
       if (Allstudents && Allstudents.students) {
          const users = Allstudents && Allstudents.students
    
        if (truFalse.credit) {

         Allstudentss && setUserData(Allstudentss.studentCredit)
        }
        else if (searchedStudent) {
    
          setUserData(searchedStudent)
        } else if(filterCourseArr.length) {
    
          setUserData(filterCourseArr)
        } else if (truFalse.sales) {
    
          setUserData(studID)
        } else {
    
          setUserData(users)
        }
       }
    },[Allstudents, studentSearch, ddd, truFalse, findSale, fCourse, course, Allstudentss])
    


   
   

   const [visible, setVisible] = useState(false)
   const [checkOpen] = useCheck()


   const showDrawer = () => {
      setVisible(true)
   }
   const onClose = () => {
      setVisible(false)
   }


   useEffect(() => {
      setLoading(loading)
   }, [loading])

   
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



   const [isModalVisible, setIsModalVisibleY] = useState(false)

   const handleOkY = () => {
      setIsModalVisibleY(false)
   }

   const handleCancelY = () => {
      setIsModalVisibleY(false)
   }


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