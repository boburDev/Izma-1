import { Table } from 'antd';
import './Shakillar.scss'
import EditImg from '../../../assets/Icons/settings-edit.svg'
import DeleteImg from '../../../assets/Icons/settings-delete.svg'
import { useLang } from '../../../context/LanguageProvider';
import Language from '../../../lang/index'

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
   const [lang] = useLang()

   const columns = [


      {
         title: Language[lang].settings.forms.id,
         dataIndex: 'Id',
         key: 'Id',
      },
      {
         title: Language[lang].settings.forms.fullName,
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: Language[lang].settings.rooms.edit,
         dataIndex: 'edit',
         key: 'edit',
         width: "20px",
         render: (text, record, index) =>

            <img className="izma__table-settings-delete-btn" src={EditImg} alt="delete img" />
      },
      {
         title: Language[lang].settings.rooms.actions,
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
                  {Language[lang].settings.forms.formTitle}
               </h3>
               <button className="izma__students-content-button">
               {Language[lang].settings.forms.addNewForm}
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
