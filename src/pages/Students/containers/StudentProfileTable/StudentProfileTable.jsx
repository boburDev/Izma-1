import '../StudnetProfileRight/StudentProfileRight.scss'
import { Table } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useQuery } from '@apollo/client';
import { HISTORY } from './query';

const StudentsProfileTable = ({ setMainTableData, mainTableData, setRowId, setValues }) => {

   const { studentID } = useParams()

   const { data: forCheck } = useQuery(HISTORY, { variables: { studentID: studentID } })




   useEffect(() => {
      const historyPay = []

      if (forCheck && forCheck.historyStudentPay) {
         forCheck && forCheck.historyStudentPay.map((item, i) => {
            const type = item.paymentType
            const data = {
               id: item.id,
               clock: item.createdAt,
               Id: i + 1,
               payment: ((type === 1 && 'Naqt pul') || (type === 2 && 'UzCard') || (type === 3 && 'Bank hisobi')),
               date: item.payed_at,
               debit: item.debit,
               credit: item.credit,
               comment: item.comment,
               employee: 'okasi'
            }
            historyPay.push(data)
            return ''
         })
      }

      // setMainTableData(historyPay);

      // setMainTableData([
      //   { id: 1, clock: "06.08.2021 08:44",  Id: '2454',payment: 'Cash', date: '06.08.2021', debit: '1000 UZS', credit: '-', comment: 'desfes', employee: 'Генерик', },
      //   { id: 2, clock: "06.08.2021 08:44",  Id: '2454',payment: 'Cash', date: '06.08.2021', debit: '1000 UZS', credit: '-', comment: 'dessfes', employee: 'Генерик',  },
      // ]);

   }, [setMainTableData, forCheck]);



   const onRowClicked = (item) => {
      return {
         onClick: () => {
            setRowId(item.id);
            setValues(item);
         },
      };
   };

   const columns = [
      {
         title: 'Yozib olingan sana',
         dataIndex: 'clock',
         key: 'clock',
      },
      {
         title: 'id',
         dataIndex: 'Id',
         key: 'Id',
      },
      {
         title: "To'lov usuli",
         dataIndex: 'payment',
         key: 'payment',
         width: "90px",
      },

      {
         title: 'Sana',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: 'Debit',
         dataIndex: 'debit',
         key: 'debit',
      },
      {
         title: 'Credit',
         dataIndex: 'credit',
         key: 'credit',
      },
      {
         title: 'Izoh',
         dataIndex: 'comment',
         key: 'comment',
      },
      {
         title: 'Xodim',
         dataIndex: 'employee',
         key: 'employee',
      },

   ];


   return (
      <div className="finance__inner-table" >
         <Table className="izma__table__home" columns={columns} pagination={false} onRow={onRowClicked} dataSource={mainTableData} />
      </div>
   )
}


export default StudentsProfileTable;

