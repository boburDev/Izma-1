import './Jurnals.scss'
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider'


const Jurnals = () => {
   const [lang] = useLang()
   return (

      <>
         <div className="izma__settings-magazine">
            <h3 className="izma__settings-magazine-heading">
               {Language[lang].settings.journals.journalsTitle}
            </h3>
            <div className="boxJurnals">
               <ul className="izma__settings-magazine-list">
                  <li className="izma__settings-magazine-items">
                     <div className="izma__settings-magazine-items-round"></div>
                     <p className="izma__settings-magazine-items-teacher">
                        Генерик
                     </p>
                     <p className="izma__settings-magazine-items-text">
                        Talabalar tashrifi olib tashlandi
                     </p>
                     <p className="izma__settings-magazine-items-date">
                        09.08.2021 21:55
                     </p>
                  </li>

                  <li className="izma__settings-magazine-items">
                     <div className="izma__settings-magazine-items-round"></div>
                     <p className="izma__settings-magazine-items-teacher">
                        Генерик
                     </p>
                     <p className="izma__settings-magazine-items-text">
                        Talabalar tashrifi olib tashlandi
                     </p>
                     <p className="izma__settings-magazine-items-date">
                        09.08.2021 21:55
                     </p>
                  </li>

               </ul>
            </div>
         </div>
      </>
   )
}

export default Jurnals