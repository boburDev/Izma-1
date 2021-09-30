import Table from '../../../../components/Table/Table';
import './GroupsTable.scss'
import { useQuery, useSubscription } from '@apollo/client';
import { GROUPS, SUBSCRIPTION_GROUPS } from '../../../../Querys/Group_Query';
import { useCourse } from '../../../../context/CourseProvider';
import { useTeacher } from '../../../../context/TeacherProvider';
import { useEffect, useState } from 'react';
import { useCourseFilter } from '../../../../context/CourseFilterProvider';
import { useLoader } from '../../../../context/Loader';

const GroupsTable = ({  setRowId, setValues }) => {
   const [courseFilter] = useCourseFilter()
   const [setLoading] = useLoader(true)
   const [coursesId] = useCourse()
   const [teacher] = useTeacher()
   const [groups, setGroups] = useState()
   const { data: groupss, loading } = useQuery(GROUPS, {
      variables: { teacherID: teacher, courseID: coursesId }

   })
   useEffect(() => {
      setLoading(loading)
   }, [loading, setLoading])



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


   return (
      <div className="izma__table-g" >
         <Table block="groupHash" arr={groups && groups.groups} />
      </div>
   )
}


export default GroupsTable;


