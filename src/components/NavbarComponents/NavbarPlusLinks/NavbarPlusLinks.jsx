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
   setOpenSetting,
   setSidebarActive
}) => {
   return (
      <>
         {
            isMoliya ? (
               <NavbarMoliyaLink
                  link={link}
                  title={title}
                  setClose={setOpenMoliya}
                  setSidebarActive={setSidebarActive}
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
                     setSidebarActive={setSidebarActive}
               /> 
            )
         }
      </>
   )
}

export default NavabarPlusLinks