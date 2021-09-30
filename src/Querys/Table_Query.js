import { gql } from '@apollo/client'

const ALL_STUDENTS = gql `
query students($page: Int, $count: Int) {
    students(page: $page count: $count) {
        id
        name
        status
        mainPhone {
            id
            phone
        }
        groups {
            name
            teacher
            time
        }

    }
}
`
const ALL_STUDENTSs = gql `
query {
    studentCredit {
        id
        name
        status
        mainPhone {
            id
            phone
        }
        groups {
            name
            teacher
            time
        }

    }
}
`

const STUDENT_ON_KEY_UP = gql`
    query studentOnKeyup($name: String!) {
        studentOnKeyup(name: $name) {
            id
            name
            status
            mainPhone {
                id
                phone
            }
            groups {
                name
                teacher
                time
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

const SUBSCRIPTION = gql `
	subscription {
		studentsss {
        id
    }
}
`

const FIND_SALE = gql`
    query{
        findSale
    }
`

const FILTER_COURSE = gql `
query byCourseIDFilter($courseID: [ID!]){
    byCourseIDFilter(courseID: $courseID){
      groups{
        id
        name
        teacher
        time
        students{
          id
          name
          status
          mainPhone{
            phone
          }
        }
      }
   }
  }
`

const STUDENT_COUNT = gql `
  query studentCount($count: Int) {
    studentCount(count: $count)
 }
`

export {
    ALL_STUDENTS,
    DELETE_STUDENT,
    STUDENT_ON_KEY_UP,
    SUBSCRIPTION,
    FIND_SALE,
    STUDENT_COUNT,
    FILTER_COURSE,
    ALL_STUDENTSs
}