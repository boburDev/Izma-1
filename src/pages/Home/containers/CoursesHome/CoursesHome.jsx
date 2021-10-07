import './CoursesHome.scss'
import HomeAcordion from '../../../../components/HomeComponents/HomeAcordion/HomeAcordion'
import Language from '../../../../lang/index'
import { useLang } from '../../../../context/LanguageProvider'
const CoursesHome = () => {
   const [lang] = useLang()
   return(
      <div className="courses">
         <div className="courses-left">
            <div className="courses-left-header">
               <h2>
               {Language[lang].home.journals.title}
               </h2>
            </div>
            <div className="courses-left-center">
               <HomeAcordion
                  title={Language[lang].home.journals.courseStarted}
                  date="13.02.2021"
                  text="lorem  asdfka ljsdkfj kjsdk fkjfkjakjdfkjk djka jkj akjdk jka jkj akj kdj asfdkj aksdjf lkajklsdfjskldfj aklsj ajfksdf sdskt alsdjf lakjsfkl fj askldfji eajdsk aj "
               />
            </div>
         </div>

         <div className="courses-right">
            <iframe  src="https://www.youtube.com/embed/5qap5aO4i9A" title="course"/>
         </div>
      </div>
   )
}

export default CoursesHome