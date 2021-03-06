import GroupsTable from './containers/GropusTable/GroupsTable'
import { useState } from 'react'
import { Drawer } from 'antd';
import StudentFilterSoha from '../Students/containers/StudentFilterSoha/StudentFilterSoha'
import GroupAdd from '../../containers/Forms/GroupAdd/GroupAdd';
import './Groups.scss'
import FilterTeachers from '../../components/Groups/FilterTeachers/FilterTeachers';
import { useLoader } from '../../context/Loader';
import Loader from '../../components/Loader/Loader';
import { useLang } from '../../context/LanguageProvider';
import Language from '../../lang/index'

const Groups = () => {
   const [toggleState, setToggleState] = useState(1);
   const [loading] = useLoader()

   const [lang] = useLang()

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
         {
            loading ? <Loader/> : <></>
         }
         <div className="izma__teachers-content-wrapper">
            <div className="izma__teachers-content-up">
               <h2 className="izma__teachers-content-heading">
                  {Language[lang].groups.groupsTitle}
               </h2>
               <div className="izma__teachers-content-btns">

                  <button className="izma__teachers-content-button" onClick={showDrawer}>
                     {Language[lang].groups.addNewGroup}
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
                  {Language[lang].groups.activeGroups}
               </button>
               <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
               >
                  {Language[lang].groups.archivedGroups}
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