import './GroupProfilRightTab3.scss'
import { Table } from 'antd';
import CalendarImg from '../../../../../assets/Icons/calendar.svg'
// import { CREATE_SALE } from './query'
// import { useMutation } from '@apollo/client';


const GroupProfilRightTab3 = ({ mainTableData,  setRowId, setValues,  }) => {
   
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
         title: 'Ism',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Telefon',
         dataIndex: 'phone',
         key: 'phone',
      },
      {
         title: 'Individual narx',
         dataIndex: 'price',
         key: 'price',
         render: (text, record, index) =>
            <div className="izma__groups-attendance-right-tabs-third-up-wrapper">
               <input
                  type="text"
                  className='izma__groups-attendance-right-tabs-third-up-input'
                  onChange={(e) => {
                     return console.log(e.target.value)
                  }} />

               <button className='izma__groups-attendance-right-tabs-third-up-btn' onClick={() => console.log(record.stID)}>Saqlash</button>
            </div>
      },


   ];


   return (
      <>
         <h3 className="izma__groups-attendance-right-tabs-third-heading">
            Individual narx
         </h3>
         <div className="izma__groups-attendance-right-tabs-first">
            <div className="izma__groups-attendance-right-tabs-first-up">
               <h3 className="izma__groups-attendance-right-tabs-second-heading">
                  Siz har qanday talaba uchun shaxsiy o'quv to'lovini belgilashingiz mumkin. Chegirmali narxni ko'rsating va Enter tugmasini bosing
               </h3>
               <div className="izma__groups-attendance-right-tabs-first-right">
                  <img className="izma__groups-attendance-right-tabs-first-right-img" src={CalendarImg} alt="img" />
               </div>

            </div>
         </div>
         <div className="izma__groups-attendance-right-tabs-third">

            <div className="groups__attendance-right-tabs-third-table" >
               <Table className="groups__attendance-right-tabs-third-tables" columns={columns} pagination={false} onRow={onRowClicked} dataSource={mainTableData} />
            </div>

         </div>
      </>
   )
}

export default GroupProfilRightTab3;