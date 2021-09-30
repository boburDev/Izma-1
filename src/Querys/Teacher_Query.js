import {
   gql
} from '@apollo/client'

const TEACHERS = gql `
    query {
        colleagues {
            Id
            name
            phoneNumber
        }
    }
`
const NEW_TEACHER = gql `
    mutation createColleague($name: String! $phoneNumber: String! $birthDay: String! $gender: Int! $password: String! $comment: String $photo: Data $status: Int!) {
        createColleague(name: $name phoneNumber: $phoneNumber birthday: $birthDay gender: $gender password: $password comment: $comment photo: $photo status: $status) {
            id
            name
            phoneNumber
            password
            gender
            comment
            photo
            status
        }
    }
`

const TEACHER_SUBSCRIPTION = gql `
    subscription {
        colleagues {
            id
            name
            phoneNumber
        }
    }
`

const DELETE_TEACHER = gql `
    mutation deleteColleague($id: ID!) {
        deleteColleague(id: $id) {
            id
            name
        }
    }
`

export {
   TEACHERS,
   NEW_TEACHER,
   TEACHER_SUBSCRIPTION,
   DELETE_TEACHER
}