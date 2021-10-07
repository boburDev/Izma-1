import { gql } from '@apollo/client'

const ALL_BOX = gql `
    query {
        leadsBoxName{
        id
        boxName
        status
        courseID
        courseName
        teachID
        teachName
        courseDays
        courseTime
        }
    }
`

const NEW_BOX = gql `
    mutation createBoxName(
        $boxName: String
        $status: Int
        $courseID: ID
        $courseName: String
        $teachID: ID
        $teachName: String
        $courseDays: String
        $courseTime: String
    ){
    createBoxName(
        boxName: $boxName
        status: $status
        courseID: $courseID
        courseName: $courseName
        teachID: $teachID
        teachName: $teachName
        courseDays: $courseDays
        courseTime: $courseTime
    ){
        id
    }
}
`

const UPDATE_BOX = gql `
    mutation updateBoxName(
        $boxID: ID
        $boxName: String
        $status: Int
        $courseID: ID
        $courseName: String
        $teachID: ID
        $teachName: String
        $courseDays: String
        $courseTime: String
    ){
    updateBoxName(
        boxID: $boxID
        boxName: $boxName
        status: $status
        courseID: $courseID
        courseName: $courseName
        teachID: $teachID
        teachName: $teachName
        courseDays: $courseDays
        courseTime: $courseTime
    ){
        id
    }
    }
`

const DELETE_BOX = gql `
    mutation deleteBoxName($boxID: ID) {
        deleteBoxName(boxID: $boxID){
        id
        }
    }
`

const SUBCRIP_BOXES = gql `
    subscription {
        newBoxes {
        id
        boxName
        }
    }
`

export {
    ALL_BOX,
    NEW_BOX,
    UPDATE_BOX,
    DELETE_BOX,
    SUBCRIP_BOXES
}