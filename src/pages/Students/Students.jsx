import StudentFilterSoha from './containers/StudentFilterSoha/StudentFilterSoha'
import './Students.scss'
import {  useState } from 'react'
import StudentsTable from './containers/StudentsTable/StudentsTable'
import StudentFilterDebtors from '../../components/StudentComponents/StudentFilterDebtors/StudentFilterDebtors'
import StudentAdd from '../../containers/Forms/StudentAdd/StudentAdd'
import { Drawer } from 'antd';

const Students = () => {
   const [deb, setDeb] = useState()
   const [search, setSearch] = useState()

   const [visibleF, setVisibleF] = useState(false);
   const showDrawerF = () => {
      setVisibleF(true);
   };

   const onCloseF = () => {
      setVisibleF(false);
   };
   return (
      <div className="izma__students-content" >
         <div className="izma__students-content-wrapper">
            <div className="izma__students-content-up">
               <h2 className="izma__students-content-heading">
                  Talabalar
               </h2>

               <div className="ds">
                  <button className='izma__students-content-button' 
                     onClick={() => showDrawerF()}
                  >
                     Yangisini qo’shish
                  </button>
               </div>

            </div>
            <div>
            <input
               className='izma__students-content-input'
               placeholder="Ism yoki telefon orqali qidirish"
               type="text"
            />
            <StudentFilterSoha/>
               <StudentFilterDebtors />
               <div className="izma__students-content-center">
                  <div className="izma__students-content-line">

                  </div>
               </div>
            </div>

            

            <StudentsTable studentSearch={search}  />

            <Drawer
               placement="right"
               closable={false}
               onClose={onCloseF}
               visible={visibleF}
            >
               <StudentAdd onCloseF={onCloseF} />
            </Drawer>



         </div>
      </div>
   )
}

export default Students