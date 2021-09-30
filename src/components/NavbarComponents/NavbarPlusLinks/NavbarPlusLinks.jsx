import './NavbarPlusLinks.scss'
import NavbarMoliyaLink from '../NavbarMoliyaLink/NavbarMoliyaLink'
import NavberSetLinkWrapper from '../NavbarSetLinkWrapper/NavbarSetLinkWrapper'

const NavabarPlusLinks = ({ 
   isMoliya, 
   icon, 
   title, 
   link, 
   isBox, 
   links, 
   func, 
   setFunc,
   setOpenMoliya,
   setOpenSetting
}) => {
   return (
      <>
         {
            isMoliya ? (
               <NavbarMoliyaLink
                  link={link}
                  title={title}
                  setClose={setOpenMoliya}
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
                     setClose={setOpenSetting}
               /> 
            )
         }
      </>
   )
}

export default NavabarPlusLinks