import StudentFilterSoha from './containers/StudentFilterSoha/StudentFilterSoha'
import './Students.scss'
import {  useState } from 'react'
import StudentsTable from './containers/StudentsTable/StudentsTable'
import StudentFilterDebtors from '../../components/StudentComponents/StudentFilterDebtors/StudentFilterDebtors'
import StudentAdd from '../../containers/Forms/StudentAdd/StudentAdd'
import { Drawer } from 'antd';
import { useLoader } from '../../context/Loader'
import Loader from '../../components/Loader/Loader'
import { useLang } from '../../context/LanguageProvider'
import Language from '../../lang/index'

const Students = () => {
   const [search, setSearch] = useState()
   const [loading] = useLoader()
   const [lang] = useLang()

   const [visibleF, setVisibleF] = useState(false);
   const showDrawerF = () => {
      setVisibleF(true);
   };

   const onCloseF = () => {
      setVisibleF(false);
   };
   
   return (
      <div className="izma__students-content" >
         {
            loading ?
               <Loader />
               :
               <></>
         }
         <div className="izma__students-content-wrapper">
            <div className="izma__students-content-up">
               <h2 className="izma__students-content-heading">
                  {Language[lang].students.title.pageTitle}
               </h2>

               <div className="ds">
                  <button className='izma__students-content-button' 
                     onClick={() => showDrawerF()}
                  >
                     {Language[lang].students.addNewStudent.addStudent}
                  </button>
               </div>

            </div>
            <div>
            <input
                  autoComplete="off"
               className='izma__students-content-input'
               placeholder={Language[lang].students.search.searchHolder}
               type="text"
               onChange={e => setSearch(e.target.value)}
            />
            <StudentFilterSoha/>
               <StudentFilterDebtors />
               <div className="izma__students-content-center">
                  <div className="izma__students-content-line">
                  </div>
               </div>
            </div>

            

            <div className="studentTable">
               <StudentsTable studentSearch={search} />
            </div>

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