import NotificationImg from "../../assets/notification.svg";
import './Header.scss'
import Close from '../../assets/Icons/close.svg'
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Language from '../../lang/index'
import { useLang } from "../../context/LanguageProvider";
import Img from '../../assets/img.png'
import { useNavbar } from "../../context/NavbarProvider";

const Header = ({ sidebarActive, setSidebarActive, setToken}) => {
	const [active, setActive] = useState()
	const [activeLang, setActiveLang] = useState(1)
	const [lang,setLang] = useLang()
   const [navbarP] = useNavbar()
   // console.log(navbarP || 'heardaki value keladi')

   function useOutsideAlerter(ref) {
      useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        function handleClickOutside(event) {
          if (ref.current && !ref.current.contains(event.target)) {
            setActive(false)
          }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
          // Unbind the event listener on clean up
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [ref]);
    }
   
   
   
   const wrapperRef = useRef(null);
   useOutsideAlerter(wrapperRef);
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
               <div className="accauntHeader">
                  <button className="izma__header-img" onClick={() => {
                     setActive(!active)
                  }}>
                     <img
                        src={Img} alt="img" />
                  </button>
                  {/* <h3>Asadulloh</h3> */}
               </div>

               <div className={`izma__header-dropdown ${active ? 'active' : ''}`} ref={wrapperRef}>
				<div className="top_items">
						<div className="lang">
							<button onClick={() => {
								setLang('en')
								setActiveLang(1)
							}}
							className={`${activeLang === 'en' && 'active'}`}><b>{
								Language[lang].authentication.lang.en
								}</b></button>

							<button onClick={() => {
								setLang('ru')
								setActiveLang(2)
							}}
							className={`${activeLang === 'ru' && 'active'} center_btn`}><b>{
								Language[lang].authentication.lang.ru
								}</b></button>

							<button onClick={() => {
								setLang('uz')
								setActiveLang(3)
							}}
							className={`${activeLang === 'uz' && 'active'}`}><b>{
								Language[lang].authentication.lang.uz
								}</b></button>
						</div>
					</div>
                     <Link
                     onClick={()=> setActive(false)}
                     to={`/dashboard`}>{Language[lang].home.blocks.accountInfo}</Link>
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