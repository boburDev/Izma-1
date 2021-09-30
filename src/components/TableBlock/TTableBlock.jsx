import './TableBlock.scss'
import DeleteImg from '../../assets/Icons/delete-border.svg'
import EditImg from '../../assets/Icons/settings-edit.svg'

const TTableBlock = ({ block, info, index, showDrawer }) => {
   // console.log(info)
   
   return (
      <div className="tableBlock">
         {
            block === 'settingsHash' ? <>
               
            <div>
               <h4 className={'groupHash'}>{info?.name}</h4>
               <h4 className={'groupHash'}>{info?.status}</h4>
               <h4 className={'groupHash'}>{info?.phoneNumber}</h4>
               
               <h4 className={'groupHash'}>
                  <img src={DeleteImg} alt="" />
               </h4>
               <h4 className={'groupHash'}>
                  <img src={DeleteImg} alt="" />
               </h4>
            </div>
            </> : <>ok</>
         }
      </div>
   )
}


export default TTableBlock