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
import { STUDENT_COUNT, GROUP_COUNT, STATUS_COUNT, ST_COUNT, BY_STATUS, SUBSCRIP_GROUP } from '../../../../Querys/HomeCard_Query'
import { useQuery, useSubscription } from '@apollo/client'
import Language from '../../../../lang/index'
import { useLang } from '../../../../context/LanguageProvider'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'
import "swiper/components/pagination/pagination.min.css"
import SwiperCore, {
   Pagination
} from 'swiper/core';
import { SUBSCRIPTION_STATUS } from '../../../../Querys/GroupTabs'
SwiperCore.use([Pagination])

const Blocks = () => {
   const [lang] = useLang()
   const language = Language[lang].home.blocks
   const {data: CountStudents } = useQuery(STUDENT_COUNT)
   const {data: GroupCount } = useQuery(GROUP_COUNT)
   const {data: CountStatus_2 } = useQuery(BY_STATUS, {variables: {status: 2}})
   const {data: CountStatus_3 } = useQuery(BY_STATUS, {variables: {status: 3}})
   const {data: CountStatus_4 } = useQuery(BY_STATUS, {variables: {status: 4}})
   const {data: CountStatus_5 } = useQuery(BY_STATUS, {variables: {status: 5}})
   const {data: CountStatus_6 } = useQuery(STATUS_COUNT, {variables: {count: 6}})
   const {data: CountStatus_7 } = useQuery(STATUS_COUNT, {variables: {count: 7}})

   useSubscription(ST_COUNT, {
		onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
			cache.modify({
				fields: {
					studentCountHome: () => { }
				}
			})
		},
	})

   useSubscription(ST_COUNT, {
		onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
			cache.modify({
				fields: {
					studentStatus: () => { }
				}
			})
		},
	})

   useSubscription(SUBSCRIPTION_STATUS, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               grStatus: () => { }
            }
         })
      },
   })

   useSubscription(SUBSCRIP_GROUP, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
         cache.modify({
            fields: {
               groupsCount: () => { }
            }
         })
      },
   })
   
   
   const lists = [
      {
         icon: Home1Img,
         title: language.activeLead,
         link: '/lidlar',
         number: '0000'
      },
      {
         icon: Home2Img,
         title: language.activeStudent,
         link: '/student',
         number: CountStudents?.studentCountHome || '0'
      },
      {
         icon: Home3Img,
         title: language.groups,
         link: '/groups',
         number: GroupCount?.groupsCount?.length ||  '0'
      },
      {
         icon: Home4Img,
         title: language.debtStudent,
         link: '/studentDebtors',
         number: CountStatus_4?.grStatus?.length || '0'
      },
      {
         icon: Home5Img,
         title: language.testLesson,
         link: '',
         number: CountStatus_2?.grStatus?.length || '0'
      },
      {
         icon: Home6Img,
         title: language.paidForMonth,
         link: '',
         number: CountStatus_3?.grStatus?.length || '0'
      },
      {
         icon: Home7Img,
         title: language.stoppedParticipate,
         link: '/lidlar',
         number: (CountStatus_6?.studentStatus?.count -0) + (CountStatus_5?.grStatus?.length) || '0'
      },
      {
         icon: Home8Img,
         title: language.leftAfterFirstLesson,
         link: '/',
         number: CountStatus_7?.studentStatus?.count || '0'
      }
   ]

   
   return(
      <div className="blocks">
         <Swiper
            slidesPerView={8} spaceBetween={10} 
            modules={Pagination}
            pagination={true}
            breakpoints={{
               "300": {
                  "slidesPerView": 2,
                  "spaceBetween": 10
               },
               "645": {
                  "slidesPerView": 3,
                  "spaceBetween": 10
               },
               "768": {
                  "slidesPerView": 4,
                  "spaceBetween": 10
               },
               "1023": {
                  "slidesPerView": 8,
                  "spaceBetween": 10
               }
            }} className="mySwiper"
         >
            {
               lists.map(el => (
                  <SwiperSlide key={el.title} width="auto" >
                     <HomeCard
                        icon={el.icon}
                        title={el.title}
                        link={el.link}
                        number={el.number}
                        key={el.title}
                     />
                  </SwiperSlide>
               ))
            }
         </Swiper>
        
      </div>
   )
}

export default Blocks