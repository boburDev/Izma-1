import {
   gql
} from '@apollo/client'

const ROOMS = gql `
    query {
        rooms {
            id
            room
        }
    }
`

const CREATE_GROUP = gql `
    mutation createGroup(
        $name: String!
        $courseID: ID!
        $teacherID: ID!
        $days: String!
        $roomID: ID!
        $time: String!
        $startDate: String!
        $endDate: String!
    ) {
    createGroup(
        name: $name
        courseID: $courseID
        teacherID: $teacherID
        days: $days
        roomID: $roomID
        time: $time
        startDate: $startDate
        endDate: $endDate
    ) {
        id
        name
        startDate
        endDate
        }
    }
`

const UPDATE_GROUP = gql `
mutation updateGroup(
    $groupID: ID!
    $name: String!
    $courseID: ID!
    $teacherID: ID!
    $days: String!
    $roomID: ID!
    $time: String!
    $startDate: String!
    $endDate: String!
) {
updateGroup(
    groupID: $groupID
    name: $name
    courseID: $courseID
    teacherID: $teacherID
    days: $days
    roomID: $roomID
    time: $time
    startDate: $startDate
    endDate: $endDate
) {
        id
        name
    }
}
`

const GROUPS = gql `
    query groups($teacherID: [ID!] $courseID: [ID!]) {
        groups(teacherID: $teacherID courseID: $courseID) {
            id
            name
            teacher
            days
            rooms
            time
            startDate
            endDate
            studentsCount
        }
    }
`

const SUBSCRIPTION_GROUPS = gql `
	subscription {
		groups {
            id
            name
		}
	}
`

const ATTANDANCE_GROUP = gql `
  mutation createGroupAtt(
    $groupID: ID!
    $startDate: String!
    $endDate: String!
  ) {
    createGroupAtt(
      groupID: $groupID
      startDate: $startDate
      endDate: $endDate
    )
  }
`


export {
   ROOMS,
   CREATE_GROUP,
   GROUPS,
   UPDATE_GROUP,
   ATTANDANCE_GROUP,
   SUBSCRIPTION_GROUPS,
}