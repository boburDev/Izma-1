import './HomeCard.scss'
import { Link } from 'react-router-dom'
import {
   useNavbar
} from '../../../context/NavbarProvider'

const HomeCard = ({icon, title, number, link}) => {
   const [setNavbarP] = useNavbar(true)
   return(
      <Link className='izma__home-card-link' to={link} onClick={() => {
         setNavbarP(link)
      }}>
         <img src={icon} alt="card img" className="izma__home-card-wrapper-img" />
         <div className="izma__home-card-wrapper-title-wrapper">
            <h5 className="izma__home-card-wrapper-title">
               {title}
            </h5>
            <p className="izma__home-card-wrapper-text">
               {number}
            </p>
         </div>
      </Link>
   )
}

export default HomeCard