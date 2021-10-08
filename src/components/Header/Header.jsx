import NotificationImg from "../../assets/notification.svg";
import HeaderImg from '../../assets/header-img.svg'
import './Header.scss'
import Close from '../../assets/Icons/close.svg'
import { Link } from "react-router-dom";
import { useState } from "react";
import Language from '../../lang/index'
import { useLang } from "../../context/LanguageProvider";

const Header = ({ sidebarActive, setSidebarActive, setToken}) => {
   const [active, setActive] = useState()
   const [lang] = useLang()
   return (
      <>
         <header className="izma__header">
            <button
            className="izma__header-burger"
               onClick={() => setSidebarActive(!sidebarActive)}
            ><img src={Close} alt="" /></button>
            <input autoComplete="off"  className="izma__header-input" type="text" placeholder={Language[lang].groups.groupInfo.search} />

            <div className="izma__header-left-wrapper">
               <img src={NotificationImg} className="izma__header-notification-img" alt="img" />
               <img onClick={() => {
                  setActive(!active)
               }}
                  src={HeaderImg} alt="img" className="izma__header-img" />

               <div className={`izma__header-dropdown ${active ? 'active' : ''}`}>
                     <Link
                     onClick={()=> setActive(false)}
                     to={`/`}>{Language[lang].home.blocks.accountInfo}</Link>
                     <span
                        onClick={() => {
                        localStorage.removeItem('token')
                        const x = localStorage.getItem('hashtag')
                        window.location.href = '/login/' + x
                        setToken('')
                        }}
                    >{Language[lang].home.blocks.exit}</span>
                  </div>
            </div>
         </header>
      </>
   )
}

export default Header