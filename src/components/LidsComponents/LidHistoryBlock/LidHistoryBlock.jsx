import { useState } from 'react'
import './LidHistoryBlock.scss'

const LidHistoryBlock = () => {

   const [show, setShow] = useState(false)
   return (
      <div className="historyBlock">
         <div className="historyBlock-header" onClick={() => setShow(!show)}>
            <span>23495</span>
            <h4>06.08.2021 12:08</h4>
         </div>

         <div className={`historyBlock-center ${show ? 'active' : ''}`}>
            <h4><span>Harakat: </span> Yaratish</h4>
            <h4><span>Ism va familiya: </span> Instagram</h4>
            <h4><span>Holat: </span> leads</h4>
         </div>
      </div>
   )
}

export default LidHistoryBlock
