import './Decleminer.scss'
import { useState } from 'react'
import Images11 from '../../../assets/images11.png'
import Close from '../../../assets/Icons/Group 26.svg'

import {
   Heading,
   Warning,
   Code,
   HtmlCode,
   Quote,
   Cheklist,
   List,
   Table
} from '../ChangeContents/ChangeContents'

import AddContentIput from '../AddContentInput/AddContentInput'


const Decleminer = ({ remActiveEight }) => {

   const [activeOne, setActiveOne] = useState({
      active1: false,
      active2: false,
      active3: false,
      active4: false,
      active5: false,
      active6: false,
      active7: false,
      active8: false,
   })

   const adder1 = () => {
      setActiveOne({ ...activeOne, active1: true })
   }
   const remover1 = () => {
      setActiveOne({ ...activeOne, active1: false })
   }

   const adder2 = () => {
      setActiveOne({ ...activeOne, active2: true })
   }
   const remover2 = () => {
      setActiveOne({ ...activeOne, active2: false })
   }

   const adder3 = () => {
      setActiveOne({ ...activeOne, active3: true })
   }
   const remover3 = () => {
      setActiveOne({ ...activeOne, active3: false })
   }

   const adder4 = () => {
      setActiveOne({ ...activeOne, active4: true })
   }
   const remover4 = () => {
      setActiveOne({ ...activeOne, active4: false })
   }

   const adder5 = () => {
      setActiveOne({ ...activeOne, active5: true })
   }
   const remover5 = () => {
      setActiveOne({ ...activeOne, active5: false })
   }

   const adder6 = () => {
      setActiveOne({ ...activeOne, active6: true })
   }
   const remover6 = () => {
      setActiveOne({ ...activeOne, active6: false })
   }

   const adder7 = () => {
      setActiveOne({ ...activeOne, active7: true })
   }
   const remover7 = () => {
      setActiveOne({ ...activeOne, active7: false })
   }

   const adder8 = () => {
      setActiveOne({ ...activeOne, active8: true })
   }
   const remover8 = () => {
      setActiveOne({ ...activeOne, active8: false })
   }

   return (
      <div className="Decleminer">
         <div className="inner_decleminer">
            <div className="stars">
               <h1>* * *</h1>
            </div>

            <div className="main_block">
               <div className="changer_inputs">
                  <AddContentIput
                     adder1={adder1}
                     adder2={adder2}
                     adder3={adder3}
                     adder4={adder4}
                     adder5={adder5}
                     adder6={adder6}
                     adder7={adder7}
                     adder8={adder8}
                  />
               </div>
               <div className="contents">
                  <div className={`contents_block ${activeOne.active1 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <Heading
                           remover1={remover1}
                        />
                     </div>
                  </div>
                  <div className={`contents_block ${activeOne.active2 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <List
                           remover2={remover2}
                        />
                     </div>
                  </div>
                  <div className={`contents_block ${activeOne.active3 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <Code
                           remover3={remover3}
                        />
                     </div>
                  </div>
                  <div className={`contents_block ${activeOne.active8 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <Table
                           remover8={remover8}
                        />
                     </div>
                  </div>
                  <div className={`contents_block ${activeOne.active4 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <Cheklist
                           remover4={remover4}
                        />
                     </div>
                  </div>
                  <div className={`contents_block ${activeOne.active5 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <Warning
                           remover5={remover5}
                        />
                     </div>
                  </div>
                  <div className={`contents_block ${activeOne.active6 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <HtmlCode
                           remover6={remover6}
                        />
                     </div>
                  </div>
                  <div className={`contents_block ${activeOne.active7 ? 'active' : ''}`}>
                     <div className="stars">
                        <h1>* * *</h1>
                     </div>
                     <div className="blocks">
                        <Quote
                           remover7={remover7}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading"
               onClick={() => remActiveEight()}
            >
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}

export default Decleminer