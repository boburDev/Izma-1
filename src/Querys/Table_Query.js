import { gql } from '@apollo/client'

const ROOMS = gql`
    query {
        courses{
            id
            name
            price
        }
    }
`

const BY_COURSE_ID = gql `
    query filterByCourseID
    ($courseID: [ID!]) {
        filterByCourseID(courseID: $courseID) {
            id
            name
            groups{
            name
            }
        }
    }
`

const CREATE_ROOM = gql`
    query {
        courses{
            id
            name
            price
        }
    }
`

const COURSES_FILTER = gql `
    query filterByCourseID($courseID: [ID!]) {
        filterByCourseID (courseID: $courseID){
        filterData {
        group{
            id
            name
            days
            time
            teacher
        }
        student{
            id
            name
            mainPhone{
            phone
            }
        }
        }
    }
    }
`

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

const student = gql `
    query{
        students{
        id
        }
    }
`

const cash = gql `
    query studentCash($studentID: ID!) {
        studentCash (studentID: $studentID){
        studentID
        }
    }
`

const create_cash = gql `
    mutation createCash (
        $stID: ID!
        $cashAmm: String!
    ) {
        createCash(
        studentID: $stID
        cashAmount: $cashAmm
        ) {
        id
        cashAmount
        }
    }
`

const have_cash = gql `
    query{
        haveCash
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
    ROOMS,
    CREATE_ROOM,
    ALL_STUDENTS,
    DELETE_STUDENT,
    COURSES_FILTER,
    BY_COURSE_ID,
    STUDENT_ON_KEY_UP,
    SUBSCRIPTION,
    FIND_SALE,
    STUDENT_COUNT,
    student,
    cash,
    create_cash,
    have_cash,
    FILTER_COURSE,
    ALL_STUDENTSs
}