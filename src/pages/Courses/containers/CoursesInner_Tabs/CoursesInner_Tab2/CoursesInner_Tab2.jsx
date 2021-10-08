import './CoursesInner_Tab2.scss'
import CoursesFormMainDegree from '../../CoursesFormMainDegree/CoursesFormMainDegree'
import { useState } from 'react'
import { Drawer } from 'antd'
import CoursesSmallCard from '../../../../../components/CoursesComponents/CoursesSmallCard/CoursesSmallCard'
import { useLang } from '../../../../../context/LanguageProvider'
import Language from '../../../../../lang/index'

const CoursesInner_Tab2 = () => {

   const [visible, setVisible] = useState(false);
   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };

   const [lang] = useLang()

   return (
      <>
         <div className="izma__courses-tabs1">
            <button className="izma__courses-tabs1-button" onClick={showDrawer}>
            {Language[lang].courses.degrees.addDegree}
            </button>
            <Drawer
               placement="right"
               closable={false}
               onClose={onClose}
               visible={visible}
            >
               <CoursesFormMainDegree onClose={onClose} />
            </Drawer>
            <div className="izma__courses-tabs2-message">
               <p className="izma__courses-tabs2-message-text">
               {Language[lang].courses.degrees.notDegree}
               </p>
            </div>
            <CoursesSmallCard />
         </div>
      </>
   )
}
export default CoursesInner_Tab2