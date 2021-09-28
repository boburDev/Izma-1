import {
   gql
} from '@apollo/client'

const COLLEGUES = gql `
    query {
        all_colleagues{
            id
            name
            status
                phoneNumber
            
          }  
    }
`

export {
   COLLEGUES
}