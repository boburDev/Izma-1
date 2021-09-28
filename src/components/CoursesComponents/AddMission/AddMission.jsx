import './AddMission.scss'
import { useState } from 'react'
import DelBtn from '../../../assets/Icons/Group 26.svg'

const AddMission = () => {

   const [activeBlock, setActiveBlock] = useState('one')

   const [mission, setMission] = useState([
      {
         mission: ""
      },
   ])

   const [answer, setAnswer] = useState([
      { javob: "" },
      { javob: "" }
   ])

   const addBlocker = () => {
      setMission([...mission, { mission: "" }])
   }

   const addAnswer = () => {
      setAnswer([...answer, { javob: "" }])
   }

   const remBlocker = (index) => {
      const value = [...mission]
      if (value.length >= 1) {
         value.splice(index, 1)
      }
      setMission(value)
   }

   return (
      <div className="mission_wrapper">
         <div className="inner">
            {
               mission.map((item, index) => (
                  <>
                     <div className="mission_item" key={index}>
                        <div className="mission_top">
                           <div style={{ display: "flex", alignItems: "center" }}>
                              <span>{index + 1}</span>
                              <select name="" id=""
                                 onChange={e => setActiveBlock(e.target.value)}
                              >
                                 <option value="one"> Uzun javob</option>
                                 <option value="two">Qisqa Javob</option>
                                 <option value="thre">Bitta variant tanlash</option>
                                 <option value="four">Ochiladigan Ro'yxat</option>
                              </select>
                           </div>
                           <button
                              onClick={() => remBlocker(index)}
                           >
                              <img src={DelBtn} alt="" />
                           </button>
                        </div>
                        <div className="misson_middle">
                           {
                              activeBlock === 'one' ? <input type="text" defaultValue="Uzun Javob Kiriting" name="" id="" /> :
                                 activeBlock === 'two' ? <input type="text" defaultValue="Qisqa Javob Kiriting" name="" id="" /> :
                                    activeBlock === 'thre' ?

                                       <div>
                                          <input className="main_ans" type="text" defaultValue="Bitta variant tanlash" name="" id="" />

                                          <div className="answers">

                                             {
                                                answer.map((item, i) => (
                                                   <input key={i} className="answer" defaultValue="Javob 1" type="text" name="" id="" />
                                                ))
                                             }

                                          </div>

                                          <button
                                             onClick={addAnswer}
                                          >
                                             Javobni qo’shish
                                          </button>
                                       </div>
                                       :
                                       activeBlock === 'four' ?
                                          <div>
                                             <input className="main_ans" type="text" defaultValue="Ochiladigan ro’yxat" name="" id="" />

                                             <div className="answers">

                                                {
                                                   answer.map((item, i) => (
                                                      <input key={i} className="answer" defaultValue="Javob 1" type="text" name="" id="" />
                                                   ))
                                                }

                                             </div>

                                             <button
                                                onClick={addAnswer}
                                             >
                                                Javobni qo’shish
                                             </button>
                                          </div>
                                          : <h1>Not item selected</h1>
                           }
                        </div>
                        <div className="changes_blocks">

                        </div>
                        <div className="mission_bottom">
                           <input type="checkbox" name="" id="" />
                           <label htmlFor="">Shart</label>
                        </div>
                     </div>



                  </>


               ))
            }


         </div>
         <div className="add_blocker">
            <button className="add_newBlock"
               onClick={() => addBlocker()}
            >
               <span>Yangi blok qo'shing</span>
            </button>
         </div>
      </div>
   )
}


export default AddMission