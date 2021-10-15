import './RoomsTableWrapper.scss'
import { useState } from 'react'
import RoomsTable from '../RoomsTable/RoomsTable'
import Language from '../../../../lang/index'
import { useLang } from '../../../../context/LanguageProvider'

const RoomsTableWrapper = () => {
   const [lang] = useLang()

   const [days, setDays] = useState('1')



   return (
      <div className="table_wrapper">
         <div className="table-heading">
            <div className="table_name">
               <h1>{Language[lang].home.tabels.title}</h1>
            </div>

            <div className="table_navbar">
               <div className="inner-navbar">

                  <button className={`${days === '1' ? 'active' : ''}`} 
                  onClick={() => setDays('1')}>{Language[lang].home.graph2.days[0]}</button>
                  
                  <button className={`${days === '2' ? 'active' : ''}`} onClick={() => setDays('2')}>{Language[lang].home.graph2.days[1]}</button>

                  <button
                     className={`${days === '3' ? 'active' : ''}`} 
                     onClick={() => setDays('3')}>{Language[lang].home.graph2.days[2]}</button>
                  <button
                     className={`${days === '4' ? 'active' : ''}`}
                     onClick={() => setDays('4')}
                  >{Language[lang].home.graph2.days[3]}</button>
                  <button className={`${days === '5' ? 'active' : ''}`} onClick={() => setDays('5')}>{Language[lang].home.graph2.days[4]}</button>
                  <button className={`${days === '6' ? 'active' : ''}`} onClick={() => setDays('6')}>{Language[lang].home.graph2.days[5]}</button>
                  <button className={`${days === '7' ? 'active' : ''}`} onClick={() => setDays('7')}>{Language[lang].home.graph2.days[6]}</button>
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