import './Xarajatlar.scss'
import { Table } from 'antd';
import FinanceCostsImg from '../../../assets/Icons/finance-dolor-icon.svg'
import { DatePicker, } from "antd";
import moment from 'moment';
import DeleteImg from '../../../assets/Icons/settings-delete.svg'
import XarajatlarForm from './containers/XarajatlarForm/XarajatlarForm';

const Xarajatlar = ({ setMainTableData, mainTableData, setRowId, setValues }) => {
   const { RangePicker } = DatePicker;
   // useEffect(() => {
   //    setMainTableData([
   //       { id: 1, name: "Qog'oz", date: '06.08.2021', type: 'Канцелярия', receiver: "INVEST qog'oz", price: '30 000', actions: '.', },
   //       { id: 2, name: "Qog'oz", date: '06.08.2021', type: 'Канцелярия', receiver: "INVEST qog'oz", price: '30 000', actions: '.', },
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
         title: 'Nomi',
         dataIndex: 'name',
         key: 'name',
      },
      {
         title: 'Sana',
         dataIndex: 'date',
         key: 'date',
      },
      {
         title: "Turkum",
         dataIndex: 'type',
         key: 'type',
         width: "90px",
      },


      {
         title: 'Oluvchi',
         dataIndex: 'receiver',
         key: 'receiver',
      },
      {
         title: 'Sum',
         dataIndex: 'price',
         key: 'price',
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
      <div className="dwBox">
         <div className="dw">
            <div className="izma__finance-costs">
               <div className="izma__finance-costs-headings">
                  <h3 className="izma__finance-costs-heading">
                     Xarajatlar
                  </h3>
                  <h4 className="izma__finance-costs-title">
                     Moliya | Xarajatlar
                  </h4>
               </div>
               <div className="izma__finance-allpayment-up-dates-texts">
                  <p className="izma__finance-allpayment-up-dates-text">
                     Sanadan boshlab
                  </p>
                  <p className="izma__finance-allpayment-up-dates-text izma__finance-allpayment-up-dates-text-s">
                     Sana bo'yicha
                  </p>
               </div>

               <div className="izma__finance-allpayment-up-dates" style={{ width: "350px" }}>
                  <RangePicker
                     defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
                     separator
                     className={"range_picker"}
                     suffixIcon
                     format={"DD-MM-YYYY"}
                     placeholder={["08/01/2021", "08/01/2021"]}
                  />
                  <button className="izma__finance-allpayment-up-dates-btn">
                     Filtr
                  </button>
               </div>


               <div className="izma__finance-costs-right-tabs-second-up">
                  <div className="izma__finance-costs-right-tabs-second-line"></div>
                  <p className="izma__finance-costs-right-tabs-second-text">
                     Davr uchun tushgan pul: 550 000 UZS
                  </p>
                  <img className='izma__finance-costs-right-tabs-second-img' src={FinanceCostsImg} alt="" />
               </div>


            </div>
            <div className="izma__finance__costs" >
               <Table className="izma__table__home" columns={columns} pagination={false} onRow={onRowClicked} dataSource={mainTableData} />
            </div>
         </div>
         <div className="ds">
            <XarajatlarForm />
         </div>
      </div>
   )
}



export default Xarajatlar;
