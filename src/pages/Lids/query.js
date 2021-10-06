import { gql } from '@apollo/client'

const CREATE_BOX = gql `
  mutation createBoxName(
    $boxName: String
    $status: Int
  ) {
    createBoxName(
      boxName: $boxName
      status: $status
      ) {
      id
      boxName
      status
    }
  }
`

const BOXES_NAME = gql `
  query {
    leadsBoxName
  }
`

const UPDATE_BOX_NAME = gql `
  mutation updateBoxName(
    $boxID: ID
    $boxName: String
    $status: Int
  ) {
    updateBoxName(
      boxID: $boxID
      boxName: $boxName
      status: $status
    ){
      id
      boxName
      status
    }
  }
`

const DELETE_BOX = gql `
  mutation deleteBoxName(
    $boxID: ID
    $status: Int
  ) {
    deleteBoxName(
      boxID: $boxID
      status: $status
    ) {
      id
      boxName
      status
    }
  }
`

const CREATE_BOX_CONTENT = gql `
  mutation createBoxContnt(
    $name: String
    $phone: String
    $comment: String
    $status: Int
  ) {
    createBoxContnt (
      name: $name
      phone: $phone
      comment: $comment
      status: $status
    ) {
      id
      name
      phone
      comment
      status
    }
  }
`

const CREATE_BOX_CONTENT_GROUP = gql `
  mutation createBoxContnt(
    $name: String
    $status: Int
    $courseID: ID
    $courseName: String
    $teachID: ID
    $teachName: String
    $days: String
    $time: String
  ) {
    createBoxContnt (
      name: $name
      status: $status
      courseID: $courseID
      courseName: $courseName
      teachID: $teachID
      teachName: $teachName
      courseDays: $days
      courseTime: $time
    ) {
      id
      name
      phone
      comment
      status
    }
  }
`

const BOXES_CONTENT = gql `
  query {
    leadBoxContent{
      id
      name
      phone
      comment
      status
    }
  }
`

const UPDATE_BOX_CONTENT = gql `
  mutation updateBoxContnt(
    $id: ID
    $name: String
    $phone: String
    $comment: String  
  ) {
    updateBoxContnt (
      id: $id
      name: $name
      phone: $phone
      comment: $comment
    ) {
      id
    }
  }
`

const UPDATE_BOX_CONT_STATUS = gql `
  mutation updateBoxStatus($id: ID $status: Int) {
    updateBoxStatus(id: $id status: $status){
      status
    }
  }
`

const DELETE_CONTENT = gql `
  mutation deleteBoxContent($id: ID) {
    deleteBoxContent(id: $id) {
      id
    }
  }
`

export {
  BOXES_NAME,
  BOXES_CONTENT,
  UPDATE_BOX_NAME,
  DELETE_BOX,
  CREATE_BOX,
  CREATE_BOX_CONTENT,
  CREATE_BOX_CONTENT_GROUP,
  UPDATE_BOX_CONTENT,
  UPDATE_BOX_CONT_STATUS,
  DELETE_CONTENT
}