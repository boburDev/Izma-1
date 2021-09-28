import './HomeAcordion.scss'
import IconArrow from '../../../assets/Icons/arrow_im.svg'
import { useState } from 'react'

const HomeAcordion = ({title, text, date}) => {
   const [active, setActive] = useState(false)
   return(
      <div className="accordion-item">
         <div className="accordion-item-header"
            onClick={() => setActive(!active)}
         >
            <h3><span className="title">{title}</span> <span className="date">{date}</span></h3>
            <img src={IconArrow} alt="" className={`${active ? 'active' : ''}`}/>
         </div>
         <div className={`accordion__content ${active ? 'active' : ''}`}>
            <p className="accordion__body">{text}</p>
         </div>
      </div>
   )
}

export default HomeAcordion