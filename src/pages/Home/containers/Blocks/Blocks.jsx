import './Blocks.scss'
import HomeCard from '../../../../components/HomeComponents/HomeCard/HomeCard'
import Home1Img from '../../../../assets/Icons/home1.svg'
import Home2Img from '../../../../assets/Icons/home2.svg'
import Home3Img from '../../../../assets/Icons/home3.svg'
import Home4Img from '../../../../assets/Icons/home4.svg'
import Home5Img from '../../../../assets/Icons/home5.svg'
import Home6Img from '../../../../assets/Icons/home6.svg'
import Home7Img from '../../../../assets/Icons/home7.svg'
import Home8Img from '../../../../assets/Icons/home8.svg'

const Blocks = () => {
   const lists = [
      {
         icon: Home1Img,
         title: 'Faol lidlar',
         link: '/lidlar',
         number: '22112211'
      },
      {
         icon: Home2Img,
         title: 'Faol talabalar',
         link: '/student',
         number: '22112211'
      },
      {
         icon: Home3Img,
         title: 'Guruhlar',
         link: '/groups',
         number: '22112211'
      },
      {
         icon: Home4Img,
         title: 'Qarzdorlarr',
         link: '/studentDebtors',
         number: '22112211'
      },
      {
         icon: Home5Img,
         title: 'Sinov darsida',
         link: '',
         number: '22112211'
      },
      {
         icon: Home6Img,
         title: 'Oy uchun to’langan',
         link: '',
         number: '22112211'
      },
      {
         icon: Home7Img,
         title: 'Yurishni to’xtatdi',
         link: '/lidlar',
         number: '22112211'
      },
      {
         icon: Home8Img,
         title: 'Sinov darsidan keyin ketganlar',
         link: '/',
         number: '22112211'
      }
   ]
   return(
      <div className="blocks">
         {
            lists.map(el => (
               <HomeCard
                  icon={el.icon}
                  title={el.title}
                  link={el.link}
                  number={el.number}
                  key={el.title}
               />
            ))
         }
      </div>
   )
}

export default Blocks