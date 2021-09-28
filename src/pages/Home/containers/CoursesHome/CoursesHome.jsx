import './CoursesHome.scss'
import HomeAcordion from '../../../../components/HomeComponents/HomeAcordion/HomeAcordion'
const CoursesHome = () => {
   return(
      <div className="courses">
         <div className="courses-left">
            <h2>
             Jurnallar
            </h2>
            <HomeAcordion
               title='Kurs yaratilgan'
               date="13.02.2021"
               text="lorem  asdfka ljsdkfj kjsdk fkjfkjakjdfkjk djka jkj akjdk jka jkj akj kdj asfdkj aksdjf lkajklsdfjskldfj aklsj ajfksdf sdskt alsdjf lakjsfkl fj askldfji eajdsk aj "
            />
            <HomeAcordion
               title='Kurs yaratilgan'
               date="13.02.2021"
               text="lorem  asdfka ljsdkfj kjsdk fkjfkjakjdfkjk djka jkj akjdk jka jkj akj kdj asfdkj aksdjf lkajklsdfjskldfj aklsj ajfksdf sdskt alsdjf lakjsfkl fj askldfji eajdsk aj "
            />
            <HomeAcordion
               title='Kurs yaratilgan'
               date="13.02.2021"
               text="lorem  asdfka ljsdkfj kjsdk fkjfkjakjdfkjk djka jkj akjdk jka jkj akj kdj asfdkj aksdjf lkajklsdfjskldfj aklsj ajfksdf sdskt alsdjf lakjsfkl fj askldfji eajdsk aj "
            />
            <HomeAcordion
               title='Kurs yaratilgan'
               date="13.02.2021"
               text="lorem  asdfka ljsdkfj kjsdk fkjfkjakjdfkjk djka jkj akjdk jka jkj akj kdj asfdkj aksdjf lkajklsdfjskldfj aklsj ajfksdf sdskt alsdjf lakjsfkl fj askldfji eajdsk aj "
            />
            <HomeAcordion
               title='Kurs yaratilgan'
               date="13.02.2021"
               text="lorem  asdfka ljsdkfj kjsdk fkjfkjakjdfkjk djka jkj akjdk jka jkj akj kdj asfdkj aksdjf lkajklsdfjskldfj aklsj ajfksdf sdskt alsdjf lakjsfkl fj askldfji eajdsk aj "
            />
         </div>

         <div className="courses-right">
            <iframe  src="https://www.youtube.com/embed/5qap5aO4i9A" title="course"/>
         </div>
      </div>
   )
}

export default CoursesHome