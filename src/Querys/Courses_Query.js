import {
   gql
} from '@apollo/client'

const ONE_COURSE_TO_EDIT = gql `
  query byCourseID ($id: ID!){
    byCourseID(courseID: $id){
      id
      name
      price
      description
    }
  }
`

const CREATE_COURSE = gql `
  mutation createCourse(
    $name: String!
    $price: String!
    $desc: String
  ) {
    createCourse (
      name: $name
      price: $price
      description: $desc
    ) {
      id
      name
      price
    }
  }
`




const UPDATE_COURSE = gql `
  mutation updateCourse(
    $id: ID!
    $name: String!
    $price: String!
    $description: String
  ) {
    updateCourse (
      id: $id
      name: $name
      price: $price
      description: $description
    ){
      name
      price
      description
    }
  }
`

const COURSES = gql `
    query {
        courses{
            id
            name
            price
        }
    }
`



const COURSE_SUBSCRIPTION = gql `
    subscription {
        courses {
            id
            name
            price
        }
    }
`

const BY_COURSE_ID = gql `
query byCourseID($courseID: ID!) {
    byCourseID(courseID: $courseID) {
      id
      name
      price
      description 
      onlineLessons {
        id
        title
      }
      subCourses {
        id
        name
        price
        description
      }
      groups {
        id
        name
        teacher
        time
      }
    }
  }
`

const DELETE_BY_COURSE_ID = gql `

mutation deleteCourse($id: ID!) {
  deleteCourse(id: $id) {
    id
    name
    price
    description 
    onlineLessons {
      id
      title
    }
    subCourses {
      id
      name
      price
      description
    }
    groups {
      id
      name
      teacher
      time
    }
  }
}

`

export {
   ONE_COURSE_TO_EDIT,
   CREATE_COURSE,
   UPDATE_COURSE,
   COURSES,
   COURSE_SUBSCRIPTION,
   BY_COURSE_ID,
   DELETE_BY_COURSE_ID
}