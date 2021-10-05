import {
    gql
 } from '@apollo/client'
 
 const GROUP_DAVOMAT = gql `
 query groupAttendences($groupID: ID!) {
   groupAttendences(groupID: $groupID) {
     id
     groupID
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