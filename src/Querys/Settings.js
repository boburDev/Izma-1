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

const ROADMAP = gql`
{
    roadMap{
      id
      name
      roadmapItems{
        id
        nameUz
        nameRu
        nameEn
      }
    }
  }
`


export {
    COLLEGUES,
    ROADMAP,
}