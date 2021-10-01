import './RoomsTableWrapper.scss'
import { useState } from 'react'
import RoomsTable from '../RoomsTable/RoomsTable'

const RoomsTableWrapper = () => {

   const [days, setDays] = useState('1')

   console.log(days)

   return (
      <div className="table_wrapper">
         <div className="table-heading">
            <div className="table_name">
               <h1>Jadval</h1>
            </div>

            <div className="table_navbar">
               <div className="inner-navbar">

                  <button className={`${days === '1' ? 'active' : ''}`} 
                  onClick={() => setDays('1')}>Dushanba</button>
                  
                  <button className={`${days === '2' ? 'active' : ''}`} onClick={() => setDays('2')}>Seshanba</button>

                  <button
                     className={`${days === '3' ? 'active' : ''}`} 
                     onClick={() => setDays('3')}>Chorchanba</button>
                  <button
                     className={`${days === '4' ? 'active' : ''}`}
                     onClick={() => setDays('4')}
                  >Payshanba</button>
                  <button className={`${days === '5' ? 'active' : ''}`} onClick={() => setDays('5')}>Juma</button>
                  <button className={`${days === '6' ? 'active' : ''}`} onClick={() => setDays('6')}>Shanba</button>
                  <button className={`${days === '7' ? 'active' : ''}`} onClick={() => setDays('7')}>Yakshanba</button>
               </div>
            </div>
         </div>
         <div className="change-contents">

            <RoomsTable days={days} />



         </div>
      </div>
   )
}

export default RoomsTableWrapper