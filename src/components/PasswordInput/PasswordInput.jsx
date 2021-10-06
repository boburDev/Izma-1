import { useState } from 'react'
import './PasswordInput.scss'
import Show from '../../assets/Icons/visibility.svg'
import DondShow from '../../assets/Icons/visib.svg'

const PasswordInput = ({ setPassword }) => {
   const [show, setShow] = useState(false)
   return (
      <div className="password">
         <input autoComplete="off"  className="inputPassword" type={show ? 'text' : 'password'} onKeyUp={(e) => setPassword(e.target.value)} />
         <span onClick={() => setShow(!show)}>
            {
               show ?
                  <img src={DondShow} alt="" />
                  :
                  <img src={Show} alt="" />
            }
         </span>
      </div>
   )
}

export default PasswordInput