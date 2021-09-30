import './TableBlock.scss'
import DeleteImg from '../../assets/Icons/delete-border.svg'
import EditImg from '../../assets/Icons/settings-edit.svg'

const TTableBlock = ({ block, info, showDrawer, index }) => {

   return (
      <div className="tableBlock">
         {
            block === 'settingsHash' ? <>
               
               <h4 className={'groupHash'}>{index}</h4>
               <h4 className={'groupHash'}>{info?.room}</h4>
               <h4 className={'groupHash'}>
                  <img src={EditImg} alt="" />
               </h4>
               <h4 className={'groupHash'}>
                  <img src={DeleteImg} alt="" />
               </h4>
            </> : block === 'settingsHashRooms' ? <>

            </> : <>ok</>
         }
      </div>
   )
}


export default TTableBlock