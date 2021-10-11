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

const UPT_STATUS = gql `
  mutation updateColleagueStatus($id: ID!, $status: Int) {
    updateColleagueStatus(Id: $id, status: $status) {
      Id
      status
    }
  }
`

const COLLEGUES_BY_STATUS = gql`
    query {
      selectByStatus{
            Id
            name
            status
            phoneNumber
            gender
          }  
    }
`

export {
  COLLEGUES,
  ROADMAP,
  TEACHER_SUBSCRIPTION,
  UPT_STATUS,
  COLLEGUES_BY_STATUS
}