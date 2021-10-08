import './GroupProfilRightTab4.scss'
import { useLang } from '../../../../../context/LanguageProvider'
import Language from '../../../../../lang/index'

const GroupProfilRightTab4 = () => {
   const [lang] = useLang();
   return (
      <>
         <div className="izma__groups-attendance-right-tabs-fourth">
            <ul className="izma__groups-attendance-right-tabs-fourth-list">
               <li className="izma__groups-attendance-right-tabs-fourth-items">
                  <div className="izma__groups-attendance-right-tabs-fourth-items-up">
                     <div className="izma__groups-attendance-right-tabs-fourth-items-up-left">
                        <h4 className="izma__groups-attendance-right-tabs-fourth-items-up-left-heading">
                        {Language[lang].groups.groupEdited}
                        </h4>
                     </div>
                     <div className="izma__groups-attendance-right-tabs-fourth-items-up-right">
                        <p className="izma__groups-attendance-right-tabs-fourth-items-up-right-text">
                           07.08.2021 15:09:28
                           Генерик
                        </p>
                     </div>
                  </div>
                  <div className="izma__groups-attendance-right-tabs-fourth-items-bottom">
                     <p className="izma__groups-attendance-right-tabs-fourth-items-bottom-text">
                        Генерик ・ (94) 365-97-05
                     </p>
                  </div>
               </li>

               <li className="izma__groups-attendance-right-tabs-fourth-items">
                  <div className="izma__groups-attendance-right-tabs-fourth-items-up">
                     <div className="izma__groups-attendance-right-tabs-fourth-items-up-left">
                        <h4 className="izma__groups-attendance-right-tabs-fourth-items-up-left-heading">
                        {Language[lang].groups.groupEdited}
                        </h4>
                     </div>
                     <div className="izma__groups-attendance-right-tabs-fourth-items-up-right">
                        <p className="izma__groups-attendance-right-tabs-fourth-items-up-right-text">
                           07.08.2021 15:09:28
                           Генерик
                        </p>
                     </div>
                  </div>
                  <div className="izma__groups-attendance-right-tabs-fourth-items-bottom">
                     <p className="izma__groups-attendance-right-tabs-fourth-items-bottom-text">
                        Генерик ・ (94) 365-97-05
                     </p>
                  </div>
               </li>


            </ul>

         </div>
      </>
   )
}
export default GroupProfilRightTab4