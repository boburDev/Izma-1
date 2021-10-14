import { gql } from '@apollo/client'

const CHECK_CASH = gql `
  query studentCash($stID: ID!) {
    studentCash(studentID: $stID) {
      id
      studentID
      cashAmount
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

const UPDATE_CASH = gql `
  mutation updateCash(
    $stID: ID!
    $cashAmm: String
    $comment: String
    $type: Int
    $payed: String
  ) {
    updateCash(
      studentID: $stID
      cashAmount: $cashAmm
      cashComment: $comment
      cashType: $type
      payedAt: $payed
    ){
      id
      cashAmount
      cashComment
      cashType
      payedAt
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

const STUDENT_GROUPS = gql `
  query studentGroups($studentID: ID!){
    studentGroups(studentID: $studentID){
      id
      name
      time
      startDate
      courseName
      days
      teacher
      teacherID
    }
  }
`

const COUNT = gql`
{
    checksCounts
}
`

const CREATE_CHECK = gql`
mutation createCheck(
  $checkNumber: Int!
	$studentId: ID!
	$studentName: String!
	$paymentType: String!
	$paymentAmount: Int!
	$paymentTime: String!
	$teachId: String
	$teacherName: String
	$groupId: ID
	$groupName: String
	$comments: String
){
  createCheck(
    checkNumber: $checkNumber
    studentId: $studentId
    paymentType: $paymentType
    paymentAmount: $paymentAmount
    paymentTime: $paymentTime
    teachId: $teachId
    teacherName: $teacherName
    groupId: $groupId
    groupName: $groupName
    studentName: $studentName
    comments: $comments
  )
}
`

const SUBSCRIPTION_CHECK = gql `
  subscription{
    newCheckCount{
      serialNumber
    }
  }
`

const UPDATE_GR_STATUS = gql `
  mutation updateStudentStatus($status: Int $stID: ID) {
    updateStudentStatus(status: $status studentID: $stID) {
      grStatus
    }
  }
`

const SUBSCRIPTION_GROUPS = gql `
	subscription {
		studentGroupss {
      id
      name
      time
      startDate
      days
		}
	}
`

export {
  NEW_CASH,
  CHECK_CASH,
  UPDATE_CASH,
  STATUS_3_4,
  HISTORY_PAYMENT,
  STUDENT_GROUPS,
  COUNT,
  CREATE_CHECK,
  SUBSCRIPTION_CHECK,
  UPDATE_GR_STATUS,
  SUBSCRIPTION_GROUPS
}