import { gql } from '@apollo/client'

const ROOMS = gql`
{
    rooms{
      id
      room
    }
  }
`

const DAYS = gql`
query tableRoomsTimes($day: String){
  tableRoomsTimes(day: $day){
    time
  }
}
`

const GROUPS = gql`
query tableRoomsGroups($day: String){
  tableRoomsGroups(day: $day){
    time
    id
    name
    teacher
    studentsCount
    startDate
    endDate
    rooms
  }
}
`

export {
    ROOMS,
    DAYS,
    GROUPS
}