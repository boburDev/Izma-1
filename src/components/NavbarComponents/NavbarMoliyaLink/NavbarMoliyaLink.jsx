import {  NavLink } from "react-router-dom"
import './NavbarMoliyaLink.scss'

const NavbarMoliyaLink = ({link, title}) => {

   return(
      <NavLink to={link} className="moliya_link" activeClassName="active">{title}</NavLink>
   )
}

export default NavbarMoliyaLink
