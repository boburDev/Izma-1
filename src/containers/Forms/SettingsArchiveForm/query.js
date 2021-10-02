import { gql } from '@apollo/client'

const CREATE_COLLEAGUE = gql`
mutation createColleague($birthday: String $name: String!, $phoneNumber: String! $gender: Int $password: String! $status: Int!){
    createColleague(
      name: $name
      phoneNumber: $phoneNumber
      gender: $gender
      password: $password
      status: $status
      birthday: $birthday
    ) {
      Id
      name
    }
  }
`

const UPDATE_COLLEGUES = gql`
  mutation
  updateColleague(
    $Id: ID!
    $name: String!
    $phoneNumber: String!
    $gender: String!
    $password: String!
    $comment: String
    $birthday: String
    $status: Int
  ) { updateColleague(
      Id: $Id
      name: $name
      phoneNumber: $phoneNumber
      gender: $gender
      password: $password
      comment: $comment
      birthday: $birthday
      status: $status
  ) {
    Id
  }
  }
`

export {
    CREATE_COLLEAGUE,
    UPDATE_COLLEGUES,
}