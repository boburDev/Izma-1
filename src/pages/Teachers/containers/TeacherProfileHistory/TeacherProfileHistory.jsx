import './TeacherProfileHistory.scss'
import { useLang } from '../../../../context/LanguageProvider'
import Language from '../../../../lang/index'

const TeacherProfileHistory = () => {
   const [lang] = useLang();

   return (
      <>

         <ul className="izma__fiance-history-list">

            <li className="izma__students-history-right-tabs-fourth-items">
               <div className="izma__students-history-right-tabs-fourth-items-up">
                  <div className="izma__students-history-right-tabs-fourth-items-up-left">
                     <h4 className="izma__students-history-right-tabs-fourth-items-up-left-heading">
                        {Language[lang].teachers.courses.accountReplenished}
                     </h4>
                  </div>
                  <div className="izma__students-history-right-tabs-fourth-items-up-right">
                     <p className="izma__students-history-right-tabs-fourth-items-up-right-text">
                        07.08.2021 15:09:28
                        Генерик
                     </p>
                  </div>
               </div>
               <div className="izma__students-history-line"></div>
               <div className="izma__students-history-right-tabs-fourth-items-bottom">
                  <p className="izma__students-history-right-tabs-fourth-items-bottom-text">
                  {Language[lang].teachers.courses.editSituation}
                  </p>
               </div>
            </li>

            <li className="izma__students-history-right-tabs-fourth-items">
               <div className="izma__students-history-right-tabs-fourth-items-up">
                  <div className="izma__students-history-right-tabs-fourth-items-up-left">
                     <h4 className="izma__students-history-right-tabs-fourth-items-up-left-heading">
                        {Language[lang].teachers.courses.accountReplenished}
                     </h4>
                  </div>
                  <div className="izma__students-history-right-tabs-fourth-items-up-right">
                     <p className="izma__students-history-right-tabs-fourth-items-up-right-text">
                        07.08.2021 15:09:28
                        Генерик
                     </p>
                  </div>
               </div>
               <div className="izma__students-history-line"></div>
               <div className="izma__students-history-right-tabs-fourth-items-bottom">
                  <p className="izma__students-history-right-tabs-fourth-items-bottom-text">
                  {Language[lang].teachers.courses.editSituation}
                  </p>
               </div>
            </li>


         </ul>
      </>
   )
}
export default TeacherProfileHistory