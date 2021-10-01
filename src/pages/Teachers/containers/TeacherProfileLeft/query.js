import { gql } from '@apollo/client'

const BY_COLLEGUE_ID = gql`
query colleague_by_id($id: ID!) {
  colleague_by_id(collegueID: $id) {
    Id
    name
    phoneNumber
    photo
    gender
    status
    birthday
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

const SUBCRIPTION_TEACHER = gql `
  subscription {
    colleagues{
      Id
      phoneNumber
      gender
      comment
      birthday
    }
  }
`

export {
    BY_COLLEGUE_ID,
    FILIAL,
    UPDATE_COLLEGUES,
    SUBCRIPTION_TEACHER
}