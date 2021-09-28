import Table from '../../../../components/Table/Table';
import DeleteImg from '../../../../assets/Icons/delete-border.svg'
import './TeachersTable.scss'
import { useMutation, useQuery, useSubscription } from '@apollo/client';
import { DELETE_TEACHER, TEACHERS, TEACHER_SUBSCRIPTION } from '../../../../Querys/Teacher_Query';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const TeachersTable = ({ setMainTableData, mainTableData, values, setRowId, setValues }) => {

   const { data: teachers } = useQuery(TEACHERS)
   const [teachersData, setTeachersData] = useState()

   const [deleteTeacher] = useMutation(DELETE_TEACHER, {
      update: (cache, data) => {
         console.log(data)
      }
   })

   useEffect(() => {
      console.log(teachers);
      setTeachersData(teachers)
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
                  // const newClassifiedRef = cache.writeFragment({
                  // 	data: data.newClassified,
                  // 	fragment: gql `
                  // 		fragment NewClassified on Classified {
                  // 			id
                  // 			type
                  // 		}
                  // 	`
                  // })
               }
            }
         })
      },
   })

   const columns = [
      {
         title: 'Id',
         key: "index",
         render: (text, record, index) => index + 1,
      },
      {
         title: 'Ism',
         dataIndex: 'name',
         key: 'name',
         render: (names, id) =>
            <Link className="name_links" to={`/teachersProfile/` + id.id}>{names}</Link>
      },
      {
         title: 'Telefon',
         dataIndex: 'phoneNumber',
         key: 'phoneNumber',
      },
      {
         title: <div className="table_head"></div>,
         dataIndex: "fd",
         width: "20px",
         key: "fd",
         render: (_, record) =>
            <img className="izma__table-delete-btn" src={DeleteImg} alt="delete img" onClick={() => handleDelete(record)} />
      },
   ];


   return (
      <div className="izma__table-t" >
         <Table 
            block="teacherHash"
         />
      </div>
   )
}

export default TeachersTable;


