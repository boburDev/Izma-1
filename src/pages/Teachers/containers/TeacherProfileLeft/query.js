import { gql } from '@apollo/client'

const BY_COLLEGUE_ID = gql`
query colleague_by_id($collegueID: ID!){
	colleague_by_id(collegueID: $collegueID) {
        id
        name
        phoneNumber
        photo
        gender
        status
        birthday
        branchName
      }
}
`

export {
    BY_COLLEGUE_ID
}