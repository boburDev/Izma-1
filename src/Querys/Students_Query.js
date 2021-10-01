import {
   gql
} from '@apollo/client'


const ADD_NEW_STUDENTS = gql `
mutation CreateStudent(
  $mainPhone: [PhoneInput]
  $name: String!
  $gender: Int
  $groupID: [GroupInput]
) {
  createStudent(
    mainPhone: $mainPhone
    name: $name
    gender: $gender
    groupID: $groupID
  ) {
    id
    }
}

`

const FOR_EDIT_STUDENT = gql `
query student ($id: ID!){
  student(id: $id) {
    name
    birthday
    gender
    comment
    mainPhone{
      id
      phone
    }
    parentNumber{
      id
      phone
    }
    telegram{
      id
      telegram
    }
  }
}
`

const UPDATE_STUDENT = gql `
  mutation updateStudent(
    $studentID: ID!
    $mainPhone: [PhoneInput]
    $name: String!
    $birthday: String
    $password: String!
    $gender: Int
    $photo: String
    $groupID: [GroupInput]
    $comment: String
    $newNumber: [PhoneInput]
    $parentNumber: [PhoneInput]
    $telegram: [TelegramInput]
    $address: [AddressInput]
  ) {
    updateStudent(
      studentID: $studentID
      mainPhone: $mainPhone
      name: $name
      birthday: $birthday
      password: $password
      gender: $gender
      photo: $photo
      groupID: $groupID
      comment: $comment
      newNumber: $newNumber
      parentNumber: $parentNumber
      telegram: $telegram
      address: $address
    ) {
      id
      name
      comment
      birthday
      gender
      password
      mainPhone {
        id
        phone
      }
      parentNumber {
        id
        phone
      }
      telegram {
        id
        telegram
      }
      address {
        id
        address
      }
      groups {
        id
        name
      }
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

export {
   ADD_NEW_STUDENTS,
   FOR_EDIT_STUDENT,
   UPDATE_STUDENT,
   GROUPS,
   NEW_CASH
}