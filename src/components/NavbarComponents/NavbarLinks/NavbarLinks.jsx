import './NavbarLinks.scss'
import { NavLink } from 'react-router-dom'

const NavbarLinks = ({ icon, title, link, isButton, addClass, link2, clas }) => {

     
   return (
      <>
         {
            isButton ? (
               <NavLink onClick={addClass}  className={`navbar_links ${clas}`} to={link} activeClassName="active"
                  
               >

                  <div
                     className="open_navbar"
                     
                  >
                     <div className="link_img">{icon}</div>
                     <span className="link__text">{title}</span>
                  </div>

               </NavLink>
            ) : (
               <NavLink exact className="navbar_links" to={`${link}`} activeClassName="active"
                  onClick={link2}
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