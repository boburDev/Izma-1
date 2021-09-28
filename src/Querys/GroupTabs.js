import {
   gql
} from '@apollo/client'

const BY_GROUP_ID = gql `
query byGroupID($groupID: ID!){
	byGroupID(groupID: $groupID){
    id
    name
    teacher
    teacherID
    days
    rooms
    roomId
    time
    startDate
    endDate
    studentsCount
    price
    courseName
    courseId
    students {
      id
      name
      status
      mainPhone{
        id
        phone
      }
    }
  }
}
`

const DELETE_GROUP = gql `
    mutation deleteGroup($id: ID!) {
        deleteGroup(id: $id) {
            id
        }
    }
`

const GET_STUDENTS = gql `
	query studentOnKeyup($name: String!){
		studentOnKeyup(name: $name){
		id
		name
		}
	}
`

const SELECT_STUDENT_GROUP = gql `
  mutation createStudentGroup(
    $idGroup: ID!
    $idStudent: ID!
    $startAt: String
  ) {
    createStudentGroup (
      groupID: $idGroup
      studentID: $idStudent
      startAt: $startAt
    ) {
      message
    }
  }
`

const STATUS_5_6 = gql `
  mutation updateStatus (
    $stID: ID!
    $status: Int
    ) {
    updateStatus(
      studentID: $stID
      status: $status
      ){
      name
    }
  }
`
const STATUS_3_4 = gql `
  mutation updateStatus (
    $stID: ID!
    $status: Int
    ) {
    updateStatus(
      studentID: $stID
      status: $status
      ){
      name
    }
  }
`

const DELETE_FROM_GROUP = gql `
  mutation 
  deleteStudentGroup (
    $grID: ID!
    $stID: ID!
  ){
    deleteStudentGroup(
      groupID: $grID
      studentID: $stID
    ) {
      message
    }
  }
`

const CHECK_CASH = gql `
  query studentCash($stID: ID!) {
    studentCash(studentID: $stID)
    {
      id
      studentID
      cashAmount
    }
  }
`

const UPDATE_CASH = gql `
  mutation updateCash(
    $stID: ID!
    $cashAmm: String
  ) {
    updateCash(
      studentID: $stID
      cashAmount: $cashAmm
    ){
      id
      cashAmount
    }
  }
`

const HISTORY_PAYMENT = gql `
  mutation 
  createHistoryPayment(
    $debit: String
    $credit: String
    $comment: String
    $paymentType: Int
    $collegueID: ID
    $collegueName: String
    $studentID: ID
    $payedAt: String
  ){
    createHistoryPayment(
      debit: $debit
      credit: $credit
      comment: $comment
      paymentType: $paymentType
      collegueID: $collegueID
      collegueName: $collegueName
      studentID: $studentID
      payed_at: $payedAt
    ){
      debit
      credit
    }
  }
`

const SUBSCRIPTION_GROUPS = gql `
	subscription {
		groups {
      id
    name
    teacher
    teacherID
    days
    rooms
    roomId
    time
    startDate
    endDate
    studentsCount
    price
    courseName
    courseId
    students {
      id
      name
      status
      mainPhone{
        id
        phone
      }
    }
		}
	}
`

const SUBSCRIPTION_STUDENT = gql `
	subscription {
		studentsss {
      id
		}
	}
`

export {
   STATUS_3_4,
   STATUS_5_6,
   BY_GROUP_ID,
   DELETE_GROUP,
   GET_STUDENTS,
   SELECT_STUDENT_GROUP,
   DELETE_FROM_GROUP,
   CHECK_CASH,
   UPDATE_CASH,
   HISTORY_PAYMENT,
   SUBSCRIPTION_GROUPS,
   SUBSCRIPTION_STUDENT
}