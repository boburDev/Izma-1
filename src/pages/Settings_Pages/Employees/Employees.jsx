import './Employees.scss'
import { Table } from 'antd';
import PersonImg from '../../../assets/header-img.svg'
import SettingsArchiveForm from '../../../containers/Forms/SettingsArchiveForm/SettingsArchiveForm'
import { Drawer } from 'antd';
import { useState } from 'react'
import { COLLEGUES } from './query'
import { useQuery } from '@apollo/client';

const Employees = ({ setMainTableData, mainTableData, data, values, setRowId, setValues }) => {


   const [visible, setVisible] = useState(false);
   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };

   const { data: all_colleagues } = useQuery(COLLEGUES)


   // useEffect(() => {
   //    const data = all_colleagues && all_colleagues.all_colleagues.map((i, key) => {
   //       return { Id: key + 1, name: i.name, phone: `+${i.phoneNumber}`, rule: i.status }
   //    })


   //    setMainTableData(data);

   // }, [setMainTableData, all_colleagues]);



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
         title: 'Id',
         dataIndex: 'Id',
         key: 'Id',
      },
      {
         title: "",
         dataIndex: 'name',
         key: 'name',
         width: "1px",
         render: (text, record, index) =>
            <img className="izma__table-delete-btn" src={PersonImg} alt="delete img" />

      },
      {
         title: "First name / Surname",
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
      }

   ];
   return (
      <>
         <div className="izma__settings-employees">
            <div className="hodim_heading">
               <h2 className="izma__settings-employees-heading">
                  Xodimlar
               </h2>
               <button className="izma__settings-archive-up-button" onClick={showDrawer} >
                  Yangisini qo’shing
               </button>
            </div>
            <div className="izma__settings-employees-table-wrapper">
               <Table className="izma__table__home" columns={columns} onRow={onRowClicked} dataSource={mainTableData} />
            </div>

         </div>
         <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
         >
            <SettingsArchiveForm onClose={onClose} />
         </Drawer>
      </>
   )
}



export default Employees;
