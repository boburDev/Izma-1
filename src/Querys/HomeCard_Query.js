import { gql } from '@apollo/client'

const STUDENT_COUNT = gql `
  query{
    studentCountHome
  }
`

const STATUS_COUNT = gql `
  query studentStatus($count: String) {
    studentStatus(count: $count)
  }
`

const GROUP_COUNT = gql `
  query{
    groupsCount
  }
`
export {
  STUDENT_COUNT,
  STATUS_COUNT,
  GROUP_COUNT
}