import {gql} from "@apollo/client";


const STATUS = gql `
   query {
      statusUser
   }
`

export {
   STATUS
}