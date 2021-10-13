import Table from '../../../../components/Table/Table';
import './GroupsTable.scss'
import { useLazyQuery, useSubscription } from '@apollo/client';
import { GROUPS, SUBSCRIPTION_GROUPS } from '../../../../Querys/Group_Query';
import { useTeacher } from '../../../../context/TeacherProvider';
import { useEffect, useState } from 'react';
import { useCourseFilter } from '../../../../context/CourseFilterProvider';
import { useLoader } from '../../../../context/Loader';

const GroupsTable = () => {
   const [courseFilter] = useCourseFilter()
   const [setLoading] = useLoader(true)
   const [teacher] = useTeacher()
   const [groups, setGroups] = useState()
   const [daa, { data: groupss, loading }] = useLazyQuery(GROUPS)


   useEffect(() => {
      setLoading(loading)
   }, [loading, setLoading])



   useEffect(()=>{

      daa({
      variables: { teacherID: teacher, courseID: courseFilter }
   })

      setGroups(groupss)

   }, [groupss, daa, teacher, courseFilter])

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
         <div className="boxGroups">
            <Table block="groupHash" arr={groups && groups.groups} />
         </div>
      </div>
   )
}


export default GroupsTable;


