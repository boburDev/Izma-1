import './Lids.scss'
import LidsContent from './LidsContent/LidsContent'
import { useState } from 'react'
import LidAddForm from '../../containers/Forms/LidAddForm/LidAddForm'
import { Drawer } from 'antd'
import LidForm from '../Settings_Pages/LidForm/LidForm'
import LidAddItem from '../../containers/Forms/LidAddItem/LidAddItem'
import LidAddItem1 from '../../containers/Forms/LidAddItem1/LidAddItem1'
const Lids = () => {
   const [active, setActive] = useState(false)
   const [active1, setActive1] = useState(false)
   const [edit, setEdit] = useState(false)
   const [refresh, setRefresh] = useState(false)
   const [ind, setInd] = useState('')

   const [visible, setVisible] = useState(false)
   const showDrawer = () => {
      setVisible(true)
   }
   const onClose = () => {
      setVisible(false)
   }
   return(
      <div className="lids">
         <LidsContent 
            setActive={setActive} setInd={setInd} refresh={refresh} setActive1={setActive1} setEdit={setEdit} showDrawer={showDrawer}
         />

         <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}>
            {
               ind === 2 ? 
                  <LidAddItem1 onClose={onClose} />
               :
                  <LidAddItem onClose={onClose} ind={ind} setRefresh={setRefresh} refresh={refresh}/>
            }
         </Drawer>

      </div>
   )
}

export default Lids