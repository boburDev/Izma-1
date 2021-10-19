import { gql } from '@apollo/client'

const ONE_STUDENT = gql `
  query student ($id: ID!){
    student(id: $id) {
      name
      groups {
        name
      }
      phoneNumber{
        phone
      }
    }
  }
`

const DELETE_STUDENT = gql `
    mutation deleteStudent($studentID: ID!) {
        deleteStudent(studentID: $studentID) {
            id
            name
        }
    }
`

const GROUPS = gql `
  query groups($teacherID: [ID!] $courseID: [ID!]) {
    groups(teacherID: $teacherID courseID: $courseID) {
      name
      id
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
      studentID
      studentAddTime
      groupID
    }
  }
`

const UPDATE_COMMENT = gql `
  mutation updateComment($stID: ID! $stComment: String) {
    updateComment(studentID: $stID  comment: $stComment) {
      id
    }
  }
`

const SUBSCRIPTION_STUDENT = gql `
	subscription {
		students {
      id
      name
			phoneNumber{
        id
        phone
      }
		}
	}
`

const SUBSCRIPTION_CASH = gql `
	subscription {
		studentCash {
      id
      cashAmount
      cashComment
      cashType
      payedAt
		}
	}
`

const FILIAL = gql `
query{
  byBranchID{
    branchName
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

const UPDATE_STATUS_4 = gql `
  mutation updateStudentStatus($status: Int $stID: ID) {
    updateStudentStatus(status: $status studentID: $stID) {
      grStatus
      studentID
    }
  }
`

const HAS_STUDENT = gql `
  query hasStudent($stID: ID $grID: ID){
    hasStudent(stID: $stID grID: $grID)
  }
`

const SUBSCRIPTION_ST_EDIT = gql `
  subscription {
    studentsss {
      id
      birthday
      name
      gender
      comment
      mainPhone{
        phone
      }
    }
  }
`

export {
  FILIAL,
  GROUPS,
  ONE_STUDENT,
  UPDATE_COMMENT,
  DELETE_STUDENT,
  STATUS_3_4,
  HAS_STUDENT,
  UPDATE_STATUS_4,
  SELECT_STUDENT_GROUP,
  SUBSCRIPTION_STUDENT,
  SUBSCRIPTION_CASH,
  SUBSCRIPTION_ST_EDIT
}