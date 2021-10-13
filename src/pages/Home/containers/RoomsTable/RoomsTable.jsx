import './RoomsTable.scss'
import { DAYS, GROUPS, ROOMS } from './query'
import { useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function RoomsTable({ days = '1' }) {

   const { data: rooms } = useQuery(ROOMS)
	const { data: time } = useQuery(DAYS, { variables: { day: days }})
	const { data: group } = useQuery(GROUPS, { variables: { day: days }})

    const [room, setRoom] = useState([])
    const [times, setTimes] = useState([])
    const [groups,setGroups] = useState([])


    useEffect(()=>{
        if (rooms && rooms.rooms) {
            setRoom(rooms && rooms.rooms)
        }
    },[rooms])

    useEffect(()=>{
        if (time && time.tableRoomsTimes) {

            setTimes(time && time.tableRoomsTimes)
        }
    },[time])

    useEffect(()=>{
        if (group && group.tableRoomsGroups) {
            setGroups(group && group.tableRoomsGroups)
        }
    },[group])

   return (

            <div className="table-main">
               <div>
                  <table id="customers">
                     <tbody>
                        <tr>
                           <th></th>
                           {
                              room.map((value, key) => <th key={key}>{value.room}</th>)
                           }
                        </tr>
                        {
                           times.map((value, index) => <tr key={index}>
                              <td className="table-td">{value.time}</td>
                              {
                                 room.map((i, key) => <td key={key}>
                                    {
                                       groups.map((data, indexKey) => {
                                          if (data.rooms === i.room && data.time === value.time) {
                                             return <Link 
                                             to={`groups/groupsProfil/${data.id}`} className="table-item" key={indexKey}>
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
                                             </Link>
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
   )
}

export default RoomsTable