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

export {
    BY_COLLEGUE_ID
}