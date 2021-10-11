import {
   gql
} from '@apollo/client'

const COURSES = gql `
    query byHashtag($hashtag: String!) {
        byHashtag(hashtag: $hashtag) {
            id
            name
        }
    }
`

const NEW_LEAD = gql `
    mutation newLeadForm(
        $name: String!
        $phoneNumber: String!
        $comment: String!
        $course: ID!
        $hashtag: String!
    ) {
        newLeadForm(
            name: $name
            phoneNumber: $phoneNumber 
            comment: $comment 
            course: $course
            hashtag: $hashtag
        ) {
            id
            name
            phoneNumber
            comment
        }
    }
`

export {
   COURSES,
   NEW_LEAD
}