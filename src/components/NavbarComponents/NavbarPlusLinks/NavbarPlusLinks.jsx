import './NavbarPlusLinks.scss'
import NavbarMoliyaLink from '../NavbarMoliyaLink/NavbarMoliyaLink'
import NavberSetLinkWrapper from '../NavbarSetLinkWrapper/NavbarSetLinkWrapper'

const NavabarPlusLinks = ({ isMoliya, icon, title, link, isBox, links, func, setFunc }) => {
   return (
      <>
         {
            isMoliya ? (
               <NavbarMoliyaLink
                  link={link}
                  title={title}
               />
            ) : (
                  <NavberSetLinkWrapper
                  isBox={isBox}
                  title={title}
                  links={links}
                  icon={icon}
                  link={link}
                  func={func}
                  setFunc={setFunc}
               /> 
            )
         }
      </>
   )
}

export default NavabarPlusLinks