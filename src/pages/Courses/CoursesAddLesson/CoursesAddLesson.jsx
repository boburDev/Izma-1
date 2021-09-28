import './CoursesAddLesson.scss'

import AddMission from '../../../components/CoursesComponents/AddMission/AddMission'
import { useState } from 'react'

import AddContentIput from '../../../components/CoursesComponents/AddContentInput/AddContentInput'
import Decleminer from '../../../components/CoursesComponents/Decleminer/Decleminer'


import {
   Heading,
   Warning,
   Code,
   HtmlCode,
   Quote,
   Cheklist,
   List,
   Table
} from '../../../components/CoursesComponents/ChangeContents/ChangeContents'

const CoursesAddLesson = () => {

   const [addRem, setAddRem] = useState(false)



   const [changeBlock, setChangeBlock] = useState({
      heading: false,
      list: false,
      code: false,
      table: false,
      cheklist: false,
      warning: false,
      htmlCode: false,
      quote: false,
      inner: true,
      decleminer: false,
   })


   const addActiveOne = () => {
      setChangeBlock({ ...changeBlock, heading: true, inner: false })
   }
   const remActiveOne = () => {
      setChangeBlock({ ...changeBlock, heading: false, inner: true })
   }

   const addActiveTwo = () => {
      setChangeBlock({ ...changeBlock, inner: false, list: true })
   }
   const remActiveTwo = () => {
      setChangeBlock({ ...changeBlock, inner: true, list: false })
   }

   const addActiveThre = () => {
      setChangeBlock({ ...changeBlock, inner: false, code: true })
   }
   const remActiveThre = () => {
      setChangeBlock({ ...changeBlock, inner: true, code: false })
   }

   const addActiveFour = () => {
      setChangeBlock({ ...changeBlock, inner: false, cheklist: true })
   }
   const remActiveFour = () => {
      setChangeBlock({ ...changeBlock, inner: true, cheklist: false })
   }

   const addActiveFive = () => {
      setChangeBlock({ ...changeBlock, inner: false, warning: true })
   }
   const remActiveFive = () => {
      setChangeBlock({ ...changeBlock, inner: true, warning: false })
   }

   const addActiveSix = () => {
      setChangeBlock({ ...changeBlock, inner: false, htmlCode: true })
   }
   const remActiveSix = () => {
      setChangeBlock({ ...changeBlock, inner: true, htmlCode: false })
   }

   const addActiveSeven = () => {
      setChangeBlock({ ...changeBlock, inner: false, quote: true })
   }
   const remActiveSeven = () => {
      setChangeBlock({ ...changeBlock, inner: true, quote: false })
   }

   const addActiveEight = () => {
      setChangeBlock({ ...changeBlock, inner: false, decleminer: true })
   }
   const remActiveEight = () => {
      setChangeBlock({ ...changeBlock, inner: true, decleminer: false })
   }

   const addActiveNine = () => {
      setChangeBlock({ ...changeBlock, inner: false, table: true })
   }
   const remActiveNime = () => {
      setChangeBlock({ ...changeBlock, inner: true, table: false })
   }





   return (
      <div className="addFeadback">
         <div className="heading">
            <input type="text" placeholder="Sarlavhani shu yerga kiriting" name="" id="" />
            <button className="save_btn">Saqlash</button>
         </div>

         <div className="fieldForFead">
            <AddContentIput
               addActiveOne={addActiveOne}
               addActiveTwo={addActiveTwo}
               addActiveThre={addActiveThre}
               addActiveFour={addActiveFour}
               addActiveFive={addActiveFive}
               addActiveSix={addActiveSix}
               addActiveSeven={addActiveSeven}
               changeBlock={changeBlock.inner}
               addActiveEight={addActiveEight}
               addActiveNine={addActiveNine}

            />
            <div className="change_contents">
               <div className={`change_heading ${changeBlock.heading ? 'active' : ''}`}>
                  <Heading
                     remActiveOne={remActiveOne}
                  />
               </div>
               <div className={`change_warnin ${changeBlock.warning ? 'active' : ''}`}>
                  <Warning remActiveFive={remActiveFive} />
               </div>
               <div className={`change_code ${changeBlock.code ? 'active' : ''}`}>
                  <Code remActiveThre={remActiveThre} />
               </div>
               <div className={`change_ht ${changeBlock.htmlCode ? 'active' : ''}`}>
                  <HtmlCode remActiveSix={remActiveSix} />
               </div>
               <div className={`change_quote ${changeBlock.quote ? 'active' : ''}`}>
                  <Quote remActiveSeven={remActiveSeven} />
               </div>
               <div className={`change_cheklist ${changeBlock.cheklist ? 'active' : ''}`}>
                  <Cheklist remActiveFour={remActiveFour} />
               </div>
               <div className={`change_list ${changeBlock.list ? 'active' : ''}`}>
                  <List
                     remActiveTwo={remActiveTwo}
                  />
               </div>
               <div className={`change_decleminer ${changeBlock.decleminer ? 'active' : ''}`}>
                  <Decleminer
                     remActiveEight={remActiveEight}
                     addActiveOne={addActiveOne}
                     addActiveTwo={addActiveTwo}
                     addActiveThre={addActiveThre}
                     addActiveFour={addActiveFour}
                     addActiveFive={addActiveFive}
                     addActiveSix={addActiveSix}
                     addActiveSeven={addActiveSeven}
                     addActiveEight={addActiveEight}
                  />
               </div>

               <div className={`change_decleminer ${changeBlock.table ? 'active' : ''}`}>
                  <Table
                     remActiveNime={remActiveNime}
                  />
               </div>
            </div>
         </div>

         <div className={`addMission ${addRem ? 'active' : ' '}`}>
            <button className="add_newBlock"
               onClick={() => setAddRem(!addRem)}
            >
               Yangi blok qo'shing
            </button>
         </div>

         <div className={`missions_block ${addRem ? 'active' : ' '}`}>
            <h1>Topshiriq</h1>
            <AddMission />

         </div>
      </div>
   )
}

export default CoursesAddLesson