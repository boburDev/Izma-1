import CoursesCard from "../../components/CoursesComponents/CoursesCard/CoursesCard"
import './Courses.scss'
import CoursesAdd from "../../containers/Forms/CoursesAdd/CoursesAdd";
import { useState } from 'react';
import { Drawer, } from 'antd';
import { useLoader } from "../../context/Loader";
import Loader from "../../components/Loader/Loader";
import {useLang} from '../../context/LanguageProvider'
import Language from '../../lang/index'

const Courses = () => {

   const [visible, setVisible] = useState(false);
   const [loading] = useLoader()
   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };
   const [lang] = useLang();
   return (
      <div className="izma__courses-content" >
         {
          loading ? <Loader/> : <></>  
         }
         <div className="izma__students-content-wrapper">
            <div className="izma__students-content-up">
               <h2 className="izma__students-content-heading">
                  {Language[lang].courses.courseTitle}
               </h2>
               <button className="izma__students-content-button" onClick={showDrawer} >
                  {Language[lang].courses.addCourse}
               </button>
            </div>
            <div className="izma__students-content-center">
               <div className="izma__students-content-line">

               </div>
            </div>
         </div>

         <CoursesCard />
         <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
         >
            <CoursesAdd onClose={onClose} />
         </Drawer>
      </div>
   )
}
export default Courses