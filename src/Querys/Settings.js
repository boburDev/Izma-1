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

const UPT_STATUS = gql `
  mutation updateColleagueStatus($id: ID!, $status: Int) {
    updateColleagueStatus(Id: $id, status: $status) {
      Id
      status
    }
  }
`

export {
  COLLEGUES,
  ROADMAP,
  TEACHER_SUBSCRIPTION,
  DELETE_COLLEGUE,
  UPT_STATUS
}