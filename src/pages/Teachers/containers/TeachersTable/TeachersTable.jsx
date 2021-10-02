import Table from '../../../../components/Table/Table';
// import DeleteImg from '../../../../assets/Icons/delete-border.svg'
import './TeachersTable.scss'
import { useQuery, useSubscription } from '@apollo/client';
import { TEACHERS, TEACHER_SUBSCRIPTION } from '../../../../Querys/Teacher_Query';
import { useEffect} from 'react';
import { useTeacherData } from '../../../../context/TeachersTableProvider';
import { useLoader } from '../../../../context/Loader';

const TeachersTable = () => {

   const { data: teachers, loading } = useQuery(TEACHERS)
   const [setTeacherData] = useTeacherData(true)
   const [setLoading] = useLoader(true)

   useEffect(() => {
      setTeacherData(teachers)
   }, [teachers, setTeacherData])

   useEffect(() => {
      setLoading(loading)
   }, [loading, setLoading])

 

   useSubscription(TEACHER_SUBSCRIPTION, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               colleagues: () => {}
            }
         })
      },
   })


   return (
      <div className="izma__table-t" >
         <Table 
            block="teacherHash"
         />
      </div>
   )
}

export default TeachersTable;


