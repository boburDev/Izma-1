import './CoursesInner_Tab2.scss'
import CoursesFormMainDegree from '../../CoursesFormMainDegree/CoursesFormMainDegree'
import { useState } from 'react'
import { Drawer } from 'antd'
import CoursesSmallCard from '../../../../../components/CoursesComponents/CoursesSmallCard/CoursesSmallCard'

const CoursesInner_Tab2 = () => {

   const [visible, setVisible] = useState(false);
   const showDrawer = () => {
      setVisible(true);
   };
   const onClose = () => {
      setVisible(false);
   };

   return (
      <>
         <div className="izma__courses-tabs1">
            <button className="izma__courses-tabs1-button" onClick={showDrawer}>
               Darajani qo’shish
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
                  Hech qanday daraja yaratilmagan
               </p>
            </div>
            <CoursesSmallCard />
         </div>
      </>
   )
}
export default CoursesInner_Tab2