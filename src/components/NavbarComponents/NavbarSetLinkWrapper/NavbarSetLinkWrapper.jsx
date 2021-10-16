import './NavbarSetLinkWrapper.scss'
import Icon from '../../../assets/Icons/arrow_im.svg'
import NavbarSettingLink from '../NavbarSettingLink/NavbarSettingLink'

const NavberSetLinkWrapper = ({ icon, setClose, title, links, link, func, setFunc, isBox, setSidebarActive }) => {
   return (
      <>
         {
            isBox ? (
               <div className="set_two mb_5">
                  <div className="head_open"
                     onClick={() => setFunc(!func)}
                  >
                     <img src={Icon} alt="" className="arr_icon" />

                     <span className="radio_one">{title}</span>
                  </div>

                  <div className={`opened_head ${func ? 'active' : ''}`}>
                     {
                        links.map((el, index) => (
                           <div className="radio_btns" key={index}>
                              <NavbarSettingLink
                                 icon={el.icon}
                                 title={el.title}
                                 link={el.link}
                                 setClose={setClose}
                                 key={index}
                                 setSidebarActive={setSidebarActive}
                              />
                           </div>
                        ))
                     }
                  </div>
               </div>
            ) : (
               <div className="set_one mb_5">
                     <NavbarSettingLink
                     icon={icon}
                     title={title}
                     link={link}
                     setClose={setClose}
                        setSidebarActive={setSidebarActive}
                     
                  />
               </div>
            )
         }
      </>
   )

}


export default NavberSetLinkWrapper