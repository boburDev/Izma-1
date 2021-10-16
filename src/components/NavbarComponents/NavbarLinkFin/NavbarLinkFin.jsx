import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { useNavbar } from '../../../context/NavbarProvider'

const NavbarLinkSet = ({ icon, title, link, isButton, addClass, link2, clas}) => {
   const { location } = useHistory()
   const [setNavbarP] = useNavbar(true)
   const [links, setLinks] = useState(link)
   useEffect(() => {
      switch (location.pathname) {
         case "/settingsEmployeesInner":
            setLinks('/settingsEmployeesInner')
            break;
         case "/settingsRoadmap":
            setLinks('/settingsRoadmap')
            break;
         case "/settingsEmployees":
            setLinks('/settingsEmployees')
            break;
         case "/settingsMagazine":
            setLinks('/settingsMagazine')
            break;
         case "/settingsArchive":
            setLinks('/settingsArchive')
            break;
         case "/settingsLidform":
            setLinks('/settingsLidform')
            break;
         case "/settingsEnter":
            setLinks('/settingsEnter')
            break;
         case "/settingsShapes":
            setLinks('/settingsShapes')
            break;
         case "/settingsCompany":
            setLinks('/settingsCompany')
            break;

         case "/":

            break;

         default:
            
            break;
      }
   }, [location.pathname]);
   return(
      <NavLink onClick={() => {
         addClass()
         setNavbarP(title)
      }} className={`navbar_links ${clas ? 'active' : ''}`} to={links}
      >

         <div
            className="open_navbar"

         >
            <div className="link_img">{icon}</div>
            <span className="link__text">{title}</span>
         </div>

      </NavLink>
   )
}

export default NavbarLinkSet