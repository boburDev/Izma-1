import TeachersTable from './containers/TeachersTable/TeachersTable'
import TeacherAdd from '../../containers/Forms/TeacherAdd/TeacherAdd';
import { Drawer, } from 'antd';
import { useState } from 'react';
import './Teachers.scss'

const Teachers = () => {

   const [visible, setVisible] = useState(false);
   const showDrawer = () => {
      setVisible(true);
   };

   const onClose = () => {
      setVisible(false);
   };
   return (
      <div className="izma__teachers-content">
         <div className="izma__teachers-content-wrapper">
            <div className="izma__teachers-content-up">
               <h2 className="izma__teachers-content-heading">
                  O’qituvchilar
               </h2>
               <button className="izma__teachers-content-button" onClick={showDrawer}>
                  Yangisini qo’shish
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