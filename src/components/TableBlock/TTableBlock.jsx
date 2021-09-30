import './TableBlock.scss'
import DeleteImg from '../../assets/Icons/delete-border.svg'
import EditImg from '../../assets/Icons/settings-edit.svg'

const TTableBlock = ({ block, info, showDrawer, index }) => {
console.log(info)
   return (
      <div className="tableBlock">
         {
            block === 'settingsHash' ? <>
               
               <h4 style={{width: '200px'}} className={'groupHash'}>{info?.name}</h4>
               <h4 className={'groupHash'}>{info?.status}</h4>
               <h4 className={'groupHash'}>{info?.phoneNumber}</h4>
               
               <h4 className={'groupHash'}>
                  <img src={EditImg} alt="" />
               </h4>
               <h4 className={'groupHash'}>
                  <img src={DeleteImg} alt="" />
               </h4>
            </> : block === 'settingsHashRooms' ? <>
            <h4 className={'groupHash'}>{index}</h4>
               <h4 className={'groupHash'}>{info?.room}</h4>
               <h4 className={'groupHash'}>
                  <img src={EditImg} alt="" />
               </h4>
               <h4 className={'groupHash'}>
                  <img src={DeleteImg} alt="" />
               </h4>
            </> : block === 'financeHash' ? <>
               <h4 className={'groupHash'}>{info?.studentName}</h4>
               <h4 className={'groupHash'}>{info?.phone}</h4>
               <h4 className={'groupHash'}>{info?.typePayment}</h4>
               <h4 className={'groupHash'}>{info?.amount}</h4>
               <h4 className={'groupHash'}>{info?.comment}</h4>
               {/* <h4 className={'groupHash'}>
                  <img src={EditImg} alt="" />
               </h4>
               <h4 className={'groupHash'}>
                  <img src={DeleteImg} alt="" />
               </h4> */}
            </> :<>ok</>
         }
      </div>
   )
}


export default TTableBlock