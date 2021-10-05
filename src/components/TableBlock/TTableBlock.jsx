import './TableBlock.scss'
import DeleteImg from '../../assets/Icons/delete-border.svg'
import EditImg from '../../assets/Icons/settings-edit.svg'
import moment from 'moment'
import { useState } from 'react'
import Modal1 from '../Modal/Modal'


const TTableBlock = ({ block, info, showDrawer, setDeleteId, setEditId, index, setInfo, openModal, setID, deleteRoom, setTakeID }) => {
   const [modal, setModal] = useState()
   const [modal1, setModal1] = useState()
   return (
      <div className="tableBlock">
         {
            block === 'settingsHash' ? <>
               
               <h4 style={{width: '200px'}} className={'groupHash'}>{info?.name}</h4>
               <h4 className={'groupHash'}>{info?.status}</h4>
               <h4 className={'groupHash'}>{info?.phoneNumber}</h4>
               
               <h4 className={'groupHash'}>
                  <img id={info.Id} src={EditImg} alt="" onClick={e => {
                     showDrawer()
                     setEditId(e.target.id)
                  }} />
               </h4>
               <h4 className={'groupHash'}>
                  <Modal1
                     block="delete"
                     myModal={modal}
                     setMymodal={setModal}
                     title={`Xodimni o'chirish`}
                     text={info?.name + `ni o'chirilshni hohlaysizmi ?`}
                     info={info.Id}
                     setInfo={setDeleteId}
                  />
                  <img id={info.Id} src={DeleteImg} alt="" onClick={e => {
                     setModal(true)
                  }} />
               </h4>
            </> : block === 'settingsHashRooms' ? <>
                  <h4 className={'settingsHashRooms'}>{index}</h4>
                  <h4 className={'settingsHashRooms'}>{info?.room}</h4>
                  <h4 className={'settingsHashRooms'} onClick={(e) => {
                     setInfo(info?.room)
                     setID(info.id)
                     openModal(true)
                  }}><img src={EditImg} alt="" /></h4>
                  <h4 className={'settingsHashRooms'} onClick={() => {
                     setModal1(true)
                  }}>
                  <Modal1
                     block="delete"
                     myModal={modal1}
                     setMymodal={setModal1}
                     title={`Xonani o'chirish`}
                     text={info?.room+ `ni o'chirilshni hohlaysizmi ?`}
                     info={info.id}
                        setInfo={deleteRoom}
                  />
                  <img src={DeleteImg} alt="" />
               </h4>
            </> : block === 'financeHash' ? <>
                     <h4 className={'financeHash'}>{info?.studentName}</h4>
                     <h4 className={'financeHash'}>{info?.phone}</h4>
                     <h4 className={'financeHash'}>{info?.typePayment}</h4>
                     <h4 className={'financeHash'}>{info?.amount}</h4>
                     <h4 className={'financeHash'}>{info?.comment}</h4>
            </> : block === 'financeCostHash' ? <>
                        <h4 className={'financeCostHash'}>{info?.name}</h4>
                        <h4 className={'financeCostHash'}>{moment(info?.createdAt-0).format('DD.MM.YYYY')}</h4>
                        <h4 className={'financeCostHash'}>{info?.type}</h4>
                        <h4 className={'financeCostHash'}>{info?.buyer}</h4>
                        <h4 className={'financeCostHash'}>{info?.paymentAmount}</h4>
                        <h4 className={'financeCostHash'}>
                  <img src={DeleteImg} alt="" />
               </h4>
            </> : block === 'financeGroupHash' ? <>
                           <h4 className={'financeGroupHash'}>{info?.groups}</h4>
                           <h4 className={'financeGroupHash'}>{info?.teachers}</h4>
                           <h4 className={'financeGroupHash'}>{info?.courses}</h4>
                           <h4 className={'financeGroupHash'}>{info?.stCount}</h4>
                           <h4 className={'financeGroupHash'}>{info?.price}</h4>
            </> : block === 'paymentHistory' ? <>
                              <h4 className={'paymentHistory'}>{moment(info?.createdAt-0).format('YYYY-MM-DD, HH:MM')}</h4>
                              <h4 className={'paymentHistory'}>{info?.paymentType}</h4>
                              <h4 className={'paymentHistory'}>{info?.payed_at}</h4>
                              <h4 className={'paymentHistory'}>{info?.debit}</h4>
                              <h4 className={'paymentHistory'}>{info?.credit}</h4>
                              <h4 className={'paymentHistory'}>{info?.comment}</h4>
                              <h4 className={'paymentHistory'}>

                              </h4>
            </> : block === 'settingsArchive' ? <>
                              <h4 className={'paymentHistory'}>{index + 1}</h4>
                              <h4 className={'paymentHistory'}>{info?.name}</h4>
                              <h4 className={'paymentHistory'}>{info?.status}</h4>
                              <h4 className={'paymentHistory'}>{info?.phoneNumber}</h4>
                              <h4 className={'paymentHistory'}>
                                 <img id={info.Id} src={DeleteImg} alt="" onClick={e => setTakeID(e.target.id)} />
                              </h4>
            </> : <>ok</>
         }
      </div>
   )
}


export default TTableBlock