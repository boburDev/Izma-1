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
 query studentAttendence($groupID: ID!){
   studentAttendence(groupID:$groupID){
     id
     groupID
     studentID
     day
     status
   }
 }
 `


 
 export {
   GROUP_DAVOMAT,
   STUDENT_DAVOMAT,
 }