import { Table } from 'antd'
import '../SalaryUpTable/SalaryUpTable.scss'
import EditImg from '../../../../../assets/Icons/settings-edit.svg'
import { CHECK_TEACHER } from '../SalaryUp/query'
import { useEffect } from 'react'
import { useQuery } from '@apollo/client'

const SalaryBottom = ({ mainTableData, setRowId, setValues }) => {

   const {data: checkSumm} = useQuery(CHECK_TEACHER, {variables: {text: 'text'}})


   useEffect(() => {


      if (checkSumm && checkSumm) {
         console.log(checkSumm)
      }

      // setMainTableData([
      //    { id: 1, teacher: "Генерик", price: '30 000', },
      //    { id: 2, teacher: "Генерик", price: '30 000', },
      // ])

   }, [checkSumm])



   const onRowClicked = (item) => {
      return {
         onClick: () => {
            setRowId(item.id)
            setValues(item)

         },
      }
   }

   const columns = [
      {
         title: "O'qituvchi",
         dataIndex: 'teacher',
         key: 'teacher',
      },

      {
         title: 'So’m',
         dataIndex: 'price',
         key: 'price',
      },
      {
         title: 'Tahrirlash',
         dataIndex: 'edit',
         key: 'edit',
         width: "20px",
         render: (text, record, index) => (

            <img className="izma__table-settings-delete-btn" src={EditImg} alt="delete img" />
         )

      },



   ]
   return (
      <>
         <div className="izma__finance-salary-bottom-wrapper">
            <div className="izma__finance__salary-table" >
               <Table className="izma__table__home" columns={columns} pagination={false} onRow={onRowClicked} dataSource={mainTableData} />
            </div>
         </div>
      </>
   )
}


export default SalaryBottom
