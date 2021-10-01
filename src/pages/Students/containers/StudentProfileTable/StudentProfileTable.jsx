import '../StudnetProfileRight/StudentProfileRight.scss'
// import { Table } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useQuery, useSubscription } from '@apollo/client'
import { HISTORY, SUBSCRIPTION_HISTORY } from './query'
import TTable from '../../../../components/Table/TTable'

const StudentsProfileTable = () => {
  const { studentID } = useParams()
  const [history, setHistory] = useState([])

   const { data: forCheck } = useQuery(HISTORY, { variables: { studentID: studentID } })
   useSubscription(SUBSCRIPTION_HISTORY, {
      onSubscriptionData: ({ client: { cache }, subscriptionData: { data } }) => {
        cache.modify({
          fields: {
            historyStudentPay: () => {}
          }
        })
      },
    })

   useEffect(() => {
      if (forCheck && forCheck.historyStudentPay) {   
         setHistory(forCheck && forCheck.historyStudentPay)
      }
   }, [ forCheck])


   return (
      <div className="finance__inner-table" >
         {/* <Table className="izma__table__home" columns={columns} pagination={false} onRow={onRowClicked} dataSource={history} /> */}
         <TTable arr={history} block={"paymentHistory"} />
      </div>
   )
}


export default StudentsProfileTable

