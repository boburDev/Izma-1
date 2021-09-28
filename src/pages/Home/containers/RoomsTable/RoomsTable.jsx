
import { DAYS, GROUPS, ROOMS } from './query'
import { useQuery } from '@apollo/client'

function RoomsTable({ days = 'odd' }) {



   const { data: rooms } = useQuery(ROOMS)

   const { data: time } = useQuery(DAYS, { variables: { day: days } })

   const { data: group } = useQuery(GROUPS, { variables: { day: days } })



   return (
      <>
         {

            <div className="table-main">
               <div>
                  <table id="customers">
                     <tbody>
                        <tr>
                           <th></th>
                           {
                              rooms && rooms.rooms.map((value, key) => <th key={key}>{value.room}</th>)
                           }
                        </tr>
                        {
                           time && time && time.tableRoomsTimes.map((value, index) => <tr key={index}>
                              <td className="table-td">{value.time}</td>
                              {
                                 rooms && rooms.rooms.map((i, key) => <td key={key}>
                                    {
                                       group && group.tableRoomsGroups.map((data, indexKey) => {
                                          if (data.rooms === i.room && data.time === value.time) {
                                             return <div className="table-item" key={indexKey}>
                                                <div className="table-top">
                                                   <p className="comp">Completed</p>
                                                   <p className="name">{data.name}</p>
                                                </div>
                                                <div className="table-id">
                                                   <p>{data.teacher}</p>
                                                </div>
                                                <div className="table-total">
                                                   <p className="table-date">{data.startDate} - {data.endDate}</p>
                                                   <p className="total"> {data.studentsCount}tal</p>
                                                </div>
                                             </div>
                                          } else {
                                             return <div key={indexKey}></div>
                                          }
                                       })
                                    }
                                 </td>)
                              }
                           </tr>)
                        }
                     </tbody>

                  </table>
               </div>
            </div>

         }
      </>
   )
}

export default RoomsTable