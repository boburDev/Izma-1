import Table from '../../../../components/Table/Table';
import './GroupsTable.scss'
import { useQuery, useSubscription } from '@apollo/client';
import { GROUPS, SUBSCRIPTION_GROUPS } from '../../../../Querys/Group_Query';
import { useCourse } from '../../../../context/CourseProvider';
import { useTeacher } from '../../../../context/TeacherProvider';
import { useEffect, useState } from 'react';
import { useCourseFilter } from '../../../../context/CourseFilterProvider';

const GroupsTable = ({  setRowId, setValues }) => {
   const [courseFilter] = useCourseFilter()

   const [coursesId] = useCourse()
   const [teacher] = useTeacher()
   const [groups, setGroups] = useState()
   const { data: groupss } = useQuery(GROUPS, {
      variables: { teacherID: teacher, courseID: coursesId }

   })

   console.log(courseFilter);


   useEffect(()=>{
      setGroups(groupss)

   }, [groupss])

   useSubscription(SUBSCRIPTION_GROUPS, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               groups: () => { }
            }
         })
      },
   })


   

   // const columns = [
   //    {
   //       title: 'Kod',
   //       dataIndex: 'id',
   //       key: 'id',
   //       defaultSortOrder: 'descend',
   //       sorter: (a, b) => a.Id - b.Id,
   //       render: (text, record, index) => index + 1,

   //    },
   //    {
   //       title: 'Kurs nomi',
   //       dataIndex: 'name',
   //       key: 'name',
   //    },
   //    {
   //       title: "O'qituvchi ",
   //       dataIndex: 'teacher',
   //       key: 'teacher',
   //    },
   //    {
   //       title: "Kunlar",
   //       dataIndex: 'days',
   //       key: 'days',
   //       width: '100px'
   //    },
   //    {
   //       title: "Mashg'ulotlar sanalari",
   //       dataIndex: 'startDate',
   //       key: 'startDate',
   //       width: '150px'
   //    },
   //    {
   //       title: "Xonalar",
   //       dataIndex: 'rooms',
   //       key: 'rooms',
   //    },
   //    {
   //       title: "Talabalar",
   //       dataIndex: 'studentsCount',
   //       key: 'studentsCount',
   //    },

   // ];


   return (
      <div className="izma__table-g" >
         <Table block="groupHash" arr={groups && groups.groups} />
      </div>
   )
}


export default GroupsTable;


