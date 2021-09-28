import GroupsTable from './containers/GropusTable/GroupsTable'
import { useState } from 'react'
import { Drawer } from 'antd';
import StudentFilterSoha from '../Students/containers/StudentFilterSoha/StudentFilterSoha'
import GroupAdd from '../../containers/Forms/GroupAdd/GroupAdd';
import './Groups.scss'
import FilterTeachers from '../../components/Groups/FilterTeachers/FilterTeachers';

const Groups = () => {
   const [toggleState, setToggleState] = useState(1);

   const toggleTab = (index) => {
      setToggleState(index);
   };


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
                  Guruhlar
               </h2>
               <div className="izma__teachers-content-btns">

                  <button className="izma__teachers-content-button" onClick={showDrawer}>
                     Yangisini qo’shish
                  </button>
                  <Drawer
                     placement="right"
                     closable={false}
                     onClose={onClose}
                     visible={visible}
                  >
                     <GroupAdd onClose={onClose} />
                  </Drawer>
               </div>

            </div>

            <div className="izma__teachers-content-center">

            </div>
         </div>

         <div className="izma__groups-tabs">
            <div className="bloc-tabs">
               <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
               >
                  Faol guruhlar
               </button>
               <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
               >
                  Arxiv guruhlar
               </button>

            </div>

            <div className="content-tabs">
               <div
                  className={toggleState === 1 ? "content  active-content" : "content"}
               >
                  <FilterTeachers />
                  <StudentFilterSoha />

                  <GroupsTable />

               </div>

               <div
                  className={toggleState === 2 ? "content  active-content" : "content"}
               >
                  <GroupsTable />

               </div>

            </div>
         </div>


      </div>
   )
}

export default Groups