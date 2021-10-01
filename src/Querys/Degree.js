import {
   gql
} from '@apollo/client'

const NEW_DEGREE = gql `
  mutation
  createSubcourse(
    $degreeName: String!
    $degreePrice: String!
    $degreeDesc: String!
    $courseID: ID!
  ) {
    createSubcourse(
      name: $degreeName
      price: $degreePrice
      description: $degreeDesc
      courseID: $courseID
    ) {
      id
      name
      price
      description
    }
  }
`

const ALL_DEGREES = gql `
  query subCourses($courseID: ID!) {
    subCourses(courseID: $courseID){
      id
      name
      price
      description
    }
  }
`

const UPDATE_DEGREE = gql `
  mutation 
    updateSubCourse(
    $degreeName: String!
    $degreePrice: String!
    $degreeDesc: String!
    $degreeID: ID!
  ) {
    updateSubCourse(
      name: $degreeName
      price: $degreePrice
      description: $degreeDesc
      degreeID: $degreeID
    ) {
      id
      name
      price
      description
    }
  }
`

const DELETE_DEGREE = gql `
  mutation 
    deleteSubCourse ($degreeID: ID!){
    deleteSubCourse(id: $degreeID)
    {
      name
    }
  }
`

const SUBSCRIPTION_DEGREE = gql `
  subscription {
    subCourses {
      id
      name
    }
  }
`

export {
   NEW_DEGREE,
   ALL_DEGREES,
   UPDATE_DEGREE,
   DELETE_DEGREE,
   SUBSCRIPTION_DEGREE
}