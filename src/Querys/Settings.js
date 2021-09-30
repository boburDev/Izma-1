import { gql } from '@apollo/client'

const COLLEGUES = gql`
    query {
        all_colleagues{
            Id
            name
            status
            phoneNumber
            
          }  
    }
`

export {
    COLLEGUES
}