import { gql } from '@apollo/client'

const groups = gql`query groups($teacherID: [ID!] $dd: [ID!]){
    groups(teacherID: $teacherID courseID: $dd){
        id
      name
      startDate
      time
      students{
        id
        name
      }
    }
  }`



export {
    groups
}