import './ChangeContents.scss'
import Images11 from '../../../assets/images11.png'
import Close from '../../../assets/Icons/Group 26.svg'
import { useState } from 'react'
import Plus from '../../../assets/plusTable.png'

const Heading = ({ remActiveOne, remover1 }) => {

   const [changeSize, setChangeSize] = useState(false)
   const [changeSize2, setChangeSize2] = useState(false)
   const [changeSize3, setChangeSize3] = useState(false)

   const ChangeSize = () => {
      setChangeSize(true)
      setChangeSize2(false)
      setChangeSize3(false)
   }
   const ChangeSize2 = () => {
      setChangeSize(false)
      setChangeSize2(true)
      setChangeSize3(false)
   }
   const ChangeSize3 = () => {
      setChangeSize(false)
      setChangeSize2(false)
      setChangeSize3(true)
   }



   return (
      <div className="heading-text">
         <div className="input_heading">
            <input autoComplete="off"  type="text" name="" id=""
               className={`
                        ${changeSize ? 'activeOne' : ''}
                        ${changeSize2 ? 'activeTwo' : ''}
                        ${changeSize3 ? 'activeThre' : ''}                    
                    `}
            />
         </div>
         <div className="heading_btns">
            <button className="btn_heading"
               onClick={() => ChangeSize()}
            >
               H2
            </button>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading"
               onClick={() => ChangeSize2()}
            >
               H3
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading"
               onClick={() => ChangeSize3()}
            >
               H4
            </button>
            <button className="btn_heading main_close"
               onClick={remActiveOne}
            >
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close"
               onClick={remover1}
            >
               <img src={Close} alt="" />
            </button>

         </div>
      </div>
   )
}




const Warning = ({ remActiveFive, remover5 }) => {
   return (
      <div className="warning">
         <div className="inner_warning">
            <input autoComplete="off"  placeholder="Text here" className="warning_in" type="text" name="" id="" />
            <textarea placeholder="Message here" className="warning_in comment" name="" id="" cols="30" rows="10"></textarea>
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading main_close" onClick={remActiveFive}>
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close" onClick={remover5}>
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}


const Code = ({ remActiveThre, remover3 }) => {
   return (
      <div className="code">
         <div className="inner_code">
            <textarea placeholder="Enter Code" name="" id="" cols="30" rows="10"></textarea>
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading main_close" onClick={remActiveThre}>
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close" onClick={remover3}>
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}

const HtmlCode = ({ remActiveSix, remover6 }) => {
   return (
      <div className="code">
         <div className="inner_code">
            <textarea placeholder="Enter Code" name="" className="bg_black" cols="30" rows="10"></textarea>
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading main_close" onClick={remActiveSix}>
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close" onClick={remover6}>
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}

const Quote = ({ remActiveSeven, remover7 }) => {
   return (
      <div className="quote">
         <div className="inner_quote">
            <div className="has_before">
               <input autoComplete="off"  placeholder="Quote here" type="text" name="" id="" />
            </div>
            <input autoComplete="off"  placeholder="Quote author here" type="text" name="" id="" />
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading main_close" onClick={remActiveSeven}>
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close" onClick={remover7}>
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}

const Cheklist = ({ remActiveFour, remover4 }) => {
   const [chekList, setCkeckList] = useState([
      { checklist: '' },

   ])

   const AddNewCheklist = (e) => {
      e.preventDefault()
      setCkeckList([...chekList, { checklist: '' }])
      document.getElementById('changeFormRes').reset()
   }

   return (
      <div className="chekList">
         <div className="inner_cheklist">
            <form action="" id="changeFormRes"onSubmit={AddNewCheklist}>
               {
                  chekList.map((v, i) => (
                     <div key={i} className="cheklist_item">
                        <input autoComplete="off"  type="checkbox" name="" id="checklist" />
                        {/* <label htmlFor="checklist">
                                    <Chek/>
                                </label> */}
                        <input autoComplete="off"  type="text" name="" id="" />
                     </div>
                  ))
               }
               <button type="submit"></button>
            </form>
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading main_close"
               onClick={remActiveFour}
            >
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close"
               onClick={remover4}
            >
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}

const List = ({ remActiveTwo, remover2 }) => {

   const [list, setList] = useState([
      { list: '' }
   ])

   const AddList = (e) => {
      e.preventDefault()
      setList([...list, { list: '' }])
      document.getElementById('changeForm2Res').reset()
   }

   return (
      <div className="list">
         <div className="inner_list">
            <ul>
               <form action="" id="changeForm2Res" onSubmit={AddList}>
                  {
                     list.map((item, i) => (
                        <li key={i} className="li_item">
                           <input autoComplete="off"  type="text" name="" id="" />
                        </li>
                     ))
                  }
                  <button type="submit"></button>
               </form>
            </ul>
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading main_close"
               onClick={remActiveTwo}
            >
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close"
               onClick={remover2}
            >
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}


const Table = ({ remActiveNime, remover8 }) => {

   const [tableRow, setTableRow] = useState([
      { table: '' },
      { table: '' },
      { table: '' },
      { table: '' }
   ])

   const [tableColumn, setTableColumn] = useState([
      { table: '' },
      { table: '' },
      { table: '' },
      { table: '' }
   ])

   const addRow = () => {
      setTableRow([...tableRow, { table: '' }])
   }

   const addColumn = () => {
      setTableColumn([...tableColumn, { table: '' }])
   }

   return (
      <div className="table_block">
         <div className="inner_table">
            <button onClick={addColumn} className="add_table column"><img src={Plus} alt="" /></button>
            <table className="main_table">
               <tbody className="table_body">
                  {
                     tableColumn.map((item, i) => (
                        <tr key={i} className="table_tr">
                           {
                              tableRow.map((item, i) => (
                                 <div key={i}>
                                    <td contentEditable={true} suppressContentEditableWarning={true}
                                       className="table_td">&nbsp;
                                    </td>
                                    <td className="table_td" contentEditable={true} suppressContentEditableWarning={true} >&nbsp;</td>
                                 </div>
                              ))
                           }
                        </tr>
                     ))
                  }
               </tbody>
            </table>
            <button onClick={addRow} className="add_table row"><img src={Plus} alt="" /></button>
         </div>
         <div>
            <button className="btn_heading">
               <img src={Images11} className="top_row" alt="" />
            </button>
            <button className="btn_heading">
               <img src={Images11} className="bottom_row" alt="" />
            </button>
            <button className="btn_heading main_close"
               onClick={remActiveNime}
            >
               <img src={Close} alt="" />
            </button>
            <button className="btn_heading help_close"
               onClick={remover8}
            >
               <img src={Close} alt="" />
            </button>
         </div>
      </div>
   )
}




export {
   Heading,
   Warning,
   Code,
   HtmlCode,
   Quote,
   Cheklist,
   List,
   Table
}