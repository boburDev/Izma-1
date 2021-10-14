import { gql } from '@apollo/client'

const BY_GROUP_ID = gql`
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

const GROUP_STUDENTS = gql `
  query findStudByGrId($grID: ID) {
    findStudByGrId(grID: $grID) {
      id
      name
      groupStatus
      studentPhone{
        phone
      }
    }
  }
`

const DELETE_GROUP = gql`
    mutation deleteGroup($id: ID!) {
        deleteGroup(id: $id) {
            id
        }
    }
`

const GET_STUDENTS = gql`
	query studentOnKeyup($name: String){
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

const STATUS_6 = gql `
  mutation updateStatus (
    $stID: ID!
    $status: Int
    ) {
    updateStatus(
      studentID: $stID
      status: $status
      ){
      status
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
      status
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

const HISTORY_PAYMENT = gql`
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
  subscription{
    studentGroupss {
      id
      name
      students{
        id
        name
      }
    }
  }
`

const SUBSCRIPTION_STUDENT = gql `
	subscription {
		studentsss {
      status
		}
	}
`
const NEW_CASH = gql `
  mutation createCash (
    $stID: ID!
    $cashAmm: String!
    $comment: String
    $type: Int
    $payed: String
  ) {
    createCash(
      studentID: $stID
      cashAmount: $cashAmm
      cashComment: $comment
      cashType: $type
      payedAt: $payed
    ) {
      id
      cashAmount
      cashComment
      cashType
      payedAt
    }
  }
`

const HAS_STUDENT = gql `
  query hasStudent($stID: ID $grID: ID){
    hasStudent(stID: $stID grID: $grID)
  }
`


const UPDATE_GR_STATUS = gql `
  mutation updateGrStatus($status: Int $stID: ID $grID: ID) {
    updateGrStatus(status: $status studentID: $stID groupID: $grID) {
      grStatus
    }
  }
`

const SET_STATUS_6 = gql `
  query setStatus_6($stID: ID) {
    setStatus_6(stID: $stID) {
      studentID
    }
  }
`

const SUBSCRIPTION_STATUS = gql `
  subscription{
    groupStatus{
      grStatus
    }
  }
`

const SUBSCRIPTION_ADD_STUDENT = gql `
  subscription {
    addedStudentGroup{
      id
      name
      groupStatus
      studentPhone {
        phone
      }
    }
  }
`

const NEW_SUB_STUDENT = gql `
  subscription {
    groupStatus {
      id
      name
      groupStatus
      studentPhone {
        phone
      }
    }
  }
`

const SUBSCRIPTION_GROUP_INFO = gql `
  subscription {
    groups{
      id
      name
      days
      time
      startDate
      endDate
      teacherID
      courseId
      roomId
    }
  }
`


export {
  NEW_CASH,
  STATUS_3_4,
  STATUS_6,
  SET_STATUS_6,
  BY_GROUP_ID,
  DELETE_GROUP,
	GET_STUDENTS,
  SELECT_STUDENT_GROUP,
  DELETE_FROM_GROUP,
  UPDATE_CASH,
  HISTORY_PAYMENT,
  HAS_STUDENT,
  UPDATE_GR_STATUS,
  GROUP_STUDENTS,
  SUBSCRIPTION_GROUPS,
  SUBSCRIPTION_STUDENT,
  SUBSCRIPTION_STATUS,
  SUBSCRIPTION_ADD_STUDENT,
  NEW_SUB_STUDENT,
  SUBSCRIPTION_GROUP_INFO,
}