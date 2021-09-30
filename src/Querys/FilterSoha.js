import {
   gql
} from '@apollo/client'

const COURSES = gql `
    query {
        courses {
            id
            name
        }
    }
`

const TEACHER_FILTERS = gql `
    query {
        colleagues {
            Id
            name
        }
    }
`

export {
   COURSES,
   TEACHER_FILTERS
}