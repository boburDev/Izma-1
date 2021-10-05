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


 
 export {
   GROUP_DAVOMAT,
 }