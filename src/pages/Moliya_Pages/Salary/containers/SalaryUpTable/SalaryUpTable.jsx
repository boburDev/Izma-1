import './SalaryUpTable.scss'


const SalaryUpTable = () => {


   const someArr = [
      {
         teacher: "Генерик",
         discount: "30 talaba to'lovidan %",
      },
      {
         teacher: "Генерик",
         discount: "30 talaba to'lovidan %",
      }
   ]



   const columns = [
      {
         title: "O'qituvchi",
         dataIndex: 'teacher',
         key: 'teacher',
      },
      {
         title: 'Hisoblash usuli',
         dataIndex: 'discountsdew',
         key: 'discountsdew',
      },

   ];
   return (
      <>

         <div className="izma__costs-table">
            <div className="main_order">
               <div className="main_heading">
                  {
                     columns.map((title, i) => (
                        <div key={i} className="information">
                           <h5>{title.title}</h5>
                        </div>
                     ))
                  }
               </div>

               <div className="main_infor">
                  {
                     someArr.map((item, i) => (
                        <div key={i} className="information">
                           <p>{item.teacher}</p>
                           <span >{item.discount}</span>
                        </div>
                     ))
                  }
               </div>
            </div>
         </div>
      </>
   )
}

export default SalaryUpTable;







