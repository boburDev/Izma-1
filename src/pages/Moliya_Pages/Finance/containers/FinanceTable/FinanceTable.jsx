import { useEffect, useState } from 'react'
import './FinanceTable.scss'
import TTable from '../../../../../components/Table/TTable'
import Check from '../../../../../components/Check/CheckById'
import { Modal } from 'antd'
import axios from 'axios'

const FinanceTable = ({ api = true }) => {
   const [data,setData] = useState([])
   const [state,setState] = useState('')
   const route = api ? 'http://localhost:4000' : 'https://api.triiipple.uz'
   useEffect(()=>{
      ;(async()=>{
         try {
            const res = await axios.get(route + '/test', {
               headers: {
                  'Authorization': localStorage.getItem('token')
               }
            })
            setData(res.data)
         } catch (error) {
            console.log(error)
         }
      })()
   },[route])



   return (
      <div className="izma__finance-table" >
         <Modal className="check-modal" footer={null} visible={state !== '' && state}>
               <Check
                  id={state !== '' && state}
                  setId={setState}
               />
            </Modal>


         <TTable setEditId={setState} arr={data} block={'financeHash'} />
      </div>
   )
}

export default FinanceTable