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

const SUBCR_GR_ATT = gql `
  subscription {
    createdGrAtt{
      id
      groupID
      day
      status
      comment
    }
  }
`

const SUBCR_ST_ATT = gql `
  subscription {
    createdStAtt {
      id
      attendenceDay
      status
      studentId
    }
  }
`

const CREATE_ST_ATT = gql `
  mutation updateStudentAttendence (
    $status: Int
    $dayID: ID
  ){
    updateStudentAttendence(
      status: $status
      dayID: $dayID
    )
  }
`

 
 export {
   GROUP_DAVOMAT,
   STUDENT_DAVOMAT,
   SUBCR_GR_ATT,
   SUBCR_ST_ATT,
   CREATE_ST_ATT
 }