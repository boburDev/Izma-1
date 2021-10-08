import { gql } from '@apollo/client'

const ALL_BOX = gql `
    query {
        leadsBoxName{
        id
        boxName
        status
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

const CHECK_BOX_MINUS = gql `
    query checkBox($check: String){
        checkBox(check: $check)
    }
`



const ALL_LEADS = gql `
    query {
        leads{
        id
        name
        phone
        gender
        comment
        birthday
        courseID
        teachID
        leadBoxID
        }
    }
`


const NEW_LEAD = gql `
    mutation newLeadForm(
        $name: String
        $phone: String
        $leadBoxID: ID
        $birthday: String
        $gender: Int
        $comment: String
        $courseID: ID
        $teachID: ID
        $index: Int
    ) {
        newLeadForm(
        name: $name
        phone: $phone
        leadBoxID: $leadBoxID
        birthday: $birthday
        gender: $gender
        comment: $comment
        courseID: $courseID
        teachID: $teachID
        index: $index
        ) {
        id
        }
    }
`

const UPDATE_LEAD = gql `
    mutation updateLead(
        $leadID: ID
        $name: String
        $phone: String
        $leadBoxID: ID
        $birthday: String
        $gender: Int
        $comment: String
        $courseID: ID
        $teachID: ID
        $index: Int
    ) {
        updateLead(
        id: $leadID
        name: $name
        phone: $phone
        leadBoxID: $leadBoxID
        birthday: $birthday
        gender: $gender
        comment: $comment
        courseID: $courseID
        teachID: $teachID
        index: $index
        ) {
        id
        }
    }
`

const DELETE_LEAD = gql `
    mutation deleteLead($leadID: ID) {
        deleteLead(leadID: $leadID){
        id
        }
    }
`

const SUBCRIP_LEADS = gql `
    subscription {
        leads {
        id
        name
        phone
        }
    }
`

export {
    ALL_BOX,
    NEW_BOX,
    CHECK_BOX_MINUS,
    UPDATE_BOX,
    DELETE_BOX,
    SUBCRIP_BOXES,
    NEW_LEAD,
    UPDATE_LEAD,
    DELETE_LEAD,
    SUBCRIP_LEADS,
    ALL_LEADS
}