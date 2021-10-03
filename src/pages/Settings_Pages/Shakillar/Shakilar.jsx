import { Table } from 'antd';
import './Shakillar.scss'
import EditImg from '../../../assets/Icons/settings-edit.svg'
import DeleteImg from '../../../assets/Icons/settings-delete.svg'

const Shakillar = ({ setMainTableData, mainTableData, data, values, setRowId, setValues }) => {

   // useEffect(() => {
   //    setMainTableData([
   //       { id: 1, Id: '3330', name: "Heather Reyes", },
   //       { id: 2, Id: '3330', name: "Heather Reyes", },
   //    ]);

   // }, [setMainTableData]);



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
         title: 'id',
         dataIndex: 'Id',
         key: 'Id',
      },
      {
         title: "Ism",
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Tahrirlash',
         dataIndex: 'edit',
         key: 'edit',
         width: "20px",
         render: (text, record, index) =>

            <img className="izma__table-settings-delete-btn" src={EditImg} alt="delete img" />
      },
      {
         title: 'Amallar',
         dataIndex: 'actions',
         key: 'actions',
         width: "20px",
         render: (text, record, index) =>

            <img className="izma__table-settings-delete-btn" src={DeleteImg} alt="delete img" />
      },

   ];
   return (
      <>
         <div className="izma__settings-shapes">
            <div className="izma__settings-shapes-up">
               <h3 className="izma__settings-shapes-up-heading">
                  Formalar
               </h3>
               <button className="izma__students-content-button">
                  Yarating
               </button>
            </div>
            <div className="izma__settings-shapes-button">
               <Table className="izma__table__home" columns={columns} pagination={false} onRow={onRowClicked} dataSource={mainTableData} />
            </div>
         </div>
      </>
   )
}


export default Shakillar;
