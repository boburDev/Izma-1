import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { BY_HASHTAG } from './query'
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
import { useUserStatus } from '../../../context/NameProvider'


const Navbar = ({ sidebarActive, setSidebarActive }) => {
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
   const [UserStatus] = useUserStatus()
   const { data: hashtag } = useQuery(BY_HASHTAG)

   

   useEffect(() => {
      if (hashtag && hashtag) {
         setHashName(hashtag.hashtag)
      }

   }, [hashtag, hashName])

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


   let links = []



   const links1 = [
      {
         title: Language[lang].navigation.main,
         icon: <Home />,
         link: '/dashboard',
         isButton: false,
         nav: homeActive

      },
      {
         title: Language[lang].navigation.lids,
         icon: <Lidrlar />,
         link: '/dashboard/lidlar',
         isButton: false,
         nav: lidActive
      },
      {
         title: Language[lang].navigation.students,
         icon: <Talabalar />,
         link: '/dashboard/students',
         isButton: false,
         nav: studentActive
      },
      {
         title: Language[lang].navigation.teachers,
         icon: <Teacher />,
         link: '/dashboard/teachers',
         isButton: false,
         nav: teachrtActive
      },
      {
         title: Language[lang].navigation.groups,
         icon: <Guruhlar />,
         link: '/dashboard/groups',
         isButton: false,
         nav: groupActive
      },
      {
         title: Language[lang].navigation.courses,
         icon: <Kurslar />,
         link: '/dashboard/courses',
         isButton: false,
         nav: courseActive
      },
      {
         title: Language[lang].navigation.finance,
         icon: <Moliya />,
         link: '/dashboard/finance',
         isButton: true,
         addClass: openFinance1,
         clas: dragActive
      },
   ]

   const links2 = [
      {
         title: Language[lang].navigation.lids,
         icon: <Lidrlar />,
         link: '/dashboard/lidlar',
         isButton: false,
         nav: lidActive
      }
   ]

   const links3 = [
      {
         title: Language[lang].navigation.main,
         icon: <Home />,
         link: '/dashboard',
         isButton: false,
         nav: homeActive

      },
      {
         title: Language[lang].navigation.lids,
         icon: <Lidrlar />,
         link: '/dashboard/lidlar',
         isButton: false,
         nav: lidActive
      },
      {
         title: Language[lang].navigation.students,
         icon: <Talabalar />,
         link: '/dashboard/students',
         isButton: false,
         nav: studentActive
      },
      {
         title: Language[lang].navigation.teachers,
         icon: <Teacher />,
         link: '/dashboard/teachers',
         isButton: false,
         nav: teachrtActive
      },
      {
         title: Language[lang].navigation.groups,
         icon: <Guruhlar />,
         link: '/dashboard/groups',
         isButton: false,
         nav: groupActive
      },
      {
         title: Language[lang].navigation.courses,
         icon: <Kurslar />,
         link: '/dashboard/courses',
         isButton: false,
         nav: courseActive
      }
   ]


   const links4 = [
      {
         title: Language[lang].navigation.finance,
         icon: <Moliya />,
         link: '/dashboard/finance',
         isButton: true,
         addClass: openFinance1,
         clas: dragActive
      },
   ]

   const links5 = [
      {
         title: Language[lang].navigation.groups,
         icon: <Guruhlar />,
         link: '/dashboard/groups',
         isButton: false,
         nav: groupActive
      }
   ]

   if (UserStatus === 1) {
      links = links1
   }
   else if (UserStatus === 2) {
      links = links2
   }
   else if (UserStatus === 3) {
      links = links3
   }
   else if (UserStatus === 4) {
      links = links4
   }
   else if (UserStatus === 5) {
      links = links5
   }







   const { location } = useHistory()
   useEffect(() => {
      let paths = window.location.pathname.split('/')
      switch (location.pathname) {
         case "/dashboard/settingsEmployeesInner":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/finance":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/dashboard/financeCosts":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/dashboard/financeSalary":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/dashboard/financePaymentGroups":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/dashboard/financePayment":
            closeAll()
            setDragActive(true)
            setSettingActive(false)
            break;
         case "/dashboard/settingsRoadmap":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingsEmployees":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingsMagazine":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingsArchive":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingsLidform":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingsEnter":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingsShapes":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingsCompany":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/settingLead":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/enterForm":
            closeAll()
            setSettingActive(true)
            setDragActive(false)
            break;
         case "/dashboard/groups/groupsProfil/" + paths[paths.length - 1]:
            closeAll()
            setGroupActive(true)

            break;
         case "/dashboard/studentProfile/" + paths[paths.length - 1]:
            closeAll()
            setStudentActive(true)


            break;
         case "/dashboard/teacherProfile/" + paths[paths.length - 1]:
            closeAll()
            setTeacherActive(true)

            break;
         case "/dashboard/coursesInner/" + paths[paths.length - 1]:
            closeAll()
            setCourseActive(true)

            break;

         case "/dashboard":
            closeAll()
            setHomeActive(true)
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
         link: '/dashboard/finance',
         title: Language[lang].navigation.allPayments
      },
      {
         link: '/dashboard/financeCosts',
         title: Language[lang].navigation.costs
      },
      {
         link: '/dashboard/financeSalary',
         title: Language[lang].navigation.salaryForWork
      },
      {
         link: '/dashboard/financePaymentGroups',
         title: Language[lang].navigation.paymentGroups
      },
      {
         link: '/dashboard/financePayment',
         title: Language[lang].navigation.paymentCourses
      },
   ]
   const SettingLinks = [
      {
         link: '/dashboard/settingsRoadmap',
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
               link: '/dashboard/settingsEmployees',
               title: Language[lang].navigation.empoyee,
               icon: Icon2
            }, {
               link: '/dashboard/settingsEmployeesInner',
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
               link: '/dashboard/settingsMagazine',
               title: Language[lang].navigation.journals,
               icon: Icon4
            }, {
               link: '/dashboard/settingsArchive',
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
               link: `/dashboard/settingLead`,
               title: Language[lang].navigation.lidForm,
               icon: Icon6
            }, {
               link: '/dashboard/enterForm',
               title: Language[lang].navigation.enterForm,
               icon: Icon7

            }, {
               link: '/dashboard/settingsShapes',
               title: Language[lang].navigation.shapes,
               icon: Icon8
            }
         ],
         func: openShakl,
         setFunc: setOpenShakl
      },
      {
         link: '/dashboard/settingsCompany',
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
            <NavLink exact className="navbar_links-logo" to="/dashboard">
               <img src={Logo} className="defualt_logo" alt="img logo" />
               <img src={LogoTwo} className="active_logo" alt="" />
            </NavLink>

            <button
               className="izma__navbar--burger"
               onClick={() => setSidebarActive(!sidebarActive)}
            ><span></span></button>

         </div>

         <div className="navbar_wrapper-center">
            <div className="boxLinks">
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
                           setSidebarActive={setSidebarActive}
                        />
                     }
                  })
               }
               {
                  UserStatus === 1 ?
                     <NavbarLinkSet
                        icon={<Settings />}
                        title={Language[lang].navigation.settings}
                        isButton={true}
                        link={'/dashboard/settingsRoadmap'}
                        addClass={openSettings1}
                        link2={closeFinSet}
                        key={'set'}
                        clas={settingActive}
                     />
                     :
                     <></>
               }
            </div>



            <div className={`navbar-plus ${openMoliya || openSetting ? 'active' : ''}`}>
               <NavbarPlus
                  arr={MoliyaLinks}
                  arr2={SettingLinks}
                  openMoliya={openMoliya}
                  openSetting={openSetting}
                  setOpenMoliya={setOpenMoliya}
                  setOpenSetting={setOpenSetting}
                  setSidebarActive={setSidebarActive}
               />
            </div>
         </div>


      </div>

   )
}

export default Navbar