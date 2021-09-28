import { gql } from '@apollo/client'



const GROUP_INFO = gql`
query byGroupID($groupID: ID! ){
    byGroupID(groupID: $groupID) {
      id
      name
          time
      students {
        id
        name
        mainPhone{
          id
          phone
        }
      }
    }
  }
`


export {
    GROUP_INFO
}