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
            id
            name
        }
    }
`

export {
   COURSES,
   TEACHER_FILTERS
}