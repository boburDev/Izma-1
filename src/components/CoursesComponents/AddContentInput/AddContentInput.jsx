import { useState } from "react"

import Images1 from '../../../assets/images1.png'
import Images2 from '../../../assets/images2.png'
import Images3 from '../../../assets/images3.png'
import Images4 from '../../../assets/images4.png'
import Images5 from '../../../assets/images5.png'
import Images6 from '../../../assets/images6.png'
import Images7 from '../../../assets/images7.png'
import Images8 from '../../../assets/images8.png'
import Images9 from '../../../assets/images9.png'
import Images10 from '../../../assets/images10.png'

import Plus from '../../../assets/Icons/plus.png'
import Grid from '../../../assets/Icons/grid.svg'



const AddContentIput = ({
   addActiveOne, addActiveTwo, addActiveThre, addActiveFour, addActiveFive, addActiveSix, addActiveSeven, changeBlock, addActiveEight, addActiveNine, adder1, adder2, adder3, adder4, adder5, adder6, adder7, adder8,

}) => {

   const [openList, setOpenList] = useState(false)

   const AddRem = () => {
      setOpenList(false)
   }

   return (
      <div className={`inner_field ${changeBlock ? 'active' : ''}`}>
         <div className="fieldForFeedLeft">
            <button className="plus"
               onClick={() => setOpenList(!openList)}
            >
               <img src={Plus} alt="" />
            </button>
            <div className={`open_plus ${openList ? 'active' : ' '}`}>
               <label className="btn btn_one" htmlFor="for" onClick={() => AddRem()}>
                  <img className="btn_img" src={Images1} alt="" />
               </label>
               <button className="btn btn_two"
                  onClick={addActiveOne}
               >
                  <img className="btn_img" src={Images2} alt="" onClick={adder1} />
               </button>
               <button className="btn btn_thre"
                  onClick={addActiveTwo}
               >
                  <img className="btn_img" src={Images3} alt="" onClick={adder2} />
               </button>
               <button className="btn btn_four"
                  onClick={addActiveThre}
               >
                  <img style={{ width: '20px' }} className="btn_img" src={Images4} alt="" onClick={adder3} />
               </button>
               <button className="btn btn_five"
                  onClick={addActiveNine}
               >
                  <img className="btn_img" src={Images5} alt="" onClick={adder4} />
               </button>
               <button className="btn btn_six"
                  onClick={addActiveFour}
               >
                  <img className="btn_img" src={Images6} alt="" onClick={adder5} />
               </button>
               <button className="btn btn_seven"
                  onClick={addActiveFive}
               >
                  <img className="btn_img" src={Images7} alt="" onClick={adder6} />
               </button>
               <button className="btn btn_ten"
                  onClick={addActiveSix}
               >
                  <img className="btn_img transform" src={Images10} alt="" onClick={adder7} />
                  <img className="btn_img " src={Images10} alt="" onClick={adder7} />
               </button>
               <button className="btn btn_eight"
                  onClick={addActiveSeven}
               >
                  <img className="btn_img" src={Images8} alt="" onClick={adder8} />
               </button>
               <button className="btn btn_nine"
                  onClick={addActiveEight}
               >
                  <img className="btn_img line" src={Images9} alt="" />
                  <img className="btn_img line" src={Images9} alt="" />
               </button>
            </div>
         </div>

         <input type="text" name="" placeholder="Dars mazmunini qo’shing" id="for" />
         <button className="grid"><img src={Grid} alt="" /></button>


      </div>
   )
}

export default AddContentIput