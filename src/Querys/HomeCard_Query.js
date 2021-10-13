import { gql } from '@apollo/client'

const STUDENT_COUNT = gql `
  query{
    studentCountHome
  }
`

const STATUS_COUNT = gql `
  query studentStatus($count: Int) {
    studentStatus(count: $count)
  }
`

const GROUP_COUNT = gql `
  query{
    groupsCount{
      id
    }
  }
`

const ST_COUNT = gql `
  subscription {
    count
  }
`
export {
  STUDENT_COUNT,
  STATUS_COUNT,
  GROUP_COUNT,
  ST_COUNT
}