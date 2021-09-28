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
      id
      name
    }
  }
`

export {
    CREATE_COLLEAGUE
}