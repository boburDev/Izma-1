import { Table } from 'antd';
import { useEffect } from 'react';
import './FinanceTable.scss'
import { useHistory } from 'react-router';

const FinanceTable = (
   { setMainTableData, mainTableData, values, setRowId, setValues }
) => {

   useEffect(() => {
      setMainTableData([
         { id: 1, name: "Эргашев Жавохир", create: "(94) 455-55-53", salary: 'cash', som: '50000', comment: 'lorem fefere' },
         { id: 2, name: "Ғайратжонов Юсуфжон", create: "(94) 455-55-53", salary: 'cash', som: '50000', comment: 'lorem fefere' },
         { id: 3, name: "Асрақулов Илъхомжон", create: "(94) 455-55-53", salary: 'cash', som: '50000', comment: 'lorem fefere' },
         { id: 4, name: "Абдуллаев Оллоёр", create: "(94) 455-55-53", salary: 'cash', som: '50000', comment: 'lorem fefere' },
         { id: 5, name: "Ахмаджонов Иброхимжон", create: "(94) 455-55-53", salary: 'cash', som: '50000', comment: 'lorem fefere' },
      ]);

   }, [setMainTableData]);



   const history = useHistory()


   const onRowClicked = (item) => {
      return {
         onClick: () => {
            setRowId(item.id);
            setValues(item);
            history.push("/financeInner");
         },
      };
   };

   const columns = [
      {
         title: 'Talabalar ismi',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Yaratilgan',
         dataIndex: 'create',
         key: 'create',
      },
      {
         title: 'Ish haqqi',
         dataIndex: 'salary',
         key: 'salary',
      },

      {
         title: 'So’m',
         dataIndex: 'som',
         key: 'som',
      },
      {
         title: 'Izoh',
         dataIndex: 'comment',
         key: 'comment',
      },

   ];


   return (
      <div className="izma__finance-table" >
         <Table className="izma__table__home" columns={columns} onRow={onRowClicked} dataSource={mainTableData} />
      </div>
   )
}



export default FinanceTable;

