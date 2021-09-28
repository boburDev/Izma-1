import './RoomsTableWrapper.scss'
import { useState } from 'react'
// import {
// 	OtherDays,
// 	Holidays,
// 	EveryDays,
// 	JuftKun
// }from '../allDays/index'
import RoomsTable from '../RoomsTable/RoomsTable'

const RoomsTableWrapper = () => {

   const [days, setDays] = useState('even')

   console.log(days)

   return (
      <div className="table_wrapper">
         <div className="table-heading">
            <div className="table_name">
               <h1>Jadval</h1>
            </div>

            <div className="table_navbar">
               <div className="inner-navbar">
                  <button className={`${days === 'odd' ? 'active' : ''}`}
                     onClick={() => setDays('odd')}
                  >Toq kunlar</button>
                  <button
                     className={`${days === 'even' ? 'active' : ''}`}
                     onClick={() => setDays('even')}
                  >Juft kunlar</button>
                  <button
                     className={`${days === 'sun' ? 'active' : ''}`}
                     onClick={() => setDays('sun')}
                  >Dam olish kunlar</button>
                  <button
                     className={`${days === 'all' ? 'active' : ''}`}
                     onClick={() => setDays('all')}
                  >Har Kuni</button>
                  <button
                     className={`${days === 'esle' ? 'active' : ''}`}
                     onClick={() => setDays('esle')}
                  >Boshqa</button>
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