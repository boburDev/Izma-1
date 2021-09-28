import './PaymentGroups.scss'
import FinanceCostsImg from '../../../assets/Icons/008-dollar.svg'
import { Table } from 'antd';

const PaymentGroups = ({ setMainTableData, mainTableData, setRowId, setValues }) => {
   // useEffect(() => {
   //    setMainTableData([
   //       { id: 1, groups: "Standart guruhlar", teachers: 'Standart guruhlar', courses: "Standart guruhlar", price: '$96.00', },
   //       { id: 2, groups: "Standart guruhlar", teachers: 'Standart guruhlar', courses: "Standart guruhlar", price: '$96.00', },
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
         title: 'Guruhlar',
         dataIndex: 'groups',
         key: 'groups',
      },
      {
         title: 'O’qituvchilar',
         dataIndex: 'teachers',
         key: 'teachers',
      },
      {
         title: "Kurslar",
         dataIndex: 'courses',
         key: 'courses',
      },


      {
         title: 'So’m',
         dataIndex: 'price',
         key: 'price',
      },

   ];
   return (
      <>
         <div className="izma__finance-payment-groups">
            <div className="izma__finance-payment-groups-headings">
               <h3 className="izma__finance-payment-groups-heading">
                  To’lovlar guruhi
               </h3>
               <h4 className="izma__finance-payment-groups-title">
                  Moliya /to’lov guruhi
               </h4>
            </div>
            <div className="izma__finance-payment-right-tabs-second-up">
               <p className="izma__finance-payment-right-tabs-second-text">
                  Davr uchun tushumlar 2021.08.01 - 2021.08.31: 750,000 so'm
               </p>
               <img className='izma__finance-payment-right-tabs-second-img' src={FinanceCostsImg} alt="" />
            </div>

            <div className="izma__finance-payment-groups-center">
               <div className="izma__finance-payment-groups-center-id-wrappers">
                  <div className="izma__finance-payment-groups-center-id-text">
                     ID
                  </div>
                  <div className="izma__finance-payment-groups-center-id-number">
                     13119
                  </div>
               </div>

               <div className="izma__finance-payment-groups-center-date-wrappers">
                  <div className="izma__finance-payment-groups-center-date-text">
                     Sanadan boshlab
                  </div>
                  <div className="izma__finance-payment-groups-center-date-number">
                     27/07/2020
                  </div>
               </div>

               <div className="izma__finance-payment-groups-center-price-wrappers">
                  <div className="izma__finance-payment-groups-center-price-text">
                     Summa
                  </div>
                  <div className="izma__finance-payment-groups-center-price-number">
                     $40.10
                  </div>
               </div>

               <div className="izma__finance-payment-groups-center-payment-wrappers">
                  <div className="izma__finance-payment-groups-center-payment-text">
                     Pul o’tkazish turi
                  </div>
                  <div className="izma__finance-payment-groups-center-payment-number">
                     payment/sum
                  </div>
               </div>

            </div>

            <div className="izma__finance-payment-groups-table-wrapper">
               <h4 className="izma__finance-payment-groups-table-wrapper-heading">
                  Order Details
               </h4>
               <Table className="izma__table__home" columns={columns} pagination={false} onRow={onRowClicked} dataSource={mainTableData} />
            </div>


         </div>
      </>

   )
}


export default PaymentGroups;
