import './GroupProfilRightTab2.scss'
import '../GroupProfilRightTab1/GroupProfilRightTab1.scss'
import CalendarImg from '../../../../../assets/Icons/calendar.svg'
import { useQuery } from '@apollo/client'
import { BY_GROUP_ID } from '../../../../../Querys/GroupTabs'
import { useParams } from 'react-router'
import { useLang } from '../../../../../context/LanguageProvider'
import Language from '../../../../../lang/index'

const GroupProfilRightTab2 = () => {

   const { groupID } = useParams()
   const [lang] = useLang()

   const { data: onlineLesson } = useQuery(BY_GROUP_ID, {
      variables: { groupID }
   })

   return (
      <>
         {
            onlineLesson && onlineLesson?.byGroupID[0] && onlineLesson?.byGroupID[0]?.onlineLessons.length ?

               <div className="izma__groups-attendance-right-tabs-second">
                  {
                     onlineLesson.byGroupID.onlineLessons && onlineLesson.byGroupID.onlineLessons.map((e, i) => (
                        <div key={i} className="izma__groups-attendance-right-tabs-second-bottom">
                           {e.title}
                           <p className="izma__groups-attendance-right-tabs-second-bottom-text">
                           </p>

                        </div>
                     ))
                  }


               </div> :
               <div className="izma__groups-attendance-right-tabs-second">
                  <div className="izma__groups-attendance-right-tabs-first">
                     <div className="izma__groups-attendance-right-tabs-first-up">
                        <h3 className="izma__groups-attendance-right-tabs-second-heading">
                           {Language[lang].groups.tableRow.ad}
                        </h3>
                        <div className="izma__groups-attendance-right-tabs-first-right">
                           <img className="izma__groups-attendance-right-tabs-first-right-img" src={CalendarImg} alt="img" />
                        </div>

                     </div>
                  </div>
                  <div className="izma__groups-attendance-right-tabs-second-bottom">
                     <p className="izma__groups-attendance-right-tabs-second-bottom-text">
                        {Language[lang].groups.tableRow.warning}
                     </p>

                  </div>

               </div>
         }
      </>
   )
}
export default GroupProfilRightTab2