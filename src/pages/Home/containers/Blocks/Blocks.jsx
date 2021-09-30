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
import { STUDENT_COUNT, GROUP_COUNT, STATUS_COUNT } from '../../../../Querys/HomeCard_Query'
import { useQuery } from '@apollo/client'



const Blocks = () => {


   const {data: CountStudents } = useQuery(STUDENT_COUNT)
   const {data: GroupCount } = useQuery(GROUP_COUNT)
   const {data: CountStatus_2 } = useQuery(STATUS_COUNT, {variables: {count: '2'}})
   const {data: CountStatus_3 } = useQuery(STATUS_COUNT, {variables: {count: '3'}})
   const {data: CountStatus_4 } = useQuery(STATUS_COUNT, {variables: {count: '4'}})
   const {data: CountStatus_5 } = useQuery(STATUS_COUNT, {variables: {count: '5'}})
   const {data: CountStatus_6 } = useQuery(STATUS_COUNT, {variables: {count: '6'}})



   const lists = [
      {
         icon: Home1Img,
         title: 'Faol lidlar',
         link: '/lidlar',
         number: '0000'
      },
      {
         icon: Home2Img,
         title: 'Faol talabalar',
         link: '/student',
         number: (CountStudents && CountStudents.studentCountHome) ? (CountStudents && CountStudents.studentCountHome) : '0'
      },
      {
         icon: Home3Img,
         title: 'Guruhlar',
         link: '/groups',
         number: (GroupCount && GroupCount.groupsCount.count) ? GroupCount && GroupCount.groupsCount.count : '0'
      },
      {
         icon: Home4Img,
         title: 'Qarzdorlarr',
         link: '/studentDebtors',
         number: CountStatus_4 && CountStatus_4.studentStatus.count ? CountStatus_4 && CountStatus_4.studentStatus.count : '0'
      },
      {
         icon: Home5Img,
         title: 'Sinov darsida',
         link: '',
         number: CountStatus_2 && CountStatus_2.studentStatus.count ? CountStatus_2 && CountStatus_2.studentStatus.count : '0'
      },
      {
         icon: Home6Img,
         title: 'Oy uchun to’langan',
         link: '',
         number: CountStatus_3 && CountStatus_3.studentStatus.count ? CountStatus_3 && CountStatus_3.studentStatus.count : '0'
      },
      {
         icon: Home7Img,
         title: 'Yurishni to’xtatdi',
         link: '/lidlar',
         number: CountStatus_5 && CountStatus_5.studentStatus.count ? CountStatus_5 && CountStatus_5.studentStatus.count : '0'
      },
      {
         icon: Home8Img,
         title: 'Sinov darsidan keyin ketganlar',
         link: '/',
         number: CountStatus_6 && CountStatus_6.studentStatus.count ? CountStatus_6 && CountStatus_6.studentStatus.count : '0'
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