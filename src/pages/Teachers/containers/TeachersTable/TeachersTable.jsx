import Table from '../../../../components/Table/Table';
import DeleteImg from '../../../../assets/Icons/delete-border.svg'
import './TeachersTable.scss'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { DELETE_TEACHER, TEACHERS, TEACHER_SUBSCRIPTION } from '../../../../Querys/Teacher_Query';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTeacherData } from '../../../../context/TeachersTableProvider';
import {
   gql
} from '@apollo/client'

const TeachersTable = ({ setMainTableData, mainTableData, values, setRowId, setValues }) => {

   const { data: teachers } = useQuery(TEACHERS)
   const [setTeacherData] = useTeacherData(true)

   const [deleteTeacher] = useMutation(DELETE_TEACHER, {
      update: (cache, data) => {
         console.log(data)
      }
   })

   useEffect(() => {
      setTeacherData(teachers)
   }, [teachers])

   






   function handleDelete(record) {
      deleteTeacher({
         variables: {
            id: record.id
         }
      })
   }
   const onRowClicked = (item) => {

      // setRowId(item.id);
      // setValues(item);
   };

   useSubscription(TEACHER_SUBSCRIPTION, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               colleagues: (colleagues = []) => {
                  const newClassifiedRef = cache.writeFragment({
                  	data: data.newClassified,
                  	fragment: gql `
                  		fragment NewClassified on Classified {
                  			id
                  			type
                  		}
                  	`
                  })
               }
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


