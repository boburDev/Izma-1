import './NavbarLinks.scss'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'
import { useNavbar } from '../../../context/NavbarProvider'

const NavbarLinks = ({ icon, title, link, isButton, addClass, link2, clas, quitButton, nav }) => {
   const [setNavbarP] = useNavbar(true)
   const [links, setLinks] = useState(link)
   const { location } = useHistory()
   useEffect(() => {
      switch (location.pathname) {
         case "/dashboard/finance":
            setLinks('/dashboard/finance')
            break;
         case "/dashboard/financeCosts":
            setLinks('/dashboard/financeCosts')
            break;
         case "/dashboard/financeSalary":
            setLinks('/dashboard/financeSalary')
            break;
         case "/dashboard/financePaymentGroups":
            setLinks('/dashboard/financePaymentGroups')
            break;
         case "/dashboard/financePayment":
            setLinks('/dashboard/financePayment')
            break;

         case "/":

            break;

         default:
            
            break;
      }
   }, [location.pathname]);





   return (
      <>
         {
            isButton ? (
               <NavLink onClick={addClass}   className={`navbar_links ${clas ? 'active' : ''}`} to={links} 
               >

                  <div
                     className="open_navbar"
                     
                  >
                     <div className="link_img">{icon}</div>
                     <span className="link__text">{title}</span>
                  </div>

               </NavLink>
            ) : (
               <NavLink exact className={`navbar_links ${nav ? 'active' : ''}`} to={`${link}`} activeClassName="active"
                     onClick={() => {
                        setNavbarP(title)
                        quitButton()
                        link2()
                     }}
               >
                  <div className="open_navbar ">
                     <div className="link_img">{icon}</div>
                     <span className="link__text" >{title}</span>
                  </div >
               </NavLink >
            )
         }
      </>
   )
}

export default NavbarLinks