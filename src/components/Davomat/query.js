import {
    gql
 } from '@apollo/client'
 
 const GROUP_DAVOMAT = gql `
 query groupAttendences($groupID: ID! $month: Int, $year: Int) {
   groupAttendences(groupID: $groupID month: $month, year: $year) {
     id
     day
     status
     comment
   }
 } 
 `

 const STUDENT_DAVOMAT = gql`
 query studentAttendences($groupId: ID! $month: Int! $year: Int!){
  studentAttendences(
    groupId: $groupId
    month: $month
    year: $year
  ){
    stId
    data{
      id
      attendenceDay
      status
    }
  }
}
`


 
 export {
   GROUP_DAVOMAT,
   STUDENT_DAVOMAT,
 }