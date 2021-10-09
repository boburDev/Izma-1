import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BY_HASHTAG } from './query'
// import Close from '../../../assets/Icons/close.svg'
import Icon from '../../../assets/Icons/arrow_im.svg'
import LogoTwo from '../../../assets/Group 12.svg'
import Logo from '../../../assets/Icons/top.svg'
import { useEffect } from 'react'
import Icon1 from '../../../assets/icon1.png'
import Icon2 from '../../../assets/icon2.svg'
import Icon3 from '../../../assets/icon3.svg'
import Icon4 from '../../../assets/icon4.svg'
import Icon5 from '../../../assets/icon5.svg'
import Icon6 from '../../../assets/icon6.svg'
import Icon7 from '../../../assets/icon7.svg'
import Icon8 from '../../../assets/icon8.svg'
import Icon9 from '../../../assets/icon9.svg'
import NavbarLinkSet from '../NavbarLinkFin/NavbarLinkFin'
import Language from '../../../lang/index'
import { useLang } from '../../../context/LanguageProvider'

import {
   Home,
   Lidrlar,
   Talabalar,
   Teacher,
   Guruhlar,
   Kurslar,
   Moliya,
   Settings
} from '../../../assets/Icons/icons'
import { useHistory } from 'react-router'
import './Navbar.scss'

// =============== Import  Components ================= 

import NavbarLinks from '../NavbarLinks/NavbarLinks'
import NavbarPlus from '../NavbarPlus/NavbarPlus'
import { useNavbar } from '../../../context/NavbarProvider'



const Navbar = ({ sidebarActive }) => {
   const [navbarP] = useNavbar()
   const [dragActive, setDragActive] = useState()
   const [settingActive, setSettingActive] = useState(false)
   const [openMoliya, setOpenMoliya] = useState(false)
   const [openSetting, setOpenSetting] = useState(false)
   const [openOfis, setOpenOfis] = useState(false)
   const [openJurnal, setOpenJurnal] = useState(false)
   const [openShakl, setOpenShakl] = useState(false)
   const [hashName, setHashName] = useState('')
   const [lang] = useLang()

   const {data: hashtag} = useQuery(BY_HASHTAG)

   useEffect(() => {
      if (hashtag && hashtag) {
         setHashName(hashtag.hashtag)
      }

   }, [hashtag])

   const openFinance1 = () => {
      setOpenMoliya(!openMoliya)
      setOpenSetting(false)
   }

   const quitButton = () => {
      setSettingActive(false)
      setDragActive(false)
   }

   const openSettings1 = () => {
      setOpenMoliya(false)
      setOpenSetting(!openSetting)
   }

   const closeFinSet = () => {
      setOpenMoliya(false)
      setOpenSetting(false)
   }


   

   const [homeActive, setHomeActive] = useState()
   const [lidActive, setLidActive] = useState()
   const [studentActive, setStudentActive] = useState()
   const [teachrtActive, setTeacherActive] = useState()
   const [groupActive, setGroupActive] = useState()
   const [courseActive, setCourseActive] = useState()

   const closeAll = () => {
      setHomeActive(false)
      setLidActive(false)
      setStudentActive(false)
      setTeacherActive(false)
      setGroupActive(false)
      setCourseActive(false)
   }
   const links = [
      {
         title: Language[lang].navigation.main,
         icon: <Home />,
         link: '/',
         isButton: false,
         nav: homeActive

      },
      {
         title: Language[lang].navigation.lids,
         icon: <Lidrlar />,
         link: '/lidlar',
         isButton: false,
         nav: lidActive
      },
      {
         title: Language[lang].navigation.students,
         icon: <Talabalar />,
         link: '/students',
         isButton: false,
         nav: studentActive
      },
      {
         title: Language[lang].navigation.teachers,
         icon: <Teacher />,
         link: '/teachers',
         isButton: false,
         nav: teachrtActive
      },
      {
         title: Language[lang].navigation.groups,
         icon: <Guruhlar />,
         link: '/groups',
         isButton: false,
         nav: groupActive
      },
      {
         title: Language[lang].navigation.courses,
         icon: <Kurslar />,
         link: '/courses',
         isButton: false,
         nav: courseActive
      },
      {
         title: Language[lang].navigation.finance,
         icon: <Moliya />,
         link: '/finance',
         isButton: true,
         addClass: openFinance1,
         clas: dragActive
      },
   ]

   const { location } = useHistory()
   useEffect(() => {
      let paths = window.location.pathname.split('/')
      switch (location.pathname) {
         case "/settingsEmployeesInner":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/finance":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/financeCosts":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/financeSalary":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/financePaymentGroups":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/financePayment":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/settingsRoadmap":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/settingsEmployees":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/settingsMagazine":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/settingsArchive":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/settingsLidform":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/settingsEnter":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/settingsShapes":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/settingsCompany":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/groups/groupsProfil/" + paths[paths.length - 1]:
            closeAll()
            setGroupActive(true)
            
            break;
         case "/studentProfile/" + paths[paths.length - 1]:
            closeAll()
            setStudentActive(true)
            
            break;
         case "/teacherProfile/" + paths[paths.length - 1]:
            closeAll()
            setTeacherActive(true)
            
            break;
         case "/coursesInner/" + paths[paths.length - 1]:
            closeAll()
            setCourseActive(true)
            
            break;

         case "/": 
         
            break;
         default:
            closeAll()
            closeFinSet() 
            setSettingActive(false)
            setDragActive(false)
            break;
      }
   }, [location.pathname, navbarP]);

   const MoliyaLinks = [
      {
         link: '/finance',
         title: Language[lang].navigation.allPayments
      },
      {
         link: '/financeCosts',
         title: Language[lang].navigation.costs
      },
      {
         link: '/financeSalary',
         title: Language[lang].navigation.salaryForWork
      },
      {
         link: '/financePaymentGroups',
         title: Language[lang].navigation.paymentGroups
      },
      {
         link: '/financePayment',
         title: Language[lang].navigation.paymentCourses
      },
   ]
   const SettingLinks = [
      {
         link: '/settingsRoadmap',
         title: Language[lang].navigation.map,
         icon: Icon1,
         isBox: false,
         links: [],
         func: '',
         setFunc: ''

      },
      {
         link: '',
         title: Language[lang].navigation.office,
         icon: Icon,
         isBox: true,
         links: [
            {
               link: '/settingsEmployees',
               title: Language[lang].navigation.empoyee,
               icon: Icon2
            }, {
               link: '/settingsEmployeesInner',
               title: Language[lang].navigation.rooms,
               icon: Icon3
            }
         ],
         func: openOfis,
         setFunc: setOpenOfis
      },
      {
         link: '',
         title: Language[lang].navigation.others,
         icon: Icon,
         isBox: true,
         links: [
            {
               link: '/settingsMagazine',
               title: Language[lang].navigation.journals,
               icon: Icon4
            }, {
               link: '/settingsArchive',
               title: Language[lang].navigation.archive,
               icon: Icon5
            }
         ],
         func: openJurnal,
         setFunc: setOpenJurnal
      },
      {
         link: '',
         title: Language[lang].navigation.shapes,
         icon: Icon,
         isBox: true,
         links: [
            {
               link: `/${hashName}/entry/lead`,
               title: Language[lang].navigation.lidForm,
               icon: Icon6
            }, {
               link: '/enterForm',
               title: Language[lang].navigation.enterForm,
               icon: Icon7
            
            }, {
               link: '/settingsShapes',
               title: Language[lang].navigation.shapes,
               icon: Icon8
            }
         ],
         func: openShakl,
         setFunc: setOpenShakl
      },
      {
         link: '/settingsCompany',
         title: Language[lang].navigation.companySettings,
         icon: Icon9,
         isBox: false,
         links: [],
         func: '',
         setFunc: ''
      },
   ]




   return (

      <div className={`navbar_wrapper ${sidebarActive ? 'active' : ' '}`}>
         <div className="navbar_wrapper-header">
            <NavLink exact className="navbar_links-logo" to="/">
               <img src={Logo} className="defualt_logo" alt="img logo" />
               <img src={LogoTwo} className="active_logo" alt="" />
            </NavLink>

         </div>

         <div className="navbar_wrapper-center">
            {
               links.map(el => {
                  if (el.isButton) {
                     return <NavbarLinks
                        icon={el.icon}
                        title={el.title}
                        isButton={el.isButton}
                        link={el.link}
                        addClass={el.addClass}
                        link2={closeFinSet}
                        key={el.title}
                        clas={el.clas}
                     />
                  } else {
                     return <NavbarLinks
                        icon={el.icon}
                        title={el.title}
                        isButton={el.isButton}
                        link={el.link}
                        link2={closeFinSet}
                        key={el.title}
                        quitButton={quitButton}
                        nav={el.nav}
                     />
                  }
               })
            }
            <NavbarLinkSet
               icon={<Settings />}
               title={Language[lang].navigation.settings}
               isButton={true}
               link={'/settingsRoadmap'}
               addClass={openSettings1}
               link2={closeFinSet}
               key={'set'}
               clas={settingActive}
            />

            

            <di   v className={`navbar-plus ${openMoliya || openSetting ? 'active' : ''}`}>
               <NavbarPlus
                  arr={MoliyaLinks}
                  arr2={SettingLinks}
                  openMoliya={openMoliya}
                  openSetting={openSetting}
                  setOpenMoliya={setOpenMoliya}
                  setOpenSetting={setOpenSetting}
               />
            </di>
         </div>


      </div>

   )
}

export default Navbar