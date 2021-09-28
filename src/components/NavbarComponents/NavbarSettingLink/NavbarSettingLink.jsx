import { Link } from "react-router-dom";
import './NavbarSettingLink.scss'

const NavbarSettingLink = ({icon, link, title}) => {
   return(
      <Link className="setting_path alone" to={link}>
         <img src={icon} alt="" />
         <span className="radio_one">{title}</span>
      </Link>
   )
}

export default NavbarSettingLink