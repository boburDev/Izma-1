import {
    gql
 } from '@apollo/client'
 
 const GROUP_DAVOMAT = gql `
 query groupAttendences($groupID: ID! $month: Int) {
   groupAttendences(groupID: $groupID month: $month) {
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