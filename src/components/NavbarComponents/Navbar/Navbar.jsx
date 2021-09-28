import { NavLink } from 'react-router-dom'
import { useState } from 'react'
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


const Navbar = ({ sidebarActive }) => {
   const [dragActive, setDragActive] = useState()
   const [settingActive, setSettingActive] = useState(false)
   const [openMoliya, setOpenMoliya] = useState(false)
   const [openSetting, setOpenSetting] = useState(false)
   const [openOfis, setOpenOfis] = useState(false)
   const [openJurnal, setOpenJurnal] = useState(false)
   const [openShakl, setOpenShakl] = useState(false)

   const openFinance1 = () => {
      setOpenMoliya(!openMoliya)
      setOpenSetting(false)
   }

   const openSettings1 = () => {
      setOpenMoliya(false)
      setOpenSetting(!openSetting)
   }

   const closeFinSet = () => {
      setOpenMoliya(false)
      setOpenSetting(false)
   }
   const links = [
      {
         title: 'Home',
         icon: <Home />,
         link: '/',
         isButton: false

      },
      {
         title: 'Lidlar',
         icon: <Lidrlar />,
         link: '/lidlar',
         isButton: false
      },
      {
         title: 'Talabalar',
         icon: <Talabalar />,
         link: '/students',
         isButton: false
      },
      {
         title: 'O’qituvchilar',
         icon: <Teacher />,
         link: '/teachers',
         isButton: false
      },
      {
         title: 'Guruhlar',
         icon: <Guruhlar />,
         link: '/groups',
         isButton: false
      },
      {
         title: 'Kurslar',
         icon: <Kurslar />,
         link: '/courses',
         isButton: false
      },
      {
         title: 'Moliya',
         icon: <Moliya />,
         link: '/finance',
         isButton: true,
         addClass: openFinance1,
         clas: dragActive
      },
      {
         title: 'Sozlamalar',
         icon: <Settings />,
         link: '/settingsRoadmap',
         isButton: true,
         addClass: openSettings1,
         clas: settingActive
      }
   ]

   const { location } = useHistory()

   useEffect(() => {
      switch (location.pathname) {
         case "/settingsEmployeesInner":
            setSettingActive(true)

            break;
         case "/financeCosts":
            setDragActive(true)
            break;
         case "/financeSalary":
            setDragActive(true)
            break;
         case "/financePaymentGroups":
            setDragActive(true)
            break;
         case "/financePayment":
            setDragActive(true)
            break;
         case "/settingsRoadmap":
            setSettingActive(true)
            break;
         case "/settingsEmployees":
            setSettingActive(true)
            break;
         case "/settingsMagazine":
            setSettingActive(true)
            break;
         case "/settingsArchive":
            setSettingActive(true)
            break;
         case "/settingsLidform":
            setSettingActive(true)
            break;
         case "/settingsEnter":
            setSettingActive(true)
            break;
         case "/settingsShapes":
            setSettingActive(true)
            break;
         case "/settingsCompany":
            setSettingActive(true)
            break;

         case "/": ;
            break;

         default: ;
            break;
      }
   }, [location.pathname]);

   const MoliyaLinks = [
      {
         link: '/finance',
         title: 'Barcha to’lovlar'
      },
      {
         link: '/financeCosts',
         title: 'Xarajatlar'
      },
      {
         link: '/financeSalary',
         title: 'Ish haqqi'
      },
      {
         link: '/financePaymentGroups',
         title: 'To’lovlar guruhi'
      },
      {
         link: '/financePayment',
         title: 'Kurs to’lovlari'
      },
   ]
   const SettingLinks = [
      {
         link: '/settingsRoadmap',
         title: 'Roadmap',
         icon: Icon1,
         isBox: false,
         links: [],
         func: '',
         setFunc: ''

      },
      {
         link: '',
         title: 'Ofis',
         icon: Icon,
         isBox: true,
         links: [
            {
               link: '/settingsEmployees',
               title: 'Hodimlar',
               icon: Icon2
            }, {
               link: '/settingsEmployeesInner',
               title: 'Xonalar',
               icon: Icon3
            }
         ],
         func: openOfis,
         setFunc: setOpenOfis
      },
      {
         link: '',
         title: 'Qolganlari',
         icon: Icon,
         isBox: true,
         links: [
            {
               link: '/settingsMagazine',
               title: 'Jurnallar',
               icon: Icon4
            }, {
               link: '/settingsArchive',
               title: 'Arxiv',
               icon: Icon5
            }
         ],
         func: openJurnal,
         setFunc: setOpenJurnal
      },
      {
         link: '',
         title: 'Shakillar',
         icon: Icon,
         isBox: true,
         links: [
            {
               link: '/settingsLidform',
               title: 'Lid forma',
               icon: Icon6
            }, {
               link: '/enterForm',
               title: 'Kirish forma',
               icon: Icon7
            
            }, {
               link: '/settingsShapes',
               title: 'Shakillar',
               icon: Icon8
            }
         ],
         func: openShakl,
         setFunc: setOpenShakl
      },
      {
         link: '/settingsCompany',
         title: '',
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
                     />
                  }
               })
            }

            

            <div className={`navbar-plus ${openMoliya || openSetting ? 'active' : ''}`}>
               <NavbarPlus
                  arr={MoliyaLinks}
                  arr2={SettingLinks}
                  openMoliya={openMoliya}
                  openSetting={openSetting}
               />
            </div>
         </div>


      </div>

   )
}

export default Navbar