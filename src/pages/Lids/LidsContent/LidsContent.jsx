import { useState } from 'react'
import Plus from '../../../assets/Icons/plus.svg'
import LidsBox from '../../../components/LidsComponents/LidsBox/LidsBox'
import Menu from '../../../assets/Icons/menuForm.svg'
import './LidsContent.scss'
import LidAddForm from '../../../containers/Forms/LidAddForm/LidAddForm'
import LidAddItem1 from '../../../containers/Forms/LidAddItem1/LidAddItem1'
import LidAddItem from '../../../containers/Forms/LidAddItem/LidAddItem'
import LidAddItem2 from '../../../containers/Forms/LidAddItem2/LidAddItem2'
import { Drawer } from 'antd';


const LidsContent = ({ columns, setColumns}) => {
   

const [form1, setForm1] = useState()
const [form2, setForm2] = useState()
const [form3, setForm3] = useState()

const [lidAdd, setLidAdd] = useState(false)
const [lidAdd1, setLidAdd1] = useState(false)
const [lidAdd2, setLidAdd2] = useState(false)
const [formNum, setFormNum] = useState()

const openForm1 = () => {
   setForm1(true)
   setForm2(false)
   setForm3(false)
}


const openForm2 = () => {
   setForm2(true)
   setForm1(false)
   setForm3(false)
}
const openForm3 = () => {
   setForm3(true)
   setForm2(false)
   setForm1(false)
}

const closeLidAdd = () => {
   setLidAdd(false)
}

const closeLidAdd1 = () => {
   setLidAdd1(false)
}
const closeLidAdd2 = () => {
   setLidAdd2(false)
}




   return (
      <div className="lids">
         <div className="lidsWrapper">
            <Drawer
               placement="right"
               closable={false}
               onClose={closeLidAdd1}
               visible={lidAdd1}
            >
               <LidAddItem1 
                  onClose={closeLidAdd1} 
                  setColumns={setColumns}
                  columns={columns}
               />
            </Drawer>
            <Drawer
               placement="right"
               closable={false}
               onClose={closeLidAdd2}
               visible={lidAdd2}
            >
               <LidAddItem2
                  onClose={closeLidAdd2}
                  setColumns={setColumns}
                  columns={columns}
               />
            </Drawer>

            

            <Drawer
               placement="right"
               closable={false}
               onClose={closeLidAdd}
               visible={lidAdd}
            >
               <LidAddItem 
                  onClose={closeLidAdd} 
                  setColumns={setColumns}
                  columns={columns}
                  formNum={formNum}

               />
            </Drawer>
            <div className="status1">
               <h2 className="status1-header-title" >So'rovlar</h2>
               <div className="status1-header">
                  <div className="status1-header-row"
                     style={{
                        display: form1 ? 'none' : 'flex'
                     }}
                  >
                     <div className="status1-header-row-left"
                        onClick={openForm1}
                     >
                        <img src={Plus} alt="" />
                        <h4>So'rov qo'shish</h4>
                     </div>

                     <div className="status1-header-row-right">
                        <img src={Menu} alt="" 
                           onClick={() => {
                              setFormNum(1)
                              setLidAdd(true)
                           }}
                         />
                     </div>
                  </div>
                  <div className="status1-header-row"
                     style={{
                        display: form1 ? 'flex' : 'none'
                     }}
                  >
                     
                     <LidAddForm 
                        setAdd={setForm1}
                        formId={1}
                        columns={columns}
                        setColumns={setColumns}
                        itemId={columns && columns.find(el => el?.boxStatus === -1)}
                     />
                  </div>
                  <div className="status1-header-row">
                     {
                        columns && columns.map((item, index) => {
                           if (item.boxStatus === -1) {
                              return  <div style={{ margin: 8, width: '100%' }} key={index}>
                                    <LidsBox
                                       column={item}
                                       columnId={item.id}
                                       isVisible={true}
                                       
                                    />
                                    
                                 </div>
                           }
                           return ""
                        })
                     }
                  </div>
               </div>
               <div
                  className="centerCoulumn"
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     width: '100%'
                  }}
                  key={1}
               >
                  {
                     columns &&  columns.map((item, index) => {
                        if (item.boxStatus === 1) {
                           return <div style={{ margin: 8, width: '100%' }} key={index}>
                                 <LidsBox
                                 sorov={true}
                                    column={item}
                                    columnId={item.id}
                                 columns={columns}
                                 setColumns={setColumns}

                                 />
                              </div>
                           
                        }
                        return ""
                     })
                  }
               </div>
            </div>
            <div className="status2">
               <h2 className="status1-header-title" >Kutish</h2>
               <div className="status1-header">
                  <div className="status1-header-row"
                     style={{
                        display: form2 ? 'none' : 'flex'
                     }}
                  >
                     <div className="status1-header-row-left"
                        onClick={openForm2}
                     >
                        <img src={Plus} alt="" />
                        <h4>So'rov qo'shish</h4>
                     </div>

                     <div className="status1-header-row-right">
                        <img src={Menu} alt="" 
                           onClick={() => {
                              setFormNum(2)
                              setLidAdd(true)
                           }}
                        />
                     </div>
                  </div>
                  <div className="status1-header-row"
                     style={{
                        display: form2 ? 'flex' : 'none'
                     }}
                  >
                     <LidAddForm 
                        setAdd={setForm2}
                        formId={2}
                        columns={columns}
                        setColumns={setColumns}
                        itemId={columns &&columns.find(el => el.boxStatus === -2)}
                     />
                  </div>
                  <div className="status1-header-row">
                     {
                        columns &&  columns.map((item, index) => {
                           if (item.boxStatus === -2) {
                              return <div style={{ margin: 8, width: '100%' }} key={index}>
                                    <LidsBox
                                       column={item}
                                       columnId={item.id}
                                       isVisible={true}
                                       

                                    />
                                 </div>
                           }
                           return ""
                        })
                     }
                  </div>
               </div>
               <div
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     width: '100%'
                  }}
                  key={1}
               >
                  {
                     columns &&  columns.map((item, index) => {
                        if (item.boxStatus === 2) {
                           return <div style={{ margin: 8, width: '100%' }} key={index}>
                                 <LidsBox
                                    column={item}
                                    columnId={item.id}
                                 columns={columns}
                                 setColumns={setColumns}
                                 />
                              </div>
                        }
                        return ""
                     })
                  }
               </div>
            </div>
            <div className="status3">
               <h2 className="status1-header-title" >To’plam</h2>
               <div className="status1-header">
                  <div className="status1-header-row" 
                     style={{
                        display: form3 ? 'none' : 'flex'
                     }}
                  >
                     <div className="status1-header-row-left"
                        onClick={openForm3}
                     >
                        <img src={Plus} alt="" />
                        <h4>So'rov qo'shish</h4>
                     </div>

                     <div className="status1-header-row-right">
                        <img src={Menu} alt="" 
                           onClick={() => setLidAdd1(true)}
                        />
                     </div>
                  </div>
                  <div className="status1-header-row"
                     style={{
                        display: form3 ? 'flex' : 'none'
                     }}
                  >
                     <LidAddForm
                        setAdd={setForm3}
                        formId={3}
                        columns={columns}
                        setColumns={setColumns}
                        itemId={columns && columns.find(el => el.boxStatus === -3)}
                     />
                  </div>
                  <div className="status1-header-row">
                     {
                        columns &&  columns.map((item, index) => {
                           if (item.boxStatus === -3) {
                              return <div style={{ margin: 8, width: '100%' }} key={index}>
                                    <LidsBox
                                       column={item}
                                       columnId={item.id}
                                       isVisible={true}
                                       
                                    />
                                 </div>
                           }
                           return ""
                        })
                     }
                  </div>
               </div>
               <div
                  style={{
                     display: "flex",
                     flexDirection: "column",
                     alignItems: "center",
                     width: '100%'
                  }}
                  key={1}
               >
                  {
                     columns &&   columns.map((item, index) => {
                        if (item.boxStatus === 3) {
                           return <div style={{ margin: 8, width: '100%' }} key={index}>
                                 <LidsBox
                                    column={item}
                                    columnId={item.id}
                                 columns={columns}
                                 setColumns={setColumns}
                                 groupCreate={setLidAdd2}
                                 />
                              </div>
                        }
                        return ""
                     })
                  }
               </div>
            </div>
         </div>
      </div>
   )
}

export default LidsContent

