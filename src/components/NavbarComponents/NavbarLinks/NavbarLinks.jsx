import './NavbarLinks.scss'
import { NavLink } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useState, useEffect } from 'react'

const NavbarLinks = ({ icon, title, link, isButton, addClass, link2, clas, quitButton, nav }) => {
   const [links, setLinks] = useState(link)
   const { location } = useHistory()
   useEffect(() => {
      switch (location.pathname) {
         case "/finance":
            setLinks('/finance')
            break;
         case "/financeCosts":
            setLinks('/financeCosts')
            break;
         case "/financeSalary":
            setLinks('/financeSalary')
            break;
         case "/financePaymentGroups":
            setLinks('/financePaymentGroups')
            break;
         case "/financePayment":
            setLinks('/financePayment')
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
               <NavLink onClick={addClass}  className={`navbar_links ${clas ? 'active' : ''}`} to={links} 
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