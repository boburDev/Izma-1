import {  NavLink } from "react-router-dom"
import './NavbarMoliyaLink.scss'

const NavbarMoliyaLink = ({link, title, setClose}) => {

   return(
      <NavLink 
      onClick={() => setClose(false)}
      to={link} className="moliya_link" activeClassName="active">{title}</NavLink>
   )
}

export default NavbarMoliyaLink
