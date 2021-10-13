import { NavLink } from "react-router-dom";
import './NavbarSettingLink.scss'

const NavbarSettingLink = ({icon, link, title, setClose}) => {
   return(
      <NavLink 
      activeClassName="active"
         onClick={() => setClose(false)}
       className="setting_path alone" to={link}>
         <img src={icon} alt="" />
         <span className="radio_one">{title}</span>
      </NavLink>
   )
}

export default NavbarSettingLink