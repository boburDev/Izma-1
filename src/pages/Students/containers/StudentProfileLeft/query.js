import {
   gql
} from '@apollo/client'

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

export {
   FILIAL,
   GROUPS,
   CHECK_CASH,
   ONE_STUDENT,
   UPDATE_COMMENT,
   DELETE_STUDENT,
   SELECT_STUDENT_GROUP,
   SUBSCRIPTION_STUDENT,
   SUBSCRIPTION_CASH,
}