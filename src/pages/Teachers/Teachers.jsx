import TeachersTable from './containers/TeachersTable/TeachersTable'
import TeacherAdd from '../../containers/Forms/TeacherAdd/TeacherAdd';
import { Drawer, } from 'antd';
import { useState } from 'react';
import './Teachers.scss'
import Loader from '../../components/Loader/Loader';
import { useLoader } from '../../context/Loader';
import Language from '../../lang/index'
import { useLang } from '../../context/LanguageProvider'

const Teachers = () => {
   const [loading] = useLoader()
   const [visible, setVisible] = useState(false);
   const showDrawer = () => {
      setVisible(true);
   };

   const onClose = () => {
      setVisible(false);
   };

   const [lang] = useLang();

   return (
      <div className="izma__teachers-content">
         {
            loading ? <Loader/> : <></>
         }
         <div className="izma__teachers-content-wrapper">
            <div className="izma__teachers-content-up">
               <h2 className="izma__teachers-content-heading">
                  {Language[lang].teachers.teacher.teacherTitle}
               </h2>
               <button className="izma__teachers-content-button" onClick={showDrawer}>
                  {Language[lang].courses.addCourse}
               </button>
               <Drawer
                  placement="right"
                  closable={false}
                  onClose={onClose}
                  visible={visible}
               >
                  <TeacherAdd setVisible={setVisible} onClose={onClose} />
               </Drawer>
            </div>

            <div className="izma__teachers-content-center">
               <div className="izma__teachers-content-line">
                  
               </div>
            </div>
         </div>
            <TeachersTable block="teachersHash" />


         

      </div>
   )
}

export default Teachers