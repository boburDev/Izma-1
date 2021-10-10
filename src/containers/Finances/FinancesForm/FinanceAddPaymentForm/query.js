import { gql } from '@apollo/client'

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
      name
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
query student($id: ID!) {
  student(id: $id){
    groups{
      id
      name
      teacher
      teacherID
    }
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
}