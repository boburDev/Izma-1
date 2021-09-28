import { gql } from '@apollo/client'

const LOGIN = gql`
    mutation login($phoneNumber: String!$password: String!$hashtag: String!) {
       login(phoneNumber: $phoneNumber, password: $password, hashtag: $hashtag)
    }

`

export {
    LOGIN
}