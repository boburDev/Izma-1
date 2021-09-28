import {
   gql
} from '@apollo/client'

const ROOMS = gql `
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

const CREATE_ROOM = gql `
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

const STUDENT_ON_KEY_UP = gql `
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
   STUDENT_COUNT
}