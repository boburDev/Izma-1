import NotificationImg from "../../assets/notification.svg";
import HeaderImg from '../../assets/header-img.svg'
import './Header.scss'
import Close from '../../assets/Icons/close.svg'

const Header = ({ sidebarActive, setSidebarActive, setToken}) => {
   return (
      <>
         <header className="izma__header">
            <button
            className="izma__header-burger"
               onClick={() => setSidebarActive(!sidebarActive)}
            ><img src={Close} alt="" /></button>
            <input className="izma__header-input" type="text" placeholder='Search' />

            <div className="izma__header-left-wrapper">
               <img src={NotificationImg} className="izma__header-notification-img" alt="img" />
               <img onClick={() => {
                  localStorage.removeItem('token')
                  const x = localStorage.getItem('hashtag')
                  window.location.href = '/login/' + x
                  setToken('')
               }}
                  src={HeaderImg} alt="img" className="izma__header-img" />
            </div>
         </header>
      </>
   )
}

export default Header