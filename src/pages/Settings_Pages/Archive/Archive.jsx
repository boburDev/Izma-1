import { Table } from 'antd';
import DeleteImg from '../../../assets/Icons/settings-delete.svg'
import './Archive.scss'


const Archive = ({ setMainTableData, mainTableData, setRowId, setValues }) => {

   console.log(12);


   // useEffect(() => {
   //    setMainTableData([
   //       { id: 1, Id: '3330', name: "Boburmirzo admin", rule: 'Administrator', phone: '(93) 071-69-51', actions: '1 year 31 days', },
   //       { id: 2, Id: '3330', name: "Boburmirzo admin", rule: 'Administrator', phone: '(93) 071-69-51', actions: '1 year 31 days', },
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
         title: 'Roli',
         dataIndex: 'rule',
         key: 'rule',
      },
      {
         title: 'Telefon',
         dataIndex: 'phone',
         key: 'phone',
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
         <div className="izma__settings-archive">
            <div className="izma__settings-archive-up">
               <h3 className="izma__settings-archive-up-heading">
                  Formalar
               </h3>
               <h4 className="izma__settingsarchive-up-title">
                  Xodimlar | Arxiv
               </h4>


            </div>
            <div className="izma__settings-archive-button">
               <Table className="izma__table__home" columns={columns} pagination={false} onRow={onRowClicked} dataSource={mainTableData} />
            </div>
         </div>

      </>
   )
}


export default Archive;
