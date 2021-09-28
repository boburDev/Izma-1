import { useState } from 'react';
import '../GroupProfilLeft/GroupProfilLeft.scss'
import GroupProfilRightTab1 from '../GroupProfilRightTabs/GroupProfilRightTab1/GroupProfilRightTab1';
import GroupProfilRightTab2 from '../GroupProfilRightTabs/GroupProfilRightTab2/GroupProfilRightTab2';
import GroupProfilRightTab3 from '../GroupProfilRightTabs/GroupProfilRightTab3/GroupProfilRightTab3';
import GroupProfilRightTab4 from '../GroupProfilRightTabs/GroupProfilRightTab4/GroupProfilRightTab4';

const GroupProfilRight = ({ studentsData }) => {

   const [toggleState, setToggleState] = useState(1);

   const toggleTab = (index) => {
      setToggleState(index);
   };
   return (
      <>
         <div className="izma__groups-inner-tabs">
            <div className="bloc-tabs">
               <button
                  className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(1)}
               >
                  Davomat
               </button>
               <button
                  className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(2)}
               >
                  Online dars va materiallar
               </button>
               <button
                  className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(3)}
               >
                  Chegirmalar
               </button>
               <button
                  className={toggleState === 4 ? "tabs active-tabs" : "tabs"}
                  onClick={() => toggleTab(4)}
               >
                  Tarix
               </button>
            </div>

            <div className="content-tabs">
               <div
                  className={toggleState === 1 ? "content  active-content" : "content"}
               >
                  <GroupProfilRightTab1 />

               </div>

               <div
                  className={toggleState === 2 ? "content  active-content" : "content"}
               >
                  <GroupProfilRightTab2 />

               </div>

               <div
                  className={toggleState === 3 ? "content  active-content" : "content"}
               >
                  <GroupProfilRightTab3 studentData={studentsData} />

               </div>
               <div
                  className={toggleState === 4 ? "content  active-content" : "content"}
               >
                  <GroupProfilRightTab4 />

               </div>
            </div>
         </div>
      </>
   )
}
export default GroupProfilRight