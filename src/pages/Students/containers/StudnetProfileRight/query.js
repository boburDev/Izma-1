import {
   gql
} from '@apollo/client'

const STUDENT_GROUPS = gql `
  query studentGroups($studentID: ID!){
    studentGroups(studentID: $studentID){
      id
      name
      time
      startDate
      price
      courseName
      days
      teacher
      teacherID
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
   STUDENT_GROUPS,
   SUBSCRIPTION_GROUPS
}