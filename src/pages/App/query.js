import {gql} from "@apollo/client";


const STATUS = gql `
   query {
      statusUser{
         collegaID
         status
      }
   }
`

export {
   STATUS
}