import { gql } from '@apollo/client'

const COLLEGUES = gql`
    query {
        all_colleagues{
            Id
            name
            status
            phoneNumber
            gender
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

const TEACHER_SUBSCRIPTION = gql `
    subscription {
        colleagues {
            Id
            name
            phoneNumber
            status
            gender
        }
    }
`

const DELETE_COLLEGUE = gql `
  mutation deleteColleague($id: ID) {
    deleteColleague(Id: $id){
      Id
    }
  }
`

export {
  COLLEGUES,
  ROADMAP,
  TEACHER_SUBSCRIPTION,
  DELETE_COLLEGUE
}